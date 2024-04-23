import { ChangeEvent, FormEvent, useContext, useState } from "react";
import Head from "next/head";
import styles from './styles.module.scss';
import { canSSRAuth } from "@/src/utils/canSSRAuth";
import { Header } from "@/src/components/Header";
import { BackButton, SaveButton } from "@/src/components/ui/Button";
import { setupAPIClient } from "@/src/services/api";
import { AgenteDetails } from "@/src/components/Card/AgenteDetails";
import { AreaSection } from "@/src/components/Section/AreaSection";
import { AuthContext } from "@/src/contexts/AuthContext";


export default function AreaList({ cycle_id, user_id, agente }) {
  const { createVisitationArea } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    data: {
      cdg_localidade: "",
      nome_localidade: "",
      catg_localidae: "",
      municipio: "",
      zona: "",
      tipo: { "value": "Sede", "label": "Sede" },
      atividade: { "value": "LI", "label": "LI-Levantamento de índice" }
    }
  });

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const [section, fieldName] = name.split('.');

    setFormData((prevFormData) => ({
      ...prevFormData,
      [section]: {
        ...prevFormData[section],
        [fieldName]: value === "" ? undefined : value
      }
    }));
  };

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const data = {
      ...formData,
      data: {
        ...formData.data,
        tipo: formData.data.tipo.value,
        atividade: formData.data.atividade.value,
      }
    };

    try {
      await createVisitationArea(cycle_id, user_id, data);
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <>
      <Head>
        <title>MosquitoZero | Suas Áreas</title>
        <link rel="icon" href="/favicon.png" />
      </Head>

      <div className={styles.container}>
        <Header />

        <div className={styles.content}>
          <div className={styles.options}>
            <div className={`${styles.row} ${styles.optionsButtons}`}>
              <BackButton href={{
                pathname: "/supervisor/area/list",
                query: { cycle_id: cycle_id, user_id: user_id },
              }}
              />
              <SaveButton onClick={handleSubmit} />
            </div>
            <div className={styles.agenteDetails}>
              <AgenteDetails agente={agente} />
            </div>
            <p className={styles.title}>ATRIBUINDO ÁREA DE VISITA</p>
          </div>

          <form className={styles.form}>
            <AreaSection handleInputChange={handleInputChange} formData={formData} setFormData={setFormData} />
          </form>
        </div>
      </div>
    </>
  );
};


export const getServerSideProps = canSSRAuth(async (ctx) => {
  const { cycle_id, user_id } = ctx.query;
  const apiClient = setupAPIClient(ctx);

  let agente = {};

  try {
    const response = await apiClient.get('/user', {
      headers: {
        'user_id': user_id,
      },
    });
    agente = response.data;
  } catch (e) { }


  return {
    props: {
      cycle_id: cycle_id,
      user_id: user_id,
      agente: agente
    }
  }
}, 'supervisor');
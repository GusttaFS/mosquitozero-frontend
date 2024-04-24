import { ChangeEvent, FormEvent, useContext, useState } from "react";
import Head from "next/head";
import styles from './styles.module.scss';
import { canSSRAuth } from "@/src/utils/canSSRAuth";
import { Header } from "@/src/components/Header";
import { SaveButton } from "@/src/components/ui/Button";
import { setupAPIClient } from "@/src/services/api";
import { AgenteDetails } from "@/src/components/Card/AgenteDetails";
import { AreaSection } from "@/src/components/Section/AreaSection";
import { AuthContext } from "@/src/contexts/AuthContext";
import { toast } from "react-toastify";
import router from "next/router";


export default function AreaForm({ cycle_id, user_id, agente, cycle }) {
  const { createVisitationArea } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    data: {
      cdg_localidade: "",
      nome_localidade: "",
      catg_localidade: "",
      municipio: "Campina Grande",
      zona: "",
      tipo: { "value": "Sede", "label": "Sede" },
      atividade: { "value": "LI-Levantamento de índice", "label": "LI-Levantamento de índice" }
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
    const isFormValid = Object.values(formData.data).every(value => value !== "");
    if (!isFormValid) {
      toast.dismiss();
      toast.error('Preencha todos os campos');
    } else {
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
        router.back();
      } catch (e) {
        console.log(e);
      }
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
            <div className={styles.details}>
              <AgenteDetails
                agente={agente}
                visitationAreas={undefined}
                cycle={cycle}
              />
            </div>
            <p className={styles.title}>ATRIBUINDO NOVA ÁREA DE VISITA</p>
            <div className={styles.saveButton}>
              <SaveButton onClick={handleSubmit} />
            </div>
          </div>

          <form className={styles.form}>
            <AreaSection
              handleInputChange={handleInputChange}
              formData={formData}
              setFormData={setFormData}
            />
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
  let cycle = {};

  try {
    const response = await apiClient.get('/user/id', {
      headers: {
        'user_id': user_id,
      },
    });
    agente = response.data;
  } catch (e) { }

  try {
    const response = await apiClient.get('/cycle');
    cycle = response.data;
  } catch (e) { }

  return {
    props: {
      cycle_id: cycle_id,
      user_id: user_id,
      agente: agente,
      cycle: cycle
    }
  }
}, 'supervisor');
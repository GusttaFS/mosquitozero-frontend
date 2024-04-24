import { ChangeEvent, FormEvent, useContext, useState } from "react";
import Head from "next/head";
import styles from './styles.module.scss';
import { canSSRAuth } from "@/src/utils/canSSRAuth";
import { setupAPIClient } from "@/src/services/api";
import { AuthContext } from "@/src/contexts/AuthContext";
import { Header } from "@/src/components/Header";
import { SaveButton } from "@/src/components/ui/Button";
import { HeaderSection } from "@/src/components/Section/HeaderSection";
import { AgenteDetails } from "@/src/components/Card/AgenteDetails";
import { VisitationSection } from "@/src/components/Section/VisitationSection";
import { VisitationAreaDetails } from "@/src/components/Card/VisitationAreaDetails";
import { toast } from "react-toastify";
import router from "next/router";


export default function VisitationForm({ agente, cycle, visitation_area_id, visitationArea }) {
  const { createVisitation } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    data: {
      quarteirao: "", lado: "", logradouro: "", numero: "", complemento: "",
      imovel: { "value": "Residencial", "label": "Residencial" },
      visita: { "value": "Normal", "label": "Normal" }
    },
    deposito: { value: "" }, amostra: { value: "" }, tratamento: { value: "" }
  });

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const data = {
      ...formData,
      data: {
        ...formData.data,
        imovel: formData.data.imovel.value,
        visita: formData.data.visita.value,
      }
    };

    const isdataValid = Object.values(data.data).every(value => {
      if (value === undefined) return false;
      const trimmedValue = value.trim();
      return trimmedValue !== "";
    });

    if (!isdataValid) {
      toast.dismiss();
      toast.error('Preencha todos os campos');
    } else {
      try {
        await createVisitation(visitation_area_id, data);
        router.back();
      } catch (e) {
        console.log(e);
      }
    }
  };

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


  return (
    <>
      <Head>
        <title>MosquitoZero | Atribuir Visita</title>
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
                cycle={undefined}
              />
              <VisitationAreaDetails
                visitationArea={visitationArea}
                cycle={cycle}
              />
            </div>
            <p className={styles.title}>ATRIBUINDO NOVA VISITA</p>
            <div className={styles.saveButton}>
              <SaveButton onClick={handleSubmit} />
            </div>
          </div>

          <form className={styles.form}>
            <VisitationSection
              handleInputChange={handleInputChange}
              formData={formData}
              setFormData={setFormData}
            />
          </form>
        </div>
      </div>
    </>
  );
}


export const getServerSideProps = canSSRAuth(async (ctx) => {
  const { cycle_id, user_id, visitation_area_id } = ctx.query;
  const apiClient = setupAPIClient(ctx);

  let agente = {};
  let cycle = {};
  let visitationArea = {};

  try {
    const response = await apiClient.get('/user/id', {
      headers: {
        'user_id': user_id,
      },
    });
    agente = response.data;
  } catch (e) { }

  try {
    const response = await apiClient.get('/cycle/id', {
      headers: {
        cycle_id: cycle_id
      },
    });
    cycle = response.data;
  } catch (e) { }

  try {
    const response = await apiClient.get('/visitation-area', {
      headers: {
        'visitation_area_id': visitation_area_id,
      },
    });
    visitationArea = response.data;
  } catch (e) { }

  return {
    props: {
      agente: agente,
      cycle: cycle,
      visitation_area_id: visitation_area_id,
      visitationArea: visitationArea
    }
  }
}, 'supervisor');
import { ChangeEvent, FormEvent, useContext, useEffect, useState } from "react";
import Head from "next/head";
import styles from './styles.module.scss';

import { canSSRAuth } from "@/src/utils/canSSRAuth";
import { setupAPIClient } from "@/src/services/api";
import { AuthContext } from "@/src/contexts/AuthContext";

import { Header } from "@/src/components/Header";
import { BackButton, CanceltButton, EditButton, SaveButton } from "@/src/components/ui/Button";
import { VisitationStatus } from "@/src/components/Section/VisitationStatus";
import { DepositoSection } from "@/src/components/Section/DepositoSection";
import { HeaderSection } from "@/src/components/Section/HeaderSection";
import { AmostraSection } from "@/src/components/Section/AmostraSection";
import { TratamentoSection } from "@/src/components/Section/TratamentoSection";


export default function Visitation({ visitation_area_id, visitation_id, visitation }) {
  const { createVisitation, editVisitation } = useContext(AuthContext);

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    data: {
      quarteirao: visitation?.data?.quarteirao, lado: visitation?.data?.lado,
      logradouro: visitation?.data?.logradouro, numero: visitation?.data?.numero,
      complemento: visitation?.data?.complemento, horario: visitation?.data?.horario || "",
      imovel: { "value": visitation?.data?.imovel, "label": visitation?.data?.imovel },
      visita: { "value": visitation?.data?.visita, "label": visitation?.data?.visita },
      pendencia: { "value": visitation?.data?.pendencia, "label": visitation?.data?.pendencia }
    },
    deposito: {
      a1: visitation?.deposito?.a1 || 0, a2: visitation?.deposito?.a2 || 0,
      b: visitation?.deposito?.b || 0, c: visitation?.deposito?.c || 0,
      d1: visitation?.deposito?.d1 || 0, d2: visitation?.deposito?.d2 || 0, e: visitation?.deposito?.e || 0, 
      eliminado: visitation?.deposito?.eliminado || 0, inspecionados: visitation?.deposito?.inspecionados || 0
    },
    amostra: {
      inicial: visitation?.amostra?.inicial || "", final: visitation?.amostra?.final || "", tubitos: visitation?.amostra?.tubitos || 0
    },
    tratamento: {
      qtd_dep_elimind: visitation?.tratamento?.qtd_dep_elimind || 0, imoveis_tratd: visitation?.tratamento?.imoveis_tratd || 0,
      tipo_larvcd1: visitation?.tratamento?.tipo_larvcd1 || "", tipo_larvcd2: visitation?.tratamento?.tipo_larvcd2 || "",
      qtd_grms_larvcd1: visitation?.tratamento?.qtd_grms_larvcd1 || 0, qtd_grms_larvcd2: visitation?.tratamento?.qtd_grms_larvcd2 || 0,
      qtd_dep_trat_larvcd1: visitation?.tratamento?.qtd_dep_trat_larvcd1 || 0, qtd_dep_trat_larvcd2: visitation?.tratamento?.qtd_dep_trat_larvcd2 || 0,
      tipo_adultcd: visitation?.tratamento?.tipo_adultcd || "", qtd_crgs_adultcd: visitation?.tratamento?.qtd_crgs_adultcd || 0
    }
  });

  const [backupFormData, setBackupFormData] = useState({});

  const handleEditClick = () => {
    setBackupFormData(JSON.parse(JSON.stringify(formData)));
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setFormData(JSON.parse(JSON.stringify(backupFormData)));
    setIsEditing(false);
  };

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const data = {
      ...formData,
      data: {
        ...formData.data,
        imovel: formData.data.imovel.value,
        visita: formData.data.visita.value,
        pendencia: formData.data.pendencia.value
      }
    };
    if (visitation_id !== "") {
      try {
        await editVisitation(visitation_id, data);
      } catch (e) {
        console.log(e);
      }
    } else {
      try {
        await createVisitation(visitation_area_id, data);
      } catch (e) {
        console.log(e);
      }
    }
    setIsEditing(false);
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
        <title>MosquitoZero | Nova Visita</title>
        <link rel="icon" href="/favicon.png" />
      </Head>

      <div className={styles.container}>
        <Header />

        <div className={styles.content}>
          <div className={styles.options}>
            <div className={`${styles.row} ${styles.optionsButtons}`}>
              <BackButton href={{
                pathname: '/visitation/list',
                query: { visitation_area_id: visitation_area_id },
              }} />
              <div className={styles.optionsEdit}>
                {!isEditing && (
                  <EditButton onClick={handleEditClick} />
                )}
                {isEditing && (
                  <>
                    <SaveButton onClick={handleSubmit} />
                    <CanceltButton onClick={handleCancelClick} />
                  </>
                )}
              </div>
            </div>

            <VisitationStatus visitation={visitation} visitationAreaId={visitation_area_id} />

            <p className={styles.title}>PESQUISA ENTOMOLÓGICA / TRATAMENTO</p>
          </div>

          <form className={styles.form}>
            <HeaderSection
              handleInputChange={handleInputChange}
              isEditing={isEditing}
              formData={formData}
              setFormData={setFormData}
            />

            <DepositoSection
              handleInputChange={handleInputChange}
              isEditing={isEditing}
              formData={formData}
            />

            <AmostraSection
              handleInputChange={handleInputChange}
              isEditing={isEditing}
              formData={formData}
            />

            <TratamentoSection
              handleInputChange={handleInputChange}
              isEditing={isEditing}
              formData={formData}
            />
          </form>
        </div>
      </div>
    </>
  );
}


export const getServerSideProps = canSSRAuth(async (ctx) => {
  const { visitation_area_id, visitation_id } = ctx.query;
  const apiClient = setupAPIClient(ctx);

  if (visitation_id) {
    const response = await apiClient.get(`/visitation`, {
      headers: {
        'visitation_id': visitation_id,
      },
    });

    return {
      props: {
        visitation_id: visitation_id || "",
        visitation_area_id: visitation_area_id || "",
        visitation: response.data,
      }
    }

  }

  return {
    props: {
      visitation_id: visitation_id || "",
      visitation_area_id: visitation_area_id || "",
      visitation: {}
    }
  }
}, 'supervisor');
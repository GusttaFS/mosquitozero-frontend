import { useState } from "react";
import Head from "next/head";
import styles from './styles.module.scss';
import { canSSRAuth } from "@/src/utils/canSSRAuth";
import { setupAPIClient } from "@/src/services/api";
import { Header } from "@/src/components/Header";
import { DepositoSection } from "@/src/components/Section/DepositoSection";
import { HeaderSection } from "@/src/components/Section/HeaderSection";
import { AmostraSection } from "@/src/components/Section/AmostraSection";
import { TratamentoSection } from "@/src/components/Section/TratamentoSection";


export default function VisitationDetails({ cycle_id, user_id, visitation_area_id, visitation }) {

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

  return (
    <>
      <Head>
        <title>MosquitoZero | Detalhes da Visita</title>
        <link rel="icon" href="/favicon.png" />
      </Head>

      <div className={styles.container}>
        <Header />

        <div className={styles.content}>
          <div className={styles.options}>
            <p className={styles.title}>PESQUISA ENTOMOLÓGICA / TRATAMENTO</p>
          </div>

          <form className={styles.form}>
            <HeaderSection
              handleInputChange={() => { }}
              isEditing={false}
              formData={formData}
              setFormData={setFormData}
            />

            <DepositoSection
              handleInputChange={() => { }}
              isEditing={false}
              formData={formData}
            />

            <AmostraSection
              handleInputChange={() => { }}
              isEditing={false}
              formData={formData}
            />

            <TratamentoSection
              handleInputChange={() => { }}
              isEditing={false}
              formData={formData}
            />
          </form>
        </div>
      </div>
    </>
  );
}


export const getServerSideProps = canSSRAuth(async (ctx) => {
  const { cycle_id, user_id, visitation_area_id, visitation_id } = ctx.query;
  const apiClient = setupAPIClient(ctx);

  let visitation = {};

  try {
    const response = await apiClient.get(`/visitation`, {
      headers: {
        'visitation_id': visitation_id,
      },
    });
    visitation = response.data;
  } catch (e) {}

  return {
    props: {
      cycle_id: cycle_id,
      user_id: user_id,
      visitation_area_id: visitation_area_id,
      visitation: visitation
    }
  }
}, 'supervisor');
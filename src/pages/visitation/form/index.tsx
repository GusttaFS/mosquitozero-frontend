import { ChangeEvent, FormEvent, useContext, useEffect, useState } from "react";
import Head from "next/head";
import styles from './styles.module.scss';

import { canSSRAuth } from "@/src/utils/canSSRAuth";
import { setupAPIClient } from "@/src/services/api";
import { AuthContext } from "@/src/contexts/AuthContext";

import { Header } from "@/src/components/Header";
import { Input } from "@/src/components/ui/Input";

import { VscSaveAs } from "react-icons/vsc";
import { BackButton } from "@/src/components/ui/BackButton";
import { Select } from "@/src/components/ui/Select";

export default function Visitation({ visitation_area_id }) {
  const { createVisitation } = useContext(AuthContext);

  const imovelOptions = [
    { "value": "Residencial", "label": "Residencial" },
    { "value": "Comercial", "label": "Comercial" },
    { "value": "Terreno Baldio", "label": "Terreno Baldio" },
    { "value": "Ponto Estrategico", "label": "Ponto Estrategico" },
    { "value": "Outro", "label": "Outro" },
  ];

  const visitaOptions = [
    { "value": "Normal", "label": "Normal" },
    { "value": "Recuperação", "label": "Recuperação" },
  ];

  const pendenciaOptions = [
    { "value": "Recusado", "label": "Recusado" },
    { "value": "Fechado", "label": "Fechado" },
  ];

  const [imovelValue, setImovelValue] = useState(imovelOptions[0]);
  const [visitaValue, setVisitaValue] = useState({ "value": "", "label": "" });
  const [pendenciaValue, setPendenciaValue] = useState({ "value": "", "label": "" });

  const [formData, setFormData] = useState({
    quarteirao:"",
    lado: "",
    logradouro: "",
    numero: "",
    complemento: "",
    imovel: imovelValue.value,
    visita: visitaValue.value,
    pendencia: pendenciaValue.value
  });

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    await createVisitation(visitation_area_id, {
      data: formData,
      deposito: {"value":"a"},
      amostra: {"value":"a"},
      tratamento: {"value":"a"}
    });
    //localStorage.removeItem("logradouro");
    //localStorage.removeItem("numero");
  };

  useEffect(() => {
    const storedLogradouro = localStorage.getItem("logradouro");
    const storedNumero = localStorage.getItem("numero");

    if (storedLogradouro && storedNumero) {
      //setFormData({
      //  logradouro: storedLogradouro,
      //  numero: storedNumero
      //});
    }
  }, []);

  return (
    <>
      <Head>
        <title>MosquitoZero | Nova Visita</title>
        <link rel="icon" href="/favicon.png" />
      </Head>

      <div className={styles.formContainer}>
        <Header />

        <div className={styles.formContent}>
          <div className={styles.formOptions}>
            <div className={styles.rowContent}>
              <BackButton href={{
                pathname: '/visitation/list',
                query: { visitation_area_id: visitation_area_id },
              }} />
              <button type="submit" className={styles.saveButton} onClick={handleSubmit}>
                Salvar
                <VscSaveAs color="white" />
              </button>
            </div>
            <p className={styles.formTitle}>
              PESQUISA ENTOMOLÓGICA / TRATAMENTO
            </p>
          </div>

          <form className={styles.formList} onSubmit={handleSubmit}>

            <div className={styles.formRowContent}>
              <Input required
                label={"N° do quarteirão"}
                name="quarteirao"
                type="text"
                value={formData.quarteirao}
                onChange={handleInputChange}
                labelColor={"black"}
              />
              <Input required
                label={"Lado"}
                name="lado"
                type="text"
                value={formData.lado}
                onChange={handleInputChange}
                labelColor={"black"}
              />
            </div>

            <Input required
              label={"Nome do Logradouro"}
              name="logradouro"
              type="text"
              value={formData.logradouro}
              onChange={handleInputChange}
              labelColor={"black"}
            />

            <div className={styles.formRowContent}>
              <Input required
                label={"Número"}
                name="numero"
                type="text"
                value={formData.numero}
                onChange={handleInputChange}
                labelColor={"black"}
              />
              <Input required
                label={"Complemento"}
                name="complemento"
                type="text"
                value={formData.complemento}
                onChange={handleInputChange}
                labelColor={"black"}
              />
            </div>

            <Select
              label={"Tipo de Imóvel"}
              options={imovelOptions}
              value={imovelValue}
              onChange={o => setImovelValue(o)}
            />

            <Select
              label={"Visita"}
              options={visitaOptions}
              value={visitaValue}
              onChange={o => setVisitaValue(o)}
            />
            <Select
              label={"Pendência"}
              options={pendenciaOptions}
              value={pendenciaValue}
              onChange={o => setPendenciaValue(o)}
            />

          </form>
        </div>
      </div>
    </>
  );
}


export const getServerSideProps = canSSRAuth(async (ctx) => {
  const { visitation_area_id } = ctx.query;
  return {
    props: {
      visitation_area_id: visitation_area_id || ""
    }
  }
});
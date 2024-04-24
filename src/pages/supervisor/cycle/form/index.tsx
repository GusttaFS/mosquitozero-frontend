import { ChangeEvent, FormEvent, useContext, useState } from "react";
import Head from "next/head";
import styles from './styles.module.scss';

import { canSSRAuth } from "@/src/utils/canSSRAuth";
import { AuthContext } from "@/src/contexts/AuthContext";

import { Header } from "@/src/components/Header";
import { SaveButton } from "@/src/components/ui/Button";
import { Input } from "@/src/components/ui/Input";
import { toast } from "react-toastify";
import router from "next/router";



export default function CycleForm() {
  const { createCycle } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    data: {
      ciclo: "",
      ano: ""
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
  
    if (!formData.data?.ano || !formData.data?.ciclo) {
      toast.dismiss();
      toast.error('Preencha todos os campos');
    } else {
      try {
        await createCycle(formData);
        router.back();
      } catch (e) {
        console.log(e);
      }
    }
  };

  return (
    <>
      <Head>
        <title>MosquitoZero | Nova Ciclo</title>
        <link rel="icon" href="/favicon.png" />
      </Head>

      <div className={styles.container}>
        <Header />

        <div className={styles.content}>
          <div className={styles.options}>
            <p className={styles.title}>CRIANDO NOVO CICLO</p>
            <div className={styles.saveButton}>
              <SaveButton onClick={handleSubmit} />
            </div>
          </div>

          <form className={styles.form}>
            <Input
              label={"Ciclo:"}
              name="data.ciclo"
              placeholder="Ex.: 01"
              labelColor="black"
              type="text"
              onChange={handleInputChange}
            />
            <Input
              label={"Ano:"}
              name="data.ano"
              labelColor="black"
              placeholder="Ex.: 2024"
              type="text"
              onChange={handleInputChange}
            />
          </form>
        </div>
      </div>
    </>
  );
}


export const getServerSideProps = canSSRAuth(async (ctx) => {
  return {
    props: {
    }
  }
}, 'supervisor');
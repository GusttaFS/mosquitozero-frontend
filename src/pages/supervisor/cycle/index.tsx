import { ChangeEvent, FormEvent, useContext, useState } from "react";
import Head from "next/head";
import styles from './styles.module.scss';

import { canSSRAuth } from "@/src/utils/canSSRAuth";
import { AuthContext } from "@/src/contexts/AuthContext";

import { Header } from "@/src/components/Header";
import { BackButton, SaveButton } from "@/src/components/ui/Button";
import { Input } from "@/src/components/ui/Input";
import { toast } from "react-toastify";



export default function Cycle() {
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
      toast.error('Preencha todos os campos');
    } else {
      try {
        await createCycle(formData);
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
            <div className={`${styles.row} ${styles.optionsButtons}`}>
              <BackButton href={'/supervisor/home'} />
              <SaveButton onClick={handleSubmit} />
            </div>
            <p className={styles.title}>NOVO CICLO</p>
          </div>

          <form className={`${styles.row} ${styles.form}`}>
            <Input
              label={"Ciclo"}
              name="data.ciclo"
              placeholder="Ex.: 01"
              labelColor="black"
              type="text"
              onChange={handleInputChange}
            />
            <Input
              label={"Ano"}
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
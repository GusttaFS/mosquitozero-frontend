import { ChangeEvent, FormEvent, useContext, useEffect, useState } from "react";
import Head from "next/head";
import styles from './styles.module.scss';

import { canSSRAuth } from "@/src/utils/canSSRAuth";
import { setupAPIClient } from "@/src/services/api";
import { AuthContext } from "@/src/contexts/AuthContext";

import Link from "next/link";
import { Header } from "@/src/components/Header";
import { Input } from "@/src/components/ui/Input";

import { IoChevronBackOutline } from "react-icons/io5";
import { VscSaveAs } from "react-icons/vsc";

export default function Visitation({ visit_order_id }) {
  const { createVisitation } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    logradouro: "",
    numero: ""
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
    await createVisitation(visit_order_id, {
      data: formData
    });
    localStorage.removeItem("logradouro");
    localStorage.removeItem("numero");
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

      <Header />

      <div className={styles.container}>
        <div className={styles.options}>
          <div className={styles.rowContent}>
            <Link href={{
              pathname: '/visitations-list',
              query: { visit_order_id: visit_order_id },
            }}>
              <button className={`${styles.button} ${styles.buttonBack}`}>
                <IoChevronBackOutline color="white" />
                Voltar
              </button>
            </Link>
            <div className={styles.editOptions}>
              <button
                className={`${styles.button} ${styles.buttonSave}`}
                onClick={handleSubmit}
              >
                Salvar
                <VscSaveAs color="white" />
              </button>
            </div>
          </div>
        </div>

        <form className={styles.formList} onSubmit={handleSubmit}>
          <Input required
            label={"Logradouro"}
            name="logradouro"
            type="text"
            value={formData.logradouro}
            onChange={handleInputChange}
            labelColor={"black"}
            placeholder="Insira o endereço completo"
          />
          <Input required
            label={"Número"}
            name="numero"
            type="text"
            value={formData.numero}
            onChange={handleInputChange}
            labelColor={"black"}
            placeholder="Insira o numéro"
          />
        </form>
      </div>
    </>
  );
}


export const getServerSideProps = canSSRAuth(async (ctx) => {
  const { visit_order_id } = ctx.query;
  return {
    props: {
      visit_order_id: visit_order_id
    }
  }
});
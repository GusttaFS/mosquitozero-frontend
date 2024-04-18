import { ChangeEvent, FormEvent, useContext, useState } from "react";
import Head from "next/head";
import styles from './styles.module.scss';

import { canSSRAuth } from "@/src/utils/canSSRAuth";
import { setupAPIClient } from "@/src/services/api";
import { AuthContext } from "@/src/contexts/AuthContext";

import Link from "next/link";
import { Header } from "@/src/components/Header";
import { Input } from "@/src/components/ui/Input";

import { IoChevronBackOutline } from "react-icons/io5";
import { LuPenSquare } from "react-icons/lu";
import { MdOutlineCancel } from "react-icons/md";
import { VscSaveAs } from "react-icons/vsc";

export default function VisitationDetails({ visitation }) {
  const { editVisitation } = useContext(AuthContext);

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    logradouro: visitation.data.logradouro,
    numero: visitation.data.numero,
  });

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setFormData({
      logradouro: visitation.data.logradouro,
      numero: visitation.data.numero,
    });
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    await editVisitation(visitation.id, {
      data: formData,
      deposito: {"value":"a"},
      amostra: {"value":"a"},
      tratamento: {"value":"a"}
    });

    setIsEditing(false);
  };

  return (
    <>
      <Head>
        <title>MosquitoZero | Visita</title>
        <link rel="icon" href="/favicon.png" />
      </Head>

      <Header />

      <div className={styles.container}>
        <div className={styles.options}>
          <div className={styles.rowContent}>
            <Link href={{
              pathname: '/visitations-list',
              query: { visit_order_id: "visitation.visitation_area.id" },
            }}>
              <button className={`${styles.button} ${styles.buttonBack}`}>
                <IoChevronBackOutline color="white" />
                Voltar
              </button>
            </Link>
            <div className={styles.editOptions}>
              {!isEditing && (
                <button
                  className={`${styles.button} ${styles.buttonEdit}`}
                  onClick={handleEditClick}
                >
                  Editar
                  <LuPenSquare color="white" />
                </button>
              )}
              {isEditing && (
                <>
                  <button
                    className={`${styles.button} ${styles.buttonSave}`}
                    onClick={handleSubmit}
                  >
                    Salvar
                    <VscSaveAs color="white" />
                  </button>
                  <button
                    className={`${styles.button} ${styles.buttonCancel}`}
                    onClick={handleCancelClick}
                  >
                    Cancelar
                    <MdOutlineCancel color="white" />
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        <form className={styles.formList} onSubmit={handleSubmit}>
          <Input
            label={"Logradouro"}
            name="logradouro"
            value={formData.logradouro}
            onChange={handleInputChange}
            labelColor={"black"}
            disabled={!isEditing}
          />
          <Input
            label={"Número"}
            name="numero"
            value={formData.numero}
            onChange={handleInputChange}
            labelColor={"black"}
            disabled={!isEditing}
          />
        </form>
      </div>
    </>
  );
}


export const getServerSideProps = canSSRAuth(async (ctx) => {
  const { visitation_id } = ctx.query;
  const apiClient = setupAPIClient(ctx);
  const response = await apiClient.get(`/visitation`, {
    headers: {
      'visitation_id': visitation_id,
    },
  });
  return {
    props: {
      visitation: response.data
    }
  }
});
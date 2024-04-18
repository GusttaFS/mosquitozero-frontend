import { ChangeEvent, FormEvent, useContext, useEffect, useState } from "react";
import Head from "next/head";
import styles from './styles.module.scss';

import { canSSRAuth } from "@/src/utils/canSSRAuth";
import { setupAPIClient } from "@/src/services/api";
import { AuthContext } from "@/src/contexts/AuthContext";

import { Header } from "@/src/components/Header";
import { Input } from "@/src/components/ui/Input";
import { Select } from "@/src/components/ui/Select";

import { VscSaveAs } from "react-icons/vsc";
import { LuPenSquare } from "react-icons/lu";
import { MdOutlineCancel } from "react-icons/md";
import { BackButton, CanceltButton, EditButton, SaveButton } from "@/src/components/ui/Button";


export default function Visitation({ visitation_area_id, visitation }) {
  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    quateirao: visitation?.data?.quarteirao || "",
    lado: visitation?.data?.lado || "",
    logradouro: visitation?.data?.logradouro || "",
    numero: visitation?.data?.numero || "",
  });

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
  };

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
  };

  useEffect(() => {
  }, []);

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
            <div className={styles.optionsRow}>
              <BackButton href={{
                pathname: '/visitation/list',
                query: { visitation_area_id: visitation_area_id },
              }} />

              <div className={styles.editOptions}>
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

            <p>Concluir visita</p>
            <p className={styles.title}>
              PESQUISA ENTOMOLÓGICA / TRATAMENTO
            </p>
          </div>

          <form className={styles.form} onSubmit={handleSubmit}>
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
        visitation_area_id: visitation_area_id || "",
        visitation: response.data,
      }
    }

  }

  return {
    props: {
      visitation_area_id: visitation_area_id || "",
      visitation: {}
    }
  }
});
import { } from "react";
import Head from "next/head";
import styles from './styles.module.scss';
import { canSSRAuth } from "@/src/utils/canSSRAuth";
import { Header } from "@/src/components/Header";
import { BackButton, NewLabelButton } from "@/src/components/ui/Button";
import { VisitationAreaCard } from "@/src/components/Card/VisitationAreaCard";
import { setupAPIClient } from "@/src/services/api";
import { AgenteDetails } from "@/src/components/Card/AgenteDetails";


type visitationArea = {
  id: string;
}


export default function AreaList({ agente, cycle_id, visitationAreas }) {

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
            <div className={`${styles.row} ${styles.optionsButtons}`}>
              <BackButton href={"/supervisor/home"} />
              <NewLabelButton
                href={{
                  pathname: "/supervisor/area/form",
                  query: { cycle_id: cycle_id, user_id: agente.id },
                }}
                label={"Atribuir Área"}
              />
            </div>
            <div className={styles.agenteDetails}>
              <AgenteDetails agente={agente} />
            </div>

            <p className={styles.title}>Áreas de visita atribuidas:</p>
          </div>

          <div className={styles.list}>
            {visitationAreas && visitationAreas.length > 0 ? (
              visitationAreas.map((visitationArea: visitationArea) => (
                <VisitationAreaCard
                  key={visitationArea?.id}
                  visitationArea={visitationArea}
                />
              ))
            ) : (
              <p className={styles.message}>
                Sem áreas atribuídas
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}


export const getServerSideProps = canSSRAuth(async (ctx) => {
  const { cycle_id, user_id } = ctx.query;
  const apiClient = setupAPIClient(ctx);

  let visitationAreas = [];
  let agente = {};

  try {
    const response = await apiClient.get('/user', {
      headers: {
        'user_id': user_id,
      },
    });
    agente = response.data;
  } catch (e) { }

  try {
    const response = await apiClient.get('/visitation-areas', {
      headers: {
        'user_id': user_id,
        'cycle_id': cycle_id
      },
    });
    visitationAreas = response.data;
  } catch (e) { }

  return {
    props: {
      cycle_id: cycle_id,
      agente: agente,
      visitationAreas: visitationAreas
    }
  }
}, 'supervisor');
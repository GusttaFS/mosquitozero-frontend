import { } from "react";
import Head from "next/head";
import styles from './styles.module.scss';
import { canSSRAuth } from "@/src/utils/canSSRAuth";
import { Header } from "@/src/components/Header";
import { NewLabelButton } from "@/src/components/ui/Button";
import { VisitationAreaCard } from "@/src/components/Card/VisitationAreaCard";
import { setupAPIClient } from "@/src/services/api";
import { AgenteDetails } from "@/src/components/Card/AgenteDetails";


type visitationArea = {
  id: string;
}


export default function AreaList({ cycle_id, user_id, agente, visitationAreas, cycle }) {


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
            <div className={styles.details}>
              <AgenteDetails
                agente={agente}
                visitationAreas={visitationAreas}
                cycle={cycle}
              />
            </div>
            <div className={styles.attAreaButton}>
              <NewLabelButton
                href={{
                  pathname: "/supervisor/area/form",
                  query: { 
                    cycle_id: cycle_id, 
                    user_id: user_id,
                  },
                }}
                label={"Atribuir Área"}
              />
            </div>

            <p className={styles.title}>Áreas de visita atribuidas:</p>
          </div>

          <div className={styles.list}>
            {visitationAreas && visitationAreas.length > 0 ? (
              visitationAreas.map((visitationArea: visitationArea) => (
                <VisitationAreaCard
                  href={{
                    pathname: "/supervisor/visitation/list",
                    query: {
                      cycle_id: cycle_id,
                      user_id: user_id,
                      visitation_area_id: visitationArea.id
                    },
                  }}
                  key={visitationArea.id}
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

  let agente = {};
  let cycle = {};
  let visitationAreas = [];

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
      user_id: user_id,
      agente: agente,
      cycle: cycle,
      visitationAreas: visitationAreas
    }
  }
}, 'supervisor');
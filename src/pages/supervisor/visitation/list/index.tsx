import { } from "react";
import Head from "next/head";
import styles from './styles.module.scss';
import { canSSRAuth } from "@/src/utils/canSSRAuth";
import { Header } from "@/src/components/Header";
import { setupAPIClient } from "@/src/services/api";
import { VisitationAreaDetails } from "@/src/components/Card/VisitationAreaDetails";
import { VisitationCard } from "@/src/components/Card/VisitationCard";
import { NewLabelButton } from "@/src/components/ui/Button";


type Visitation = {
  id: string;
}


export default function VisitationList({ cycle_id, user_id, visitation_area_id, cycle, visitationArea, visitations }) {

  return (
    <>
      <Head>
        <title>MosquitoZero | Visitas do Agente </title>
        <link rel="icon" href="/favicon.png" />
      </Head>

      <div className={styles.container}>
        <Header />

        <div className={styles.content}>
          <div className={styles.options}>
            <div className={styles.details}>
              <VisitationAreaDetails
                visitationArea={visitationArea}
                cycle={cycle}
              />
            </div>
            <div className={styles.addVisitationButton}>
              <NewLabelButton
                href={{
                  pathname: "/supervisor/visitation/form",
                  query: { 
                    cycle_id: cycle_id, 
                    user_id: user_id,
                    visitation_area_id: visitation_area_id
                  },
                }}
                label={"Adicionar Visita"}
              />
            </div>
            <p className={styles.title}>Visitas nessa área:</p>
          </div>

          <div className={styles.list}>
            {visitations && visitations.length > 0 ? (
              visitations.map((visitation: Visitation) => (
                <VisitationCard
                  href={{
                    pathname: "/supervisor/visitation/details",
                    query: {
                      cycle_id: cycle_id,
                      user_id: user_id,
                      visitation_area_id: visitation_area_id,
                      visitation_id: visitation.id
                    },
                  }}
                  key={visitation.id}
                  visitation={visitation}
                />
              ))
            ) : (
              <p className={styles.message}>
                Sem visitas nessa área
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}


export const getServerSideProps = canSSRAuth(async (ctx) => {
  const { cycle_id, user_id, visitation_area_id } = ctx.query;
  const apiClient = setupAPIClient(ctx);

  let cycle = {};
  let visitationArea = {};
  let visitations = [];

  try {
    const response = await apiClient.get('/cycle/id', {
      headers: {
        cycle_id: cycle_id
      },
    });
    cycle = response.data;
  } catch (e) { }


  try {
    const response = await apiClient.get('/visitation-area', {
      headers: {
        visitation_area_id: visitation_area_id
      },
    });
    visitationArea = response.data;
  } catch (e) { }

  try {
    const response = await apiClient.get('/visitations', {
      headers: {
        visitation_area_id: visitation_area_id
      },
    });
    visitations = response.data;
  } catch (e) { }

  return {
    props: {
      cycle_id: cycle_id,
      user_id: user_id,
      visitation_area_id: visitation_area_id,
      cycle: cycle,
      visitationArea: visitationArea,
      visitations: visitations
    }
  }
}, 'supervisor');
import { } from "react";
import Head from "next/head";
import styles from './styles.module.scss';
import { canSSRAuth } from "@/src/utils/canSSRAuth";
import { Header } from "@/src/components/Header";
import { setupAPIClient } from "@/src/services/api";
import { VisitationAreaDetails } from "@/src/components/Card/VisitationAreaDetails";
import { VisitationCard } from "@/src/components/Card/VisitationCard";
import { NewLabelButton } from "@/src/components/ui/Button";
import { AgenteDetails } from "@/src/components/Card/AgenteDetails";


type Visitation = {
  id: string;
}


export default function VisitationList({ agente, activeCycle, cycle, visitationArea, visitations }) {

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
              <AgenteDetails
                agente={agente}
                visitationAreas={undefined}
                cycle={undefined}
              />
              <VisitationAreaDetails
                visitationArea={visitationArea}
                cycle={cycle}
              />
            </div>

            {activeCycle?.id === cycle?.id ? (
              <div className={styles.addVisitationButton}>
                <NewLabelButton
                  href={{
                    pathname: "/supervisor/visitation/form",
                    query: {
                      cycle_id: cycle.id,
                      user_id: agente.id,
                      visitation_area_id: visitationArea.id
                    },
                  }}
                  label={"Adicionar Visita"}
                />
              </div>
            ) : (<> </>)}

            <p className={styles.title}>Visitas nessa área:</p>
          </div>

          <div className={styles.list}>
            {visitations && visitations.length > 0 ? (
              visitations.map((visitation: Visitation) => (
                <VisitationCard
                  href={{
                    pathname: "/supervisor/visitation/details",
                    query: {
                      cycle_id: cycle.id,
                      user_id: agente.id,
                      visitation_area_id: visitationArea.id,
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

  let cycle = { id: "" };
  let activeCycle = { id: "" };
  let agente = { id: "" };
  let visitationArea = { id: "" };
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
    const response = await apiClient.get('/cycle');
    activeCycle = response.data;
  } catch (e) { }

  try {
    const response = await apiClient.get('/user/id', {
      headers: {
        'user_id': user_id,
      },
    });
    agente = response.data;
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
      cycle: cycle,
      activeCycle: activeCycle,
      agente: agente,
      visitationArea: visitationArea,
      visitations: visitations
    }
  }
}, 'supervisor');
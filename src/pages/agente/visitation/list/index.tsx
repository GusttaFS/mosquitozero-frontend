import Head from "next/head";
import styles from './styles.module.scss';
import { canSSRAuth } from "@/src/utils/canSSRAuth";
import { setupAPIClient } from "@/src/services/api";
import { Header } from "@/src/components/Header";
import { VisitationCard } from "@/src/components/Card/VisitationCard";
import { VisitationAreaDetails } from "@/src/components/Card/VisitationAreaDetails";
import { NewLabelButton } from "@/src/components/ui/Button";


type Visitation = {
  id: string;
}


export default function VisitationList({ cycle_id, user_id, visitation_area_id, cycle, visitationArea, visitations }) {
  return (
    <>
      <Head>
        <title>MosquitoZero | Suas Visitas</title>
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
            <div className={styles.addVisitButton}>
              <NewLabelButton
                href={{
                  pathname: "/agente/visitation/form",
                  query: {
                    cycle_id: cycle_id,
                    user_id: user_id,
                    visitation_area_id: visitation_area_id
                  },
                }}
                label={"Adicionar visita"}
              />
            </div>
            <p className={styles.title}>Suas visitas:</p>
          </div>

          <div className={styles.list}>
            {visitations.length === 0 ? (
              <p className={styles.message}>Sem visitas nessa área.</p>
            ) : (
              visitations.map((visitation: Visitation) => (
                <VisitationCard
                  href={"/"}
                  visitation={visitation}
                />
              ))
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
}, 'agente');
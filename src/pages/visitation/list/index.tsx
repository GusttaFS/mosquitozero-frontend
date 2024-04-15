import Head from "next/head";
import styles from './styles.module.scss';

import { canSSRAuth } from "@/src/utils/canSSRAuth";
import { setupAPIClient } from "@/src/services/api";

import { Header } from "@/src/components/Header";
import { VisitationCard } from "@/src/components/VisitationCard";
import { BackButton } from "@/src/components/ui/BackButton";
import { NewVisitButton } from "@/src/components/ui/NewVisitButton";
import { VisitationAreaCard } from "@/src/components/VisitationAreaCard";


export default function VisitationList({ visitationsList, visitationAera }) {
  return (
    <>
      <Head>
        <title>MosquitoZero | Suas Visitas</title>
        <link rel="icon" href="/favicon.png" />
      </Head>

      <div className={styles.listContainer}>
        <Header />

        <div className={styles.listContent}>
          <div className={styles.listOptions}>
            <div className={styles.rowContent}>
              <BackButton href={"/home"} />
              <NewVisitButton visitationAreaId={undefined} />
            </div>

            <div className={styles.visitationAreaDetails}>
              //VisitationDe
            </div>

            <p className={styles.visitationListTitle}>Suas visitas:</p>
          </div>

          <div className={styles.visitationsList}>
            {visitationsList.length === 0 ? (
              <p className={styles.noVisitsMessage}>Sem visitas nessa área.</p>
            ) : (
              visitationsList.map((visitation) => (
                <VisitationCard
                  key={visitation?.id} visitation={visitation} />
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
  const { visitation_area_id } = ctx.query;
  const apiClient = setupAPIClient(ctx);

  const visitations = await apiClient.get(`/visitations`, {
    headers: {
      'visitation_area_id': visitation_area_id,
    },
  });

  const visitationAera = await apiClient.get(`/visitation-area`, {
    headers: {
      'visitation_area_id': visitation_area_id,
    },
  });
  return {
    props: {
      visitationsList: visitations.data,
      visitationAera: visitationAera.data
    }
  }
});
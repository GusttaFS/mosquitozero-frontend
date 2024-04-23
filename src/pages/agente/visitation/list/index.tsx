import Head from "next/head";
import styles from './styles.module.scss';

import { canSSRAuth } from "@/src/utils/canSSRAuth";
import { setupAPIClient } from "@/src/services/api";

import { Header } from "@/src/components/Header";
import { VisitationCard } from "@/src/components/Card/VisitationCard";

import { VisitationAreaDetails } from "@/src/components/Card/VisitationAreaDetails";

import { BackButton, NewVisitButton } from "@/src/components/ui/Button";


export default function VisitationList({ visitationsList, visitationAera }) {
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
            <div className={styles.optionsRow}>
              <BackButton href={"/home"} />
              <NewVisitButton visitationAreaId={visitationAera?.id} />
            </div>

            <div className={styles.visitationAreaDetails}>
              <VisitationAreaDetails visitationArea={visitationAera} />
            </div>


            <p className={styles.listTitle}>Suas visitas:</p>
          </div>

          <div className={styles.visitationsList}>
            {visitationsList.length === 0 ? (
              <p className={styles.noVisitsMessage}>Sem visitas nessa área.</p>
            ) : (
              visitationsList.map((visitation) => (
                <VisitationCard
                  key={visitation?.id} visitation={visitation} visitation_area_id={visitationAera?.id} />
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
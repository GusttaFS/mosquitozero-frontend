import styles from './styles.module.scss';

import { canSSRAuth } from "@/src/utils/canSSRAuth";
import { setupAPIClient } from "@/src/services/api";

import Head from "next/head";
import Link from "next/link";

import { Header } from "@/src/components/Header";
import { VisitationAreaCard } from "@/src/components/VisitationAreaCard";

import { SlArrowRight } from "react-icons/sl";


export default function Home({ activeCycle, visitationAreas }) {
  return (
    <>
      <Head>
        <title>MosquitoZero | Suas Áreas</title>
        <link rel="icon" href="/favicon.png" />
      </Head>

      <div className={styles.homeContainer}>
        <Header />

        <div className={styles.homeContent}>
          <div className={styles.homeOptions}>
            <div className={styles.cycleInfo}>
              <p>Cilco atual:</p>
              <b>{activeCycle?.data.ciclo} / {activeCycle?.data.ano}</b>
            </div>
            <Link href={"/cycles"} className={styles.pastCyclesLink}>
              <p>Acessar ciclos anteriores</p>
              <SlArrowRight size={9} />
            </Link>
            <p className={styles.visitationAreaTitle}>Áreas de visita:</p>
          </div>

          <div className={styles.visitationAreasList}>
            {visitationAreas && visitationAreas.length > 0 ? (
              visitationAreas.map((visitationArea) => (
                <VisitationAreaCard
                  key={visitationArea?.id}
                  visitationArea={visitationArea}
                  progress={visitationArea?.data.progress} />
              ))
            ) : (
              <p className={styles.noVisitationAreaMessage}>
                Você não tem áreas atribuídas
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}


export const getServerSideProps = canSSRAuth(async (ctx) => {
  const apiClient = setupAPIClient(ctx);
  const activeCycle = await apiClient.get('/cycle');

  const visitationAreas = await apiClient.get('/visitation-areas', {
    headers: {
      'cycle_id': activeCycle?.data.id
    },
  });

  return {
    props: {
      activeCycle: activeCycle?.data,
      visitationAreas: visitationAreas?.data
    }
  }
});
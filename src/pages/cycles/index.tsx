import styles from './styles.module.scss';

import { canSSRAuth } from "@/src/utils/canSSRAuth";
import { setupAPIClient } from "@/src/services/api";

import Head from "next/head";

import { Header } from "@/src/components/Header";
import { BackButton } from '@/src/components/ui/BackButton';
import { CycleCard } from '@/src/components/CycleCard';


export default function Cycles({ pastCycles }) {
  return (
    <>
      <Head>
        <title>MosquitoZero | Ciclos Anteriores</title>
        <link rel="icon" href="/favicon.png" />
      </Head>

      <div className={styles.cyclesContainer}>
        <Header />

        <div className={styles.cyclesContent}>
          <div className={styles.cyclesOptions}>
            <BackButton href={"/home"} />
            <p className={styles.visitationAreaTitle}>Ciclos anteriores:</p>
          </div>

          <div className={styles.cyclesList}>
            {pastCycles.length === 0 ? (
              <p className={styles.noCyclesMessage}>
                Não há ciclos anteriores.
              </p>
            ) : (
              pastCycles.map((cycle) => (
                <CycleCard key={cycle.id} cycle={cycle} cycleId={cycle.id} />
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
}


export const getServerSideProps = canSSRAuth(async (ctx) => {
  const apiClient = setupAPIClient(ctx);
  const pastCycles = await apiClient.get('/cycles');

  return {
    props: {
      pastCycles: pastCycles.data,
    }
  }
});
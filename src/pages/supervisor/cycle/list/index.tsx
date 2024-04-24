import styles from './styles.module.scss';
import { canSSRAuth } from "@/src/utils/canSSRAuth";
import { setupAPIClient } from "@/src/services/api";
import Head from "next/head";
import { Header } from "@/src/components/Header";
import { CycleSupervisorCard } from '@/src/components/Card/CycleSupervisorCard';


type Cycle = {
  id: string;
}


export default function CycleList({ pastCycles, activeCycle }) {
  return (
    <>
      <Head>
        <title>MosquitoZero | Ciclos Anteriores</title>
        <link rel="icon" href="/favicon.png" />
      </Head>

      <div className={styles.container}>
        <Header />

        <div className={styles.content}>
          <div className={styles.options}>
            <div className={styles.cycleInfo}>
              <p>Cilco atual:</p>
              <b>{activeCycle?.data?.ciclo} / {activeCycle?.data?.ano}</b>
            </div>
            <p className={styles.title}>Ciclos anteriores:</p>
          </div>

          <div className={styles.list}>
            {pastCycles.length === 0 ? (
              <p className={styles.message}>
                Não há ciclos anteriores.
              </p>
            ) : (
              pastCycles.map((cycle: Cycle) => (
                <CycleSupervisorCard
                  key={cycle.id}
                  cycle={cycle}
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
  const apiClient = setupAPIClient(ctx);
    
  let activeCycle = {};
  let pastCycles = [];

  try {
    const response = await apiClient.get('/cycle');
    activeCycle = response.data;
  } catch (e) { }

  try {
    const response = await apiClient.get('/cycles');
    pastCycles = response.data;
  } catch (e) { }

  return {
    props: {
      activeCycle: activeCycle,
      pastCycles: pastCycles
    }
  }
}, 'supervisor');
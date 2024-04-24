import styles from './styles.module.scss';
import { canSSRAuth } from "@/src/utils/canSSRAuth";
import { setupAPIClient } from "@/src/services/api";
import Head from "next/head";
import { Header } from "@/src/components/Header";
import { CycleAgenteCard } from '@/src/components/Card/CycleAgenteCard';


type Cycle = {
  id: string;
}


export default function CycleList({ pastCycles, activeCycle, user }) {
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
                <CycleAgenteCard
                  key={cycle?.id}
                  cycle={cycle}
                  user={user}
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
  let user = { };

  try {
    const response = await apiClient.get('/cycle');
    activeCycle = response.data;
  } catch (e) { }

  try {
    const response = await apiClient.get('/cycles');
    pastCycles = response.data;
  } catch (e) { }

  try {
    const response = await apiClient.get('/user');
    user = response.data;
  } catch (e) { }
  
  return {
    props: {
      activeCycle: activeCycle,
      pastCycles: pastCycles,
      user: user
    }
  }
}, 'agente');
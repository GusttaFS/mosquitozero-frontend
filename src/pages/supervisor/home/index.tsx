import Head from 'next/head';
import styles from './styles.module.scss';
import { Header } from '@/src/components/Header';
import Link from 'next/link';
import { SlArrowRight } from 'react-icons/sl';
import { canSSRAuth } from '@/src/utils/canSSRAuth';
import { setupAPIClient } from '@/src/services/api';
import { AgenteCard } from '@/src/components/Card/AgenteCard';
import { NewLabelButton } from '@/src/components/ui/Button';


type AgenteData = {
  id: string;
}


export default function Home({ activeCycle, agentes }) {

  return (
    <>
      <Head>
        <title>MosquitoZero | Home </title>
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
            <Link href={"/supervisor/cycles"} className={styles.pastCyclesLink}>
              <p>Acessar ciclos anteriores</p>
              <SlArrowRight size={9} />
            </Link>
            <div className={styles.newCycleButton}>
              <NewLabelButton href={"/supervisor/cycle"} label={"Novo Ciclo"} />
            </div>
            <p className={styles.title}>Agentes:</p>
          </div>

          <div className={styles.visitationAreasList}>
            {agentes && agentes.length > 0 ? (
              agentes.map((agente: AgenteData) => (
                <AgenteCard
                  key={agente?.id}
                  agente={agente}
                  cycleId={activeCycle?.id}
                />
              ))
            ) : (
              <p className={styles.message}>
                Sem agentes cadastrados
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

  let agentes = [];
  let activeCycle = {};

  try {
    const response = await apiClient.get('/users');
    agentes = response.data;
  } catch (e) { }

  try {
    const response = await apiClient.get('/cycle');
    activeCycle = response.data;
  } catch (e) { }

  return {
    props: {
      activeCycle: activeCycle,
      agentes: agentes
    }
  }
}, 'supervisor');
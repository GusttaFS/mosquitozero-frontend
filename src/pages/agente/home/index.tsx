import styles from './styles.module.scss';
import { canSSRAuth } from "@/src/utils/canSSRAuth";
import { setupAPIClient } from "@/src/services/api";
import Head from "next/head";
import Link from "next/link";
import { Header } from "@/src/components/Header";
import { VisitationAreaCard } from "@/src/components/Card/VisitationAreaCard";
import { SlArrowRight } from "react-icons/sl";


type VisitationArea = {
  id: string;
}


export default function Home({ activeCycle, visitationAreas, user }) {
  return (
    <>
      <Head>
        <title>MosquitoZero | Suas Áreas</title>
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
            <Link href={"/agente/cycle/list"} className={styles.pastCyclesLink}>
              <p>Acessar ciclos anteriores</p>
              <SlArrowRight size={9} />
            </Link>
            <p className={styles.title}>Áreas de visita:</p>
          </div>

          <div className={styles.list}>
            {visitationAreas && visitationAreas.length > 0 ? (
              visitationAreas.map((visitationArea: VisitationArea) => (
                <VisitationAreaCard
                  href={{
                    pathname: "/agente/visitation/list",
                    query: {
                      cycle_id: activeCycle?.id,
                      user_id: user?.id,
                      visitation_area_id: visitationArea.id
                    },
                  }}
                  key={visitationArea?.id}
                  visitationArea={visitationArea}
                />
              ))
            ) : (
              <p className={styles.message}>
                Sem áreas atribuídas
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

  let activeCycle = { id: "" };
  let user = { id: "" };
  let visitationAreas = [];

  try {
    const response = await apiClient.get('/cycle');
    activeCycle = response.data;
  } catch (e) { }

  try {
    const response = await apiClient.get('/user');
    user = response.data;
  } catch (e) { }

  try {
    const response = await apiClient.get('/visitation-areas', {
      headers: {
        'user_id': user.id,
        'cycle_id': activeCycle.id
      },
    });
    visitationAreas = response.data;
  } catch (e) { }

  return {
    props: {
      activeCycle: activeCycle,
      visitationAreas: visitationAreas,
      user: user
    }
  }
}, 'agente');
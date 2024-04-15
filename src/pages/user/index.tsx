import Head from "next/head";

import { canSSRAuth } from "@/src/utils/canSSRAuth";


export default function User({ }) {
  return (
    <>
      <Head>
        <title>MosquitoZero | Seu Perfil</title>
        <link rel="icon" href="/favicon.png" />
      </Head>
      <h1>PERFIL DO USER</h1>
    </>
  );
}


export const getServerSideProps = canSSRAuth(async (ctx) => {
  return {
    props: {
    }
  }
});
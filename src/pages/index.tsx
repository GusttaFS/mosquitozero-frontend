import { useContext, FormEvent, useState } from 'react';

import Head from "next/head";
import Image from "next/image";
import styles from "@/styles/home.module.scss";

import LogoImg from "@/public/logo.png";

import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";

import { AuthContext } from "@/src/contexts/AuthContext";

import Link from 'next/link';

import { canSSRGuest } from '../utils/canSSRGuest';

export default function Home() {
  const { signIn } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  async function handleLogin(event: FormEvent) {
    event.preventDefault();

    if (email === "" || password === "") {
      setErrorMessage("Por favor, preencha todos os campos.");
      return;
    }

    setLoading(true);

    try {
      await signIn({
        email: email,
        password: password
      });
    } catch (error) {
      setErrorMessage("Credenciais inválidas. Por favor, verifique seu e-mail e senha.");
    }

    setLoading(false);
  }

  return (
    <>
      <Head>
        <title>MosquitoZero | Faça seu Login</title>
        <link rel="icon" href="/favicon.png" />
      </Head>

      <div className={styles.containerCenter}>
        <Image className={styles.img} src={LogoImg} alt="Logo MosquitoZero" priority/>

        <div className={styles.login}>
          <form onSubmit={handleLogin}>
            <Input label="E-mail"
              placeholder="Digite aqui o seu e-mail"
              type="email"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setErrorMessage("") }}
            />

            <Input label="Senha"
              placeholder="Digite aqui a sua senha"
              type="password"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setErrorMessage("") }}
            />

            {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}

            <Button
              type="submit"
              loading={loading}
            >
              Acessar
            </Button>
          </form>

          <p className={styles.text}>Não possui uma conta?</p>
          <Link href="/signup">
            <p className={styles.textLink}>Cadastre-se</p>
          </Link>
        </div>
      </div>
    </>
  );
}

export const getServerSideProps = canSSRGuest(async (ctx) => {
  return {
    props: {}
  }
});
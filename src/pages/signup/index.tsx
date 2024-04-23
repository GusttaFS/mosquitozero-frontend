import { ChangeEvent, FormEvent, useContext, useState } from "react";
import styles from './styles.module.scss';

import Head from "next/head";
import Image from "next/image";
import Link from 'next/link';

import { Input } from "../../components/ui/Input";
import { Button } from "../../components/ui/Button";
import LogoImg from "@/public/logoImg.png";

import { AuthContext } from "@/src/contexts/AuthContext";
import { Select } from "@/src/components/ui/Select";
import { formatPhoneNumber } from "@/src/utils/formatPhoneNumber";


export default function SignUp() {
  const { signUp } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    data: {
      telefone: ""
    },
    cargo: { "value": "A", "label": "Agente" }
  });

  const cargoOptions = [
    { "value": "A", "label": "Agente" },
    { "value": "S", "label": "Supervisor" },
  ];

  const [loading, setLoading] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isValidPhoneNumber, setIsValidPhoneNumber] = useState(true);
  const [isValidPassword, setIsValidPassword] = useState(true);

  function handleInputEmail(event: ChangeEvent<HTMLInputElement>) {
    const email: string = event.target.value;
    setFormData(formData => ({
      ...formData,
      email: email
    }));
    setIsValidEmail(validateRegex(email, /^[^\s@]+@[^\s@]+\.[^\s@]+$/));
  }

  function handleInputPassword(event: ChangeEvent<HTMLInputElement>) {
    const password: string = event.target.value;
    setFormData(formData => ({
      ...formData,
      password: password
    }));
    setIsValidPassword(validateRegex(password, /^.{8,}$/));
  }

  function handleInputPhoneNumber(event: ChangeEvent<HTMLInputElement>) {
    const phoneNumber: string = event.target.value;
    const formattedPhoneNumber = formatPhoneNumber(phoneNumber);
    setFormData(formData => ({
      ...formData,
      data: {
        telefone: formattedPhoneNumber
      }
    }));
    setIsValidPhoneNumber(validateRegex(formattedPhoneNumber, /^\([0-9]{2}\) [0-9]{5}-[0-9]{4}$/));
  }

  function validateRegex(value: string, regex: RegExp): boolean {
    const isValid: boolean = regex.test(value);
    return isValid;
  }

  async function handleSignUp(event: FormEvent) {
    event.preventDefault();
    setLoading(true);
    await signUp(formData);
    setLoading(false);
  }

  return (
    <>
      <Head>
        <title>MosquitoZero | Faça seu cadastro</title>
        <link rel="icon" href="/favicon.png" />
      </Head>

      <div className={styles.container}>
        <div className={styles.signIn}>

          <Image className={styles.img} src={LogoImg} alt="Logo MosquitoZero" priority />
          <h1 className={styles.tittle}>CRIANDO SUA CONTA</h1>

          <form onSubmit={handleSignUp}>
            <Input
              required
              label="Nome"
              placeholder="Digite o seu nome completo"
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />

            <div >
              <Input
                required
                label="E-mail"
                placeholder="Digite o seu e-mail"
                type="email"
                value={formData.email}
                onChange={handleInputEmail}
              />
              {!isValidEmail && (
                <p className={styles.errorMessage}>Por favor, insira um e-mail válido.</p>
              )}
            </div>

            <div>
              <Input
                required
                label="Senha"
                placeholder="Digite a sua senha"
                type="password"
                value={formData.password}
                onChange={handleInputPassword}
              />
              {!isValidPassword && (
                <p className={styles.errorMessage}>Insira uma senha com no mínimo 8 caracteres.</p>
              )}
            </div>

            <div>
              <Input
                required
                label="Telefone"
                placeholder="Ex: (DDD) 9XXXX-XXXX"
                type="tel"
                value={formData.data.telefone}
                onChange={handleInputPhoneNumber}
              />
              {!isValidPhoneNumber && (
                <p className={styles.errorMessage}>Por favor, insira um telefone válido.</p>
              )}
            </div>

            <Select
              label={"Cargo"}
              options={cargoOptions}
              value={formData.cargo}
              onChange={(o) => setFormData({ ...formData, cargo: o })}
              disabled={false}
            />

            <Button
              type="submit"
              loading={loading}
            >
              Cadastrar
            </Button>
          </form>

          <p className={styles.text}>Já possui uma conta?</p>
          <Link href="/">
            <p className={styles.textLink}>Faça o login</p>
          </Link>
        </div>
      </div>
    </>
  );
}
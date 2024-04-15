import Head from "next/head";
import styles from './styles.module.scss';

import { Input, Select } from "../../components/ui/Input";
import { Button } from "../../components/ui/Button";

import { AuthContext } from "@/src/contexts/AuthContext";

import Link from 'next/link';
import { ChangeEvent, FormEvent, useContext, useState } from "react";

export default function SignUp() {
  const { signUp } = useContext(AuthContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [registNumber, setRegistNumber] = useState("");
  const [experience, setExperience] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [city, setCity] = useState("");

  const cities = [
    { value: 'Campina Grande', label: 'Campina Grande' },
    { value: 'Recife', label: 'Recife' },
  ];

  const [loading, setLoading] = useState(false);

  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isValidPhoneNumber, setIsValidPhoneNumber] = useState(true);
  const [isValidPassword, setIsValidPassword] = useState(true);

  async function handleInputEmail(event: ChangeEvent<HTMLInputElement>) {
    const email = event.target.value;
    setEmail(email);
    setIsValidEmail(validateRegex(email, /^[^\s@]+@[^\s@]+\.[^\s@]+$/));
  }

  async function handleInputPassword(event: ChangeEvent<HTMLInputElement>) {
    const password = event.target.value;
    setPassword(password);
    setIsValidPassword(validateRegex(password, /^.{8,}$/));
  }

  async function handleInputPhoneNumber(event: ChangeEvent<HTMLInputElement>) {
    const phoneNumber = event.target.value;
    setPhoneNumber(phoneNumber);
    setIsValidPhoneNumber(validateRegex(phoneNumber, /^\([0-9]{2}\) [9][0-9]{4}-[0-9]{4}$/));
  }

  function validateRegex(value, regex) {
    const isValid = regex.test(value);
    return isValid;
  }

  async function handleSignUp(event: FormEvent) {
    event.preventDefault();

    setLoading(true);
    let data = {
      email,
      password,
      name,
      "data": {
        registNumber, experience, phoneNumber, city
      }
    }
    await signUp(data);
    setLoading(false);
  }

  return (
    <>
      <Head>
        <title>MosquitoZero | Faça seu cadastro</title>
        <link rel="icon" href="/favicon.png" />
      </Head>
      <div className={styles.containerCenter}>
        <div className={styles.signIn}>
          <h1 className={styles.topText}>CRIANDO SUA CONTA</h1>
          <form onSubmit={handleSignUp}>
            <Input label="Nome" required
              placeholder="Digite o seu nome completo"
              type="text"
              value={name}
              onChange={(e) => { setName(e.target.value) }}
            />
            
            <Input label="E-mail" required
              placeholder="Digite o seu e-mail"
              type="email"
              value={email}
              onChange={handleInputEmail}
            />
            {!isValidEmail && (
              <p className={styles.errorMessage}>Por favor, insira um e-mail válido.</p>
            )}
            
            <Input label="Senha" required
              placeholder="Digite a sua senha"
              type="password"
              value={password}
              onChange={handleInputPassword}
            />
            {!isValidPassword && (
              <p className={styles.errorMessage}>Insira uma senha com no minimo 8 digitos.</p>
            )}
            
            <div className={styles.inputRow}>
              <Input label="Matrícula" required
                placeholder="Sua matrícula"
                type="text"
                value={registNumber}
                onChange={(e) => { setRegistNumber(e.target.value) }}
              />

              <Input label="Experiência" required
                placeholder="Em anos"
                type="number"
                min={1}
                max={90}
                value={experience}
                onChange={(e) => { setExperience(e.target.value) }}
              />
            </div>

            <Input label="Telefone" required
              placeholder="Ex: (DDD) 9XXXX-XXXX"
              type="tel"
              value={phoneNumber}
              onChange={handleInputPhoneNumber}
            />
            {!isValidPhoneNumber && (
              <p className={styles.errorMessage}>Por favor, insira um telefone válido.</p>
            )}
            
            <Select label="Cidade" required
              options={cities}
              value={city}
              onChange={(e) => { setCity(e.target.value) }}
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

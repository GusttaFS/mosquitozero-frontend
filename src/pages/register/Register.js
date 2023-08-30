import {
    IonInput,
    IonButton,
    IonSelect,
    IonToolbar,
    IonItem,
    IonList,
    IonLabel,
    IonNote,
    IonHeader,
    IonGrid,
    IonRow,
    IonButtons,
    IonCol,
    IonBackButton,
    IonPage,
    IonTitle,
    IonSelectOption
} from '@ionic/react';
import React, { useState } from 'react';
import { useMaskito } from '@maskito/react';
import './register-style.css'


function Register() {

    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [yars, setYares] = useState('');
    const [city, setCity] = useState();
    const [role, setRole] = useState('');
    const [situation, setSituation] = useState('');
    const [matricula, setMatricula] = useState('');

    const [isTouched, setIsTouched] = useState(false);
    const [isValidEmail, setIsValidEmail] = useState();
    const [isValidPhone, setIsValidPhone] = useState();

    const validateEmailFormat = (email) => {
        return email.match(/^[A-Z0-9._%+-]+@(gmail|hotmail|outlook)+\.com$/i);
    };

    const validatePhoneFormat = (phone) => {
        return phone.match(/^\(\d{2}\) \d{5}-\d{4}$/i);
    };

    const validateEmail = (event) => {
        const value = (event.target).value;
        setEmail(value);
        if (value === '') return;
        validateEmailFormat(value) !== null ? setIsValidEmail(true) : setIsValidEmail(false);
    };

    const validatePhone = (event) => {
        const value = (event.target).value;
        if (value === '') return
        validatePhoneFormat(value) !== null ? setIsValidPhone(true) : setIsValidPhone(false);
    };

    const phoneMask = useMaskito({
        options: {
            mask: ['(', /\d/, /\d/, ')', ' ', '9', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
        },
    });

    const markTouched = () => {
        setIsTouched(true);
    };

    return (
        <IonPage>
            <IonHeader translucent={true}>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="#"></IonBackButton>
                    </IonButtons>
                    <IonTitle className="header-title">Cadastro</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonList className='form'>
                <IonItem fill='outline'
                    className={`${name && 'ion-valid'} ${name === '' && 'ion-invalid'} ${isTouched && 'ion-touched'}`}>
                    <IonLabel position='floating'>Nome</IonLabel>
                    <IonInput
                        clearInput={true}
                        type='text'
                        placeholder='Insira o nome completo'
                        value={name}
                        onIonInput={(event) => setName(event.target.value)}
                        onIonChange={(event) => setName(event.detail.value)}
                    />
                    <IonNote slot="error">Insira o nome</IonNote>
                </IonItem>
                <IonItem fill='outline'
                    className={`${isValidEmail && email !== '' && 'ion-valid'} ${isValidEmail === false && email === '' && 'ion-invalid'}`}>
                    <IonLabel position='floating'>Email</IonLabel>
                    <IonInput
                        clearInput={true}
                        type='email'
                        placeholder='email@domain.com'
                        value={email}
                        onIonInput={(event) => validateEmail(event)}
                        onIonChange={(event) => setEmail(event.detail.value)}
                    />
                    <IonNote slot="error">Email inválido</IonNote>
                </IonItem>
                <IonItem fill='outline'
                    className={`${password && 'ion-valid'} ${password === '' && 'ion-invalid'} ${isTouched && 'ion-touched'}`}>
                    <IonLabel position='floating'>Senha</IonLabel>
                    <IonInput
                        clearInput={true}
                        type='password'
                        value={password}
                        onIonInput={(event) => setPassword(event.target.value)}
                        onIonChange={(event) => setPassword(event.detail.value)}
                    />
                    <IonNote slot="error">Insira uma Senha</IonNote>
                </IonItem>
                <IonItem fill='outline' className='item'>
                    <IonLabel position='floating'>Cidade</IonLabel>
                    <IonSelect>
                        <IonSelectOption value="Campina Grande">Campina Grande</IonSelectOption>
                        <IonSelectOption value="Recife">Campina Grande</IonSelectOption>
                    </IonSelect>
                </IonItem>
                <IonItem fill='outline'>
                    <IonLabel position='floating'>Cargo</IonLabel>
                    <IonSelect>
                        <IonSelectOption value="Agente">Agente</IonSelectOption>
                    </IonSelect>
                </IonItem>
                <IonItem fill='outline'
                    className={`${isValidPhone && 'ion-valid'} ${isValidPhone === false && 'ion-invalid'} ${isTouched && 'ion-touched'}`}>
                    <IonLabel position='floating'>Telefone</IonLabel>
                    <IonInput
                        ref={async (phoneInput) => {
                            if (phoneInput) {
                                const input = await phoneInput.getInputElement();
                                phoneMask(input);
                            }
                        }}
                        clearInput={true}
                        placeholder='(DDD) 90000-0000'
                        onIonInput={(event) => validatePhone(event)}
                        onIonBlur={() => markTouched()}
                    />
                    <IonNote slot="error">Telefone inválido</IonNote>
                </IonItem>
                <IonGrid style={{ padding: 0 }}>
                    <IonRow>
                        <IonCol style={{ paddingTop: 0, paddingBottom: 0, paddingLeft: 0 }}>
                            <IonItem fill='outline'>
                                <IonLabel position='floating'>Matrícula</IonLabel>
                                <IonInput clearInput={true}></IonInput>
                            </IonItem>
                        </IonCol>
                        <IonCol style={{ paddingTop: 0, paddingBottom: 0, paddingRight: 0 }}>
                            <IonItem fill='outline' >
                                <IonLabel position='floating'>Anos de Experiência</IonLabel>
                                <IonInput
                                    type='number'
                                    value={0}
                                    min={0}
                                    max={100}
                                />
                            </IonItem>
                        </IonCol>
                    </IonRow>
                </IonGrid>
                <IonItem fill='outline'>
                    <IonLabel position='floating'>Situação</IonLabel>
                    <IonSelect>
                        <IonSelectOption value="Disponível">Disponível</IonSelectOption>
                    </IonSelect>
                </IonItem>
                <IonButton style={{ marginTop: '5%', padding: 5 }}
                    type='submit'
                    shape='round'
                    disabled={true}>
                    CADASTRAR
                </IonButton>
            </IonList>
        </IonPage>
    );
}

export default Register;
import { createContext, ReactNode, useEffect, useState } from 'react';

import { api } from '../services/apiClient';

import { destroyCookie, setCookie, parseCookies } from 'nookies';
import Router from 'next/router';

import { toast } from 'react-toastify';

type AuthContextData = {
    user: UserProps;
    isAuthenticated: boolean;
    signIn: (credentials: SignInProps) => Promise<void>;
    signOut: () => void;
    signUp: (credentials: SignUpProps) => Promise<void>;
    createCycle: (data: CycleData) => Promise<void>;
    createVisitationArea: (cycleId: string, userId: string, data: VisitationAreaData) => Promise<void>;
    createVisitation: (visitOrderId: string, data: VisitationData) => Promise<void>;
    editVisitation: (visitationId: string, data: VisitationData) => Promise<void>;
    patchVisitation: (visitationId: string, visitationAreaId: string) => Promise<VisitationPatchResponse>;
    getVisitationAreas: (cycleId: string) => Promise<[]>;
}

type UserProps = {
    id: string;
    email: string;
    name: string;
    cargo: string;
}

type SignInProps = {
    email: string;
    password: string;
}

type SignUpProps = {
    email: string;
    password: string;
    name: string;
    data: Object;
    cargo: string;
}

type VisitationData = {
    data: Object;
    deposito: Object;
    amostra: Object;
    tratamento: Object;
}



type VisitationPatchResponse = {
    id: string
    is_completed: boolean;
}

type CycleData = {
    data: Object;
}

type VisitationAreaData = {
    data: Object;
}

type AuthProviderProps = {
    children: ReactNode;
}


export const AuthContext = createContext({} as AuthContextData)


export function signOut() {
    try {
        destroyCookie(undefined, '@nextauth.token');
        Router.push('/');
    } catch (error) {
        throw error;
    }
}


export function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<UserProps>();
    const isAuthenticated = !!user;

    useEffect(() => {
        const { '@nextauth.token': token } = parseCookies();
        if (token) {
            api.get('/user').then(response => {
                const { id, email, name, cargo } = response.data;
                setUser({
                    id,
                    email,
                    name,
                    cargo
                });
            }).catch(() => {
                signOut();
            });
        }
    }, []);

    async function signIn({ email, password }: SignInProps) {
        try {
            const response = await api.post('/login', {
                email,
                password
            });

            const { id, name, token, cargo } = response.data;

            setCookie(undefined, '@nextauth.token', token, {
                maxAge: 60 * 60 * 24,
                path: "/"
            });

            setUser({
                id,
                email,
                name,
                cargo
            });

            api.defaults.headers['Authorization'] = `Bearer ${token}`;
            Router.push(cargo === 'supervisor' ? '/supervisor/home' : '/agente/home');
        } catch (error) {
            throw error;
        }
    }


    async function signUp(data : SignUpProps) {
        try {
            await api.post('/user', data);
            toast.success("Cadastro realizado com sucesso!")
            Router.push('/');
        } catch (error) {
            throw error;
        }
    }


    async function editVisitation(visitationId: string, data: VisitationData) {
        try {
            await api.put(`/visitation`, data, {
                headers: {
                    'visitation_id': visitationId,
                },
            });
            toast.success("Visita salva com sucesso!");
        } catch (error) {
            throw error;
        }
    }

    async function createVisitation(visitationAreaId: string, data: VisitationData) {
        try {
            await api.post(`/visitation`, data, {
                headers: {
                    'visitation_area_id': visitationAreaId,
                },
            });
            toast.success("Visita salva com sucesso!");
        } catch (error) {
            throw error;
        }
    }

    async function createCycle(data: CycleData) {
        try {
            await api.post('/cycle', data);
            toast.success("Novo ciclo criado com sucesso!");
        } catch (e) {
            console.log(e)
        }
    }

    async function createVisitationArea(cycleId: string, userId: string, data: VisitationAreaData) {
        try {
            await api.post(`/visitation-area`, data, {
                headers: {
                    'cycle_id': cycleId,
                    'user_id': userId
                },
            });
            toast.success("Visita atribuida com sucesso!");
        } catch (error) {
            throw error;
        }
    }

    async function getVisitationAreas(cycleId: string) {
        try {
            const response = await api.get(`/visitation-areas`, {
                headers: {
                    'cycle_id': cycleId,
                },
            });
            console.log(response.data);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }


    async function patchVisitation(visitationId: string, visitationAreaId: string) {
        try {
            const response = await api.patch(`/visitation`, null, {
                headers: {
                    'visitation_id': visitationId,
                    'visitation_area_id': visitationAreaId
                },
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    }


    return (
        <AuthContext.Provider value={{
            user,
            isAuthenticated,
            signIn,
            signOut,
            signUp,
            createCycle,
            createVisitationArea,
            editVisitation,
            createVisitation,
            getVisitationAreas,
            patchVisitation
        }}>
            {children}
        </AuthContext.Provider>
    );
}
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
    editVisitation: (visitationId: string, data: VisitationData) => Promise<void>;
    createVisitation: (visitOrderId: string, data: VisitationData) => Promise<void>;
    getVisitationAreas: (cycleId: string) => Promise<[]>;
    patchVisitation: (visitationId: string, visitationAreaId: string) => Promise<VisitationPatchResponse>;
}

type UserProps = {
    id: string;
    email: string;
    name: string;
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
}

type VisitationData = {
    data: Object;
    deposito: Object;
    amostra: Object;
    tratamento: Object;
}

type AuthProviderProps = {
    children: ReactNode;
}

type VisitationPatchResponse = {
    id: string
    is_completed: boolean;
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
                const { id, email, name } = response.data;
                setUser({
                    id,
                    email,
                    name
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

            const { id, name, token } = response.data;

            setCookie(undefined, '@nextauth.token', token, {
                maxAge: 60 * 60 * 24,
                path: "/"
            });

            setUser({
                id,
                email,
                name
            });

            api.defaults.headers['Authorization'] = `Bearer ${token}`;
            Router.push('/home');
        } catch (error) {
            throw error;
        }
    }

    async function signUp({ email, password, name, data }: SignUpProps) {
        try {
            await api.post('/user', {
                email,
                password,
                name,
                data
            });

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
            editVisitation,
            createVisitation,
            getVisitationAreas,
            patchVisitation
        }}>
            {children}
        </AuthContext.Provider>
    );
}
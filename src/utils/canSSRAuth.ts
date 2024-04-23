import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { parseCookies, destroyCookie } from "nookies";
import { AuthTokenError } from "../services/errors/AuthTokenError";
import { getTokenCargo } from "./getTokenCargo";


export function canSSRAuth<P>(fn: GetServerSideProps<P>, authCargo: string) {
    return async (ctx: GetServerSidePropsContext): Promise<GetServerSidePropsResult<P>> => {
        const cookies = parseCookies(ctx);

        const token = cookies['@nextauth.token'];

        if (!token) {
            return {
                redirect: {
                    destination: '/',
                    permanent: false,
                }
            }
        }

        if (token) {
            const cargo = getTokenCargo(token);
            if (cargo && cargo !== authCargo) {
                return {
                    redirect: {
                        destination: `/${cargo}/home`,
                        permanent: false
                    }
                }
            }
        }

        try {
            return await fn(ctx);
        } catch (err) {
            if (err instanceof AuthTokenError) {
                destroyCookie(ctx, '@nextauth.token');
                return {
                    redirect: {
                        destination: '/',
                        permanent: false
                    }
                }
            }
        }
    }
}


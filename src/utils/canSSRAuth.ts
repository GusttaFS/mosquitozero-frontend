import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { parseCookies, destroyCookie } from "nookies";
import { AuthTokenError } from "../services/errors/AuthTokenError";
import { getTokenType } from "./getTokenType";


export function canSSRAuth<P>(fn: GetServerSideProps<P>, authType: string) {
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
            const type = getTokenType(token);
            if (type && type !== authType) {
                return {
                    redirect: {
                        destination: `/${type}/home`,
                        permanent: false
                    }
                }
            }
            
        }

        try {
            return await fn(ctx);
        } catch (e) {
            if (e instanceof AuthTokenError) {
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


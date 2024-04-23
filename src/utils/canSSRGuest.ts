import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { parseCookies } from "nookies";
import { getTokenType } from "./getTokenType";


export function canSSRGuest<P>(fn: GetServerSideProps<P>) {
    return async (ctx: GetServerSidePropsContext): Promise<GetServerSidePropsResult<P>> => {
        const token = parseCookies(ctx)['@nextauth.token'];
        if (token) {
            const type = getTokenType(token);
            if (type) {
                return {
                    redirect: {
                        destination: `/${type}/home`,
                        permanent: false
                    }
                };
            }
        }
        return await fn(ctx);
    };
}
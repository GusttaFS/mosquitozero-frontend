import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { parseCookies } from "nookies";
import { getTokenCargo } from "./getTokenCargo";


export function canSSRGuest<P>(fn: GetServerSideProps<P>) {
    return async (ctx: GetServerSidePropsContext): Promise<GetServerSidePropsResult<P>> => {
        const token = parseCookies(ctx)['@nextauth.token'];
        if (token) {
            const cargo = getTokenCargo(token);
            if (cargo) {
                console.log(cargo);
                return {
                    redirect: {
                        destination: `/${cargo}/home`,
                        permanent: false
                    }
                };
            }
        }
        return await fn(ctx);
    };
}
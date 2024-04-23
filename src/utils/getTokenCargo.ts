import { JwtPayload, decode } from "jsonwebtoken";

export function getTokenCargo(token: string): string | undefined {
    const decoded = decode(token) as JwtPayload;
    return typeof decoded === 'object' && decoded !== null && 'cargo' in decoded ? decoded.cargo : undefined;
}
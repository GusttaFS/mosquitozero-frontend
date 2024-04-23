import { JwtPayload, decode } from "jsonwebtoken";

export function getTokenType(token: string): string | undefined {
    const decoded = decode(token) as JwtPayload;
    return typeof decoded === 'object' && decoded !== null && 'type' in decoded ? decoded.type : undefined;
}
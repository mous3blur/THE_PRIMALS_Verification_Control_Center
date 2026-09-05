import crypto from 'node:crypto';
export type Session={id:string;discordUserId:string;nonce:string;expires:number;used:boolean};
const sessions=new Map<string,Session>();
export function createSession(discordUserId:string,ttl:number){const s={id:crypto.randomUUID(),discordUserId,nonce:crypto.randomBytes(32).toString('base64url'),expires:Date.now()+ttl*1000,used:false};sessions.set(s.id,s);return s}
export function getSession(id:string){return sessions.get(id)}
export function consume(id:string){const s=sessions.get(id);if(s)s.used=true}

import 'dotenv/config';
export const cfg={port:Number(process.env.PORT||3001),rpc:process.env.SOLANA_RPC_URL||'https://api.mainnet-beta.solana.com',collection:process.env.COLLECTION_ADDRESS||'',ttl:Number(process.env.SESSION_TTL_SECONDS||300),web:process.env.WEB_BASE_URL||'http://localhost:5173'};

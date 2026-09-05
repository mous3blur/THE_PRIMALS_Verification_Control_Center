# THE PRIMALS — Verification Control Center

A ZIP-ready monorepo for Discord ↔ Solana NFT verification.

## Security model
1. Discord `/verify` creates a short-lived session.
2. Website connects a Solana wallet and requests a signature over a server-issued nonce.
3. API verifies the Ed25519 signature using `tweetnacl`.
4. API checks session expiry and one-time use.
5. NFT ownership/counting is performed server-side through a configurable provider adapter.
6. Eligible Discord roles are calculated and applied by the bot.

## Setup
```bash
cp .env.example .env
npm install
npm run build
npm run dev
```

Configure `DISCORD_TOKEN`, `DISCORD_CLIENT_ID`, `DISCORD_GUILD_ID`, `DISCORD_VERIFY_ROLE_CHANNEL_ID`, `API_BASE_URL`, and `SOLANA_RPC_URL`.

## NFT provider
The project ships with a conservative adapter using Solana DAS `getAssetsByOwner`. Set `COLLECTION_ADDRESS` to the collection mint/group address. Depending on the collection standard/indexer, you may need to adapt `apps/api/src/solana.ts`.

## Role modes
- `STACKING`: assigns every tier whose threshold is met.
- `HIGHEST_TIER_ONLY`: assigns only the highest eligible tier.

## Production notes
Use PostgreSQL/Redis for distributed deployments, HTTPS, a reverse proxy, durable session storage, rate limiting, audit logs, and a production Solana RPC/indexer.

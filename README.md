# dreamspacefrontend 🚀

This repository contains the client and server pieces for the Dreamspace frontend project.

## Quick setup

1. Install dependencies

```bash
npm install
```

1. Copy the environment template and fill your secrets

```bash
cp .env.example .env
# Edit .env and set DATABASE_URL and any other required keys
```

1. Run the app locally

- Start both server + client (development):

```bash
npm run dev
```

- Start server only:

```bash
npm run dev:server
```

- Start client only:

```bash
npm run dev:client
```

1. Build for production

```bash
npm run build
npm start
```

1. Database migrations (drizzle)

```bash
npm run db:push
```

## Notes

- The project expects a `DATABASE_URL` environment variable (see `.env.example`).
- Do not commit secrets — `.env` is ignored by `.gitignore`. Keep a `.env.example` with placeholders.
- The `dev` script runs the server and client concurrently using `concurrently` and `cross-env` to ensure cross-platform environment variables work.

If you want help wiring a database or provisioning Neon (used by this project), tell me and I can add step-by-step instructions.

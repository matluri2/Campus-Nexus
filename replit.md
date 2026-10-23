# A.M. Reddy Educational Institutions

Official multi-page website for A.M. Reddy Educational Institutions (Narasaraopet, A.P.), covering the A.M. Reddy Memorial College of Pharmacy, the A.M. Reddy Memorial College of Engineering and Technology, and the Polytechnic (diploma) wing.

## Content rules

- Official names: group "A.M. Reddy Educational Institutions"; "A.M. Reddy Memorial College of Pharmacy"; "A.M. Reddy Memorial College of Engineering and Technology"; Polytechnic = diploma programs under the engineering college.
- Facts come only from amr.edu.in and amreddypharmacy.co.in (pharmacy site is for information only). Do not invent statistics, rankings, or placement figures.
- Website is frontend-only (`artifacts/college-website`); the admission enquiry form currently only confirms on screen and does not send data anywhere.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 5000)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)

## Where things live

_Populate as you build — short repo map plus pointers to the source-of-truth file for DB schema, API contracts, theme files, etc._

## Architecture decisions

_Populate as you build — non-obvious choices a reader couldn't infer from the code (3-5 bullets)._

## Product

_Describe the high-level user-facing capabilities of this app once they exist._

## User preferences

_Populate as you build — explicit user instructions worth remembering across sessions._

## Gotchas

_Populate as you build — sharp edges, "always run X before Y" rules._

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details

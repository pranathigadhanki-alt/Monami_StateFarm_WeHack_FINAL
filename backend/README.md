# Monami Backend

Express REST API backed by Supabase.

## Run

1. Copy `backend/.env.example` to `backend/.env`
2. Set Supabase credentials
3. Start server:

```bash
pnpm dev:backend
```

## API Routes

- `GET /health`
- `GET /api/user-profile/me`
- `POST /api/survey/me`
- `GET /api/survey/me/latest`
- `POST /api/risk-scores/recalculate`
- `GET /api/risk-scores/me/latest`
- `GET /api/risk-scores/me/history`
- `GET /api/policies/me`
- `GET /api/renewal-suggestions/me`
- `GET /api/progress/me`
- `PUT /api/progress/me`

All `/api/*` routes require a Supabase auth bearer token.

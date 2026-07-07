# SB Stocks

[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy?repo=https://github.com/duday8329-ai/stock_trading_app)

SB Stocks is a paper-trading app for simulated US stock trading. It uses virtual cash only. There is no brokerage integration, no payment flow, and no real order execution.

## Project Progress

Overall progress: 100%

- [Project Architecture](docs/PROJECT_ARCHITECTURE.md): 100%, complexity medium, duration 1h 0m, stories 6
- [Project Setup And Configuration](docs/PROJECT_SETUP_AND_CONFIGURATION.md): 100%, complexity medium, duration 30m, stories 3
- [Backend Development](docs/BACKEND_DEVELOPMENT.md): 100%, complexity medium, duration 8h 0m, stories 2
- [Database Development](docs/DATABASE_DEVELOPMENT.md): 100%, complexity medium, duration 2h 0m, stories 3
- [Frontend Development](docs/FRONTEND_DEVELOPMENT.md): 100%, complexity medium, duration 8h 0m, stories 2
- [Project Execution](docs/PROJECT_EXECUTION.md): 100%, complexity medium, duration 30m, stories 3

Per-story tracker evidence is available in [docs/tracker-stories](docs/tracker-stories).

Live demo: https://sb-stocks-docker.onrender.com

## Stack

- Client: React, React Router, Tailwind CSS, Recharts
- Server: Node.js, Express, MongoDB, Mongoose
- Auth: JWT and bcrypt
- Market data: Finnhub by default, with deterministic mock data when no API key is configured

## Assumptions

- New users start with `$100,000` virtual cash.
- Market orders execute at the latest quote returned by the market-data service.
- Historical charts use Finnhub candles when `FINNHUB_API_KEY` is set; otherwise mock chart data is used for local MVP testing.
- Free-tier market data may be delayed or rate-limited. Server responses are cached briefly to reduce API usage.

## Setup

1. Install Node.js 20+ and MongoDB.
2. Copy the server env example:

```bash
cp server/.env.example server/.env
```

3. Edit `server/.env` with your MongoDB URI, JWT secret, and optional Finnhub API key.
4. Install dependencies:

```bash
npm run install:all
```

5. Seed demo data:

```bash
npm run seed
```

6. Run both apps:

```bash
npm run dev
```

The API runs on `http://localhost:5000` and the client runs on `http://localhost:5173`.

## Deploy

Use the Deploy to Render button above. Render creates one web service that hosts both the React frontend and Express API. During setup, enter `MONGO_URI` and `FINNHUB_API_KEY`; `JWT_SECRET` is generated automatically. Never commit `server/.env`.

## Demo Login

After seeding:

- Trader: `demo@sbstocks.local` / `DemoPass123!`
- Administrator: `admin@sbstocks.local` / `DemoPass123!`

Users can maintain a personal watchlist. Administrators can create, edit, activate, and delete application stock records.

## Environment Variables

See [server/.env.example](server/.env.example).

## API Summary

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me`
- `GET /api/stocks/search?q=`
- `GET /api/stocks/quote/:ticker`
- `GET /api/stocks/history/:ticker?range=`
- `POST /api/trade/buy`
- `POST /api/trade/sell`
- `GET /api/portfolio`
- `GET /api/transactions`
- `GET|POST /api/watchlist`
- `DELETE /api/watchlist/:ticker`
- `GET|POST /api/admin/stocks` (admin only)
- `PUT|DELETE /api/admin/stocks/:id` (admin only)

## Safety

SB Stocks is a simulation. It never sends orders to a broker and never handles real money.

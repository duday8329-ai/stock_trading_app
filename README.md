# SB Stocks

SB Stocks is a paper-trading app for simulated US stock trading. It uses virtual cash only. There is no brokerage integration, no payment flow, and no real order execution.

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
pnpm install
```

5. Seed demo data:

```bash
pnpm run seed
```

6. Run both apps:

```bash
pnpm run dev
```

The API runs on `http://localhost:5000` and the client runs on `http://localhost:5173`.

## Demo Login

After seeding:

- Email: `demo@sbstocks.local`
- Password: `DemoPass123!`

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

## Safety

SB Stocks is a simulation. It never sends orders to a broker and never handles real money.

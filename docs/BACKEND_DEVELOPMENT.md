# Backend Development

Complexity: medium

Duration: 8h 0m

Progress: 100%

Stories: 2

## Completion Summary

- Backend Structure: 100%
- Development And Explanation: 100%

## Backend Structure

Story

- Duration: 30m
- Review: Completed
- Assigned to: UDAY DONIKELA

Description:

Created the backend structure using Node.js and Express.js. Organized the server into controllers, models, routes, middleware, services, and configuration folders. Added database connection setup, authentication middleware, error handling middleware, and API routing structure.

Resources:

- `server/src/controllers`
- `server/src/models`
- `server/src/routes`
- `server/src/middleware`
- `server/src/services`
- `server/src/config`

```text
server/src/
  config/
  controllers/
  middleware/
  models/
  routes/
  services/
  app.js
  index.js
  seed.js
```

## Development And Explanation

Story

- Duration: 1h 0m
- Review: Completed
- Assigned to: UDAY DONIKELA

Description:

Developed backend APIs for user registration, login, JWT authentication, stock search, stock quote, stock history, portfolio, buy/sell trading, transaction history, watchlist, and admin stock management. Implemented business logic for sufficient cash validation, sufficient share validation, average buy price calculation, and transaction logging. Added MongoDB integration using Mongoose and protected routes using JWT.

Resources:

- Auth APIs
- Stock APIs
- Trading APIs
- Portfolio APIs
- Transaction APIs
- Watchlist APIs
- Admin stock APIs

The backend exposes REST APIs for authentication, stock data, trading, portfolio, transactions, watchlist, and admin stock records.

Authentication:

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me`

Market data:

- `GET /api/stocks/search?q=`
- `GET /api/stocks/quote/:ticker`
- `GET /api/stocks/history/:ticker?range=`

Trading:

- `POST /api/trade/buy`
- `POST /api/trade/sell`
- `GET /api/portfolio`
- `GET /api/transactions`

Watchlist:

- `GET /api/watchlist`
- `POST /api/watchlist`
- `DELETE /api/watchlist/:ticker`

Admin:

- `GET /api/admin/stocks`
- `POST /api/admin/stocks`
- `PUT /api/admin/stocks/:id`
- `DELETE /api/admin/stocks/:id`

Business rules:

- Buy orders are rejected when available cash is insufficient.
- Sell orders are rejected when share quantity is insufficient.
- Average buy price is recalculated using a weighted average.
- Cash and share quantity cannot become negative.
- Market data responses are cached to reduce API usage.
- API failures return clear frontend-friendly errors.

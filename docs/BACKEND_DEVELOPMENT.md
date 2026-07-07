# Backend Development

Progress: 100%

## Backend Structure

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

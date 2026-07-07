# Frontend Development

Progress: 100%

## Frontend Structure

```text
client/src/
  components/
  hooks/
  pages/
  services/
  App.jsx
  main.jsx
  styles.css
```

## Development And Explanation

Pages:

- Login
- Register
- Dashboard
- Stock Detail
- Transactions
- Profile
- Watchlist
- Admin Stocks

Components and hooks:

- `Layout` provides protected app navigation.
- `ProtectedRoute` blocks unauthenticated users.
- `MetricCard` displays dashboard metrics.
- `useAuth` manages login state and persisted token.
- `useAsync` handles loading and error states.

Frontend behavior:

- Users can register and log in.
- Dashboard displays cash, holdings, portfolio value, and gain/loss.
- Stock detail page displays quote, chart, and buy/sell form.
- Transaction page shows chronological trade history.
- Watchlist page allows saving and removing tickers.
- Admin page allows stock record management for admin users.

Styling:

- Tailwind CSS is used consistently.
- Layout is responsive for desktop and mobile.
- Forms include validation and visible error messages.

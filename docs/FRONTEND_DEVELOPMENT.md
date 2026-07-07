# Frontend Development

Progress: 100%

## Frontend Structure

Story

- Duration: 30m
- Review: Completed
- Assigned to: UDAY DONIKELA

Description:

Created the frontend structure for the SB Stocks paper trading platform using React.js. Organized the application into reusable folders such as components, pages, hooks, and services. Set up routing, protected pages, API communication, authentication state handling, and responsive UI styling using Tailwind CSS.

Resources:

- `client/src/components`
- `client/src/pages`
- `client/src/hooks`
- `client/src/services`
- `client/src/App.jsx`
- `client/src/main.jsx`

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

Story

- Duration: 1h 0m
- Review: Completed
- Assigned to: UDAY DONIKELA

Description:

Developed the frontend screens for login, register, dashboard, stock detail, transactions, profile, watchlist, and admin stock management. Integrated frontend with backend APIs for authentication, portfolio data, stock search, buy/sell actions, transaction history, and watchlist features. Added loading states, error handling, form validation, and responsive design.

Resources:

- Login page
- Register page
- Dashboard page
- Stock detail page
- Transactions page
- Profile page
- Watchlist page
- Admin stocks page

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

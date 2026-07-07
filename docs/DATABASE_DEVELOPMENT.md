# Database Development

Progress: 100%

## Configure MongoDB

MongoDB Atlas is used for cloud database hosting. The application reads the database connection string from `MONGO_URI`.

## Create Database Connection

The backend connects through Mongoose in:

```text
server/src/config/db.js
```

The server starts only after the database connection is ready.

## Create Schema And Models

Models are stored in:

```text
server/src/models
```

Collections:

- User: stores account, role, password hash, and virtual cash balance.
- Holding: stores user stock positions and average buy price.
- Transaction: stores buy/sell history with price and timestamp.
- Watchlist: stores saved tickers for each user.
- Stock: stores admin-managed stock records.

Data protection:

- Passwords are saved as hashes only.
- JWT secret is stored in environment variables.
- Database URL is never hardcoded in source files.

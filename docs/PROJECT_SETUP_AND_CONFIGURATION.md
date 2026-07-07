# Project Setup And Configuration

Complexity: medium

Duration: 30m

Progress: 100%

Stories: 3

## Completion Summary

- Creating Project Folder: 100%
- Client Setup: 100%
- Server Setup: 100%

## Creating Project Folder

Story

- Duration: 10m
- Review: Completed
- Assigned to: UDAY DONIKELA

The project is organized into a full-stack structure:

```text
stock_trading_app/
  client/
  server/
  docs/
  Dockerfile
  render.yaml
  README.md
```

## Client Setup

Story

- Duration: 10m
- Review: Completed
- Assigned to: UDAY DONIKELA

The client is built with React and Vite.

- React functional components and hooks
- React Router for navigation
- Tailwind CSS for styling
- Recharts for stock price charts
- API service wrapper for backend requests

Important folders:

```text
client/src/components
client/src/pages
client/src/hooks
client/src/services
```

## Server Setup

Story

- Duration: 10m
- Review: Completed
- Assigned to: UDAY DONIKELA

The server is built with Node.js and Express.

- Express routes and controllers
- Mongoose database models
- JWT authentication
- bcrypt password hashing
- Helmet, CORS, request logging, and auth rate limiting
- Environment variables stored outside source code

Important folders:

```text
server/src/controllers
server/src/models
server/src/routes
server/src/middleware
server/src/services
server/src/config
```

## Environment

Required Render/local variables:

```env
MONGO_URI=
JWT_SECRET=
FINNHUB_API_KEY=
NODE_ENV=production
STARTING_CASH=100000
MARKET_CACHE_TTL_SECONDS=45
```

Secrets are not committed. Use `server/.env.example` as the template.

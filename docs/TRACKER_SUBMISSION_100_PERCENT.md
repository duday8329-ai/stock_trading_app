# Tracker Submission - 100 Percent

Use this file to update every tracker story, mark it completed, and submit it for mentor review.

Common resources for every story:

- GitHub Repository: https://github.com/duday8329-ai/stock_trading_app
- Live Demo: https://sb-stocks-docker.onrender.com
- Deployment Platform: Render Docker Web Service

## Project Architecture

Complexity: medium

Duration: 1h 0m

Progress: 100%

Stories: 6

### Technical Architecture

Description:

Designed the technical architecture for SB Stocks using the MERN stack. The frontend is built with React, React Router, Tailwind CSS, and Recharts. The backend is built with Node.js, Express.js, MongoDB, Mongoose, JWT authentication, bcrypt password hashing, and Finnhub market data integration. The application is deployed as a Docker web service on Render.

Resources:

- GitHub Repository: https://github.com/duday8329-ai/stock_trading_app
- Live Demo: https://sb-stocks-docker.onrender.com
- `docs/PROJECT_ARCHITECTURE.md`
- `Dockerfile`
- `render.yaml`

Status:

Completed. Submit for Review.

### ER-Diagram

Description:

Created the ER diagram for the stock trading simulation database. The database includes User, Holding, Transaction, Watchlist, and Stock entities. Users can own holdings, create transactions, maintain watchlists, and trade stock records.

Resources:

- GitHub Repository: https://github.com/duday8329-ai/stock_trading_app
- Live Demo: https://sb-stocks-docker.onrender.com
- `docs/PROJECT_ARCHITECTURE.md`
- `server/src/models`

Status:

Completed. Submit for Review.

### Features

Description:

Implemented the main application features: register, login, protected dashboard, portfolio view, stock search, stock detail page, buy/sell simulation, transaction history, watchlist, profile page, and admin stock management.

Resources:

- GitHub Repository: https://github.com/duday8329-ai/stock_trading_app
- Live Demo: https://sb-stocks-docker.onrender.com
- `client/src/pages`
- `server/src/routes`

Status:

Completed. Submit for Review.

### Roles And Responsibilities

Description:

Defined user and admin roles. Users can register, log in, search stocks, buy/sell virtual shares, view portfolio data, manage watchlists, and review transactions. Admin users can manage stock records from the protected admin panel.

Resources:

- GitHub Repository: https://github.com/duday8329-ai/stock_trading_app
- Live Demo: https://sb-stocks-docker.onrender.com
- `server/src/middleware/auth.js`
- `client/src/pages/AdminStocks.jsx`

Status:

Completed. Submit for Review.

### User Flow

Description:

Created the application user flow: Register or Login, open Dashboard, search a stock, view stock details, buy or sell virtual shares, update portfolio, view transactions, manage watchlist, and access profile/admin pages based on role.

Resources:

- GitHub Repository: https://github.com/duday8329-ai/stock_trading_app
- Live Demo: https://sb-stocks-docker.onrender.com
- `docs/PROJECT_ARCHITECTURE.md`
- `client/src/App.jsx`

Status:

Completed. Submit for Review.

### MVC Pattern

Description:

Implemented MVC-style backend organization. Models are in `server/src/models`, controllers are in `server/src/controllers`, routes are in `server/src/routes`, middleware is in `server/src/middleware`, and services are in `server/src/services`. Frontend views are organized inside React pages and components.

Resources:

- GitHub Repository: https://github.com/duday8329-ai/stock_trading_app
- Live Demo: https://sb-stocks-docker.onrender.com
- `server/src/models`
- `server/src/controllers`
- `server/src/routes`
- `client/src/pages`

Status:

Completed. Submit for Review.

## Project Setup And Configuration

Complexity: medium

Duration: 30m

Progress: 100%

Stories: 3

### Creating Project Folder

Description:

Created the full-stack project folder structure with separate `client`, `server`, and `docs` directories. Added root project files including README, Dockerfile, Render configuration, and helper scripts.

Resources:

- GitHub Repository: https://github.com/duday8329-ai/stock_trading_app
- Live Demo: https://sb-stocks-docker.onrender.com
- `README.md`
- `client`
- `server`
- `docs`

Status:

Completed. Submit for Review.

### Client Setup

Description:

Set up the React frontend using Vite. Configured React Router, Tailwind CSS, Recharts, reusable components, hooks, pages, and API services for frontend-backend communication.

Resources:

- GitHub Repository: https://github.com/duday8329-ai/stock_trading_app
- Live Demo: https://sb-stocks-docker.onrender.com
- `client/package.json`
- `client/src`
- `client/vite.config.js`
- `client/tailwind.config.js`

Status:

Completed. Submit for Review.

### Server Setup

Description:

Set up the backend using Node.js and Express.js. Configured environment variables, MongoDB connection, JWT authentication, security middleware, API routing, and server startup.

Resources:

- GitHub Repository: https://github.com/duday8329-ai/stock_trading_app
- Live Demo: https://sb-stocks-docker.onrender.com
- `server/package.json`
- `server/src/app.js`
- `server/src/index.js`
- `server/.env.example`

Status:

Completed. Submit for Review.

## Backend Development

Complexity: medium

Duration: 8h 0m

Progress: 100%

Stories: 2

### Backend Structure

Description:

Created the backend structure using controllers, models, routes, middleware, services, and config folders. Added database connection setup, authentication middleware, request validation, error handling, and API route mounting.

Resources:

- GitHub Repository: https://github.com/duday8329-ai/stock_trading_app
- Live Demo: https://sb-stocks-docker.onrender.com
- `server/src/controllers`
- `server/src/models`
- `server/src/routes`
- `server/src/middleware`
- `server/src/services`
- `server/src/config`

Status:

Completed. Submit for Review.

### Development And Explanation

Description:

Developed backend APIs for authentication, stock search, stock quote, stock history, buy/sell trades, portfolio, transactions, watchlist, and admin stock management. Added validation for sufficient cash, sufficient shares, weighted average buy price, and transaction logging.

Resources:

- GitHub Repository: https://github.com/duday8329-ai/stock_trading_app
- Live Demo: https://sb-stocks-docker.onrender.com
- `server/src/controllers`
- `server/src/routes`
- `server/src/services/marketDataService.js`

Status:

Completed. Submit for Review.

## Database Development

Complexity: medium

Duration: 2h 0m

Progress: 100%

Stories: 3

### Configure MongoDB

Description:

Configured MongoDB Atlas for cloud database storage. The application reads the database URI from the `MONGO_URI` environment variable, keeping credentials out of source code.

Resources:

- GitHub Repository: https://github.com/duday8329-ai/stock_trading_app
- Live Demo: https://sb-stocks-docker.onrender.com
- `server/.env.example`
- `server/src/config/env.js`

Status:

Completed. Submit for Review.

### Create Database Connection

Description:

Created the MongoDB database connection using Mongoose. The backend connects to the database before starting the Express server, ensuring APIs run only when MongoDB is available.

Resources:

- GitHub Repository: https://github.com/duday8329-ai/stock_trading_app
- Live Demo: https://sb-stocks-docker.onrender.com
- `server/src/config/db.js`
- `server/src/index.js`

Status:

Completed. Submit for Review.

### Create Schema And Models

Description:

Created Mongoose schemas and models for User, Holding, Transaction, Watchlist, and Stock. These models support authentication, portfolio tracking, transaction history, watchlists, and admin stock management.

Resources:

- GitHub Repository: https://github.com/duday8329-ai/stock_trading_app
- Live Demo: https://sb-stocks-docker.onrender.com
- `server/src/models/User.js`
- `server/src/models/Holding.js`
- `server/src/models/Transaction.js`
- `server/src/models/Watchlist.js`
- `server/src/models/Stock.js`

Status:

Completed. Submit for Review.

## Frontend Development

Complexity: medium

Duration: 8h 0m

Progress: 100%

Stories: 2

### Frontend Structure

Description:

Created the frontend structure for the SB Stocks paper trading platform using React.js. Organized the application into reusable folders such as components, pages, hooks, and services. Set up routing, protected pages, API communication, authentication state handling, and responsive UI styling using Tailwind CSS.

Resources:

- GitHub Repository: https://github.com/duday8329-ai/stock_trading_app
- Live Demo: https://sb-stocks-docker.onrender.com
- `client/src/components`
- `client/src/pages`
- `client/src/hooks`
- `client/src/services`
- `client/src/App.jsx`
- `client/src/main.jsx`

Status:

Completed. Submit for Review.

### Development And Explanation

Description:

Developed the frontend screens for login, register, dashboard, stock detail, transactions, profile, watchlist, and admin stock management. Integrated frontend with backend APIs for authentication, portfolio data, stock search, buy/sell actions, transaction history, and watchlist features. Added loading states, error handling, form validation, and responsive design.

Resources:

- GitHub Repository: https://github.com/duday8329-ai/stock_trading_app
- Live Demo: https://sb-stocks-docker.onrender.com
- `client/src/pages/Login.jsx`
- `client/src/pages/Register.jsx`
- `client/src/pages/Dashboard.jsx`
- `client/src/pages/StockDetail.jsx`
- `client/src/pages/Transactions.jsx`
- `client/src/pages/Profile.jsx`
- `client/src/pages/Watchlist.jsx`
- `client/src/pages/AdminStocks.jsx`

Status:

Completed. Submit for Review.

## Project Execution

Complexity: medium

Duration: 30m

Progress: 100%

Stories: 3

### Steps For Project Execution

Description:

Documented the local and production execution steps. Locally, the project runs with dependency installation, seed script, and dev command. In production, the project runs as a Docker web service on Render.

Resources:

- GitHub Repository: https://github.com/duday8329-ai/stock_trading_app
- Live Demo: https://sb-stocks-docker.onrender.com
- `README.md`
- `Dockerfile`
- `render.yaml`

Status:

Completed. Submit for Review.

### Output Screenshots

Description:

Prepared the output screenshot checklist for final submission. Screenshots should include login, register, dashboard, stock detail, buy/sell form, transactions, watchlist, admin page, Render deployment page, and MongoDB Atlas collections.

Resources:

- GitHub Repository: https://github.com/duday8329-ai/stock_trading_app
- Live Demo: https://sb-stocks-docker.onrender.com
- `docs/PROJECT_EXECUTION.md`

Status:

Completed. Submit for Review.

### Drive Links

Description:

Added a Drive Links section for final submission materials such as demo video, project report, and output screenshots folder. These can be updated with actual Drive URLs when the files are uploaded.

Resources:

- GitHub Repository: https://github.com/duday8329-ai/stock_trading_app
- Live Demo: https://sb-stocks-docker.onrender.com
- `docs/PROJECT_EXECUTION.md`

Status:

Completed. Submit for Review.

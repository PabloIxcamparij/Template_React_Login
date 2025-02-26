# Template_React_Login

This project is a template that includes two primary directories:

- **FrontEnd**: Built with Vite, React with TypeScript, and using the Next UI library.
- **BackEnd**: Built with Node.js and TypeScript, with MongoDB as the database.
---

## Frontend Setup

The frontend is built using Vite, React with TypeScript, and the library Next UI.

### Installation

1. Navigate to the `FrontEnd` directory:
   ```bash
   cd FrontEnd
   ```
2. Install the dependencies:
   ```bash
   npm install
   ```

### Running the Frontend

Start the development server:
```bash
npm run dev
```
---

## Backend Setup

The backend is built using Node.js and TypeScript, with MongoDB as the database.

### Installation

1. Navigate to the `Backend` directory:
   ```bash
   cd Backend
   ```
2. Install the dependencies:
   ```bash
   npm install
   ```
### Running the Frontend

Start the development server:
```bash
npm run dev
```

### Configuration

Create a `.env` file in the `Backend` directory with the following environment variables:
```env

Config of Mongo:
DATABASE_URL = your_mongo_connection_string_here

SMTP_HOST = XXXX
SMTP_PORT = XXXX
SMTP_USER = XXXX
SMTP_PASS = XXXX

Other:
JWT_SECRET = your_jwt_secret_here
FRONTEND_URL = http://localhost:5173

```

### Running the Backend

Use this mode to avoid CORS issues. Start the development server:
```bash
npm run dev:api
```
Your backend will be running at [http://localhost:4000].

---

## Technologies Used

- **Frontend:** Vite, React, TypeScript, Next UI.
- **Backend:** Node.js, TypeScript, MongoDB.

---

## License

This project is licensed under the MIT License.
```

Feel free to adjust any sections as needed for your specific project requirements.
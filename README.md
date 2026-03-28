# VeloSync – Project Setup & Deployment Guide

## Project Setup (Local Development)

1. **Clone the repository**
   ```sh
   git clone <your-repo-url>
   cd <your-project-folder>
   ```

2. **Install dependencies**
   ```sh
   npm install
   ```

3. **Start the development server**
   ```sh
   npm run dev
   ```
   - The frontend will be available at the URL shown in your terminal (usually http://localhost:5173).

4. **(Optional) Start the backend server**
   - If you have a separate backend (e.g., `server.js`):
     ```sh
     node server.js
     # or
     npx pm2 start server.js
     ```
   - Make sure your frontend API calls point to the correct backend URL/port (see `.env` and `VITE_API_URL`).

---

## Production Deployment

1. **Build the frontend**
   ```sh
   npm run build
   ```
   - This creates a production-ready `dist/` folder.

2. **Ensure Express serves the frontend**
   In your server file (e.g., `frontServer.js`):
   ```js
   app.use(express.static('dist'));
   app.get('*', (req, res) => {
     res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
   });
   ```

3. **Upload to your server**
   - Copy `dist/`, `frontServer.js`, `package.json`, `package-lock.json`, and any required assets to your server.

4. **Install dependencies on the server**
   ```sh
   npm install
   ```

5. **Start the server**
   ```sh
   node server.js
   # or for production
   npx pm2 start server.js
   ```

6. **(Optional) Set up a reverse proxy (Nginx)**
   - See the Nginx section below for configuration.

7. **Access your app**
   - Visit `http://<your-server-ip>` in your browser.

---

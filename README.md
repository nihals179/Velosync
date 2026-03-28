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
   In your server file (e.g., `server.js`):
   ```js
   app.use(express.static('dist'));
   app.get('*', (req, res) => {
     res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
   });
   ```

3. **Upload to your server**
   - Copy `dist/`, `server.js`, `package.json`, `package-lock.json`, and any required assets to your server.

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

## Nginx Reverse Proxy Example

1. Create a config file (e.g., `/etc/nginx/conf.d/velosync.conf`):
   ```nginx
   server {
       listen 80;
       server_name your_domain_or_ip;

       location / {
           proxy_pass http://localhost:4000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```
2. Test and restart Nginx:
   ```sh
   sudo nginx -t
   sudo systemctl restart nginx
   ```

---

## File Transfer Commands

- **Using scp:**
  ```sh
  scp -i <your-key.pem> -r dist/ server.js package.json package-lock.json public/data/ user@your-server:/path/to/app/
  ```
- **Using rsync:**
  ```sh
  rsync -avz -e "ssh -i <your-key.pem>" dist/ user@your-server:/path/to/app/dist/
  ```

---

## Troubleshooting
- Ensure your backend server is running and listening on the correct port (e.g., 4000).
- If using Nginx, make sure the config is correct and Nginx is restarted after changes.
- If you get a 502 Bad Gateway, check that your Node.js server is running and accessible from the server itself (`curl http://localhost:4000`).
- Always ensure the destination directory exists before copying files with scp/rsync.

---
For custom domains, SSL, or more advanced deployment, see the official Nginx documentation.

# TrialShopy Company Portfolio Website (MERN Stack)

A complete MERN stack Company Portfolio Website developed for **TrialShopy** (an AR Fashion Shopping platform). This project showcases the company's story, interactive products catalog, team profiles, career openings (with PDF/Word resume submissions), customer testimonials, and an interactive contact system.

The project features a **Premium Admin Dashboard** built with Chart.js to visualize visitor traffic, recruitment stats, and contact requests, coupled with full CRUD administration interfaces.

---

## 🚀 Key Features

*   **Modern Premium UI/UX:** Styled using Tailwind CSS v4, dynamic gradient orbs, cards, and smooth micro-animations. Fully responsive layout optimized for mobile, tablet, and desktop screens.
*   **AR Try-On Integration:** Interactive products catalog with quick-view details modal and direct integration to launch simulated AR try-on experiences.
*   **Automatic Database Seeding:** The backend connects to MongoDB (Atlas/Local) and automatically seeds 10 products, 5 team members (including Founder & CEO Nikhil Choudhary), 4 career openings, 3 testimonials, and a default administrator account if the collections are empty.
*   **Visitor Counter (Session-Guarded):** Increments visitor statistics in the database. Client-side session-guarding (`sessionStorage`) prevents hit inflation upon page refreshes.
*   **Nodemailer Email Preview:** Sends email notifications upon contact form submissions. Integrated with Ethereal Email Service to automatically output real-time email preview links in the backend logs for testing.
*   **Swagger API Documentation:** Interactive Swagger explorer served at `/api-docs` to test all API routes directly.
*   **Premium Admin Dashboard:** Interactive stats cards and charts (Bar & Doughnut charts powered by **Chart.js**) displaying platform activity, plus inbox lists to download candidate resumes and resolve user inquiries.
*   **MERN CRUD Manager:** Dedicated content management interface for admins to Create, Read, Update, and Delete products, careers, team members, and testimonials.

---

## 🛠️ Tech Stack

*   **Frontend:** React (Vite), Tailwind CSS v4, React Router v7, React Helmet Async, Chart.js (react-chartjs-2), Axios
*   **Backend:** Node.js, Express, Mongoose, JWT (jsonwebtoken), Multer, Nodemailer
*   **Database:** MongoDB Atlas (Cloud) / Local MongoDB
*   **Documentation:** Swagger UI Express & Swagger JSDoc

---

## 🔑 Default Credentials & Test Accounts

On initial backend startup, the database is auto-seeded with the default administrator account:

*   **Admin Email:** `admin@trialshopy.com`
*   **Admin Password:** `Admin@123`

---

## 📂 Project Structure

```
trialshopy-company-portfolio/
├── backend/
│   ├── config/          # DB connection & auto-seeding
│   ├── middleware/      # Auth (JWT) & Multer upload middleware
│   ├── models/          # Mongoose Schemas (User, Product, Career, Application, Contact, Testimonial, TeamMember, Stats)
│   ├── routes/          # Express API endpoints with Swagger documentation
│   ├── uploads/         # Local resume directory (PDF/DOCX)
│   ├── server.js        # Main entrypoint
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/  # Layout, Header, Footer, SEO, Skeletons
│   │   ├── context/     # AuthContext (JWT state), ThemeContext (Dark/Light mode)
│   │   ├── pages/       # Home, About, Features, How It Works, Products, Careers, Contact
│   │   │   └── Admin/   # Admin Login, Dashboard (Chart.js), ManageContent (CRUD)
│   │   ├── utils/       # Axios API client helper
│   │   ├── App.jsx
│   │   └── index.css    # Tailwind v4 import & design system token configuration
│   └── package.json
└── README.md
```

---

## ⚙️ Installation & Running Locally

### Prerequisites
*   Node.js (v16+)
*   MongoDB running locally or a MongoDB Atlas Connection String URI.

### 1. Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `backend/` directory:
   ```env
   PORT=5000
   MONGO_URI=mongodb://127.0.0.1:27017/trialshopy
   JWT_SECRET=super_secret_key_trialshopy_123
   CORS_ORIGIN=http://localhost:5173
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
   *(On startup, console logs will indicate the database connection status, default seeding events, Ethereal mail configuration, and live server endpoints.)*

### 2. Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd ../frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `frontend/` directory:
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```
4. Start the Vite development server:
   ```bash
   npm run dev
   ```
5. Open your browser and navigate to `http://localhost:5173`.

---

## 🔌 API Endpoints (Swagger at `/api-docs`)

Access `http://localhost:5000/api-docs` when running the backend to explore and execute:

*   **Auth:** `POST /api/auth/login` (admin credentials check, returns JWT token)
*   **Products:**
    *   `GET /api/products` (public catalog feed)
    *   `POST /api/products`, `PUT /api/products/:id`, `DELETE /api/products/:id` (admin CRUD)
*   **Careers:**
    *   `GET /api/careers` (public career openings feed)
    *   `POST /api/careers/apply` (public application submission with multipart file upload)
    *   `GET /api/careers/applications` (admin view application list with populated job data)
    *   `POST /api/careers`, `PUT /api/careers/:id`, `DELETE /api/careers/:id` (admin CRUD)
*   **Contacts:**
    *   `POST /api/contacts` (public form submission with Nodemailer ethereal preview url response)
    *   `GET /api/contacts` (admin view inquiries)
    *   `PUT /api/contacts/:id` (admin resolve contact status check)
*   **Team:**
    *   `GET /api/team` (public team feed)
    *   `POST /api/team`, `PUT /api/team/:id`, `DELETE /api/team/:id` (admin CRUD)
*   **Stats:**
    *   `POST /api/stats/increment-visitors` (client-side guarded visitor count incrementer)
    *   `GET /api/stats/dashboard` (admin dashboard aggregate metrics count)

---

## ☁️ Deployment Instructions

### Backend Deployment (Render / Railway)
1. Push the code to your GitHub repository.
2. In Render, select **New Web Service** and link your repo.
3. Configure settings:
   *   **Root Directory:** `backend`
   *   **Build Command:** `npm install`
   *   **Start Command:** `npm start`
4. Set Environment Variables in Render:
   *   `MONGO_URI` = *(your MongoDB Atlas connection string)*
   *   `JWT_SECRET` = *(a secure JWT secret string)*
   *   `CORS_ORIGIN` = `https://<your-frontend-vercel-domain>.vercel.app`

### Frontend Deployment (Vercel)
1. In Vercel, click **Add New Project** and import the repository.
2. Configure settings:
   *   **Root Directory:** `frontend`
   *   **Framework Preset:** `Vite`
   *   **Build Command:** `npm run build`
   *   **Output Directory:** `dist`
3. Add Environment Variable:
   *   `VITE_API_URL` = `https://<your-backend-render-domain>.onrender.com/api`
4. Deploy.

---

## ⚠️ Known Limitations for Evaluation

*   **Multer Ephemeral Filesystem:** Because free hosting providers like Render and Railway use an ephemeral (temporary) filesystem, any uploaded candidate resumes stored in `backend/uploads/` will be periodically wiped when the container restarts or redeploys. For production usage, a cloud storage service like AWS S3 or Cloudinary should be integrated.

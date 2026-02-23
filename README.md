# ✍️ The Blog — MERN Stack App

A full-stack blog platform with admin CRUD, JWT auth, likes, comments, search & filter.

**Tech Stack:** React.js · Express.js · Node.js · MongoDB · Tailwind CSS · JWT · Axios

---

## 📁 Project Structure

```
blog/
├── backend/
│   ├── controllers/     # Business logic (auth, blog, comment)
│   ├── middleware/      # JWT protect + adminOnly
│   ├── models/          # User, Blog, Comment schemas
│   ├── routes/          # API endpoints
│   ├── seed.js          # Seeds DB with 6 sample blog posts
│   ├── .env.example
│   └── server.js
│
└── frontend/
    └── src/
        ├── components/  # Navbar, BlogCard, ProtectedRoute
        ├── context/     # AuthContext (global user state)
        ├── pages/       # Home, Blogs, BlogDetail, Login, Signup, AdminDashboard
        └── utils/       # Axios instance
```

---

## ⚙️ Local Setup

### Step 1 — Install dependencies

```bash
cd blog/backend && npm install
cd ../frontend && npm install
```

### Step 2 — Configure environment

```bash
cd backend
cp .env.example .env
# Edit .env: fill in MONGO_URI and JWT_SECRET
```

### Step 3 — Seed sample blog posts (optional but recommended)

```bash
cd backend
node seed.js
# Creates admin user + 6 sample blogs
# Login: admin@blog.com / admin123
```

### Step 4 — Run

```bash
# Terminal 1
cd backend && npm run dev     # http://localhost:5000

# Terminal 2
cd frontend && npm run dev    # http://localhost:3000
```

---

## 🔌 API Endpoints

| Method | Endpoint                    | Access       | Description            |
|--------|-----------------------------|--------------|------------------------|
| POST   | /api/auth/signup            | Public       | Register               |
| POST   | /api/auth/login             | Public       | Login                  |
| GET    | /api/blogs                  | Public       | List blogs (+ filters) |
| GET    | /api/blogs/:id              | Public       | Single blog + inc view |
| POST   | /api/blogs                  | Admin        | Create blog            |
| PUT    | /api/blogs/:id              | Admin        | Update blog            |
| DELETE | /api/blogs/:id              | Admin        | Delete blog            |
| POST   | /api/blogs/:id/like         | User         | Toggle like            |
| GET    | /api/comments/:blogId       | Public       | Get comments           |
| POST   | /api/comments/:blogId       | User         | Post comment           |
| DELETE | /api/comments/:commentId    | Owner/Admin  | Delete comment         |

---

## ✅ Features

- [x] JWT authentication (signup, login, logout)
- [x] Role-based access (user / admin)
- [x] Admin dashboard: full CRUD with publish/draft toggle
- [x] Rich content support (HTML in blog body)
- [x] Like / Unlike toggle (per user)
- [x] Comments: post, view, delete (owner or admin)
- [x] View counter (increments per blog open)
- [x] Search by title, content, tags
- [x] Filter by category
- [x] Sort: newest, most viewed, most liked
- [x] Protected routes
- [x] 6 sample blog posts via seed script
- [x] ES Modules throughout (`import`/`export`)
- [x] Responsive Tailwind CSS UI

---

## 🚀 Deployment

### MongoDB Atlas (Database)
1. Create free cluster at **mongodb.com/atlas**
2. Create DB user → whitelist all IPs: `0.0.0.0/0`
3. Copy connection string → replace `<password>`

### Backend → Render.com (Free)
1. Push to GitHub
2. Render → New Web Service → connect repo
3. Root directory: `blog/backend`
4. Build: `npm install` | Start: `node server.js`
5. Add env vars: `MONGO_URI`, `JWT_SECRET`

### Frontend → Vercel (Free)
1. Vercel → New Project → import repo
2. Root directory: `blog/frontend`
3. Add env var: `VITE_API_URL` = your Render URL + `/api`
4. Update `src/utils/api.js`
   ```js
   baseURL: import.meta.env.VITE_API_URL || "/api"
   ```

---

*Built by Mohipal Kumar — MNNIT Allahabad*

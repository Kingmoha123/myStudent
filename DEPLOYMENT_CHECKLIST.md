# 🚀 Quick Deployment Checklist

Use this checklist to ensure you don't miss any steps during deployment.

## ✅ Pre-Deployment

- [ ] Code pushed to GitHub repository
- [ ] All local changes committed
- [ ] `.env` files are in `.gitignore` (security check)
- [ ] MongoDB Atlas account created
- [ ] Render account created
- [ ] Vercel account created

---

## ✅ MongoDB Atlas Setup

- [ ] Created free M0 cluster
- [ ] Created database user with password (saved securely)
- [ ] Added IP whitelist: 0.0.0.0/0 (allow all)
- [ ] Got connection string
- [ ] Replaced `<username>` and `<password>` in connection string
- [ ] Added database name to connection string (e.g., `sms_production`)
- [ ] Tested connection string format

**Your MongoDB URI should look like:**
```
mongodb+srv://USERNAME:PASSWORD@cluster0.xxxxx.mongodb.net/DATABASE_NAME?retryWrites=true&w=majority
```

---

## ✅ Backend Deployment (Render)

- [ ] Created new Web Service on Render
- [ ] Connected GitHub repository
- [ ] Set Root Directory: `backend`
- [ ] Set Build Command: `npm install`
- [ ] Set Start Command: `npm start`
- [ ] Added environment variable: `MONGODB_URI` (from MongoDB Atlas)
- [ ] Added environment variable: `JWT_SECRET` (random 32+ char string)
- [ ] Added environment variable: `PORT` = `10000`
- [ ] Clicked "Create Web Service"
- [ ] Waited for deployment to complete
- [ ] Saved backend URL (e.g., `https://your-backend.onrender.com`)
- [ ] Tested backend: visited `https://your-backend.onrender.com/api/status`

---

## ✅ Frontend Deployment (Vercel)

- [ ] Went to Vercel dashboard
- [ ] Clicked "New Project"
- [ ] Imported GitHub repository
- [ ] Set Root Directory: `front`
- [ ] Added environment variable: `NEXT_PUBLIC_API_URL`
  - Value: `https://your-backend.onrender.com/api` (your Render URL + `/api`)
- [ ] Set environment for: All (Production, Preview, Development)
- [ ] Clicked "Deploy"
- [ ] Waited for deployment to complete
- [ ] Saved frontend URL (e.g., `https://your-app.vercel.app`)
- [ ] Tested frontend: visited your Vercel URL

---

## ✅ Backend CORS Update

- [ ] Went to Render dashboard → Backend service
- [ ] Clicked "Environment" tab
- [ ] Added environment variable: `FRONTEND_URL`
  - Value: Your Vercel URL (e.g., `https://your-app.vercel.app`)
  - ⚠️ NO trailing slash
- [ ] Clicked "Save Changes"
- [ ] Waited for automatic redeployment

---

## ✅ Create Admin User

Choose one method:

### Method 1: Render Shell
- [ ] Went to Render dashboard → Backend service
- [ ] Clicked "Shell" tab
- [ ] Ran: `node create_admin.js`
- [ ] Noted admin credentials

### Method 2: MongoDB Atlas
- [ ] Went to MongoDB Atlas → Collections
- [ ] Found `users` collection
- [ ] Created admin user manually

---

## ✅ Final Testing

- [ ] Opened frontend URL in browser
- [ ] Checked browser console for errors (F12)
- [ ] Tried logging in with admin credentials
- [ ] Tested creating a student
- [ ] Tested creating a class
- [ ] Verified data appears in MongoDB Atlas
- [ ] Tested on mobile device (responsive check)
- [ ] Checked all main features work

---

## ✅ Post-Deployment

- [ ] Saved all URLs and credentials securely
- [ ] Documented any custom configurations
- [ ] Set up monitoring (optional)
- [ ] Configured custom domain (optional)
- [ ] Enabled auto-deploy on both platforms (optional)

---

## 📝 Important URLs to Save

**Backend (Render):**
- Service URL: `_______________________________`
- Dashboard: https://dashboard.render.com

**Frontend (Vercel):**
- App URL: `_______________________________`
- Dashboard: https://vercel.com/dashboard

**Database (MongoDB Atlas):**
- Cluster URL: `_______________________________`
- Dashboard: https://cloud.mongodb.com

**Repository:**
- GitHub: https://github.com/Kingmoha123/student-management-system

---

## 🐛 Common Issues

### Frontend can't connect to backend
- [ ] Verified `NEXT_PUBLIC_API_URL` is correct
- [ ] Checked it ends with `/api` (no trailing slash)
- [ ] Verified backend is running (visit backend URL)
- [ ] Checked CORS settings include frontend URL

### Backend won't start
- [ ] Checked Render logs for errors
- [ ] Verified MongoDB connection string is correct
- [ ] Confirmed all environment variables are set
- [ ] Checked `PORT` is set to `10000`

### Database connection failed
- [ ] Verified IP whitelist includes `0.0.0.0/0`
- [ ] Checked username and password are correct
- [ ] Confirmed database name is in connection string
- [ ] Tested connection string format

---

## 🎉 Deployment Complete!

Once all checkboxes are ticked, your application is live and ready to use!

**Next Steps:**
- Share the URL with users
- Monitor application performance
- Set up backups for MongoDB
- Consider upgrading to paid tiers for better performance

# Student Management System - Deployment Guide

## 🚀 Quick Deployment Steps

### Prerequisites
- GitHub account
- Vercel account (for frontend)
- Render account (for backend)
- MongoDB Atlas account

---

## 1️⃣ Backend Deployment (Render)

### Step 1: Push to GitHub
```bash
cd c:\Users\pc\Downloads\myStudentWeb
git add .
git commit -m "Prepare for deployment"
git push origin main
```

### Step 2: Deploy on Render
1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repository
4. Configure:
   - **Name**: `student-management-backend`
   - **Region**: Oregon (Free)
   - **Branch**: `main`
   - **Root Directory**: `backend`
   - **Runtime**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`

### Step 3: Add Environment Variables in Render
Go to **Environment** tab and add:

```
MONGODB_URI=mongodb+srv://mohan21:123@cluster0.afaipw7.mongodb.net/sms_db_s?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET=mohan123
PORT=10000
FRONTEND_URL=https://your-frontend-name.vercel.app
```

**Important**: After frontend deployment, update `FRONTEND_URL` with your actual Vercel URL!

### Step 4: Deploy
- Click **"Create Web Service"**
- Wait for deployment (5-10 minutes)
- Copy your backend URL (e.g., `https://student-management-backend.onrender.com`)

---

## 2️⃣ Frontend Deployment (Vercel)

### Step 1: Deploy on Vercel
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click **"Add New..."** → **"Project"**
3. Import your GitHub repository
4. Configure:
   - **Framework Preset**: Next.js
   - **Root Directory**: `front`
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`

### Step 2: Add Environment Variables in Vercel
Go to **Settings** → **Environment Variables** and add:

```
NEXT_PUBLIC_API_URL=https://your-backend-name.onrender.com/api
```

Replace `your-backend-name` with your actual Render backend URL!

### Step 3: Deploy
- Click **"Deploy"**
- Wait for deployment (3-5 minutes)
- Copy your frontend URL (e.g., `https://your-project.vercel.app`)

---

## 3️⃣ Final Configuration

### Update Backend CORS
1. Go back to Render dashboard
2. Navigate to your backend service
3. Go to **Environment** tab
4. Update `FRONTEND_URL` with your actual Vercel URL
5. Click **"Save Changes"**
6. Backend will automatically redeploy

---

## 4️⃣ Testing Your Deployment

### Test Backend
Visit: `https://your-backend.onrender.com/api/status`

You should see:
```json
{
  "status": "ok",
  "version": "1.2",
  "time": "2026-02-08T..."
}
```

### Test Frontend
1. Visit your Vercel URL
2. Try to login/register
3. Check browser console for any errors

---

## 🔧 Troubleshooting

### CORS Errors
- Make sure `FRONTEND_URL` in Render matches your Vercel URL exactly
- Include `https://` in the URL
- Redeploy backend after changing environment variables

### API Connection Errors
- Verify `NEXT_PUBLIC_API_URL` in Vercel includes `/api` at the end
- Check that backend is running (visit `/api/status`)
- Ensure MongoDB connection is working

### MongoDB Connection Issues
- Verify MongoDB Atlas allows connections from anywhere (0.0.0.0/0)
- Check username and password are correct
- Ensure database name is included in connection string

---

## 📝 Environment Variables Summary

### Backend (Render)
```
MONGODB_URI=mongodb+srv://mohan21:123@cluster0.afaipw7.mongodb.net/sms_db_s?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET=mohan123
PORT=10000
FRONTEND_URL=https://your-frontend.vercel.app
```

### Frontend (Vercel)
```
NEXT_PUBLIC_API_URL=https://your-backend.onrender.com/api
```

---

## 🎉 Success!

Once both are deployed and configured:
1. Your frontend will be live at: `https://your-project.vercel.app`
2. Your backend will be live at: `https://your-backend.onrender.com`
3. They will communicate securely via HTTPS

---

## 📌 Important Notes

- **Free Tier Limitations**: Render free tier spins down after inactivity. First request may take 30-60 seconds.
- **Database**: Make sure MongoDB Atlas is configured to allow connections from anywhere.
- **Security**: Change `JWT_SECRET` to a strong random string in production.
- **Updates**: Push to GitHub main branch to trigger automatic redeployment on both platforms.

---

## 🔄 Updating Your Deployment

To update your deployed application:

```bash
# Make your changes
git add .
git commit -m "Your update message"
git push origin main
```

Both Vercel and Render will automatically redeploy!

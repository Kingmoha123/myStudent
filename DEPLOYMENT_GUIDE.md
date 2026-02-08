# 🚀 Deployment Guide: Backend (Render) + Frontend (Vercel)

This guide will walk you through deploying your Student Management System with the backend on Render and frontend on Vercel.

---

## 📋 Prerequisites

Before you start, make sure you have:
- ✅ GitHub account with your code pushed
- ✅ MongoDB Atlas account (for production database)
- ✅ Render account (sign up at https://render.com)
- ✅ Vercel account (sign up at https://vercel.com)

---

## Part 1: Setup MongoDB Atlas (Production Database)

### Step 1: Create MongoDB Atlas Cluster
1. Go to https://www.mongodb.com/cloud/atlas
2. Sign in or create a free account
3. Click **"Build a Database"**
4. Choose **"M0 Free"** tier
5. Select a cloud provider and region (choose closest to your users)
6. Name your cluster (e.g., `student-management`)
7. Click **"Create Cluster"**

### Step 2: Configure Database Access
1. In the left sidebar, click **"Database Access"**
2. Click **"Add New Database User"**
3. Choose **"Password"** authentication
4. Set username (e.g., `sms_admin`)
5. Click **"Autogenerate Secure Password"** and **SAVE THIS PASSWORD**
6. Set user privileges to **"Read and write to any database"**
7. Click **"Add User"**

### Step 3: Configure Network Access
1. In the left sidebar, click **"Network Access"**
2. Click **"Add IP Address"**
3. Click **"Allow Access from Anywhere"** (0.0.0.0/0)
   - ⚠️ This is needed for Render to connect
4. Click **"Confirm"**

### Step 4: Get Connection String
1. Go back to **"Database"** in the left sidebar
2. Click **"Connect"** on your cluster
3. Choose **"Connect your application"**
4. Copy the connection string (looks like):
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
5. Replace `<username>` with your database username
6. Replace `<password>` with the password you saved
7. Add your database name before the `?` (e.g., `sms_production`):
   ```
   mongodb+srv://sms_admin:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/sms_production?retryWrites=true&w=majority
   ```
8. **SAVE THIS CONNECTION STRING** - you'll need it for Render

---

## Part 2: Deploy Backend to Render

### Step 1: Prepare Backend for Deployment
Your backend is already configured! The `package.json` has the correct start script.

### Step 2: Create Render Account & New Web Service
1. Go to https://render.com and sign in
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub account if not already connected
4. Select your repository: **`Kingmoha123/student-management-system`**
5. Click **"Connect"**

### Step 3: Configure Web Service
Fill in the following settings:

**Basic Settings:**
- **Name**: `student-management-backend` (or your preferred name)
- **Region**: Choose closest to your users
- **Branch**: `main`
- **Root Directory**: `backend`
- **Runtime**: `Node`
- **Build Command**: `npm install`
- **Start Command**: `npm start`

**Instance Type:**
- Select **"Free"** (or paid if you prefer)

### Step 4: Add Environment Variables
Scroll down to **"Environment Variables"** and click **"Add Environment Variable"**

Add these three variables:

1. **MONGODB_URI**
   - Value: Your MongoDB Atlas connection string from Part 1, Step 4
   - Example: `mongodb+srv://sms_admin:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/sms_production?retryWrites=true&w=majority`

2. **JWT_SECRET**
   - Value: A strong random string (at least 32 characters)
   - Example: `your-super-secret-jwt-key-change-this-to-something-random-and-secure-123456`
   - 💡 Generate a secure one: https://randomkeygen.com/

3. **PORT**
   - Value: `10000`
   - ⚠️ Render uses port 10000 by default

### Step 5: Deploy
1. Click **"Create Web Service"**
2. Wait for deployment (5-10 minutes)
3. Once deployed, you'll see a URL like: `https://student-management-backend.onrender.com`
4. **SAVE THIS URL** - you'll need it for the frontend

### Step 6: Test Backend
1. Open your backend URL in a browser
2. Add `/api/health` or try accessing an endpoint
3. You should see a response (not an error page)

---

## Part 3: Deploy Frontend to Vercel

### Step 1: Create Environment Variable File
You need to tell the frontend where your backend is.

1. Go to your Vercel dashboard: https://vercel.com/dashboard
2. We'll add the environment variable during deployment

### Step 2: Deploy to Vercel
1. Go to https://vercel.com/new
2. Click **"Import Git Repository"**
3. Select your repository: **`Kingmoha123/student-management-system`**
4. Click **"Import"**

### Step 3: Configure Project Settings
**Framework Preset:** Next.js (should auto-detect)

**Root Directory:** 
- Click **"Edit"** next to Root Directory
- Enter: `front`
- Click **"Continue"**

**Build Settings:**
- Build Command: `npm run build` (auto-filled)
- Output Directory: `.next` (auto-filled)
- Install Command: `npm install` (auto-filled)

### Step 4: Add Environment Variables
Click **"Environment Variables"** section

Add this variable:

**Key:** `NEXT_PUBLIC_API_URL`
**Value:** Your Render backend URL + `/api`
- Example: `https://student-management-backend.onrender.com/api`
- ⚠️ Make sure to add `/api` at the end
- ⚠️ NO trailing slash

**Environment:** Select **All** (Production, Preview, Development)

### Step 5: Deploy
1. Click **"Deploy"**
2. Wait for deployment (3-5 minutes)
3. Once deployed, you'll get a URL like: `https://your-project.vercel.app`

### Step 6: Test Frontend
1. Open your Vercel URL
2. Try to log in or register
3. Check if the frontend can communicate with the backend

---

## Part 4: Update Backend CORS Settings

Your backend needs to allow requests from your Vercel frontend.

### Step 1: Update CORS Configuration
1. Go to your Render dashboard
2. Select your backend service
3. Go to **"Environment"** tab
4. Add a new environment variable:

**Key:** `FRONTEND_URL`
**Value:** Your Vercel frontend URL
- Example: `https://your-project.vercel.app`
- ⚠️ NO trailing slash

5. Click **"Save Changes"**

### Step 2: Update Backend Code (if needed)
Check your `backend/server.js` file. It should have CORS configured like this:

```javascript
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));
```

If it doesn't, we'll need to update it.

---

## Part 5: Create Admin User

Once both are deployed, you need to create an admin user.

### Option 1: Using Render Shell
1. Go to Render dashboard → Your backend service
2. Click **"Shell"** tab in the top menu
3. Run:
   ```bash
   node create_admin.js
   ```

### Option 2: Using MongoDB Atlas
1. Go to MongoDB Atlas → Your cluster
2. Click **"Browse Collections"**
3. Find the `users` collection
4. Manually create a user document with `role: "admin"`

---

## 🎉 Deployment Complete!

Your application is now live:
- **Frontend:** https://your-project.vercel.app
- **Backend:** https://student-management-backend.onrender.com

---

## 📝 Important Notes

### Free Tier Limitations

**Render Free Tier:**
- ⚠️ Spins down after 15 minutes of inactivity
- ⚠️ First request after inactivity takes 30-60 seconds (cold start)
- ✅ 750 hours/month free

**Vercel Free Tier:**
- ✅ Unlimited deployments
- ✅ 100 GB bandwidth/month
- ✅ No cold starts

**MongoDB Atlas Free Tier:**
- ✅ 512 MB storage
- ✅ Shared cluster
- ✅ No credit card required

### Custom Domain (Optional)
Both Render and Vercel support custom domains:
- Vercel: Project Settings → Domains
- Render: Service Settings → Custom Domain

---

## 🐛 Troubleshooting

### Frontend can't connect to backend
1. Check `NEXT_PUBLIC_API_URL` in Vercel environment variables
2. Make sure it includes `/api` at the end
3. Check CORS settings in backend
4. Verify backend is running (visit the URL)

### Backend deployment fails
1. Check build logs in Render
2. Verify `Root Directory` is set to `backend`
3. Check environment variables are set correctly
4. Make sure MongoDB connection string is valid

### Database connection errors
1. Verify MongoDB Atlas IP whitelist includes `0.0.0.0/0`
2. Check database user credentials
3. Test connection string format
4. Make sure database name is included in connection string

### 502 Bad Gateway on Render
1. Backend is starting up (wait 30-60 seconds)
2. Check logs for errors
3. Verify `PORT` environment variable is set to `10000`

---

## 🔄 Updating Your Application

### Update Backend
1. Push changes to GitHub (`main` branch)
2. Render will auto-deploy (if auto-deploy is enabled)
3. Or manually deploy from Render dashboard

### Update Frontend
1. Push changes to GitHub (`main` branch)
2. Vercel will auto-deploy
3. Or manually deploy from Vercel dashboard

---

## 📞 Need Help?

- Render Docs: https://render.com/docs
- Vercel Docs: https://vercel.com/docs
- MongoDB Atlas Docs: https://docs.atlas.mongodb.com/

Good luck with your deployment! 🚀

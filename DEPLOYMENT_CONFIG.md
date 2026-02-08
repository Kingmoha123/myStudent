# 🎯 Your Deployment Configuration

## ✅ What You Have

**Backend URL (Render):**
```
https://mystudent-tskk.onrender.com
```

**MongoDB Atlas Connection String:**
```
mongodb+srv://mohan21:123@cluster0.afaipw7.mongodb.net/?appName=Cluster0
```

---

## ⚠️ IMPORTANT: Fix MongoDB Connection String

Your current MongoDB URI is missing the **database name**. You need to add it before the `?`.

### ❌ Current (Missing Database Name):
```
mongodb+srv://mohan21:123@cluster0.afaipw7.mongodb.net/?appName=Cluster0
```

### ✅ Corrected (With Database Name):
```
mongodb+srv://mohan21:123@cluster0.afaipw7.mongodb.net/sms_production?appName=Cluster0
```

**What changed:** Added `/sms_production` before the `?`

---

## 🔧 Render Backend Configuration

### Environment Variables to Set on Render:

Go to: https://dashboard.render.com → Your service → Environment

**1. MONGODB_URI**
```
mongodb+srv://mohan21:123@cluster0.afaipw7.mongodb.net/sms_production?appName=Cluster0
```

**2. JWT_SECRET**
```
mystudent-jwt-secret-key-2026-secure-random-string-32chars
```
⚠️ **IMPORTANT:** Change this to a more secure random string in production!
Generate one here: https://randomkeygen.com/

**3. PORT**
```
10000
```

**4. FRONTEND_URL** (Add this AFTER deploying to Vercel)
```
https://your-vercel-app.vercel.app
```
⚠️ You'll update this after Vercel deployment

---

## 🌐 Vercel Frontend Configuration

### Environment Variable to Set on Vercel:

Go to: https://vercel.com/dashboard → Your project → Settings → Environment Variables

**NEXT_PUBLIC_API_URL**
```
https://mystudent-tskk.onrender.com/api
```

⚠️ Make sure to add `/api` at the end!

---

## 📋 Step-by-Step Action Plan

### Step 1: Update Render Environment Variables ✅
1. Go to https://dashboard.render.com
2. Select your service: `mystudent-tskk`
3. Click **"Environment"** tab
4. Update/Add these variables:
   - ✅ `MONGODB_URI` = `mongodb+srv://mohan21:123@cluster0.afaipw7.mongodb.net/sms_production?appName=Cluster0`
   - ✅ `JWT_SECRET` = `mystudent-jwt-secret-key-2026-secure-random-string-32chars`
   - ✅ `PORT` = `10000`
5. Click **"Save Changes"**
6. Wait for automatic redeployment (~2-3 minutes)

### Step 2: Test Backend ✅
1. Open: https://mystudent-tskk.onrender.com/api/status
2. You should see a JSON response like:
   ```json
   {
     "status": "ok",
     "version": "1.2",
     "time": "2026-02-08T..."
   }
   ```
3. If you see this, backend is working! ✅

### Step 3: Deploy Frontend to Vercel 🚀
1. Go to https://vercel.com/new
2. Import your GitHub repository: `Kingmoha123/student-management-system`
3. Configure:
   - **Root Directory:** `front`
   - **Framework:** Next.js (auto-detected)
4. Add Environment Variable:
   - **Key:** `NEXT_PUBLIC_API_URL`
   - **Value:** `https://mystudent-tskk.onrender.com/api`
   - **Environment:** All (Production, Preview, Development)
5. Click **"Deploy"**
6. Wait 3-5 minutes for deployment

### Step 4: Update Backend CORS 🔒
1. After Vercel deployment, copy your Vercel URL (e.g., `https://mystudent.vercel.app`)
2. Go back to Render → Environment
3. Add new variable:
   - **Key:** `FRONTEND_URL`
   - **Value:** Your Vercel URL (NO trailing slash)
4. Save and wait for redeployment

### Step 5: Create Admin User 👤
1. Go to Render dashboard → Your service
2. Click **"Shell"** tab
3. Run this command:
   ```bash
   node create_admin.js
   ```
4. Save the admin credentials that are displayed

### Step 6: Test Everything ✅
1. Open your Vercel URL
2. Log in with admin credentials
3. Try creating a student
4. Try creating a class
5. Check if data appears in MongoDB Atlas

---

## 🔐 Security Recommendations

### ⚠️ CRITICAL: Change Your MongoDB Password!

Your current password `123` is **EXTREMELY INSECURE**!

**How to change it:**
1. Go to MongoDB Atlas → Database Access
2. Edit user `mohan21`
3. Click "Edit Password"
4. Generate a secure password (save it!)
5. Update `MONGODB_URI` on Render with new password

**New connection string format:**
```
mongodb+srv://mohan21:NEW_SECURE_PASSWORD@cluster0.afaipw7.mongodb.net/sms_production?appName=Cluster0
```

### ⚠️ Change JWT_SECRET

Generate a strong random key:
- Visit: https://randomkeygen.com/
- Copy a "Fort Knox Password"
- Update `JWT_SECRET` on Render

---

## 📊 Quick Reference

| Service | URL | Status |
|---------|-----|--------|
| **Backend** | https://mystudent-tskk.onrender.com | ✅ Deployed |
| **Frontend** | (Pending Vercel deployment) | ⏳ To Deploy |
| **Database** | cluster0.afaipw7.mongodb.net | ✅ Ready |

---

## 🆘 Troubleshooting

### If backend shows "Application Error"
- Check Render logs for errors
- Verify MongoDB connection string has database name
- Check all environment variables are set

### If frontend can't connect
- Verify `NEXT_PUBLIC_API_URL` ends with `/api`
- Check backend is running (visit the URL)
- Look for CORS errors in browser console (F12)

### If database connection fails
- Verify MongoDB password is correct
- Check database name is in connection string
- Ensure IP whitelist includes `0.0.0.0/0`

---

## ✅ Next Steps

1. **NOW:** Update Render environment variables (especially fix MongoDB URI)
2. **THEN:** Test backend at https://mystudent-tskk.onrender.com/api/status
3. **NEXT:** Deploy frontend to Vercel
4. **FINALLY:** Update CORS and create admin user

**Estimated time:** 15-20 minutes total

Good luck! 🚀

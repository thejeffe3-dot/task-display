# Netlify Deployment Guide - Troubleshooting

## If You're Getting "Page Not Found"

The app now has **localStorage fallback** built in, so it will work even if the Netlify Functions aren't set up correctly yet!

### Quick Fix - Test Locally First

1. Just open `index.html` directly in your browser (double-click it)
2. The app will work using localStorage
3. Test adding tasks to make sure everything works

### Deploy to Netlify - Proper Method

**Method 1: Via GitHub (Recommended)**

1. **Create a GitHub repository:**
   ```bash
   cd task-display-netlify
   git init
   git add .
   git commit -m "Initial commit"
   ```

2. **Create a repo on GitHub.com** and push:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/task-display.git
   git branch -M main
   git push -u origin main
   ```

3. **Deploy on Netlify:**
   - Go to [app.netlify.com](https://app.netlify.com)
   - Click "Add new site" → "Import an existing project"
   - Choose GitHub
   - Select your repository
   - **Build settings:**
     - Build command: (leave empty)
     - Publish directory: `.` (or leave empty)
     - Functions directory: `netlify/functions`
   - Click "Deploy site"

**Method 2: Netlify CLI**

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Initialize in your project folder
cd task-display-netlify
netlify init

# Deploy
netlify deploy --prod
```

When prompted:
- Build command: (leave empty, press Enter)
- Directory to deploy: `.` (current directory)
- Functions folder: `netlify/functions`

**Method 3: Drag & Drop**

1. Go to [app.netlify.com](https://app.netlify.com)
2. Drag the entire `task-display-netlify` folder
3. Wait for deployment

⚠️ **Note:** Drag & drop might not enable Functions properly. Use GitHub or CLI for full functionality.

## Verify Functions Are Working

After deployment, check:

1. **Open your Netlify site URL**
2. **Open browser console** (F12)
3. **Look for messages:**
   - ✅ If silent = Functions working!
   - ⚠️ If you see "Using localStorage fallback" = Functions not working (but app still works!)

## Test the Functions API

Visit: `https://your-site.netlify.app/.netlify/functions/tasks`

- ✅ Should show: `{"tasks":[]}`
- ❌ If 404: Functions aren't deployed

### Fix Functions Not Deploying

1. **Check Netlify dashboard:**
   - Go to Site Settings → Functions
   - Make sure Functions directory is set to `netlify/functions`

2. **Redeploy:**
   - Go to Deploys tab
   - Click "Trigger deploy" → "Deploy site"

3. **Check build logs:**
   - Look for "Functions" section in deploy log
   - Should say "1 new functions to upload"

## Alternative: Use LocalStorage Only

If you just want it to work NOW without worrying about Netlify Functions:

1. **Open `index.html` in a browser**
2. **Upload to any static host:**
   - GitHub Pages
   - Vercel
   - Netlify (even without functions)
   - Or just use it locally on your Raspberry Pi!

The app will automatically use localStorage, which works great for a single-device setup like a Raspberry Pi connected to a TV.

## For Raspberry Pi Setup

**If using locally (no hosting):**

1. Copy the entire folder to your Raspberry Pi
2. Double-click `index.html` or:
   ```bash
   chromium-browser /path/to/task-display-netlify/index.html
   ```

**If using Netlify:**

1. Deploy to Netlify (any method above)
2. On your Raspberry Pi:
   ```bash
   chromium-browser --kiosk https://your-site.netlify.app
   ```

## Why This Approach is Better

The updated version:
- ✅ Works immediately with localStorage
- ✅ Uses Netlify Functions when available
- ✅ Automatically falls back if functions fail
- ✅ No error messages to confuse users
- ✅ Perfect for single-device use (Raspberry Pi)

## Need Multi-Device Sync?

If you want multiple devices to share the same task list, you NEED the Netlify Functions working, OR use:
- Firebase Realtime Database
- Supabase
- Any other backend database

Let me know if you need help setting up a database-backed version!

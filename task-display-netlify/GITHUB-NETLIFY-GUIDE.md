# Complete GitHub + Netlify Setup Guide

This guide will help you set up a **production-ready, persistent** task display system using GitHub for version control and Netlify for hosting with Blobs storage.

## Why This Approach?

✅ **True Persistence** - Data saved with Netlify Blobs (never resets)
✅ **Version Control** - Track all changes with Git
✅ **Auto-Deploy** - Push to GitHub → Auto-deploys to Netlify
✅ **Backup** - Your code is safely stored on GitHub
✅ **Free** - Both services free for personal use
✅ **Professional** - Industry-standard workflow

---

## Step 1: Set Up GitHub Repository

### 1.1 Create a GitHub Account
- Go to [github.com](https://github.com) and sign up (if you don't have an account)

### 1.2 Create a New Repository
1. Click the **"+"** icon → **"New repository"**
2. **Repository name:** `task-display` (or any name you like)
3. **Description:** "Task display system for Raspberry Pi"
4. Choose **Public** or **Private**
5. **Do NOT** initialize with README, .gitignore, or license (we already have these)
6. Click **"Create repository"**

### 1.3 Push Your Code to GitHub

Open terminal/command prompt in the `task-display-netlify` folder:

```bash
# Navigate to the project folder
cd task-display-netlify

# Initialize git (if not already done)
git init

# Add all files
git add .

# Make your first commit
git commit -m "Initial commit - Task display system"

# Connect to your GitHub repo (replace with YOUR username and repo name)
git remote add origin https://github.com/YOUR_USERNAME/task-display.git

# Push to GitHub
git branch -M main
git push -u origin main
```

**Note:** Replace `YOUR_USERNAME` with your actual GitHub username!

---

## Step 2: Deploy to Netlify

### 2.1 Create Netlify Account
- Go to [netlify.com](https://netlify.com)
- Sign up with your GitHub account (recommended)

### 2.2 Import Your Repository

1. Click **"Add new site"** → **"Import an existing project"**
2. Choose **"Deploy with GitHub"**
3. Authorize Netlify to access your GitHub
4. Select your `task-display` repository
5. Configure build settings:
   ```
   Build command: (leave empty)
   Publish directory: .
   Functions directory: netlify/functions
   ```
6. Click **"Deploy site"**

### 2.3 Wait for Deployment
- Watch the deploy logs
- Should see "Functions" section showing your function deployed
- Wait for "Published" status

### 2.4 Get Your URL
- Netlify will give you a URL like: `https://random-name-12345.netlify.app`
- You can customize this in **Site settings** → **Domain management**

---

## Step 3: Verify Everything Works

### 3.1 Test the Website
1. Open your Netlify URL in a browser
2. Click **"Switch to Admin"**
3. Add a test task
4. Refresh the page - task should still be there! ✅

### 3.2 Test the API Function
Visit: `https://your-site.netlify.app/.netlify/functions/tasks`

Should see: `{"tasks":[]}` or your tasks in JSON format

### 3.3 Test Persistence
1. Add some tasks
2. Wait 30 minutes (or close/reopen browser)
3. Tasks should still be there! ✅

---

## Step 4: Set Up on Raspberry Pi

### 4.1 Open in Chromium
```bash
chromium-browser --kiosk https://your-site.netlify.app
```

### 4.2 Auto-Start on Boot

Create startup file:
```bash
sudo nano /etc/xdg/autostart/taskboard.desktop
```

Add this content (replace URL with yours):
```
[Desktop Entry]
Type=Application
Name=Task Board
Exec=chromium-browser --kiosk --noerrdialogs --disable-infobars --disable-session-crashed-bubble https://your-site.netlify.app
Hidden=false
X-GNOME-Autostart-enabled=true
```

Save with `Ctrl+X`, `Y`, `Enter`

Reboot to test:
```bash
sudo reboot
```

---

## Step 5: Making Updates

When you want to change your task display:

### 5.1 Edit Locally
1. Make changes to your files
2. Test locally by opening `index.html`

### 5.2 Push to GitHub
```bash
git add .
git commit -m "Description of your changes"
git push
```

### 5.3 Auto-Deploy
- Netlify automatically detects the push
- Builds and deploys new version
- Usually takes 1-2 minutes
- No downtime!

---

## Troubleshooting

### Functions Not Working?

1. **Check Netlify Dashboard:**
   - Site → Functions tab
   - Should see `tasks` function listed

2. **Check Deploy Logs:**
   - Deployments → Click latest deploy
   - Look for "Functions" section
   - Should say "1 new functions to upload"

3. **Check Environment:**
   - Site settings → Functions
   - Node version should be 18.x or higher

### Tasks Not Persisting?

1. **Verify Blobs is enabled:**
   - Netlify Blobs is automatically available
   - No setup needed (it's free!)

2. **Check browser console (F12):**
   - Look for errors
   - Should NOT see "Using localStorage fallback"

3. **Test API directly:**
   - Visit: `/.netlify/functions/tasks`
   - Should return JSON, not 404

### Can't Push to GitHub?

```bash
# Set up Git credentials
git config --global user.name "Your Name"
git config --global user.email "your-email@example.com"

# If using Personal Access Token
git remote set-url origin https://YOUR_TOKEN@github.com/YOUR_USERNAME/task-display.git
```

---

## Features Overview

### TV Display Mode (Default)
- Full-screen display of active tasks
- Large, readable text
- Auto-refreshes every 5 seconds
- Color-coded priorities
- Shows date/time

### Admin Mode
- Add new tasks
- Mark tasks complete
- Delete tasks
- Edit task details
- Set priorities (high/medium/low)

### Storage
- **Primary:** Netlify Blobs (persistent forever)
- **Fallback:** Browser localStorage (single device)
- Auto-syncs every save

---

## Cost

**100% FREE** for personal use:
- GitHub: Free (unlimited public repos)
- Netlify: Free tier includes:
  - 100GB bandwidth/month
  - 300 build minutes/month
  - Netlify Blobs: 1GB storage free
  - Serverless functions

This is more than enough for a home task display!

---

## Next Steps

Once set up, you can:
- Access from any device on your network
- Share the URL with family members
- Customize colors/styling in `index.html`
- Add more features (categories, due dates, etc.)
- Set up a custom domain

---

## Need Help?

Common issues:
1. **"Page not found"** → Check deployment status in Netlify
2. **Tasks disappear** → Check if functions are deployed
3. **Can't add tasks** → Open browser console for errors

Still stuck? The app has localStorage fallback, so worst case it still works locally on your Raspberry Pi!

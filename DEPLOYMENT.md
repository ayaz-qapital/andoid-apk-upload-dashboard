# Vercel Deployment Guide

## Method 1: Deploy via Vercel CLI (Recommended)

### 1. Install Vercel CLI
```bash
npm install -g vercel
```

### 2. Login to Vercel
```bash
vercel login
```

### 3. Deploy from project directory
```bash
cd C:\Users\codea\Downloads\build-upload-portal
vercel
```

Follow the prompts:
- Set up and deploy? **Y**
- Which scope? Select your account
- Link to existing project? **N** (for first deployment)
- Project name: **apk-upload-dashboard**
- In which directory is your code located? **./**

### 4. Set Environment Variables
After deployment, set environment variables in Vercel dashboard:

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project
3. Go to Settings → Environment Variables
4. Add these variables:
   - `VITE_BROWSERSTACK_USERNAME` = `ayazmahmood_U5cIfM`
   - `VITE_BROWSERSTACK_ACCESS_KEY` = `5oMaz1Dq2VCvdnnd8jY3`

### 5. Redeploy
```bash
vercel --prod
```

## Method 2: Deploy via GitHub Integration

### 1. Push to GitHub
```bash
git init
git add .
git commit -m "Initial commit: APK Upload Dashboard"
git branch -M main
git remote add origin https://github.com/yourusername/apk-upload-dashboard.git
git push -u origin main
```

### 2. Connect to Vercel
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "New Project"
3. Import your GitHub repository
4. Configure:
   - Framework Preset: **Vite**
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

### 3. Set Environment Variables
In Vercel project settings, add:
- `VITE_BROWSERSTACK_USERNAME` = `ayazmahmood_U5cIfM`
- `VITE_BROWSERSTACK_ACCESS_KEY` = `5oMaz1Dq2VCvdnnd8jY3`

### 4. Deploy
Click "Deploy" - Vercel will automatically build and deploy your app.

## Project Configuration

The project includes:
- `vercel.json` - Vercel configuration
- `.vercelignore` - Files to ignore during deployment
- `.env.production` - Production environment template

## Post-Deployment

1. Your app will be available at: `https://your-project-name.vercel.app`
2. Test APK upload functionality
3. Verify BrowserStack integration works
4. Check upload history persistence

## Troubleshooting

### Build Errors
- Ensure all dependencies are in `package.json`
- Check that build command produces `dist` folder
- Verify environment variables are set correctly

### API Errors
- Confirm BrowserStack credentials are correct
- Check CORS settings if needed
- Verify API endpoints are accessible

### Environment Variables
- Use `VITE_` prefix for client-side variables
- Set variables in Vercel dashboard, not in code
- Redeploy after changing environment variables

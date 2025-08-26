# APK Upload Dashboard

A modern React dashboard for uploading APK files to BrowserStack and managing app URLs for automated testing with WebDriverIO and Appium.

## Features

- 🚀 **Drag & Drop Upload**: Modern file upload interface
- ☁️ **Cloudinary Integration**: Handles large APK files (>50MB)
- 📱 **BrowserStack Integration**: Direct API integration for app URLs
- 📊 **Real-time Dashboard**: Track upload progress and manage URLs
- 🎨 **Modern UI**: Beautiful, responsive design with Tailwind CSS
- 📋 **Upload History**: Persistent storage of upload records

## Deployment to Vercel

### 1. Install Vercel CLI

```bash
npm install -g vercel
```

### 2. Login to Vercel

```bash
vercel login
```

### 3. Deploy

```bash
vercel --prod
```

### 4. Set Environment Variables in Vercel Dashboard

Go to your Vercel project dashboard and add these environment variables:

```
VITE_BROWSERSTACK_USERNAME=ayazmahmood_U5cIfM
VITE_BROWSERSTACK_ACCESS_KEY=5oMaz1Dq2VCvdnnd8jY3
VITE_CLOUDINARY_CLOUD_NAME=dacjgkgn9
VITE_CLOUDINARY_UPLOAD_PRESET=apk_uploads
```

## Cloudinary Setup

1. Create a Cloudinary account at https://cloudinary.com
2. Go to Settings > Upload presets
3. Create a new unsigned upload preset named `apk_uploads`
4. Set Mode to "Unsigned" and Resource Type to "Auto"

## Local Development

### 1. Install Dependencies

```bash
npm install
```

### 2. Create Environment File

```bash
cp .env.example .env
```

Edit `.env` with your credentials.

### 3. Start Development Server

```bash
npm run dev
```

## Usage

1. **Upload APK**: Drag and drop your APK file or click to browse
2. **Cloudinary Upload**: Large files are uploaded to Cloudinary first
3. **BrowserStack Processing**: Cloudinary URL is sent to BrowserStack
4. **Get App URL**: Copy the generated BrowserStack app URL
5. **Use in Tests**: Use the app URL in your WebDriverIO/Appium tests

### Example WebDriverIO Usage

```javascript
const capabilities = {
  'bstack:options': {
    userName: 'ayazmahmood_U5cIfM',
    accessKey: '5oMaz1Dq2VCvdnnd8jY3',
  },
  app: 'bs://your_app_url_from_dashboard',
  deviceName: 'Samsung Galaxy S21',
  platformName: 'Android'
}
```

## Project Structure

```
src/
├── components/
│   ├── Header.jsx          # Navigation header
│   ├── UploadZone.jsx      # File upload component
│   ├── Dashboard.jsx       # Upload history dashboard
│   └── LoadingSpinner.jsx  # Loading overlay
├── services/
│   └── browserStackService.js  # BrowserStack API integration
├── App.jsx                 # Main application component
├── main.jsx               # React entry point
└── index.css              # Global styles
```

## Technologies Used

- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **React Dropzone** - File upload component
- **Axios** - HTTP client for API calls
- **React Hot Toast** - Toast notifications
- **Lucide React** - Modern icon library

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

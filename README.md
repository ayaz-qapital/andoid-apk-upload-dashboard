# APK Upload Dashboard

A modern React dashboard for uploading APK files to BrowserStack and managing app URLs for automated testing with WebDriverIO and Appium.

## Features

- 🚀 **Drag & Drop Upload**: Modern file upload interface with drag and drop support
- 📱 **BrowserStack Integration**: Direct API integration for APK uploads
- 📊 **Real-time Dashboard**: Track upload progress and manage app URLs
- 🎨 **Modern UI**: Beautiful, responsive design with Tailwind CSS
- 📋 **Upload History**: Persistent storage of upload records
- 🔗 **Quick Actions**: Copy app URLs and manage uploads easily

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Start Development Server

```bash
npm run dev
```

The application will open at `http://localhost:3000`.

## Usage

1. **Upload APK**: Drag and drop your APK file or click to browse
2. **Monitor Progress**: Watch real-time upload progress
3. **Get App URL**: Copy the generated BrowserStack app URL
4. **Use in Tests**: Use the app URL in your WebDriverIO/Appium tests

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

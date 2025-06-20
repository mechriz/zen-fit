# Deployment Guide for ZenFit Wellness App

This guide covers various deployment options for the ZenFit wellness application.

## 🚀 Current Deployment

The app is currently deployed on Netlify at: [https://rad-dusk-48a851.netlify.app](https://rad-dusk-48a851.netlify.app)

## 📋 Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Git repository (for automated deployments)

## 🏗️ Build Process

### Local Build
```bash
# Install dependencies
npm install

# Create production build
npm run build

# Preview production build locally
npm run preview
```

The build output will be in the `dist` directory.

## 🌐 Deployment Options

### 1. Netlify (Recommended)

#### Option A: Drag & Drop Deployment
1. Run `npm run build` locally
2. Go to [Netlify](https://netlify.com)
3. Drag the `dist` folder to the deployment area
4. Your site will be live instantly

#### Option B: Git Integration
1. Push your code to GitHub
2. Connect your GitHub repository to Netlify
3. Set build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
4. Deploy automatically on every push

#### Netlify Configuration
Create a `netlify.toml` file in the root directory:

```toml
[build]
  publish = "dist"
  command = "npm run build"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[build.environment]
  NODE_VERSION = "18"
```

### 2. Vercel

#### Quick Deploy
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Follow the prompts
```

#### GitHub Integration
1. Connect your GitHub repository to Vercel
2. Import your project
3. Vercel will automatically detect the build settings
4. Deploy with automatic deployments on push

### 3. GitHub Pages

#### Setup
1. Install gh-pages package:
   ```bash
   npm install --save-dev gh-pages
   ```

2. Add to package.json:
   ```json
   {
     "homepage": "https://yourusername.github.io/zenfit-wellness-app",
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d dist"
     }
   }
   ```

3. Deploy:
   ```bash
   npm run deploy
   ```

### 4. Firebase Hosting

#### Setup
```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login to Firebase
firebase login

# Initialize Firebase in your project
firebase init hosting

# Build and deploy
npm run build
firebase deploy
```

#### Firebase Configuration
Create `firebase.json`:
```json
{
  "hosting": {
    "public": "dist",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ]
  }
}
```

### 5. AWS S3 + CloudFront

#### S3 Setup
1. Create an S3 bucket
2. Enable static website hosting
3. Upload the `dist` folder contents
4. Set bucket policy for public access

#### CloudFront Setup
1. Create a CloudFront distribution
2. Point to your S3 bucket
3. Configure custom error pages for SPA routing

### 6. Docker Deployment

#### Dockerfile
```dockerfile
# Build stage
FROM node:18-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

#### nginx.conf
```nginx
events {
    worker_connections 1024;
}

http {
    include /etc/nginx/mime.types;
    default_type application/octet-stream;

    server {
        listen 80;
        server_name localhost;
        root /usr/share/nginx/html;
        index index.html;

        location / {
            try_files $uri $uri/ /index.html;
        }
    }
}
```

#### Build and Run
```bash
# Build Docker image
docker build -t zenfit-app .

# Run container
docker run -p 80:80 zenfit-app
```

## 🔧 Environment Configuration

### Environment Variables
Currently, the app doesn't require environment variables for basic functionality. For future integrations:

```bash
# .env.production
VITE_API_URL=https://api.zenfit.co.ke
VITE_MPESA_API_KEY=your_mpesa_key
VITE_ANALYTICS_ID=your_analytics_id
```

### Build Optimization
The Vite configuration is already optimized for production:
- Code splitting
- Asset optimization
- Tree shaking
- Minification

## 📊 Performance Considerations

### Build Optimization
- Images are optimized and served from CDN (Pexels)
- CSS is purged and minified
- JavaScript is bundled and minified
- Assets are cached with proper headers

### Runtime Performance
- React components are optimized
- Lazy loading is implemented where appropriate
- Bundle size is kept minimal

## 🔍 Monitoring and Analytics

### Recommended Tools
- **Google Analytics**: User behavior tracking
- **Sentry**: Error monitoring
- **Lighthouse**: Performance monitoring
- **Netlify Analytics**: Basic site analytics

### Health Checks
Set up monitoring for:
- Site availability
- Performance metrics
- Error rates
- User engagement

## 🚨 Troubleshooting

### Common Issues

#### Build Failures
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

#### Routing Issues (404 on refresh)
Ensure your hosting provider is configured for SPA routing:
- Netlify: `_redirects` file or `netlify.toml`
- Apache: `.htaccess` file
- Nginx: proper location configuration

#### Performance Issues
- Check bundle size: `npm run build -- --analyze`
- Optimize images and assets
- Enable gzip compression
- Use CDN for static assets

### Debug Mode
For debugging production builds:
```bash
# Build with source maps
npm run build -- --sourcemap

# Serve locally
npm run preview
```

## 📋 Deployment Checklist

Before deploying:
- [ ] Run `npm run build` successfully
- [ ] Test the production build locally
- [ ] Verify all routes work correctly
- [ ] Check mobile responsiveness
- [ ] Test payment flow (M-Pesa simulation)
- [ ] Verify all images load correctly
- [ ] Check console for errors
- [ ] Test on different browsers
- [ ] Verify SEO meta tags
- [ ] Check accessibility compliance

## 🔄 Continuous Deployment

### GitHub Actions Example
```yaml
name: Deploy to Netlify

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2
    - name: Setup Node.js
      uses: actions/setup-node@v2
      with:
        node-version: '18'
    - name: Install dependencies
      run: npm ci
    - name: Build
      run: npm run build
    - name: Deploy to Netlify
      uses: nwtgck/actions-netlify@v1.2
      with:
        publish-dir: './dist'
        production-branch: main
      env:
        NETLIFY_AUTH_TOKEN: ${{ secrets.NETLIFY_AUTH_TOKEN }}
        NETLIFY_SITE_ID: ${{ secrets.NETLIFY_SITE_ID }}
```

## 📞 Support

For deployment issues:
- Check the hosting provider's documentation
- Review build logs for errors
- Test locally first
- Contact support if needed

---

**Happy Deploying! 🚀**
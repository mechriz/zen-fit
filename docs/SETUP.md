# Development Setup Guide

This guide will help you set up the ZenFit Wellness App for local development.

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18.0.0 or higher)
- **npm** (v8.0.0 or higher) or **yarn** (v1.22.0 or higher)
- **Git** (v2.30.0 or higher)
- **VS Code** (recommended) or your preferred code editor

### Verify Installation
```bash
node --version    # Should be v18.0.0+
npm --version     # Should be v8.0.0+
git --version     # Should be v2.30.0+
```

## 🚀 Quick Start

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/zenfit-wellness-app.git
cd zenfit-wellness-app
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start Development Server
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

## 📁 Project Structure

```
zenfit-wellness-app/
├── public/                 # Static assets
│   └── vite.svg           # Vite logo
├── src/                   # Source code
│   ├── components/        # React components
│   │   ├── Appointments/  # Appointment scheduling
│   │   ├── Dashboard/     # Dashboard components
│   │   ├── Layout/        # Layout components
│   │   ├── Onboarding/    # User onboarding
│   │   ├── Profile/       # User profile
│   │   ├── Wellness/      # Mental wellness
│   │   └── Workouts/      # Workout module
│   ├── context/           # React Context
│   ├── types/             # TypeScript types
│   ├── App.tsx            # Main app component
│   ├── main.tsx           # App entry point
│   └── index.css          # Global styles
├── docs/                  # Documentation
├── package.json           # Dependencies and scripts
├── tailwind.config.js     # Tailwind configuration
├── vite.config.ts         # Vite configuration
├── tsconfig.json          # TypeScript configuration
└── README.md              # Project documentation
```

## 🛠️ Development Tools

### VS Code Extensions (Recommended)
Install these extensions for the best development experience:

```json
{
  "recommendations": [
    "bradlc.vscode-tailwindcss",
    "esbenp.prettier-vscode",
    "ms-vscode.vscode-typescript-next",
    "formulahendry.auto-rename-tag",
    "christian-kohler.path-intellisense",
    "ms-vscode.vscode-json"
  ]
}
```

### VS Code Settings
Create `.vscode/settings.json`:
```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "typescript.preferences.importModuleSpecifier": "relative",
  "tailwindCSS.experimental.classRegex": [
    ["clsx\\(([^)]*)\\)", "(?:'|\"|`)([^']*)(?:'|\"|`)"]
  ]
}
```

## 🔧 Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build

# Code Quality
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint errors

# Type Checking
npm run type-check   # Run TypeScript compiler check
```

## 🎨 Styling with Tailwind CSS

### Configuration
The project uses a custom Tailwind configuration with:
- Custom color palette (primary, secondary, accent)
- Extended font family (Inter)
- Custom animations and keyframes
- Responsive breakpoints

### Usage Examples
```tsx
// Gradient backgrounds
<div className="bg-gradient-to-r from-primary-500 to-secondary-500">

// Responsive design
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">

// Custom animations
<div className="animate-fade-in">

// Hover effects
<button className="hover:bg-primary-600 transition-colors">
```

## 📱 Responsive Development

### Breakpoints
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

### Testing Responsive Design
1. Use browser dev tools
2. Test on actual devices
3. Use responsive design mode
4. Check touch interactions

## 🔍 Debugging

### Browser Dev Tools
- **React Developer Tools**: Debug React components
- **Network Tab**: Monitor API calls
- **Console**: Check for errors and logs
- **Performance Tab**: Analyze performance

### Common Issues
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Clear Vite cache
rm -rf node_modules/.vite
npm run dev

# Type checking issues
npm run type-check
```

## 🧪 Testing

### Manual Testing Checklist
- [ ] User onboarding flow
- [ ] Workout module functionality
- [ ] Therapist booking system
- [ ] Payment simulation
- [ ] Mobile responsiveness
- [ ] Cross-browser compatibility

### Browser Testing
Test on:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🔐 Environment Variables

Currently, no environment variables are required for development. For future integrations:

```bash
# .env.local
VITE_API_URL=http://localhost:3000
VITE_MPESA_API_KEY=your_test_key
VITE_ANALYTICS_ID=your_analytics_id
```

## 📦 Dependencies

### Main Dependencies
- **React 18**: UI library
- **TypeScript**: Type safety
- **React Router DOM**: Client-side routing
- **Tailwind CSS**: Utility-first CSS
- **Lucide React**: Icon library

### Dev Dependencies
- **Vite**: Build tool and dev server
- **ESLint**: Code linting
- **TypeScript**: Type checking
- **Autoprefixer**: CSS vendor prefixes
- **PostCSS**: CSS processing

## 🚀 Building for Production

### Local Build
```bash
npm run build
```

### Build Output
- **dist/**: Production build files
- **dist/assets/**: Optimized assets (CSS, JS, images)
- **dist/index.html**: Main HTML file

### Build Optimization
- Code splitting
- Tree shaking
- Asset optimization
- Minification
- Gzip compression

## 🔄 Git Workflow

### Branch Naming
- `feature/feature-name`
- `fix/bug-description`
- `docs/documentation-update`
- `refactor/code-improvement`

### Commit Messages
```bash
feat: add user profile editing
fix: resolve payment validation issue
docs: update setup instructions
style: improve button hover effects
refactor: optimize component structure
```

## 🐛 Troubleshooting

### Common Issues

#### Port Already in Use
```bash
# Kill process on port 5173
lsof -ti:5173 | xargs kill -9

# Or use different port
npm run dev -- --port 3000
```

#### TypeScript Errors
```bash
# Check for type errors
npm run type-check

# Restart TypeScript server in VS Code
Ctrl+Shift+P > "TypeScript: Restart TS Server"
```

#### Styling Issues
```bash
# Rebuild Tailwind CSS
npm run build

# Check Tailwind configuration
npx tailwindcss --help
```

#### Module Resolution
```bash
# Clear module cache
rm -rf node_modules/.cache
npm run dev
```

## 📞 Getting Help

### Resources
- [React Documentation](https://reactjs.org/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Vite Guide](https://vitejs.dev/guide)

### Community
- GitHub Issues: Report bugs and request features
- Discussions: Ask questions and share ideas
- Discord: Real-time community chat (coming soon)

## ✅ Development Checklist

Before submitting code:
- [ ] Code runs without errors
- [ ] TypeScript types are correct
- [ ] ESLint passes
- [ ] Mobile responsive
- [ ] Cross-browser tested
- [ ] Accessibility considered
- [ ] Performance optimized

---

**Happy coding! 🚀**
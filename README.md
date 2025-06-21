# ZenFit - Holistic Wellness App for Gen Z

A comprehensive wellness platform targeting Gen Z users (16-24) that integrates mental wellness support with physical fitness tracking, featuring M-Pesa payment integration for the Kenyan market.

## 🌟 Features

### Core Functionality
- **User Onboarding**: Personalized setup based on fitness and mental health goals
- **Workout Module**: Curated video workout plans with progress tracking
- **Mental Wellness Support**: Connect with licensed therapists and book sessions
- **Therapist Portal**: Complete management system for therapists to manage clients and sessions
- **Appointment Scheduling**: Real-time booking system for therapy and training sessions
- **Mobile Payments**: Integrated M-Pesa payment system
- **User Dashboard**: Comprehensive tracking of fitness and mental health journey

### User Experience
- Mobile-first responsive design
- Youth-friendly, vibrant interface
- Intuitive navigation and user flow
- Real-time progress tracking
- Achievement system and gamification

### Therapist Portal Features
- **Secure Login**: Authentication system for therapists
- **Client Management**: View and manage all clients with detailed profiles
- **Schedule Management**: View daily, weekly, and monthly schedules
- **Session Notes**: Create and manage detailed session notes
- **Progress Tracking**: Monitor client progress and mood scores
- **Dashboard Analytics**: Overview of practice statistics and performance

## 🚀 Live Demo

Visit the live application: [https://rad-dusk-48a851.netlify.app](https://rad-dusk-48a851.netlify.app)

### Demo Access

#### User Portal
- Complete the onboarding flow to access the main app

#### Therapist Portal
- URL: `/therapist`
- Demo Credentials:
  - Email: `sarah.johnson@zenfit.co.ke`
  - Password: `password123`

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Routing**: React Router DOM
- **Build Tool**: Vite
- **Deployment**: Netlify
- **Payment Integration**: M-Pesa API (simulated)

## 📱 Screenshots

### User Dashboard
![Dashboard](https://images.pexels.com/photos/4164418/pexels-photo-4164418.jpeg?auto=compress&cs=tinysrgb&w=800)

### Therapist Portal
![Therapist Dashboard](https://images.pexels.com/photos/5452201/pexels-photo-5452201.jpeg?auto=compress&cs=tinysrgb&w=800)

### Workout Module
![Workouts](https://images.pexels.com/photos/416809/pexels-photo-416809.jpeg?auto=compress&cs=tinysrgb&w=800)

### Mental Wellness
![Wellness](https://images.pexels.com/photos/5452201/pexels-photo-5452201.jpeg?auto=compress&cs=tinysrgb&w=800)

## 🏗️ Project Structure

```
zenfit-wellness-app/
├── public/
│   └── vite.svg
├── src/
│   ├── components/
│   │   ├── Appointments/
│   │   │   └── AppointmentScheduler.tsx
│   │   ├── Dashboard/
│   │   │   └── DashboardHome.tsx
│   │   ├── Layout/
│   │   │   ├── Navigation.tsx
│   │   │   └── MobileHeader.tsx
│   │   ├── Onboarding/
│   │   │   └── OnboardingFlow.tsx
│   │   ├── Profile/
│   │   │   └── UserProfile.tsx
│   │   ├── Therapist/
│   │   │   ├── TherapistApp.tsx
│   │   │   ├── TherapistLogin.tsx
│   │   │   ├── TherapistDashboard.tsx
│   │   │   ├── TherapistLayout.tsx
│   │   │   └── ClientManagement.tsx
│   │   ├── Wellness/
│   │   │   └── WellnessModule.tsx
│   │   └── Workouts/
│   │       └── WorkoutModule.tsx
│   ├── context/
│   │   ├── AppContext.tsx
│   │   └── TherapistContext.tsx
│   ├── types/
│   │   └── index.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── package.json
├── tailwind.config.js
├── vite.config.ts
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/zenfit-wellness-app.git
   cd zenfit-wellness-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## 🎯 Key Features Breakdown

### 1. User Onboarding
- Multi-step form collecting personal details
- Goal-based customization for fitness and mental health
- Progress tracking setup
- Personalized dashboard configuration

### 2. Workout System
- Categorized workout plans (Strength, Cardio, Yoga, HIIT, Flexibility)
- Difficulty levels (Beginner, Intermediate, Advanced)
- Duration-based filtering
- Progress tracking and streak counting

### 3. Mental Wellness Platform
- Licensed therapist directory
- Specialization-based filtering
- Session booking system
- Crisis support resources
- Progress tracking for mental health goals

### 4. Therapist Portal
- **Authentication**: Secure login system for therapists
- **Client Management**: Comprehensive client profiles and progress tracking
- **Schedule Management**: View and manage appointments and availability
- **Session Notes**: Create, edit, and manage detailed session notes
- **Analytics Dashboard**: Practice overview with key metrics and insights
- **Communication Tools**: Contact clients via phone, email, or messaging

### 5. Payment Integration
- M-Pesa payment simulation
- Session booking with payment
- Payment confirmation flow
- Transaction history

### 6. Dashboard & Analytics
- Weekly progress visualization
- Achievement system
- Upcoming appointments
- Goal tracking
- Streak maintenance

## 🎨 Design System

### Color Palette
- **Primary**: Purple gradient (#8b5cf6 to #7c3aed)
- **Secondary**: Pink gradient (#ec4899 to #db2777)
- **Accent**: Orange (#f97316)
- **Success**: Green (#10b981)
- **Warning**: Yellow (#f59e0b)
- **Error**: Red (#ef4444)

### Typography
- **Font Family**: Inter
- **Weights**: 300, 400, 500, 600, 700
- **Responsive scaling**: Mobile-first approach

### Components
- Consistent 8px spacing system
- Rounded corners (8px, 12px, 16px)
- Subtle shadows and hover effects
- Smooth transitions and animations

## 📱 Mobile Responsiveness

The app is built with a mobile-first approach:
- **Mobile**: < 768px (Bottom navigation, stacked layouts)
- **Tablet**: 768px - 1024px (Adaptive layouts)
- **Desktop**: > 1024px (Sidebar navigation, multi-column layouts)

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Code Style
- TypeScript for type safety
- ESLint for code quality
- Consistent component structure
- Modular architecture

## 🚀 Deployment

### Netlify (Current)
The app is currently deployed on Netlify with automatic builds.

### Manual Deployment
1. Build the project: `npm run build`
2. Deploy the `dist` folder to your hosting provider

### Environment Variables
No environment variables are currently required for basic functionality.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📋 Roadmap

### Phase 1 (Current)
- [x] User onboarding system
- [x] Workout module with video plans
- [x] Mental wellness therapist directory
- [x] Appointment scheduling
- [x] M-Pesa payment simulation
- [x] Progress dashboard
- [x] Therapist portal with login
- [x] Client management system
- [x] Session notes functionality

### Phase 2 (Planned)
- [ ] Real M-Pesa API integration
- [ ] Video streaming for workouts
- [ ] In-app messaging with therapists
- [ ] Advanced analytics and insights
- [ ] Social features and community
- [ ] Offline mode support
- [ ] Calendar integration for therapists
- [ ] Automated appointment reminders

### Phase 3 (Future)
- [ ] AI-powered workout recommendations
- [ ] Wearable device integration
- [ ] Nutrition tracking
- [ ] Group therapy sessions
- [ ] Marketplace for wellness products
- [ ] Multi-language support (Swahili, English)

## 🐛 Known Issues

- M-Pesa integration is currently simulated
- Video playback requires external hosting
- Real-time notifications not implemented
- Calendar sync not available
- Therapist portal schedule management is placeholder

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Team

- **Frontend Development**: React + TypeScript
- **UI/UX Design**: Tailwind CSS + Custom Components
- **Payment Integration**: M-Pesa API (Simulated)
- **Therapist Portal**: Complete management system

## 📞 Support

For support, email support@zenfit.co.ke or join our community Discord.

## 🙏 Acknowledgments

- [Pexels](https://pexels.com) for stock images
- [Lucide](https://lucide.dev) for beautiful icons
- [Tailwind CSS](https://tailwindcss.com) for styling system
- [React](https://reactjs.org) for the frontend framework

---

**Built with ❤️ for Gen Z wellness in Kenya**
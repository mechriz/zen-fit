# API Documentation

This document outlines the current API structure and planned integrations for the ZenFit Wellness App.

## 🚧 Current Status

The app currently uses **simulated data** and **mock APIs** for development and demonstration purposes. All data is stored in React Context and local state.

## 📋 Data Models

### User
```typescript
interface User {
  id: string;
  name: string;
  email: string;
  age: number;
  weight: number;
  height: number;
  fitnessGoals: string[];
  mentalHealthGoals: string[];
  avatar?: string;
  joinedAt: Date;
}
```

### Appointment
```typescript
interface Appointment {
  id: string;
  type: 'therapy' | 'training';
  providerId: string;
  providerName: string;
  date: string;
  time: string;
  duration: number;
  status: 'scheduled' | 'completed' | 'cancelled';
  price: number;
  notes?: string;
}
```

### Progress
```typescript
interface Progress {
  workouts: {
    totalSessions: number;
    totalMinutes: number;
    streak: number;
    weeklyGoal: number;
    weeklyProgress: number;
  };
  mentalHealth: {
    moodScore: number;
    journalEntries: number;
    therapySessions: number;
    lastSessionDate?: Date;
  };
}
```

### Therapist
```typescript
interface Therapist {
  id: string;
  name: string;
  specialization: string[];
  bio: string;
  avatar: string;
  rating: number;
  reviewCount: number;
  pricePerSession: number;
  availability: TimeSlot[];
}
```

### WorkoutPlan
```typescript
interface WorkoutPlan {
  id: string;
  title: string;
  description: string;
  duration: number;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  category: string;
  videoUrl: string;
  thumbnail: string;
  exercises: Exercise[];
}
```

## 🔮 Planned API Integrations

### 1. Authentication API
```typescript
// User registration
POST /api/auth/register
{
  name: string;
  email: string;
  password: string;
  age: number;
}

// User login
POST /api/auth/login
{
  email: string;
  password: string;
}

// Get current user
GET /api/auth/me
Authorization: Bearer <token>
```

### 2. User Management API
```typescript
// Update user profile
PUT /api/users/profile
{
  name?: string;
  weight?: number;
  height?: number;
  fitnessGoals?: string[];
  mentalHealthGoals?: string[];
}

// Get user progress
GET /api/users/progress

// Update user progress
POST /api/users/progress
{
  workoutSession?: {
    duration: number;
    type: string;
  };
  moodEntry?: {
    score: number;
    notes?: string;
  };
}
```

### 3. Workout API
```typescript
// Get workout plans
GET /api/workouts
?category=string
&difficulty=string
&duration=number

// Get specific workout
GET /api/workouts/:id

// Track workout completion
POST /api/workouts/:id/complete
{
  duration: number;
  completed: boolean;
}
```

### 4. Therapist API
```typescript
// Get therapists
GET /api/therapists
?specialization=string
&availability=string

// Get therapist profile
GET /api/therapists/:id

// Get therapist availability
GET /api/therapists/:id/availability
?date=string
```

### 5. Appointment API
```typescript
// Book appointment
POST /api/appointments
{
  therapistId: string;
  date: string;
  time: string;
  type: 'video' | 'phone' | 'chat';
}

// Get user appointments
GET /api/appointments

// Update appointment
PUT /api/appointments/:id
{
  status?: 'scheduled' | 'completed' | 'cancelled';
  notes?: string;
}

// Cancel appointment
DELETE /api/appointments/:id
```

### 6. Payment API (M-Pesa Integration)
```typescript
// Initiate payment
POST /api/payments/mpesa/initiate
{
  amount: number;
  phoneNumber: string;
  appointmentId: string;
}

// Check payment status
GET /api/payments/:transactionId/status

// Payment callback (webhook)
POST /api/payments/mpesa/callback
{
  TransactionType: string;
  TransID: string;
  TransAmount: number;
  BusinessShortCode: string;
  BillRefNumber: string;
  InvoiceNumber: string;
  OrgAccountBalance: string;
  ThirdPartyTransID: string;
  MSISDN: string;
  FirstName: string;
  MiddleName: string;
  LastName: string;
}
```

## 🔐 Authentication

### JWT Token Structure
```typescript
interface JWTPayload {
  userId: string;
  email: string;
  role: 'user' | 'therapist' | 'admin';
  iat: number;
  exp: number;
}
```

### Headers
```typescript
Authorization: Bearer <jwt_token>
Content-Type: application/json
```

## 📱 M-Pesa Integration

### STK Push Flow
1. User initiates payment
2. App calls M-Pesa STK Push API
3. User receives M-Pesa prompt on phone
4. User enters M-Pesa PIN
5. Payment processed
6. Callback received
7. Appointment confirmed

### Required Environment Variables
```bash
MPESA_CONSUMER_KEY=your_consumer_key
MPESA_CONSUMER_SECRET=your_consumer_secret
MPESA_BUSINESS_SHORT_CODE=your_short_code
MPESA_PASSKEY=your_passkey
MPESA_CALLBACK_URL=https://yourapp.com/api/payments/mpesa/callback
```

## 🔄 Real-time Features (Planned)

### WebSocket Events
```typescript
// Connection
connect: { userId: string }

// Appointment updates
appointment:update: {
  appointmentId: string;
  status: string;
  message?: string;
}

// Therapist availability
therapist:availability: {
  therapistId: string;
  slots: TimeSlot[];
}

// Payment status
payment:status: {
  transactionId: string;
  status: 'pending' | 'success' | 'failed';
}
```

## 📊 Analytics API (Planned)

### User Analytics
```typescript
// Track user action
POST /api/analytics/track
{
  event: string;
  properties: Record<string, any>;
  userId: string;
}

// Get user insights
GET /api/analytics/insights/:userId
```

## 🚨 Error Handling

### Standard Error Response
```typescript
{
  error: {
    code: string;
    message: string;
    details?: any;
  };
  timestamp: string;
  path: string;
}
```

### Common Error Codes
- `AUTH_REQUIRED`: Authentication required
- `INVALID_TOKEN`: Invalid or expired token
- `VALIDATION_ERROR`: Request validation failed
- `NOT_FOUND`: Resource not found
- `PAYMENT_FAILED`: Payment processing failed
- `APPOINTMENT_CONFLICT`: Time slot not available

## 📈 Rate Limiting

### Limits (Planned)
- Authentication: 5 requests per minute
- General API: 100 requests per minute
- Payment API: 10 requests per minute
- File uploads: 5 requests per minute

## 🔒 Security

### Data Protection
- All API endpoints use HTTPS
- Sensitive data is encrypted
- PII is handled according to GDPR/local regulations
- Payment data follows PCI DSS standards

### Input Validation
- All inputs are validated and sanitized
- SQL injection protection
- XSS prevention
- CSRF protection

## 📝 API Versioning

### URL Structure
```
https://api.zenfit.co.ke/v1/...
```

### Version Headers
```
API-Version: v1
Accept: application/json
```

## 🧪 Testing

### Mock API Endpoints
For development, mock endpoints are available:
```
https://mock-api.zenfit.co.ke/v1/...
```

### Postman Collection
A Postman collection will be provided for API testing.

---

**Note**: This API documentation reflects the planned architecture. The current version uses simulated data for demonstration purposes.
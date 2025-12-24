# 🏭 Coal Vision - Modern Worker Management System

<div align="center">
  <img src="public/assets/logo.jpeg" alt="Coal Vision Logo" width="120" />
  
  **A comprehensive digital portal for Coal India Limited workers**
  
  [![React](https://img.shields.io/badge/React-18.3-61dafb?style=for-the-badge&logo=react)](https://reactjs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.6-3178c6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
  [![Vite](https://img.shields.io/badge/Vite-7.3-646cff?style=for-the-badge&logo=vite)](https://vitejs.dev/)
  [![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.0-38bdf8?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com/)
  [![Firebase](https://img.shields.io/badge/Firebase-10.x-ffca28?style=for-the-badge&logo=firebase)](https://firebase.google.com/)
</div>

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| 🔐 **Secure Authentication** | Firebase-powered login with session persistence |
| 👤 **Worker Dashboard** | Profile management with real-time status updates |
| 🔄 **Shift Handover** | Digital handover logs with PDF generation |
| 🛡️ **Safety Management** | DGMS-compliant safety protocols and checklists |
| 🚨 **TARP Response** | Emergency response plans with quick access |
| 📊 **Daily Updates** | Production, environment, and community data |
| 📅 **Holiday Calendar** | Comprehensive holiday listing by year |

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
cd coalvision-modern

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
npm run preview
```

---

## 📁 Project Structure

```
coalvision-modern/
├── public/
│   └── assets/              # Images and static assets
├── src/
│   ├── contexts/
│   │   └── AuthContext.tsx  # Authentication state management
│   ├── services/
│   │   └── firebase.ts      # Firebase v10 configuration
│   ├── types/
│   │   └── index.ts         # TypeScript interfaces
│   ├── pages/
│   │   ├── Login.tsx        # Authentication page
│   │   ├── Dashboard.tsx    # Worker profile & tasks
│   │   ├── ShiftHandover.tsx # Handover form + PDF
│   │   ├── SafetyManagement.tsx
│   │   ├── ResponsePlan.tsx # TARP emergency plans
│   │   ├── Updates.tsx      # Daily mine updates
│   │   └── Holidays.tsx     # Holiday calendar
│   ├── App.tsx              # Routes & providers
│   └── index.css            # TailwindCSS + custom styles
└── package.json
```

---

## 🎨 Tech Stack

- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite 7.3 with HMR
- **Styling**: TailwindCSS 4.0 + CSS variables
- **Animations**: Framer Motion
- **Backend**: Firebase Realtime Database
- **PDF Generation**: jsPDF
- **Icons**: Lucide React
- **Notifications**: React Hot Toast

---

## 🔧 Environment Variables

Create a `.env.local` file in the root directory:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_DATABASE_URL=your_database_url
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

---

## 📱 Pages Overview

### 🔐 Login
- Animated glassmorphism design
- Split layout with branding
- Firebase authentication

### 📊 Dashboard
- Worker profile display
- Real-time alerts from Firebase
- Quick action buttons

### 🔄 Shift Handover
- Comprehensive handover form
- PDF generation with jsPDF
- Recent handovers history

### 🛡️ Safety Management
- DGMS guidelines compliance
- Safety checklist
- External report links

### 🚨 TARP Response Plan
- 10 emergency response topics
- Expandable cards
- External resource links

### 📈 Updates
- Daily coal mine updates
- Production data
- Environmental impact stats

### 📅 Holidays
- National holidays calendar
- Grouped by year
- Color-coded categories

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is proprietary software for Coal India Limited.

---

<div align="center">
  <p>Built with ❤️ for Coal India Limited</p>
  <p><sub>© 2024 Coal Vision. All rights reserved.</sub></p>
</div>

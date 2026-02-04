# MX-IX Frontend

> **Premium Internet Exchange Platform** - A world-class web interface for MX-IX global network infrastructure.

[![React](https://img.shields.io/badge/React-18.x-61DAFB?logo=react&logoColor=white)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.x-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.x-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

## 🌟 Overview

MX-IX Frontend is a cutting-edge web application showcasing a premium Internet Exchange (IX) platform with interactive global network visualization, real-time capacity monitoring, and comprehensive service offerings. Built with modern web technologies, it delivers an exceptional user experience with smooth animations, responsive design, and professional aesthetics.

## ✨ Key Features

### 🗺️ **Interactive Global Map**
- **Premium visualization** of worldwide exchange locations
- **Real-time location cards** with glassmorphic design
- **Animated markers** with multi-layer effects and SVG filters
- **Dynamic statistics** display (capacity, routes, latency, coverage)
- **Responsive map interactions** with hover and click states

### 📊 **Real-Time Capacity Monitor**
- **Animated traffic visualization** with gradient effects
- **Live feed indicators** with pulsing animations
- **124 Tbps capacity display** with premium styling

### 🌐 **Location Management**
- **Interactive location selector** with detailed facility information
- **Tier IV datacenter specifications**
- **Network interconnection stats** (400+ networks)
- **Power and latency metrics**

### 🛠️ **Services Catalog**
- **Five service categories**: Peering, Private Connectivity, Access, Infrastructure & Consultancy, Cloud & Security
- **Animated service cards** with tech borders and corner brackets
- **Hover effects** with smooth transitions
- **Sticky sidebar navigation** for easy browsing

## 🚀 Tech Stack

| Technology | Purpose |
|------------|---------|
| **React 18** | UI framework with hooks and modern patterns |
| **TypeScript** | Type-safe development |
| **Vite** | Lightning-fast build tool and dev server |
| **Tailwind CSS** | Utility-first CSS framework |
| **React Simple Maps** | Interactive map visualization |
| **React Router** | Client-side routing |

## 📦 Installation

### Prerequisites
- Node.js 18.x or higher
- npm or yarn package manager

### Setup

```bash
# Clone the repository
git clone https://github.com/Wonder-Creative-Studio/MX-IX_frontend.git

# Navigate to project directory
cd MX-IX_frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:5173`

## 🛠️ Available Scripts

```bash
# Development server with hot reload
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview

# Type checking
npm run type-check

# Lint code
npm run lint
```

## 📁 Project Structure

```
MX-IX_frontend/
├── public/              # Static assets
│   └── assets/         # Images, logos
├── src/
│   ├── components/     # Reusable UI components
│   │   ├── GlobalFabric.tsx
│   │   ├── GlobalFabricMap.tsx
│   │   └── RealTimeCapacity.tsx
│   ├── pages/          # Page components
│   │   ├── AboutPage.tsx
│   │   ├── AdminPanel.tsx
│   │   ├── ContactPage.tsx
│   │   ├── LocationsPage.tsx
│   │   └── ServicesPage.tsx
│   ├── shared/         # Shared utilities
│   │   └── hooks.ts
│   ├── App.tsx         # Main application component
│   ├── main.tsx        # Application entry point
│   └── index.css       # Global styles
├── index.html          # HTML template
├── package.json        # Dependencies and scripts
├── tsconfig.json       # TypeScript configuration
├── tailwind.config.js  # Tailwind CSS configuration
└── vite.config.ts      # Vite configuration
```

## 🎨 Design System

### Color Palette
```css
Primary Red:    #F20732
Deep Red:       #A6032F
Bright Red:     #F20746
Off White:      #F2F2F2
Pure Black:     #0D0D0D
Dark Grays:     #1a1a1a - #1f1f1f
```

### Typography
- **Headings**: Black weight (900), tight tracking
- **Body**: Regular to semibold weights
- **Monospace**: Code, labels, and technical data

### Animations
- Fade in effects for cards
- Pulse animations for active states
- Shimmer effects on hover
- Smooth transitions (300-700ms)

## 🌐 Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Modern mobile browsers

## 📝 Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_URL=your_api_url_here
VITE_APP_TITLE=MX-IX
```

## 🚢 Deployment

### Build for Production

```bash
npm run build
```

The optimized build will be in the `dist/` directory, ready for deployment to any static hosting service:

- **Vercel**: Connect your GitHub repository
- **Netlify**: Deploy from Git or drag & drop
- **AWS S3 + CloudFront**: Upload dist folder
- **GitHub Pages**: Use gh-pages branch

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is proprietary and confidential.

## 👥 Team

**Wonder Creative Studio** - Development Team

---

## 🎯 Roadmap

- [ ] Add user authentication
- [ ] Implement dark mode toggle
- [ ] Add multi-language support
- [ ] Integrate real-time data feeds
- [ ] Add network health monitoring dashboard
- [ ] Implement advanced filtering and search

## 📞 Support

For support and inquiries:
- **Email**: support@mx-ix.com
- **Website**: https://mx-ix.com
- **GitHub Issues**: [Report a bug](https://github.com/Wonder-Creative-Studio/MX-IX_frontend/issues)

---

<div align="center">
  <strong>Built with ❤️ by Wonder Creative Studio</strong>
  <br/>
  <sub>Powering the future of global network connectivity.</sub>
</div>

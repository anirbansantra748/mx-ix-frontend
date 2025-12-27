import React, { useState, useEffect, useRef } from 'react';
import LocationsPage from './pages/LocationsPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import ServicesPage from './pages/ServicesPage';
import AdminPanel from './pages/AdminPanel';
import StatsPage from './pages/StatsPage';
import RealTimeCapacity from './components/RealTimeCapacity';
import GlobalFabric from './components/GlobalFabric';
import HeroNetworkMap from './components/HeroNetworkMap';
import OrbitalLogoAdvanced from './components/OrbitalLogoAdvanced';


// --- TYPES ---
interface AppData {
  latency: number;
  peers: number;
  capacity: number;
  locations: LocationData[];
}

interface LocationData {
  id: string;
  name: string;
  region: string;
  status: 'active' | 'maintenance' | 'planned';
  latency: string;
}

// --- MOCK DATA ---
const INITIAL_DATA: AppData = {
  latency: 0.4,
  peers: 4921,
  capacity: 124,
  locations: [
    { id: 'ams', name: 'AMSTERDAM', region: 'EU', status: 'active', latency: '0.8ms' },
    { id: 'nyc', name: 'NEW YORK', region: 'NA', status: 'active', latency: '1.2ms' },
    { id: 'sin', name: 'SINGAPORE', region: 'APAC', status: 'active', latency: '2.1ms' },
    { id: 'frk', name: 'FRANKFURT', region: 'EU', status: 'active', latency: '0.9ms' },
    { id: 'tyo', name: 'TOKYO', region: 'APAC', status: 'active', latency: '1.5ms' },
  ]
};

// --- CUSTOM HOOKS ---
const useCounterAnimation = (end: number, isFloat: boolean = false, duration: number = 2000) => {
  const [count, setCount] = useState('0');
  const elementRef = useRef<HTMLSpanElement>(null);
  const observer = useRef<IntersectionObserver | null>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (hasAnimated.current) {
        setCount(isFloat ? end.toFixed(1) : Math.floor(end).toLocaleString());
        return; 
    }

    if (elementRef.current) {
      observer.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && !hasAnimated.current) {
            hasAnimated.current = true;
            let start = 0;
            const increment = end / (duration / 16); 
            
            const timer = setInterval(() => {
              start += increment;
              if (start >= end) {
                setCount(isFloat ? end.toFixed(1) : Math.floor(end).toLocaleString());
                clearInterval(timer);
              } else {
                setCount(isFloat ? start.toFixed(1) : Math.floor(start).toLocaleString());
              }
            }, 16);
          }
        },
        { threshold: 0.5 }
      );
      observer.current.observe(elementRef.current);
    }
    return () => observer.current?.disconnect();
  }, [end, duration, isFloat]);

  useEffect(() => {
     if (hasAnimated.current) {
         setCount(isFloat ? end.toFixed(1) : Math.floor(end).toLocaleString());
     }
  }, [end, isFloat]);

  return { count, elementRef };
};

const useMousePosition = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', updateMousePosition);
    return () => window.removeEventListener('mousemove', updateMousePosition);
  }, []);
  return mousePosition;
};

// --- SHARED COMPONENTS ---
const CustomCursor = () => {
  const { x, y } = useMousePosition();
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseOver = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest('.hover-trigger')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };
    document.addEventListener('mouseover', handleMouseOver);
    return () => document.removeEventListener('mouseover', handleMouseOver);
  }, []);

  return (
    <>
      <style>{`
        body { cursor: none; }
        a, button, input, select, textarea { cursor: none; }
      `}</style>
      <div
        className="fixed top-0 left-0 w-4 h-4 rounded-full bg-[#F20732] pointer-events-none z-[100] mix-blend-difference transition-transform duration-100 ease-out"
        style={{ transform: `translate(${x - 8}px, ${y - 8}px) scale(${isHovering ? 2.5 : 1})` }}
      />
      <div
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-[#F20732] pointer-events-none z-[100] transition-transform duration-300 ease-out"
        style={{ transform: `translate(${x - 16}px, ${y - 16}px) scale(${isHovering ? 1.5 : 1})` }}
      />
    </>
  );
};

const Navigation = ({ currentPage, setPage }: { currentPage: string, setPage: (p: string) => void }) => {
  const [scrolled, setScrolled] = useState(false);
  const [isDarkNav, setIsDarkNav] = useState(false);
  const [isLogoRotating, setIsLogoRotating] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    
    // Check for dark-nav class
    const checkDarkNav = () => {
      setIsDarkNav(document.body.classList.contains('dark-nav'));
    };
    
    // Initial check
    checkDarkNav();
    
    // Watch for class changes
    const observer = new MutationObserver(checkDarkNav);
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });
    
    // Trigger logo rotation on initial load
    setTimeout(() => {
      setIsLogoRotating(true);
      setTimeout(() => setIsLogoRotating(false), 1500);
    }, 500);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  const handleLogoClick = () => {
    setPage('home');
  };

  const handleLogoHover = () => {
    if (!isLogoRotating) {
      setIsLogoRotating(true);
      setTimeout(() => setIsLogoRotating(false), 3000);
    }
  };

  const navItems = [
    { id: 'services', label: 'SERVICES' },
    { id: 'locations', label: 'LOCATIONS' },
    { id: 'stats', label: 'STATS' },
    { id: 'admin', label: 'ADMIN' },
  ];

  // Adjust colors based on dark mode and scroll state
  const getNavBg = () => {
    if (isDarkNav && !scrolled) return 'bg-black/50 backdrop-blur-md border-b border-white/10';
    if (scrolled) return 'bg-white/95 backdrop-blur-md border-b border-gray-200';
    return 'bg-transparent';
  };

  const getTextColor = () => {
    return isDarkNav && !scrolled ? 'text-white' : 'text-black';
  };

  const getNavItemBg = () => {
    if (isDarkNav && !scrolled) return 'bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/20';
    return 'bg-white/60 backdrop-blur-md border-gray-100 hover:bg-white/80';
  };

  const getNavItemTextColor = (isActive: boolean) => {
    if (isDarkNav && !scrolled) {
      return isActive ? 'text-[#F20732]' : 'text-gray-300 hover:text-white';
    }
    return isActive ? 'text-[#F20732]' : 'text-gray-500 hover:text-black';
  };

  const getStatusTextColor = () => {
    return isDarkNav && !scrolled ? 'text-green-400' : 'text-green-600';
  };

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${getNavBg()} ${scrolled ? 'py-3' : 'py-8'}`}>
      <div className="max-w-[1920px] mx-auto px-6 md:px-12 flex items-center justify-between h-14">
        <div className="flex-shrink-0 flex items-center justify-start z-50 min-w-[200px]">
          <button onClick={handleLogoClick} onMouseEnter={handleLogoHover} className="flex items-center gap-1.5 hover-trigger group">
            <div className="flex items-center gap-1.5">
                <OrbitalLogoAdvanced isAnimating={false} />
                <span className={`font-bold tracking-tight text-2xl hidden md:block ${getTextColor()}`}>MX-IX</span>
            </div>
          </button>
        </div>

        <div className="hidden lg:flex flex-1 items-center justify-center px-4">
           <div className={`flex items-center gap-12 px-12 py-3 rounded-full border shadow-sm transition-all duration-300 hover:shadow-md ${getNavItemBg()}`}>
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setPage(item.id)}
                className={`
                  text-[11px] font-mono font-bold tracking-[0.15em] uppercase transition-all duration-300 hover-trigger relative group
                  ${getNavItemTextColor(currentPage === item.id)}
                `}
              >
                {item.label}
                <span className={`absolute -bottom-1 left-0 w-full h-[2px] bg-[#F20732] transform origin-left transition-transform duration-300 ease-out ${currentPage === item.id ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}></span>
              </button>
            ))}
          </div>
        </div>

        <div className="flex-shrink-0 flex items-center justify-end gap-6 z-50 min-w-[200px]">
          <div className="hidden lg:flex items-center gap-2">
            <div className="relative flex items-center">
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full absolute animate-ping"></div>
            </div>
            <span className={`text-[9px] font-mono font-bold tracking-wider whitespace-nowrap ${getStatusTextColor()}`}>ALL SYSTEMS OPERATIONAL</span>
          </div>
          <button
            onClick={() => setPage('contact')}
            className="hover-trigger bg-[#F20732] text-white px-6 py-3 font-mono text-[10px] font-bold tracking-[0.2em] hover:bg-black transition-colors flex items-center gap-3 group shadow-lg shadow-[#F20732]/20 uppercase"
          >
            Connect <span className="text-sm leading-none mb-0.5 group-hover:translate-x-1 transition-transform">→</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

const Footer = ({ setPage }: { setPage: (p: string) => void }) => (
  <footer className="text-white py-20 relative overflow-hidden bg-black z-10">
    <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
    
    <div className="container mx-auto px-8 relative z-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:items-start">
        <div className="lg:col-span-5 space-y-6">
          <div className="flex items-center gap-4 mb-4">
            <img src="/assets/logo.png" alt="MX-IX Logo" className="w-16 h-16 object-contain" />
            <h2 className="text-6xl md:text-8xl font-black tracking-tighter text-white leading-none">MX-IX</h2>
          </div>
          <p className="font-mono max-w-sm text-gray-300 font-bold text-lg leading-tight">Redefining the physical layer of the internet.</p>
        </div>

        <div className="lg:col-span-3 pt-2">
           <h4 className="font-bold mb-6 uppercase tracking-widest text-xs text-gray-400 border-b border-gray-700 pb-2 inline-block min-w-[100px]">Company</h4>
           <ul className="space-y-3 font-mono text-sm text-white font-medium">
              <li>
                <button onClick={() => setPage('about')} className="hover:text-[#F20732] transition-colors hover-trigger flex items-center group">
                  About Us <span className="opacity-0 group-hover:opacity-100 transition-opacity ml-2">→</span>
                </button>
              </li>
              <li>
                <button onClick={() => setPage('contact')} className="hover:text-[#F20732] transition-colors hover-trigger flex items-center group">
                  Contact <span className="opacity-0 group-hover:opacity-100 transition-opacity ml-2">→</span>
                </button>
              </li>
              <li>
                <button onClick={() => setPage('services')} className="hover:text-[#F20732] transition-colors hover-trigger flex items-center group">
                  Services <span className="opacity-0 group-hover:opacity-100 transition-opacity ml-2">→</span>
                </button>
              </li>
           </ul>
        </div>
        
        <div className="lg:col-span-4 flex flex-col lg:items-end justify-between h-full space-y-8 lg:text-right pt-2">
           <div className="w-16 h-16 bg-black flex items-center justify-center lg:self-end"><span className="text-white font-bold text-xl">MX</span></div>
           
           <div className="space-y-4">
              <div>
                <p className="font-mono text-xs text-gray-400 font-bold mb-1 uppercase tracking-widest">Global HQ</p>
                <p className="font-mono text-xs text-gray-300">100 Cybernetics Way<br/>Floor 42, Server Block A<br/>New York, NY 10012</p>
              </div>
               <span className="block font-mono text-[10px] text-gray-500 uppercase tracking-widest pt-4">© 2025 MX-IX INFRASTRUCTURE<br/>ALL RIGHTS RESERVED</span>
            </div>
         </div>
      </div>
      
      {/* System Version Indicator */}
      <div className="max-w-[1920px] mx-auto px-8 pb-6">
        <div className="flex justify-end items-center gap-3 pt-6 border-t border-gray-800">
          <div className="w-2 h-2 rounded-full bg-[#F20732] animate-pulse"></div>
          <span className="font-mono text-xs font-bold tracking-[0.2em] text-[#F20732] uppercase">System Optimal // v4.2</span>
        </div>
      </div>
    </div>
  </footer>
);

function App() {
  const [page, setPage] = useState('home');
  const [appData, setAppData] = useState<AppData>(INITIAL_DATA);
  const [selectedCity, setSelectedCity] = useState<string>('');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);

  useEffect(() => {
    const handleNavigateToContact = (e: CustomEvent) => {
      const { city } = e.detail;
      setSelectedCity(city);
      setPage('contact');
    };
    
    window.addEventListener('navigateToContact' as any, handleNavigateToContact);
    return () => window.removeEventListener('navigateToContact' as any, handleNavigateToContact);
  }, []);

  const renderPage = () => {
    switch(page) {
      case 'home':
        return (
          <>
          <section className="relative min-h-screen pt-24 md:pt-20 flex flex-col border-b border-gray-200 bg-white z-10 overflow-hidden">
            <div className="absolute inset-0 z-0 pointer-events-none">
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] bg-[size:64px_64px]"></div>
            </div>

            <div className="flex-1 w-full max-w-[1920px] mx-auto px-6 md:px-12 relative z-10 py-12 lg:py-0">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 h-full items-center">
                {/* Left side - Content */}
                <div className="max-w-2xl">
                  {/* System Status Indicator */}
                  <div className="flex items-center gap-2 mb-6">
                    {/* <div className="w-2 h-2 rounded-full bg-[#00FF00] animate-pulse"></div> */}
                    {/* <span className="font-mono text-[10px] font-bold tracking-[0.2em] text-gray-400 uppercase">System Optimal // v4.2</span> */}
                  </div>

                  <h1 className="text-6xl md:text-7xl lg:text-8xl font-black leading-[0.9] tracking-tighter mb-8 text-black">
                    INFRA<br />
                    <span className="text-[#F20732]">STRUCTURE</span><br />
                    <span className="text-transparent" style={{
                      WebkitTextStroke: '2px #000'
                    }}>EVOLVED</span>
                  </h1>

                  <p className="max-w-xl text-gray-500 text-base md:text-lg leading-relaxed mb-12 font-light border-l-2 border-gray-100 pl-6">
                    The world's first AI-governed Internet Exchange. We've eliminated the concept of "reactive" routing by integrating predictive models directly into the switching fabric.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4 mb-16 lg:mb-0">
                    <button className="bg-black text-white px-8 py-5 font-mono text-xs font-bold uppercase tracking-widest hover:bg-[#F20732] transition-all duration-300 hover-trigger flex items-center justify-center gap-3 group shadow-lg shadow-black/10">
                      Initialize Peering
                      <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </button>
                    <button className="bg-white border border-gray-200 text-black px-8 py-5 font-mono text-xs font-bold uppercase tracking-widest hover:border-black hover:bg-gray-50 transition-all duration-300 hover-trigger">
                      View Topology
                    </button>
                  </div>
                </div>

                {/* Right side - Network Map Visualization */}
                <div className="hidden lg:block h-[500px] xl:h-[600px] relative">
                  <HeroNetworkMap />
                </div>
              </div>
            </div>

            <div className="w-full border-t border-gray-200 bg-white/80 backdrop-blur-md relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-200 max-w-[1920px] mx-auto">
                <div className="p-8 lg:p-12 flex flex-col justify-center group hover:bg-gray-50 transition-colors hover-trigger relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1 bg-[#F20732] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
                  <div className="flex justify-between items-end mb-3">
                    <span className="font-mono text-xs text-gray-400 uppercase tracking-widest group-hover:text-black transition-colors">Global Latency</span>
                    <span className="font-mono text-[10px] text-[#F20732] border border-[#F20732]/20 bg-[#F20732]/5 px-1.5 py-0.5 rounded">AVG</span>
                  </div>
                  <div className="text-5xl lg:text-6xl font-light tracking-tighter text-black flex items-baseline">
                    <span>{appData.latency}</span>
                    <span className="text-xl ml-2 text-gray-400 font-bold group-hover:text-[#F20732] transition-colors">ms</span>
                  </div>
                </div>

                <div className="p-8 lg:p-12 flex flex-col justify-center group hover:bg-gray-50 transition-colors hover-trigger relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1 bg-[#F20732] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 delay-75"></div>
                  <div className="flex justify-between items-end mb-3">
                    <span className="font-mono text-xs text-gray-400 uppercase tracking-widest group-hover:text-black transition-colors">Active Nodes</span>
                    <div className="flex gap-1">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-ping"></div>
                    </div>
                  </div>
                  <div className="text-5xl lg:text-6xl font-light tracking-tighter text-black">
                    <span>{appData.peers.toLocaleString()}</span>
                  </div>
                </div>

                <div className="p-8 lg:p-12 flex flex-col justify-center group hover:bg-gray-50 transition-colors hover-trigger relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1 bg-[#F20732] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 delay-150"></div>
                  <div className="flex justify-between items-end mb-3">
                    <span className="font-mono text-xs text-gray-400 uppercase tracking-widest group-hover:text-black transition-colors">Throughput</span>
                    <svg className="w-4 h-4 text-gray-300 group-hover:text-[#F20732] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
                  </div>
                  <div className="text-5xl lg:text-6xl font-light tracking-tighter text-black flex items-baseline">
                    {appData.capacity}<span className="text-xl ml-2 text-gray-400 font-bold group-hover:text-[#F20732] transition-colors">Tbps</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <RealTimeCapacity />
          <GlobalFabric />
          </>
        );
      case 'about':
        return (
          <>
            <AboutPage />
          </>
        );
      case 'services':
        return <ServicesPage />;
      case 'locations':
        return <LocationsPage />;
      case 'stats':
        return <StatsPage />;
      case 'contact':
        return <ContactPage preSelectedCity={selectedCity} />;
      case 'admin':
        return <AdminPanel data={appData} onUpdate={setAppData} />;
      default:
        return (
          <section className="relative min-h-screen pt-24 md:pt-20 flex flex-col border-b border-gray-200 bg-white z-10 overflow-hidden">
            <div className="flex-1 w-full max-w-[1920px] mx-auto px-6 md:px-12 flex flex-col justify-center relative z-10 py-12">
              <h1 className="text-6xl font-black text-black">Page Not Found</h1>
            </div>
          </section>
        );
    }
  };

  return (
    <div className="scroll-smooth bg-gray-50 text-black selection:bg-[#F20732] selection:text-white min-h-screen">
      
      <div className="fixed inset-0 z-0 opacity-20 pointer-events-none bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gray-200 via-transparent to-transparent"></div>
      
      <Navigation currentPage={page} setPage={setPage} />
      
      <main className="relative z-10 min-h-screen">
        {renderPage()}
      </main>
      
      <Footer setPage={setPage} />
    </div>
  );
}

export default App;

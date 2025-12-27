import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Types
export interface NetworkStats {
  globalLatency: { value: number; unit: string };
  activeNodes: number;
  throughput: number;
}

export interface GlobalFabricStats {
  totalCapacity: string;
  activeRoutes: string;
  avgLatency: string;
  globalCoverage: string;
}

export interface ServiceItem {
  name: string;
  icon: any;
  description: string;
  benefits: string[];
  features: string[];
  stats?: Array<{ label: string; value: string; period: string }>;
}

export interface Service {
  id: string;
  category: string;
  tagline: string;
  description: string;
  image: string;
  items: ServiceItem[];
}

export interface Location {
  id: string;
  name: string;
  coordinates: [number, number];
  code: string;
  region: string;
  asns: number;
  sites: number;
}

interface AdminContextType {
  networkStats: NetworkStats;
  globalFabricStats: GlobalFabricStats;
  services: Service[];
  locations: Location[];
  updateNetworkStats: (stats: NetworkStats) => void;
  updateGlobalFabricStats: (stats: GlobalFabricStats) => void;
  updateServices: (services: Service[]) => void;
  addService: (service: Service) => void;
  removeService: (serviceId: string) => void;
  updateService: (serviceId: string, service: Service) => void;
  updateLocations: (locations: Location[]) => void;
  addLocation: (location: Location) => void;
  removeLocation: (locationId: string) => void;
  updateLocation: (locationId: string, location: Location) => void;
  resetToDefaults: () => void;
}

// Default values
const defaultNetworkStats: NetworkStats = {
  globalLatency: { value: 0.4, unit: 'ms' },
  activeNodes: 4921,
  throughput: 124
};

const defaultGlobalFabricStats: GlobalFabricStats = {
  totalCapacity: '5.2 Tbps',
  activeRoutes: '10,000+',
  avgLatency: '<5ms',
  globalCoverage: '100%'
};

const defaultLocations: Location[] = [
  { id: 'nyc', name: 'New York', coordinates: [-74.006, 40.7128], code: 'NYC_CORE', region: 'AMERICAS', asns: 41, sites: 1 },
  { id: 'sfo', name: 'San Francisco', coordinates: [-122.4194, 37.7749], code: 'SFO_GATE', region: 'AMERICAS', asns: 28, sites: 1 },
  { id: 'ams', name: 'Amsterdam', coordinates: [4.9041, 52.3676], code: 'AMS_IX', region: 'EUROPE', asns: 89, sites: 2 },
  { id: 'lon', name: 'London', coordinates: [-0.1276, 51.5072], code: 'LON_X', region: 'EUROPE', asns: 76, sites: 2 },
  { id: 'frk', name: 'Frankfurt', coordinates: [8.6821, 50.1109], code: 'FRA_HUB', region: 'EUROPE', asns: 94, sites: 2 },
  { id: 'bom', name: 'Mumbai', coordinates: [72.8777, 19.076], code: 'BOM_WEST', region: 'ASIA', asns: 34, sites: 1 },
  { id: 'sgp', name: 'Singapore', coordinates: [103.8198, 1.3521], code: 'SIN_NODE', region: 'ASIA', asns: 67, sites: 2 },
  { id: 'tyo', name: 'Tokyo', coordinates: [139.6917, 35.6895], code: 'TYO_CNTR', region: 'ASIA', asns: 52, sites: 1 },
  { id: 'sao', name: 'São Paulo', coordinates: [-46.6333, -23.5505], code: 'GRU_SOUTH', region: 'AMERICAS', asns: 31, sites: 1 },
  { id: 'syd', name: 'Sydney', coordinates: [151.2093, -33.8688], code: 'SYD_EAST', region: 'OCEANIA', asns: 29, sites: 1 }
];

const defaultServices: Service[] = [];

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [networkStats, setNetworkStats] = useState<NetworkStats>(() => {
    const saved = localStorage.getItem('mx-ix-network-stats');
    return saved ? JSON.parse(saved) : defaultNetworkStats;
  });

  const [globalFabricStats, setGlobalFabricStats] = useState<GlobalFabricStats>(() => {
    const saved = localStorage.getItem('mx-ix-global-fabric-stats');
    return saved ? JSON.parse(saved) : defaultGlobalFabricStats;
  });

  const [services, setServices] = useState<Service[]>(() => {
    const saved = localStorage.getItem('mx-ix-services');
    return saved ? JSON.parse(saved) : defaultServices;
  });

  const [locations, setLocations] = useState<Location[]>(() => {
    const saved = localStorage.getItem('mx-ix-locations');
    return saved ? JSON.parse(saved) : defaultLocations;
  });

  // Persist to localStorage
  useEffect(() => {
    localStorage.setItem('mx-ix-network-stats', JSON.stringify(networkStats));
  }, [networkStats]);

  useEffect(() => {
    localStorage.setItem('mx-ix-global-fabric-stats', JSON.stringify(globalFabricStats));
  }, [globalFabricStats]);

  useEffect(() => {
    localStorage.setItem('mx-ix-services', JSON.stringify(services));
  }, [services]);

  useEffect(() => {
    localStorage.setItem('mx-ix-locations', JSON.stringify(locations));
  }, [locations]);

  const updateNetworkStats = (stats: NetworkStats) => setNetworkStats(stats);
  const updateGlobalFabricStats = (stats: GlobalFabricStats) => setGlobalFabricStats(stats);
  const updateServices = (newServices: Service[]) => setServices(newServices);
  
  const addService = (service: Service) => setServices(prev => [...prev, service]);
  const removeService = (serviceId: string) => setServices(prev => prev.filter(s => s.id !== serviceId));
  const updateService = (serviceId: string, service: Service) => {
    setServices(prev => prev.map(s => s.id === serviceId ? service : s));
  };

  const updateLocations = (newLocations: Location[]) => setLocations(newLocations);
  const addLocation = (location: Location) => setLocations(prev => [...prev, location]);
  const removeLocation = (locationId: string) => setLocations(prev => prev.filter(l => l.id !== locationId));
  const updateLocation = (locationId: string, location: Location) => {
    setLocations(prev => prev.map(l => l.id === locationId ? location : l));
  };

  const resetToDefaults = () => {
    setNetworkStats(defaultNetworkStats);
    setGlobalFabricStats(defaultGlobalFabricStats);
    setServices(defaultServices);
    setLocations(defaultLocations);
    localStorage.removeItem('mx-ix-network-stats');
    localStorage.removeItem('mx-ix-global-fabric-stats');
    localStorage.removeItem('mx-ix-services');
    localStorage.removeItem('mx-ix-locations');
  };

  return (
    <AdminContext.Provider
      value={{
        networkStats,
        globalFabricStats,
        services,
        locations,
        updateNetworkStats,
        updateGlobalFabricStats,
        updateServices,
        addService,
        removeService,
        updateService,
        updateLocations,
        addLocation,
        removeLocation,
        updateLocation,
        resetToDefaults
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within AdminProvider');
  }
  return context;
};

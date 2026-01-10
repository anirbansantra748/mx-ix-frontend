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

export interface ASN {
  asnNumber: number;
  name: string;
  macro: string;
  peeringPolicy: 'Open' | 'Selective' | 'Restrictive' | 'No Policy';
  status: 'ACTIVE' | 'CONNECTING' | 'INACTIVE';
}

export interface EnabledSite {
  id: string;
  name: string;
  provider: string;
  address: string;
  status: 'available' | 'coming-soon';
}

export interface Location {
  id: string;
  name: string;
  coordinates: [number, number];
  code: string;
  region: string;
  asns: number;
  sites: number;
  asnList: ASN[];
  enabledSites: EnabledSite[];
  status: 'current' | 'upcoming';
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
  // Current (Live) Locations - India
  { id: 'del', name: 'New Delhi', coordinates: [77.2090, 28.6139], code: 'DEL_NORTH', region: 'ASIA', asns: 32, sites: 5, status: 'current',
    asnList: [
      { asnNumber: 9498, name: 'Bharti Airtel Ltd.', macro: '', peeringPolicy: 'Selective', status: 'ACTIVE' },
      { asnNumber: 4755, name: 'Tata Communications Ltd', macro: '', peeringPolicy: 'Open', status: 'ACTIVE' },
      { asnNumber: 45820, name: 'BSNL - Bharat Sanchar Nigam Ltd.', macro: '', peeringPolicy: 'Open', status: 'ACTIVE' },
      { asnNumber: 17488, name: 'Hathway Cable and Datacom Ltd.', macro: '', peeringPolicy: 'Open', status: 'CONNECTING' },
      { asnNumber: 55836, name: 'Reliance Jio Infocomm Limited', macro: '', peeringPolicy: 'Selective', status: 'ACTIVE' }
    ],
    enabledSites: [
      { id: 'del-1', name: 'NTT Delhi DC', provider: 'NTT', address: 'Sector 142, Noida, Uttar Pradesh 201304', status: 'available' },
      { id: 'del-2', name: 'STT Delhi 1', provider: 'STT GDC', address: 'Mahipalpur Extension, New Delhi 110037', status: 'available' },
      { id: 'del-3', name: 'CtrlS Noida', provider: 'CtrlS', address: 'Knowledge Park III, Greater Noida 201306', status: 'available' },
      { id: 'del-4', name: 'Netmagic Delhi DC', provider: 'Netmagic', address: 'Sector 62, Noida, UP 201309', status: 'available' },
      { id: 'del-5', name: 'Yotta Noida', provider: 'Yotta', address: 'Greater Noida, UP 201306', status: 'coming-soon' }
    ]
  },
  { id: 'bom', name: 'Mumbai', coordinates: [72.8777, 19.076], code: 'BOM_WEST', region: 'ASIA', asns: 34, sites: 3, status: 'current',
    asnList: [
      { asnNumber: 9498, name: 'Bharti Airtel Ltd.', macro: '', peeringPolicy: 'Selective', status: 'ACTIVE' },
      { asnNumber: 45609, name: 'Tata Teleservices (Maharashtra) Limited', macro: '', peeringPolicy: 'Open', status: 'ACTIVE' },
      { asnNumber: 55410, name: 'Vodafone Idea Limited', macro: '', peeringPolicy: 'Restrictive', status: 'CONNECTING' }
    ],
    enabledSites: [
      { id: 'bom-1', name: 'GPX Mumbai 1', provider: 'GPX', address: 'Powai, Mumbai 400076', status: 'available' },
      { id: 'bom-2', name: 'Netmagic DC2', provider: 'Netmagic', address: 'Airoli, Navi Mumbai 400708', status: 'available' },
      { id: 'bom-3', name: 'STT Mumbai', provider: 'STT GDC', address: 'Navi Mumbai, Maharashtra 400709', status: 'coming-soon' }
    ]
  },
  { id: 'maa', name: 'Chennai', coordinates: [80.2707, 13.0827], code: 'MAA_SOUTH', region: 'ASIA', asns: 28, sites: 4, status: 'current',
    asnList: [
      { asnNumber: 9498, name: 'Bharti Airtel Ltd.', macro: '', peeringPolicy: 'Selective', status: 'ACTIVE' },
      { asnNumber: 4755, name: 'Tata Communications Ltd', macro: '', peeringPolicy: 'Open', status: 'ACTIVE' },
      { asnNumber: 55410, name: 'Vodafone Idea Limited', macro: '', peeringPolicy: 'Restrictive', status: 'CONNECTING' },
      { asnNumber: 45820, name: 'BSNL - Bharat Sanchar Nigam Ltd.', macro: '', peeringPolicy: 'Open', status: 'ACTIVE' },
      { asnNumber: 17747, name: 'SIFY Technologies Ltd.', macro: '', peeringPolicy: 'Open', status: 'CONNECTING' }
    ],
    enabledSites: [
      { id: 'maa-1', name: 'STT Chennai 1', provider: 'STT GDC', address: 'Ambattur Industrial Estate, Chennai 600058', status: 'available' },
      { id: 'maa-2', name: 'NTT Chennai DC', provider: 'NTT', address: 'SIPCOT IT Park, Siruseri, Chennai 603103', status: 'available' },
      { id: 'maa-3', name: 'CtrlS Chennai', provider: 'CtrlS', address: 'Sholinganallur, Chennai 600119', status: 'available' },
      { id: 'maa-4', name: 'Sify Navallur DC', provider: 'Sify', address: 'Navallur, Chennai 600130', status: 'coming-soon' }
    ]
  },
  { id: 'ccu', name: 'Kolkata', coordinates: [88.3639, 22.5726], code: 'CCU_EAST', region: 'ASIA', asns: 18, sites: 3, status: 'current',
    asnList: [
      { asnNumber: 9498, name: 'Bharti Airtel Ltd.', macro: '', peeringPolicy: 'Selective', status: 'ACTIVE' },
      { asnNumber: 4755, name: 'Tata Communications Ltd', macro: '', peeringPolicy: 'Open', status: 'ACTIVE' },
      { asnNumber: 45820, name: 'BSNL - Bharat Sanchar Nigam Ltd.', macro: '', peeringPolicy: 'Open', status: 'ACTIVE' }
    ],
    enabledSites: [
      { id: 'ccu-1', name: 'CtrlS Kolkata', provider: 'CtrlS', address: 'Sector V, Salt Lake City, Kolkata 700091', status: 'available' },
      { id: 'ccu-2', name: 'Sify Kolkata DC', provider: 'Sify', address: 'Rajarhat, Kolkata 700156', status: 'available' },
      { id: 'ccu-3', name: 'GPX Kolkata', provider: 'GPX', address: 'Newtown, Kolkata 700135', status: 'coming-soon' }
    ]
  },
  { id: 'hyd', name: 'Hyderabad', coordinates: [78.4867, 17.3850], code: 'HYD_CENTRAL', region: 'ASIA', asns: 22, sites: 4, status: 'current',
    asnList: [
      { asnNumber: 9498, name: 'Bharti Airtel Ltd.', macro: '', peeringPolicy: 'Selective', status: 'ACTIVE' },
      { asnNumber: 4755, name: 'Tata Communications Ltd', macro: '', peeringPolicy: 'Open', status: 'ACTIVE' },
      { asnNumber: 55836, name: 'Reliance Jio Infocomm Limited', macro: '', peeringPolicy: 'Selective', status: 'ACTIVE' },
      { asnNumber: 45820, name: 'BSNL - Bharat Sanchar Nigam Ltd.', macro: '', peeringPolicy: 'Open', status: 'CONNECTING' }
    ],
    enabledSites: [
      { id: 'hyd-1', name: 'Yotta Hyderabad', provider: 'Yotta', address: 'HITEC City, Hyderabad 500081', status: 'available' },
      { id: 'hyd-2', name: 'CtrlS Hyderabad', provider: 'CtrlS', address: 'Nanakramguda, Hyderabad 500032', status: 'available' },
      { id: 'hyd-3', name: 'NTT Hyderabad DC', provider: 'NTT', address: 'Gachibowli, Hyderabad 500032', status: 'available' },
      { id: 'hyd-4', name: 'Amazon Hyderabad', provider: 'AWS', address: 'Kondapur, Hyderabad 500084', status: 'coming-soon' }
    ]
  },
  { id: 'blr', name: 'Bangalore', coordinates: [77.5946, 12.9716], code: 'BLR_SOUTH', region: 'ASIA', asns: 35, sites: 5, status: 'current',
    asnList: [
      { asnNumber: 9498, name: 'Bharti Airtel Ltd.', macro: '', peeringPolicy: 'Selective', status: 'ACTIVE' },
      { asnNumber: 4755, name: 'Tata Communications Ltd', macro: '', peeringPolicy: 'Open', status: 'ACTIVE' },
      { asnNumber: 55836, name: 'Reliance Jio Infocomm Limited', macro: '', peeringPolicy: 'Selective', status: 'ACTIVE' },
      { asnNumber: 17747, name: 'SIFY Technologies Ltd.', macro: '', peeringPolicy: 'Open', status: 'ACTIVE' },
      { asnNumber: 45820, name: 'BSNL - Bharat Sanchar Nigam Ltd.', macro: '', peeringPolicy: 'Open', status: 'CONNECTING' }
    ],
    enabledSites: [
      { id: 'blr-1', name: 'NTT Bangalore DC', provider: 'NTT', address: 'Electronic City, Bangalore 560100', status: 'available' },
      { id: 'blr-2', name: 'CtrlS Bangalore', provider: 'CtrlS', address: 'Whitefield, Bangalore 560066', status: 'available' },
      { id: 'blr-3', name: 'STT Bangalore', provider: 'STT GDC', address: 'Marathahalli, Bangalore 560037', status: 'available' },
      { id: 'blr-4', name: 'Equinix MB1', provider: 'Equinix', address: 'Mahadevapura, Bangalore 560048', status: 'available' },
      { id: 'blr-5', name: 'Microsoft Bangalore', provider: 'Azure', address: 'Bellandur, Bangalore 560103', status: 'coming-soon' }
    ]
  },
  // Current (Live) Location - Middle East
  { id: 'dxb', name: 'Dubai', coordinates: [55.2708, 25.2048], code: 'DXB_GULF', region: 'MIDDLE EAST', asns: 25, sites: 4, status: 'current',
    asnList: [
      { asnNumber: 5384, name: 'Emirates Telecommunications Corporation (Etisalat)', macro: '', peeringPolicy: 'Selective', status: 'ACTIVE' },
      { asnNumber: 8966, name: 'Emirates Integrated Telecommunications Company (du)', macro: '', peeringPolicy: 'Selective', status: 'ACTIVE' },
      { asnNumber: 15802, name: 'Ooredoo Q.S.C.', macro: '', peeringPolicy: 'Open', status: 'CONNECTING' },
      { asnNumber: 35753, name: 'Omantel', macro: '', peeringPolicy: 'Open', status: 'ACTIVE' },
      { asnNumber: 51847, name: 'Gulf Bridge International', macro: '', peeringPolicy: 'Open', status: 'CONNECTING' }
    ],
    enabledSites: [
      { id: 'dxb-1', name: 'Equinix DX1', provider: 'Equinix', address: 'Dubai Silicon Oasis, Dubai, UAE', status: 'available' },
      { id: 'dxb-2', name: 'Khazna Data Center', provider: 'Khazna', address: 'Masdar City, Abu Dhabi, UAE', status: 'available' },
      { id: 'dxb-3', name: 'Gulf Data Hub', provider: 'GDH', address: 'Sheikh Zayed Road, Dubai, UAE', status: 'available' },
      { id: 'dxb-4', name: 'Moro Hub', provider: 'Moro', address: 'DWTC, Dubai, UAE', status: 'coming-soon' }
    ]
  },
  // Upcoming Locations - North America
  { id: 'lax', name: 'Los Angeles', coordinates: [-118.2437, 34.0522], code: 'LAX_WEST', region: 'NORTH AMERICA', asns: 0, sites: 0, status: 'upcoming',
    asnList: [],
    enabledSites: []
  },
  { id: 'sjc', name: 'Silicon Valley', coordinates: [-121.8863, 37.3382], code: 'SJC_VALLEY', region: 'NORTH AMERICA', asns: 0, sites: 0, status: 'upcoming',
    asnList: [],
    enabledSites: []
  },
  // Upcoming Location - Europe
  { id: 'vie', name: 'Vienna', coordinates: [16.3738, 48.2082], code: 'VIE_EU', region: 'EUROPE', asns: 0, sites: 0, status: 'upcoming',
    asnList: [],
    enabledSites: []
  },
  // Upcoming Location - Latin America
  { id: 'qro', name: 'Queretaro', coordinates: [-100.3899, 20.5888], code: 'QRO_MX', region: 'NORTH AMERICA', asns: 0, sites: 0, status: 'upcoming',
    asnList: [],
    enabledSites: []
  },
  { id: 'eze', name: 'Buenos Aires', coordinates: [-58.3816, -34.6037], code: 'EZE_SA', region: 'SOUTH AMERICA', asns: 0, sites: 0, status: 'upcoming',
    asnList: [],
    enabledSites: []
  },
  // Upcoming Location - Middle East
  { id: 'fjr', name: 'Fujairah', coordinates: [56.3414, 25.1288], code: 'FJR_UAE', region: 'MIDDLE EAST', asns: 0, sites: 0, status: 'upcoming',
    asnList: [],
    enabledSites: []
  }
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
    const version = localStorage.getItem('mx-ix-locations-version');
    const currentVersion = '2'; // Increment this when locations data changes significantly
    
    // If version mismatch or no saved data, use defaults
    if (version !== currentVersion || !saved) {
      localStorage.setItem('mx-ix-locations-version', currentVersion);
      localStorage.removeItem('mx-ix-locations');
      return defaultLocations;
    }
    
    try {
      const parsed = JSON.parse(saved);
      // Check if data has required fields (status field for new data)
      if (parsed.length > 0 && parsed[0].status === undefined) {
        localStorage.setItem('mx-ix-locations-version', currentVersion);
        localStorage.removeItem('mx-ix-locations');
        return defaultLocations;
      }
      return parsed;
    } catch {
      return defaultLocations;
    }
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

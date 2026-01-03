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
  { id: 'nyc', name: 'New York', coordinates: [-74.006, 40.7128], code: 'NYC_CORE', region: 'AMERICAS', asns: 41, sites: 7,
    asnList: [
      { asnNumber: 18885, name: 'M2ngage Telecommunications Corp.', macro: '', peeringPolicy: 'Open', status: 'CONNECTING' },
      { asnNumber: 46475, name: 'Limestone Networks, Inc.', macro: '', peeringPolicy: 'Open', status: 'CONNECTING' },
      { asnNumber: 209, name: 'CenturyLink Communications, LLC', macro: '', peeringPolicy: 'Selective', status: 'ACTIVE' },
      { asnNumber: 7018, name: 'AT&T Services, Inc.', macro: '', peeringPolicy: 'Restrictive', status: 'ACTIVE' }
    ],
    enabledSites: [
      { id: 'nyc-1', name: 'CoreSite NY1', provider: 'CoreSite', address: '32 Avenue of the Americas, Manhattan, NYC', status: 'available' },
      { id: 'nyc-2', name: 'CoreSite Secaucus (NY2)', provider: 'CoreSite', address: '2 Emerson Lane, Secaucus, NJ 07094 USA', status: 'available' },
      { id: 'nyc-3', name: 'DataBank NYC1/LGA1', provider: 'DataBank', address: '60 Hudson Street, Manhattan, NYC', status: 'available' },
      { id: 'nyc-4', name: 'DataBank NYC2/LGA2', provider: 'DataBank', address: '111 8th Avenue, Manhattan, NYC', status: 'available' },
      { id: 'nyc-5', name: 'DataVerge Brooklyn', provider: 'DataVerge', address: '882 3rd Avenue Brooklyn, NY, 11232 USA', status: 'available' },
      { id: 'nyc-6', name: 'Digital Realty NY JFK10', provider: 'Digital Realty', address: '111 8th Avenue, Manhattan, NYC', status: 'available' },
      { id: 'nyc-7', name: 'Digital Realty NY JFK12', provider: 'Digital Realty', address: '60 Hudson Street, Manhattan, NYC', status: 'available' }
    ]
  },
  { id: 'ams', name: 'Amsterdam', coordinates: [4.9041, 52.3676], code: 'AMS_IX', region: 'EUROPE', asns: 89, sites: 5,
    asnList: [
      { asnNumber: 1103, name: 'SURF B.V.', macro: '', peeringPolicy: 'Open', status: 'ACTIVE' },
      { asnNumber: 3356, name: 'Lumen Technologies', macro: '', peeringPolicy: 'Selective', status: 'ACTIVE' },
      { asnNumber: 6939, name: 'Hurricane Electric LLC', macro: '', peeringPolicy: 'Open', status: 'ACTIVE' },
      { asnNumber: 8767, name: 'M247 Europe SRL', macro: '', peeringPolicy: 'Open', status: 'CONNECTING' }
    ],
    enabledSites: [
      { id: 'ams-1', name: 'Equinix AM7', provider: 'Equinix', address: 'Kuiperbergweg 87, 1101 AG Amsterdam', status: 'available' },
      { id: 'ams-2', name: 'Digital Realty AMS1', provider: 'Digital Realty', address: 'Radarweg 29, 1043 NX Amsterdam', status: 'available' },
      { id: 'ams-3', name: 'Interxion AMS8', provider: 'Interxion', address: 'Tarnweiweg 10, 1118 DE Schiphol', status: 'available' },
      { id: 'ams-4', name: 'GlobalSwitch Amsterdam', provider: 'GlobalSwitch', address: 'Naritaweg 151, 1043 BW Amsterdam', status: 'available' },
      { id: 'ams-5', name: 'NorthC Aalsmeer', provider: 'NorthC', address: 'Dreef 1, 1431 WK Aalsmeer', status: 'coming-soon' }
    ]
  },
  { id: 'frk', name: 'Frankfurt', coordinates: [8.6821, 50.1109], code: 'FRA_HUB', region: 'EUROPE', asns: 94, sites: 5,
    asnList: [
      { asnNumber: 3320, name: 'Deutsche Telekom AG', macro: '', peeringPolicy: 'Selective', status: 'ACTIVE' },
      { asnNumber: 8422, name: 'NetCologne GmbH', macro: '', peeringPolicy: 'Open', status: 'ACTIVE' },
      { asnNumber: 20940, name: 'Akamai International B.V.', macro: '', peeringPolicy: 'Selective', status: 'ACTIVE' }
    ],
    enabledSites: [
      { id: 'frk-1', name: 'Interxion FRA1', provider: 'Interxion', address: 'Hanauer Landstraße 302, 60314 Frankfurt', status: 'available' },
      { id: 'frk-2', name: 'Equinix FR5', provider: 'Equinix', address: 'Lärchenstraße 110, 65933 Frankfurt', status: 'available' },
      { id: 'frk-3', name: 'Digital Realty FRA1', provider: 'Digital Realty', address: 'Lyoner Straße 28, 60528 Frankfurt', status: 'available' },
      { id: 'frk-4', name: 'NTT Frankfurt 1', provider: 'NTT', address: 'Mainzer Landstraße 250, 60326 Frankfurt', status: 'available' },
      { id: 'frk-5', name: 'e-shelter Frankfurt', provider: 'e-shelter', address: 'Carl-Benz-Str. 11, 60386 Frankfurt', status: 'coming-soon' }
    ]
  },
  { id: 'bom', name: 'Mumbai', coordinates: [72.8777, 19.076], code: 'BOM_WEST', region: 'ASIA', asns: 34, sites: 3,
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
  { id: 'sin', name: 'Singapore', coordinates: [103.8198, 1.3521], code: 'SIN_NODE', region: 'ASIA', asns: 67, sites: 4,
    asnList: [
      { asnNumber: 3758, name: 'SingNet Pte Ltd', macro: '', peeringPolicy: 'Open', status: 'ACTIVE' },
      { asnNumber: 7473, name: 'Singapore Telecommunications', macro: '', peeringPolicy: 'Selective', status: 'ACTIVE' },
      { asnNumber: 10026, name: 'StarHub Ltd', macro: '', peeringPolicy: 'Open', status: 'ACTIVE' }
    ],
    enabledSites: [
      { id: 'sin-1', name: 'Global Switch Singapore', provider: 'GlobalSwitch', address: '18 Tai Seng Street, Singapore 539775', status: 'available' },
      { id: 'sin-2', name: 'Equinix SG1', provider: 'Equinix', address: '20 Ayer Rajah Crescent, Singapore 139964', status: 'available' },
      { id: 'sin-3', name: 'Digital Realty SIN10', provider: 'Digital Realty', address: '29A International Business Park, Singapore', status: 'available' },
      { id: 'sin-4', name: 'STT Loyang', provider: 'STT GDC', address: 'Loyang Offshore Supply Base, Singapore', status: 'coming-soon' }
    ]
  },
  { id: 'hkg', name: 'Hong Kong', coordinates: [114.1694, 22.3193], code: 'HKG_EAST', region: 'ASIA', asns: 45, sites: 3,
    asnList: [
      { asnNumber: 4637, name: 'PCCW Global', macro: '', peeringPolicy: 'Selective', status: 'ACTIVE' },
      { asnNumber: 9930, name: 'HKBN Enterprise Solutions', macro: '', peeringPolicy: 'Open', status: 'ACTIVE' },
      { asnNumber: 10026, name: 'Pacnet Services', macro: '', peeringPolicy: 'Open', status: 'ACTIVE' }
    ],
    enabledSites: [
      { id: 'hkg-1', name: 'MEGA-i', provider: 'SUNeVision', address: '399 Chai Wan Road, Chai Wan, Hong Kong', status: 'available' },
      { id: 'hkg-2', name: 'Equinix HK1', provider: 'Equinix', address: '17/F, Sha Tin Industrial Centre, Hong Kong', status: 'available' },
      { id: 'hkg-3', name: 'Global Switch Hong Kong', provider: 'GlobalSwitch', address: '18 Chun Yat Street, Tseung Kwan O', status: 'available' }
    ]
  },
  { id: 'tyo', name: 'Tokyo', coordinates: [139.6917, 35.6895], code: 'TYO_CNTR', region: 'ASIA', asns: 52, sites: 3,
    asnList: [
      { asnNumber: 2516, name: 'KDDI CORPORATION', macro: '', peeringPolicy: 'Selective', status: 'ACTIVE' },
      { asnNumber: 4713, name: 'NTT Communications Corporation', macro: '', peeringPolicy: 'Restrictive', status: 'ACTIVE' },
      { asnNumber: 17506, name: 'SOFTBANK CORP.', macro: '', peeringPolicy: 'Selective', status: 'ACTIVE' }
    ],
    enabledSites: [
      { id: 'tyo-1', name: 'Equinix TY11', provider: 'Equinix', address: '3-8-21 Higashi-Shinagawa, Tokyo 140-0002', status: 'available' },
      { id: 'tyo-2', name: 'NTT Tokyo CC2', provider: 'NTT', address: 'Otemachi, Chiyoda-ku, Tokyo', status: 'available' },
      { id: 'tyo-3', name: 'Digital Realty NRT1', provider: 'Digital Realty', address: 'Inzai, Chiba 270-1609', status: 'coming-soon' }
    ]
  },
  { id: 'maa', name: 'Chennai', coordinates: [80.2707, 13.0827], code: 'MAA_SOUTH', region: 'ASIA', asns: 28, sites: 4,
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
      { id: 'maa-4', name: 'Sify Noida DC', provider: 'Sify', address: 'Navallur, Chennai 600130', status: 'coming-soon' }
    ]
  },
  { id: 'del', name: 'Delhi', coordinates: [77.2090, 28.6139], code: 'DEL_NORTH', region: 'ASIA', asns: 32, sites: 5,
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
  { id: 'dxb', name: 'Dubai', coordinates: [55.2708, 25.2048], code: 'DXB_GULF', region: 'MIDDLE EAST', asns: 25, sites: 4,
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

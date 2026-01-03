// MX-IX Network Statistics Configuration
// Update these values when client provides real-time data

export interface NetworkStat {
  id: string;
  label: string;
  value: number | string;
  unit: string;
  trend?: 'up' | 'down' | 'stable';
  trendValue?: string;
  format?: 'number' | 'decimal' | 'percentage';
  category: 'traffic' | 'network' | 'performance' | 'geographic';
}

export interface TrafficDataPoint {
  timestamp: string;
  value: number;
}

export interface LocationStats {
  locationId: string;
  locationName: string;
  locationCode: string;
  stats: NetworkStat[];
  trafficData: TrafficDataPoint[];
}

// Mock data - replace with real API data
export const networkStats: NetworkStat[] = [
  // Traffic Stats
  {
    id: 'total_traffic',
    label: 'Total Traffic',
    value: 124.5,
    unit: 'Tbps',
    trend: 'up',
    trendValue: '+12.3%',
    format: 'decimal',
    category: 'traffic'
  },
  {
    id: 'peak_traffic',
    label: 'Peak Traffic (24h)',
    value: 156.2,
    unit: 'Tbps',
    trend: 'up',
    trendValue: '+8.1%',
    format: 'decimal',
    category: 'traffic'
  },
  {
    id: 'avg_traffic',
    label: 'Average Traffic',
    value: 98.7,
    unit: 'Tbps',
    format: 'decimal',
    category: 'traffic'
  },
  
  // Network Stats
  {
    id: 'total_peers',
    label: 'Connected Networks',
    value: 4921,
    unit: 'Peers',
    trend: 'up',
    trendValue: '+47',
    format: 'number',
    category: 'network'
  },
  {
    id: 'active_ports',
    label: 'Active Ports',
    value: 12847,
    unit: 'Ports',
    trend: 'up',
    trendValue: '+152',
    format: 'number',
    category: 'network'
  },
  {
    id: 'total_capacity',
    label: 'Total Capacity',
    value: 450,
    unit: 'Tbps',
    format: 'number',
    category: 'network'
  },
  {
    id: 'ipv4_prefixes',
    label: 'IPv4 Prefixes',
    value: 892345,
    unit: 'Routes',
    trend: 'stable',
    format: 'number',
    category: 'network'
  },
  {
    id: 'ipv6_prefixes',
    label: 'IPv6 Prefixes',
    value: 145678,
    unit: 'Routes',
    trend: 'up',
    trendValue: '+2.1%',
    format: 'number',
    category: 'network'
  },
  
  // Performance Stats
  {
    id: 'avg_latency',
    label: 'Global Latency',
    value: 0.4,
    unit: 'ms',
    trend: 'down',
    trendValue: '-0.1ms',
    format: 'decimal',
    category: 'performance'
  },
  {
    id: 'uptime',
    label: 'Network Uptime',
    value: 99.99,
    unit: '%',
    trend: 'stable',
    format: 'decimal',
    category: 'performance'
  },
  {
    id: 'packet_loss',
    label: 'Packet Loss',
    value: 0.001,
    unit: '%',
    trend: 'down',
    trendValue: '-0.0002%',
    format: 'decimal',
    category: 'performance'
  },
  
  // Geographic Stats
  {
    id: 'locations',
    label: 'Global Locations',
    value: 6,
    unit: 'Cities',
    format: 'number',
    category: 'geographic'
  },
  {
    id: 'countries',
    label: 'Countries Served',
    value: 45,
    unit: 'Countries',
    format: 'number',
    category: 'geographic'
  },
  {
    id: 'continents',
    label: 'Continents',
    value: 5,
    unit: 'Regions',
    format: 'number',
    category: 'geographic'
  }
];

// Mock traffic data for chart - replace with real API data
export const generateMockTrafficData = (): TrafficDataPoint[] => {
  const data: TrafficDataPoint[] = [];
  const now = new Date();
  
  for (let i = 23; i >= 0; i--) {
    const timestamp =new Date(now.getTime() - i * 60 * 60 * 1000);
    const baseValue = 100;
    const variation = Math.random() * 40 - 20; // ±20 Tbps variation
    
    data.push({
      timestamp: timestamp.toISOString(),
      value: Math.max(80, baseValue + variation)
    });
  }
  
  return data;
};

export const trafficData = generateMockTrafficData();

// Configuration for real-time updates
export const statsConfig = {
  // API endpoint when available - set to null for mock data
  apiEndpoint: null as string | null, // 'https://api.mx-ix.com/stats' when ready
  
  // Update interval in milliseconds
  updateInterval: 30000, // 30 seconds
  
  // WebSocket URL when available  apiEndpoint: null as string | null,
  websocketUrl: null as string | null, // 'wss://api.mx-ix.com/realtime' when ready
  
  // Enable/disable real-time updates
  enableRealTimeUpdates: false, // Set to true when API is ready
  
  // Enable/disable mock data animation
  enableMockAnimation: true // Set to false when using real data
};

// Function to fetch stats from API (placeholder)
export const fetchNetworkStats = async (): Promise<NetworkStat[]> => {
  if (statsConfig.apiEndpoint) {
    try {
      const response = await fetch(statsConfig.apiEndpoint);
      if (!response.ok) throw new Error('Failed to fetch stats');
      return await response.json();
    } catch (error) {
      console.error('Error fetching network stats:', error);
      return networkStats; // Fallback to mock data
    }
  }
  
  // Return mock data with slight variations to simulate real-time
  if (statsConfig.enableMockAnimation) {
    return networkStats.map(stat => ({
      ...stat,
      value: typeof stat.value === 'number' 
        ? stat.value + (Math.random() * 2 - 1) // ±1 variation
        : stat.value
    }));
  }
  
  return networkStats;
};

// Function to format stat values
export const formatStatValue = (stat: NetworkStat): string => {
  if (typeof stat.value === 'string') return stat.value;
  
  switch (stat.format) {
    case 'decimal':
      return stat.value.toFixed(stat.value < 10 ? 1 : 0);
    case 'percentage':
      return stat.value.toFixed(2);
    case 'number':
    default:
      return stat.value >= 1000 
        ? stat.value.toLocaleString()
        : stat.value.toString();
  }
};

// City-specific statistics (mock data for demo)
const cityStatsMultipliers: Record<string, { traffic: number; peers: number; latency: number }> = {
  'nyc': { traffic: 1.2, peers: 1.1, latency: 0.9 },
  'sin': { traffic: 1.0, peers: 0.95, latency: 0.85 }, // Changed sgp to sin to match ID
  'ams': { traffic: 1.5, peers: 1.4, latency: 0.8 },
  'frk': { traffic: 1.6, peers: 1.5, latency: 0.7 },
  'bom': { traffic: 0.8, peers: 0.7, latency: 1.2 },
  'tyo': { traffic: 0.9, peers: 0.85, latency: 1.0 },
  'maa': { traffic: 0.75, peers: 0.65, latency: 1.1 },
  'del': { traffic: 0.85, peers: 0.75, latency: 1.1 },
  'dxb': { traffic: 0.95, peers: 0.8, latency: 1.0 }
};

// Generate city-specific stats
export const getCityStats = (locationId: string, locationName: string, locationCode: string): LocationStats => {
  const multipliers = cityStatsMultipliers[locationId] || { traffic: 1, peers: 1, latency: 1 };
  
  const cityStats: NetworkStat[] = [
    // Traffic Stats
    {
      id: 'total_traffic',
      label: 'Total Traffic',
      value: parseFloat((124.5 * multipliers.traffic).toFixed(1)),
      unit: 'Tbps',
      trend: 'up',
      trendValue: '+12.3%',
      format: 'decimal',
      category: 'traffic'
    },
    {
      id: 'peak_traffic',
      label: 'Peak Traffic (24h)',
      value: parseFloat((156.2 * multipliers.traffic).toFixed(1)),
      unit: 'Tbps',
      trend: 'up',
      trendValue: '+8.1%',
      format: 'decimal',
      category: 'traffic'
    },
    {
      id: 'avg_traffic',
      label: 'Average Traffic',
      value: parseFloat((98.7 * multipliers.traffic).toFixed(1)),
      unit: 'Tbps',
      format: 'decimal',
      category: 'traffic'
    },
    
    // Network Stats
    {
      id: 'total_peers',
      label: 'Connected Networks',
      value: Math.floor(4921 * multipliers.peers),
      unit: 'Peers',
      trend: 'up',
      trendValue: '+47',
      format: 'number',
      category: 'network'
    },
    {
      id: 'active_ports',
      label: 'Active Ports',
      value: Math.floor(12847 * multipliers.peers),
      unit: 'Ports',
      trend: 'up',
      trendValue: '+152',
      format: 'number',
      category: 'network'
    },
    {
      id: 'total_capacity',
      label: 'Total Capacity',
      value: Math.floor(450 * multipliers.traffic),
      unit: 'Tbps',
      format: 'number',
      category: 'network'
    },
    {
      id: 'ipv4_prefixes',
      label: 'IPv4 Prefixes',
      value: Math.floor(892345 * multipliers.peers),
      unit: 'Routes',
      trend: 'stable',
      format: 'number',
      category: 'network'
    },
    {
      id: 'ipv6_prefixes',
      label: 'IPv6 Prefixes',
      value: Math.floor(145678 * multipliers.peers),
      unit: 'Routes',
      trend: 'up',
      trendValue: '+2.1%',
      format: 'number',
      category: 'network'
    },
    
    // Performance Stats
    {
      id: 'avg_latency',
      label: 'Global Latency',
      value: parseFloat((0.4 * multipliers.latency).toFixed(2)),
      unit: 'ms',
      trend: multipliers.latency > 1 ? 'up' : 'down',
      trendValue: multipliers.latency > 1 ? '+0.1ms' : '-0.1ms',
      format: 'decimal',
      category: 'performance'
    },
    {
      id: 'uptime',
      label: 'Network Uptime',
      value: 99.99,
      unit: '%',
      trend: 'stable',
      format: 'decimal',
      category: 'performance'
    },
    {
      id: 'packet_loss',
      label: 'Packet Loss',
      value: parseFloat((0.001 * multipliers.latency).toFixed(4)),
      unit: '%',
      trend: 'down',
      trendValue: '-0.0002%',
      format: 'decimal',
      category: 'performance'
    },
    
    // Geographic Stats (specific to this location)
    {
      id: 'locations',
      label: 'Nearby Locations',
      value: Math.floor(Math.random() * 3) + 2,
      unit: 'Cities',
      format: 'number',
      category: 'geographic'
    },
    {
      id: 'countries',
      label: 'Countries Served',
      value: Math.floor(45 * multipliers.peers),
      unit: 'Countries',
      format: 'number',
      category: 'geographic'
    },
    {
      id: 'continents',
      label: 'Continents',
      value: Math.floor(5 * multipliers.peers * 0.8),
      unit: 'Regions',
      format: 'number',
      category: 'geographic'
    }
  ];

  return {
    locationId,
    locationName,
    locationCode,
    stats: cityStats,
    trafficData: generateCityTrafficData(multipliers.traffic)
  };
};

// Generate city-specific traffic data
const generateCityTrafficData = (multiplier: number): TrafficDataPoint[] => {
  const data: TrafficDataPoint[] = [];
  const now = new Date();
  
  for (let i = 23; i >= 0; i--) {
    const timestamp = new Date(now.getTime() - i * 60 * 60 * 1000);
    const baseValue = 100 * multiplier;
    const variation = Math.random() * 40 - 20; // ±20 Tbps variation
    
    data.push({
      timestamp: timestamp.toISOString(),
      value: Math.max(80 * multiplier, baseValue + variation)
    });
  }
  
  return data;
};


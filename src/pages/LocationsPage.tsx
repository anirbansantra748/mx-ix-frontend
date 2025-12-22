import React, { useState } from 'react';

interface LocationData {
  id: string;
  name: string;
  region: string;
  status: 'active' | 'maintenance' | 'planned';
  latency: string;
  // Enhanced fields
  datacenter?: string;
  address?: string;
  ixName?: string;
  peers?: number;
  portSpeeds?: string[];
  protocols?: string[];
  features?: string[];
}

interface DetailedLocationData extends LocationData {
  datacenter: string;
  address: string;
  ixName: string;
  peers: number;
  portSpeeds: string[];
  protocols: string[];
  features: string[];
  description: string;
  capacity: string;
  established: string;
}

interface LocationsPageProps {
  locations: LocationData[];
}

const LocationsPage: React.FC<LocationsPageProps> = ({ locations }) => {
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [activeRegion, setActiveRegion] = useState<string>('all');

  // Enhanced location data with full details
  const enhancedLocations: DetailedLocationData[] = [
    {
      id: 'ams',
      name: 'AMSTERDAM',
      region: 'Europe',
      status: 'active',
      latency: '0.8ms',
      datacenter: 'EQUINIX AM7',
      address: 'Kuiperbergweg 87, 1101 AG Amsterdam, Netherlands',
      ixName: 'AMS-IX',
      peers: 1250,
      portSpeeds: ['1G', '10G', '40G', '100G', '400G'],
      protocols: ['BGP-4', 'IPv4', 'IPv6', 'MPLS'],
      features: [
        'Direct peering with 1000+ networks',
        'Sub-millisecond latency across EU',
        '24/7 NOC support on-site',
        'Redundant power & cooling',
        'DDoS protection included'
      ],
      description: 'Our flagship European presence at the world-renowned AMS-IX, offering unparalleled connectivity.',
      capacity: '400+ Tbps',
      established: '2019'
    },
    {
      id: 'nyc',
      name: 'NEW YORK',
      region: 'North America',
      status: 'active',
      latency: '1.2ms',
      datacenter: 'TELEHOUSE CHELSEA',
      address: '85 10th Avenue, New York, NY 10011, USA',
      ixName: 'NYIIX',
      peers: 890,
      portSpeeds: ['10G', '40G', '100G', '400G'],
      protocols: ['BGP-4', 'IPv4', 'IPv6', 'SD-WAN'],
      features: [
        'Direct access to major US networks',
        'Cloud on-ramps (AWS, Azure, GCP)',
        'Financial services optimized',
        'Tier 3+ datacenter facility',
        'Real-time traffic analytics'
      ],
      description: 'Strategic North American hub connecting Wall Street to the world.',
      capacity: '300+ Tbps',
      established: '2020'
    },
    {
      id: 'sin',
      name: 'SINGAPORE',
      region: 'Asia Pacific',
      status: 'active',
      latency: '2.1ms',
      datacenter: 'GLOBAL SWITCH',
      address: '18 Tai Seng Street, Singapore 539775',
      ixName: 'SGIX',
      peers: 650,
      portSpeeds: ['10G', '40G', '100G'],
      protocols: ['BGP-4', 'IPv4', 'IPv6', 'MPLS'],
      features: [
        'Asia-Pacific gateway',
        'Low-latency to APAC markets',
        'Carrier-neutral facility',
        'Compliance ready (MAS, PDPA)',
        'Cloud connectivity hub'
      ],
      description: 'Premier APAC location serving the fastest-growing internet markets.',
      capacity: '200+ Tbps',
      established: '2020'
    },
    {
      id: 'frk',
      name: 'FRANKFURT',
      region: 'Europe',
      status: 'active',
      latency: '0.9ms',
      datacenter: 'INTERXION FRA1',
      address: 'Hanauer Landstraße 302, 60314 Frankfurt, Germany',
      ixName: 'DE-CIX',
      peers: 1100,
      portSpeeds: ['10G', '40G', '100G', '400G'],
      protocols: ['BGP-4', 'IPv4', 'IPv6', 'MPLS', 'EVPN'],
      features: [
        'Largest IX in Europe by traffic',
        'Direct connection to DE-CIX',
        'Financial hub connectivity',
        'Enterprise-grade security',
        'Green energy powered'
      ],
      description: 'Connected to the world\'s largest internet exchange by traffic volume.',
      capacity: '350+ Tbps',
      established: '2019'
    },
    {
      id: 'tyo',
      name: 'TOKYO',
      region: 'Asia Pacific',
      status: 'active',
      latency: '1.5ms',
      datacenter: 'EQUINIX TY11',
      address: '3-8-21 Higashi-Shinagawa, Shinagawa-ku, Tokyo 140-0002, Japan',
      ixName: 'JPNAP',
      peers: 520,
      portSpeeds: ['10G', '100G', '400G'],
      protocols: ['BGP-4', 'IPv4', 'IPv6'],
      features: [
        'Japan market gateway',
        'Ultra-low latency trading',
        'Disaster recovery ready',
        'Carrier-dense location',
        'Premium Japanese networks'
      ],
      description: 'Gateway to Japanese enterprise and content networks.',
      capacity: '180+ Tbps',
      established: '2021'
    }
  ];

  // Get unique regions
  const regions = ['all', ...Array.from(new Set(enhancedLocations.map(loc => loc.region)))];

  // Filter locations by region
  const filteredLocations = activeRegion === 'all' 
    ? enhancedLocations 
    : enhancedLocations.filter(loc => loc.region === activeRegion);

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'active': return 'bg-green-500';
      case 'maintenance': return 'bg-yellow-500';
      case 'planned': return 'bg-gray-400';
      default: return 'bg-gray-400';
    }
  };

  const getStatusText = (status: string) => {
    switch(status) {
      case 'active': return 'OPERATIONAL';
      case 'maintenance': return 'MAINTENANCE';
      case 'planned': return 'PLANNED';
      default: return 'UNKNOWN';
    }
  };

  const selectedLocationData = enhancedLocations.find(loc => loc.id === selectedLocation);

  return (
    <section className="relative min-h-screen pt-32 pb-20 bg-white">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] bg-[size:64px_64px]"></div>
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Header */}
        <div className="mb-16">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-2 h-2 rounded-full bg-[#F20732] animate-pulse"></div>
            <span className="font-mono text-xs font-bold tracking-[0.2em] text-[#F20732] uppercase">
              Global Presence
            </span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black leading-tight tracking-tighter mb-6 text-black">
            OUR <span className="text-[#F20732]">LOCATIONS</span>
          </h1>
          
          <p className="max-w-2xl text-gray-500 text-lg leading-relaxed border-l-2 border-gray-100 pl-6">
            Strategic Points of Presence across the globe, ensuring ultra-low latency 
            and maximum uptime for your critical infrastructure.
          </p>
        </div>

        {/* Region Filter */}
        <div className="mb-12">
          <div className="flex flex-wrap gap-3">
            {regions.map((region) => (
              <button
                key={region}
                onClick={() => setActiveRegion(region)}
                className={`px-6 py-3 font-mono text-xs font-bold uppercase tracking-widest transition-all duration-300 hover-trigger ${
                  activeRegion === region
                    ? 'bg-black text-white'
                    : 'bg-white border border-gray-200 text-gray-500 hover:border-black'
                }`}
              >
                {region}
              </button>
            ))}
          </div>
        </div>

        {/* Locations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredLocations.map((location) => (
            <button
              key={location.id}
              onClick={() => setSelectedLocation(selectedLocation === location.id ? null : location.id)}
              className={`group bg-white border p-8 hover:border-black transition-all duration-300 hover:shadow-xl relative overflow-hidden hover-trigger text-left ${
                selectedLocation === location.id ? 'border-[#F20732] shadow-xl' : 'border-gray-200'
              }`}
            >
              {/* Top accent bar */}
              <div className={`absolute top-0 left-0 w-full h-1 bg-[#F20732] transform transition-transform duration-500 origin-left ${
                selectedLocation === location.id ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
              }`}></div>
              
              {/* Region badge */}
              <div className="flex justify-between items-start mb-4">
                <span className="font-mono text-xs text-gray-400 uppercase tracking-widest">
                  {location.region}
                </span>
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${getStatusColor(location.status)}`}></div>
                  <span className="font-mono text-[9px] text-gray-500 uppercase tracking-wider">
                    {getStatusText(location.status)}
                  </span>
                </div>
              </div>

              {/* Location name */}
              <h3 className={`text-2xl font-black tracking-tighter mb-2 transition-colors ${
                selectedLocation === location.id ? 'text-[#F20732]' : 'text-black group-hover:text-[#F20732]'
              }`}>
                {location.name}
              </h3>

              {/* IX Name */}
              <div className="font-mono text-sm text-gray-500 mb-4">
                {location.ixName}
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-4 border-t border-gray-100 pt-4">
                <div>
                  <div className="font-mono text-xs text-gray-400 uppercase tracking-widest mb-1">
                    Peers
                  </div>
                  <div className="text-2xl font-light tracking-tighter text-black">
                    {location.peers?.toLocaleString()}
                  </div>
                </div>
                <div>
                  <div className="font-mono text-xs text-gray-400 uppercase tracking-widest mb-1">
                    Latency
                  </div>
                  <div className="flex items-baseline">
                    <span className="text-2xl font-light tracking-tighter text-black">
                      {location.latency.replace('ms', '')}
                    </span>
                    <span className="text-sm ml-1 text-gray-400 font-bold">ms</span>
                  </div>
                </div>
              </div>

              {/* Click indicator */}
              <div className="mt-4 flex items-center justify-end gap-2">
                <span className="font-mono text-[10px] text-[#F20732] font-bold uppercase">
                  {selectedLocation === location.id ? 'Hide Details' : 'View Details'}
                </span>
                <svg 
                  className={`w-4 h-4 text-[#F20732] transform transition-transform duration-300 ${
                    selectedLocation === location.id ? 'rotate-180' : ''
                  }`}
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>

              {/* Hover effect overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#F20732]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            </button>
          ))}
        </div>

        {/* Detailed Information Panel */}
        {selectedLocationData && (
          <div className="bg-white border-2 border-[#F20732] p-8 md:p-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-start justify-between mb-8">
              <div>
                <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-black mb-2">
                  {selectedLocationData.name}
                </h2>
                <p className="text-xl text-[#F20732] font-bold mb-4">
                  {selectedLocationData.ixName}
                </p>
                <p className="text-gray-600 max-w-3xl leading-relaxed">
                  {selectedLocationData.description}
                </p>
              </div>
              <button
                onClick={() => setSelectedLocation(null)}
                className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-gray-100 hover:bg-black hover:text-white transition-colors group"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {/* Datacenter Info */}
              <div className="bg-gray-50 p-6 border border-gray-200">
                <div className="font-mono text-xs text-[#F20732] uppercase tracking-widest mb-3">
                  Datacenter
                </div>
                <div className="font-bold text-lg mb-2">{selectedLocationData.datacenter}</div>
                <div className="text-sm text-gray-600">{selectedLocationData.address}</div>
              </div>

              {/* Capacity */}
              <div className="bg-gray-50 p-6 border border-gray-200">
                <div className="font-mono text-xs text-[#F20732] uppercase tracking-widest mb-3">
                  Total Capacity
                </div>
                <div className="text-3xl font-light tracking-tighter text-black">
                  {selectedLocationData.capacity}
                </div>
                <div className="text-sm text-gray-600 mt-2">
                  Est. {selectedLocationData.established}
                </div>
              </div>

              {/* Peering Stats */}
              <div className="bg-gray-50 p-6 border border-gray-200">
                <div className="font-mono text-xs text-[#F20732] uppercase tracking-widest mb-3">
                  Connected Networks
                </div>
                <div className="text-3xl font-light tracking-tighter text-black">
                  {selectedLocationData.peers.toLocaleString()}
                </div>
                <div className="text-sm text-gray-600 mt-2">
                  Active Peers
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* Port Speeds */}
              <div>
                <h3 className="text-xl font-black text-black mb-6 flex items-center gap-3">
                  <div className="w-1 h-6 bg-[#F20732]"></div>
                  Available Port Speeds
                </h3>
                <div className="flex flex-wrap gap-3">
                  {selectedLocationData.portSpeeds.map((speed) => (
                    <div
                      key={speed}
                      className="bg-black text-white px-4 py-2 font-mono text-sm font-bold"
                    >
                      {speed}
                    </div>
                  ))}
                </div>
              </div>

              {/* Protocols */}
              <div>
                <h3 className="text-xl font-black text-black mb-6 flex items-center gap-3">
                  <div className="w-1 h-6 bg-black"></div>
                  Supported Protocols
                </h3>
                <div className="flex flex-wrap gap-3">
                  {selectedLocationData.protocols.map((protocol) => (
                    <div
                      key={protocol}
                      className="bg-gray-100 border border-gray-300 text-black px-4 py-2 font-mono text-sm"
                    >
                      {protocol}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Key Features */}
            <div className="mt-12 pt-12 border-t border-gray-200">
              <h3 className="text-2xl font-black text-black mb-6">Key Features</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {selectedLocationData.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-[#F20732] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                    </svg>
                    <span className="text-gray-700 leading-relaxed">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="mt-12 flex gap-4">
              <button className="bg-[#F20732] text-white px-8 py-4 font-mono text-xs font-bold uppercase tracking-widest hover:bg-black transition-all duration-300 flex items-center gap-3 group">
                Request Port
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </button>
              <button className="bg-white border-2 border-black text-black px-8 py-4 font-mono text-xs font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-all duration-300">
                Download Specs
              </button>
            </div>
          </div>
        )}

        {/* Statistics section */}
        <div className="mt-20 border-t border-gray-200 pt-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center p-8 bg-gray-50 hover:bg-white border border-transparent hover:border-gray-200 transition-all duration-300">
              <div className="text-5xl font-light tracking-tighter text-black mb-2">
                {enhancedLocations.length}
              </div>
              <div className="font-mono text-xs text-gray-400 uppercase tracking-widest">
                Active PoPs
              </div>
            </div>
            
            <div className="text-center p-8 bg-gray-50 hover:bg-white border border-transparent hover:border-gray-200 transition-all duration-300">
              <div className="text-5xl font-light tracking-tighter text-black mb-2">
                {enhancedLocations.reduce((sum, loc) => sum + loc.peers, 0).toLocaleString()}
              </div>
              <div className="font-mono text-xs text-gray-400 uppercase tracking-widest">
                Total Peers
              </div>
            </div>

            <div className="text-center p-8 bg-gray-50 hover:bg-white border border-transparent hover:border-gray-200 transition-all duration-300">
              <div className="text-5xl font-light tracking-tighter text-black mb-2">
                99.99%
              </div>
              <div className="font-mono text-xs text-gray-400 uppercase tracking-widest">
                Uptime SLA
              </div>
            </div>
            
            <div className="text-center p-8 bg-gray-50 hover:bg-white border border-transparent hover:border-gray-200 transition-all duration-300">
              <div className="text-5xl font-light tracking-tighter text-black mb-2">
                24/7
              </div>
              <div className="font-mono text-xs text-gray-400 uppercase tracking-widest">
                Support
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocationsPage;

import React, { useState, useEffect } from 'react';

interface LocationData {
  id: string;
  name: string;
  country: string;
  region: string;
  status: 'active' | 'maintenance' | 'planned';
  latency: string;
  datacenter: string;
  address: string;
  ixName: string;
  peers: number;
  capacity: string;
  portSpeeds: string[];
  protocols: string[];
  features: string[];
  description: string;
  established: string;
  cityImage: string;
}

const LocationsPage = () => {
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);

  // Add dark-nav class for navbar visibility
  useEffect(() => {
    document.body.classList.add('dark-nav');
    return () => {
      document.body.classList.remove('dark-nav');
    };
  }, []);

  const locations: LocationData[] = [
    {
      id: 'tyo',
      name: 'TOKYO',
      country: 'JAPAN',
      region: 'Asia Pacific',
      status: 'active',
      latency: '1.5',
      datacenter: 'EQUINIX TY11',
      address: '3-8-21 Higashi-Shinagawa, Shinagawa-ku, Tokyo 140-0002, Japan',
      ixName: 'JPNAP',
      peers: 520,
      capacity: '180+',
      portSpeeds: ['1G', '10G', '40G', '100G'],
      protocols: ['BGP-4', 'IPv4', 'IPv6'],
      features: [
        'Japan market gateway',
        'Ultra-low latency trading',
        'Disaster recovery ready',
        'Carrier-dense location',
        'Premium Japanese networks',
        'Carrier-class location'
      ],
      description: 'Gateway to Japanese enterprise and content networks.',
      established: '2021',
      cityImage: '/assets/cities/tokyo.png'
    },
    {
      id: 'ams',
      name: 'AMSTERDAM',
      country: 'NETHERLANDS',
      region: 'Europe',
      status: 'active',
      latency: '0.8',
      datacenter: 'EQUINIX AM7',
      address: 'Kuiperbergweg 87, 1101 AG Amsterdam, Netherlands',
      ixName: 'AMS-IX',
      peers: 1250,
      capacity: '400+',
      portSpeeds: ['1G', '10G', '40G', '100G', '400G'],
      protocols: ['BGP-4', 'IPv4', 'IPv6', 'MPLS'],
      features: [
        'Direct peering with 1000+ networks',
        'Sub-millisecond latency across EU',
        '24/7 NOC support on-site',
        'Redundant power & cooling',
        'DDoS protection included',
        'Premium European networks'
      ],
      description: 'Our flagship European presence at the world-renowned AMS-IX.',
      established: '2019',
      cityImage: '/assets/cities/amsterdam.png'
    },
    {
      id: 'nyc',
      name: 'NEW YORK',
      country: 'USA',
      region: 'North America',
      status: 'active',
      latency: '1.2',
      datacenter: 'TELEHOUSE CHELSEA',
      address: '85 10th Avenue, New York, NY 10011, USA',
      ixName: 'NYIIX',
      peers: 890,
      capacity: '300+',
      portSpeeds: ['10G', '40G', '100G', '400G'],
      protocols: ['BGP-4', 'IPv4', 'IPv6', 'SD-WAN'],
      features: [
        'Direct access to major US networks',
        'Cloud on-ramps (AWS, Azure, GCP)',
        'Financial services optimized',
        'Tier 3+ datacenter facility',
        'Real-time traffic analytics',
        'Ultra-low latency trading'
      ],
      description: 'Strategic North American hub connecting Wall Street to the world.',
      established: '2020',
      cityImage: '/assets/cities/newyork.png'
    },
    {
      id: 'sin',
      name: 'SINGAPORE',
      country: 'SINGAPORE',
      region: 'Asia Pacific',
      status: 'active',
      latency: '2.1',
      datacenter: 'GLOBAL SWITCH',
      address: '18 Tai Seng Street, Singapore 539775',
      ixName: 'SGIX',
      peers: 650,
      capacity: '200+',
      portSpeeds: ['10G', '40G', '100G'],
      protocols: ['BGP-4', 'IPv4', 'IPv6', 'MPLS'],
      features: [
        'Asia-Pacific gateway',
        'Low-latency to APAC markets',
        'Carrier-neutral facility',
        'Compliance ready (MAS, PDPA)',
        'Cloud connectivity hub',
        'Premium APAC networks'
      ],
      description: 'Premier APAC location serving the fastest-growing internet markets.',
      established: '2020',
      cityImage: '/assets/cities/singapore.png'
    },
    {
      id: 'frk',
      name: 'FRANKFURT',
      country: 'GERMANY',
      region: 'Europe',
      status: 'active',
      latency: '0.9',
      datacenter: 'INTERXION FRA1',
      address: 'Hanauer Landstraße 302, 60314 Frankfurt, Germany',
      ixName: 'DE-CIX',
      peers: 1100,
      capacity: '350+',
      portSpeeds: ['10G', '40G', '100G', '400G'],
      protocols: ['BGP-4', 'IPv4', 'IPv6', 'MPLS', 'EVPN'],
      features: [
        'Largest IX in Europe by traffic',
        'Direct connection to DE-CIX',
        'Financial hub connectivity',
        'Enterprise-grade security',
        'Green energy powered',
        'Redundant path protection'
      ],
      description: 'Connected to the world\'s largest internet exchange by traffic volume.',
      established: '2019',
      cityImage: '/assets/cities/frankfurt.png'
    }
  ];

  const selectedLocationData = locations.find(loc => loc.id === selectedLocation);

  // Scroll to details when location is selected
  const handleLocationClick = (locationId: string) => {
    setSelectedLocation(selectedLocation === locationId ? null : locationId);
    if (selectedLocation !== locationId) {
      // Scroll to the details section after a short delay to let the DOM update
      setTimeout(() => {
        const detailsElement = document.getElementById('location-details');
        if (detailsElement) {
          detailsElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with Globe */}
      <section className="relative bg-black text-white overflow-hidden">
        {/* Carbon Fiber Texture */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
        
        {/* Red Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#F20732]/20 via-transparent to-transparent"></div>

        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 pt-32 pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: Text Content */}
            <div>
              {/* Header Badge */}
              <div className="inline-flex items-center gap-3 mb-6">
                <div className="w-2 h-2 rounded-full bg-[#F20732] animate-pulse"></div>
                <span className="font-mono text-xs font-bold tracking-[0.2em] text-[#F20732] uppercase">
                  Global Presence
                </span>
              </div>

              {/* Main Heading */}
              <h1 className="text-5xl md:text-7xl font-black leading-tight tracking-tighter mb-6">
                OUR GLOBAL <span className="text-[#F20732]">LOCATIONS</span>
              </h1>

              <p className="text-gray-300 text-lg leading-relaxed max-w-xl mb-8">
                Strategic Points of Presence across the globe, ensuring ultra-low latency 
                and maximum uptime for your critical infrastructure.
              </p>

              {/* Stats Quick View */}
              <div className="grid grid-cols-3 gap-4">
                <div className="border-l-2 border-[#F20732] pl-4">
                  <div className="text-3xl font-light text-white tracking-tighter">
                    {locations.length}
                  </div>
                  <div className="text-xs text-gray-400 uppercase font-mono tracking-wider">
                    Cities
                  </div>
                </div>
                <div className="border-l-2 border-gray-700 pl-4">
                  <div className="text-3xl font-light text-white tracking-tighter">
                    4.4K
                  </div>
                  <div className="text-xs text-gray-400 uppercase font-mono tracking-wider">
                    Peers
                  </div>
                </div>
                <div className="border-l-2 border-gray-700 pl-4">
                  <div className="text-3xl font-light text-white tracking-tighter">
                    99.99%
                  </div>
                  <div className="text-xs text-gray-400 uppercase font-mono tracking-wider">
                    Uptime
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Globe Image */}
            <div className="relative lg:absolute lg:right-0 lg:top-1/2 lg:-translate-y-1/2 lg:w-[45%]">
              <div className="relative">
                {/* Glow effect behind globe */}
                <div className="absolute inset-0 bg-[#F20732]/20 blur-3xl rounded-full scale-75"></div>
                
                {/* Globe Image */}
                <img 
                  src="/assets/globe/globe_hero.png" 
                  alt="Global Network" 
                  className="relative w-full h-auto opacity-90 hover:opacity-100 transition-opacity duration-500"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Location Cards Section */}
      <section className="relative bg-white py-20">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          {selectedLocationData ? (
            /* Detailed Location Card */
            <div id="location-details" className="bg-white border-2 border-gray-200 overflow-hidden shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-500">
              {/* Hero Image with Overlay */}
              <div className="relative h-80 overflow-hidden">
                <img 
                  src={selectedLocationData.cityImage} 
                  alt={selectedLocationData.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                
                {/* City Name Overlay */}
                <div className="absolute top-8 left-8">
                  <h2 className="text-5xl md:text-6xl font-black text-white mb-1">
                    {selectedLocationData.name}
                  </h2>
                  <p className="text-[#F20732] font-bold text-xl tracking-wide">
                    {selectedLocationData.country}
                  </p>
                </div>

                {/* Close Button */}
                <button
                  onClick={() => setSelectedLocation(null)}
                  className="absolute top-8 right-8 w-12 h-12 bg-white/10 backdrop-blur-sm hover:bg-white hover:text-black text-white transition-all duration-300 flex items-center justify-center group"
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Stats Header Bar */}
              <div className="bg-white border-b border-gray-200 px-8 py-6">
                <div className="grid grid-cols-3 divide-x divide-gray-200">
                  <div className="text-center">
                    <div className="font-mono text-xs text-gray-500 uppercase tracking-widest mb-1">
                      Peers
                    </div>
                    <div className="text-3xl font-bold text-black">
                      {selectedLocationData.peers}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="font-mono text-xs text-gray-500 uppercase tracking-widest mb-1">
                      Latency
                    </div>
                    <div className="text-3xl font-bold text-black">
                      {selectedLocationData.latency}<span className="text-lg">ms</span>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="font-mono text-xs text-gray-500 uppercase tracking-widest mb-1">
                      Total Capacity
                    </div>
                    <div className="text-3xl font-bold text-black">
                      {selectedLocationData.capacity} <span className="text-lg">Tbps</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Content Section */}
              <div className="p-8 md:p-12">
                <p className="text-gray-600 text-lg mb-12 leading-relaxed">
                  {selectedLocationData.description}
                </p>

                {/* Info Boxes Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                  {/* Datacenter */}
                  <div className="bg-pink-50 p-6 border border-pink-100">
                    <div className="flex items-start gap-3 mb-3">
                      <svg className="w-5 h-5 text-[#F20732] mt-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
                      </svg>
                      <div>
                        <div className="font-mono text-xs text-[#F20732] uppercase tracking-widest mb-2">
                          Datacenter
                        </div>
                        <div className="font-bold text-base mb-2 text-black">
                          {selectedLocationData.datacenter}
                        </div>
                        <div className="text-sm text-gray-600">
                          {selectedLocationData.address}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Total Capacity */}
                  <div className="bg-pink-50 p-6 border border-pink-100">
                    <div className="font-mono text-xs text-[#F20732] uppercase tracking-widest mb-3">
                      Total Capacity
                    </div>
                    <div className="text-4xl font-bold text-black mb-2">
                      {selectedLocationData.capacity} <span className="text-xl">Tbps</span>
                    </div>
                    <div className="text-sm text-gray-600">
                      Est. {selectedLocationData.established}
                    </div>
                  </div>

                  {/* Connected Networks */}
                  <div className="bg-pink-50 p-6 border border-pink-100">
                    <div className="font-mono text-xs text-[#F20732] uppercase tracking-widest mb-3">
                      Connected Networks
                    </div>
                    <div className="text-4xl font-bold text-black mb-2">
                      {selectedLocationData.peers}
                    </div>
                    <div className="text-sm text-gray-600">
                      Active Peers
                    </div>
                  </div>
                </div>

                {/* Port Speeds and Protocols */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
                  {/* Available Port Speeds */}
                  <div>
                    <h3 className="text-lg font-black text-black mb-4 flex items-center gap-3">
                      <div className="w-1 h-6 bg-[#F20732]"></div>
                      Available Port Speeds
                    </h3>
                    <div className="flex flex-wrap gap-3">
                      {selectedLocationData.portSpeeds.map((speed) => (
                        <div
                          key={speed}
                          className="bg-pink-50 border border-pink-200 text-black px-4 py-2 font-mono text-sm font-bold"
                        >
                          {speed}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Supported Protocols */}
                  <div>
                    <h3 className="text-lg font-black text-black mb-4 flex items-center gap-3">
                      <div className="w-1 h-6 bg-black"></div>
                      Supported Protocols
                    </h3>
                    <div className="flex flex-wrap gap-3">
                      {selectedLocationData.protocols.map((protocol) => (
                        <div
                          key={protocol}
                          className="bg-pink-50 border border-pink-200 text-black px-4 py-2 font-mono text-sm"
                        >
                          {protocol}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Key Features */}
                <div className="border-t border-gray-200 pt-8">
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

                {/* Action Buttons */}
                <div className="mt-12 flex flex-wrap gap-4">
                  <button className="bg-[#F20732] text-white px-8 py-4 font-mono text-xs font-bold uppercase tracking-widest hover:bg-black transition-all duration-300 flex items-center gap-3 group">
                    Request Port
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </button>
                  <button className="bg-white border-2 border-black text-black px-8 py-4 font-mono text-xs font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-all duration-300">
                    Download Specs
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* Location Grid - Click to Open */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {locations.map((location) => (
                <button
                  key={location.id}
                  onClick={() => handleLocationClick(location.id)}
                  className="group bg-white border-2 border-gray-200 hover:border-[#F20732] transition-all duration-300 overflow-hidden text-left hover:shadow-xl"
                >
                  {/* City Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={location.cityImage} 
                      alt={location.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                    <div className="absolute bottom-4 left-4">
                      <h3 className="text-2xl font-black text-white mb-1">{location.name}</h3>
                      <p className="text-[#F20732] font-bold text-sm">{location.country}</p>
                    </div>
                  </div>

                  {/* Quick Stats */}
                  <div className="p-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="font-mono text-xs text-gray-400 uppercase tracking-widest mb-1">
                          Peers
                        </div>
                        <div className="text-xl font-bold text-black">
                          {location.peers}
                        </div>
                      </div>
                      <div>
                        <div className="font-mono text-xs text-gray-400 uppercase tracking-widest mb-1">
                          Latency
                        </div>
                        <div className="text-xl font-bold text-black">
                          {location.latency}ms
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 flex items-center justify-end gap-2 text-[#F20732] font-mono text-xs font-bold uppercase">
                      View Details
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Stats Footer */}
      <section className="relative bg-black py-24">
        {/* Carbon Fiber Texture */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-5"></div>
        
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {/* Cities POPs */}
            <div className="bg-[#0a0a0a] border-2 border-[#1a1a1a] p-10 text-center hover:border-[#F20732] transition-all duration-500 group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[#F20732]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="text-6xl md:text-7xl font-light tracking-tighter text-white mb-3 group-hover:text-[#F20732] transition-colors duration-300">
                  {locations.length}
                </div>
                <div className="h-px w-12 bg-[#F20732] mx-auto mb-3"></div>
                <div className="font-mono text-[10px] text-gray-400 uppercase tracking-[0.2em] group-hover:text-gray-300 transition-colors">
                  Cities POPs
                </div>
              </div>
            </div>

            {/* Total Peers */}
            <div className="bg-[#0a0a0a] border-2 border-[#1a1a1a] p-10 text-center hover:border-[#F20732] transition-all duration-500 group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[#F20732]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="text-6xl md:text-7xl font-light tracking-tighter text-white mb-3 group-hover:text-[#F20732] transition-colors duration-300">
                  4,410
                </div>
                <div className="h-px w-12 bg-[#F20732] mx-auto mb-3"></div>
                <div className="font-mono text-[10px] text-gray-400 uppercase tracking-[0.2em] group-hover:text-gray-300 transition-colors">
                  Total Peers
                </div>
              </div>
            </div>

            {/* Uptime */}
            <div className="bg-[#0a0a0a] border-2 border-[#1a1a1a] p-10 text-center hover:border-[#F20732] transition-all duration-500 group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[#F20732]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="text-6xl md:text-7xl font-light tracking-tighter text-white mb-3 group-hover:text-[#F20732] transition-colors duration-300">
                  99.99%
                </div>
                <div className="h-px w-12 bg-[#F20732] mx-auto mb-3"></div>
                <div className="font-mono text-[10px] text-gray-400 uppercase tracking-[0.2em] group-hover:text-gray-300 transition-colors">
                  Uptime SLA
                </div>
              </div>
            </div>

            {/* Support */}
            <div className="bg-[#0a0a0a] border-2 border-[#1a1a1a] p-10 text-center hover:border-[#F20732] transition-all duration-500 group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[#F20732]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="text-6xl md:text-7xl font-light tracking-tighter text-white mb-3 group-hover:text-[#F20732] transition-colors duration-300">
                  24/7
                </div>
                <div className="h-px w-12 bg-[#F20732] mx-auto mb-3"></div>
                <div className="font-mono text-[10px] text-gray-400 uppercase tracking-[0.2em] group-hover:text-gray-300 transition-colors">
                  Support
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LocationsPage;

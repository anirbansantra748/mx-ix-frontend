import React, { useState, useEffect } from 'react';

interface LocationData {
  id: string;
  name: string;
  country: string;
  continentId: string;
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

interface ContinentData {
  id: string;
  name: string;
}

const LocationsPage = () => {
  const [expandedContinent, setExpandedContinent] = useState<string>('asia');
  const [selectedLocation, setSelectedLocation] = useState<string>('tyo');

  // Add dark-nav class for navbar visibility
  useEffect(() => {
    document.body.classList.add('dark-nav');
    return () => {
      document.body.classList.remove('dark-nav');
    };
  }, []);

  const continents: ContinentData[] = [
    { id: 'asia', name: 'ASIA' },
    { id: 'africa', name: 'AFRICA' },
    { id: 'europe', name: 'EUROPE' },
    { id: 'north-america', name: 'NORTH AMERICA' }
  ];

  const locations: LocationData[] = [
    {
      id: 'tyo',
      name: 'TOKYO',
      country: 'Japan',
      continentId: 'asia',
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
      id: 'sin',
      name: 'SINGAPORE',
      country: 'Singapore',
      continentId: 'asia',
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
      id: 'hkg',
      name: 'HONG KONG',
      country: 'Hong Kong',
      continentId: 'asia',
      region: 'Asia Pacific',
      status: 'planned',
      latency: '1.8',
      datacenter: 'MEGA-i',
      address: '7 Chun Ying Street, Tseung Kwan O, Hong Kong',
      ixName: 'HKIX',
      peers: 380,
      capacity: '150+',
      portSpeeds: ['10G', '40G', '100G'],
      protocols: ['BGP-4', 'IPv4', 'IPv6'],
      features: [
        'Gateway to Greater China',
        'Financial hub connectivity',
        'Low latency to mainland',
        'Tier 3 datacenter',
        'Diverse carrier options',
        'Strategic Asia location'
      ],
      description: 'Strategic gateway connecting to Greater China and Southeast Asia.',
      established: '2024',
      cityImage: '/assets/cities/hongkong.png'
    },
    {
      id: 'ams',
      name: 'AMSTERDAM',
      country: 'Netherlands',
      continentId: 'europe',
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
      id: 'frk',
      name: 'FRANKFURT',
      country: 'Germany',
      continentId: 'europe',
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
    },
    {
      id: 'nyc',
      name: 'NEW YORK',
      country: 'United States',
      continentId: 'north-america',
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
    }
  ];

  const getCitiesInContinent = (continentId: string) => {
    return locations.filter(l => l.continentId === continentId);
  };

  const selectedLocationData = locations.find(loc => loc.id === selectedLocation);

  const toggleContinent = (continentId: string) => {
    if (expandedContinent === continentId) {
      setExpandedContinent('');
    } else {
      setExpandedContinent(continentId);
    }
  };

  const handleCityClick = (cityId: string) => {
    setSelectedLocation(cityId);
    // Scroll to top on mobile
    if (window.innerWidth < 1024) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
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

      {/* Main Content: Sidebar + Details Panel */}
      <section className="relative bg-gray-100">
        <div className="max-w-[1920px] mx-auto">
          <div className="flex flex-col lg:flex-row min-h-screen">
            {/* LEFT SIDEBAR - Continent/City Navigation */}
            <aside className="lg:w-96 bg-white border-r-2 border-gray-300 lg:sticky lg:top-0 lg:h-screen lg:overflow-y-auto shadow-lg">
              <div className="p-8 border-b-2 border-gray-200 bg-gradient-to-br from-white to-gray-50">
                <div className="inline-flex items-center gap-2 mb-3">
                  <div className="w-1.5 h-1.5 bg-[#F20732] rounded-full"></div>
                  <span className="font-mono text-[10px] font-bold tracking-[0.2em] text-[#F20732] uppercase">
                    Global Topology
                  </span>
                </div>
                <h2 className="text-4xl font-black text-black tracking-tight">
                  LOCATIONS
                </h2>
              </div>

              {/* Accordion Menu */}
              <nav className="py-4">
                {continents.map((continent) => {
                  const cities = getCitiesInContinent(continent.id);
                  const isExpanded = expandedContinent === continent.id;
                  
                  return (
                    <div key={continent.id} className="border-b border-gray-100">
                      {/* Continent Header */}
                      <button
                        onClick={() => toggleContinent(continent.id)}
                        className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors group"
                      >
                        <span className="font-bold text-sm tracking-wide text-black group-hover:text-[#F20732] transition-colors">
                          {continent.name}
                        </span>
                        <svg 
                          className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
                          fill="none" 
                          viewBox="0 0 24 24" 
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>

                      {/* City List */}
                      {isExpanded && cities.length > 0 && (
                        <div className="bg-gray-50">
                          {cities.map((city) => (
                            <button
                              key={city.id}
                              onClick={() => handleCityClick(city.id)}
                              className={`w-full px-6 py-3 text-left flex items-center justify-between group hover:bg-black transition-all duration-300 border-l-2 ${
                                selectedLocation === city.id 
                                  ? 'border-[#F20732] bg-black' 
                                  : 'border-transparent bg-gray-50'
                              }`}
                            >
                              <div className="flex-1">
                                <div className={`font-medium text-sm transition-colors ${
                                  selectedLocation === city.id 
                                    ? 'text-white' 
                                    : 'text-gray-700 group-hover:text-white'
                                }`}>
                                  {city.name}
                                </div>
                                <div className={`font-mono text-[10px] mt-0.5 transition-colors ${
                                  selectedLocation === city.id 
                                    ? 'text-gray-400' 
                                    : 'text-gray-400 group-hover:text-gray-300'
                                }`}>
                                  {city.country} // {city.latency}ms
                                </div>
                              </div>
                              
                              {/* Active Badge */}
                              {city.status === 'active' && (
                                <span className="inline-block px-2 py-0.5 bg-[#F20732] text-white text-[9px] font-mono font-bold uppercase tracking-wider">
                                  ACTIVE
                                </span>
                              )}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </nav>
            </aside>

            {/* RIGHT PANEL - City Details */}
            <main className="flex-1 lg:min-h-screen bg-white lg:p-8">
              {selectedLocationData ? (
                <div className="animate-in fade-in duration-500 bg-white lg:shadow-xl lg:border-2 lg:border-gray-200">
                  {/* City Header */}
                  <div className="bg-black text-white px-8 py-12 border-b-4 border-[#F20732]">
                    <h2 className="text-5xl md:text-6xl font-black mb-3 tracking-tight">
                      {selectedLocationData.name}
                    </h2>
                    <div className="flex items-center gap-4">
                      <span className="text-[#F20732] font-bold text-xl tracking-wide">
                        {selectedLocationData.country}
                      </span>
                      <span className="text-gray-400 font-mono text-sm">
                        // {selectedLocationData.region}
                      </span>
                    </div>
                  </div>

                  {/* Stats Bar */}
                  <div className="bg-white border-b border-gray-200">
                    <div className="max-w-5xl mx-auto px-8 py-8">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        <div className="text-center">
                          <div className="font-mono text-xs text-gray-500 uppercase tracking-widest mb-2">
                            Facility Type
                          </div>
                          <div className="text-lg font-bold text-black">
                            Tier IV Datacenter
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="font-mono text-xs text-gray-500 uppercase tracking-widest mb-2">
                            Capacity
                          </div>
                          <div className="text-lg font-bold text-black">
                            {selectedLocationData.capacity} Tbps
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="font-mono text-xs text-gray-500 uppercase tracking-widest mb-2">
                            Interconnections
                          </div>
                          <div className="text-lg font-bold text-black">
                            {selectedLocationData.peers}+ Networks
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="font-mono text-xs text-gray-500 uppercase tracking-widest mb-2">
                            Power
                          </div>
                          <div className="text-lg font-bold text-black">
                            100% Renewable
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Main Content */}
                  <div className="max-w-5xl mx-auto px-8 py-12">
                    {/* Key Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                      <div className="bg-white p-6 border-l-4 border-[#F20732] shadow-sm">
                        <div className="font-mono text-xs text-[#F20732] uppercase tracking-widest mb-2">
                          Peers
                        </div>
                        <div className="text-5xl font-light text-black mb-1">
                          {selectedLocationData.peers}
                        </div>
                        <div className="text-sm text-gray-600">
                          Connected Networks
                        </div>
                      </div>

                      <div className="bg-white p-6 border-l-4 border-black shadow-sm">
                        <div className="font-mono text-xs text-black uppercase tracking-widest mb-2">
                          Latency
                        </div>
                        <div className="text-5xl font-light text-black mb-1">
                          {selectedLocationData.latency}<span className="text-2xl">ms</span>
                        </div>
                        <div className="text-sm text-gray-600">
                          Average Response
                        </div>
                      </div>

                      <div className="bg-white p-6 border-l-4 border-gray-300 shadow-sm">
                        <div className="font-mono text-xs text-gray-700 uppercase tracking-widest mb-2">
                          Total Capacity
                        </div>
                        <div className="text-5xl font-light text-black mb-1">
                          {selectedLocationData.capacity}<span className="text-2xl">+</span>
                        </div>
                        <div className="text-sm text-gray-600">
                          Tbps // Est. {selectedLocationData.established}
                        </div>
                      </div>
                    </div>

                    {/* Description */}
                    <div className="mb-12">
                      <p className="text-gray-700 text-lg leading-relaxed">
                        {selectedLocationData.description}
                      </p>
                    </div>

                    {/* Datacenter Info */}
                    <div className="bg-white p-8 shadow-sm mb-8 border border-gray-200">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-[#F20732] flex items-center justify-center flex-shrink-0">
                          <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
                          </svg>
                        </div>
                        <div className="flex-1">
                          <div className="font-mono text-xs text-[#F20732] uppercase tracking-widest mb-3">
                            Datacenter
                          </div>
                          <h3 className="text-2xl font-black text-black mb-3">
                            {selectedLocationData.datacenter}
                          </h3>
                          <p className="text-gray-600 mb-4">
                            {selectedLocationData.address}
                          </p>
                          <div className="inline-flex items-center gap-2 bg-gray-100 px-4 py-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                            <span className="font-mono text-xs font-bold text-gray-700">
                              OPERATIONAL // {selectedLocationData.peers.toLocaleString()} ACTIVE PEERS
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Technical Specs */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                      {/* Port Speeds */}
                      <div>
                        <div className="flex items-center gap-3 mb-6">
                          <div className="w-1 h-8 bg-[#F20732]"></div>
                          <h3 className="text-xl font-black text-black">
                            Available Port Speeds
                          </h3>
                        </div>
                        <div className="flex flex-wrap gap-3">
                          {selectedLocationData.portSpeeds.map((speed) => (
                            <span
                              key={speed}
                              className="px-4 py-2 bg-white border-2 border-gray-200 font-mono text-sm font-bold text-black hover:border-[#F20732] transition-colors"
                            >
                              {speed}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Protocols */}
                      <div>
                        <div className="flex items-center gap-3 mb-6">
                          <div className="w-1 h-8 bg-black"></div>
                          <h3 className="text-xl font-black text-black">
                            Supported Protocols
                          </h3>
                        </div>
                        <div className="flex flex-wrap gap-3">
                          {selectedLocationData.protocols.map((protocol) => (
                            <span
                              key={protocol}
                              className="px-4 py-2 bg-white border-2 border-gray-200 font-mono text-sm text-black"
                            >
                              {protocol}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Key Features */}
                    <div className="bg-white p-8 shadow-sm border border-gray-200 mb-12">
                      <h3 className="text-2xl font-black text-black mb-6">
                        Key Features
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {selectedLocationData.features.map((feature, idx) => (
                          <div key={idx} className="flex items-start gap-3">
                            <svg className="w-5 h-5 text-[#F20732] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                            </svg>
                            <span className="text-gray-700 text-sm leading-relaxed">
                              {feature}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-4">
                      <button 
                        onClick={() => {
                          // Navigate to contact page - will be handled by App.tsx setPage
                          // Convert city name to Title Case (e.g., "TOKYO" -> "Tokyo")
                          const cityName = selectedLocationData.name.charAt(0) + selectedLocationData.name.slice(1).toLowerCase();
                          window.dispatchEvent(new CustomEvent('navigateToContact', { 
                            detail: { city: cityName, locationId: selectedLocationData.id } 
                          }));
                        }}
                        className="bg-[#F20732] text-white px-8 py-4 font-mono text-xs font-bold uppercase tracking-widest hover:bg-black transition-all duration-300 flex items-center gap-3 group shadow-lg"
                      >
                        Request Port
                        <span className="group-hover:translate-x-1 transition-transform">→</span>
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center h-96">
                  <div className="text-center">
                    <div className="text-gray-400 mb-4">
                      <svg className="w-16 h-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <p className="text-gray-500 font-mono text-sm">
                      Select a location from the menu
                    </p>
                  </div>
                </div>
              )}
            </main>
          </div>
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

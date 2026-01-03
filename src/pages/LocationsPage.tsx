import React, { useState, useEffect } from 'react';
import { useAdmin } from '../contexts/AdminContext';
import type { ASN, EnabledSite } from '../contexts/AdminContext';

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

interface LocationsPageProps {
  preSelectedLocation?: string;
  preSelectedSection?: string;
}

const LocationsPage = ({ preSelectedLocation, preSelectedSection }: LocationsPageProps) => {
  const [expandedContinent, setExpandedContinent] = useState<string>('asia');
  const [selectedLocation, setSelectedLocation] = useState<string>('tyo');
  const [asnSearch, setASNSearch] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'overview' | 'asns' | 'sites'>('overview');
  const { locations: adminLocations } = useAdmin();

  // Handle pre-selected location and section from map navigation
  useEffect(() => {
    if (preSelectedLocation) {
      setSelectedLocation(preSelectedLocation);
      // Find the continent for this location and expand it
      const location = locations.find(l => l.id === preSelectedLocation);
      if (location) {
        setExpandedContinent(location.continentId);
      }
    }
    if (preSelectedSection) {
      if (preSelectedSection === 'asns') setActiveTab('asns');
      else if (preSelectedSection === 'sites') setActiveTab('sites');
      else setActiveTab('overview');
    }
  }, [preSelectedLocation, preSelectedSection]);

  // Add dark-nav class for navbar visibility
  useEffect(() => {
    document.body.classList.add('dark-nav');
    return () => {
      document.body.classList.remove('dark-nav');
    };
  }, []);

  const continents: ContinentData[] = [
    { id: 'asia', name: 'ASIA' },
    { id: 'middle-east', name: 'MIDDLE EAST' },
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
    },
    {
      id: 'bom',
      name: 'MUMBAI',
      country: 'India',
      continentId: 'asia',
      region: 'South Asia',
      status: 'active',
      latency: '1.8',
      datacenter: 'GPX MUMBAI 1',
      address: 'Powai, Mumbai, Maharashtra 400076, India',
      ixName: 'MBIIX',
      peers: 340,
      capacity: '120+',
      portSpeeds: ['1G', '10G', '40G', '100G'],
      protocols: ['BGP-4', 'IPv4', 'IPv6'],
      features: [
        'Gateway to Indian subcontinent',
        'Financial hub connectivity',
        'Low-latency to APAC markets',
        'Carrier-neutral facility',
        'Enterprise connectivity',
        'Cloud on-ramps available'
      ],
      description: 'Strategic gateway serving India\'s largest financial and commercial center.',
      established: '2022',
      cityImage: '/assets/cities/mumbai.png'
    },
    {
      id: 'maa',
      name: 'CHENNAI',
      country: 'India',
      continentId: 'asia',
      region: 'South Asia',
      status: 'active',
      latency: '2.0',
      datacenter: 'STT CHENNAI 1',
      address: 'Ambattur Industrial Estate, Chennai 600058, India',
      ixName: 'CIIX',
      peers: 280,
      capacity: '100+',
      portSpeeds: ['1G', '10G', '40G', '100G'],
      protocols: ['BGP-4', 'IPv4', 'IPv6'],
      features: [
        'Submarine cable landing point',
        'South India gateway',
        'IT corridor connectivity',
        'Disaster recovery hub',
        'Cloud connectivity',
        'Enterprise-grade facility'
      ],
      description: 'Key submarine cable landing station connecting India to global networks.',
      established: '2023',
      cityImage: '/assets/cities/chennai.png'
    },
    {
      id: 'del',
      name: 'DELHI',
      country: 'India',
      continentId: 'asia',
      region: 'South Asia',
      status: 'active',
      latency: '1.6',
      datacenter: 'NTT DELHI DC',
      address: 'Sector 142, Noida, Uttar Pradesh 201304, India',
      ixName: 'DELIX',
      peers: 320,
      capacity: '150+',
      portSpeeds: ['1G', '10G', '40G', '100G'],
      protocols: ['BGP-4', 'IPv4', 'IPv6', 'MPLS'],
      features: [
        'North India gateway',
        'Government connectivity hub',
        'Enterprise connectivity',
        'Multi-cloud access',
        'Low-latency trading',
        'Carrier-dense location'
      ],
      description: 'Strategic hub serving North India\'s enterprise and government networks.',
      established: '2023',
      cityImage: '/assets/cities/delhi.png'
    },
    {
      id: 'dxb',
      name: 'DUBAI',
      country: 'United Arab Emirates',
      continentId: 'middle-east',
      region: 'Middle East',
      status: 'active',
      latency: '1.4',
      datacenter: 'EQUINIX DX1',
      address: 'Dubai Silicon Oasis, Dubai, UAE',
      ixName: 'UAE-IX',
      peers: 250,
      capacity: '180+',
      portSpeeds: ['10G', '40G', '100G'],
      protocols: ['BGP-4', 'IPv4', 'IPv6'],
      features: [
        'Middle East gateway',
        'MENA region hub',
        'Financial services hub',
        'Low-latency to Africa/Asia',
        'Enterprise connectivity',
        'Cloud on-ramps available'
      ],
      description: 'Premier Middle East hub connecting MENA region to global networks.',
      established: '2024',
      cityImage: '/assets/cities/dubai.png'
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
            <aside className="lg:w-96 bg-white border-r-2 border-gray-300 lg:sticky lg:top-0 lg:h-screen lg:overflow-y-auto shadow-lg scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
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

                  {/* Tab Navigation */}
                  <div className="bg-gradient-to-r from-gray-800 to-gray-900 border-b border-gray-700">
                    <div className="max-w-5xl mx-auto px-8">
                      <div className="flex items-center gap-0">
                        <button
                          onClick={() => setActiveTab('overview')}
                          className={`px-6 py-4 font-mono text-xs font-bold uppercase tracking-wider transition-all duration-300 border-b-2 ${
                            activeTab === 'overview' 
                              ? 'text-white border-[#F20732] bg-black/30' 
                              : 'text-gray-400 border-transparent hover:text-white hover:bg-black/20'
                          }`}
                        >
                          Overview
                        </button>
                        <button
                          onClick={() => setActiveTab('asns')}
                          className={`px-6 py-4 font-mono text-xs font-bold uppercase tracking-wider transition-all duration-300 border-b-2 flex items-center gap-2 ${
                            activeTab === 'asns' 
                              ? 'text-white border-[#F20732] bg-black/30' 
                              : 'text-gray-400 border-transparent hover:text-white hover:bg-black/20'
                          }`}
                        >
                          Connected Networks
                          <span className={`px-2 py-0.5 rounded text-[10px] ${activeTab === 'asns' ? 'bg-[#F20732]' : 'bg-gray-700'}`}>
                            {adminLocations.find(l => l.id === selectedLocationData.id)?.asnList?.length || 0}
                          </span>
                        </button>
                        <button
                          onClick={() => setActiveTab('sites')}
                          className={`px-6 py-4 font-mono text-xs font-bold uppercase tracking-wider transition-all duration-300 border-b-2 flex items-center gap-2 ${
                            activeTab === 'sites' 
                              ? 'text-white border-[#F20732] bg-black/30' 
                              : 'text-gray-400 border-transparent hover:text-white hover:bg-black/20'
                          }`}
                        >
                          Enabled Sites
                          <span className={`px-2 py-0.5 rounded text-[10px] ${activeTab === 'sites' ? 'bg-[#F20732]' : 'bg-gray-700'}`}>
                            {adminLocations.find(l => l.id === selectedLocationData.id)?.enabledSites?.length || 0}
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Main Content - Tab Panels */}
                  <div className="max-w-5xl mx-auto px-8 py-12">
                    
                    {/* OVERVIEW TAB */}
                    {activeTab === 'overview' && (
                      <>
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
                      </>
                    )}

                    {/* CONNECTED NETWORKS TAB (ASNs) */}
                    {activeTab === 'asns' && adminLocations.find(l => l.id === selectedLocationData.id)?.asnList && (
                      <>
                        {/* ASN Statistics */}
                        <div className="bg-gradient-to-r from-gray-900 to-black text-white p-8 mb-12 rounded-lg">
                          <h3 className="text-2xl font-black mb-6 flex items-center gap-3">
                            <div className="w-1 h-8 bg-[#F20732]"></div>
                            Connected Networks
                          </h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-white/10 p-6 rounded-lg border-l-4 border-[#F20732]">
                              <div className="text-xs font-mono text-gray-400 uppercase tracking-wider mb-2">Active ASNs</div>
                              <div className="text-5xl font-light text-white">
                                {adminLocations.find(l => l.id === selectedLocationData.id)?.asnList.filter(a => a.status === 'ACTIVE').length || 0}
                              </div>
                            </div>
                            <div className="bg-white/10 p-6 rounded-lg border-l-4 border-gray-300">
                              <div className="text-xs font-mono text-gray-400 uppercase tracking-wider mb-2">Connecting ASNs</div>
                              <div className="text-5xl font-light text-white">
                                {adminLocations.find(l => l.id === selectedLocationData.id)?.asnList.filter(a => a.status === 'CONNECTING').length || 0}
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* ASN Table */}
                        <div className="bg-white p-8 shadow-sm border border-gray-200 mb-12">
                          <div className="flex items-center justify-between mb-6">
                            <h3 className="text-2xl font-black text-black">Network ASNs</h3>
                            <input
                              type="text"
                              placeholder="Search ASN or name..."
                              value={asnSearch}
                              onChange={(e) => setASNSearch(e.target.value)}
                              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#F20732] font-mono text-sm"
                            />
                          </div>
                          
                          <div className="overflow-x-auto">
                            <table className="w-full">
                              <thead>
                                <tr className="bg-gray-100 border-b-2 border-gray-300">
                                  <th className="text-left px-4 py-3 font-mono text-xs uppercase tracking-wider text-gray-700">ASN</th>
                                  <th className="text-left px-4 py-3 font-mono text-xs uppercase tracking-wider text-gray-700">Name</th>
                                  <th className="text-left px-4 py-3 font-mono text-xs uppercase tracking-wider text-gray-700">Peering Policy</th>
                                  <th className="text-left px-4 py-3 font-mono text-xs uppercase tracking-wider text-gray-700">Status</th>
                                </tr>
                              </thead>
                              <tbody>
                                {adminLocations.find(l => l.id === selectedLocationData.id)?.asnList
                                  .filter(asn => 
                                    asnSearch === '' || 
                                    asn.asnNumber.toString().includes(asnSearch) ||
                                    asn.name.toLowerCase().includes(asnSearch.toLowerCase())
                                  )
                                  .map((asn, idx) => (
                                    <tr key={idx} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                                      <td className="px-4 py-4 font-mono font-bold text-black">AS{asn.asnNumber}</td>
                                      <td className="px-4 py-4 text-gray-700">{asn.name}</td>
                                      <td className="px-4 py-4">
                                        <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-mono rounded">
                                          {asn.peeringPolicy}
                                        </span>
                                      </td>
                                      <td className="px-4 py-4">
                                        <span className={`px-3 py-1 text-xs font-bold rounded ${
                                          asn.status === 'ACTIVE' ? 'bg-green-100 text-green-700' :
                                          asn.status === 'CONNECTING' ? 'bg-yellow-100 text-yellow-700' :
                                          'bg-gray-100 text-gray-700'
                                        }`}>
                                          {asn.status}
                                        </span>
                                      </td>
                                    </tr>
                                  ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </>
                    )}

                    {/* ENABLED SITES TAB */}
                    {activeTab === 'sites' && adminLocations.find(l => l.id === selectedLocationData.id)?.enabledSites && (
                      <div className="bg-white p-8 shadow-sm border border-gray-200 mb-12">
                        <h3 className="text-2xl font-black text-black mb-6 flex items-center gap-3">
                          <div className="w-1 h-8 bg-[#F20732]"></div>
                          Enabled Data Centers
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {adminLocations.find(l => l.id === selectedLocationData.id)?.enabledSites.map((site) => (
                            <div key={site.id} className="border-2 border-gray-200 p-6 hover:border-[#F20732] transition-all duration-300 group">
                              <div className="flex items-start justify-between mb-4">
                                <div>
                                  <h4 className="text-lg font-black text-black group-hover:text-[#F20732] transition-colors">
                                    {site.name}
                                  </h4>
                                  <div className="text-sm font-mono text-gray-500 mt-1">{site.provider}</div>
                                </div>
                                <span className={`px-3 py-1 text-xs font-bold rounded ${
                                  site.status === 'available' ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-600'
                                }`}>
                                  {site.status === 'available' ? 'AVAILABLE' : 'COMING SOON'}
                                </span>
                              </div>
                              <p className="text-sm text-gray-600 mb-4">{site.address}</p>
                              <button 
                                onClick={() => {
                                  const cityName = selectedLocationData.name.charAt(0) + selectedLocationData.name.slice(1).toLowerCase();
                                  window.dispatchEvent(new CustomEvent('navigateToContact', { 
                                    detail: { city: cityName, locationId: selectedLocationData.id, site: site.name } 
                                  }));
                                }}
                                className="w-full bg-black text-white px-4 py-2 font-mono text-xs font-bold uppercase tracking-wider hover:bg-[#F20732] transition-colors flex items-center justify-center gap-2"
                                disabled={site.status !== 'available'}
                              >
                                {site.status === 'available' ? 'Get Connected' : 'Notify Me'}
                                <span>→</span>
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

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

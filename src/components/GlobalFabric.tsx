import React, { useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";

const GEO_URL =
  "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

type Location = {
  id: string;
  name: string;
  coordinates: [number, number];
  code: string;
  region: string;
};

const locations: Location[] = [
  { id: "nyc", name: "New York", coordinates: [-74.006, 40.7128], code: "NYC_CORE", region: "AMERICAS" },
  { id: "sfo", name: "San Francisco", coordinates: [-122.4194, 37.7749], code: "SFO_GATE", region: "AMERICAS" },
  { id: "ams", name: "Amsterdam", coordinates: [4.9041, 52.3676], code: "AMS_IX", region: "EUROPE" },
  { id: "lon", name: "London", coordinates: [-0.1276, 51.5072], code: "LON_X", region: "EUROPE" },
  { id: "frk", name: "Frankfurt", coordinates: [8.6821, 50.1109], code: "FRA_HUB", region: "EUROPE" },
  { id: "bom", name: "Mumbai", coordinates: [72.8777, 19.076], code: "BOM_WEST", region: "ASIA" },
  { id: "sgp", name: "Singapore", coordinates: [103.8198, 1.3521], code: "SIN_NODE", region: "ASIA" },
  { id: "tyo", name: "Tokyo", coordinates: [139.6917, 35.6895], code: "TYO_CNTR", region: "ASIA" },
  { id: "sao", name: "São Paulo", coordinates: [-46.6333, -23.5505], code: "GRU_SOUTH", region: "AMERICAS" },
  { id: "syd", name: "Sydney", coordinates: [151.2093, -33.8688], code: "SYD_EAST", region: "OCEANIA" },
];

const GlobalFabricMap = () => {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const isVisible = (id: string) => activeId === id || hoveredId === id;

  return (
    <section className="relative w-full bg-gradient-to-br from-[#1a1a1a] via-[#1f1f1f] to-[#1a1a1a] py-12 overflow-hidden">
      {/* Animated Background Grid */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#F2073215_1px,transparent_1px),linear-gradient(to_bottom,#F2073215_1px,transparent_1px)] bg-[size:60px_60px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(242,7,50,0.15),transparent_60%)]" />
      </div>

      {/* Floating Orbs */}
      <div className="absolute top-20 left-20 w-96 h-96 bg-[#F20732]/15 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-[#A6032F]/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

      <div className="relative max-w-[1800px] mx-auto px-8">
        {/* Header Section */}
        <div className="mb-6">
          <div className="flex items-center gap-4 mb-3">
            <div className="relative">
              <div className="absolute inset-0 bg-[#F20732] blur-md opacity-50 animate-pulse" />
              <div className="relative w-10 h-10 bg-gradient-to-br from-[#F20732] to-[#A6032F] flex items-center justify-center shadow-lg shadow-[#F20732]/50">
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <div>
              <h2 className="text-5xl font-black text-white tracking-tight leading-none">
                Global Network
              </h2>
              <div className="flex items-center gap-3 mt-2">
                <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#F20732]/30" />
                <p className="text-[#F20746] text-xs font-black tracking-[0.2em] uppercase">
                  {locations.length} Active Locations Worldwide
                </p>
                <div className="h-px flex-1 bg-gradient-to-r from-[#F20732]/30 to-transparent" />
              </div>
            </div>
          </div>
        </div>

        {/* Main Map Container */}
        <div className="relative group">
          {/* Outer glow */}
          <div className="absolute -inset-1 bg-gradient-to-r from-[#F20732]/20 via-[#F20746]/20 to-[#F20732]/20 rounded-2xl blur-xl opacity-60 group-hover:opacity-100 transition-opacity duration-700" />
          
          {/* Map Container */}
          <div className="relative bg-gradient-to-br from-[#1a1a1a] via-[#1f1f1f] to-[#1a1a1a] border-2 border-gray-700/50 rounded-2xl shadow-2xl overflow-hidden backdrop-blur-xl">
            {/* Corner Accents */}
            <div className="absolute top-0 left-0 w-24 h-24 border-t-2 border-l-2 border-[#F20732]/30" />
            <div className="absolute top-0 right-0 w-24 h-24 border-t-2 border-r-2 border-[#F20732]/30" />
            <div className="absolute bottom-0 left-0 w-24 h-24 border-b-2 border-l-2 border-[#F20732]/30" />
            <div className="absolute bottom-0 right-0 w-24 h-24 border-b-2 border-r-2 border-[#F20732]/30" />

            {/* Top Stats Bar */}
            <div className="absolute top-6 left-6 right-6 flex items-center justify-between z-10">
              <div className="flex items-center gap-6">
                <div className="bg-black/60 backdrop-blur-md border border-[#F20732]/30 rounded-lg px-4 py-2">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-lg shadow-green-500/50" />
                    <span className="text-green-400 text-xs font-bold tracking-wide">ALL SYSTEMS OPERATIONAL</span>
                  </div>
                </div>
                <div className="bg-black/60 backdrop-blur-md border border-gray-700/50 rounded-lg px-4 py-2">
                  <span className="text-gray-300 text-xs font-mono font-semibold">UPTIME: 99.99%</span>
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="relative">
              <ComposableMap
                projection="geoMercator"
                className="w-full h-[400px]"
                projectionConfig={{ scale: 140, center: [10, 20] }}
              >
                <defs>
                  {/* Gradient for countries */}
                  <linearGradient id="geoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#252525" />
                    <stop offset="100%" stopColor="#1f1f1f" />
                  </linearGradient>
                  
                  {/* Glow filter */}
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                    <feMerge>
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                </defs>

                <Geographies geography={GEO_URL}>
                  {({ geographies }) =>
                    geographies.map((geo) => (
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        fill="url(#geoGradient)"
                        stroke="#333333"
                        strokeWidth={0.5}
                        style={{
                          default: { outline: "none" },
                          hover: { outline: "none", fill: "#2a2a2a" },
                          pressed: { outline: "none" },
                        }}
                      />
                    ))
                  }
                </Geographies>

                {/* Connection Lines */}
                {locations.map((loc, idx) => {
                  if (idx < locations.length - 1) {
                    return (
                      <line
                        key={`line-${loc.id}`}
                        x1={0}
                        y1={0}
                        x2={0}
                        y2={0}
                        stroke="#F20732"
                        strokeWidth={0.3}
                        opacity={0.2}
                        strokeDasharray="2,2"
                      />
                    );
                  }
                  return null;
                })}

                {/* Location Markers */}
                {locations.map((loc) => (
                  <Marker
                    key={loc.id}
                    coordinates={loc.coordinates}
                    onMouseEnter={() => setHoveredId(loc.id)}
                    onMouseLeave={() => setHoveredId(null)}
                    onClick={() => setActiveId(activeId === loc.id ? null : loc.id)}
                  >
                    <g className="cursor-pointer" filter={isVisible(loc.id) ? "url(#glow)" : undefined}>
                      {/* Outer pulse rings */}
                      {isVisible(loc.id) && (
                        <>
                          <circle
                            r={15}
                            fill="none"
                            stroke="#F20732"
                            strokeWidth={1.5}
                            opacity={0.6}
                            className="animate-ping"
                          />
                          <circle
                            r={20}
                            fill="none"
                            stroke="#F20746"
                            strokeWidth={1}
                            opacity={0.3}
                            className="animate-ping"
                            style={{ animationDelay: '0.3s' }}
                          />
                        </>
                      )}
                      
                      {/* Middle glow circle */}
                      {isVisible(loc.id) && (
                        <circle r={8} fill="#F20732" opacity={0.3} />
                      )}
                      
                      {/* Core marker */}
                      <circle
                        r={isVisible(loc.id) ? 5 : 4}
                        fill="#F20732"
                        className="transition-all duration-300"
                      />
                      <circle
                        r={isVisible(loc.id) ? 2.5 : 2}
                        fill="#ffffff"
                        className="transition-all duration-300"
                      />
                    </g>

                    {/* Premium Info Card */}
                    {isVisible(loc.id) && (
                      <foreignObject x={15} y={-50} width={210} height={90}>
                        <div className="relative animate-[fadeIn_0.3s_ease-out] hover:scale-105 transition-transform duration-300">
                          {/* Enhanced Card glow effect */}
                          <div className="absolute -inset-1.5 bg-[#F20732] rounded-xl blur-md opacity-50 animate-pulse" />
                          <div className="absolute -inset-0.5 bg-gradient-to-r from-[#F20732] via-[#F20746] to-[#F20732] rounded-xl blur-sm opacity-25" />
                          
                          {/* Main card */}
                          <div className="relative bg-[#F2F2F2] border-3 border-[#F20732] shadow-[0_15px_40px_rgba(242,7,50,0.3),0_8px_20px_rgba(0,0,0,0.5)] rounded-xl overflow-hidden hover:shadow-[0_20px_50px_rgba(242,7,50,0.4),0_10px_25px_rgba(0,0,0,0.6)] transition-shadow duration-300">
                            {/* Top red accent dot */}
                            <div className="absolute top-2.5 left-3">
                              <div className="w-2 h-2 rounded-full bg-[#F20732]" />
                            </div>

                            {/* Region badge - top right */}
                            <div className="absolute top-2 right-3">
                              <div className="bg-[#F20732] text-white text-[8px] font-black px-2 py-0.5 rounded tracking-wide">
                                {loc.region}
                              </div>
                            </div>
                            
                            {/* Content */}
                            <div className="px-4 pt-8 pb-3">
                              {/* Exchange Point Label */}
                              <div className="mb-1">
                                <span className="text-[#A6032F]/60 text-[8px] font-bold uppercase tracking-[0.1em]">
                                  EXCHANGE POINT
                                </span>
                              </div>
                              
                              {/* City Name */}
                              <div className="mb-2.5">
                                <h3 className="text-[#0D0D0D] text-lg font-black uppercase tracking-tight leading-none">
                                  {loc.name}
                                </h3>
                              </div>
                              
                              {/* Bottom info row */}
                              <div className="flex items-center justify-between">
                                {/* Code badge */}
                                <div className="flex items-center gap-1.5">
                                  <svg className="w-3 h-3 text-[#0D0D0D]/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                                  </svg>
                                  <span className="font-mono font-bold text-[10px] text-[#0D0D0D]/80">
                                    {loc.code}
                                  </span>
                                </div>
                                
                                {/* Active status */}
                                <div className="flex items-center gap-1.5">
                                  <div className="w-1.5 h-1.5 rounded-full bg-[#10b981] shadow-md shadow-green-500/50" />
                                  <span className="font-black text-[10px] text-[#10b981] uppercase tracking-wide">
                                    ACTIVE
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </foreignObject>
                    )}
                  </Marker>
                ))}
              </ComposableMap>
            </div>

            {/* Bottom stats bar */}
            <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="font-mono text-[9px] text-gray-500 tracking-widest uppercase bg-black/40 backdrop-blur-sm px-3 py-1.5 rounded border border-gray-800/50">
                  Projection: Mercator
                </div>
                <div className="font-mono text-[9px] text-gray-500 tracking-widest uppercase bg-black/40 backdrop-blur-sm px-3 py-1.5 rounded border border-gray-800/50">
                  Layer: Global Fabric
                </div>
              </div>
              
              <div className="flex items-center gap-2 bg-black/40 backdrop-blur-sm px-3 py-1.5 rounded border border-gray-800/50">
                <div className="w-1.5 h-1.5 bg-[#F20732] rounded-full animate-pulse" />
                <span className="font-mono text-[9px] text-[#F20746] tracking-widest uppercase font-bold">
                  Live Network
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Network Stats */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { label: "TOTAL CAPACITY", value: "5.2 Tbps", icon: (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            ), color: "#F20732" },
            { label: "ACTIVE ROUTES", value: "10,000+", icon: (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
              </svg>
            ), color: "#F20746" },
            { label: "AVG LATENCY", value: "<5ms", icon: (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            ), color: "#A6032F" },
            { label: "GLOBAL COVERAGE", value: "100%", icon: (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            ), color: "#F20732" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="relative group/stat bg-gradient-to-br from-[#1a1a1a] to-[#1f1f1f] border border-gray-700/50 rounded-xl p-4 hover:border-[#F20732]/50 transition-all duration-300 overflow-hidden"
            >
              {/* Hover gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#F20732]/0 via-[#F20746]/8 to-[#F20732]/0 opacity-0 group-hover/stat:opacity-100 transition-opacity duration-300" />
              
              {/* Content */}
              <div className="relative flex flex-col items-center text-center">
                {/* Icon */}
                <div 
                  className="mb-2.5 p-2 rounded-lg transition-all duration-300 group-hover/stat:scale-110"
                  style={{ 
                    backgroundColor: `${stat.color}20`,
                    color: stat.color
                  }}
                >
                  {stat.icon}
                </div>
                
                {/* Value */}
                <div className="text-xl font-black text-white mb-1 tracking-tight">
                  {stat.value}
                </div>
                
                {/* Label */}
                <div className="text-[10px] font-bold tracking-[0.15em] uppercase" style={{ color: `${stat.color}99` }}>
                  {stat.label}
                </div>
              </div>

              {/* Corner accent */}
              <div 
                className="absolute bottom-0 right-0 w-16 h-16 opacity-10 group-hover/stat:opacity-20 transition-opacity duration-300" 
                style={{ backgroundColor: stat.color, clipPath: 'polygon(100% 0, 100% 100%, 0 100%)' }}
              />
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes shimmer {
          0%, 100% { transform: translateX(-100%) skewX(-12deg); }
          50% { transform: translateX(100%) skewX(-12deg); }
        }
      `}</style>
    </section>
  );
};

export default GlobalFabricMap;

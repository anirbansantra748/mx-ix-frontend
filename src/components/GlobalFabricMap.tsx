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
  coordinates: [number, number]; // [lng, lat]
  code: string;
};

const locations: Location[] = [
  { id: "nyc", name: "New York", coordinates: [-74.006, 40.7128], code: "NYC_CORE" },
  { id: "sfo", name: "San Francisco", coordinates: [-122.4194, 37.7749], code: "SFO_GATE" },
  { id: "ams", name: "Amsterdam", coordinates: [4.9041, 52.3676], code: "AMS_IX" },
  { id: "lon", name: "London", coordinates: [-0.1276, 51.5072], code: "LON_X" },
  { id: "frk", name: "Frankfurt", coordinates: [8.6821, 50.1109], code: "FRA_HUB" },
  { id: "bom", name: "Mumbai", coordinates: [72.8777, 19.076], code: "BOM_WEST" },
  { id: "sgp", name: "Singapore", coordinates: [103.8198, 1.3521], code: "SIN_NODE" },
  { id: "tyo", name: "Tokyo", coordinates: [139.6917, 35.6895], code: "TYO_CNTR" },
  { id: "sao", name: "São Paulo", coordinates: [-46.6333, -23.5505], code: "GRU_SOUTH" },
  { id: "syd", name: "Sydney", coordinates: [151.2093, -33.8688], code: "SYD_EAST" },
];

const GlobalFabricMap = () => {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const isVisible = (id: string) => activeId === id || hoveredId === id;

  return (
    <section className="relative w-full bg-black py-24 overflow-hidden">
      {/* Background Textures & Gradients */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-[#F20732]/20 via-transparent to-transparent"></div>
      
      <div className="max-w-[1600px] mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="inline-flex items-center gap-3 mb-10">
          <div className="w-2 h-2 rounded-full bg-[#F20732] animate-pulse" />
          <span className="font-mono text-xs font-bold tracking-[0.2em] text-[#F20732] uppercase">
            Global Network
          </span>
        </div>
        <h2 className="text-white text-5xl md:text-7xl font-black tracking-tighter mb-12">
          Global <span className="text-[#F20732]">Locations</span>
        </h2>

        {/* Map Container */}
        <div className="relative bg-[#0b0b0b] border border-[#1a1a1a] overflow-hidden">
          <ComposableMap
            projection="geoMercator"
            className="w-full h-[520px]"
            projectionConfig={{ scale: 130 }}
          >
            <Geographies geography={GEO_URL}>
              {({ geographies }) =>
                geographies.map((geo) => (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill="#111111"
                    stroke="#222222"
                    strokeWidth={0.5}
                  />
                ))
              }
            </Geographies>

            {/* Markers */}
            {locations.map((loc) => (
              <Marker
                key={loc.id}
                coordinates={loc.coordinates}
                onMouseEnter={() => setHoveredId(loc.id)}
                onMouseLeave={() => setHoveredId(null)}
                onClick={() =>
                  setActiveId(activeId === loc.id ? null : loc.id)
                }
              >
                {/* Larger invisible hit area for easier hovering */}
                <circle
                  r={16}
                  fill="transparent"
                  className="cursor-pointer"
                />

                {/* Visible Dot */}
                <circle
                  r={4}
                  fill="#F20732"
                  className="cursor-pointer pointer-events-none"
                />

                {/* Pulse */}
                {isVisible(loc.id) && (
                  <circle
                    r={10}
                    fill="none"
                    stroke="#F20732"
                    strokeWidth={1}
                    className="animate-ping pointer-events-none"
                  />
                )}

                {/* Info Card */}
                {isVisible(loc.id) && (
                  <foreignObject 
                    x={10} 
                    y={-35} 
                    width={160} 
                    height={90}
                    onMouseEnter={() => setHoveredId(loc.id)}
                    onMouseLeave={() => setHoveredId(null)}
                  >
                    <div className="relative bg-white border border-black shadow-xl cursor-pointer">
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#F20732]" />
                      <div className="pl-4 pr-4 py-3">
                        <p className="text-[9px] tracking-widest text-gray-500">
                          LOCATION
                        </p>
                        <p className="text-sm font-black uppercase text-black leading-tight">
                          {loc.name}
                        </p>

                        <div className="mt-2 flex justify-between items-center">
                          <span className="font-mono text-[10px] text-gray-700">
                            {loc.code}
                          </span>
                          <span className="text-[10px] font-bold text-[#F20732]">
                            ONLINE
                          </span>
                        </div>
                      </div>
                    </div>
                  </foreignObject>
                )}
              </Marker>
            ))}
          </ComposableMap>

          {/* Footer */}
          <div className="absolute bottom-4 left-4 text-[9px] text-gray-500 tracking-widest font-mono">
            MERCATOR · GLOBAL NETWORK
          </div>
        </div>
      </div>
    </section>
  );
};

export default GlobalFabricMap;

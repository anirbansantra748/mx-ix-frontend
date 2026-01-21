import React, { useEffect, useState, useCallback } from "react";
import { grafanaApi } from "../services/api";

const BAR_COUNT = 100;

interface TrafficData {
  currentTraffic: number;
  unit: string;
  peakTraffic: number;
  avgTraffic: number;
  source: string;
  details?: {
    inbound: number;
    outbound: number;
  };
}

const generateInitialBars = () => {
  const bars = [];
  for (let i = 0; i < BAR_COUNT; i++) {
    const wave = Math.sin(i * 0.15) * 20;
    const random = Math.random() * 30;
    const base = 25;
    const height = Math.max(20, Math.min(75, base + wave + random));
    bars.push(height);
  }
  return bars;
};

const RealTimeCapacity = () => {
  const [bars, setBars] = useState<number[]>(generateInitialBars);
  const [trafficData, setTrafficData] = useState<TrafficData | null>(null);
  const [isLive, setIsLive] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);

  // Fetch real traffic data from Grafana
  const fetchTrafficData = useCallback(async () => {
    try {
      const result = await grafanaApi.getTraffic();
      if (result.success && result.data) {
        setTrafficData(result.data);
        setIsLive(result.data.source === 'grafana');
        setLastUpdate(new Date());
        
        // Update bars based on real traffic patterns
        if (result.data.source === 'grafana') {
          const baseHeight = Math.min(75, Math.max(20, (result.data.currentTraffic / result.data.peakTraffic) * 60 + 15));
          setBars(prev => 
            prev.map((_, idx) => {
              const wave = Math.sin((idx + Date.now() / 1000) * 0.1) * 15;
              const random = (Math.random() - 0.5) * 10;
              return Math.min(75, Math.max(20, baseHeight + wave + random));
            })
          );
        }
      }
    } catch (error) {
      console.error('Failed to fetch traffic data:', error);
    }
  }, []);

  useEffect(() => {
    // Initial fetch
    fetchTrafficData();
    
    // Refresh every 5 seconds for real-time updates
    const interval = setInterval(fetchTrafficData, 5000);
    
    return () => clearInterval(interval);
  }, [fetchTrafficData]);

  // Animate bars continuously
  useEffect(() => {
    const animationInterval = setInterval(() => {
      setBars(prev =>
        prev.map(h => {
          const delta = (Math.random() - 0.5) * 3;
          return Math.min(75, Math.max(20, h + delta));
        })
      );
    }, 100);

    return () => clearInterval(animationInterval);
  }, []);

  // Format traffic value
  const formatTraffic = (value: number | undefined) => {
    if (!value) return '0';
    if (value >= 1000) {
      return (value / 1000).toFixed(1);
    }
    return value.toFixed(1);
  };

  const getTrafficUnit = (value: number | undefined) => {
    if (!value) return 'Gbps';
    if (value >= 1000) return 'Tbps';
    return 'Gbps';
  };

  const displayValue = trafficData?.currentTraffic || 0;
  const displayUnit = getTrafficUnit(displayValue);

  return (
    <section className="bg-white py-16 md:py-24 border-b border-gray-200 relative z-10">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        
        {/* Capacity Display - Centered */}
        <div className="text-center mb-12">
          <span className="text-[#F20732] font-mono text-xs tracking-[0.25em] uppercase">
            • REAL-TIME TRAFFIC •
          </span>
          <h2 className="text-7xl md:text-9xl font-black text-black mt-6 leading-none tracking-tighter">
            {formatTraffic(displayValue)}
            <span className="text-gray-300">{displayUnit}</span>
          </h2>
        </div>

        {/* Traffic Stats Cards - Inbound, Outbound, Peak */}
        {trafficData && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {/* Inbound */}
            <div className="relative group bg-gradient-to-br from-[#F20732]/5 to-white border-2 border-[#F20732]/20 p-8 hover:border-[#F20732] transition-all duration-300 overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-[#F20732] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-3 h-3 bg-[#F20732] rounded-full animate-pulse"></div>
                <span className="font-mono text-xs text-[#F20732] uppercase tracking-widest font-bold">Inbound</span>
              </div>
              <div className="text-5xl md:text-6xl font-light tracking-tighter text-black">
                {trafficData.details?.inbound?.toFixed(2) || '0.00'}
                <span className="text-xl text-gray-400 ml-2">Gbps</span>
              </div>
              <div className="mt-3 text-xs text-gray-500 font-mono">↓ Bits Received</div>
            </div>

            {/* Outbound */}
            <div className="relative group bg-gradient-to-br from-[#F20732]/5 to-white border-2 border-[#F20732]/20 p-8 hover:border-[#F20732] transition-all duration-300 overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-[#F20732] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-3 h-3 bg-[#F20732] rounded-full animate-pulse"></div>
                <span className="font-mono text-xs text-[#F20732] uppercase tracking-widest font-bold">Outbound</span>
              </div>
              <div className="text-5xl md:text-6xl font-light tracking-tighter text-black">
                {trafficData.details?.outbound?.toFixed(2) || '0.00'}
                <span className="text-xl text-gray-400 ml-2">Gbps</span>
              </div>
              <div className="mt-3 text-xs text-gray-500 font-mono">↑ Bits Sent</div>
            </div>

            {/* Peak */}
            <div className="relative group bg-gradient-to-br from-[#F20732]/5 to-white border-2 border-[#F20732]/20 p-8 hover:border-[#F20732] transition-all duration-300 overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-[#F20732] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-3 h-3 bg-[#F20732] rounded-full animate-pulse"></div>
                <span className="font-mono text-xs text-[#F20732] uppercase tracking-widest font-bold">Peak (24h)</span>
              </div>
              <div className="text-5xl md:text-6xl font-light tracking-tighter text-black">
                {trafficData.peakTraffic?.toFixed(2) || '0.00'}
                <span className="text-xl text-gray-400 ml-2">Gbps</span>
              </div>
              <div className="mt-3 text-xs text-gray-500 font-mono">Maximum observed</div>
            </div>
          </div>
        )}

        {/* Bars Container with LIVE FEED Badge */}
        <div className="bg-white border border-gray-200 p-2 md:p-4 mb-8 relative overflow-hidden group shadow-sm hover-trigger">
          
          {/* LIVE FEED Badge - Positioned Top Left */}
          <div className="absolute top-6 left-6 z-20 bg-white/80 backdrop-blur px-4 py-2 border border-gray-100 flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${isLive ? 'bg-[#F20732] animate-pulse' : 'bg-yellow-500'}`}></div>
            <span className={`font-mono text-xs font-bold ${isLive ? 'text-[#F20732]' : 'text-yellow-600'}`}>
              {isLive ? 'LIVE FROM GRAFANA' : 'SIMULATED DATA'}
            </span>
          </div>

          {/* Source Badge - Positioned Top Right */}
          <div className="absolute top-6 right-6 z-20 bg-white/80 backdrop-blur px-4 py-2 border border-gray-100">
            <span className="text-gray-500 font-mono text-[10px]">
              {lastUpdate ? `Updated: ${lastUpdate.toLocaleTimeString()}` : 'Loading...'}
            </span>
          </div>

          {/* Bars - Always Red (brand color) */}
          <div 
            className="relative flex items-end gap-[2px] bg-white"
            style={{ height: 320 }}
          >
            {bars.map((height, idx) => (
              <div 
                key={idx} 
                style={{ 
                  flex: '1 1 0%',
                  minWidth: '3px',
                  display: 'flex',
                  alignItems: 'flex-end'
                }}
              >
                <div
                  style={{ 
                    width: '100%',
                    height: `${(height / 100) * 320}px`,
                    background: 'linear-gradient(to top, rgba(255, 255, 255, 0.9), #FFB3C1, #FF6B88, #F20732, #E01030)',
                    transition: 'height 0.1s ease-out'
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Data Source Info */}
        <div className="text-center">
          <p className="text-gray-400 font-mono text-xs">
            {isLive ? (
              <>Data sourced from <span className="text-[#F20732] font-bold">Grafana/Zabbix</span> (LVSB SW-01, MB2 SW-01)</>
            ) : (
              <>Fallback mode - Grafana connection unavailable</>
            )}
          </p>
        </div>

      </div>
    </section>
  );
};

export default RealTimeCapacity;

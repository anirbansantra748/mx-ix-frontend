import React, { useEffect, useState } from "react";

const BAR_COUNT = 100;

const generateInitialBars = () => {
  const bars = [];
  for (let i = 0; i < BAR_COUNT; i++) {
    // Create wave-like pattern with varied heights
    const wave = Math.sin(i * 0.15) * 20; // Smooth wave
    const random = Math.random() * 30; // Random variation
    const base = 25; // Minimum height
    const height = Math.max(20, Math.min(75, base + wave + random));
    bars.push(height);
  }
  return bars;
};

const RealTimeCapacity = () => {
  const [bars, setBars] = useState<number[]>(generateInitialBars);
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    // Animate only for the first 3 seconds
    const interval = setInterval(() => {
      setBars(prev =>
        prev.map(h => {
          const delta = (Math.random() - 0.5) * 5;
          return Math.min(75, Math.max(20, h + delta));
        })
      );
    }, 800);

    // Stop animation after 3 seconds
    const timeout = setTimeout(() => {
      setIsAnimating(false);
      clearInterval(interval);
    }, 3000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <section className="bg-white py-16 md:py-24 border-b border-gray-200 relative z-10">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        
        {/* Capacity Display - Centered */}
        <div className="text-center mb-16">
          <span className="text-[#F20732] font-mono text-xs tracking-[0.25em] uppercase">
            • REAL-TIME CAPACITY •
          </span>
          <h2 className="text-7xl md:text-9xl font-black text-black mt-6 leading-none tracking-tighter">
            124<span className="text-gray-300">Tbps</span>
          </h2>
        </div>

        {/* Bars Container with LIVE FEED Badge */}
        <div className="bg-white border border-gray-200 p-2 md:p-4 mb-16 relative overflow-hidden group shadow-sm hover-trigger">
          
          {/* LIVE FEED Badge - Positioned Top Left */}
          <div className="absolute top-6 left-6 z-20 bg-white/80 backdrop-blur px-4 py-2 border border-gray-100">
            <span className="text-[#F20732] font-mono text-xs font-bold">LIVE FEED</span>
          </div>

          {/* Bars */}
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
                    transition: isAnimating ? 'height 0.6s cubic-bezier(0.22, 1, 0.36, 1)' : 'none'
                  }}
                />
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default RealTimeCapacity;

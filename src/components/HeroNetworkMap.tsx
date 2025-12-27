import React from 'react';

const HeroNetworkMap: React.FC = () => {
  return (
    <div className="relative w-full h-full bg-gradient-to-br from-gray-50 to-white overflow-hidden">
      {/* High-quality static world map image */}
      <img 
        src="/assets/world-map-network.png"
        alt="Global Network Map" 
        className="w-full h-full object-contain"
        style={{ 
          objectFit: 'contain',
          objectPosition: 'center',
          maxWidth: '100%',
          maxHeight: '100%'
        }}
        onError={(e) => {
          console.error('Failed to load world map image');
          e.currentTarget.style.display = 'none';
        }}
      />
    </div>
  );
};

export default HeroNetworkMap;

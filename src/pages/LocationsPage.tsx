import React from 'react';

interface LocationData {
  id: string;
  name: string;
  region: string;
  status: 'active' | 'maintenance' | 'planned';
  latency: string;
}

const LocationsPage = ({ locations }: { locations: LocationData[] }) => {
  const [selected, setSelected] = React.useState<string | null>(null);
  
  return (
    <section className="pt-32 pb-20 min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-5">
           <span className="text-[#F20732] font-mono text-xs tracking-[0.25em] uppercase block mb-6">:: GLOBAL TOPOLOGY</span>
           <h1 className="text-6xl font-black mb-12 text-black">LOCATIONS</h1>
           <div className="space-y-2">
             {locations.map((loc) => (
               <div 
                 key={loc.id}
                 onClick={() => setSelected(loc.id)}
                 className={`p-6 border border-gray-200 cursor-pointer hover-trigger transition-all ${selected === loc.id ? 'bg-black text-white border-black' : 'bg-white hover:border-[#F20732]'}`}
               >
                 <div className="flex justify-between items-center">
                   <h3 className="text-xl font-bold">{loc.name}</h3>
                   <span className={`font-mono text-xs px-2 py-1 rounded ${loc.status === 'active' ? 'bg-[#F20732] text-white' : 'bg-gray-200 text-gray-500'}`}>
                     {loc.status.toUpperCase()}
                   </span>
                 </div>
                 <div className="mt-2 font-mono text-xs opacity-60">{loc.region} // {loc.latency}</div>
               </div>
             ))}
           </div>
        </div>
        <div className="lg:col-span-7 bg-gray-50 border border-gray-200 p-8 flex items-center justify-center relative overflow-hidden">
           {selected ? (
             <div className="text-center">
               <h2 className="text-5xl font-black mb-4 text-[#F20732]">{locations.find(l => l.id === selected)?.name}</h2>
               <div className="grid grid-cols-2 gap-8 text-left mt-12 max-w-md mx-auto">
                 <div>
                   <span className="block font-mono text-xs text-gray-400 mb-1">FACILITY TYPE</span>
                   <span className="font-bold">Tier IV Datacenter</span>
                 </div>
                 <div>
                   <span className="block font-mono text-xs text-gray-400 mb-1">CAPACITY</span>
                   <span className="font-bold">40 Tbps</span>
                 </div>
                 <div>
                   <span className="block font-mono text-xs text-gray-400 mb-1">INTERCONNECTIONS</span>
                   <span className="font-bold">400+ Networks</span>
                 </div>
                 <div>
                   <span className="block font-mono text-xs text-gray-400 mb-1">POWER</span>
                   <span className="font-bold">100% Renewable</span>
                 </div>
               </div>
             </div>
           ) : (
             <div className="text-gray-400 font-mono text-sm text-center">
               SELECT A LOCATION FROM THE LIST<br/>TO VIEW FACILITY DETAILS
             </div>
           )}
        </div>
      </div>
    </section>
  );
};

export default LocationsPage;

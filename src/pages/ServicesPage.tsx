import React from 'react';

const ServicesPage = () => {
  const serviceCategories = [
    {
      title: "Peering",
      id: "peering",
      services: [
        { 
          name: "Internet Peering", 
          desc: "Direct route optimization via route servers.",
          icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg> 
        },
        { 
          name: "Mobile Peering", 
          desc: "GPRS Roaming and 3G/4G/5G offloading.",
          icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><path d="M12 18h.01"/></svg>
        }
      ]
    },
    {
      title: "Private Connectivity",
      id: "private",
      services: [
        { 
          name: "Private Interconnect", 
          desc: "Dedicated VLANs for mission-critical traffic.",
          icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg> 
        },
        { 
          name: "Closed User Group", 
          desc: "Secure ecosystem for specific industry verticals.",
          icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg> 
        },
        { 
          name: "Data Centre Interconnect", 
          desc: "Layer 2 point-to-point between facilities.",
          icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="2" width="20" height="8" rx="2" ry="2"/><rect x="2" y="14" width="20" height="8" rx="2" ry="2"/><line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/></svg> 
        }
      ]
    },
    {
      title: "Access",
      id: "access",
      services: [
        { 
          name: "EasyAccess", 
          desc: "Simplified port provisioning for remote networks.",
          icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><polyline points="10 17 15 12 10 7"/><line x1="15" y1="12" x2="3" y2="12"/></svg> 
        },
        { 
          name: "Remote Peering", 
          desc: "Reach global exchanges without physical presence.",
          icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg> 
        },
        { 
          name: "Cross-IX", 
          desc: "Seamless interconnection between disparate IXs.",
          icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><line x1="6" y1="3" x2="6" y2="15"/><circle cx="18" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M18 9a9 9 0 0 1-9 9"/></svg> 
        }
      ]
    },
    {
      title: "Infrastructure & Consultancy",
      id: "infra",
      services: [
        { 
          name: "IX-as-a-Service", 
          desc: "White-label exchange infrastructure management.",
          icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="4" y="4" width="16" height="16" rx="2" ry="2"/><rect x="9" y="9" width="6" height="6"/><line x1="9" y1="1" x2="9" y2="4"/><line x1="15" y1="1" x2="15" y2="4"/><line x1="9" y1="20" x2="9" y2="23"/><line x1="15" y1="20" x2="15" y2="23"/><line x1="20" y1="9" x2="23" y2="9"/><line x1="20" y1="14" x2="23" y2="14"/><line x1="1" y1="9" x2="4" y2="9"/><line x1="1" y1="14" x2="4" y2="14"/></svg> 
        },
        { 
          name: "BGP Peering Training", 
          desc: "Expert-led workshops on routing optimization.",
          icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg> 
        },
        { 
          name: "Innovation Services", 
          desc: "R&D partnership for next-gen network protocols.",
          icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg> 
        }
      ]
    },
    {
      title: "Cloud & Security",
      id: "cloud",
      services: [
        { 
          name: "Cloud Access", 
          desc: "Direct on-ramps to AWS, Azure, and Google Cloud.",
          icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/></svg> 
        },
        { 
          name: "Anti-DDoS", 
          desc: "Real-time volumetric attack mitigation.",
          icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg> 
        }
      ]
    }
  ];

  return (
    <section className="pt-32 pb-40 min-h-screen bg-white relative">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none"></div>

      <div className="max-w-[1800px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-20 relative z-10">
        
        {/* Sticky Sidebar */}
        <div className="lg:col-span-3 hidden lg:block h-full">
           <div className="sticky top-40">
              <div className="mb-8">
                 <span className="text-[#F20732] font-mono text-[10px] tracking-[0.3em] uppercase font-bold block mb-3 pl-1">Service Index</span>
                 <h3 className="font-black text-4xl text-black tracking-tighter leading-none">CAPABILITIES<br/><span className="text-gray-300">CATALOG</span></h3>
              </div>
              <nav className="space-y-0 relative border-l border-gray-200">
                {serviceCategories.map((cat, idx) => (
                   <a key={idx} href={`#cat-${cat.id}`} className="flex items-center group py-4 pl-6 border-l-2 border-transparent hover:border-[#F20732] transition-all duration-300">
                      <span className="font-mono text-xs text-gray-400 group-hover:text-[#F20732] transition-colors w-8">0{idx + 1}</span>
                      <span className="text-sm font-bold text-gray-500 group-hover:text-black uppercase tracking-widest transition-colors">{cat.title}</span>
                   </a>
                ))}
              </nav>
           </div>
        </div>

        {/* Content Area */}
        <div className="lg:col-span-9 space-y-32">
           {serviceCategories.map((category, idx) => (
              <div key={idx} id={`cat-${category.id}`} className="scroll-mt-32">
                 {/* Category Header */}
                 <div className="flex flex-col md:flex-row md:items-end gap-6 mb-12 border-b-2 border-black pb-8">
                    <span className="text-white bg-black font-mono text-xl font-bold px-4 py-2">0{idx + 1}</span>
                    <h2 className="text-5xl md:text-7xl font-black text-black leading-none uppercase tracking-tighter">{category.title}</h2>
                 </div>
                 
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {category.services.map((service, sIdx) => (
                       <div key={sIdx} className="group relative bg-white h-full hover-trigger">
                          {/* Tech Borders */}
                          <div className="absolute inset-0 border border-gray-200 transition-colors duration-500 group-hover:border-black/50"></div>
                          
                          {/* Animated Corner Brackets */}
                          <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                             <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-black opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:w-8 group-hover:h-8"></div>
                             <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-black opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:w-8 group-hover:h-8"></div>
                             <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-black opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:w-8 group-hover:h-8"></div>
                             <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[#F20732] opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:w-8 group-hover:h-8"></div>
                          </div>

                          <div className="p-10 flex flex-col h-full relative z-10">
                             {/* Header */}
                             <div className="flex justify-between items-start mb-8">
                                <div className="p-3 bg-gray-50 group-hover:bg-[#F20732] group-hover:text-white transition-colors duration-500">
                                   {service.icon}
                                </div>
                                <div className="text-right">
                                   <span className="block font-mono text-[10px] text-gray-400 uppercase mb-1">Service ID</span>
                                   <span className="block font-mono text-xs font-bold text-black">SRV-{idx}{sIdx}</span>
                                </div>
                             </div>

                             {/* Body */}
                             <div className="flex-1">
                                <h3 className="text-3xl font-black text-black mb-4 group-hover:translate-x-2 transition-transform duration-300">{service.name}</h3>
                                <p className="text-gray-500 text-base leading-relaxed group-hover:text-black transition-colors duration-300">{service.desc}</p>
                             </div>

                             {/* Footer Action */}
                             <div className="mt-10 pt-6 border-t border-gray-100 flex justify-between items-center group-hover:border-gray-200">
                                <div className="flex items-center gap-2">
                                   <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                                   <span className="font-mono text-[10px] font-bold uppercase text-gray-400">System Ready</span>
                                </div>
                                <span className="text-[#F20732] font-mono text-xs font-bold opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all duration-300">CONFIGURE →</span>
                             </div>
                          </div>
                       </div>
                    ))}
                 </div>
              </div>
           ))}
        </div>

      </div>
    </section>
  );
};

export default ServicesPage;

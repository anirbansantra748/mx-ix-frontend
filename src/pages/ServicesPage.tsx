import React, { useState, useEffect } from 'react';

const ServicesPage = () => {
  const [expandedService, setExpandedService] = useState<string | null>(null);

  // Add dark nav class on mount, remove on unmount
  useEffect(() => {
    document.body.classList.add('dark-nav');
    return () => {
      document.body.classList.remove('dark-nav');
    };
  }, []);

  const services = [
    {
      category: "Peering",
      id: "peering",
      tagline: "Direct Interconnection at Scale",
      description: "Establish direct peering relationships with the world's leading networks and content providers.",
      image: "/assets/peering_service_hero_1766400451669.png",
      items: [
        {
          name: "Internet Peering",
          icon: <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>,
          description: "Connect directly to thousands of networks through our route servers, eliminating expensive transit costs.",
          benefits: [
            "Reduced latency by up to 60%",
            "Save up to 80% on bandwidth costs",
            "Automated BGP session management",
            "24/7 network operations support"
          ],
          features: [
            "Multi-lateral peering",
            "Bilateral peering options",
            "IPv4 & IPv6 support",
            "Real-time traffic analytics"
          ]
        },
        {
          name: "Mobile Peering",
          icon: <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><path d="M12 18h.01"/></svg>,
          description: "Optimize mobile data traffic with dedicated GPRS roaming and 4G/5G offloading capabilities.",
          benefits: [
            "Faster mobile content delivery",
            "Improved roaming experience",
            "Reduced international transit costs",
            "Enhanced QoS for mobile traffic"
          ],
          features: [
            "GPRS/3G/4G/5G support",
            "Direct carrier interconnection",
            "MMS & SMS optimization",
            "Mobile CDN integration"
          ]
        }
      ]
    },
    {
      category: "Private Connectivity",
      id: "private",
      tagline: "Secure Dedicated Infrastructure",
      description: "Enterprise-grade private connections for mission-critical applications and data transfer.",
      image: "/assets/private_connectivity_hero_1766400468118.png",
      items: [
        {
          name: "Private Interconnect",
          icon: <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>,
          description: "Dedicated VLANs providing isolated, high-bandwidth connections between your networks.",
          benefits: [
            "Guaranteed bandwidth with SLA",
            "Complete traffic isolation",
            "Sub-millisecond latency",
            "Flexible bandwidth scaling"
          ],
          features: [
            "10G to 400G ports",
            "Layer 2 & Layer 3 options",
            "MPLS integration",
            "Encryption support"
          ]
        },
        {
          name: "Closed User Group",
          icon: <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
          description: "Secure ecosystem for specific industry verticals like finance, healthcare, and government.",
          benefits: [
            "100% private network fabric",
            "Compliance-ready infrastructure",
            "Industry-specific security",
            "Controlled access management"
          ],
          features: [
            "Multi-tenant isolation",
            "Advanced authentication",
            "Audit trail logging",
            "Custom routing policies"
          ]
        },
        {
          name: "Data Centre Interconnect",
          icon: <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="2" width="20" height="8" rx="2" ry="2"/><rect x="2" y="14" width="20" height="8" rx="2" ry="2"/><line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/></svg>,
          description: "High-speed Layer 2 point-to-point connections between data centers for seamless workload distribution.",
          benefits: [
            "Ultra-low latency (<1ms)",
            "High availability (99.99% uptime)",
            "Active-active data center setups",
            "Disaster recovery ready"
          ],
          features: [
            "Dark fiber options",
            "Wavelength services",
            "Metro & long-haul links",
            "Redundant path protection"
          ]
        }
      ]
    },
    {
      category: "Access",
      id: "access",
      tagline: "Global Reach, Local Presence",
      description: "Seamless connectivity to internet exchanges worldwide, without physical infrastructure.",
      image: "/assets/access_service_hero_1766400541443.png",
      items: [
        {
          name: "EasyAccess",
          icon: <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><polyline points="10 17 15 12 10 7"/><line x1="15" y1="12" x2="3" y2="12"/></svg>,
          description: "Simplified port provisioning for remote networks with automated setup and configuration.",
          benefits: [
            "5-minute port activation",
            "Self-service portal",
            "Pay-as-you-grow pricing",
            "No long-term commitments"
          ],
          features: [
            "1G to 100G ports",
            "Instant provisioning",
            "Web-based management",
            "Usage analytics dashboard"
          ]
        },
        {
          name: "Remote Peering",
          icon: <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>,
          description: "Reach 200+ global internet exchanges without physical presence, via our distributed PoP network.",
          benefits: [
            "Access to 200+ IXPs globally",
            "No on-site equipment needed",
            "Reduced operational costs",
            "Multi-IX redundancy"
          ],
          features: [
            "Virtual port allocation",
            "BGP session aggregation",
            "Global PoP network",
            "Centralized billing"
          ]
        },
        {
          name: "Cross-IX",
          icon: <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><line x1="6" y1="3" x2="6" y2="15"/><circle cx="18" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M18 9a9 9 0 0 1-9 9"/></svg>,
          description: "Seamless interconnection between disparate internet exchanges for unified peering strategy.",
          benefits: [
            "Unified peering across IXes",
            "Simplified route management",
            "Cost optimization",
            "Enhanced redundancy"
          ],
          features: [
            "Multi-IX routing",
            "Traffic engineering",
            "Single pane of glass",
            "Automated failover"
          ]
        }
      ]
    },
    {
      category: "Infrastructure & Consultancy",
      id: "infrastructure",
      tagline: "Expert Guidance & Managed Solutions",
      description: "Comprehensive infrastructure management and training services for network excellence.",
      image: "/assets/infrastructure_service_hero_1766400524058.png",
      items: [
        {
          name: "IX-as-a-Service",
          icon: <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="4" y="4" width="16" height="16" rx="2" ry="2"/><rect x="9" y="9" width="6" height="6"/><line x1="9" y1="1" x2="9" y2="4"/><line x1="15" y1="1" x2="15" y2="4"/><line x1="9" y1="20" x2="9" y2="23"/><line x1="15" y1="20" x2="15" y2="23"/><line x1="20" y1="9" x2="23" y2="9"/><line x1="20" y1="14" x2="23" y2="14"/><line x1="1" y1="9" x2="4" y2="9"/><line x1="1" y1="14" x2="4" y2="14"/></svg>,
          description: "White-label exchange infrastructure management - we build and operate your IX platform.",
          benefits: [
            "Full IX infrastructure",
            "24/7 NOC operations",
            "White-label branding",
            "Turnkey solution"
          ],
          features: [
            "Route server management",
            "Member portal",
            "Traffic statistics",
            "Custom integrations"
          ]
        },
        {
          name: "BGP Peering Training",
          icon: <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>,
          description: "Expert-led workshops and certification programs on BGP routing and peering optimization.",
          benefits: [
            "Industry-recognized certification",
            "Hands-on lab environment",
            "Expert instructors",
            "Ongoing support"
          ],
          features: [
            "Beginner to advanced tracks",
            "Real-world scenarios",
            "Virtual & on-site training",
            "Custom curriculum"
          ]
        },
        {
          name: "Innovation Services",
          icon: <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
          description: "R&D partnership programs for developing and testing next-generation network protocols.",
          benefits: [
            "Early access to new tech",
            "Joint development programs",
            "Testing infrastructure",
            "Innovation roadmap alignment"
          ],
          features: [
            "QUIC protocol testing",
            "IPv6 migration support",
            "SD-WAN integration",
            "AI-driven routing R&D"
          ]
        }
      ]
    },
    {
      category: "Cloud",
      id: "cloud",
      tagline: "Direct Path to Cloud Providers",
      description: "Low-latency, high-bandwidth connections directly to major cloud service providers.",
      image: "/assets/cloud_access_hero_1766400488264.png",
      items: [
        {
          name: "Cloud Access",
          icon: <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/></svg>,
          description: "Direct on-ramps to AWS, Microsoft Azure, Google Cloud, and Oracle Cloud infrastructure.",
          benefits: [
            "Bypass public internet",
            "Predictable performance",
            "Reduced egress costs",
            "Enhanced security"
          ],
          features: [
            "AWS Direct Connect",
            "Azure ExpressRoute",
            "Google Cloud Interconnect",
            "Multi-cloud connectivity"
          ]
        }
      ]
    },
    {
      category: "Security",
      id: "security",
      tagline: "Advanced Threat Protection",
      description: "Enterprise-grade DDoS mitigation and security services to protect your infrastructure.",
      image: "/assets/anti_ddos_hero_1766400506277.png",
      items: [
        {
          name: "Anti-DDoS",
          icon: <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>,
          description: "Real-time volumetric attack mitigation with ML-powered threat detection and automated response.",
          benefits: [
            "Scrubbing capacity: 10+ Tbps",
            "Detection time: <30 seconds",
            "Mitigation time: <60 seconds",
            "Zero false positives"
          ],
          features: [
            "Layer 3-7 protection",
            "Always-on monitoring",
            "Instant traffic rerouting",
            "Post-attack analytics"
          ],
          stats: [
            { label: "Attacks Mitigated", value: "50K+", period: "annually" },
            { label: "Peak Protection", value: "10 Tbps", period: "capacity" },
            { label: "Response Time", value: "<60s", period: "average" }
          ]
        }
      ]
    }
  ];

  const toggleService = (serviceId: string) => {
    setExpandedService(expandedService === serviceId ? null : serviceId);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-black text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-[#F20732]/20 via-transparent to-transparent"></div>
        
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-2 h-2 rounded-full bg-[#F20732] animate-pulse"></div>
            <span className="font-mono text-xs font-bold tracking-[0.2em] text-[#F20732] uppercase">
              Service Portfolio
            </span>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-black leading-tight tracking-tighter mb-8">
            OUR <span className="text-[#F20732]">SERVICES</span>
          </h1>
          
          <p className="max-w-3xl text-gray-300 text-xl leading-relaxed mb-12">
            Comprehensive infrastructure solutions engineered for performance, security, 
            and global scale. From peering to cloud connectivity, we provide the foundation 
            for your network's success.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-12 border-t border-gray-800">
            <div>
              <div className="text-4xl font-light tracking-tighter mb-2">6</div>
              <div className="font-mono text-xs text-gray-400 uppercase tracking-widest">Service Categories</div>
            </div>
            <div>
              <div className="text-4xl font-light tracking-tighter mb-2">14</div>
              <div className="font-mono text-xs text-gray-400 uppercase tracking-widest">Solutions</div>
            </div>
            <div>
              <div className="text-4xl font-light tracking-tighter mb-2">200+</div>
              <div className="font-mono text-xs text-gray-400 uppercase tracking-widest">Global PoPs</div>
            </div>
            <div>
              <div className="text-4xl font-light tracking-tighter mb-2">24/7</div>
              <div className="font-mono text-xs text-gray-400 uppercase tracking-widest">Expert Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Sections */}
      <div className="relative">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] bg-[size:64px_64px]"></div>
        
        {services.map((service, idx) => (
          <section key={idx} id={service.id} className="relative py-24 scroll-mt-20">
            <div className="max-w-7xl mx-auto px-6 md:px-12">
              {/* Category Header */}
              <div className="mb-16">
                <div className="flex items-center gap-6 mb-8">
                  <span className="bg-black text-white font-mono text-sm font-bold px-4 py-2 min-w-[60px] text-center">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-black mb-2">
                      {service.category}
                    </h2>
                    <p className="text-xl text-[#F20732] font-bold">{service.tagline}</p>
                  </div>
                </div>
                <p className="text-lg text-gray-600 max-w-3xl border-l-2 border-gray-200 pl-6">
                  {service.description}
                </p>
              </div>

              {/* Service Items */}
              <div className="space-y-8">
                {service.items.map((item, itemIdx) => {
                  const serviceId = `${service.id}-${itemIdx}`;
                  const isExpanded = expandedService === serviceId;
                  
                  return (
                    <div 
                      key={itemIdx}
                      className="bg-white border border-gray-200 hover:border-black transition-all duration-300 group"
                    >
                      {/* Service Header - Always Visible */}
                      <button
                        onClick={() => toggleService(serviceId)}
                        className="w-full p-8 md:p-12 flex items-start gap-6 text-left hover-trigger"
                      >
                        <div className="flex-shrink-0 p-4 bg-gray-50 group-hover:bg-[#F20732] group-hover:text-white transition-all duration-500">
                          {item.icon}
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-start justify-between gap-4 mb-4">
                            <h3 className="text-3xl md:text-4xl font-black tracking-tighter text-black">
                              {item.name}
                            </h3>
                            <div className="flex items-center gap-2 text-[#F20732] font-mono text-sm font-bold">
                              {isExpanded ? 'HIDE DETAILS' : 'VIEW DETAILS'}
                              <svg 
                                className={`w-5 h-5 transform transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
                                fill="none" 
                                viewBox="0 0 24 24" 
                                stroke="currentColor"
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                              </svg>
                            </div>
                          </div>
                          <p className="text-gray-600 text-lg leading-relaxed">
                            {item.description}
                          </p>
                        </div>
                      </button>

                      {/* Expandable Details */}
                      <div 
                        className={`overflow-hidden transition-all duration-500 ${
                          isExpanded ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
                        }`}
                      >
                        <div className="px-8 md:px-12 pb-12 pt-4 border-t border-gray-100">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                            {/* Benefits */}
                            <div>
                              <h4 className="text-xl font-black text-black mb-6 flex items-center gap-3">
                                <div className="w-1 h-6 bg-[#F20732]"></div>
                                Key Benefits
                              </h4>
                              <ul className="space-y-4">
                                {item.benefits.map((benefit, bIdx) => (
                                  <li key={bIdx} className="flex items-start gap-3">
                                    <svg className="w-5 h-5 text-[#F20732] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                                    </svg>
                                    <span className="text-gray-700 leading-relaxed">{benefit}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            {/* Features */}
                            <div>
                              <h4 className="text-xl font-black text-black mb-6 flex items-center gap-3">
                                <div className="w-1 h-6 bg-black"></div>
                                Technical Features
                              </h4>
                              <ul className="space-y-4">
                                {item.features.map((feature, fIdx) => (
                                  <li key={fIdx} className="flex items-start gap-3">
                                    <svg className="w-5 h-5 text-black flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                    </svg>
                                    <span className="text-gray-700 leading-relaxed">{feature}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>

                          {/* Stats if available */}
                          {item.stats && (
                            <div className="mt-12 pt-12 border-t border-gray-100">
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                {item.stats.map((stat, sIdx) => (
                                  <div key={sIdx} className="text-center p-6 bg-gray-50 hover:bg-black hover:text-white transition-all duration-300 group/stat">
                                    <div className="text-4xl font-light tracking-tighter mb-2 group-hover/stat:text-[#F20732]">
                                      {stat.value}
                                    </div>
                                    <div className="font-mono text-xs uppercase tracking-widest text-gray-400 group-hover/stat:text-gray-300">
                                      {stat.label}
                                    </div>
                                    <div className="font-mono text-[10px] text-gray-300 mt-1">
                                      {stat.period}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* CTA */}
                          <div className="mt-8 flex justify-end">
                            <button className="bg-black text-white px-8 py-4 font-mono text-xs font-bold uppercase tracking-widest hover:bg-[#F20732] transition-all duration-300 flex items-center gap-3 group/btn">
                              Get Started
                              <span className="group-hover/btn:translate-x-1 transition-transform">→</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        ))}
      </div>

      {/* CTA Section */}
      {/* <section className="relative py-24 bg-black text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 text-center">
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-8">
            Ready to <span className="text-[#F20732]">Transform</span><br/>Your Infrastructure?
          </h2>
          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
            Our team of experts is ready to help you design the perfect solution for your needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-[#F20732] text-white px-10 py-5 font-mono text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all duration-300">
              Schedule Consultation
            </button>
            <button className="bg-transparent border-2 border-white text-white px-10 py-5 font-mono text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all duration-300">
              Download Brochure
            </button>
          </div>
        </div>
      </section> */}
    </div>
  );
};

export default ServicesPage;

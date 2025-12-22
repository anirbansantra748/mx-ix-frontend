import React from 'react';

const AboutPage: React.FC = () => {
  return (
    <section className="relative min-h-screen pt-32 pb-20 bg-white">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] bg-[size:64px_64px]"></div>
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Header */}
        <div className="mb-16">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-2 h-2 rounded-full bg-[#F20732] animate-pulse"></div>
            <span className="font-mono text-xs font-bold tracking-[0.2em] text-[#F20732] uppercase">
              Our Story
            </span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black leading-tight tracking-tighter mb-6 text-black">
            ABOUT <span className="text-[#F20732]">MX-IX</span>
          </h1>
          
          <p className="max-w-2xl text-gray-500 text-lg leading-relaxed border-l-2 border-gray-100 pl-6">
            We're redefining the physical layer of the internet with AI-governed infrastructure 
            that predicts and adapts to network demands in real-time.
          </p>
        </div>

        {/* Content sections */}
        <div className="space-y-20">
          {/* Mission */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-black tracking-tighter mb-6 text-black">
                Our Mission
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-4">
                MX-IX was founded on the principle that internet infrastructure should be 
                intelligent, adaptive, and predictive. We've eliminated the concept of 
                "reactive" routing by integrating advanced AI models directly into our 
                switching fabric.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed">
                Our mission is to provide the world's most reliable, fastest, and smartest 
                internet exchange platform, enabling seamless global connectivity for 
                businesses of all sizes.
              </p>
            </div>
            <div className="bg-gray-50 border border-gray-200 p-12 relative group hover:border-black transition-all duration-300">
              <div className="absolute top-0 left-0 w-full h-1 bg-[#F20732] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
              <div className="space-y-8">
                <div>
                  <div className="text-5xl font-light tracking-tighter text-black mb-2">2019</div>
                  <div className="font-mono text-xs text-gray-400 uppercase tracking-widest">Founded</div>
                </div>
                <div>
                  <div className="text-5xl font-light tracking-tighter text-black mb-2">50+</div>
                  <div className="font-mono text-xs text-gray-400 uppercase tracking-widest">Countries</div>
                </div>
                <div>
                  <div className="text-5xl font-light tracking-tighter text-black mb-2">5000+</div>
                  <div className="font-mono text-xs text-gray-400 uppercase tracking-widest">Enterprise Clients</div>
                </div>
              </div>
            </div>
          </div>

          {/* Technology */}
          <div>
            <h2 className="text-4xl font-black tracking-tighter mb-8 text-black">
              Technology First
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white border border-gray-200 p-8 hover:border-black transition-all duration-300 group relative overflow-hidden hover-trigger">
                <div className="absolute top-0 left-0 w-full h-1 bg-[#F20732] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                <div className="mb-4">
                  <svg className="w-12 h-12 text-[#F20732]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-black tracking-tighter mb-3 text-black">AI-Powered Routing</h3>
                <p className="text-gray-600 leading-relaxed">
                  Machine learning models that predict traffic patterns and optimize 
                  routes before congestion occurs.
                </p>
              </div>

              <div className="bg-white border border-gray-200 p-8 hover:border-black transition-all duration-300 group relative overflow-hidden hover-trigger">
                <div className="absolute top-0 left-0 w-full h-1 bg-[#F20732] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left delay-75"></div>
                <div className="mb-4">
                  <svg className="w-12 h-12 text-[#F20732]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-black tracking-tighter mb-3 text-black">Ultra-Low Latency</h3>
                <p className="text-gray-600 leading-relaxed">
                  Sub-millisecond global latency through strategic PoP placement and 
                  advanced edge computing.
                </p>
              </div>

              <div className="bg-white border border-gray-200 p-8 hover:border-black transition-all duration-300 group relative overflow-hidden hover-trigger">
                <div className="absolute top-0 left-0 w-full h-1 bg-[#F20732] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left delay-150"></div>
                <div className="mb-4">
                  <svg className="w-12 h-12 text-[#F20732]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h3 className="text-xl font-black tracking-tighter mb-3 text-black">Enterprise Security</h3>
                <p className="text-gray-600 leading-relaxed">
                  Military-grade encryption and DDoS protection built into every layer 
                  of our infrastructure.
                </p>
              </div>
            </div>
          </div>

          {/* Values */}
          <div className="bg-black text-white p-12 md:p-16 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
            <div className="relative z-10">
              <h2 className="text-4xl font-black tracking-tighter mb-8">Our Values</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-bold mb-3 text-[#F20732]">Innovation</h3>
                  <p className="text-gray-300 leading-relaxed">
                    We continuously push the boundaries of what's possible in network infrastructure.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-3 text-[#F20732]">Reliability</h3>
                  <p className="text-gray-300 leading-relaxed">
                    99.99% uptime isn't a goal—it's our minimum standard for excellence.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-3 text-[#F20732]">Transparency</h3>
                  <p className="text-gray-300 leading-relaxed">
                    Real-time metrics and open communication with all our partners and clients.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-3 text-[#F20732]">Global Impact</h3>
                  <p className="text-gray-300 leading-relaxed">
                    Building infrastructure that connects people and businesses worldwide.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutPage;

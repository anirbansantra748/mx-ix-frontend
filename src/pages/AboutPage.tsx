import React from 'react';

const AboutPage = () => (
  <section className="pt-32 pb-20 min-h-screen bg-white">
    <div className="max-w-4xl mx-auto px-6">
      <span className="text-[#F20732] font-mono text-xs tracking-[0.25em] uppercase block mb-6">:: MISSION REPORT</span>
      <h1 className="text-6xl md:text-8xl font-black mb-12 text-black leading-tight">WE BUILD<br/>THE CORE.</h1>
      <div className="space-y-8 text-xl text-gray-600 leading-relaxed font-light">
        <p>Nexus IX started with a simple question: What happens when physical infrastructure can think?</p>
        <p>We are a team of network engineers, data scientists, and hardware specialists redefining the physical layer of the internet. By integrating predictive AI models directly into our switching fabric, we've eliminated the concept of "reactive" routing.</p>
        <div className="grid grid-cols-2 gap-8 py-12">
          <div className="border-l-4 border-[#F20732] pl-6">
            <h3 className="font-bold text-3xl text-black mb-2">2021</h3>
            <span className="font-mono text-sm uppercase">Foundation</span>
          </div>
          <div className="border-l-4 border-[#F20732] pl-6">
            <h3 className="font-bold text-3xl text-black mb-2">120+</h3>
            <span className="font-mono text-sm uppercase">Points of Presence</span>
          </div>
        </div>
        <p>Our mission is to create a self-healing, self-optimizing global network that scales faster than the demand of the AI revolution.</p>
      </div>
    </div>
  </section>
);

export default AboutPage;

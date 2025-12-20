import React from 'react';

const ContactPage = () => (
  <section className="pt-32 pb-20 min-h-screen bg-white">
    <div className="max-w-3xl mx-auto px-6">
      <span className="text-[#F20732] font-mono text-xs tracking-[0.25em] uppercase block mb-6">:: INITIALIZE PEERING</span>
      <h1 className="text-6xl font-black mb-12 text-black">CONTACT</h1>
      <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
        <div className="grid grid-cols-2 gap-8">
          <div className="space-y-2">
            <label className="font-mono text-xs uppercase font-bold text-gray-500">ASN / Company</label>
            <input type="text" className="w-full border-b-2 border-gray-200 py-3 focus:outline-none focus:border-[#F20732] hover-trigger transition-colors bg-transparent" placeholder="AS12345" />
          </div>
          <div className="space-y-2">
            <label className="font-mono text-xs uppercase font-bold text-gray-500">Email Protocol</label>
            <input type="email" className="w-full border-b-2 border-gray-200 py-3 focus:outline-none focus:border-[#F20732] hover-trigger transition-colors bg-transparent" placeholder="noc@company.com" />
          </div>
        </div>
        <div className="space-y-2">
          <label className="font-mono text-xs uppercase font-bold text-gray-500">Transmission</label>
          <textarea className="w-full border-b-2 border-gray-200 py-3 focus:outline-none focus:border-[#F20732] hover-trigger transition-colors bg-transparent h-32 resize-none" placeholder="Requesting peering details..."></textarea>
        </div>
        <button className="bg-black text-white px-10 py-4 font-bold tracking-widest text-sm uppercase hover:bg-[#F20732] transition-colors hover-trigger w-full md:w-auto">
          Send Transmission
        </button>
      </form>
      <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-gray-200 pt-12">
        <div>
          <h4 className="font-bold mb-2">NOC</h4>
          <p className="font-mono text-sm text-gray-600">+1 (800) 555-0199<br/>noc@nexus-ix.net</p>
        </div>
        <div>
          <h4 className="font-bold mb-2">Sales</h4>
          <p className="font-mono text-sm text-gray-600">sales@nexus-ix.net</p>
        </div>
        <div>
          <h4 className="font-bold mb-2">HQ</h4>
          <p className="font-mono text-sm text-gray-600">100 Cybernetics Way<br/>New York, NY 10012</p>
        </div>
      </div>
    </div>
  </section>
);

export default ContactPage;

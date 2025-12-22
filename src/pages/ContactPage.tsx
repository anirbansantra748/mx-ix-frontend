import React, { useState } from 'react';

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted:', formData);
    // Reset form
    setFormData({ name: '', email: '', company: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section className="relative min-h-screen pt-32 pb-20 bg-white">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] bg-[size:64px_64px]"></div>
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Header */}
        <div className="mb-16">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-2 h-2 rounded-full bg-[#F20732] animate-pulse"></div>
            <span className="font-mono text-xs font-bold tracking-[0.2em] text-[#F20732] uppercase">
              Get in Touch
            </span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black leading-tight tracking-tighter mb-6 text-black">
            CONTACT <span className="text-[#F20732]">US</span>
          </h1>
          
          <p className="max-w-2xl text-gray-500 text-lg leading-relaxed border-l-2 border-gray-100 pl-6">
            Ready to revolutionize your network infrastructure? Our team is here to help 
            you get started with MX-IX.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white border border-gray-200 p-8 md:p-12 hover:border-black transition-all duration-300 relative group">
            <div className="absolute top-0 left-0 w-full h-1 bg-[#F20732] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
            
            <h2 className="text-3xl font-black tracking-tighter mb-8 text-black">
              Send us a message
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block font-mono text-xs text-gray-400 uppercase tracking-widest mb-2">
                  Your Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 focus:border-black focus:bg-white outline-none transition-all duration-300 font-mono text-sm"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label htmlFor="email" className="block font-mono text-xs text-gray-400 uppercase tracking-widest mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 focus:border-black focus:bg-white outline-none transition-all duration-300 font-mono text-sm"
                  placeholder="john@company.com"
                />
              </div>

              <div>
                <label htmlFor="company" className="block font-mono text-xs text-gray-400 uppercase tracking-widest mb-2">
                  Company
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 focus:border-black focus:bg-white outline-none transition-all duration-300 font-mono text-sm"
                  placeholder="Your Company Name"
                />
              </div>

              <div>
                <label htmlFor="message" className="block font-mono text-xs text-gray-400 uppercase tracking-widest mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 focus:border-black focus:bg-white outline-none transition-all duration-300 font-mono text-sm resize-none"
                  placeholder="Tell us about your infrastructure needs..."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-black text-white px-8 py-4 font-mono text-xs font-bold uppercase tracking-widest hover:bg-[#F20732] transition-all duration-300 hover-trigger flex items-center justify-center gap-3 group shadow-lg shadow-black/10"
              >
                Send Message
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            {/* Office Location */}
            <div className="bg-white border border-gray-200 p-8 hover:border-black transition-all duration-300 group relative overflow-hidden hover-trigger">
              <div className="absolute top-0 left-0 w-full h-1 bg-[#F20732] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
              <div className="mb-4">
                <svg className="w-8 h-8 text-[#F20732]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-black tracking-tighter mb-3 text-black">Global Headquarters</h3>
              <p className="text-gray-600 leading-relaxed">
                100 Cybernetics Way<br />
                Floor 42, Server Block A<br />
                New York, NY 10012<br />
                United States
              </p>
            </div>

            {/* Email */}
            <div className="bg-white border border-gray-200 p-8 hover:border-black transition-all duration-300 group relative overflow-hidden hover-trigger">
              <div className="absolute top-0 left-0 w-full h-1 bg-[#F20732] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left delay-75"></div>
              <div className="mb-4">
                <svg className="w-8 h-8 text-[#F20732]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-black tracking-tighter mb-3 text-black">Email</h3>
              <p className="text-gray-600 leading-relaxed">
                <a href="mailto:sales@mx-ix.com" className="hover:text-[#F20732] transition-colors">
                  sales@mx-ix.com
                </a><br />
                <a href="mailto:support@mx-ix.com" className="hover:text-[#F20732] transition-colors">
                  support@mx-ix.com
                </a>
              </p>
            </div>

            {/* Phone */}
            <div className="bg-white border border-gray-200 p-8 hover:border-black transition-all duration-300 group relative overflow-hidden hover-trigger">
              <div className="absolute top-0 left-0 w-full h-1 bg-[#F20732] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left delay-150"></div>
              <div className="mb-4">
                <svg className="w-8 h-8 text-[#F20732]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <h3 className="text-xl font-black tracking-tighter mb-3 text-black">Phone</h3>
              <p className="text-gray-600 leading-relaxed">
                Sales: +1 (555) 123-4567<br />
                Support: +1 (555) 987-6543
              </p>
            </div>

            {/* 24/7 Support Badge */}
            <div className="bg-black text-white p-8 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="relative flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <div className="w-2 h-2 bg-green-500 rounded-full absolute animate-ping"></div>
                  </div>
                  <span className="font-mono text-xs font-bold tracking-wider text-green-400 uppercase">
                    Always Available
                  </span>
                </div>
                <h3 className="text-2xl font-black tracking-tighter mb-2">24/7 Support</h3>
                <p className="text-gray-300 leading-relaxed">
                  Our expert team is available around the clock to assist with any technical 
                  issues or questions you may have.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactPage;

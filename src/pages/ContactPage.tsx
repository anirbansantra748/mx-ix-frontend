import React, { useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import { emailConfig, buildEmailParams } from '../config/email.config';
import { 
  Briefcase, 
  Wrench, 
  CheckCircle2, 
  XCircle, 
  Loader2, 
  ArrowRight,
  BarChart3,
  Settings
} from 'lucide-react';

interface ContactPageProps {
  preSelectedCity?: string;
}

// Contact information structure
interface ContactInfo {
  phone: string;
  email: string;
}

interface DepartmentContacts {
  [language: string]: ContactInfo;
}

interface AllContacts {
  sales: DepartmentContacts;
  services: DepartmentContacts;
}

const ContactPage: React.FC<ContactPageProps> = ({ preSelectedCity }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    location: preSelectedCity || '',
    portSpeed: '',
    bandwidth: '',
    serviceType: 'peering',
    department: 'services' as 'sales' | 'services',
    language: 'english',
    message: '',
    privacyConsent: false,
    marketingConsent: false
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  // Contact information based on department and language
  const contactInfo: AllContacts = {
    sales: {
      english: { phone: '+1 (555) 100-2000', email: 'sales@mx-ix.com' },
      spanish: { phone: '+34 (91) 100-2000', email: 'ventas@mx-ix.com' },
      german: { phone: '+49 (30) 100-2000', email: 'vertrieb@mx-ix.com' },
      japanese: { phone: '+81 (3) 100-2000', email: 'sales.jp@mx-ix.com' }
    },
    services: {
      english: { phone: '+1 (555) 100-3000', email: 'support@mx-ix.com' },
      spanish: { phone: '+34 (91) 100-3000', email: 'soporte@mx-ix.com' },
      german: { phone: '+49 (30) 100-3000', email: 'support.de@mx-ix.com' },
      japanese: { phone: '+81 (3) 100-3000', email: 'support.jp@mx-ix.com' }
    }
  };

  const languages = [
    { value: 'english', label: 'English', flag: 'EN' },
    { value: 'spanish', label: 'Español', flag: 'ES' },
    { value: 'german', label: 'Deutsch', flag: 'DE' },
    { value: 'japanese', label: '日本語', flag: 'JP' }
  ];

  // Get current contact info based on selection
  const getCurrentContact = () => {
    return contactInfo[formData.department][formData.language];
  };

  const locations = [
    'Amsterdam', 'Frankfurt', 'Tokyo', 'Singapore', 'Hong Kong', 'New York'
  ];

  const portSpeeds = ['1G', '10G', '40G', '100G', '400G'];
  
  const bandwidthOptions = ['100 Mbps', '1 Gbps', '10 Gbps', '100 Gbps', 'Custom'];

  const serviceTypes = [
    { value: 'peering', label: 'Network Peering' },
    { value: 'colocation', label: 'Colocation' },
    { value: 'cloud', label: 'Cloud Connect' },
    { value: 'transit', label: 'IP Transit' }
  ];

  useEffect(() => {
    if (preSelectedCity) {
      setFormData(prev => ({ ...prev, location: preSelectedCity }));
    }
  }, [preSelectedCity]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    try {
      const emailParams = buildEmailParams(formData);

      const response = await emailjs.send(
        emailConfig.serviceId,
        emailConfig.templateId,
        emailParams,
        emailConfig.publicKey
      );

      console.log('Email sent successfully:', response);
      
      setSubmitStatus({
        type: 'success',
        message: 'Thank you! Your request has been submitted successfully. Our team will contact you within 24 hours.'
      });

      setFormData({
        name: '',
        email: '',
        company: '',
        phone: '',
        location: '',
        portSpeed: '',
        bandwidth: '',
        serviceType: 'peering',
        department: 'services' as 'sales' | 'services',
        language: 'english',
        message: '',
        privacyConsent: false,
        marketingConsent: false
      });

      setTimeout(() => {
        setSubmitStatus({ type: null, message: '' });
      }, 10000);

    } catch (error: any) {
      console.error('Email sending failed:', error);
      
      setSubmitStatus({
        type: 'error',
        message: `Failed to send your request. Please try again or contact us directly at ${getCurrentContact().email}. Error: ${error.text || error.message || 'Unknown error'}`
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.checked
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
              Get Started
            </span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black leading-tight tracking-tighter mb-6 text-black">
            REQUEST A <span className="text-[#F20732]">PORT</span>
          </h1>
          
          <p className="max-w-2xl text-gray-500 text-lg leading-relaxed border-l-2 border-gray-100 pl-6">
            Connect your network to our global infrastructure. Fill out the form below and our 
            technical team will reach out within 24 hours to get you started.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form - Takes 2 columns */}
          <div className="lg:col-span-2">
            <div className="bg-white border-2 border-gray-200 p-8 md:p-12 hover:border-black transition-all duration-300 relative group">
              <div className="absolute top-0 left-0 w-full h-2 bg-[#F20732] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
              
              <h2 className="text-3xl font-black tracking-tighter mb-8 text-black">
                Port Request Form
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Contact Preferences - Minimal Dropdowns */}
                <div className="border-l-4 border-[#F20732] bg-white pl-5 pr-4 py-4">
                  <h3 className="text-[10px] font-mono font-bold text-black uppercase tracking-widest mb-4 flex items-center gap-2">
                    <div className="w-1 h-1 bg-[#F20732] rounded-full"></div>
                    Contact Preferences
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Department Dropdown */}
                    <div>
                      <label htmlFor="department" className="block font-mono text-[9px] text-gray-500 uppercase tracking-widest mb-1.5 font-bold">
                        Department *
                      </label>
                      <select
                        id="department"
                        name="department"
                        value={formData.department}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2.5 bg-white border border-gray-300 focus:border-[#F20732] focus:ring-1 focus:ring-[#F20732] outline-none transition-all duration-200 text-sm text-black appearance-none cursor-pointer"
                        style={{
                          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23666'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E")`,
                          backgroundRepeat: 'no-repeat',
                          backgroundPosition: 'right 0.5rem center',
                          backgroundSize: '1.25rem'
                        }}
                      >
                        <option value="sales">Sales Team</option>
                        <option value="services">Technical Services</option>
                      </select>
                    </div>

                    {/* Language Dropdown */}
                    <div>
                      <label htmlFor="language" className="block font-mono text-[9px] text-gray-500 uppercase tracking-widest mb-1.5 font-bold">
                        Language *
                      </label>
                      <select
                        id="language"
                        name="language"
                        value={formData.language}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2.5 bg-white border border-gray-300 focus:border-[#F20732] focus:ring-1 focus:ring-[#F20732] outline-none transition-all duration-200 text-sm text-black appearance-none cursor-pointer"
                        style={{
                          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23666'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E")`,
                          backgroundRepeat: 'no-repeat',
                          backgroundPosition: 'right 0.5rem center',
                          backgroundSize: '1.25rem'
                        }}
                      >
                        {languages.map(lang => (
                          <option key={lang.value} value={lang.value}>
                            {lang.flag} {lang.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Personal Information - Always Shown */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block font-mono text-xs text-gray-700 uppercase tracking-widest mb-2 font-bold">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 focus:border-black focus:bg-white outline-none transition-all duration-300 font-mono text-sm text-black rounded-md"
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block font-mono text-xs text-gray-700 uppercase tracking-widest mb-2 font-bold">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 focus:border-black focus:bg-white outline-none transition-all duration-300 font-mono text-sm text-black rounded-md"
                      placeholder="john@company.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="company" className="block font-mono text-xs text-gray-700 uppercase tracking-widest mb-2 font-bold">
                      Company *
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 focus:border-black focus:bg-white outline-none transition-all duration-300 font-mono text-sm text-black rounded-md"
                      placeholder="Your Company"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block font-mono text-xs text-gray-700 uppercase tracking-widest mb-2 font-bold">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 focus:border-black focus:bg-white outline-none transition-all duration-300 font-mono text-sm text-black rounded-md"
                      placeholder="+91 98765 43210"
                    />
                  </div>
                </div>

                {/* Conditional Form - Shows Different Fields Based on Department */}
                {formData.department === 'services' && (
                  <div className="border-t-2 border-gray-100 pt-8 animate-fadeIn">
                    <h3 className="text-xl font-black tracking-tighter mb-6 text-black flex items-center gap-3">
                      <div className="w-1 h-6 bg-[#F20732]"></div>
                      Service Configuration
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="location" className="block font-mono text-xs text-gray-700 uppercase tracking-widest mb-2 font-bold">
                          Preferred Location *
                        </label>
                        <select
                          id="location"
                          name="location"
                          value={formData.location}
                          onChange={handleChange}
                          required={formData.department === 'services'}
                          className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 focus:border-black focus:bg-white outline-none transition-all duration-300 font-mono text-sm text-black rounded-md"
                        >
                          <option value="">Select a location</option>
                          {locations.map(loc => (
                            <option key={loc} value={loc}>{loc}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label htmlFor="serviceType" className="block font-mono text-xs text-gray-700 uppercase tracking-widest mb-2 font-bold">
                          Service Type *
                        </label>
                        <select
                          id="serviceType"
                          name="serviceType"
                          value={formData.serviceType}
                          onChange={handleChange}
                          required={formData.department === 'services'}
                          className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 focus:border-black focus:bg-white outline-none transition-all duration-300 font-mono text-sm text-black rounded-md"
                        >
                          {serviceTypes.map(type => (
                            <option key={type.value} value={type.value}>{type.label}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                      <div>
                        <label htmlFor="portSpeed" className="block font-mono text-xs text-gray-700 uppercase tracking-widest mb-2 font-bold">
                          Port Speed *
                        </label>
                        <select
                          id="portSpeed"
                          name="portSpeed"
                          value={formData.portSpeed}
                          onChange={handleChange}
                          required={formData.department === 'services'}
                          className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 focus:border-black focus:bg-white outline-none transition-all duration-300 font-mono text-sm text-black rounded-md"
                        >
                          <option value="">Select port speed</option>
                          {portSpeeds.map(speed => (
                            <option key={speed} value={speed}>{speed}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label htmlFor="bandwidth" className="block font-mono text-xs text-gray-700 uppercase tracking-widest mb-2 font-bold">
                          Bandwidth Required
                        </label>
                        <select
                          id="bandwidth"
                          name="bandwidth"
                          value={formData.bandwidth}
                          onChange={handleChange}
                          className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 focus:border-black focus:bg-white outline-none transition-all duration-300 font-mono text-sm text-black rounded-md"
                        >
                          <option value="">Select bandwidth</option>
                          {bandwidthOptions.map(bw => (
                            <option key={bw} value={bw}>{bw}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                )}

                {/* Additional Requirements / Message */}
                <div>
                  <label htmlFor="message" className="block font-mono text-xs text-gray-700 uppercase tracking-widest mb-2 font-bold">
                    Additional Requirements
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 focus:border-black focus:bg-white outline-none transition-all duration-300 font-mono text-sm resize-none text-black rounded-md"
                    placeholder="Tell us about your specific network requirements, redundancy needs, or any other details..."
                  />
                </div>

                {/* Privacy Consent Checkboxes */}
                <div className="border-t-2 border-gray-100 pt-6 space-y-4">
                  {/* Required Privacy Policy Consent */}
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      id="privacyConsent"
                      name="privacyConsent"
                      checked={formData.privacyConsent}
                      onChange={handleCheckboxChange}
                      required
                      className="mt-1 w-4 h-4 text-black border-2 border-gray-300 rounded focus:ring-black focus:ring-2"
                    />
                    <label htmlFor="privacyConsent" className="text-xs text-gray-700 leading-relaxed">
                      <span className="font-bold text-black">I consent to MX-IX retaining my personal contact data</span> for the purpose of processing my enquiry according to the{' '}
                      <a href="#" className="text-[#F20732] hover:text-black underline font-medium">Privacy Policy</a> for MX-IX Members and Prospective Members. *
                    </label>
                  </div>

                  {/* Optional Marketing Consent */}
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      id="marketingConsent"
                      name="marketingConsent"
                      checked={formData.marketingConsent}
                      onChange={handleCheckboxChange}
                      className="mt-1 w-4 h-4 text-black border-2 border-gray-300 rounded focus:ring-black focus:ring-2"
                    />
                    <label htmlFor="marketingConsent" className="text-xs text-gray-700 leading-relaxed">
                      I consent to MX-IX retaining my personal contact data for the purpose of sending me other information it believes may be relevant and of interest to me.
                    </label>
                  </div>
                </div>

                {submitStatus.type && (
                  <div className={`p-4 border-2 ${
                    submitStatus.type === 'success' 
                      ? 'bg-green-50 border-green-500 text-green-800' 
                      : 'bg-red-50 border-red-500 text-red-800'
                  } animate-fadeIn`}>
                    <div className="flex items-start gap-3">
                      {submitStatus.type === 'success' ? (
                        <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" strokeWidth={2.5} />
                      ) : (
                        <XCircle className="w-5 h-5 text-red-600 flex-shrink-0" strokeWidth={2.5} />
                      )}
                      <div>
                        <p className="font-bold text-sm mb-1">
                          {submitStatus.type === 'success' ? 'Success!' : 'Error'}
                        </p>
                        <p className="text-sm leading-relaxed">{submitStatus.message}</p>
                      </div>
                    </div>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full px-8 py-5 font-mono text-xs font-bold uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-3 group shadow-lg ${
                    isSubmitting
                      ? 'bg-gray-400 cursor-not-wait'
                      : 'bg-[#F20732] hover:bg-black shadow-[#F20732]/20 cursor-pointer'
                  } text-white`}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" strokeWidth={2.5} />
                      Sending...
                    </>
                  ) : (
                    <>
                      Submit Request
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" strokeWidth={2.5} />
                    </>
                  )}
                </button>

                <p className="text-xs text-gray-500 font-mono text-center">
                  * Required field. By submitting this form, you confirm your consent to our data processing practices.
                </p>
              </form>
            </div>
          </div>

          {/* Sidebar Info - Takes 1 column */}
          <div className="space-y-6">
            {/* Quick Response Badge */}
            <div className="bg-black text-white p-8 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="relative flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <div className="w-2 h-2 bg-green-500 rounded-full absolute animate-ping"></div>
                  </div>
                  <span className="font-mono text-xs font-bold tracking-wider text-green-400 uppercase">
                    Fast Response
                  </span>
                </div>
                <h3 className="text-2xl font-black tracking-tighter mb-3">24 Hour SLA</h3>
                <p className="text-gray-300 leading-relaxed text-sm">
                  Our team responds to all port requests within 24 hours. Urgent requests? Call us directly.
                </p>
              </div>
            </div>

            {/* What Happens Next */}
            <div className="bg-white border-2 border-gray-200 p-8">
              <h3 className="text-xl font-black tracking-tighter mb-6 text-black">What Happens Next?</h3>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-[#F20732] text-white flex items-center justify-center font-mono text-sm font-bold">
                    1
                  </div>
                  <div>
                    <p className="text-sm font-bold text-black mb-1">Initial Review</p>
                    <p className="text-xs text-gray-600">We review your requirements within 24 hours</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-[#F20732] text-white flex items-center justify-center font-mono text-sm font-bold">
                    2
                  </div>
                  <div>
                    <p className="text-sm font-bold text-black mb-1">Technical Consultation</p>
                    <p className="text-xs text-gray-600">Our engineers discuss your setup</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-[#F20732] text-white flex items-center justify-center font-mono text-sm font-bold">
                    3
                  </div>
                  <div>
                    <p className="text-sm font-bold text-black mb-1">Custom Quote</p>
                    <p className="text-xs text-gray-600">Receive detailed pricing and terms</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-[#F20732] text-white flex items-center justify-center font-mono text-sm font-bold">
                    4
                  </div>
                  <div>
                    <p className="text-sm font-bold text-black mb-1">Deployment</p>
                    <p className="text-xs text-gray-600">Go live in as little as 48 hours</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Info - Dynamic based on selection */}
            <div className="bg-gradient-to-br from-gray-900 to-black text-white p-8 relative overflow-hidden group hover:shadow-xl transition-shadow">
              <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-black tracking-tighter">Need Help?</h3>
                  <div className="flex items-center gap-2">
                    <div className="relative flex items-center">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <div className="w-2 h-2 bg-green-500 rounded-full absolute animate-ping"></div>
                    </div>
                  </div>
                </div>

                {/* Department Badge */}
                <div className="inline-flex items-center gap-2 bg-[#F20732]/10 border border-[#F20732]/30 px-4 py-2 rounded-full mb-6">
                  {formData.department === 'sales' ? (
                    <Briefcase className="w-4 h-4 text-[#F20732]" strokeWidth={2.5} />
                  ) : (
                    <Wrench className="w-4 h-4 text-[#F20732]" strokeWidth={2.5} />
                  )}
                  <span className="font-mono text-xs font-bold tracking-widest uppercase text-[#F20732]">
                    {formData.department === 'sales' ? 'Sales Team' : 'Technical Services'}
                  </span>
                </div>

                {/* Language Badge */}
                <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full mb-6 ml-2">
                  <span className="text-lg">{languages.find(l => l.value === formData.language)?.flag}</span>
                  <span className="font-mono text-xs font-bold tracking-widest uppercase text-gray-300">
                    {languages.find(l => l.value === formData.language)?.label}
                  </span>
                </div>

                <div className="space-y-5 text-sm">
                  <div className="group/item">
                    <p className="font-mono text-xs text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                      <span className="w-1 h-1 bg-[#F20732] rounded-full"></span>
                      Email
                    </p>
                    <a 
                      href={`mailto:${getCurrentContact().email}`} 
                      className="text-white hover:text-[#F20732] transition-colors font-medium block pl-3 border-l-2 border-white/10 hover:border-[#F20732]"
                    >
                      {getCurrentContact().email}
                    </a>
                  </div>
                  <div className="group/item">
                    <p className="font-mono text-xs text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                      <span className="w-1 h-1 bg-[#F20732] rounded-full"></span>
                      Phone
                    </p>
                    <a 
                      href={`tel:${getCurrentContact().phone.replace(/[^+\d]/g, '')}`} 
                      className="text-white hover:text-[#F20732] transition-colors font-medium block pl-3 border-l-2 border-white/10 hover:border-[#F20732] font-mono text-lg"
                    >
                      {getCurrentContact().phone}
                    </a>
                  </div>
                  
                  <div className="pt-4 border-t border-white/10">
                    <div className="flex items-start gap-2">
                      {formData.department === 'sales' ? (
                        <BarChart3 className="w-4 h-4 text-[#F20732] flex-shrink-0 mt-0.5" strokeWidth={2.5} />
                      ) : (
                        <Settings className="w-4 h-4 text-[#F20732] flex-shrink-0 mt-0.5" strokeWidth={2.5} />
                      )}
                      <p className="text-xs text-gray-400 leading-relaxed">
                        {formData.department === 'sales' ? 
                          'Our sales team is ready to discuss your networking needs and provide custom solutions.' :
                          'Our technical support team provides 24/7 assistance for all service-related inquiries.'
                        }
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactPage;

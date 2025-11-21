'use client';

import { useState, useEffect } from 'react';
import { services } from '@/data/services';

/**
 * Home Page Component
 * Displays hero section with background image and services section with interactive tabs and accordion
 */
export default function Home() {
  const [activeService, setActiveService] = useState(services[0].id);
  const [openService, setOpenService] = useState<string | null>(services[0].id);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Open services accordion when scrolling to services section from navbar
  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '#services') {
        // Ensure first service is open
        setActiveService(services[0].id);
        setOpenService(services[0].id);
        
        // Smooth scroll to services section
        setTimeout(() => {
          const servicesSection = document.getElementById('services');
          if (servicesSection) {
            const offset = 100; // Account for navbar height
            const elementPosition = servicesSection.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - offset;
            
            window.scrollTo({
              top: offsetPosition,
              behavior: 'smooth'
            });
          }
        }, 100);
      } else if (!window.location.hash) {
        // If no hash, scroll to top and close services
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };

    // Only listen to hash changes, don't trigger on mount
    window.addEventListener('hashchange', handleHashChange);

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  /**
   * Handles service tab change - updates active service and triggers transition
   */
  const handleServiceChange = (serviceId: string) => {
    if (serviceId === activeService || isTransitioning) return;
    
    setIsTransitioning(true);
    setActiveService(serviceId);
    setOpenService(serviceId);
    setTimeout(() => setIsTransitioning(false), 50);
  };

  /**
   * Handles accordion toggle for service details
   */
  const handleServiceToggle = (serviceId: string) => {
    if (isTransitioning) return;
    
    if (openService === serviceId) {
      setOpenService(null);
    } else {
      setActiveService(serviceId);
      setOpenService(serviceId);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-white">
      {/* Hero Section */}
      <main className="relative isolate w-full overflow-hidden px-20 py-20 sm:px-20">
        <div
          className="absolute inset-0 bg-cover bg-center blur-[0.5px]"
          style={{
            backgroundImage: "url('/nile%202.jpg')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-white/30" />

        <section className="relative z-10 flex min-h-[70vh] w-full flex-col justify-center gap-10 py-10">
          <div className="max-w-3xl space-y-8 text-left">
            <h1 className="text-4xl font-bold leading-tight text-slate-900 sm:text-5xl lg:text-6xl">
              Your Academic Journey,{" "}
              <span className="text-blue-600">
                Simplified
              </span>
            </h1>
            <p className="text-lg leading-relaxed text-slate-700 lg:text-xl">
              AI-powered academic advising platform that helps you plan your courses, track your progress, and achieve
              your educational goals with confidence.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <button className="rounded-2xl bg-blue-600 px-10 py-3 text-base font-semibold text-white shadow-xl shadow-blue-500/30 transition-transform duration-200 hover:-translate-y-0.5 hover:bg-blue-700">
                Get Started
              </button>
              <button className="rounded-2xl border-2 border-blue-600 bg-white/80 px-10 py-3 text-base font-semibold text-blue-600 backdrop-blur transition-colors duration-200 hover:bg-blue-50">
                Learn More
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Services Section */}
      <section id="services" className="bg-white pb-16">
        {/* Tab Navigation - Centered (Not Sticky) */}
        <div className="border-b border-blue-200 bg-white">
          <div className="mx-auto max-w-7xl px-6 py-4">
            <div className="flex flex-wrap justify-center gap-3">
              {services.map((service) => (
                <button
                  key={service.id}
                  onClick={() => handleServiceChange(service.id)}
                  className={`rounded-full px-6 py-2.5 text-sm font-semibold transition-all duration-200 ${
                    activeService === service.id
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-500/30'
                      : 'bg-blue-50 text-blue-700 hover:bg-blue-100'
                  }`}
                >
                  {service.title}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content with Accordion */}
        <div className="mx-auto max-w-7xl px-6 pb-16 pt-8">
          <div className="grid grid-cols-1 gap-0 lg:grid-cols-2">
            {/* Left Side - Accordion */}
            <div className="space-y-0 border-r border-blue-200 pr-8">
              {services.map((service) => {
                const isOpen = openService === service.id;
                return (
                  <div key={service.id} className="border-b border-blue-200">
                    <button
                      onClick={() => handleServiceToggle(service.id)}
                      className="flex w-full items-center justify-between py-6 text-left"
                    >
                      <div className="flex items-center gap-4">
                        <div className={`h-1 w-1 rounded-full transition-all duration-300 ${
                          isOpen ? 'h-12 w-1 bg-blue-600' : 'bg-blue-300'
                        }`} />
                        <h3 className="text-xl font-bold text-slate-900">
                          {service.title}
                        </h3>
                      </div>
                      <svg
                        className={`h-5 w-5 text-slate-600 transition-transform duration-300 ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    <div
                      className={`overflow-hidden transition-all duration-500 ${
                        isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
                      }`}
                    >
                      <div className="pb-6 pl-5">
                        <p className="mb-4 text-base leading-relaxed text-slate-600">
                          {service.description}
                        </p>
                        <a
                          href="#"
                          className="text-sm font-semibold text-indigo-600 underline hover:text-indigo-700"
                        >
                          Take a guided tour
                        </a>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Right Side - Image with Transition from Right */}
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl ml-8 shadow-xl" style={{
              background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 25%, #e0e7ff 50%, #ddd6fe 75%, #f3e8ff 100%)',
              backgroundSize: '400% 400%',
              animation: 'gradient 20s ease infinite'
            }}>
              {services.map((service) => {
                const isActive = activeService === service.id;
                const serviceIndex = services.findIndex(s => s.id === service.id);
                const activeIndex = services.findIndex(s => s.id === activeService);
                
                // Calculate z-index: active is highest, previous images stay visible underneath
                let zIndex = 0;
                if (isActive) {
                  zIndex = 30;
                } else if (serviceIndex < activeIndex) {
                  zIndex = 10; // Previous images stay visible underneath
                } else {
                  zIndex = 20; // Next images come from right
                }

                // Calculate transform: active is center, previous stay visible, next come from right
                let translateX = '100%'; // Default: off screen right
                if (isActive) {
                  translateX = '0%'; // Active image is centered
                } else if (serviceIndex < activeIndex) {
                  translateX = '0%'; // Previous images stay in place (visible underneath)
                }

                return (
                  <div
                    key={service.id}
                    className="absolute inset-0 transition-transform duration-700 ease-in-out"
                    style={{
                      transform: `translateX(${translateX})`,
                      zIndex: zIndex,
                    }}
                  >
                    <div 
                      className="absolute inset-0 bg-white/98 backdrop-blur-sm rounded-2xl p-[15px] shadow-xl"
                      style={{
                        background: 'linear-gradient(to bottom, #dbeafe 0%, #2563eb 100%)',
                      }}
                    >
                      <div className="h-full w-full bg-white/98 backdrop-blur-sm overflow-hidden">
                        <img
                          src={service.image}
                          alt={service.title}
                          className="h-full w-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/5 via-transparent to-transparent" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

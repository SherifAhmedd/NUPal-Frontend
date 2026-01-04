'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { services } from '@/data/services';
import Button from '../ui/Button';

export default function ServicesSection() {
  const [activeService, setActiveService] = useState(services[0].id);
  const [openService, setOpenService] = useState<string | null>(services[0].id);

  const handleServiceChange = (serviceId: string) => {
    setActiveService(serviceId);
    setOpenService(serviceId);
  };
  const handleServiceToggle = (serviceId: string) => {
    setOpenService(openService === serviceId ? null : serviceId);
    setActiveService(serviceId);
  };

  return (
    <section id="services" className="bg-white pb-16 overflow-hidden">
      <div className="border-b border-blue-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-4">
          <div className="flex flex-wrap justify-center gap-3">
            {services.map((service) => (
              <Button
                key={service.id}
                variant="none"
                size="none"
                onClick={() => handleServiceChange(service.id)}
                className={`rounded-full px-6 py-2.5 text-sm font-semibold uppercase transition-all duration-200 ${activeService === service.id
                  ? 'bg-blue-400 text-white shadow-md shadow-blue-500/30'
                  : 'bg-blue-50 text-blue-400 hover:bg-blue-100'
                  }`}
              >
                {service.title}
              </Button>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 pb-16 pt-8">
        <div className="grid grid-cols-1 gap-0 lg:grid-cols-2">
          <div className="relative z-10 space-y-0 border-r border-blue-200 pr-8">
            {services.map((service) => {
              const isOpen = openService === service.id;
              return (
                <div key={service.id} className="border-b border-blue-200">
                  <Button
                    variant="none"
                    size="none"
                    onClick={() => handleServiceToggle(service.id)}
                    className="flex w-full items-center justify-between py-6 text-left"
                  >
                    <div className="flex items-center gap-4 justify-start w-full">
                      <div className={`h-1 w-1 rounded-full transition-all duration-300 ${isOpen ? 'h-12 w-1 bg-blue-400' : 'bg-blue-300'
                        }`} />
                      <h3 className="text-xl font-bold text-slate-900">{service.title}</h3>
                    </div>
                    <svg className={`h-5 w-5 text-slate-600 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </Button>
                  <div className={`overflow-hidden transition-all duration-500 ${isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
                    <div className="pb-6 pl-5">
                      <p className="mb-4 text-base leading-relaxed text-slate-600">{service.description}</p>
                      <Link href={service.path} className="text-sm font-semibold text-indigo-600 underline hover:text-blue-500">Take a guided tour</Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="relative aspect-[4/3] w-full ml-12">
            {/* Slanted Accent Line */}
            <div
              className="absolute bottom-[-13%] left-0 w-[150vw] h-24 bg-blue-400/90 origin-left"
              style={{
                transform: 'translateX(-48px) skewY(-7deg)',
                zIndex: 5
              }}
            />

            {/* Expanded the container vertically with py-20 to allow shadows to show, then used p-20 to position images back */}
            <div className="absolute -top-20 -bottom-20 left-0 w-[140%] overflow-hidden pointer-events-none">
              <div className="relative h-full w-full p-20">
                {services.map((service, serviceIndex) => {
                  const isActive = activeService === service.id;
                  const activeIndex = services.findIndex(s => s.id === activeService);

                  const zIndex = 10 + serviceIndex;
                  // Adjusted to 5% to compensate for the p-20 padding and show 75%+ of the image
                  const translateX = serviceIndex <= activeIndex ? '5%' : '100%';

                  return (
                    <div
                      key={service.id}
                      className="absolute inset-x-20 inset-y-20 transition-transform duration-700 ease-in-out pointer-events-auto"
                      style={{
                        transform: `translateX(${translateX})`,
                        zIndex: zIndex,
                      }}
                    >
                      <div className={`h-full w-full bg-white border border-slate-200 flex flex-col rounded-xl overflow-hidden transition-all duration-300 ${isActive ? 'shadow-[0_25px_50px_-12px_rgba(0,0,0,0.18)]' : ''}`}>
                        {/* Browser Header */}
                        <div className="flex items-center gap-4 px-5 py-2 border-b border-slate-100 bg-slate-50/50">
                          <div className="flex gap-1.5">
                            <div className="h-2 w-2 rounded-full bg-slate-200" />
                            <div className="h-2 w-2 rounded-full bg-slate-200" />
                            <div className="h-2 w-2 rounded-full bg-slate-200" />
                          </div>
                          <div className="flex-1">
                            <div
                              className="bg-white border border-slate-100 rounded py-0.5 px-3 text-[10px] text-slate-400 font-medium tracking-tight shadow-sm text-left"
                              dir="ltr"
                            >
                              nupal.edu/{service.id.replace('academic-map', 'dashboard').replace('academic-plan', 'dashboard').replace('tracks-map', 'dashboard')}
                            </div>
                          </div>
                        </div>
                        {/* Image Content - Individual customization area for each service */}
                        <div className={`flex-1 overflow-hidden transition-colors duration-300 ${service.id === 'academic-map' ? 'bg-white p-0' :
                          service.id === 'academic-plan' ? 'bg-white p-0' :
                            service.id === 'tracks-map' ? 'bg-white p-0' :
                              service.id === 'chatbot' ? 'bg-white p-0' :
                                service.id === 'career-hub' ? 'bg-white p-0' :
                                  'bg-white p-0'
                          }`}>
                          <Image
                            src={service.image}
                            alt={service.title}
                            width={800}
                            height={600}
                            className={`h-full w-full transition-all duration-500 ${service.id === 'academic-map' ? 'object-contain' :
                              service.id === 'academic-plan' ? 'object-cover object-left-top' :
                                service.id === 'tracks-map' ? 'object-cover object-left-top' :
                                  service.id === 'chatbot' ? 'object-cover object-left-top' :
                                    service.id === 'career-hub' ? 'object-cover object-left-top' :
                                      'object-contain'
                              }`}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

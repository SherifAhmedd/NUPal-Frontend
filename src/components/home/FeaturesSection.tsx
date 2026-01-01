'use client';
import { features } from '@/data/features';
import Link from 'next/link';

export default function FeaturesSection() {
  return (
    <section className="bg-slate-50 py-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl mb-4">Platform Features</h2>
          <p className="text-lg text-slate-600">Discover the powerful tools that help you succeed</p>
        </div>

        <div className="relative overflow-hidden group/container">
          {/* Gradient Overlays for Edge Fading */}
          <div className="absolute left-0 top-0 bottom-0 z-10 w-32 bg-gradient-to-r from-slate-50 to-transparent pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 z-10 w-32 bg-gradient-to-l from-slate-50 to-transparent pointer-events-none" />

          <div
            className="flex gap-6 py-3 animate-[scroll_10s_linear_infinite] hover:[animation-play-state:paused]"
          >
            {features.concat(features).map((feature, idx) => (
              <Link
                href="/login"
                key={`${feature.id}-${idx}`}
                className="group flex-shrink-0 w-[320px] rounded-2xl border border-slate-200 bg-white p-6 shadow-lg transition-all duration-500 hover:shadow-2xl hover:-translate-y-4 cursor-pointer block"
              >
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-xl bg-blue-100 text-4xl transition-transform duration-500 group-hover:scale-110 group-hover:bg-blue-200">
                  {feature.icon}
                </div>
                <h3 className="mb-2 text-xl font-bold text-slate-900 group-hover:text-blue-500 transition-colors duration-300">{feature.title}</h3>
                <p className="text-base leading-relaxed text-slate-600">{feature.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

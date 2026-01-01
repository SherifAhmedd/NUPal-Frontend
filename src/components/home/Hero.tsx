'use client';

import Button from '@/components/ui/Button';

export default function Hero() {
  return (
    <section id="home" className="relative isolate w-full overflow-hidden py-20">
      <div
        className="absolute inset-0 bg-cover bg-center blur-[0.05px]"
        style={{ backgroundImage: "url('/nile%202.jpg')" }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-white/30" />

      <div className="relative z-10 mx-auto flex min-h-[70vh] max-w-7xl flex-col justify-center gap-10 px-6 py-10">
        <div className="max-w-3xl space-y-8 text-left">
          <h1 className="text-4xl font-bold leading-tight text-slate-900 sm:text-5xl lg:text-6xl">
            Your Academic Journey, <span className="text-blue-400">Simplified</span>
          </h1>
          <p className="text-lg leading-relaxed text-slate-700 lg:text-xl">
            AI-powered academic advising platform that helps you plan your courses, track your progress, and achieve
            your educational goals with confidence.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row">
            <Button href="/login" size="lg">
              GET STARTED
            </Button>
            <Button href="#about" variant="outline" size="lg">
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

import { useEffect, useState } from "react";
import { differenceInDays, differenceInHours, differenceInMinutes } from "date-fns";
import heroImage from "@assets/generated_images/Wedding_venue_hero_background_8c5522c1.png";

export function Hero() {
  const weddingDate = new Date("2026-02-14T00:00:00");
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
  });

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const days = differenceInDays(weddingDate, now);
      const hours = differenceInHours(weddingDate, now) % 24;
      const minutes = differenceInMinutes(weddingDate, now) % 60;
      
      setTimeLeft({ days, hours, minutes });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 60000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/60" />
      </div>

      <div className="relative z-10 text-center px-6 py-20">
        <div className="space-y-8">
          <div className="space-y-4">
            <h1 className="text-6xl md:text-8xl font-playfair font-bold text-white tracking-tight" data-testid="text-couple-names">
              Rohan & Hany
            </h1>
            <div className="flex items-center justify-center gap-3">
              <div className="h-px w-16 bg-white/50" />
              <p className="text-xl md:text-2xl font-montserrat tracking-widest text-white/90" data-testid="text-wedding-date">
                FEBRUARY 14, 2026
              </p>
              <div className="h-px w-16 bg-white/50" />
            </div>
          </div>

          <div className="flex items-center justify-center gap-8 text-white" data-testid="countdown-timer">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-playfair font-bold" data-testid="countdown-days">
                {timeLeft.days}
              </div>
              <div className="text-sm md:text-base font-montserrat uppercase tracking-wider text-white/80 mt-1">
                Days
              </div>
            </div>
            <div className="text-3xl md:text-4xl font-playfair text-white/60">•</div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-playfair font-bold" data-testid="countdown-hours">
                {timeLeft.hours}
              </div>
              <div className="text-sm md:text-base font-montserrat uppercase tracking-wider text-white/80 mt-1">
                Hours
              </div>
            </div>
            <div className="text-3xl md:text-4xl font-playfair text-white/60">•</div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-playfair font-bold" data-testid="countdown-minutes">
                {timeLeft.minutes}
              </div>
              <div className="text-sm md:text-base font-montserrat uppercase tracking-wider text-white/80 mt-1">
                Minutes
              </div>
            </div>
          </div>

          <div className="pt-8">
            <div className="inline-block animate-bounce">
              <svg 
                className="w-6 h-6 text-white/60" 
                fill="none" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { HeartPulse, Leaf, Users } from "lucide-react";

interface CounterProps {
  end: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  decimals?: number;
}

function Counter({ end, suffix = "", prefix = "", duration = 2, decimals = 0 }: CounterProps) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !started.current) {
            started.current = true;
            const start = performance.now();
            const tick = (now: number) => {
              const t = Math.min(1, (now - start) / (duration * 1000));
              const eased = 1 - Math.pow(1 - t, 3);
              setValue(end * eased);
              if (t < 1) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
          }
        });
      },
      { threshold: 0.4 }
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, [end, duration]);

  return (
    <span ref={ref}>
      {prefix}
      {value.toLocaleString("en-IN", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })}
      {suffix}
    </span>
  );
}

export function Impact() {
  const pillars = [
    {
      icon: <HeartPulse className="w-7 h-7 text-[#FF6B8A]" />,
      ring: "rgba(255,107,138,0.25)",
      glow: "rgba(255,107,138,0.18)",
      eyebrow: "SAVE LIVES",
      title: "Cleaner air for 1.4 billion lungs.",
      body: "Diesel truck exhaust contributes to over 1.6 million premature deaths every year in India. Every Rhygen powertrain we put on the road quietly cuts the particulate matter that fills the air our families breathe.",
      stat: <Counter end={42} suffix="%" />,
      statLabel: "less PM 2.5 per km vs. diesel baseline",
    },
    {
      icon: <Leaf className="w-7 h-7 text-[#00E5FF]" />,
      ring: "rgba(0,229,255,0.25)",
      glow: "rgba(0,229,255,0.18)",
      eyebrow: "SAVE GREEN",
      title: "A bridge the planet can actually cross.",
      body: "Trucks move 70% of India's freight and emit a quarter of its transport CO₂. We don't ask the country to wait for a perfect grid — we cut emissions today, with the highways and pumps that already exist.",
      stat: <Counter end={3.8} decimals={1} suffix=" Mt" />,
      statLabel: "CO₂ avoidable per year at 1% fleet adoption",
    },
    {
      icon: <Users className="w-7 h-7 text-[#5B4EE8]" />,
      ring: "rgba(91,78,232,0.3)",
      glow: "rgba(91,78,232,0.18)",
      eyebrow: "EMPOWER PEOPLE",
      title: "More take-home for every driver.",
      body: "For a trucker, fuel is half of every rupee earned. Lower fuel bills mean better wages, safer rest stops, and a son or daughter who gets to stay in school. Technology should grow the people who keep the country moving.",
      stat: <Counter prefix="₹" end={48000} />,
      statLabel: "extra annual income per driver, on average",
    },
  ];

  return (
    <section
      id="impact"
      className="relative py-28 bg-[#070710] border-t border-white/5 overflow-hidden"
    >
      {/* Soft ambient glow */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-[radial-gradient(ellipse_at_center,rgba(91,78,232,0.18),transparent_70%)] blur-2xl" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[400px] bg-[radial-gradient(ellipse_at_center,rgba(0,229,255,0.10),transparent_70%)] blur-2xl" />
      </div>

      <div className="container mx-auto px-6 max-w-[1240px] relative z-10">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-20 max-w-[820px] mx-auto"
        >
          <span className="text-[12px] font-bold tracking-[3px] text-[#A0A8C0] mb-5 block">
            WHY WE EXIST
          </span>
          <h2 className="text-[40px] md:text-[56px] font-bold text-white leading-[1.1] mb-6">
            We aren't just building a better truck.<br />
            <span className="gradient-text">We're saving lives, the planet, and people's livelihoods.</span>
          </h2>
          <p className="text-[18px] text-[#A0A8C0] leading-[1.7]">
            Rhygen began as a question, not a product:
            <span className="text-white"> what if the world's most overlooked machine could become the world's most useful one? </span>
            Every line of our code, every gear we cut, is meant for the family by the highway, the driver in the cabin, and the country that depends on both.
          </p>
        </motion.div>

        {/* Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {pillars.map((p, i) => (
            <motion.div
              key={p.eyebrow}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, delay: i * 0.12 }}
              className="group relative bg-[#0F1020] border border-white/10 rounded-2xl p-8 overflow-hidden hover:border-white/20 transition-all duration-500"
            >
              <div
                className="pointer-events-none absolute -top-20 -right-20 w-60 h-60 rounded-full opacity-40 group-hover:opacity-70 transition-opacity duration-700 blur-3xl"
                style={{ background: p.glow }}
              />

              <div
                className="relative w-14 h-14 rounded-xl flex items-center justify-center mb-6 bg-[#070710] border"
                style={{ borderColor: p.ring }}
              >
                {p.icon}
              </div>

              <span className="text-[11px] font-bold tracking-[2px] text-[#A0A8C0] mb-3 block">
                {p.eyebrow}
              </span>
              <h3 className="text-[22px] font-semibold text-white mb-4 leading-snug">
                {p.title}
              </h3>
              <p className="text-[15px] text-[#A0A8C0] leading-relaxed mb-8">
                {p.body}
              </p>

              <div className="pt-6 border-t border-white/5">
                <div className="text-[36px] md:text-[40px] font-bold gradient-text leading-none mb-2">
                  {p.stat}
                </div>
                <div className="text-[13px] text-[#A0A8C0]">{p.statLabel}</div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Closing pledge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative max-w-[920px] mx-auto rounded-3xl border border-white/10 bg-gradient-to-br from-[#0F1020] to-[#070710] p-10 md:p-14 overflow-hidden"
        >
          <div className="pointer-events-none absolute -top-24 -left-24 w-80 h-80 rounded-full bg-[radial-gradient(circle,rgba(91,78,232,0.25),transparent_70%)] blur-2xl" />
          <div className="pointer-events-none absolute -bottom-24 -right-24 w-80 h-80 rounded-full bg-[radial-gradient(circle,rgba(0,229,255,0.18),transparent_70%)] blur-2xl" />

          <div className="relative">
            <span className="text-[12px] font-bold tracking-[3px] text-[#A0A8C0] mb-5 block">
              OUR PLEDGE
            </span>
            <p className="text-[22px] md:text-[28px] text-white font-semibold leading-[1.45]">
              For every truck we ship, we commit to one promise:
              <span className="gradient-text"> a cleaner breath, a kinder climate, and a better tomorrow </span>
              for the people who keep India moving.
            </p>
            <p className="mt-6 text-[15px] text-[#A0A8C0]">
              — The Rhygen Team, IIT Bombay
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

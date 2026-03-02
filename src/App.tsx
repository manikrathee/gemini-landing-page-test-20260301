import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Dna, 
  Activity, 
  ShieldCheck, 
  ChevronRight, 
  ArrowRight,
  CircleDot,
  MousePointer2,
  Lock,
  Zap,
  Cpu
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// --- Utilities ---
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

gsap.registerPlugin(ScrollTrigger);

// --- Components ---

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={cn(
      "fixed top-8 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 flex items-center px-6 py-3 rounded-full",
      scrolled 
        ? "bg-white/60 backdrop-blur-md border border-white/20 shadow-lg w-[90%] md:w-auto text-moss" 
        : "bg-transparent text-white w-full max-w-screen-xl border-transparent"
    )}>
      <div className="flex items-center gap-2 mr-12">
        <div className="w-8 h-8 bg-clay rounded-lg flex items-center justify-center">
          <CircleDot className="text-white w-5 h-5" />
        </div>
        <span className="font-sans font-bold text-xl tracking-tight">Nura Health</span>
      </div>
      <div className="hidden md:flex items-center gap-8 font-sans font-medium text-sm">
        <a href="#hero" className="hover:opacity-60 transition-opacity">Philosophy</a>
        <a href="#features" className="hover:opacity-60 transition-opacity">Diagnostic</a>
        <a href="#protocol" className="hover:opacity-60 transition-opacity">Protocol</a>
        <a href="#membership" className="hover:opacity-60 transition-opacity">Membership</a>
      </div>
      <button className={cn(
        "ml-auto px-6 py-2 rounded-full text-xs font-bold tracking-widest uppercase transition-all",
        scrolled ? "bg-moss text-cream" : "bg-cream text-charcoal"
      )}>
        Get Optimized
      </button>
    </nav>
  );
};

const Hero = () => {
  const sectionRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-stagger", {
        y: 60,
        opacity: 0,
        duration: 1.2,
        stagger: 0.2,
        ease: "power4.out",
        delay: 0.5
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="hero" ref={sectionRef} className="relative h-[100dvh] w-full overflow-hidden flex items-end pb-32 px-12">
      {/* Background with Moss-to-Black gradient */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1470115636492-6d2b56f9146d" 
          alt="Dark Forest" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-moss/60 to-transparent mix-blend-multiply" />
        <div className="absolute inset-0 bg-charcoal/20" />
      </div>

      <div className="relative z-10 max-w-4xl" ref={textRef}>
        <div className="hero-stagger overflow-hidden">
          <span className="text-cream/60 font-mono text-sm tracking-[0.2em] uppercase block mb-6">
            Establishing the Optimal Baseline
          </span>
        </div>
        <h1 className="hero-stagger text-white leading-none">
          <span className="block text-6xl md:text-9xl font-sans tracking-tight">Nature is the</span>
          <span className="block text-7xl md:text-[11rem] italic-organic text-clay ml-12 -mt-4">Algorithm.</span>
        </h1>
        <div className="hero-stagger mt-12 flex flex-col md:flex-row gap-8 items-start md:items-center">
          <p className="text-cream/80 text-xl max-w-md font-sans font-light">
            Nura Health bridges the gap between biological intuition and clinical precision. We don't just treat; we architect optimization.
          </p>
          <button className="magnetic-btn px-8 py-4 bg-clay text-cream rounded-full flex items-center gap-3 font-bold group">
            Start Your Audit
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            <div className="magnetic-btn-bg bg-moss" />
          </button>
        </div>
      </div>
    </section>
  );
};

const Features = () => {
  const containerRef = useRef(null);

  return (
    <section id="features" ref={containerRef} className="py-32 px-12 bg-cream">
      <div className="max-w-screen-xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-12">
          <div className="max-w-2xl">
            <span className="font-mono text-xs uppercase tracking-widest text-clay mb-4 block">Interactive Functional Artifacts</span>
            <h2 className="text-5xl md:text-7xl leading-tight">Biological precision meets <span className="italic-organic">digital mastery.</span></h2>
          </div>
          <p className="max-w-xs text-moss font-medium">
            Our micro-UI tools provide real-time visibility into the systems that define your vitality.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1: Diagnostic Shuffler */}
          <DiagnosticShuffler />
          {/* Card 2: Neural Stream */}
          <NeuralStream />
          {/* Card 3: Adaptive Regimen */}
          <MockScheduler />
        </div>
      </div>
    </section>
  );
};

const DiagnosticShuffler = () => {
  const [cards, setCards] = useState([
    { id: 1, label: "Epigenetic Age", value: "-4.2y", color: "bg-moss" },
    { id: 2, label: "Microbiome Score", value: "94/100", color: "bg-clay" },
    { id: 3, label: "Cortisol Optimization", value: "Peak", color: "bg-charcoal" }
  ]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCards(prev => {
        const next = [...prev];
        const last = next.pop()!;
        next.unshift(last);
        return next;
      });
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-white p-8 rounded-[3rem] border border-moss/10 h-[500px] flex flex-col justify-between group overflow-hidden relative">
      <div>
        <div className="w-12 h-12 rounded-2xl bg-cream flex items-center justify-center mb-6">
          <Activity className="text-moss w-6 h-6" />
        </div>
        <h3 className="text-2xl font-bold mb-4">Audit Intelligence</h3>
        <p className="text-moss/60 text-sm">Recursive diagnostic loops tracking sub-cellular markers.</p>
      </div>

      <div className="relative h-64 mt-12">
        {cards.map((card, index) => (
          <div 
            key={card.id}
            className={cn(
              "absolute left-0 right-0 p-6 rounded-3xl transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] flex justify-between items-center shadow-2xl border border-white/20",
              card.color,
              "text-white"
            )}
            style={{
              top: `${index * 20}px`,
              zIndex: 3 - index,
              transform: `scale(${1 - index * 0.05}) translateY(${index * 40}px)`,
              opacity: 1 - index * 0.2
            }}
          >
            <span className="font-mono text-xs uppercase tracking-wider">{card.label}</span>
            <span className="text-2xl font-bold">{card.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const NeuralStream = () => {
  const [text, setText] = useState("");
  const messages = [
    "Optimizing Circadian Rhythm...",
    "Calibrating Neural Pathways...",
    "Enhancing Metabolic Flux...",
    "Stabilizing Glucose Baseline...",
  ];
  const [msgIndex, setMsgIndex] = useState(0);

  useEffect(() => {
    let charIndex = 0;
    const currentMsg = messages[msgIndex];
    
    const type = () => {
      if (charIndex <= currentMsg.length) {
        setText(currentMsg.substring(0, charIndex));
        charIndex++;
        setTimeout(type, 50);
      } else {
        setTimeout(() => {
          setMsgIndex((prev) => (prev + 1) % messages.length);
        }, 2000);
      }
    };

    type();
  }, [msgIndex]);

  return (
    <div className="bg-charcoal p-8 rounded-[3rem] h-[500px] flex flex-col justify-between text-cream relative overflow-hidden">
      <div>
        <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center mb-6">
          <Zap className="text-clay w-6 h-6" />
        </div>
        <h3 className="text-2xl font-bold mb-4">Neural Stream</h3>
        <p className="text-cream/60 text-sm">Real-time telemetry from wearable-integrated sensors.</p>
      </div>

      <div className="bg-black/40 p-6 rounded-2xl border border-white/10 font-mono text-sm h-48 flex items-start">
        <div className="flex flex-col gap-2 w-full">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-2 h-2 bg-clay rounded-full animate-pulse" />
            <span className="text-clay uppercase tracking-widest text-[10px]">Live Feed</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-white/40 font-mono">&gt;</span>
            <span className="text-cream">{text}</span>
            <span className="w-2 h-5 bg-clay animate-pulse" />
          </div>
          <div className="mt-8 grid grid-cols-4 gap-2">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="h-1 bg-white/5 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-moss transition-all duration-1000" 
                  style={{ width: `${Math.random() * 100}%` }} 
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const MockScheduler = () => {
  const cursorRef = useRef(null);
  const days = ["S", "M", "T", "W", "T", "F", "S"];
  const [activeDay, setActiveDay] = useState(2);

  useEffect(() => {
    const tl = gsap.timeline({ repeat: -1 });
    
    tl.to(cursorRef.current, { x: 80, y: 150, duration: 1.5, ease: "power2.inOut", delay: 1 })
      .to(cursorRef.current, { scale: 0.8, duration: 0.2 })
      .call(() => setActiveDay(3))
      .to(cursorRef.current, { scale: 1, duration: 0.2 })
      .to(cursorRef.current, { x: 220, y: 260, duration: 1.2, ease: "power2.inOut", delay: 0.5 })
      .to(cursorRef.current, { scale: 0.8, duration: 0.2 })
      .to(cursorRef.current, { scale: 1, duration: 0.2 })
      .to(cursorRef.current, { opacity: 0, duration: 0.5 })
      .set(cursorRef.current, { x: 0, y: 0, opacity: 1 })
      .call(() => setActiveDay(2));

  }, []);

  return (
    <div className="bg-moss p-8 rounded-[3rem] h-[500px] flex flex-col justify-between text-cream relative overflow-hidden">
      <div className="relative z-10">
        <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center mb-6">
          <ShieldCheck className="text-cream w-6 h-6" />
        </div>
        <h3 className="text-2xl font-bold mb-4">Adaptive Regimen</h3>
        <p className="text-cream/60 text-sm">Automated scheduling based on daily strain and recovery.</p>
      </div>

      <div className="bg-cream p-6 rounded-2xl relative h-64">
        <div className="grid grid-cols-7 gap-2 mb-8">
          {days.map((day, i) => (
            <div 
              key={i} 
              className={cn(
                "h-10 rounded-lg flex items-center justify-center font-mono text-xs font-bold transition-all",
                activeDay === i ? "bg-clay text-white shadow-lg scale-110" : "bg-moss/10 text-moss"
              )}
            >
              {day}
            </div>
          ))}
        </div>
        
        <div className="mt-auto pt-12">
          <div className="w-full h-12 bg-moss rounded-full flex items-center justify-center font-bold text-sm tracking-widest uppercase">
            Save Regimen
          </div>
        </div>

        <div 
          ref={cursorRef} 
          className="absolute z-50 pointer-events-none text-moss"
          style={{ top: 0, left: 0 }}
        >
          <MousePointer2 className="w-6 h-6 fill-moss" />
        </div>
      </div>
    </div>
  );
};

const Philosophy = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".split-text", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
        },
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.3,
        ease: "power4.out"
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-48 bg-charcoal text-cream px-12 relative overflow-hidden">
      <div className="absolute inset-0 opacity-20 mix-blend-overlay">
        <img 
          src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09" 
          alt="Organic Texture" 
          className="w-full h-full object-cover grayscale"
        />
      </div>

      <div className="max-w-screen-xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-24 items-center">
          <div className="overflow-hidden">
            <h2 className="text-4xl md:text-6xl font-sans tracking-tight leading-tight split-text">
              Modern medicine asks:<br />
              <span className="text-white/40">"What is wrong?"</span>
            </h2>
          </div>
          <div className="overflow-hidden md:text-right">
            <h2 className="text-4xl md:text-6xl font-sans tracking-tight leading-tight split-text">
              We ask:<br />
              <span className="italic-organic text-clay">"What is optimal?"</span>
            </h2>
          </div>
        </div>
        
        <div className="mt-32 max-w-2xl mx-auto text-center">
          <p className="text-2xl text-cream/80 font-light leading-relaxed mb-12">
            The standard model is reactive. We are predictive. By decoding the intricate signals of your biology, we create a bespoke roadmap for longevity that feels like a natural extension of your own evolution.
          </p>
          <div className="h-px w-24 bg-clay mx-auto" />
        </div>
      </div>
    </section>
  );
};

const Protocol = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const cards = gsap.utils.toArray(".protocol-card");
    cards.forEach((card: any, i) => {
      if (i === cards.length - 1) return;

      const nextCard = cards[i + 1];
      
      gsap.to(card, {
        scrollTrigger: {
          trigger: nextCard as any,
          start: "top bottom",
          end: "top top",
          scrub: true,
        },
        scale: 0.9,
        opacity: 0.5,
        filter: "blur(20px)",
      });
    });
  }, []);

  return (
    <section id="protocol" ref={sectionRef} className="bg-charcoal">
      <ProtocolCard 
        index={1}
        title="Epigenetic Scaffolding"
        description="Rewrite the expression of your longevity markers through targeted nutrient precision."
        bg="bg-moss"
        artifact={<DnaAnimation />}
      />
      <ProtocolCard 
        index={2}
        title="Neural Architecture"
        description="Fine-tune cognitive clarity and focus through deep-brain stimulation protocols."
        bg="bg-clay"
        artifact={<ScanningGrid />}
      />
      <ProtocolCard 
        index={3}
        title="Systemic Resilience"
        description="Fortify your immune and metabolic systems against environmental entropy."
        bg="bg-cream"
        light
        artifact={<EkgPulse />}
      />
    </section>
  );
};

const ProtocolCard = ({ title, description, bg, light, artifact, index }: any) => {
  return (
    <div className={cn(
      "protocol-card sticky top-0 h-screen w-full flex flex-col md:flex-row items-center px-12 overflow-hidden",
      bg,
      light ? "text-moss" : "text-cream"
    )}>
      <div className="md:w-1/2 relative z-10 py-24">
        <span className="font-mono text-xs uppercase tracking-widest mb-6 block opacity-60">Protocol 00{index}</span>
        <h3 className="text-6xl md:text-8xl font-sans tracking-tighter leading-none mb-12">
          {title.split(' ')[0]}<br />
          <span className="italic-organic opacity-80">{title.split(' ')[1]}</span>
        </h3>
        <p className="text-xl max-w-md font-light mb-12 opacity-80">
          {description}
        </p>
        <button className={cn(
          "px-8 py-4 rounded-full font-bold flex items-center gap-3 transition-all hover:gap-5",
          light ? "bg-moss text-cream" : "bg-cream text-charcoal"
        )}>
          Explore Protocol <ChevronRight className="w-5 h-5" />
        </button>
      </div>
      <div className="md:w-1/2 h-full flex items-center justify-center relative">
        {artifact}
      </div>
    </div>
  );
};

const DnaAnimation = () => {
  return (
    <div className="relative w-64 h-96 flex flex-col items-center justify-between">
      {[...Array(12)].map((_, i) => (
        <div 
          key={i}
          className="flex justify-between w-full h-2 items-center"
          style={{ 
            animation: `dna-rotate 4s infinite linear`,
            animationDelay: `${i * 0.2}s`
          }}
        >
          <div className="w-4 h-4 rounded-full bg-cream shadow-[0_0_15px_rgba(255,255,255,0.5)]" />
          <div className="h-0.5 flex-1 bg-white/20 mx-2" />
          <div className="w-4 h-4 rounded-full bg-clay" />
        </div>
      ))}
      <style>{`
        @keyframes dna-rotate {
          0% { transform: scaleX(1); opacity: 1; }
          25% { transform: scaleX(0); opacity: 0.5; }
          50% { transform: scaleX(-1); opacity: 1; }
          75% { transform: scaleX(0); opacity: 0.5; }
          100% { transform: scaleX(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
};

const ScanningGrid = () => {
  return (
    <div className="relative w-96 h-96 border border-white/20 rounded-full overflow-hidden flex items-center justify-center">
      <div className="absolute inset-0 grid grid-cols-10 grid-rows-10 opacity-20">
        {[...Array(100)].map((_, i) => (
          <div key={i} className="border-[0.5px] border-white/30" />
        ))}
      </div>
      <div className="relative w-64 h-64">
        {[...Array(3)].map((_, i) => (
          <div 
            key={i}
            className="absolute inset-0 border border-white/40 rounded-full"
            style={{ 
              animation: `pulse-ring 3s infinite linear`,
              animationDelay: `${i * 1}s`
            }}
          />
        ))}
        <div className="absolute top-0 left-0 w-full h-0.5 bg-white/60 shadow-[0_0_20px_rgba(255,255,255,0.8)] animate-scan" />
      </div>
      <style>{`
        @keyframes pulse-ring {
          0% { transform: scale(0.8); opacity: 1; }
          100% { transform: scale(1.5); opacity: 0; }
        }
        @keyframes scan {
          0% { top: 0; }
          100% { top: 100%; }
        }
      `}</style>
    </div>
  );
};

const EkgPulse = () => {
  return (
    <div className="w-full h-32 relative overflow-hidden flex items-center">
      <svg viewBox="0 0 1000 100" className="w-full h-full stroke-moss fill-none stroke-[2]">
        <path d="M0,50 L200,50 L220,50 L230,20 L245,80 L255,50 L270,50 L500,50 L700,50 L720,50 L730,20 L745,80 L755,50 L770,50 L1000,50">
          <animate 
            attributeName="stroke-dasharray" 
            from="0,1000" 
            to="1000,0" 
            dur="3s" 
            repeatCount="indefinite" 
          />
        </path>
      </svg>
    </div>
  );
};

const Membership = () => {
  return (
    <section id="membership" className="py-32 bg-cream px-12">
      <div className="max-w-screen-xl mx-auto">
        <div className="text-center mb-24">
          <h2 className="text-5xl md:text-7xl mb-8">Choose your <span className="italic-organic">velocity.</span></h2>
          <p className="text-moss/60 max-w-xl mx-auto">Investment in biology is the only asset with infinite yield. Select a protocol level to begin.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <PriceCard 
            tier="Base" 
            price="450" 
            features={["Bi-annual Diagnostic", "Wearable Integration", "Core Nutrients"]}
          />
          <PriceCard 
            tier="Performance" 
            price="1,200" 
            features={["Monthly Bloodwork", "Adaptive Coaching", "Advanced Nootropics", "Priority Access"]}
            highlight
          />
          <PriceCard 
            tier="Pinnacle" 
            price="4,500" 
            features={["Full Concierge", "Gene Sequencing", "Biological Age Reversal", "Private Facility"]}
          />
        </div>
      </div>
    </section>
  );
};

const PriceCard = ({ tier, price, features, highlight }: any) => {
  return (
    <div className={cn(
      "p-12 rounded-[3rem] border transition-all duration-500 hover:-translate-y-4",
      highlight ? "bg-moss text-cream border-moss shadow-2xl scale-105" : "bg-white text-charcoal border-moss/10"
    )}>
      <span className="font-mono text-xs uppercase tracking-[0.3em] mb-4 block opacity-60">{tier}</span>
      <div className="flex items-baseline gap-2 mb-12">
        <span className="text-5xl font-bold">${price}</span>
        <span className="opacity-60">/month</span>
      </div>
      <div className="space-y-6 mb-12">
        {features.map((f: string, i: number) => (
          <div key={i} className="flex items-center gap-3">
            <div className={cn("w-1.5 h-1.5 rounded-full", highlight ? "bg-clay" : "bg-moss")} />
            <span className="text-sm font-medium">{f}</span>
          </div>
        ))}
      </div>
      <button className={cn(
        "w-full py-4 rounded-full font-bold transition-all",
        highlight ? "bg-clay text-cream hover:bg-clay/90" : "bg-charcoal text-white hover:bg-moss"
      )}>
        Initialize Access
      </button>
    </div>
  );
};

const Footer = () => {
  return (
    <footer className="bg-charcoal text-cream rounded-t-[4rem] px-12 pt-32 pb-12">
      <div className="max-w-screen-xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-24 mb-24">
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-8">
              <div className="w-10 h-10 bg-clay rounded-lg flex items-center justify-center">
                <CircleDot className="text-white w-6 h-6" />
              </div>
              <span className="font-sans font-bold text-2xl tracking-tight">Nura Health</span>
            </div>
            <p className="text-cream/60 max-w-sm text-lg font-light leading-relaxed">
              Architecting the future of human biology. We combine nature's foundational algorithms with clinical-grade precision.
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-8 uppercase tracking-widest text-xs opacity-40">Resources</h4>
            <ul className="space-y-4 font-medium">
              <li><a href="#" className="hover:text-clay transition-colors">Audit Logic</a></li>
              <li><a href="#" className="hover:text-clay transition-colors">Manifesto</a></li>
              <li><a href="#" className="hover:text-clay transition-colors">Clinical Research</a></li>
              <li><a href="#" className="hover:text-clay transition-colors">Network</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-8 uppercase tracking-widest text-xs opacity-40">Company</h4>
            <ul className="space-y-4 font-medium">
              <li><a href="#" className="hover:text-clay transition-colors">Privacy</a></li>
              <li><a href="#" className="hover:text-clay transition-colors">Ethics</a></li>
              <li><a href="#" className="hover:text-clay transition-colors">Contact</a></li>
              <li><a href="#" className="hover:text-clay transition-colors">Status</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.8)]" />
            <span className="font-mono text-xs uppercase tracking-widest">System Operational</span>
          </div>
          <span className="text-cream/40 text-xs font-mono">© 2026 Nura Health Optimization. All markers reserved.</span>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  return (
    <div className="relative overflow-x-hidden">
      <div className="noise-overlay" />
      <Navbar />
      <main>
        <Hero />
        <Features />
        <Philosophy />
        <Protocol />
        <Membership />
      </main>
      <Footer />
    </div>
  );
}

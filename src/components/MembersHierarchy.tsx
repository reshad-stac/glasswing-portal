import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Users } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface Member {
  position: string;
  count: number;
  level: number;
  index: number;
}

const hierarchyData: Member[] = [
  { position: 'Secretary', count: 1, level: 0, index: 0 },
  { position: 'Senior Deputy', count: 1, level: 1, index: 0 },
  { position: 'Deputy', count: 1, level: 1, index: 1 },
  { position: 'Junior Deputy', count: 1, level: 1, index: 2 },
  { position: 'Senior Executive', count: 4, level: 2, index: 0 },
  { position: 'Executive', count: 6, level: 2, index: 1 },
  { position: 'Junior Executive', count: 8, level: 2, index: 2 },
];

export default function MembersHierarchy() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const linesRef = useRef<(SVGLineElement | null)[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    const cards = cardsRef.current.filter(Boolean);
    const lines = linesRef.current.filter(Boolean);
    
    // Animate cards on scroll
    cards.forEach((card, index) => {
      gsap.fromTo(
        card,
        {
          opacity: 0,
          y: 100,
          scale: 0.8,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 60%',
            end: 'top 30%',
            toggleActions: 'play none none reverse',
          },
          delay: index * 0.15,
        }
      );
    });

    // Animate connection lines
    lines.forEach((line, index) => {
      gsap.fromTo(
        line,
        {
          strokeDashoffset: 1000,
        },
        {
          strokeDashoffset: 0,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 60%',
            end: 'top 30%',
            toggleActions: 'play none none reverse',
          },
          delay: index * 0.1 + 0.3,
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const handleCardHover = (index: number, isHovering: boolean) => {
    const card = cardsRef.current[index];
    if (!card) return;

    gsap.to(card, {
      scale: isHovering ? 1.1 : 1,
      y: isHovering ? -10 : 0,
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  return (
    <section ref={containerRef} className="relative py-20 px-4 z-10">
      <div className="container mx-auto max-w-7xl">
        <h2 className="text-4xl md:text-5xl font-bold gradient-text text-center mb-4">
          Our Team Hierarchy
        </h2>
        <p className="text-muted-foreground text-center mb-16 max-w-2xl mx-auto">
          Meet the talented individuals who drive innovation and excellence in the Development Wing
        </p>

        {/* 3D Isometric Tree Container */}
        <div 
          className="relative min-h-[800px] flex items-center justify-center"
          style={{
            perspective: '2000px',
            transformStyle: 'preserve-3d',
          }}
        >
          {/* SVG for connection lines */}
          <svg 
            className="absolute inset-0 w-full h-full pointer-events-none z-0"
            style={{ overflow: 'visible' }}
          >
            <defs>
              <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.3" />
                <stop offset="100%" stopColor="hsl(var(--accent))" stopOpacity="0.3" />
              </linearGradient>
            </defs>
            
            {/* Lines from Secretary to Deputies */}
            <line ref={el => linesRef.current[0] = el} x1="50%" y1="15%" x2="20%" y2="40%" stroke="url(#lineGradient)" strokeWidth="2" strokeDasharray="10,5" />
            <line ref={el => linesRef.current[1] = el} x1="50%" y1="15%" x2="50%" y2="40%" stroke="url(#lineGradient)" strokeWidth="2" strokeDasharray="10,5" />
            <line ref={el => linesRef.current[2] = el} x1="50%" y1="15%" x2="80%" y2="40%" stroke="url(#lineGradient)" strokeWidth="2" strokeDasharray="10,5" />
            
            {/* Lines from Deputies to Executives */}
            <line ref={el => linesRef.current[3] = el} x1="20%" y1="50%" x2="20%" y2="75%" stroke="url(#lineGradient)" strokeWidth="2" strokeDasharray="10,5" />
            <line ref={el => linesRef.current[4] = el} x1="50%" y1="50%" x2="50%" y2="75%" stroke="url(#lineGradient)" strokeWidth="2" strokeDasharray="10,5" />
            <line ref={el => linesRef.current[5] = el} x1="80%" y1="50%" x2="80%" y2="75%" stroke="url(#lineGradient)" strokeWidth="2" strokeDasharray="10,5" />
          </svg>

          {/* Level 0: Secretary */}
          <div
            ref={(el) => (cardsRef.current[0] = el)}
            className="absolute top-[5%] left-1/2 -translate-x-1/2 glass-card p-6 cursor-pointer group w-64"
            style={{
              transformStyle: 'preserve-3d',
              transform: 'rotateX(15deg) rotateY(-5deg) translateZ(100px)',
            }}
            onMouseEnter={() => handleCardHover(0, true)}
            onMouseLeave={() => handleCardHover(0, false)}
          >
            <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/30 via-accent/30 to-primary/30 blur-xl" />
            </div>
            <div className="relative z-10">
              <div className="w-20 h-20 mx-auto mb-3 rounded-full bg-gradient-to-br from-primary/40 to-accent/40 border-2 border-primary/60 flex items-center justify-center">
                <Users className="w-10 h-10 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-center text-foreground mb-1">Secretary</h3>
              <p className="text-muted-foreground text-center text-sm">1 Position</p>
              <div className="mt-3 h-1 w-12 mx-auto rounded-full bg-gradient-to-r from-primary to-accent" />
            </div>
          </div>

          {/* Level 1: Deputies */}
          {hierarchyData.slice(1, 4).map((member, idx) => (
            <div
              key={idx}
              ref={(el) => (cardsRef.current[idx + 1] = el)}
              className="absolute top-[35%] glass-card p-6 cursor-pointer group w-56"
              style={{
                transformStyle: 'preserve-3d',
                transform: `rotateX(10deg) rotateY(${idx === 0 ? '-10deg' : idx === 2 ? '10deg' : '0deg'}) translateZ(${80 - idx * 10}px)`,
                left: `${20 + idx * 30}%`,
                marginLeft: '-7rem',
              }}
              onMouseEnter={() => handleCardHover(idx + 1, true)}
              onMouseLeave={() => handleCardHover(idx + 1, false)}
            >
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 blur-xl" />
              </div>
              <div className="relative z-10">
                <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-gradient-to-br from-primary/30 to-accent/30 border-2 border-primary/50 flex items-center justify-center">
                  <Users className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-lg font-bold text-center text-foreground mb-1">{member.position}</h3>
                <p className="text-muted-foreground text-center text-sm">1 Position</p>
                <div className="mt-3 h-0.5 w-10 mx-auto rounded-full bg-gradient-to-r from-primary to-accent opacity-70" />
              </div>
            </div>
          ))}

          {/* Level 2: Executives */}
          {hierarchyData.slice(4, 7).map((member, idx) => (
            <div
              key={idx}
              ref={(el) => (cardsRef.current[idx + 4] = el)}
              className="absolute top-[65%] glass-card p-6 cursor-pointer group w-52"
              style={{
                transformStyle: 'preserve-3d',
                transform: `rotateX(5deg) rotateY(${idx === 0 ? '-8deg' : idx === 2 ? '8deg' : '0deg'}) translateZ(${60 - idx * 10}px)`,
                left: `${20 + idx * 30}%`,
                marginLeft: '-6.5rem',
              }}
              onMouseEnter={() => handleCardHover(idx + 4, true)}
              onMouseLeave={() => handleCardHover(idx + 4, false)}
            >
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute inset-0 bg-gradient-to-r from-accent/20 via-primary/20 to-accent/20 blur-xl" />
              </div>
              <div className="relative z-10">
                {member.count > 1 && (
                  <div className="absolute -top-2 -right-2 w-10 h-10 rounded-full bg-primary/20 backdrop-blur-sm border border-primary/30 flex items-center justify-center">
                    <span className="text-primary font-bold text-sm">{member.count}</span>
                  </div>
                )}
                <div className="w-14 h-14 mx-auto mb-3 rounded-full bg-gradient-to-br from-accent/30 to-primary/30 border-2 border-accent/50 flex items-center justify-center">
                  <Users className="w-7 h-7 text-accent" />
                </div>
                <h3 className="text-base font-bold text-center text-foreground mb-1">{member.position}</h3>
                <p className="text-muted-foreground text-center text-xs">{member.count} Positions</p>
                <div className="mt-2 h-0.5 w-8 mx-auto rounded-full bg-gradient-to-r from-accent to-primary opacity-60" />
              </div>
            </div>
          ))}
        </div>

        {/* Stats summary */}
        <div className="mt-16 glass-card p-8 text-center max-w-md mx-auto">
          <h3 className="text-2xl font-bold text-foreground mb-4">Total Positions</h3>
          <div className="text-6xl font-bold gradient-text">
            {hierarchyData.reduce((sum, member) => sum + member.count, 0)}
          </div>
          <p className="text-muted-foreground mt-2">Available to Join</p>
        </div>
      </div>
    </section>
  );
}

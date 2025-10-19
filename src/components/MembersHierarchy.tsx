import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { User } from 'lucide-react';

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
  const circlesRef = useRef<(HTMLDivElement | null)[]>([]);
  const linesRef = useRef<(SVGLineElement | null)[]>([]);
  const expandedCirclesRef = useRef<(HTMLDivElement | null)[]>([]);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const circles = circlesRef.current.filter(Boolean);
    const lines = linesRef.current.filter(Boolean);
    
    // Animate circles on scroll
    circles.forEach((circle, index) => {
      gsap.fromTo(
        circle,
        {
          opacity: 0,
          scale: 0,
          y: -50,
        },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.6,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 60%',
            end: 'top 30%',
            toggleActions: 'play none none reverse',
          },
          delay: index * 0.1,
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
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 60%',
            end: 'top 30%',
            toggleActions: 'play none none reverse',
          },
          delay: index * 0.08,
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const handleCircleHover = (index: number, isHovering: boolean, hasMultiple: boolean) => {
    const circle = circlesRef.current[index];
    if (!circle) return;

    setHoveredIndex(isHovering ? index : null);

    if (hasMultiple && isHovering) {
      setExpandedIndex(index);
    } else if (!isHovering) {
      setExpandedIndex(null);
    }

    gsap.to(circle, {
      scale: isHovering && !hasMultiple ? 1.15 : 1,
      y: isHovering && !hasMultiple ? -8 : 0,
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  useEffect(() => {
    if (expandedIndex !== null) {
      const member = hierarchyData[expandedIndex];
      if (member && member.count > 1) {
        expandedCirclesRef.current.forEach((circle, idx) => {
          if (!circle) return;
          
          gsap.fromTo(
            circle,
            {
              opacity: 0,
              scale: 0,
            },
            {
              opacity: 1,
              scale: 1,
              duration: 0.4,
              ease: 'back.out(2)',
              delay: idx * 0.05,
            }
          );
        });
      }
    }
  }, [expandedIndex]);

  return (
    <section ref={containerRef} className="relative py-20 px-4 z-10">
      <div className="container mx-auto max-w-7xl">
        <h2 className="text-4xl md:text-5xl font-bold gradient-text text-center mb-4">
          Our Team Hierarchy
        </h2>
        <p className="text-muted-foreground text-center mb-16 max-w-2xl mx-auto">
          Meet the talented individuals who drive innovation and excellence in the Development Wing
        </p>

        {/* Tree Structure Container */}
        <div className="relative min-h-[700px] flex items-center justify-center">
          {/* SVG for connection lines */}
          <svg 
            className="absolute inset-0 w-full h-full pointer-events-none z-0"
            style={{ overflow: 'visible' }}
          >
            <defs>
              <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.6" />
                <stop offset="100%" stopColor="hsl(var(--accent))" stopOpacity="0.6" />
              </linearGradient>
            </defs>
            
            {/* Vertical line from Secretary */}
            <line ref={el => linesRef.current[0] = el} x1="50%" y1="12%" x2="50%" y2="32%" stroke="url(#lineGradient)" strokeWidth="3" strokeDasharray="1000" />
            
            {/* Horizontal line connecting Deputies */}
            <line ref={el => linesRef.current[1] = el} x1="25%" y1="40%" x2="75%" y2="40%" stroke="url(#lineGradient)" strokeWidth="3" strokeDasharray="1000" />
            
            {/* Lines from Deputies to horizontal bar */}
            <line ref={el => linesRef.current[2] = el} x1="25%" y1="32%" x2="25%" y2="40%" stroke="url(#lineGradient)" strokeWidth="3" strokeDasharray="1000" />
            <line ref={el => linesRef.current[3] = el} x1="50%" y1="32%" x2="50%" y2="40%" stroke="url(#lineGradient)" strokeWidth="3" strokeDasharray="1000" />
            <line ref={el => linesRef.current[4] = el} x1="75%" y1="32%" x2="75%" y2="40%" stroke="url(#lineGradient)" strokeWidth="3" strokeDasharray="1000" />
            
            {/* Horizontal line connecting Executives */}
            <line ref={el => linesRef.current[5] = el} x1="20%" y1="68%" x2="80%" y2="68%" stroke="url(#lineGradient)" strokeWidth="3" strokeDasharray="1000" />
            
            {/* Lines from horizontal bar to Executives */}
            <line ref={el => linesRef.current[6] = el} x1="20%" y1="48%" x2="20%" y2="68%" stroke="url(#lineGradient)" strokeWidth="3" strokeDasharray="1000" />
            <line ref={el => linesRef.current[7] = el} x1="50%" y1="48%" x2="50%" y2="68%" stroke="url(#lineGradient)" strokeWidth="3" strokeDasharray="1000" />
            <line ref={el => linesRef.current[8] = el} x1="80%" y1="48%" x2="80%" y2="68%" stroke="url(#lineGradient)" strokeWidth="3" strokeDasharray="1000" />
            
            {/* Lines down to Executive circles */}
            <line ref={el => linesRef.current[9] = el} x1="20%" y1="68%" x2="20%" y2="78%" stroke="url(#lineGradient)" strokeWidth="3" strokeDasharray="1000" />
            <line ref={el => linesRef.current[10] = el} x1="50%" y1="68%" x2="50%" y2="78%" stroke="url(#lineGradient)" strokeWidth="3" strokeDasharray="1000" />
            <line ref={el => linesRef.current[11] = el} x1="80%" y1="68%" x2="80%" y2="78%" stroke="url(#lineGradient)" strokeWidth="3" strokeDasharray="1000" />
          </svg>

          {/* Level 0: Secretary */}
          <div
            ref={(el) => (circlesRef.current[0] = el)}
            className="absolute top-[5%] left-1/2 -translate-x-1/2 cursor-pointer group"
            onMouseEnter={() => handleCircleHover(0, true, false)}
            onMouseLeave={() => handleCircleHover(0, false, false)}
          >
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary/90 to-accent/90 border-4 border-background shadow-2xl flex items-center justify-center overflow-hidden backdrop-blur-sm">
                <User className="w-12 h-12 text-background" strokeWidth={2.5} />
              </div>
              {/* Glow effect */}
              <div className="absolute inset-0 rounded-full bg-primary/40 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
              {/* Label on hover */}
              {hoveredIndex === 0 && (
                <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 whitespace-nowrap bg-background/95 backdrop-blur-sm px-4 py-2 rounded-lg border border-primary/20 shadow-lg">
                  <p className="text-sm font-bold text-foreground">Secretary</p>
                  <p className="text-xs text-muted-foreground">1 Position</p>
                </div>
              )}
            </div>
          </div>

          {/* Level 1: Deputies */}
          {hierarchyData.slice(1, 4).map((member, idx) => {
            const positions = [25, 50, 75];
            return (
              <div
                key={idx}
                ref={(el) => (circlesRef.current[idx + 1] = el)}
                className="absolute top-[25%] cursor-pointer group"
                style={{ left: `${positions[idx]}%`, transform: 'translateX(-50%)' }}
                onMouseEnter={() => handleCircleHover(idx + 1, true, false)}
                onMouseLeave={() => handleCircleHover(idx + 1, false, false)}
              >
                <div className="relative">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary/80 to-accent/80 border-4 border-background shadow-xl flex items-center justify-center overflow-hidden backdrop-blur-sm">
                    <User className="w-10 h-10 text-background" strokeWidth={2.5} />
                  </div>
                  {/* Glow effect */}
                  <div className="absolute inset-0 rounded-full bg-primary/30 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
                  {/* Label on hover */}
                  {hoveredIndex === idx + 1 && (
                    <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 whitespace-nowrap bg-background/95 backdrop-blur-sm px-3 py-2 rounded-lg border border-primary/20 shadow-lg">
                      <p className="text-sm font-bold text-foreground">{member.position}</p>
                      <p className="text-xs text-muted-foreground">1 Position</p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {/* Level 2: Executives */}
          {hierarchyData.slice(4, 7).map((member, idx) => {
            const positions = [20, 50, 80];
            const isExpanded = expandedIndex === idx + 4;
            
            return (
              <div
                key={idx}
                ref={(el) => (circlesRef.current[idx + 4] = el)}
                className="absolute top-[75%] cursor-pointer group"
                style={{ left: `${positions[idx]}%`, transform: 'translateX(-50%)' }}
                onMouseEnter={() => handleCircleHover(idx + 4, true, member.count > 1)}
                onMouseLeave={() => handleCircleHover(idx + 4, false, member.count > 1)}
              >
                <div className="relative">
                  {/* Main circle */}
                  <div className={`w-20 h-20 rounded-full bg-gradient-to-br from-accent/80 to-primary/80 border-4 border-background shadow-xl flex items-center justify-center overflow-hidden backdrop-blur-sm transition-all duration-300 ${isExpanded ? 'scale-110' : ''}`}>
                    <User className="w-10 h-10 text-background" strokeWidth={2.5} />
                  </div>
                  
                  {/* Count badge */}
                  {member.count > 1 && !isExpanded && (
                    <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-primary border-2 border-background flex items-center justify-center shadow-lg">
                      <span className="text-background font-bold text-xs">{member.count}</span>
                    </div>
                  )}
                  
                  {/* Glow effect */}
                  <div className="absolute inset-0 rounded-full bg-accent/30 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
                  
                  {/* Label on hover */}
                  {hoveredIndex === idx + 4 && !isExpanded && (
                    <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 whitespace-nowrap bg-background/95 backdrop-blur-sm px-3 py-2 rounded-lg border border-accent/20 shadow-lg z-50">
                      <p className="text-sm font-bold text-foreground">{member.position}</p>
                      <p className="text-xs text-muted-foreground">{member.count} Positions</p>
                    </div>
                  )}

                  {/* Expanded individual members */}
                  {isExpanded && member.count > 1 && (
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                      {Array.from({ length: member.count }).map((_, memberIdx) => {
                        const angle = (memberIdx / member.count) * Math.PI * 2 - Math.PI / 2;
                        const radius = 80;
                        const x = Math.cos(angle) * radius;
                        const y = Math.sin(angle) * radius;
                        
                        return (
                          <div
                            key={memberIdx}
                            ref={(el) => (expandedCirclesRef.current[memberIdx] = el)}
                            className="absolute"
                            style={{
                              left: `${x}px`,
                              top: `${y}px`,
                              transform: 'translate(-50%, -50%)',
                            }}
                          >
                            <div className="relative group/member">
                              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-accent/90 to-primary/90 border-3 border-background shadow-lg flex items-center justify-center overflow-hidden backdrop-blur-sm hover:scale-110 transition-transform duration-200">
                                <User className="w-8 h-8 text-background" strokeWidth={2.5} />
                              </div>
                              {/* Individual member glow */}
                              <div className="absolute inset-0 rounded-full bg-accent/40 blur-md opacity-0 group-hover/member:opacity-100 transition-opacity duration-200 -z-10" />
                              {/* Member number */}
                              <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-primary border border-background flex items-center justify-center shadow-sm">
                                <span className="text-background font-bold text-[10px]">{memberIdx + 1}</span>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                      {/* Center label */}
                      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-background/95 backdrop-blur-sm px-4 py-2 rounded-lg border border-accent/30 shadow-xl pointer-events-none">
                        <p className="text-xs font-bold text-foreground whitespace-nowrap">{member.position}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Stats summary */}
        <div className="mt-24 glass-card p-8 text-center max-w-md mx-auto">
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

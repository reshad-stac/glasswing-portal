import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Users } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface Member {
  name: string;
  position: string;
  image: string;
  count: number;
}

const hierarchyData: Member[] = [
  { name: 'Secretary', position: 'Secretary', image: '/placeholder.svg', count: 1 },
  { name: 'Senior Deputy', position: 'Senior Deputy', image: '/placeholder.svg', count: 1 },
  { name: 'Deputy', position: 'Deputy', image: '/placeholder.svg', count: 1 },
  { name: 'Junior Deputy', position: 'Junior Deputy', image: '/placeholder.svg', count: 1 },
  { name: 'Senior Executive', position: 'Senior Executive', image: '/placeholder.svg', count: 4 },
  { name: 'Executive', position: 'Executive', image: '/placeholder.svg', count: 6 },
  { name: 'Junior Executive', position: 'Junior Executive', image: '/placeholder.svg', count: 8 },
];

export default function MembersHierarchy() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    const cards = cardsRef.current.filter(Boolean);
    
    // Animate cards on scroll
    cards.forEach((card, index) => {
      gsap.fromTo(
        card,
        {
          opacity: 0,
          y: 100,
          rotateX: -45,
          scale: 0.8,
        },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          scale: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 80%',
            end: 'top 50%',
            toggleActions: 'play none none reverse',
          },
          delay: index * 0.1,
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
      z: isHovering ? 50 : 0,
      scale: isHovering ? 1.05 : 1,
      rotateY: isHovering ? 5 : 0,
      duration: 0.4,
      ease: 'power2.out',
    });
  };

  return (
    <section ref={containerRef} className="relative py-20 px-4 z-10">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-4xl md:text-5xl font-bold gradient-text text-center mb-4">
          Our Team Hierarchy
        </h2>
        <p className="text-muted-foreground text-center mb-16 max-w-2xl mx-auto">
          Meet the talented individuals who drive innovation and excellence in the Development Wing
        </p>

        <div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          style={{ perspective: '1000px' }}
        >
          {hierarchyData.map((member, index) => (
            <div
              key={index}
              ref={(el) => (cardsRef.current[index] = el)}
              className="glass-card p-6 cursor-pointer relative group"
              style={{
                transformStyle: 'preserve-3d',
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
              }}
              onMouseEnter={() => handleCardHover(index, true)}
              onMouseLeave={() => handleCardHover(index, false)}
            >
              {/* Glow effect on hover */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 blur-xl" />
              </div>

              <div className="relative z-10">
                {/* Member count indicator */}
                {member.count > 1 && (
                  <div className="absolute -top-2 -right-2 w-10 h-10 rounded-full bg-primary/20 backdrop-blur-sm border border-primary/30 flex items-center justify-center">
                    <span className="text-primary font-bold">{member.count}</span>
                  </div>
                )}

                {/* Image placeholder or icon */}
                <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary/30 to-accent/30 border-2 border-primary/50 flex items-center justify-center overflow-hidden">
                  <Users className="w-12 h-12 text-primary" />
                </div>

                {/* Position */}
                <h3 className="text-xl font-bold text-center text-foreground mb-2">
                  {member.position}
                </h3>

                {/* Member count text */}
                <p className="text-muted-foreground text-center text-sm">
                  {member.count === 1 ? '1 Position' : `${member.count} Positions`}
                </p>

                {/* Decorative line */}
                <div className="mt-4 h-1 w-16 mx-auto rounded-full bg-gradient-to-r from-primary to-accent opacity-50 group-hover:opacity-100 transition-opacity" />
              </div>

              {/* 3D depth indicators */}
              <div 
                className="absolute inset-0 rounded-2xl border border-white/5 pointer-events-none"
                style={{ transform: 'translateZ(10px)' }}
              />
              <div 
                className="absolute inset-0 rounded-2xl border border-white/3 pointer-events-none"
                style={{ transform: 'translateZ(20px)' }}
              />
            </div>
          ))}
        </div>

        {/* Stats summary */}
        <div className="mt-16 glass-card p-8 text-center">
          <h3 className="text-2xl font-bold text-foreground mb-4">Total Team Members</h3>
          <div className="text-6xl font-bold gradient-text">
            {hierarchyData.reduce((sum, member) => sum + member.count, 0)}
          </div>
          <p className="text-muted-foreground mt-2">Positions Available</p>
        </div>
      </div>
    </section>
  );
}

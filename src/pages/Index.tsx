import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import StarField from '@/components/StarField';
import Scene3D from '@/components/Scene3D';
import StatCard from '@/components/StatCard';
import Navigation from '@/components/Navigation';
import SplitText from '@/components/SplitTextProps';
import DecryptedText from '@/components/SplitTextProps';
import Threads from '@/components/Threads'
import { ArrowRight, Users, Code, Rocket } from 'lucide-react';

export default function Index() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      <StarField />
      <Navigation />

      {/* Fixed 3D Scene - visible throughout entire page */}
      <div className="fixed inset-0 flex items-center justify-center opacity-30 pointer-events-none z-0">
        <Scene3D />
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 z-10">

        <div className="container mx-auto px-4 relative z-20">
          <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in">

            <h1>
              <SplitText
                text="Development Wing"
                className="text-5xl md:text-7xl font-bold text-center leading-tight text-purple-500"
                delay={100}
                duration={0.6}
                ease="power3.out"
                splitType="chars"
                from={{ opacity: 0, y: 40 }}
                to={{ opacity: 1, y: 0 }}
                threshold={0.1}
                rootMargin="-100px"
                textAlign="center"
              />
            </h1>
            

            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
            <DecryptedText text="Build yourself, By yourself. Join us in creating innovative solutions and pushing the boundaries of technology." />

  
            
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
              <Link to="/register">
                <Button size="lg" className="cursor-target">
                  Join the Journey
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/about">
                <Button
                  size="lg"
                  variant="outline"
                  className="glass-button border-white/20 text-foreground cursor-target"
                >
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </div>
        
      </section>

      {/* Stats Section */}
      <section className="relative py-20 px-4 z-10">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto ">
            <StatCard value="50+" label="Active Members" delay={100} />
            <StatCard value="25+" label="Projects Completed" delay={200} />
            <StatCard value="∞" label="Opportunities" delay={300} />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-20 px-4 z-10">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl md:text-5xl font-bold gradient-text text-center mb-16 cursor-target">
            What We Offer
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="glass-card p-8 space-y-4 hover:scale-105 transition-transform animate-slide-in cursor-target">
              <Users className="w-12 h-12 text-primary" />
              <h3 className="text-2xl font-bold text-foreground">Community</h3>
              <p className="text-muted-foreground">
                Connect with like-minded developers, share knowledge, and grow together in a supportive environment.
              </p>
            </div>

            <div className="glass-card p-8 space-y-4 hover:scale-105 transition-transform animate-slide-in cursor-target" style={{ animationDelay: '100ms' }}>
              <Code className="w-12 h-12 text-accent" />
              <h3 className="text-2xl font-bold text-foreground">Projects</h3>
              <p className="text-muted-foreground">
                Work on real-world projects, build your portfolio, and gain hands-on experience with modern technologies.
              </p>
            </div>

            <div className="glass-card p-8 space-y-4 hover:scale-105 transition-transform animate-slide-in cursor-target" style={{ animationDelay: '200ms' }}>
              <Rocket className="w-12 h-12 text-primary" />
              <h3 className="text-2xl font-bold text-foreground">Growth</h3>
              <p className="text-muted-foreground">
                Access workshops, mentorship, and resources to accelerate your development journey and career.
              </p>
            </div>
            
          </div>
        </div>
      </section>
    </div>
  );
}

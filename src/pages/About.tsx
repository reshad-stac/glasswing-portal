import Navigation from '@/components/Navigation';
import StarField from '@/components/StarField';
import { Target, Eye, Lightbulb, Users } from 'lucide-react';

export default function About() {
  return (
    <div className="min-h-screen relative">
      <StarField />
      <Navigation />

      <div className="container mx-auto px-4 pt-32 pb-20 relative z-10">
        <div className="max-w-4xl mx-auto space-y-16">
          {/* Header */}
          <div className="text-center space-y-4 animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-bold gradient-text">
              About Development Wing
            </h1>
            <p className="text-xl text-muted-foreground">
              Empowering the next generation of developers
            </p>
          </div>

          {/* Mission */}
          <div className="glass-card p-8 md:p-12 space-y-6 animate-slide-in">
            <div className="flex items-center gap-4">
              <Target className="w-10 h-10 text-primary animate-glow" />
              <h2 className="text-3xl font-bold text-foreground">Our Mission</h2>
            </div>
            <p className="text-lg text-muted-foreground leading-relaxed">
              To cultivate a thriving community of passionate developers who collaborate, innovate, and create 
              impactful solutions. We strive to provide hands-on learning experiences, mentorship, and opportunities 
              that empower students to excel in software development and technology leadership.
            </p>
          </div>

          {/* Vision */}
          <div className="glass-card p-8 md:p-12 space-y-6 animate-slide-in" style={{ animationDelay: '100ms' }}>
            <div className="flex items-center gap-4">
              <Eye className="w-10 h-10 text-accent animate-glow" />
              <h2 className="text-3xl font-bold text-foreground">Our Vision</h2>
            </div>
            <p className="text-lg text-muted-foreground leading-relaxed">
              To be the leading platform where aspiring developers transform into industry-ready professionals 
              through practical experience, collaborative projects, and continuous learning. We envision a future 
              where every member contributes to groundbreaking technological innovations.
            </p>
          </div>

          {/* What We Do */}
          <div className="space-y-8 animate-fade-in" style={{ animationDelay: '200ms' }}>
            <h2 className="text-3xl font-bold gradient-text text-center">What We Do</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="glass-card p-6 space-y-3">
                <Lightbulb className="w-8 h-8 text-primary" />
                <h3 className="text-xl font-bold text-foreground">Workshops & Training</h3>
                <p className="text-muted-foreground">
                  Regular workshops on cutting-edge technologies, frameworks, and development best practices.
                </p>
              </div>

              <div className="glass-card p-6 space-y-3">
                <Users className="w-8 h-8 text-accent" />
                <h3 className="text-xl font-bold text-foreground">Team Projects</h3>
                <p className="text-muted-foreground">
                  Collaborative projects that simulate real-world development scenarios and build portfolio-worthy applications.
                </p>
              </div>

              <div className="glass-card p-6 space-y-3">
                <Target className="w-8 h-8 text-primary" />
                <h3 className="text-xl font-bold text-foreground">Hackathons</h3>
                <p className="text-muted-foreground">
                  Participate in and organize hackathons to challenge yourself and showcase your skills.
                </p>
              </div>

              <div className="glass-card p-6 space-y-3">
                <Eye className="w-8 h-8 text-accent" />
                <h3 className="text-xl font-bold text-foreground">Mentorship</h3>
                <p className="text-muted-foreground">
                  Connect with experienced developers and industry professionals for guidance and career advice.
                </p>
              </div>
            </div>
          </div>

          {/* Values */}
          <div className="glass-card p-8 md:p-12 space-y-6 animate-fade-in" style={{ animationDelay: '300ms' }}>
            <h2 className="text-3xl font-bold gradient-text text-center mb-8">Our Core Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-bold text-primary mb-2">Innovation</h3>
                <p className="text-muted-foreground">Constantly exploring new technologies and creative solutions.</p>
              </div>
              <div>
                <h3 className="text-xl font-bold text-accent mb-2">Collaboration</h3>
                <p className="text-muted-foreground">Working together to achieve greater outcomes.</p>
              </div>
              <div>
                <h3 className="text-xl font-bold text-primary mb-2">Excellence</h3>
                <p className="text-muted-foreground">Striving for the highest quality in everything we create.</p>
              </div>
              <div>
                <h3 className="text-xl font-bold text-accent mb-2">Inclusion</h3>
                <p className="text-muted-foreground">Creating a welcoming space for developers of all skill levels.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

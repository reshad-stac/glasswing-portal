import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Navigation from '@/components/Navigation';
import StarField from '@/components/StarField';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { UserPlus } from 'lucide-react';

const registrationSchema = z.object({
  fullName: z.string().trim().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().trim().email('Invalid email address').max(255),
  studentId: z.string().trim().min(3, 'Student ID is required').max(50),
  year: z.string().trim().min(1, 'Year is required'),
  skills: z.string().trim().max(500, 'Skills must be less than 500 characters'),
  motivation: z.string().trim().min(20, 'Please provide more detail (at least 20 characters)').max(1000),
});

type RegistrationForm = z.infer<typeof registrationSchema>;

export default function Register() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RegistrationForm>({
    resolver: zodResolver(registrationSchema),
  });

  const onSubmit = async (data: RegistrationForm) => {
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    console.log('Registration data:', data);
    
    toast({
      title: 'Registration Successful!',
      description: 'Welcome to the Development Wing. We will contact you soon.',
    });
    
    reset();
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen relative">
      <StarField />
      <Navigation />

      <div className="container mx-auto px-4 pt-32 pb-20 relative z-10">
        <div className="max-w-2xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center space-y-4 animate-fade-in">
            <UserPlus className="w-16 h-16 text-primary mx-auto animate-glow" />
            <h1 className="text-4xl md:text-5xl font-bold gradient-text">
              Join Development Wing
            </h1>
            <p className="text-lg text-muted-foreground">
              Take the first step towards becoming part of our innovative community
            </p>
          </div>

          {/* Registration Form */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="glass-card p-8 md:p-12 space-y-6 animate-slide-in"
          >
            {/* Full Name */}
            <div className="space-y-2">
              <Label htmlFor="fullName" className="text-foreground">
                Full Name *
              </Label>
              <Input
                id="fullName"
                {...register('fullName')}
                placeholder="John Doe"
                className="glass-button border-white/20 text-foreground placeholder:text-muted-foreground"
              />
              {errors.fullName && (
                <p className="text-destructive text-sm">{errors.fullName.message}</p>
              )}
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-foreground">
                Email Address *
              </Label>
              <Input
                id="email"
                type="email"
                {...register('email')}
                placeholder="john@university.edu"
                className="glass-button border-white/20 text-foreground placeholder:text-muted-foreground"
              />
              {errors.email && (
                <p className="text-destructive text-sm">{errors.email.message}</p>
              )}
            </div>

            {/* Student ID and Year */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="studentId" className="text-foreground">
                  Student ID *
                </Label>
                <Input
                  id="studentId"
                  {...register('studentId')}
                  placeholder="STU2024001"
                  className="glass-button border-white/20 text-foreground placeholder:text-muted-foreground"
                />
                {errors.studentId && (
                  <p className="text-destructive text-sm">{errors.studentId.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="year" className="text-foreground">
                  Year *
                </Label>
                <Input
                  id="year"
                  {...register('year')}
                  placeholder="e.g., 2nd Year"
                  className="glass-button border-white/20 text-foreground placeholder:text-muted-foreground"
                />
                {errors.year && (
                  <p className="text-destructive text-sm">{errors.year.message}</p>
                )}
              </div>
            </div>

            {/* Skills */}
            <div className="space-y-2">
              <Label htmlFor="skills" className="text-foreground">
                Skills & Technologies
              </Label>
              <Textarea
                id="skills"
                {...register('skills')}
                placeholder="e.g., React, Python, Java, Machine Learning..."
                rows={3}
                className="glass-button border-white/20 text-foreground placeholder:text-muted-foreground"
              />
              {errors.skills && (
                <p className="text-destructive text-sm">{errors.skills.message}</p>
              )}
            </div>

            {/* Motivation */}
            <div className="space-y-2">
              <Label htmlFor="motivation" className="text-foreground">
                Why do you want to join? *
              </Label>
              <Textarea
                id="motivation"
                {...register('motivation')}
                placeholder="Tell us about your passion for development and what you hope to achieve..."
                rows={5}
                className="glass-button border-white/20 text-foreground placeholder:text-muted-foreground"
              />
              {errors.motivation && (
                <p className="text-destructive text-sm">{errors.motivation.message}</p>
              )}
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full glass-button text-foreground text-lg py-6"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Registration'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

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
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { UserPlus } from 'lucide-react';

const positions = [
  'Senior Deputy',
  'Deputy',
  'Junior Deputy',
  'Senior Executive',
  'Executive',
  'Junior Executive',
] as const;

const registrationSchema = z.object({
  fullName: z.string().trim().min(2, 'Full name is required').max(100),
  studentId: z.string().trim().min(1, 'Student ID is required').max(50),
  department: z.string().trim().min(1, 'Department is required').max(100),
  batch: z.string().trim().min(1, 'Batch is required').max(50),
  positions: z.array(z.string()).min(1, 'Please select at least one position'),
  email: z.string().trim().email('Invalid email address').max(255),
  technicalSkills: z.string().trim().min(10, 'Please describe your technical skills').max(500),
  programmingTools: z.string().trim().min(10, 'Please list your programming languages/frameworks/tools').max(500),
  motivation: z.string().trim().min(20, 'Please share your motivation (at least 20 characters)').max(1000),
  experience: z.string().trim().max(1000).optional(),
  photoLink: z.string().trim().url('Please provide a valid Google Drive link').min(1, 'Photo link is required'),
  cvLink: z.string().trim().url('Please provide a valid link').optional().or(z.literal('')),
});

type RegistrationForm = z.infer<typeof registrationSchema>;

export default function Register() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedPositions, setSelectedPositions] = useState<string[]>([]);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
  } = useForm<RegistrationForm>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      positions: [],
    },
  });

  const handlePositionChange = (position: string, checked: boolean) => {
    let updatedPositions: string[];
    if (checked) {
      updatedPositions = [...selectedPositions, position];
    } else {
      updatedPositions = selectedPositions.filter((p) => p !== position);
    }
    setSelectedPositions(updatedPositions);
    setValue('positions', updatedPositions, { shouldValidate: true });
  };

  const onSubmit = async (data: RegistrationForm) => {
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    console.log('Registration data:', data);
    
    toast({
      title: 'Registration Successful!',
      description: 'Welcome to the Development Wing. We will contact you soon via email.',
    });
    
    reset();
    setSelectedPositions([]);
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
              Development Wing Recruitment
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              We are looking for <strong>enthusiastic and passionate students</strong> to join as{' '}
              <strong>Deputies and Executives</strong> for the <strong>Development Wing</strong> under
              the <strong>Software Engineering Club</strong>.
            </p>
            <p className="text-muted-foreground max-w-3xl mx-auto">
              If you are passionate about <strong>coding, building real-world projects, learning new
              technologies, and teamwork</strong>, this is your chance to grow as a developer and
              contribute to impactful projects led by our club.
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
                Full Name <span className="text-destructive">*</span>
              </Label>
              <Input
                id="fullName"
                {...register('fullName')}
                placeholder="Enter your full name"
                className="glass-button border-white/20 text-foreground placeholder:text-muted-foreground"
              />
              {errors.fullName && (
                <p className="text-destructive text-sm">{errors.fullName.message}</p>
              )}
            </div>

            {/* Student ID */}
            <div className="space-y-2">
              <Label htmlFor="studentId" className="text-foreground">
                Student ID <span className="text-destructive">*</span>
              </Label>
              <Input
                id="studentId"
                {...register('studentId')}
                placeholder="Enter your student ID"
                className="glass-button border-white/20 text-foreground placeholder:text-muted-foreground"
              />
              {errors.studentId && (
                <p className="text-destructive text-sm">{errors.studentId.message}</p>
              )}
            </div>

            {/* Department */}
            <div className="space-y-2">
              <Label htmlFor="department" className="text-foreground">
                Department <span className="text-destructive">*</span>
              </Label>
              <Input
                id="department"
                {...register('department')}
                placeholder="e.g., Computer Science, Software Engineering"
                className="glass-button border-white/20 text-foreground placeholder:text-muted-foreground"
              />
              {errors.department && (
                <p className="text-destructive text-sm">{errors.department.message}</p>
              )}
            </div>

            {/* Batch */}
            <div className="space-y-2">
              <Label htmlFor="batch" className="text-foreground">
                Batch <span className="text-destructive">*</span>
              </Label>
              <Input
                id="batch"
                {...register('batch')}
                placeholder="e.g., 2024, Fall 2023"
                className="glass-button border-white/20 text-foreground placeholder:text-muted-foreground"
              />
              {errors.batch && (
                <p className="text-destructive text-sm">{errors.batch.message}</p>
              )}
            </div>

            {/* Position */}
            <div className="space-y-3">
              <Label className="text-foreground">
                Position you want to apply for <span className="text-destructive">*</span>
              </Label>
              <div className="space-y-3 glass-card p-4">
                {positions.map((position) => (
                  <div key={position} className="flex items-center space-x-3">
                    <Checkbox
                      id={position}
                      checked={selectedPositions.includes(position)}
                      onCheckedChange={(checked) =>
                        handlePositionChange(position, checked as boolean)
                      }
                      className="border-white/20"
                    />
                    <label
                      htmlFor={position}
                      className="text-sm text-foreground cursor-pointer"
                    >
                      {position}
                    </label>
                  </div>
                ))}
              </div>
              {errors.positions && (
                <p className="text-destructive text-sm">{errors.positions.message}</p>
              )}
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-foreground">
                E-mail <span className="text-destructive">*</span>
              </Label>
              <Input
                id="email"
                type="email"
                {...register('email')}
                placeholder="your.email@university.edu"
                className="glass-button border-white/20 text-foreground placeholder:text-muted-foreground"
              />
              {errors.email && (
                <p className="text-destructive text-sm">{errors.email.message}</p>
              )}
            </div>

            {/* Technical Skills */}
            <div className="space-y-2">
              <Label htmlFor="technicalSkills" className="text-foreground">
                What are your technical skills or areas of expertise?{' '}
                <span className="text-destructive">*</span>
              </Label>
              <p className="text-sm text-muted-foreground">
                (e.g., Frontend, Backend, UI/UX, Machine Learning, Mobile App Development, DevOps,
                etc.)
              </p>
              <Textarea
                id="technicalSkills"
                {...register('technicalSkills')}
                placeholder="Describe your technical skills and areas of expertise..."
                rows={4}
                className="glass-button border-white/20 text-foreground placeholder:text-muted-foreground"
              />
              {errors.technicalSkills && (
                <p className="text-destructive text-sm">{errors.technicalSkills.message}</p>
              )}
            </div>

            {/* Programming Tools */}
            <div className="space-y-2">
              <Label htmlFor="programmingTools" className="text-foreground">
                What programming languages, frameworks, or tools are you comfortable with?{' '}
                <span className="text-destructive">*</span>
              </Label>
              <p className="text-sm text-muted-foreground">
                (List any that you've used or are currently learning)
              </p>
              <Textarea
                id="programmingTools"
                {...register('programmingTools')}
                placeholder="e.g., React, Python, TypeScript, Node.js, Docker, MongoDB..."
                rows={4}
                className="glass-button border-white/20 text-foreground placeholder:text-muted-foreground"
              />
              {errors.programmingTools && (
                <p className="text-destructive text-sm">{errors.programmingTools.message}</p>
              )}
            </div>

            {/* Motivation */}
            <div className="space-y-2">
              <Label htmlFor="motivation" className="text-foreground">
                Why do you want to be part of the Development Wing?{' '}
                <span className="text-destructive">*</span>
              </Label>
              <p className="text-sm text-muted-foreground">
                (Share your motivation and how you want to contribute)
              </p>
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

            {/* Experience */}
            <div className="space-y-2">
              <Label htmlFor="experience" className="text-foreground">
                Do you have any experience in software development, hackathons, or projects?
              </Label>
              <p className="text-sm text-muted-foreground">
                (If yes, briefly describe them or share GitHub/portfolio links)
              </p>
              <Textarea
                id="experience"
                {...register('experience')}
                placeholder="Share your experience, projects, or relevant links..."
                rows={4}
                className="glass-button border-white/20 text-foreground placeholder:text-muted-foreground"
              />
              {errors.experience && (
                <p className="text-destructive text-sm">{errors.experience.message}</p>
              )}
            </div>

            {/* Photo Link */}
            <div className="space-y-2">
              <Label htmlFor="photoLink" className="text-foreground">
                Upload Your Photo <span className="text-destructive">*</span>
              </Label>
              <p className="text-sm text-muted-foreground">(Upload Google Drive link)</p>
              <Input
                id="photoLink"
                type="url"
                {...register('photoLink')}
                placeholder="https://drive.google.com/..."
                className="glass-button border-white/20 text-foreground placeholder:text-muted-foreground"
              />
              {errors.photoLink && (
                <p className="text-destructive text-sm">{errors.photoLink.message}</p>
              )}
            </div>

            {/* CV/Portfolio Link */}
            <div className="space-y-2">
              <Label htmlFor="cvLink" className="text-foreground">
                Your CV or Portfolio (optional)
              </Label>
              <p className="text-sm text-muted-foreground">
                (Upload drive or portfolio link)
              </p>
              <Input
                id="cvLink"
                type="url"
                {...register('cvLink')}
                placeholder="https://drive.google.com/... or https://portfolio.com"
                className="glass-button border-white/20 text-foreground placeholder:text-muted-foreground"
              />
              {errors.cvLink && (
                <p className="text-destructive text-sm">{errors.cvLink.message}</p>
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

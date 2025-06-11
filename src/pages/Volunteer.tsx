import React, { useState, useEffect, useCallback } from 'react';
import { useLanguage } from '@/components/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import { Users, Heart, Globe, Award, ChevronRight, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { Label } from '@/components/ui/label';

const Volunteer = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [age, setAge] = useState('');
  const [program, setProgram] = useState('');
  const [availability, setAvailability] = useState('');
  const [skills, setSkills] = useState('');
  const [motivation, setMotivation] = useState('');
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [idFile, setIdFile] = useState<File | null>(null);
  const [certificateFile, setCertificateFile] = useState<File | null>(null);

  const benefits = [
    {
      icon: <Users className="h-8 w-8 text-blue-600" />,
      title: t('volunteer.benefits.community.title', 'Community Impact'),
      description: t('volunteer.benefits.community.description', 'Make a direct impact on your community by contributing your skills and time to meaningful causes.')
    },
    {
      icon: <Heart className="h-8 w-8 text-red-600" />,
      title: t('volunteer.benefits.personal.title', 'Personal Growth'),
      description: t('volunteer.benefits.personal.description', 'Develop new skills, gain valuable experience, and build your professional network.')
    },
    {
      icon: <Globe className="h-8 w-8 text-green-600" />,
      title: t('volunteer.benefits.global.title', 'Global Perspective'),
      description: t('volunteer.benefits.global.description', 'Work with diverse teams and gain insights into different cultures and perspectives.')
    },
    {
      icon: <Award className="h-8 w-8 text-purple-600" />,
      title: t('volunteer.benefits.recognition.title', 'Recognition'),
      description: t('volunteer.benefits.recognition.description', 'Receive certificates and references for your contributions and achievements.')
    }
  ];

  const programs = [
    {
      value: 'education',
      label: 'Education Program',
      description: 'Empowering youth through quality education and skill development'
    },
    {
      value: 'peacebuilding',
      label: 'Peacebuilding Program',
      description: 'Promoting peace, reconciliation, and social cohesion'
    },
    {
      value: 'economic',
      label: 'Economic Empowerment Program',
      description: 'Supporting youth entrepreneurship and economic development'
    },
    {
      value: 'health',
      label: 'Health Program',
      description: 'Promoting youth well-being through comprehensive health services'
    },
    {
      value: 'sportCultureArts',
      label: 'Sports, Culture & Arts Program',
      description: 'Nurturing talents and preserving cultural heritage'
    }
  ];

  // Add scroll handler
  const handleScroll = useCallback(() => {
    // Prevent scroll handling during form submission
    if (isSubmitting) return;
    
    // Your scroll handling logic here if needed
  }, [isSubmitting]);

  // Add and remove scroll listener
  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation(); // Prevent event bubbling
    setIsSubmitting(true);

    try {
      // Create FormData object
      const formData = new FormData();
      
      // Add all form fields
      formData.append('firstName', firstName);
      formData.append('lastName', lastName);
      formData.append('email', email);
      formData.append('phone', phone);
      formData.append('age', age);
      formData.append('program', program);
      formData.append('availability', availability);
      formData.append('skills', skills);
      formData.append('motivation', motivation);
      
      // Add files if they exist
      if (cvFile) {
        formData.append('cv', cvFile);
      }
      if (idFile) {
        formData.append('id', idFile);
      }
      if (certificateFile) {
        formData.append('certificate', certificateFile);
      }

      // Send the request
      const response = await fetch('/api/volunteer/register', {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to submit application');
      }

      const result = await response.json();

      // Show success message
      toast({
        title: "Application Submitted",
        description: "Thank you for your interest in volunteering with us. We will review your application and get back to you soon.",
      });

      // Reset form
      setFirstName('');
      setLastName('');
      setEmail('');
      setPhone('');
      setAge('');
      setProgram('');
      setAvailability('');
      setSkills('');
      setMotivation('');
      setCvFile(null);
      setIdFile(null);
      setCertificateFile(null);

      // Reset file inputs
      const fileInputs = document.querySelectorAll('input[type="file"]');
      fileInputs.forEach((input) => {
        (input as HTMLInputElement).value = '';
      });

    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to submit application. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12" onScroll={(e) => e.stopPropagation()}>
      {/* Hero Section */}
      <section className="relative mb-16 rounded-2xl overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900 to-blue-800 z-10" />
        <div className="relative z-20 p-12 text-white">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-block p-3 bg-white/20 backdrop-blur-sm rounded-full mb-6">
              <Users className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-5xl font-bold mb-6">
              {t('volunteer.hero.title', 'Join Our Volunteer Team')}
            </h1>
            <p className="text-xl mb-8 text-blue-50 leading-relaxed">
              {t('volunteer.hero.description', 'Make a difference in your community by volunteering with Vision Jeunesse Nouvelle. Share your skills, learn new ones, and be part of our mission to empower youth.')}
            </p>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-blue-900 mb-8 text-center">
          {t('volunteer.benefits.title', 'Why Volunteer With Us?')}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-xl p-8"
            >
              <div className="mb-4">
                {benefit.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {benefit.title}
              </h3>
              <p className="text-gray-600">
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Registration Form Section */}
      <section className="max-w-3xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-3xl font-bold text-blue-900 mb-6 text-center">
            {t('volunteer.form.title', 'Volunteer Registration')}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  name="firstName"
                  type="text"
                  required
                  className="w-full"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  name="lastName"
                  type="text"
                  required
                  className="w-full"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="w-full"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  className="w-full"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="age">Age</Label>
                <Input
                  id="age"
                  name="age"
                  type="number"
                  min="16"
                  required
                  className="w-full"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="program">Program</Label>
                <Select
                  id="program"
                  value={program}
                  onValueChange={setProgram}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder={t('volunteer.form.selectProgram')} />
                  </SelectTrigger>
                  <SelectContent>
                    {programs.map((program) => (
                      <SelectItem key={program.value} value={program.value}>
                        <div className="flex flex-col">
                          <span className="font-medium">{program.label}</span>
                          <span className="text-sm text-gray-500">{program.description}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="availability">Availability</Label>
              <Select name="availability" required>
                <SelectTrigger>
                  <SelectValue placeholder={t('volunteer.form.selectAvailability', 'Select your availability')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="weekday-mornings">{t('volunteer.form.weekdayMornings', 'Weekday Mornings')}</SelectItem>
                  <SelectItem value="weekday-afternoons">{t('volunteer.form.weekdayAfternoons', 'Weekday Afternoons')}</SelectItem>
                  <SelectItem value="weekday-evenings">{t('volunteer.form.weekdayEvenings', 'Weekday Evenings')}</SelectItem>
                  <SelectItem value="weekends">{t('volunteer.form.weekends', 'Weekends')}</SelectItem>
                  <SelectItem value="flexible">{t('volunteer.form.flexible', 'Flexible')}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="skills">Skills & Experience</Label>
              <Textarea
                id="skills"
                name="skills"
                required
                className="w-full"
                rows={3}
                placeholder={t('volunteer.form.skillsPlaceholder', 'Tell us about your skills and relevant experience')}
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="motivation">Why do you want to volunteer with us?</Label>
              <Textarea
                id="motivation"
                name="motivation"
                required
                className="w-full"
                rows={4}
                placeholder={t('volunteer.form.motivationPlaceholder', 'Share your motivation for volunteering')}
                value={motivation}
                onChange={(e) => setMotivation(e.target.value)}
              />
            </div>

            {/* Document Upload Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">{t('volunteer.form.documents')}</h3>
              
              {/* CV Upload */}
              <div className="space-y-2">
                <Label htmlFor="cv">CV</Label>
                <Input
                  id="cv"
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={(e) => setCvFile(e.target.files?.[0] || null)}
                  className="cursor-pointer"
                />
                <p className="text-sm text-gray-500">{t('volunteer.form.cvHelp')}</p>
              </div>

              {/* ID Document Upload */}
              <div className="space-y-2">
                <Label htmlFor="id">ID</Label>
                <Input
                  id="id"
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={(e) => setIdFile(e.target.files?.[0] || null)}
                  className="cursor-pointer"
                />
                <p className="text-sm text-gray-500">{t('volunteer.form.idHelp')}</p>
              </div>

              {/* Certificate Upload */}
              <div className="space-y-2">
                <Label htmlFor="certificate">Certificate</Label>
                <Input
                  id="certificate"
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={(e) => setCertificateFile(e.target.files?.[0] || null)}
                  className="cursor-pointer"
                />
                <p className="text-sm text-gray-500">{t('volunteer.form.certificateHelp')}</p>
              </div>
            </div>

            <div className="flex justify-center">
              <Button
                type="submit"
                className="w-full md:w-auto px-8 py-6 text-lg"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    {t('volunteer.form.submitting', 'Submitting...')}
                  </>
                ) : (
                  <>
                    {t('volunteer.form.submit', 'Submit Application')}
                    <ChevronRight className="ml-2 h-5 w-5" />
                  </>
                )}
              </Button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Volunteer; 
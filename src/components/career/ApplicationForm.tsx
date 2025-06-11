import React, { useState } from 'react';
import { useLanguage } from '@/components/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from '@/components/ui/use-toast';
import { motion } from 'framer-motion';
import { submitApplication } from '@/lib/api/careers';

interface ApplicationFormProps {
  jobId: number;
  jobTitle: string;
  onClose: () => void;
}

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  education: string;
  experience: string;
  coverLetter: string;
  resume: File | null;
  language: string;
}

const ApplicationForm: React.FC<ApplicationFormProps> = ({ jobId, jobTitle, onClose }) => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    education: '',
    experience: '',
    coverLetter: '',
    resume: null,
    language: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({
        ...prev,
        resume: e.target.files![0]
      }));
    }
  };

  const handleLanguageChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      language: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Here you would typically send the form data to your backend
      // For now, we'll just simulate a submission
      await new Promise(resolve => setTimeout(resolve, 2000));

      toast({
        title: t('career.application.success.title', 'Application Submitted'),
        description: t('career.application.success.description', 'Thank you for your application. We will review it and get back to you soon.'),
      });

      onClose();
    } catch (error) {
      toast({
        title: t('career.application.error.title', 'Submission Failed'),
        description: t('career.application.error.description', 'There was an error submitting your application. Please try again.'),
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white p-6 rounded-lg shadow-lg max-w-2xl mx-auto"
    >
      <h2 className="text-2xl font-bold mb-6 text-primary">
        {t('career.application.title', 'Apply for {{position}}', { position: jobTitle })}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="firstName" className="text-gray-700">
              {t('career.application.firstName', 'First Name')}
            </Label>
            <Input
              id="firstName"
              name="firstName"
              required
              value={formData.firstName}
              onChange={handleInputChange}
              className="border-gray-300 focus:border-primary focus:ring-primary text-gray-800 bg-white"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="lastName" className="text-gray-700">
              {t('career.application.lastName', 'Last Name')}
            </Label>
            <Input
              id="lastName"
              name="lastName"
              required
              value={formData.lastName}
              onChange={handleInputChange}
              className="border-gray-300 focus:border-primary focus:ring-primary text-gray-800 bg-white"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-gray-700">
              {t('career.application.email', 'Email')}
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleInputChange}
              className="border-gray-300 focus:border-primary focus:ring-primary text-gray-800 bg-white"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone" className="text-gray-700">
              {t('career.application.phone', 'Phone')}
            </Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              required
              value={formData.phone}
              onChange={handleInputChange}
              className="border-gray-300 focus:border-primary focus:ring-primary text-gray-800 bg-white"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="address" className="text-gray-700">
            {t('career.application.address', 'Address')}
          </Label>
          <Input
            id="address"
            name="address"
            required
            value={formData.address}
            onChange={handleInputChange}
            className="border-gray-300 focus:border-primary focus:ring-primary text-gray-800 bg-white"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="language" className="text-gray-700">
            {t('career.application.language', 'Preferred Language')}
          </Label>
          <Select onValueChange={handleLanguageChange} value={formData.language}>
            <SelectTrigger className="border-gray-300 focus:border-primary focus:ring-primary text-gray-800 bg-white">
              <SelectValue placeholder={t('career.application.selectLanguage', 'Select language')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="en">English</SelectItem>
              <SelectItem value="fr">Français</SelectItem>
              <SelectItem value="rw">Kinyarwanda</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="education" className="text-gray-700">
            {t('career.application.education', 'Education')}
          </Label>
          <Textarea
            id="education"
            name="education"
            required
            value={formData.education}
            onChange={handleInputChange}
            placeholder={t('career.application.educationPlaceholder', 'List your educational background')}
            className="border-gray-300 focus:border-primary focus:ring-primary text-gray-800 bg-white min-h-[100px]"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="experience" className="text-gray-700">
            {t('career.application.experience', 'Work Experience')}
          </Label>
          <Textarea
            id="experience"
            name="experience"
            required
            value={formData.experience}
            onChange={handleInputChange}
            placeholder={t('career.application.experiencePlaceholder', 'Describe your relevant work experience')}
            className="border-gray-300 focus:border-primary focus:ring-primary text-gray-800 bg-white min-h-[100px]"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="coverLetter" className="text-gray-700">
            {t('career.application.coverLetter', 'Cover Letter')}
          </Label>
          <Textarea
            id="coverLetter"
            name="coverLetter"
            required
            value={formData.coverLetter}
            onChange={handleInputChange}
            placeholder={t('career.application.coverLetterPlaceholder', 'Tell us why you would be a good fit for this position')}
            className="border-gray-300 focus:border-primary focus:ring-primary text-gray-800 bg-white min-h-[150px]"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="resume" className="text-gray-700">
            {t('career.application.resume', 'Resume/CV')}
          </Label>
          <Input
            id="resume"
            name="resume"
            type="file"
            accept=".pdf,.doc,.docx"
            required
            onChange={handleFileChange}
            className="border-gray-300 focus:border-primary focus:ring-primary text-gray-800 bg-white"
          />
          <p className="text-sm text-gray-500">
            {t('career.application.resumeHelp', 'Accepted formats: PDF, DOC, DOCX')}
          </p>
        </div>

        <div className="flex justify-end space-x-4">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            disabled={isSubmitting}
            className="text-gray-600 hover:text-gray-800"
          >
            {t('common.cancel', 'Cancel')}
          </Button>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="bg-primary hover:bg-primary/90"
          >
            {isSubmitting 
              ? t('career.application.submitting', 'Submitting...')
              : t('career.application.submit', 'Submit Application')}
          </Button>
        </div>
      </form>
    </motion.div>
  );
};

export default ApplicationForm; 
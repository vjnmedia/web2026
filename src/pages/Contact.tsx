
import { useLanguage } from '@/components/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { MapPin, Phone, Mail } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from '@/hooks/use-toast';

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

const Contact = () => {
  const { t } = useLanguage();
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<ContactFormData>();

  const onSubmit = async (data: ContactFormData) => {
    try {
      // In a real implementation, you would send this data to an API
      console.log('Form submitted:', data);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Message sent!",
        description: "We'll get back to you as soon as possible.",
      });
      
      reset();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your submission.",
      });
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-vjn-blue text-white py-16 md:py-24">
        <div className="absolute inset-0 bg-gradient-to-br from-black/50 to-transparent z-10"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat" 
          style={{ 
            backgroundImage: `url('https://images.unsplash.com/photo-1596524430615-b46475ddff6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')`,
            filter: 'brightness(0.6)'
          }}
        ></div>
        
        <div className="container-custom relative z-20">
          <h1 className="text-white">{t('contact.title')}</h1>
          <p className="text-lg md:text-xl text-gray-200 max-w-3xl">
            {t('contact.subtitle')}
          </p>
        </div>
      </section>

      {/* Contact Information and Form */}
      <section className="section bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="mb-6">Send us a message</h2>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block mb-2 font-medium">
                    {t('contact.form.name')}
                  </label>
                  <Input
                    id="name"
                    placeholder={t('contact.form.name')}
                    {...register('name', { required: 'Name is required' })}
                    className={errors.name ? 'border-red-500' : ''}
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="email" className="block mb-2 font-medium">
                    {t('contact.form.email')}
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder={t('contact.form.email')}
                    {...register('email', { 
                      required: 'Email is required',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Invalid email address'
                      }
                    })}
                    className={errors.email ? 'border-red-500' : ''}
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="message" className="block mb-2 font-medium">
                    {t('contact.form.message')}
                  </label>
                  <Textarea
                    id="message"
                    placeholder={t('contact.form.message')}
                    rows={6}
                    {...register('message', { required: 'Message is required' })}
                    className={errors.message ? 'border-red-500' : ''}
                  />
                  {errors.message && (
                    <p className="mt-1 text-sm text-red-500">{errors.message.message}</p>
                  )}
                </div>
                
                <Button 
                  type="submit" 
                  className="bg-vjn-blue hover:bg-vjn-light-blue w-full md:w-auto"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Sending...' : t('contact.form.submit')}
                </Button>
              </form>
            </div>
            
            {/* Contact Information */}
            <div>
              <h2 className="mb-6">Contact Information</h2>
              
              <div className="grid grid-cols-1 gap-8">
                {/* Address */}
                <div className="flex items-start">
                  <div className="mr-4 bg-vjn-gray p-3 rounded-full">
                    <MapPin className="h-6 w-6 text-vjn-blue" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">{t('contact.address')}</h3>
                    <p>Vision Jeunesse Nouvelle (VJN)</p>
                    <p>{t('contact.address.value')}</p>
                    <p>Rwanda</p>
                  </div>
                </div>
                
                {/* Phone */}
                <div className="flex items-start">
                  <div className="mr-4 bg-vjn-gray p-3 rounded-full">
                    <Phone className="h-6 w-6 text-vjn-blue" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">{t('contact.phone')}</h3>
                    <p>+250 788 123 456</p>
                    <p>+250 788 456 789</p>
                  </div>
                </div>
                
                {/* Email */}
                <div className="flex items-start">
                  <div className="mr-4 bg-vjn-gray p-3 rounded-full">
                    <Mail className="h-6 w-6 text-vjn-blue" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">{t('contact.email')}</h3>
                    <p>info@vjn.org</p>
                    <p>support@vjn.org</p>
                  </div>
                </div>
              </div>
              
              {/* Map placeholder */}
              <div className="mt-8 bg-vjn-gray rounded-lg h-64 w-full flex items-center justify-center">
                <p className="text-gray-500 text-center">
                  Google Map would be embedded here.<br/>
                  (A real implementation would include an iframe with Google Maps)
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section bg-vjn-gray">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2>Frequently Asked Questions</h2>
            <p className="max-w-3xl mx-auto">
              Find answers to common questions about our organization and programs.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* FAQ Item 1 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-2 text-vjn-blue">How can I volunteer with VJN?</h3>
              <p>
                You can apply to volunteer through our Careers page. We welcome both local and
                international volunteers with various skills and backgrounds.
              </p>
            </div>
            
            {/* FAQ Item 2 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-2 text-vjn-blue">How is my donation used?</h3>
              <p>
                Your donations directly support our programs for youth empowerment, including
                education initiatives, entrepreneurship training, and peace-building activities.
              </p>
            </div>
            
            {/* FAQ Item 3 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-2 text-vjn-blue">Can my organization partner with VJN?</h3>
              <p>
                Yes, we welcome partnerships with organizations that share our mission. Please
                contact us with your partnership proposal, and our team will get back to you.
              </p>
            </div>
            
            {/* FAQ Item 4 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-2 text-vjn-blue">Where do your programs operate?</h3>
              <p>
                Our programs operate in all 30 districts of Rwanda, with our headquarters in Kigali.
                We have regional offices in major cities across the country.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;

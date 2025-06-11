import React from 'react'
import { useLanguage } from '@/components/LanguageContext'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { MapPin, Phone, Mail } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { toast } from '@/hooks/use-toast'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'

interface ContactFormData {
  name: string
  email: string
  message: string
}

const Contact = () => {
  const { t } = useLanguage()
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<ContactFormData>()
  const { t: tTranslation } = useTranslation()

  const onSubmit = async (data: ContactFormData) => {
    try {
      console.log('Form submitted:', data)
      await new Promise(resolve => setTimeout(resolve, 1000))
      toast({
        title: t('contact.form.success.title', 'Message sent!'),
        description: t('contact.form.success.description', "We'll get back to you as soon as possible.")
      })
      reset()
    } catch (error) {
      toast({
        variant: "destructive",
        title: t('contact.form.error.title', 'Error'),
        description: t('contact.form.error.description', 'There was a problem with your submission.')
      })
    }
  }

  return (
    <div className="min-h-screen">
      <section className="relative bg-vjn-blue text-white py-20">
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {tTranslation('contact.heroTitle', 'Get in Touch')}
            </h1>
            <p className="text-lg md:text-xl max-w-2xl mx-auto">
              {tTranslation('contact.heroSubtitle', "Have questions? We're here to help. Reach out to us and be part of our mission")}
            </p>
          </motion.div>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="mb-6">{t('contact.form.title', 'Send us a message')}</h2>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block mb-2 font-medium">
                    {t('contact.form.name', 'Your Name')}
                  </label>
                  <Input
                    id="name"
                    placeholder={t('contact.form.namePlaceholder', 'Enter your name')}
                    {...register('name', { required: t('contact.form.error.nameRequired', 'Name is required') })}
                    className={errors.name ? 'border-red-500' : ''}
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="email" className="block mb-2 font-medium">
                    {t('contact.form.email', 'Your Email')}
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder={t('contact.form.emailPlaceholder', 'Enter your email')}
                    {...register('email', { 
                      required: t('contact.form.error.emailRequired', 'Email is required'),
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: t('contact.form.error.emailInvalid', 'Invalid email address')
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
                    {t('contact.form.message', 'Message')}
                  </label>
                  <Textarea
                    id="message"
                    placeholder={t('contact.form.messagePlaceholder', 'Enter your message')}
                    rows={6}
                    {...register('message', { required: t('contact.form.error.messageRequired', 'Message is required') })}
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
                  {isSubmitting ? t('contact.form.sending', 'Sending...') : t('contact.form.submit', 'Send Message')}
                </Button>
              </form>
            </div>
            
            {/* Contact Information */}
            <div>
              <h2 className="mb-6">{t('contact.info.title', 'Contact Information')}</h2>
              <div className="grid grid-cols-1 gap-8">
                {/* Address */}
                <div className="flex items-start">
                  <div className="mr-4 bg-vjn-gray p-3 rounded-full">
                    <MapPin className="h-6 w-6 text-vjn-blue" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">{t('contact.info.address', 'Address')}</h3>
                    <p>Vision Jeunesse Nouvelle (VJN)</p>
                    <p>{t('contact.info.addressLine1', 'Rubavu District, Gisenyi Sector')}</p>
                    <p>{t('contact.info.addressLine2', 'Nengo Cell, Gikarani Village')}</p>
                    <p>{t('contact.info.country', 'Rwanda')}</p>
                  </div>
                </div>
                
                {/* Phone */}
                <div className="flex items-start">
                  <div className="mr-4 bg-vjn-gray p-3 rounded-full">
                    <Phone className="h-6 w-6 text-vjn-blue" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">{t('contact.info.phone', 'Phone')}</h3>
                    <p>+250 785 403 435</p>
                    <p>+250 788 892 826</p>
                  </div>
                </div>
                
                {/* Email */}
                <div className="flex items-start">
                  <div className="mr-4 bg-vjn-gray p-3 rounded-full">
                    <Mail className="h-6 w-6 text-vjn-blue" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">{t('contact.info.email', 'Email')}</h3>
                    <p>visionjeunesse2050@gmail.com</p>
                  </div>
                </div>
              </div>
              
              {/* Google Map Embed */}
              <div className="mt-8 rounded-lg h-[400px] w-full overflow-hidden shadow-lg">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3987.5087454351392!2d29.25718731475084!3d-1.7022109986683214!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x19dd050a47fb11e7%3A0xe550726afa8eb90a!2sVision%20Jeunesse%20Nouvelle!5e0!3m2!1sen!2srw!4v1647887291012!5m2!1sen!2srw"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={t('contact.info.mapTitle', 'Vision Jeunesse Nouvelle Location Map')}
                  className="rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section bg-vjn-gray">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2>{t('contact.faq.title', 'Frequently Asked Questions')}</h2>
            <p className="max-w-3xl mx-auto">
              {t('contact.faq.subtitle', 'Find answers to common questions about our organization and programs.')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-2 text-vjn-blue">
                {t('contact.faq.q1.title', 'How can I volunteer with VJN?')}
              </h3>
              <p>{t('contact.faq.q1.answer', 'You can apply to volunteer through our Careers page. We welcome both local and international volunteers with various skills and backgrounds.')}</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-2 text-vjn-blue">
                {t('contact.faq.q2.title', 'How is my donation used?')}
              </h3>
              <p>{t('contact.faq.q2.answer', 'Your donations directly support our programs for youth empowerment, including education initiatives, entrepreneurship training, and peace-building activities.')}</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-2 text-vjn-blue">
                {t('contact.faq.q3.title', 'Can my organization partner with VJN?')}
              </h3>
              <p>{t('contact.faq.q3.answer', 'Yes, we welcome partnerships with organizations that share our mission. Please contact us with your partnership proposal, and our team will get back to you.')}</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-2 text-vjn-blue">
                {t('contact.faq.q4.title', 'Where do your programs operate?')}
              </h3>
              <p>{t('contact.faq.q4.answer', 'Our programs operate primarily in the Rubavu District, with our headquarters in Gisenyi. We collaborate with partners across Rwanda to extend our reach.')}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Contact

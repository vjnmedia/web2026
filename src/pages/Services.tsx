import React from 'react';
import { useTranslation } from 'react-i18next';
import { 
  GraduationCap, 
  Briefcase, 
  Heart, 
  Music, 
  Users, 
  Home, 
  Shield, 
  BookOpen, 
  MessageSquare, 
  Users2,
  ArrowRight,
  Phone,
  MapPin
} from 'lucide-react';

interface ServiceCard {
  icon: React.ReactNode;
  title: string;
  description: string;
  items: string[];
}

interface Testimonial {
  quote: string;
  author: string;
  role: string;
  image: string;
}

const Services: React.FC = () => {
  const { t } = useTranslation();

  const youthServices: ServiceCard[] = [
    {
      icon: <GraduationCap className="h-8 w-8 text-vjn-blue" />,
      title: t('services.youthServices.vocational.title'),
      description: t('services.youthServices.vocational.description'),
      items: t('services.youthServices.vocational.items', { returnObjects: true })
    },
    {
      icon: <Briefcase className="h-8 w-8 text-vjn-blue" />,
      title: t('services.youthServices.entrepreneurship.title'),
      description: t('services.youthServices.entrepreneurship.description'),
      items: t('services.youthServices.entrepreneurship.items', { returnObjects: true })
    },
    {
      icon: <Heart className="h-8 w-8 text-vjn-blue" />,
      title: t('services.youthServices.health.title'),
      description: t('services.youthServices.health.description'),
      items: t('services.youthServices.health.items', { returnObjects: true })
    },
    {
      icon: <Music className="h-8 w-8 text-vjn-blue" />,
      title: t('services.youthServices.talent.title'),
      description: t('services.youthServices.talent.description'),
      items: t('services.youthServices.talent.items', { returnObjects: true })
    },
    {
      icon: <Users className="h-8 w-8 text-vjn-blue" />,
      title: t('services.youthServices.peace.title'),
      description: t('services.youthServices.peace.description'),
      items: t('services.youthServices.peace.items', { returnObjects: true })
    }
  ];

  const vulnerableServices: ServiceCard[] = [
    {
      icon: <Home className="h-8 w-8 text-vjn-blue" />,
      title: t('services.vulnerableServices.refugees.title'),
      description: t('services.vulnerableServices.refugees.description'),
      items: t('services.vulnerableServices.refugees.items', { returnObjects: true })
    },
    {
      icon: <Shield className="h-8 w-8 text-vjn-blue" />,
      title: t('services.vulnerableServices.hiv.title'),
      description: t('services.vulnerableServices.hiv.description'),
      items: t('services.vulnerableServices.hiv.items', { returnObjects: true })
    },
    {
      icon: <Users2 className="h-8 w-8 text-vjn-blue" />,
      title: t('services.vulnerableServices.prisoners.title'),
      description: t('services.vulnerableServices.prisoners.description'),
      items: t('services.vulnerableServices.prisoners.items', { returnObjects: true })
    },
    {
      icon: <MessageSquare className="h-8 w-8 text-vjn-blue" />,
      title: t('services.vulnerableServices.parents.title'),
      description: t('services.vulnerableServices.parents.description'),
      items: t('services.vulnerableServices.parents.items', { returnObjects: true })
    }
  ];

  const supportServices: ServiceCard[] = [
    {
      icon: <BookOpen className="h-8 w-8 text-vjn-blue" />,
      title: t('services.supportServices.libraries.title'),
      description: t('services.supportServices.libraries.description'),
      items: t('services.supportServices.libraries.items', { returnObjects: true })
    },
    {
      icon: <MessageSquare className="h-8 w-8 text-vjn-blue" />,
      title: t('services.supportServices.peace.title'),
      description: t('services.supportServices.peace.description'),
      items: t('services.supportServices.peace.items', { returnObjects: true })
    },
    {
      icon: <Users className="h-8 w-8 text-vjn-blue" />,
      title: t('services.supportServices.repository.title'),
      description: t('services.supportServices.repository.description'),
      items: t('services.supportServices.repository.items', { returnObjects: true })
    }
  ];

  const testimonials: Testimonial[] = [
    {
      quote: t('services.testimonials.marie.quote'),
      author: t('services.testimonials.marie.author'),
      role: t('services.testimonials.marie.role'),
      image: "/testimonials/marie.jpg"
    },
    {
      quote: t('services.testimonials.jean.quote'),
      author: t('services.testimonials.jean.author'),
      role: t('services.testimonials.jean.role'),
      image: "/testimonials/jean.jpg"
    }
  ];

  const ServiceSection = ({ title, services }: { title: string; services: ServiceCard[] }) => (
    <div className="mb-12">
      <h2 className="text-2xl font-bold mb-6">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center mb-4">
              {service.icon}
              <h3 className="text-xl font-semibold ml-3">{service.title}</h3>
            </div>
            <p className="text-gray-600 mb-4">{service.description}</p>
            <ul className="space-y-2">
              {service.items.map((item, idx) => (
                <li key={idx} className="flex items-start">
                  <ArrowRight className="h-4 w-4 text-vjn-blue mt-1 mr-2 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-7xl mx-auto">
      {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">{t('services.title')}</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('services.subtitle')}
          </p>
        </div>

        {/* Introduction */}
        <div className="bg-gray-50 rounded-lg p-8 mb-12">
          <p className="text-lg text-gray-700">
            {t('services.introduction')}
            </p>
          </div>

        {/* Services Sections */}
        <ServiceSection title={t('services.sections.youth')} services={youthServices} />
        <ServiceSection title={t('services.sections.vulnerable')} services={vulnerableServices} />
        <ServiceSection title={t('services.sections.support')} services={supportServices} />

        {/* Testimonials */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">{t('services.testimonials.title')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.author}
                    className="w-16 h-16 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h3 className="font-semibold">{testimonial.author}</h3>
                    <p className="text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">"{testimonial.quote}"</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-vjn-blue text-white rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">{t('services.cta.title')}</h2>
          <p className="mb-6">{t('services.cta.subtitle')}</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="/contact"
              className="bg-white text-vjn-blue px-6 py-3 rounded-md font-semibold hover:bg-gray-100 transition-colors flex items-center"
            >
              <Phone className="h-5 w-5 mr-2" />
              {t('services.cta.contact')}
            </a>
            <a
              href="/programs"
              className="bg-white text-vjn-blue px-6 py-3 rounded-md font-semibold hover:bg-gray-100 transition-colors flex items-center"
            >
              {t('services.cta.join')}
            </a>
            <a
              href="/centers"
              className="bg-white text-vjn-blue px-6 py-3 rounded-md font-semibold hover:bg-gray-100 transition-colors flex items-center"
            >
              <MapPin className="h-5 w-5 mr-2" />
              {t('services.cta.visit')}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;

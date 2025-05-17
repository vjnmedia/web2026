
import { useLanguage } from '@/components/LanguageContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Link } from 'react-router-dom';

const Services = () => {
  const { t } = useLanguage();

  const services = [
    {
      id: "youth-development",
      name: t('services.youthDevelopment'),
      description: t('services.youthDevelopment.desc'),
      offerings: [
        {
          title: t('services.youthDevelopment.offering1.title'),
          description: t('services.youthDevelopment.offering1.desc')
        },
        {
          title: t('services.youthDevelopment.offering2.title'),
          description: t('services.youthDevelopment.offering2.desc')
        },
        {
          title: t('services.youthDevelopment.offering3.title'),
          description: t('services.youthDevelopment.offering3.desc')
        }
      ]
    },
    {
      id: "community-programs",
      name: t('services.communityPrograms'),
      description: t('services.communityPrograms.desc'),
      offerings: [
        {
          title: t('services.communityPrograms.offering1.title'),
          description: t('services.communityPrograms.offering1.desc')
        },
        {
          title: t('services.communityPrograms.offering2.title'),
          description: t('services.communityPrograms.offering2.desc')
        },
        {
          title: t('services.communityPrograms.offering3.title'),
          description: t('services.communityPrograms.offering3.desc')
        }
      ]
    },
    {
      id: "education-resources",
      name: t('services.educationResources'),
      description: t('services.educationResources.desc'),
      offerings: [
        {
          title: t('services.educationResources.offering1.title'),
          description: t('services.educationResources.offering1.desc')
        },
        {
          title: t('services.educationResources.offering2.title'),
          description: t('services.educationResources.offering2.desc')
        },
        {
          title: t('services.educationResources.offering3.title'),
          description: t('services.educationResources.offering3.desc')
        }
      ]
    },
    {
      id: "consultation",
      name: t('services.consultation'),
      description: t('services.consultation.desc'),
      offerings: [
        {
          title: t('services.consultation.offering1.title'),
          description: t('services.consultation.offering1.desc')
        },
        {
          title: t('services.consultation.offering2.title'),
          description: t('services.consultation.offering2.desc')
        },
        {
          title: t('services.consultation.offering3.title'),
          description: t('services.consultation.offering3.desc')
        }
      ]
    }
  ];

  const faqs = [
    {
      question: t('services.faq1.question'),
      answer: t('services.faq1.answer')
    },
    {
      question: t('services.faq2.question'),
      answer: t('services.faq2.answer')
    },
    {
      question: t('services.faq3.question'),
      answer: t('services.faq3.answer')
    },
    {
      question: t('services.faq4.question'),
      answer: t('services.faq4.answer')
    },
    {
      question: t('services.faq5.question'),
      answer: t('services.faq5.answer')
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-vjn-blue text-white py-16 md:py-24">
        <div className="absolute inset-0 bg-gradient-to-br from-black/50 to-transparent z-10"></div>
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1531545514256-b1400bc00f31?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')`,
            filter: 'brightness(0.6)'
          }}
        ></div>

        <div className="container-custom relative z-20">
          <h1 className="text-white">{t('services.title')}</h1>
          <p className="text-lg md:text-xl text-gray-200 max-w-3xl">
            {t('services.subtitle')}
          </p>
        </div>
      </section>

      {/* Services Section */}
      <section className="section bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2>{t('services.whatWeOffer')}</h2>
            <p className="max-w-3xl mx-auto text-lg">
              {t('services.whatWeOfferText')}
            </p>
          </div>

          <Tabs defaultValue="youth-development" className="w-full">
            <TabsList className="w-full flex flex-wrap mb-8 bg-transparent">
              {services.map((service) => (
                <TabsTrigger
                  key={service.id}
                  value={service.id}
                  className="flex-1 min-w-[200px]"
                >
                  {service.name}
                </TabsTrigger>
              ))}
            </TabsList>

            {services.map((service) => (
              <TabsContent key={service.id} value={service.id}>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2">
                    <h3 className="mb-4">{service.name}</h3>
                    <p className="mb-6">{service.description}</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      {service.offerings.map((offering, idx) => (
                        <Card key={idx}>
                          <CardHeader>
                            <CardTitle className="text-xl">{offering.title}</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <CardDescription>{offering.description}</CardDescription>
                          </CardContent>
                        </Card>
                      ))}
                    </div>

                    <Button className="bg-vjn-blue hover:bg-vjn-light-blue">
                      {t('services.learnMore')}
                    </Button>
                  </div>

                  <div>
                    <div className="bg-vjn-gray rounded-lg p-6">
                      <h4 className="mb-4">{t('services.requestInfo')}</h4>
                      <p className="mb-4">
                        {t('services.requestInfoText')}
                      </p>
                      <Link to="/contact">
                        <Button className="w-full">
                          {t('services.contactUs')}
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section bg-vjn-gray">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2>{t('services.faqTitle')}</h2>
            <p className="max-w-3xl mx-auto text-lg">
              {t('services.faqSubtitle')}
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, idx) => (
                <AccordionItem key={idx} value={`item-${idx}`}>
                  <AccordionTrigger className="text-left">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent>{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="section bg-vjn-blue text-white">
        <div className="container-custom text-center">
          <h2 className="text-white mb-4">{t('services.startToday')}</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto text-gray-200">
            {t('services.startTodayText')}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/contact">
              <Button size="lg" className="bg-white text-vjn-blue hover:bg-gray-100">
                {t('services.contactUs')}
              </Button>
            </Link>
            <Link to="/programs">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                {t('services.explorePrograms')}
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;

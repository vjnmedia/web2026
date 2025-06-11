import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Briefcase, Heart, Handshake, Music, Trophy, ChevronLeft, ChevronRight, Users } from 'lucide-react';
import { useLanguage } from '@/components/LanguageContext';
import { Button } from '@/components/ui/button';

interface Program {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  link: string;
  images: { src: string; caption: string; }[];
}

const Programs = () => {
  const { t } = useTranslation();

  const [currentSlide, setCurrentSlide] = useState(0);

  const programs: Program[] = [
    {
      id: 'education',
      title: t('programs.education.title', 'Education Program'),
      description: t('programs.education.description', 'Empowering youth through quality education and skill development.'),
      icon: <BookOpen className="h-12 w-12 text-blue-600" />,
      color: 'blue',
      link: '/programs/education',
      images: [
        { src: '/images/programs/education/IMG_9525.JPG', caption: t('programs.education.captions.image1', 'Students in a vocational training class') },
        { src: '/images/programs/education/IMG_9524.JPG', caption: t('programs.education.captions.image2', 'Youth participating in a literacy program') },
        { src: '/images/programs/education/IMG_9522.JPG', caption: t('programs.education.captions.image3', 'Graduation ceremony for vocational trainees') },
        { src: '/images/programs/education/IMG_9521.JPG', caption: t('programs.education.captions.image4', 'Community library access for children') },
        { src: '/images/programs/education/IMG_9508.JPG', caption: t('programs.education.captions.image5', 'Interactive learning session for young students') },
      ]
    },
    {
      id: 'economic',
      title: t('programs.economic.title', 'Economic Empowerment Program'),
      description: t('programs.economic.description', 'Supporting youth entrepreneurship and economic development through training, mentorship, and resources.'),
      icon: <Briefcase className="h-12 w-12 text-green-600" />,
      color: 'green',
      link: '/programs/economic',
      images: [
        { src: '/images/programs/economic/Gh-xYUVXoAAsibq.jpg', caption: t('programs.economic.captions.image1', 'Youth discussing business plans') },
        { src: '/images/programs/economic/Gh-xLWqWAAAmBDa.jpg', caption: t('programs.economic.captions.image2', 'A group of young entrepreneurs') },
      ]
    },
    {
      id: 'health',
      title: t('programs.health.title', 'Health & Well-being Program'),
      description: t('programs.health.description', 'Promoting youth well-being through comprehensive health services and education.'),
      icon: <Heart className="h-12 w-12 text-red-600" />,
      color: 'red',
      link: '/programs/health',
      images: [
        { src: '/images/programs/health/IMG_5140.JPG', caption: t('programs.health.captions.image1', 'Health education workshop for youth') },
        { src: '/images/programs/health/Gq_e_owXEAENemn.jpg', caption: t('programs.health.captions.image2', 'Community health outreach program') },
        { src: '/images/programs/health/Gq_e_iDXgAAX6xa.jpg', caption: t('programs.health.captions.image3', 'Young mothers receiving health support') },
      ]
    },
    {
      id: 'peace',
      title: t('programs.peace.title', 'Peace Building Program'),
      description: t('programs.peace.description', 'Building bridges and fostering understanding through dialogue and community engagement.'),
      icon: <Handshake className="h-12 w-12 text-purple-600" />,
      color: 'purple',
      link: '/programs/peace',
      images: [
        { src: '/images/programs/peace/IMG_5145.JPG', caption: t('programs.peace.captions.image1', 'Youth participating in a peace dialogue session') },
        { src: '/images/programs/peace/IMG_5146.JPG', caption: t('programs.peace.captions.image2', 'Community members engaged in conflict resolution training') },
      ]
    },
    {
      id: 'sport-culture-arts',
      title: t('programs.sportCultureArts.title', 'Sport, Culture & Arts Program'),
      description: t('programs.sportCultureArts.description', 'Fostering holistic youth development through sports, cultural activities, and arts.'),
      icon: <Trophy className="h-12 w-12 text-blue-600" />,
      color: 'blue',
      link: '/programs/sport-culture-arts',
      images: [
        { src: '/images/programs/culture/IMG_9495.JPG', caption: t('programs.sportCultureArts.captions.image1', 'Traditional dance performance by youth') },
        { src: '/images/programs/culture/IMG_9496.JPG', caption: t('programs.sportCultureArts.captions.image2', 'Youth engaging in a sports event') },
      ]
    },
  ];

  const allImages = useMemo(() => {
    return programs.flatMap(program => program.images);
  }, [programs]);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % allImages.length);
  }, [allImages.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + allImages.length) % allImages.length);
  }, [allImages.length]);

  useEffect(() => {
    if (allImages.length === 0) return;
    const interval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
    return () => clearInterval(interval);
  }, [nextSlide, allImages.length]);

  const stats = [
    {
      value: '3+',
      label: t('programs.stats.programs', 'Programs'),
      icon: <BookOpen className="h-6 w-6" />
    },
    {
      value: '1000+',
      label: t('programs.stats.beneficiaries', 'Beneficiaries'),
      icon: <Users className="h-6 w-6" />
    },
    {
      value: '20+',
      label: t('programs.stats.years', 'Years of Impact'),
      icon: <Trophy className="h-6 w-6" />
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="relative container-custom mx-auto px-6 py-8">
        {/* Hero Section */}
        <section className="text-center mb-10">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-3 tracking-tight leading-tight">
            {t('programs.hero.title', 'Our Programs')}
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto mb-6 leading-relaxed">
            {t('programs.hero.subtitle', 'Empowering communities and transforming lives through our diverse range of impactful programs.')}
          </p>
        </section>

        {/* New Image Slider Section */}
        {allImages.length > 0 && (
          <section className="relative w-full h-80 sm:h-96 md:h-[500px] lg:h-[600px] overflow-hidden rounded-xl shadow-lg mb-12">
            <AnimatePresence initial={false} mode="wait">
              <motion.img
                key={currentSlide}
                src={allImages[currentSlide].src}
                alt={allImages[currentSlide].caption}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </AnimatePresence>

            {/* Navigation Arrows */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white bg-black/30 hover:bg-black/50 z-10"
              onClick={prevSlide}
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white bg-black/30 hover:bg-black/50 z-10"
              onClick={nextSlide}
            >
              <ChevronRight className="h-6 w-6" />
            </Button>

            {/* Caption */}
            <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/70 to-transparent p-4 text-white z-10">
              <p className="text-center text-sm sm:text-base">{allImages[currentSlide].caption}</p>
            </div>

            {/* Dots indicators */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
              {allImages.map((_, index) => (
                <button
                  key={index}
                  className={`h-2 w-2 rounded-full ${index === currentSlide ? 'bg-white' : 'bg-gray-400 hover:bg-gray-300'}`}
                  onClick={() => setCurrentSlide(index)}
                />
              ))}
            </div>
          </section>
        )}

        {/* Programs Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {programs.map((program) => (
            <motion.div
              key={program.id}
              className={`bg-white rounded-xl shadow-lg p-5 flex flex-col items-center text-center border-t-4 border-${program.color}-500 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1`}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
            >
              <div className={`p-3 rounded-full bg-${program.color}-100 text-${program.color}-600 mb-3`}>
                {program.icon}
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">{program.title}</h2>
              <p className="text-gray-700 mb-3 text-sm leading-relaxed">{program.description}</p>
              <div className="mt-auto flex flex-wrap justify-center gap-2">
                <Link to={program.link}>
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-5 py-2 text-sm">
                    {t('programs.learnMore')}
                    <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                  </Button>
                </Link>
              </div>
            </motion.div>
          ))}
        </section>
      </div>
    </div>
  );
};

export default Programs;

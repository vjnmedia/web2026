import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  GraduationCap, 
  Briefcase, 
  Heart, 
  Music, 
  Users, 
  ArrowRight,
  MapPin,
  Phone,
  Mail,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  ChevronRight,
  Users2,
  Building2,
  Handshake,
  ArrowUp,
  Send,
  ChevronLeft,
  ChevronRight as ChevronRightIcon,
  BookOpen,
  DollarSign,
  Shield,
  Trophy,
  Star,
  Globe,
  Calendar,
  ChevronDown,
  Youtube,
  YoutubeIcon,
  MessageCircle
} from 'lucide-react';
import SEO from '@/components/SEO';
import Hero from "@/components/Hero";
import EventsSlider from "@/components/EventsSlider";
import OptimizedImage from '@/components/OptimizedImage';
import LazyWrapper from '@/components/LazyWrapper';
import { supabase } from '@/lib/supabase';
import { useLanguage } from '@/components/LanguageContext';
import { toast } from 'react-hot-toast';

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const carouselVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? 1000 : -1000,
    opacity: 0
  })
};

const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};

interface ProgramCard {
  icon: React.ReactNode;
  title: string;
  description: string;
  link: string;
}

interface NewsItem {
  title: string;
  excerpt: string;
  date: string;
  image: string;
  link: string;
}

interface Opportunity {
  title: string;
  type: string;
  location: string;
  link: string;
}

interface Blog {
  id: number;
  title: string;
  content: string;
  image_url: string;
  created_at: string;
  author: string;
  language: 'en' | 'fr';
}

const Home: React.FC = () => {
  const { t } = useTranslation();
  const [[page, direction], setPage] = useState([0, 0]);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const { language } = useLanguage();
  const [latestBlogs, setLatestBlogs] = useState<Blog[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const carouselItems = [
    {
      image: 'https://visionjeunessenouvelle.org.rw/wp-content/uploads/2024/03/education-program.jpg',
      title: t('home.programs.education.title'),
      description: t('home.programs.education.description'),
      icon: <GraduationCap className="h-8 w-8 text-white" />
    },
    {
      image: 'https://visionjeunessenouvelle.org.rw/wp-content/uploads/2024/03/economic-empowerment.jpg',
      title: t('home.programs.economic.title'),
      description: t('home.programs.economic.description'),
      icon: <Briefcase className="h-8 w-8 text-white" />
    },
    {
      image: 'https://visionjeunessenouvelle.org.rw/wp-content/uploads/2024/03/health-program.jpg',
      title: t('home.programs.health.title'),
      description: t('home.programs.health.description'),
      icon: <Heart className="h-8 w-8 text-white" />
    },
    {
      image: 'https://visionjeunessenouvelle.org.rw/wp-content/uploads/2024/03/peace-building.jpg',
      title: t('home.programs.peace.title'),
      description: t('home.programs.peace.description'),
      icon: <Users className="h-8 w-8 text-white" />
    },
    {
      image: 'https://visionjeunessenouvelle.org.rw/wp-content/uploads/2024/03/culture-arts.jpg',
      title: t('home.programs.culture.title'),
      description: t('home.programs.culture.description'),
      icon: <Music className="h-8 w-8 text-white" />
    }
  ];

  const paginate = (newDirection: number) => {
    setPage([(page + newDirection + carouselItems.length) % carouselItems.length, newDirection]);
  };

  // Auto-advance carousel
  useEffect(() => {
    const timer = setInterval(() => {
      paginate(1);
    }, 5000);
    return () => clearInterval(timer);
  }, [page]);

  // Handle scroll to top visibility
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle newsletter signup
  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setSubmitSuccess(true);
    setEmail('');
    setIsSubmitting(false);
    setTimeout(() => setSubmitSuccess(false), 3000);
  };

  // Scroll to top handler
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const programs = [
    {
      icon: <GraduationCap className="h-8 w-8 text-vjn-blue" />,
      title: t('home.programs.education.title'),
      description: t('home.programs.education.description'),
      link: '/programs/education'
    },
    {
      icon: <DollarSign className="h-8 w-8 text-vjn-blue" />,
      title: t('home.programs.economic.title'),
      description: t('home.programs.economic.description'),
      link: '/programs/economic'
    },
    {
      icon: <Heart className="h-8 w-8 text-vjn-blue" />,
      title: t('home.programs.health.title'),
      description: t('home.programs.health.description'),
      link: '/programs/health'
    },
    {
      icon: <Shield className="h-8 w-8 text-vjn-blue" />,
      title: t('home.programs.peace.title'),
      description: t('home.programs.peace.description'),
      link: '/programs/peace'
    },
    {
      icon: <Trophy className="h-8 w-8 text-vjn-blue" />,
      title: t('home.programs.culture.title'),
      description: t('home.programs.culture.description'),
      link: '/programs/culture'
    }
  ];

  const news = [
    {
      title: t('home.news.item1.title'),
      excerpt: t('home.news.item1.excerpt'),
      date: t('home.news.item1.date'),
      image: "/images/peace-camp.jpg",
      link: '/news/1'
    },
    {
      title: t('home.news.item2.title'),
      excerpt: t('home.news.item2.excerpt'),
      date: t('home.news.item2.date'),
      image: "/images/vocational-center.jpg",
      link: '/news/2'
    },
    {
      title: t('home.news.item3.title'),
      excerpt: t('home.news.item3.excerpt'),
      date: t('home.news.item3.date'),
      image: "/images/health-dance.jpg",
      link: '/news/3'
    }
  ];

  const beneficiaries = [
    t('home.impact.beneficiaries.description'),
    t('home.impact.communities.description'),
    t('home.impact.partners.description'),
    t('home.impact.success.description')
  ];

  const partners = [
    {
      name: "MISEREOR",
      logo: "/images/partners/MISEREOR.png",
      type: "International Development Partner"
    },
    {
      name: "GIZ",
      logo: "/images/partners/giz.jpg",
      type: "German Development Agency"
    },
    {
      name: "Interpeace",
      logo: "/images/partners/interpeace.jpg",
      type: "Peacebuilding Partner"
    },
    {
      name: "European Union",
      logo: "/images/partners/eu.jpg",
      type: "Major Development Partner"
    },
    {
      name: "FHI",
      logo: "/images/partners/fhi.jpg",
      type: "Health Partner"
    },
    {
      name: "EDC",
      logo: "/images/partners/EDC.jpg",
      type: "Education Partner"
    },
    {
      name: "UNHCR",
      logo: "/images/partners/UNHCR.jpg",
      type: "UN Agency"
    },
    {
      name: "FERWAGY",
      logo: "/images/partners/FERWAGY.jpg",
      type: "Sports Federation"
    },
    {
      name: "Terre Sans Frontière",
      logo: "/images/partners/TERRE SANS FRONTIERE.jpg",
      type: "International Partner"
    },
    {
      name: "VTC",
      logo: "/images/partners/vtc.jpg",
      type: "Technical Education"
    },
    {
      name: "MINIYOUTH",
      logo: "/images/partners/MINIYOUTH.jpg",
      type: "Government Partner"
    },
    {
      name: "GOPA",
      logo: "/images/partners/GOPA.jpg",
      type: "Development Partner"
    },
    {
      name: "Gold Youth",
      logo: "/images/partners/GOLD YOUTH.jpg",
      type: "Youth Development"
    },
    {
      name: "La Mennais",
      logo: "/images/partners/LA MENNAIS.jpg",
      type: "Education Partner"
    },
    {
      name: "FERWABA",
      logo: "/images/partners/FERWABA.jpg",
      type: "Sports Federation"
    },
    {
      name: "Rwanda TVET Board",
      logo: "/images/partners/RWANDA TVET BOARD.jpg",
      type: "Technical Education"
    },
    {
      name: "Catholic Relief Services",
      logo: "/images/partners/CATHOLIC RELIEF SERVICES.jpg",
      type: "Humanitarian Partner"
    },
    {
      name: "Ministry of Sports",
      logo: "/images/partners/MINISTRY OF SPORTS.jpg",
      type: "Government Partner"
    },
    {
      name: "Nyundo Diocese",
      logo: "/images/partners/NYUNDO DIOCESE.jpg",
      type: "Religious Partner"
    },
    {
      name: "FERWAHAND",
      logo: "/images/partners/ferwahand.jpg",
      type: "Sports Federation"
    },
    {
      name: "UNDP",
      logo: "/images/partners/UNPD.jpg",
      type: "UN Agency"
    },
    {
      name: "Rwanda Karate",
      logo: "/images/partners/RWANDA KARATE.jpg",
      type: "Sports Federation"
    },
    {
      name: "Rwanda Book Mobile",
      logo: "/images/partners/rwanda book mobile.jpg",
      type: "Education Partner"
    },
    {
      name: "CARE",
      logo: "/images/partners/care.jpg",
      type: "Humanitarian Partner"
    },
    {
      name: "Africa New Life",
      logo: "/images/partners/AFRICA NEW LIFE.jpg",
      type: "Development Partner"
    },
    {
      name: "UNICEF",
      logo: "/images/partners/UNICEF.jpg",
      type: "UN Agency"
    },
    {
      name: "USAID",
      logo: "/images/partners/USAID.jpg",
      type: "Development Partner"
    },
    {
      name: "Right to Play",
      logo: "/images/partners/RIGHT TO PLAY.jpg",
      type: "Sports Development"
    },
    {
      name: "NESA",
      logo: "/images/partners/NESA.jpg",
      type: "Education Partner"
    },
    {
      name: "RTB",
      logo: "/images/partners/rtb.jpg",
      type: "Media Partner"
    },
    {
      name: "Kirehe District",
      logo: "/images/partners/kirehe district.jpg",
      type: "Local Government"
    },
    {
      name: "Burera District",
      logo: "/images/partners/burera district.jpg",
      type: "Local Government"
    },
    {
      name: "CARITAS Rwanda",
      logo: "/images/partners/caritas.jpg",
      type: "Development Partner"
    },
    {
      name: "Gold Youth",
      logo: "/images/partners/gold-youth.jpg",
      type: "Youth Development"
    },
    {
      name: "Athletism",
      logo: "/images/partners/athletism.jpg",
      type: "Sports Development"
    },
    {
      name: "CRS",
      logo: "/images/partners/crs.jpg",
      type: "Humanitarian Partner"
    },
    {
      name: "PFR",
      logo: "/images/partners/pfr.png",
      type: "Education Partner"
    },
    {
      name: "Imbuto Foundation",
      logo: "/images/partners/imbuto.jpg",
      type: "Youth Development"
    },
    {
      name: "Government of Rwanda",
      logo: "/images/partners/govrw.jpg",
      type: "Government Partner"
    },
    {
      name: "FERWAFA",
      logo: "/images/partners/ferwafa.jpg",
      type: "Sports Federation"
    },
    {
      name: "FIC",
      logo: "/images/partners/fic.jpg",
      type: "Local Partner"
    },
    {
      name: "Nyundo",
      logo: "/images/partners/nyundo.jpg",
      type: "Local Partner"
    }
  ];

  const donors = [
    {
      name: "European Union",
      logo: "/images/donors/eu.png",
      type: "Major Donor"
    },
    {
      name: "USAID",
      logo: "/images/donors/usaid.png",
      type: "Development Partner"
    },
    {
      name: "Global Fund",
      logo: "/images/donors/globalfund.png",
      type: "Health Programs"
    },
    {
      name: "Rwanda Development Board",
      logo: "/images/donors/rdb.png",
      type: "Local Partner"
    }
  ];

  useEffect(() => {
    fetchLatestBlogs();
  }, [language]);

  const fetchLatestBlogs = async () => {
    try {
      const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .eq('language', language)
        .order('created_at', { ascending: false })
        .limit(3);

      if (error) {
        console.error('Error fetching latest blogs:', error);
        toast.error('Failed to fetch latest blogs');
        return;
      }
      
      setLatestBlogs(data || []);
    } catch (error) {
      console.error('Error fetching latest blogs:', error);
      toast.error('Failed to fetch latest blogs');
    } finally {
      setIsLoading(false);
    }
  };

  // Curated list of top partners for better visual impact
  const topPartners = [
    { name: "European Union", logo: "/images/partners/eu.jpg", category: "International" },
    { name: "USAID", logo: "/images/partners/USAID.jpg", category: "International" },
    { name: "UNICEF", logo: "/images/partners/UNICEF.jpg", category: "UN Agency" },
    { name: "Government of Rwanda", logo: "/images/partners/govrw.jpg", category: "Government" },
    { name: "MISEREOR", logo: "/images/partners/MISEREOR.jpg", category: "International" },
    { name: "GIZ", logo: "/images/partners/giz.jpg", category: "International" },
    { name: "Interpeace", logo: "/images/partners/interpeace.jpg", category: "Peace Building" },
    { name: "CARE", logo: "/images/partners/care.jpg", category: "Humanitarian" }
  ];

  function PartnersSection() {
    return (
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
        className="py-20 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden"
      >
        <div className="container mx-auto px-4">
          <motion.div 
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-vjn-blue mb-6">
              Our Trusted Partners
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We work with leading organizations, government agencies, and international partners to create lasting impact.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {topPartners.map((partner, index) => (
              <motion.div
                key={partner.name}
                variants={fadeInUp}
                whileHover={{ y: -5 }}
                className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 text-center group"
              >
                <div className="h-20 flex items-center justify-center mb-4">
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="max-h-16 w-auto object-contain grayscale group-hover:grayscale-0 transition duration-300"
                  />
                </div>
                <h3 className="font-semibold text-gray-800 mb-1">{partner.name}</h3>
                <p className="text-sm text-gray-500">{partner.category}</p>
              </motion.div>
            ))}
          </div>
          
          <motion.div 
            variants={fadeInUp}
            className="text-center mt-12"
          >
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="/partners"
              className="inline-flex items-center text-vjn-blue font-semibold hover:text-vjn-light-blue transition-colors"
            >
              View All Partners
              <ChevronRight className="h-5 w-5 ml-2" />
            </motion.a>
          </motion.div>
        </div>
      </motion.section>
    );
  }

  return (
    <>
      <SEO 
        title="Vision Jeunesse Nouvelle - Empowering Youth for a Better Future"
        description="Vision Jeunesse Nouvelle (VJN) is a youth development organization in Rwanda focused on education, health, economic empowerment, peace building, and cultural development."
        image="/images/VJN_LOGO.jpg"
        type="website"
      />
      <div>
        <Hero />

        {/* Impact Statistics Section */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="py-20 bg-gradient-to-r from-vjn-blue to-vjn-light-blue relative overflow-hidden"
        >
          <div className="container mx-auto px-4">
            <motion.div
              variants={fadeInUp}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Our Impact in Numbers
              </h2>
              <p className="text-xl text-white/90 max-w-4xl mx-auto leading-relaxed">
                Through our programs, we've created meaningful change in the lives of thousands of young people across Rwanda. Every number represents a story of growth, resilience, and opportunity - proof that when youth are empowered, communities thrive.
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              <motion.div
                variants={fadeInUp}
                className="text-center bg-white/10 backdrop-blur-lg p-8 rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300"
              >
                <div className="text-5xl md:text-6xl font-bold text-white mb-2">20+</div>
                <div className="text-white/90 text-lg">Years of Service</div>
                <div className="text-white/70 text-sm mt-2">Youth empowerment and community development</div>
              </motion.div>

              <motion.div
                variants={fadeInUp}
                className="text-center bg-white/10 backdrop-blur-lg p-8 rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300"
              >
                <div className="text-5xl md:text-6xl font-bold text-white mb-2">50,000+</div>
                <div className="text-white/90 text-lg">Young People Reached</div>
                <div className="text-white/70 text-sm mt-2">Through education, peacebuilding, and empowerment</div>
              </motion.div>

              <motion.div
                variants={fadeInUp}
                className="text-center bg-white/10 backdrop-blur-lg p-8 rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300"
              >
                <div className="text-5xl md:text-6xl font-bold text-white mb-2">10,000+</div>
                <div className="text-white/90 text-lg">Refugee Youth Helped</div>
                <div className="text-white/70 text-sm mt-2">Providing support and opportunities</div>
              </motion.div>

              <motion.div
                variants={fadeInUp}
                className="text-center bg-white/10 backdrop-blur-lg p-8 rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300"
              >
                <div className="text-5xl md:text-6xl font-bold text-white mb-2">300+</div>
                <div className="text-white/90 text-lg">Youth Groups</div>
                <div className="text-white/70 text-sm mt-2">Supported with skills, resources, and mentorship</div>
              </motion.div>

              <motion.div
                variants={fadeInUp}
                className="text-center bg-white/10 backdrop-blur-lg p-8 rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300"
              >
                <div className="text-5xl md:text-6xl font-bold text-white mb-2">100+</div>
                <div className="text-white/90 text-lg">Trained Coaches</div>
                <div className="text-white/70 text-sm mt-2">Guiding sports, culture, and arts initiatives</div>
              </motion.div>

              <motion.div
                variants={fadeInUp}
                className="text-center bg-white/10 backdrop-blur-lg p-8 rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300"
              >
                <div className="text-5xl md:text-6xl font-bold text-white mb-2">5</div>
                <div className="text-white/90 text-lg">Refugee Camps</div>
                <div className="text-white/70 text-sm mt-2">And districts actively engaged in outreach</div>
              </motion.div>

              <motion.div
                variants={fadeInUp}
                className="text-center bg-white/10 backdrop-blur-lg p-8 rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300"
              >
                <div className="text-5xl md:text-6xl font-bold text-white mb-2">10,000+</div>
                <div className="text-white/90 text-lg">Teen Mothers</div>
                <div className="text-white/70 text-sm mt-2">Lives changed through empowerment programs</div>
              </motion.div>

              <motion.div
                variants={fadeInUp}
                className="text-center bg-white/10 backdrop-blur-lg p-8 rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300 col-span-1 md:col-span-2 lg:col-span-1"
              >
                <div className="text-4xl md:text-5xl font-bold text-white mb-2">∞</div>
                <div className="text-white/90 text-lg">Stories of Impact</div>
                <div className="text-white/70 text-sm mt-2">Building Rwanda's future generation</div>
              </motion.div>
            </div>

            <motion.div
              variants={fadeInUp}
              className="mt-16 text-center"
            >
              <p className="text-lg text-white/90 max-w-4xl mx-auto leading-relaxed italic">
                These milestones are not just statistics - they are the heartbeat of Vision Jeunesse Nouvelle's mission: building a renewed, dynamic, and productive generation for Rwanda's future.
              </p>
            </motion.div>
          </div>
        </motion.section>

        {/* Who We Are Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-4 text-green-600">{t('home.whoWeAre.title')}</h2>
            <p className="text-xl text-center text-gray-600 mb-12 whitespace-pre-line">{t('home.whoWeAre.description')}</p>

            <div className="max-w-5xl mx-auto flex flex-col gap-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-vjn-blue rounded-2xl shadow-lg p-8 flex flex-col items-center text-center">
                  <h3 className="text-2xl font-semibold text-white mb-2">{t('home.whoWeAre.missionTitle')}</h3>
                  <p className="text-lg text-white whitespace-pre-line">{t('home.whoWeAre.mission')}</p>
                </div>
                <div className="bg-vjn-blue rounded-2xl shadow-lg p-8 flex flex-col items-center text-center">
                  <h3 className="text-2xl font-semibold text-white mb-2">{t('home.whoWeAre.visionTitle')}</h3>
                  <p className="text-lg text-white whitespace-pre-line">{t('home.whoWeAre.vision')}</p>
                </div>
              </div>
              <div className="bg-vjn-blue rounded-2xl shadow-lg p-8 flex flex-col items-center text-left">
                <h3 className="text-2xl font-semibold text-white mb-2 text-center">{t('home.whoWeAre.differentTitle')}</h3>
                <ul className="list-disc list-inside text-lg text-white space-y-2">
                  {t('home.whoWeAre.different').split(/\n\n|\./).map((item, idx) => {
                    const trimmed = item.trim();
                    if (!trimmed) return null;
                    return <li key={idx}>{trimmed}</li>;
                  })}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Core Programs Section Enhancement */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="py-24 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden"
        >
          <div className="container mx-auto px-4">
            <motion.h2 
              variants={fadeInUp}
              className="text-4xl md:text-5xl font-bold text-center mb-16 text-green-600"
            >
              Our Core Programs
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mobile-grid">
              {programs.map((program, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  whileHover={{ y: -10 }}
                  className="group bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-500 mobile-card"
                >
                  <div className="flex items-center mb-6">
                    <div className="p-4 rounded-xl bg-vjn-blue/10 group-hover:bg-vjn-blue/20 transition-all duration-300">
                      {program.icon}
                    </div>
                    <h3 className="text-2xl font-semibold ml-4">{program.title}</h3>
                  </div>
                  <p className="text-gray-600 mb-6 leading-relaxed">{program.description}</p>
                  <motion.a
                    whileHover={{ x: 5 }}
                    href={program.link}
                    className="inline-flex items-center text-vjn-blue font-semibold hover:text-vjn-light-blue transition-colors"
                  >
                    Learn More
                    <ChevronRight className="h-5 w-5 ml-1" />
                  </motion.a>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Success Stories & Testimonials Section */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="py-24 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden"
        >
          <div className="container mx-auto px-4">
            <motion.div 
              variants={fadeInUp}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-vjn-blue mb-6">
                Success Stories
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Hear from the young people whose lives have been transformed through our programs.
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto mobile-grid">
              <motion.div
                variants={fadeInUp}
                className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-500 mobile-card"
              >
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-vjn-blue/10 rounded-full flex items-center justify-center">
                    <Users className="h-8 w-8 text-vjn-blue" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-xl font-semibold">Jean Paul</h3>
                    <p className="text-gray-600">Education Program Graduate</p>
                  </div>
                </div>
                <blockquote className="text-gray-700 italic mb-6">
                  "VJN's education program gave me the skills and confidence to start my own business. Today, I employ 5 other young people in my community."
                </blockquote>
                <div className="flex items-center text-vjn-blue">
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                </div>
              </motion.div>

              <motion.div
                variants={fadeInUp}
                className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-500"
              >
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-vjn-blue/10 rounded-full flex items-center justify-center">
                    <Heart className="h-8 w-8 text-vjn-blue" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-xl font-semibold">Marie Claire</h3>
                    <p className="text-gray-600">Health Program Participant</p>
                  </div>
                </div>
                <blockquote className="text-gray-700 italic mb-6">
                  "Through VJN's health programs, I learned about reproductive health and became a peer educator. I've helped over 200 young people make informed decisions."
                </blockquote>
                <div className="flex items-center text-vjn-blue">
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                </div>
              </motion.div>

              <motion.div
                variants={fadeInUp}
                className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-500"
              >
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-vjn-blue/10 rounded-full flex items-center justify-center">
                    <Shield className="h-8 w-8 text-vjn-blue" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-xl font-semibold">Eric</h3>
                    <p className="text-gray-600">Peace Building Graduate</p>
                  </div>
                </div>
                <blockquote className="text-gray-700 italic mb-6">
                  "VJN's peace building workshops taught me conflict resolution skills. I now mediate disputes in my community and help prevent violence."
                </blockquote>
                <div className="flex items-center text-vjn-blue">
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                </div>
              </motion.div>
            </div>

            <motion.div 
              variants={fadeInUp}
              className="text-center mt-12"
            >
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="/stories"
                className="inline-flex items-center bg-vjn-blue text-white px-8 py-4 rounded-full font-semibold hover:bg-vjn-light-blue transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Read More Stories
                <ChevronRight className="h-5 w-5 ml-2" />
              </motion.a>
            </motion.div>
          </div>
        </motion.section>

        {/* Latest News Section Enhancement */}
        <LazyWrapper>
        <section className="py-24 bg-white relative overflow-hidden">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
              Latest News & Updates
            </h2>
            
            {isLoading ? (
              <div className="flex justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-vjn-blue"></div>
              </div>
            ) : latestBlogs.length === 0 ? (
              <p className="text-center text-gray-500">
                No news available at the moment.
              </p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {latestBlogs.map((blog) => (
                  <motion.div
                    key={blog.id}
                    whileHover={{ y: -10 }}
                    className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500"
                  >
                    {blog.image_url && (
                      <div className="relative w-full aspect-[16/9] overflow-hidden">
                          <OptimizedImage
                          src={blog.image_url}
                          alt={blog.title}
                          className="w-full h-full object-contain bg-gray-50"
                            loading="lazy"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      </div>
                    )}
                    <div className="p-8">
                      <h3 className="text-2xl font-semibold mb-4">{blog.title}</h3>
                      <div 
                        className="text-gray-600 mb-6 line-clamp-3 leading-relaxed prose prose-sm max-w-none"
                        dangerouslySetInnerHTML={{ 
                          __html: blog.content.replace(/<[^>]*>/g, '').substring(0, 150) + '...' 
                        }}
                      />
                      <div className="flex justify-between items-center text-sm text-gray-500 mb-6">
                        <span className="flex items-center">
                          <Users2 className="h-4 w-4 mr-2" />
                          {blog.author}
                        </span>
                        <span className="flex items-center">
                          <Calendar className="h-4 w-4 mr-2" />
                          {new Date(blog.created_at).toLocaleDateString()}
                        </span>
                      </div>
                      <motion.a
                        whileHover={{ x: 5 }}
                        href={`/blog/${blog.id}`}
                        className="inline-flex items-center text-vjn-blue font-semibold hover:text-vjn-light-blue transition-colors"
                          aria-label={`Read more about ${blog.title}`}
                      >
                        Read More
                        <ChevronRight className="h-5 w-5 ml-1" />
                      </motion.a>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            <motion.div 
              variants={fadeInUp}
              className="text-center mt-12"
            >
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="/news"
                className="inline-flex items-center bg-vjn-blue text-white px-8 py-4 rounded-full font-semibold hover:bg-vjn-light-blue transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                View All News
                <ChevronRight className="h-5 w-5 ml-2" />
              </motion.a>
            </motion.div>
          </div>
        </section>
        </LazyWrapper>

        {/* Who We Serve Section */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="py-24 bg-gradient-to-br from-vjn-blue to-vjn-light-blue relative overflow-hidden"
        >
          <div className="container mx-auto px-4">
            <motion.h2 
              variants={fadeInUp}
              className="text-4xl md:text-5xl font-bold text-center text-white mb-8"
            >
              {t('home.beneficiaries.title')}
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-xl text-center text-white/90 mb-16 max-w-4xl mx-auto"
            >
              {t('home.beneficiaries.description')}
            </motion.p>
            <motion.div 
              variants={fadeInUp}
              className="max-w-6xl mx-auto"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {(t('home.beneficiaries.list', { returnObjects: true }) as any[]).map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300"
                  >
                    <div className="flex flex-col">
                      <div className="flex items-center mb-4">
                        <span className="text-3xl mr-3">{item.icon}</span>
                        <h3 className="text-white text-xl font-semibold">{item.title}</h3>
                      </div>
                      <p className="text-white/90">{item.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* Trust & Credibility Section */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="py-20 bg-white relative overflow-hidden"
        >
          <div className="container mx-auto px-4">
            <motion.div 
              variants={fadeInUp}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-vjn-blue mb-6">
                Trusted & Recognized
              </h2>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                At Vision Jeunesse Nouvelle, trust is not just earned—it's built through years of consistency, transparency, and impact. Since 2002, communities, partners, and institutions across Rwanda and beyond have recognized our commitment to empowering youth and creating sustainable change.
              </p>
            </motion.div>
            
            <motion.div 
              variants={fadeInUp}
              className="max-w-6xl mx-auto mb-16"
            >
              <div className="bg-gradient-to-r from-vjn-blue/5 to-vjn-light-blue/5 rounded-2xl p-8 text-center">
                <p className="text-lg text-gray-700 leading-relaxed">
                  We are proud to have worked hand in hand with national and international partners, delivering programs that transform lives and uplift communities. Our credibility is anchored in results that speak louder than promises.
                </p>
              </div>
            </motion.div>

            <motion.div 
              variants={fadeInUp}
              className="mb-16"
            >
              <h3 className="text-3xl font-bold text-center text-blue-600 mb-12">Awards & Certifications</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                <motion.div
                  variants={fadeInUp}
                  className="bg-white rounded-2xl shadow-lg p-8 border-l-4 border-blue-600 hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex items-start mb-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                      <Trophy className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold text-gray-800 mb-2">Government Recognition</h4>
                      <p className="text-gray-600">Recognized by the Government of Rwanda for excellence in youth empowerment and community development.</p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  variants={fadeInUp}
                  className="bg-white rounded-2xl shadow-lg p-8 border-l-4 border-green-600 hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex items-start mb-4">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                      <Star className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold text-gray-800 mb-2">Partner Acknowledgments</h4>
                      <p className="text-gray-600">Recipient of multiple partner acknowledgments for innovation in peacebuilding, sports, and economic empowerment.</p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  variants={fadeInUp}
                  className="bg-white rounded-2xl shadow-lg p-8 border-l-4 border-orange-600 hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex items-start mb-4">
                    <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                      <Shield className="h-6 w-6 text-orange-600" />
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold text-gray-800 mb-2">National Certification</h4>
                      <p className="text-gray-600">Certified under various national frameworks that uphold accountability, transparency, and sustainability in non-profit management.</p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  variants={fadeInUp}
                  className="bg-white rounded-2xl shadow-lg p-8 border-l-4 border-sky-600 hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex items-start mb-4">
                    <div className="w-12 h-12 bg-sky-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                      <Globe className="h-6 w-6 text-sky-600" />
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold text-gray-800 mb-2">International Partnerships</h4>
                      <p className="text-gray-600">Trusted partner of UN agencies, international NGOs, and local institutions for program delivery across districts and refugee camps.</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Key Partners Visual */}
            <motion.div 
              variants={fadeInUp}
              className="bg-gradient-to-r from-vjn-blue/5 to-vjn-light-blue/5 rounded-2xl p-8"
            >
              <h3 className="text-2xl font-semibold text-blue-600 mb-6 text-center">Trusted by Leading Organizations</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 items-center justify-items-center">
                <div className="text-center">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-2 shadow-md">
                    <span className="text-sm font-bold text-blue-600">MoE</span>
                  </div>
                  <p className="text-sm text-gray-600">Ministry of Education</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-2 shadow-md">
                    <span className="text-sm font-bold text-blue-600">UN</span>
                  </div>
                  <p className="text-sm text-gray-600">United Nations</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-2 shadow-md">
                    <span className="text-sm font-bold text-blue-600">RTB</span>
                  </div>
                  <p className="text-sm text-gray-600">Rwanda TVET Board</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-2 shadow-md">
                    <span className="text-sm font-bold text-blue-600">IP</span>
                  </div>
                  <p className="text-sm text-gray-600">Interpeace</p>
                </div>
              </div>
            </motion.div>

            <motion.div 
              variants={fadeInUp}
              className="mt-12 text-center"
            >
              <p className="text-lg text-gray-700 italic max-w-4xl mx-auto">
                "With every project, every training, and every initiative, we continue to strengthen the foundation of trust—making Vision Jeunesse Nouvelle a name that communities and partners can confidently stand with."
              </p>
            </motion.div>
          </div>
        </motion.section>

        {/* Events Slider Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4 text-vjn-blue">Upcoming Events</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Join us for our upcoming events and be part of the positive change in our community. 
                Stay updated with the latest activities and opportunities.
              </p>
            </div>
            <EventsSlider />
          </div>
        </section>

        {/* Get in Touch Section */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="py-24 bg-gradient-to-br from-blue-50 via-white to-green-50 relative overflow-hidden"
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-10 left-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
            <div className="absolute top-40 right-10 w-72 h-72 bg-green-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000"></div>
            <div className="absolute -bottom-8 left-20 w-72 h-72 bg-orange-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-4000"></div>
          </div>

          <div className="container mx-auto px-4 relative">
            <motion.div
              variants={fadeInUp}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                {t('home.getInTouch.title')}
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                {t('home.getInTouch.subtitle')}
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {/* Contact Information Card */}
              <motion.div
                variants={fadeInUp}
                className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300 border border-gray-100"
              >
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MapPin className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Visit Us</h3>
                  <p className="text-gray-600">Come and see our work in action</p>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <MapPin className="h-5 w-5 text-blue-600 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-gray-900">Address</p>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        Rubavu District, Gisenyi Sector<br />
                        Nengo Cell, Gikarani Village
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Phone className="h-5 w-5 text-blue-600 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-gray-900">Phone</p>
                      <p className="text-gray-600 text-sm">
                        +250 785 403 435<br />
                        +250 788 892 826
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Mail className="h-5 w-5 text-blue-600 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-gray-900">Email</p>
                      <p className="text-gray-600 text-sm">visionjeunesse2050@gmail.com</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Social Media Card */}
              <motion.div
                variants={fadeInUp}
                className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300 border border-gray-100"
              >
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Follow Us</h3>
                  <p className="text-gray-600">Stay connected with our community</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <a 
                    href="#" 
                    className="flex items-center justify-center p-4 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors group"
                  >
                    <Facebook className="h-6 w-6 text-blue-600 group-hover:scale-110 transition-transform" />
                    <span className="ml-2 text-sm font-medium text-gray-700">Facebook</span>
                  </a>
                  <a 
                    href="#" 
                    className="flex items-center justify-center p-4 bg-sky-50 rounded-xl hover:bg-sky-100 transition-colors group"
                  >
                    <Twitter className="h-6 w-6 text-sky-600 group-hover:scale-110 transition-transform" />
                    <span className="ml-2 text-sm font-medium text-gray-700">Twitter</span>
                  </a>
                  <a 
                    href="#" 
                    className="flex items-center justify-center p-4 bg-pink-50 rounded-xl hover:bg-pink-100 transition-colors group"
                  >
                    <Instagram className="h-6 w-6 text-pink-600 group-hover:scale-110 transition-transform" />
                    <span className="ml-2 text-sm font-medium text-gray-700">Instagram</span>
                  </a>
                  <a 
                    href="https://www.linkedin.com/in/visionjeunesse2" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex items-center justify-center p-4 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors group"
                  >
                    <Linkedin className="h-6 w-6 text-blue-600 group-hover:scale-110 transition-transform" />
                    <span className="ml-2 text-sm font-medium text-gray-700">LinkedIn</span>
                  </a>
                  <a 
                    href="https://www.youtube.com/@visionjeunesse2" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex items-center justify-center p-4 bg-red-50 rounded-xl hover:bg-red-100 transition-colors group col-span-2"
                  >
                    <YoutubeIcon className="h-6 w-6 text-red-600 group-hover:scale-110 transition-transform" />
                    <span className="ml-2 text-sm font-medium text-gray-700">YouTube Channel</span>
                  </a>
                </div>
              </motion.div>

              {/* Quick Actions Card */}
              <motion.div
                variants={fadeInUp}
                className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300 border border-gray-100"
              >
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MessageCircle className="h-8 w-8 text-orange-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Quick Actions</h3>
                  <p className="text-gray-600">Get involved with our mission</p>
                </div>
                <div className="space-y-4">
                  <button className="w-full bg-blue-600 text-white py-3 px-6 rounded-xl hover:bg-blue-700 transition-colors font-semibold flex items-center justify-center group">
                    <MessageCircle className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform" />
                    Contact Us
                  </button>
                  <button className="w-full bg-green-600 text-white py-3 px-6 rounded-xl hover:bg-green-700 transition-colors font-semibold flex items-center justify-center group">
                    <Heart className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform" />
                    Donate Now
                  </button>
                  <button className="w-full bg-orange-600 text-white py-3 px-6 rounded-xl hover:bg-orange-700 transition-colors font-semibold flex items-center justify-center group">
                    <Users className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform" />
                    Volunteer
                  </button>
                  <button className="w-full border-2 border-gray-300 text-gray-700 py-3 px-6 rounded-xl hover:border-gray-400 hover:bg-gray-50 transition-colors font-semibold flex items-center justify-center group">
                    <Calendar className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform" />
                    View Events
                  </button>
                </div>
              </motion.div>
            </div>

            {/* Bottom CTA */}
            <motion.div
              variants={fadeInUp}
              className="text-center mt-16"
            >
              <div className="bg-gradient-to-r from-blue-600 to-green-600 rounded-2xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-4">Ready to Make a Difference?</h3>
                <p className="text-lg mb-6 opacity-90">
                  Join thousands of others who are already part of our mission to empower youth and build stronger communities.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button className="bg-white text-blue-600 px-8 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors">
                    Start Your Journey
                  </button>
                  <button className="border-2 border-white text-white px-8 py-3 rounded-xl font-semibold hover:bg-white hover:text-blue-600 transition-colors">
                    Learn More
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* Call-to-Action Section */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="py-24 bg-gradient-to-r from-vjn-blue to-vjn-light-blue relative overflow-hidden"
        >
          <div className="container mx-auto px-4">
            <motion.div 
              variants={fadeInUp}
              className="max-w-4xl mx-auto text-center"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Join Us in Creating Change
              </h2>
              <p className="text-xl text-white/90 mb-12 leading-relaxed">
                Your support helps us reach more young people and create lasting impact in communities across Rwanda. 
                Every contribution makes a difference.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                <motion.div 
                  variants={fadeInUp}
                  className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl border border-white/20"
                >
                  <DollarSign className="h-12 w-12 text-white mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">Donate</h3>
                  <p className="text-white/80 mb-4">Support our programs with a one-time or monthly donation</p>
                  <motion.a
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    href="/donate"
                    className="inline-flex items-center bg-white text-vjn-blue px-6 py-3 rounded-full font-semibold hover:bg-white/90 transition-all duration-300 mobile-button"
                  >
                    Donate Now
                    <ChevronRight className="h-4 w-4 ml-2" />
                  </motion.a>
                </motion.div>

                <motion.div 
                  variants={fadeInUp}
                  className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl border border-white/20"
                >
                  <Users className="h-12 w-12 text-white mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">Volunteer</h3>
                  <p className="text-white/80 mb-4">Share your skills and time to help young people succeed</p>
                  <motion.a
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    href="/volunteer"
                    className="inline-flex items-center bg-white text-vjn-blue px-6 py-3 rounded-full font-semibold hover:bg-white/90 transition-all duration-300 mobile-button"
                  >
                    Get Involved
                    <ChevronRight className="h-4 w-4 ml-2" />
                  </motion.a>
                </motion.div>

                <motion.div 
                  variants={fadeInUp}
                  className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl border border-white/20"
                >
                  <Handshake className="h-12 w-12 text-white mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">Partner</h3>
                  <p className="text-white/80 mb-4">Collaborate with us to create sustainable impact</p>
                  <motion.a
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    href="/contact"
                    className="inline-flex items-center bg-white text-vjn-blue px-6 py-3 rounded-full font-semibold hover:bg-white/90 transition-all duration-300 mobile-button"
                  >
                    Partner With Us
                    <ChevronRight className="h-4 w-4 ml-2" />
                  </motion.a>
                </motion.div>
              </div>

            </motion.div>
          </div>
        </motion.section>


        {/* Scroll to Top Button Enhancement */}
        <AnimatePresence>
          {showScrollTop && (
            <motion.button
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              onClick={scrollToTop}
              className="fixed bottom-8 right-8 bg-vjn-blue text-white p-4 rounded-full shadow-lg hover:bg-vjn-light-blue transition-all duration-300 z-50"
              whileHover={{ y: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <ArrowUp className="h-6 w-6" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* Partners Section */}
      <PartnersSection />
    </>
  );
}

export default Home; 
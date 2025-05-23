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
  ChevronDown
} from 'lucide-react';
import Hero from "@/components/Hero";
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
      title: "Education",
      description: "We provide vocational training, literacy support, and special education to help youth access meaningful employment and personal growth.",
      link: '/programs/education'
    },
    {
      icon: <DollarSign className="h-8 w-8 text-vjn-blue" />,
      title: "Economic Empowerment",
      description: "We equip young entrepreneurs with business skills, financial literacy, and connections to cooperatives and market opportunities.",
      link: '/programs/economic'
    },
    {
      icon: <Heart className="h-8 w-8 text-vjn-blue" />,
      title: "Health Promotion",
      description: "Through awareness campaigns and peer education, we promote sexual and reproductive health, HIV/AIDS prevention, and mental well-being.",
      link: '/programs/health'
    },
    {
      icon: <Shield className="h-8 w-8 text-vjn-blue" />,
      title: "Peace Building",
      description: "Our youth-led peace initiatives focus on dialogue, digital peacebuilding, conflict mediation, and regional collaboration.",
      link: '/programs/peace'
    },
    {
      icon: <Trophy className="h-8 w-8 text-vjn-blue" />,
      title: "Sports, Culture & Arts",
      description: "We uncover and develop youth talent in sports, music, and visual arts, creating spaces for self-expression and community healing.",
      link: '/programs/culture'
    }
  ];

  const news = [
    {
      title: "Youth Peace Camp Empowers 150 Rwandan Students",
      excerpt: "Cross-border dialogue meets culture and leadership.",
      date: "March 15, 2024",
      image: "/images/peace-camp.jpg",
      link: '/news/1'
    },
    {
      title: "VJN Launches New Vocational Center in Nyundo",
      excerpt: "Training the next generation in welding and hospitality.",
      date: "March 10, 2024",
      image: "/images/vocational-center.jpg",
      link: '/news/2'
    },
    {
      title: "Fighting NCDs Through Dance and Sport",
      excerpt: "Our creative health campaign is making moves—literally.",
      date: "March 5, 2024",
      image: "/images/health-dance.jpg",
      link: '/news/3'
    }
  ];

  const opportunities = [
    {
      title: "Community Program Facilitator (Gisenyi)",
      type: "Full-time",
      location: "Gisenyi, Rwanda",
      deadline: "May 31, 2025",
      link: '/careers/1'
    },
    {
      title: "Peacebuilding Bootcamp – Kigali",
      type: "Youth Program",
      location: "Kigali, Rwanda",
      deadline: "April 15, 2024",
      link: '/careers/2'
    }
  ];

  const beneficiaries = [
    "Children, youth, and adults",
    "Vulnerable individuals",
    "Refugees and disaster victims",
    "Prisoners and ex-offenders",
    "People living with or affected by HIV/AIDS"
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

  return (
    <div className="min-h-screen">
      <Hero />

      {/* Hero Section Enhancement */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Background Video/Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-vjn-blue/90 to-vjn-light-blue/90 z-10" />
          <img
            src="/images/hero-bg.jpg"
            alt="VJN Youth Programs"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Hero Content */}
        <div className="container mx-auto px-4 relative z-20">
          <motion.div 
            variants={fadeInUp}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Empowering Youth, Building Tomorrow
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-12 leading-relaxed">
              Join Vision Jeunesse Nouvelle in creating opportunities for young people to thrive and make a difference in their communities.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="/programs"
                className="bg-white text-vjn-blue px-8 py-4 rounded-full font-semibold hover:bg-white/90 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Explore Programs
                <ChevronRight className="h-5 w-5 ml-2 inline-block" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="/donate"
                className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white/10 transition-all duration-300"
              >
                Support Our Mission
              </motion.a>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="text-white/80"
          >
            <ChevronDown className="h-8 w-8" />
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Who We Are Section Enhancement */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
        className="py-24 bg-white relative overflow-hidden"
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '60px 60px'
          }}></div>
        </div>

        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto">
            <motion.h2 
              variants={fadeInUp}
              className="text-4xl md:text-5xl font-bold text-center mb-8"
            >
              Who We Are
            </motion.h2>
            <motion.p 
              variants={fadeInUp}
              className="text-xl text-gray-700 mb-12 text-center leading-relaxed"
            >
              Vision Jeunesse Nouvelle (VJN) is a non-governmental organization founded in Gisenyi, Rwanda, by the Brothers of Christian Instruction. Our mission is to develop youth potential and nurture moral, physical, and spiritual growth for a peaceful and productive society.
            </motion.p>
            <motion.div 
              variants={fadeInUp}
              className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center"
            >
              <div className="p-6 rounded-2xl bg-gray-50 hover:bg-gray-100 transition-all duration-300">
                <Users2 className="h-12 w-12 text-vjn-blue mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Our Mission</h3>
                <p className="text-gray-600">Empowering youth through education, skills development, and community engagement.</p>
              </div>
              <div className="p-6 rounded-2xl bg-gray-50 hover:bg-gray-100 transition-all duration-300">
                <Building2 className="h-12 w-12 text-vjn-blue mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Our Vision</h3>
                <p className="text-gray-600">Creating a society where every young person can reach their full potential.</p>
              </div>
              <div className="p-6 rounded-2xl bg-gray-50 hover:bg-gray-100 transition-all duration-300">
                <Handshake className="h-12 w-12 text-vjn-blue mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Our Values</h3>
                <p className="text-gray-600">Integrity, compassion, and commitment to sustainable development.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

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
            className="text-4xl md:text-5xl font-bold text-center mb-16"
          >
            Our Core Programs
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {programs.map((program, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ y: -10 }}
                className="group bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-500"
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

      {/* Latest News Section Enhancement */}
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
                    <div className="aspect-video relative overflow-hidden">
                      <img
                        src={blog.image_url}
                        alt={blog.title}
                        className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                  )}
                  <div className="p-8">
                    <h3 className="text-2xl font-semibold mb-4">{blog.title}</h3>
                    <p className="text-gray-600 mb-6 line-clamp-3 leading-relaxed">
                      {blog.content}
                    </p>
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

      {/* Who We Serve Section Enhancement */}
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
            className="text-4xl md:text-5xl font-bold text-center text-white mb-16"
          >
            Who We Serve
          </motion.h2>
          <motion.div 
            variants={fadeInUp}
            className="max-w-4xl mx-auto"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {beneficiaries.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300"
                >
                  <div className="flex items-center">
                    <div className="p-3 rounded-full bg-white/20 mr-4">
                      <Users2 className="h-6 w-6 text-white" />
                    </div>
                    <span className="text-white text-lg">{item}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Opportunities Section Enhancement */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
        className="py-24 bg-white relative overflow-hidden"
      >
        <div className="container mx-auto px-4">
          <motion.h2 
            variants={fadeInUp}
            className="text-4xl md:text-5xl font-bold text-center mb-16"
          >
            Opportunities for You
          </motion.h2>
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {opportunities.map((opportunity, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  whileHover={{ y: -10 }}
                  className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-500"
                >
                  <h3 className="text-2xl font-semibold mb-4">{opportunity.title}</h3>
                  <div className="flex items-center text-gray-600 mb-6">
                    <span className="bg-vjn-blue/10 text-vjn-blue px-4 py-2 rounded-full text-sm font-semibold mr-4">
                      {opportunity.type}
                    </span>
                    <span className="flex items-center">
                      <MapPin className="h-4 w-4 mr-2" />
                      {opportunity.location}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mb-6">Application Deadline: {opportunity.deadline}</p>
                  <motion.a
                    whileHover={{ x: 5 }}
                    href={opportunity.link}
                    className="inline-flex items-center text-vjn-blue font-semibold hover:text-vjn-light-blue transition-colors"
                  >
                    Apply Now
                    <ChevronRight className="h-5 w-5 ml-1" />
                  </motion.a>
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
                href="/careers"
                className="inline-flex items-center bg-vjn-blue text-white px-8 py-4 rounded-full font-semibold hover:bg-vjn-light-blue transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                View All Opportunities
                <ChevronRight className="h-5 w-5 ml-2" />
              </motion.a>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Contact Section Enhancement */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
        className="py-24 bg-gray-50 relative overflow-hidden"
      >
        <div className="container mx-auto px-4">
          <motion.div 
            variants={fadeInUp}
            className="max-w-6xl mx-auto"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <h2 className="text-4xl font-bold mb-8">Get in Touch</h2>
                <div className="space-y-6">
                  <motion.div 
                    whileHover={{ x: 5 }}
                    className="flex items-center bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <MapPin className="h-8 w-8 text-vjn-blue mr-4" />
                    <div>
                      <p className="font-semibold text-lg mb-1">Address</p>
                      <p className="text-gray-600">Rubavu District, Gisenyi Sector, Nengo Cell, Gikarani Village</p>
                    </div>
                  </motion.div>
                  <motion.div 
                    whileHover={{ x: 5 }}
                    className="flex items-center bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <Phone className="h-8 w-8 text-vjn-blue mr-4" />
                    <div>
                      <p className="font-semibold text-lg mb-1">Phone</p>
                      <p className="text-gray-600">+250 785 403 435</p>
                      <p className="text-gray-600">+250 788 892 826</p>
                    </div>
                  </motion.div>
                  <motion.div 
                    whileHover={{ x: 5 }}
                    className="flex items-center bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <Mail className="h-8 w-8 text-vjn-blue mr-4" />
                    <div>
                      <p className="font-semibold text-lg mb-1">Email</p>
                      <p className="text-gray-600">visionjeunesse2050@gmail.com</p>
                    </div>
                  </motion.div>
                </div>
                <div className="flex space-x-4 mt-8">
                  <motion.a 
                    whileHover={{ y: -5 }}
                    href="https://facebook.com/visionjeunesse2" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <Facebook className="h-6 w-6 text-vjn-blue" />
                  </motion.a>
                  <motion.a 
                    whileHover={{ y: -5 }}
                    href="https://twitter.com/visionjeunesse2" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <Twitter className="h-6 w-6 text-vjn-blue" />
                  </motion.a>
                  <motion.a 
                    whileHover={{ y: -5 }}
                    href="https://instagram.com/visionjeunesse2" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <Instagram className="h-6 w-6 text-vjn-blue" />
                  </motion.a>
                </div>
              </div>
              <div>
                <h2 className="text-4xl font-bold mb-8">Our Location</h2>
                <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-xl">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3987.1234567890123!2d29.12345678901234!3d-1.1234567890123456!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMcKwMDcnMjQuNCJTIDI5wrAwNyc0NS4xIkU!5e0!3m2!1sen!2srw!4v1234567890123"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
                <div className="mt-6 text-center">
                  <p className="text-gray-600 flex items-center justify-center">
                    <Globe className="h-5 w-5 mr-2" />
                    Located in Gisenyi, Rubavu District, Western Province, Rwanda
                  </p>
                </div>
              </div>
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
  );
};

export default Home; 
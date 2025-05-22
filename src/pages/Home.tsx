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
  Globe
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

      {/* Who We Are */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
        className="py-20 bg-white"
      >
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.h2 
              variants={fadeInUp}
              className="text-3xl font-bold text-center mb-8"
            >
              Who We Are
            </motion.h2>
            <motion.p 
              variants={fadeInUp}
              className="text-lg text-gray-700 mb-8 text-center"
            >
              Vision Jeunesse Nouvelle (VJN) is a non-governmental organization founded in Gisenyi, Rwanda, by the Brothers of Christian Instruction. Our mission is to develop youth potential and nurture moral, physical, and spiritual growth for a peaceful and productive society.
            </motion.p>
            <motion.div 
              variants={fadeInUp}
              className="text-center"
            >
              <motion.a
                whileHover={{ x: 5 }}
                href="/about"
                className="inline-flex items-center text-vjn-blue font-semibold hover:text-vjn-light-blue transition-colors"
              >
                Read More About Us
                <ChevronRight className="h-5 w-5 ml-1" />
              </motion.a>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Core Programs */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
        className="py-20 bg-gray-50"
      >
        <div className="container mx-auto px-4">
          <motion.h2 
            variants={fadeInUp}
            className="text-3xl font-bold text-center mb-12"
          >
            Our Core Programs
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {programs.map((program, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ y: -5 }}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-all"
              >
                <div className="flex items-center mb-4">
                  {program.icon}
                  <h3 className="text-xl font-semibold ml-3">{program.title}</h3>
                </div>
                <p className="text-gray-600 mb-4">{program.description}</p>
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

      {/* Impact Story */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
        className="py-20 bg-white"
      >
        <div className="container mx-auto px-4">
          <motion.div 
            variants={fadeInUp}
            className="max-w-4xl mx-auto"
          >
            <div className="bg-gray-50 rounded-lg shadow-md p-8">
              <div className="flex items-center mb-6">
                <img
                  src="/images/testimonial.jpg"
                  alt="Josiane M."
                  className="w-20 h-20 rounded-full object-cover mr-4"
                />
                <div>
                  <h3 className="text-xl font-semibold">Josiane M.</h3>
                  <p className="text-gray-600">Rubavu District</p>
                </div>
              </div>
              <blockquote className="text-xl text-gray-700 italic mb-6">
                "VJN gave me purpose. I was just a student. Now, I am a youth leader in my village, running my own business and mentoring others."
              </blockquote>
              <motion.a
                whileHover={{ x: 5 }}
                href="/stories"
                className="inline-flex items-center text-vjn-blue font-semibold hover:text-vjn-light-blue transition-colors"
              >
                Read More Success Stories
                <ChevronRight className="h-5 w-5 ml-1" />
              </motion.a>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Latest News & Updates */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            {language === 'en' ? 'Latest News & Updates' : 'Dernières Nouvelles et Mises à Jour'}
          </h2>
          
          {isLoading ? (
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-vjn-blue"></div>
            </div>
          ) : latestBlogs.length === 0 ? (
            <p className="text-center text-gray-500">
              {language === 'en' ? 'No news available at the moment.' : 'Aucune nouvelle disponible pour le moment.'}
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {latestBlogs.map((blog) => (
                <div key={blog.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                  {blog.image_url && (
                    <div className="aspect-video relative">
                      <img
                        src={blog.image_url}
                        alt={blog.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{blog.title}</h3>
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {blog.content}
                    </p>
                    <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
                      <span>{blog.author}</span>
                      <span>{new Date(blog.created_at).toLocaleDateString()}</span>
                    </div>
                    <a
                      href={`/blog/${blog.id}`}
                      className="inline-flex items-center text-vjn-blue font-semibold hover:text-vjn-light-blue transition-colors"
                    >
                      {language === 'en' ? 'Read More' : 'Lire la Suite'}
                      <ChevronRight className="h-5 w-5 ml-1" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="text-center mt-8">
            <a
              href="/news"
              className="inline-block bg-vjn-blue text-white px-6 py-3 rounded-md font-semibold hover:bg-vjn-light-blue transition-colors"
            >
              {language === 'en' ? 'View All News' : 'Voir Toutes les Nouvelles'}
            </a>
          </div>
        </div>
      </section>

      {/* Who We Serve */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
        className="py-20 bg-white"
      >
        <div className="container mx-auto px-4">
          <motion.h2 
            variants={fadeInUp}
            className="text-3xl font-bold text-center mb-12"
          >
            Who We Serve
          </motion.h2>
          <motion.div 
            variants={fadeInUp}
            className="max-w-3xl mx-auto"
          >
            <ul className="space-y-4">
              {beneficiaries.map((item, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center"
                >
                  <Star className="h-6 w-6 text-vjn-blue mr-3" />
                  <span className="text-lg">{item}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </motion.section>

      {/* Opportunities */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
        className="py-20 bg-gray-50"
      >
        <div className="container mx-auto px-4">
          <motion.h2 
            variants={fadeInUp}
            className="text-3xl font-bold text-center mb-12"
          >
            Opportunities for You
          </motion.h2>
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {opportunities.map((opportunity, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  whileHover={{ y: -5 }}
                  className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-all"
                >
                  <h3 className="text-xl font-semibold mb-2">{opportunity.title}</h3>
                  <div className="flex items-center text-gray-600 mb-4">
                    <span className="mr-4">{opportunity.type}</span>
                    <span className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      {opportunity.location}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mb-4">Application Deadline: {opportunity.deadline}</p>
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
              className="text-center mt-8"
            >
              <motion.a
                whileHover={{ x: 5 }}
                href="/careers"
                className="inline-flex items-center text-vjn-blue font-semibold hover:text-vjn-light-blue transition-colors"
              >
                View All Opportunities
                <ChevronRight className="h-5 w-5 ml-1" />
              </motion.a>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Youth Repository */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
        className="py-20 bg-white"
      >
        <div className="container mx-auto px-4">
          <motion.div 
            variants={fadeInUp}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-3xl font-bold mb-6">Youth Group Database Access</h2>
            <p className="text-lg text-gray-700 mb-8">
              Youth Teams & Talent Repository<br />
              Are you a partner, coach, or program manager? Log in to manage youth profiles, track development, and support growth.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="/repository"
                className="bg-vjn-blue text-white px-8 py-3 rounded-md font-semibold hover:bg-vjn-light-blue transition-colors"
              >
                Access Repository
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="/register"
                className="bg-transparent border-2 border-vjn-blue text-vjn-blue px-8 py-3 rounded-md font-semibold hover:bg-vjn-blue/10 transition-colors"
              >
                Register a New Youth Group
              </motion.a>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Partner CTA */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
        className="py-20 bg-gray-50"
      >
        <div className="container mx-auto px-4">
          <motion.div 
            variants={fadeInUp}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-3xl font-bold mb-6">Partner With Us</h2>
            <p className="text-lg text-gray-700 mb-8">
              Every act of support creates ripples of transformation.<br />
              Partner with us to reach more youth, grow more leaders, and build peace in more communities.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="/partner"
                className="bg-vjn-blue text-white px-8 py-3 rounded-md font-semibold hover:bg-vjn-light-blue transition-colors"
              >
                Become a Partner
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="/donate"
                className="bg-transparent border-2 border-vjn-blue text-vjn-blue px-8 py-3 rounded-md font-semibold hover:bg-vjn-blue/10 transition-colors"
              >
                Donate Now
              </motion.a>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Partners */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
        className="py-20 bg-gray-50"
      >
        <div className="container mx-auto px-4">
          <motion.h2 
            variants={fadeInUp}
            className="text-3xl font-bold text-center mb-12"
          >
            Our Partners
          </motion.h2>
          
          <motion.div 
            variants={fadeInUp}
            className="relative"
          >
            <div className="overflow-hidden">
              <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${page * 100}%)` }}>
                {partners.map((partner, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ y: -5 }}
                    className="min-w-[200px] mx-4 bg-white rounded-lg shadow-md p-4 text-center hover:shadow-lg transition-all"
                  >
                    <div className="h-24 mb-3 flex items-center justify-center">
                      <img
                        src={partner.logo}
                        alt={partner.name}
                        className="max-h-full max-w-full object-contain"
                      />
                    </div>
                    <h4 className="font-semibold text-sm mb-1 line-clamp-2">{partner.name}</h4>
                    <p className="text-xs text-gray-600 line-clamp-2">{partner.type}</p>
                  </motion.div>
                ))}
              </div>
            </div>
            
            {/* Navigation Buttons */}
            <button
              onClick={() => paginate(-1)}
              className="absolute left-0 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors z-10"
            >
              <ChevronLeft className="h-6 w-6 text-vjn-blue" />
            </button>
            <button
              onClick={() => paginate(1)}
              className="absolute right-0 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors z-10"
            >
              <ChevronRight className="h-6 w-6 text-vjn-blue" />
            </button>
          </motion.div>
        </div>
      </motion.section>

      {/* Contact Info */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
        className="py-20 bg-white"
      >
        <div className="container mx-auto px-4">
          <motion.div 
            variants={fadeInUp}
            className="max-w-6xl mx-auto"
          >
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-1">
                <h2 className="text-2xl font-bold mb-6">Contact Us</h2>
                <div className="space-y-4">
                  <motion.div 
                    whileHover={{ x: 5 }}
                    className="flex items-center"
                  >
                    <MapPin className="h-6 w-6 text-vjn-blue mr-3" />
                    <div>
                      <p className="font-semibold">Address:</p>
                      <p>Rubavu District, Gisenyi Sector, Nengo Cell, Gikarani Village</p>
                    </div>
                  </motion.div>
                  <motion.div 
                    whileHover={{ x: 5 }}
                    className="flex items-center"
                  >
                    <Phone className="h-6 w-6 text-vjn-blue mr-3" />
                    <div>
                      <p>+250 785 403 435</p>
                      <p>+250 788 892 826</p>
                    </div>
                  </motion.div>
                  <motion.div 
                    whileHover={{ x: 5 }}
                    className="flex items-center"
                  >
                    <Mail className="h-6 w-6 text-vjn-blue mr-3" />
                    <p>visionjeunesse2050@gmail.com</p>
                  </motion.div>
                </div>
                <div className="flex space-x-4 mt-6">
                  <motion.a 
                    whileHover={{ y: -5 }}
                    href="https://facebook.com/visionjeunesse2" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-vjn-blue transition-colors"
                  >
                    <Facebook className="h-6 w-6" />
                  </motion.a>
                  <motion.a 
                    whileHover={{ y: -5 }}
                    href="https://twitter.com/visionjeunesse2" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-vjn-blue transition-colors"
                  >
                    <Twitter className="h-6 w-6" />
                  </motion.a>
                  <motion.a 
                    whileHover={{ y: -5 }}
                    href="https://instagram.com/visionjeunesse2" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-vjn-blue transition-colors"
                  >
                    <Instagram className="h-6 w-6" />
                  </motion.a>
                </div>
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href="/contact"
                  className="inline-block mt-8 bg-vjn-blue text-white px-6 py-3 rounded-md font-semibold hover:bg-vjn-light-blue transition-colors"
                >
                  Contact Form
                </motion.a>
              </div>
              <div className="lg:col-span-2">
                <h2 className="text-2xl font-bold mb-6">Our Location</h2>
                <div className="relative h-[500px] rounded-lg overflow-hidden shadow-lg">
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
                <div className="mt-4 text-center">
                  <p className="text-gray-600">
                    <Globe className="h-5 w-5 inline-block mr-2" />
                    Located in Gisenyi, Rubavu District, Western Province, Rwanda
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 bg-vjn-blue text-white p-3 rounded-full shadow-lg hover:bg-vjn-light-blue transition-colors z-50"
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
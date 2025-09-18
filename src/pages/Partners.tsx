import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { 
  Building2, 
  Globe, 
  Award, 
  Users, 
  Handshake, 
  Star, 
  ExternalLink,
  MapPin,
  Calendar,
  CheckCircle,
  ArrowRight,
  Search,
  Filter,
  ChevronDown
} from 'lucide-react';
import { useLanguage } from '@/components/LanguageContext';

interface Partner {
  id: string;
  name: string;
  category: 'Government' | 'International' | 'Local' | 'Corporate' | 'NGO';
  type: 'Strategic' | 'Funding' | 'Technical' | 'Community';
  logo: string;
  description: string;
  website?: string;
  location: string;
  partnershipStart: string;
  focusAreas: string[];
  impact: string;
  testimonial?: {
    quote: string;
    author: string;
    position: string;
  };
}

const Partners = () => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedType, setSelectedType] = useState<string>('All');
  const [showFilters, setShowFilters] = useState(false);

  // Real partner data based on available logos
  const partners: Partner[] = [
    // Government Partners
    {
      id: '1',
      name: 'Government of Rwanda',
      category: 'Government',
      type: 'Strategic',
      logo: '/images/partners/govrw.jpg',
      description: 'Strategic partnership with the Government of Rwanda for youth development and national policy implementation.',
      website: 'https://gov.rw',
      location: 'Kigali, Rwanda',
      partnershipStart: '2002',
      focusAreas: ['Youth Policy', 'National Development', 'Governance'],
      impact: '100,000+ youth reached through government collaboration',
      testimonial: {
        quote: 'Vision Jeunesse Nouvelle has been a key partner in implementing our youth development agenda.',
        author: 'Government of Rwanda',
        position: 'Ministry of Youth'
      }
    },
    {
      id: '2',
      name: 'Ministry of Sports',
      category: 'Government',
      type: 'Strategic',
      logo: '/images/partners/MINISTRY OF SPORTS.jpg',
      description: 'Collaboration on sports development and youth engagement through athletic programs.',
      website: 'https://misp.gov.rw',
      location: 'Kigali, Rwanda',
      partnershipStart: '2015',
      focusAreas: ['Sports Development', 'Youth Engagement', 'Athletics'],
      impact: '15,000+ youth engaged in sports programs',
      testimonial: {
        quote: 'Their sports programs have significantly contributed to youth development in Rwanda.',
        author: 'Ministry of Sports',
        position: 'Government of Rwanda'
      }
    },
    {
      id: '3',
      name: 'Ministry of Youth',
      category: 'Government',
      type: 'Strategic',
      logo: '/images/partners/MINIYOUTH.jpg',
      description: 'Direct partnership with the Ministry of Youth for policy implementation and youth empowerment initiatives.',
      website: 'https://miniyouth.gov.rw',
      location: 'Kigali, Rwanda',
      partnershipStart: '2010',
      focusAreas: ['Youth Policy', 'Leadership Development', 'Empowerment'],
      impact: '50,000+ youth empowered through ministry programs',
      testimonial: {
        quote: 'VJN is our most trusted partner in youth development at the grassroots level.',
        author: 'Ministry of Youth',
        position: 'Government of Rwanda'
      }
    },
    {
      id: '4',
      name: 'Rwanda TVET Board',
      category: 'Government',
      type: 'Technical',
      logo: '/images/partners/RWANDA TVET BOARD.jpg',
      description: 'Technical partnership for vocational education and training programs across Rwanda.',
      website: 'https://rtb.gov.rw',
      location: 'Kigali, Rwanda',
      partnershipStart: '2018',
      focusAreas: ['Vocational Training', 'Skills Development', 'Technical Education'],
      impact: '5,000+ youth trained in vocational skills',
      testimonial: {
        quote: 'Their vocational training programs align perfectly with our national TVET strategy.',
        author: 'Rwanda TVET Board',
        position: 'Government of Rwanda'
      }
    },
    {
      id: '5',
      name: 'Rwanda Broadcasting Agency',
      category: 'Government',
      type: 'Strategic',
      logo: '/images/partners/rtb.jpg',
      description: 'Media partnership for youth awareness campaigns and program visibility across Rwanda.',
      website: 'https://rba.rw',
      location: 'Kigali, Rwanda',
      partnershipStart: '2017',
      focusAreas: ['Media', 'Awareness', 'Youth Engagement'],
      impact: 'Millions reached through joint awareness campaigns',
      testimonial: {
        quote: 'Their youth-focused content has significantly enhanced our programming reach.',
        author: 'Rwanda Broadcasting Agency',
        position: 'Government of Rwanda'
      }
    },
    {
      id: '6',
      name: 'Burera District',
      category: 'Government',
      type: 'Community',
      logo: '/images/partners/burera district.jpg',
      description: 'Local government partnership for community development and youth programs in Burera District.',
      website: 'https://burera.gov.rw',
      location: 'Burera District, Rwanda',
      partnershipStart: '2016',
      focusAreas: ['Community Development', 'Local Governance', 'Youth Programs'],
      impact: '10,000+ youth served in Burera District',
      testimonial: {
        quote: 'VJN has transformed youth development in our district through innovative programs.',
        author: 'Burera District',
        position: 'Local Government'
      }
    },
    {
      id: '7',
      name: 'Kirehe District',
      category: 'Government',
      type: 'Community',
      logo: '/images/partners/kirehe district.jpg',
      description: 'District-level partnership for youth development and community empowerment in Kirehe.',
      website: 'https://kirehe.gov.rw',
      location: 'Kirehe District, Rwanda',
      partnershipStart: '2019',
      focusAreas: ['Community Development', 'Youth Empowerment', 'Local Programs'],
      impact: '8,000+ youth engaged in district programs',
      testimonial: {
        quote: 'Their programs have made a significant impact on youth development in our district.',
        author: 'Kirehe District',
        position: 'Local Government'
      }
    },

    // International Organizations
    {
      id: '8',
      name: 'United Nations Development Programme',
      category: 'International',
      type: 'Funding',
      logo: '/images/partners/UNPD.jpg',
      description: 'Supporting sustainable development and peacebuilding initiatives in refugee communities.',
      website: 'https://undp.org',
      location: 'New York, USA',
      partnershipStart: '2020',
      focusAreas: ['Peacebuilding', 'Refugee Support', 'Sustainable Development'],
      impact: '10,000+ refugee youth supported through joint programs',
      testimonial: {
        quote: 'Their innovative approach to youth empowerment in challenging environments is exemplary.',
        author: 'UNDP Rwanda',
        position: 'United Nations'
      }
    },
    {
      id: '9',
      name: 'UNHCR Rwanda',
      category: 'International',
      type: 'Funding',
      logo: '/images/partners/UNHCR.jpg',
      description: 'Supporting refugee youth through education and livelihood programs in refugee camps.',
      website: 'https://unhcr.org',
      location: 'Kigali, Rwanda',
      partnershipStart: '2015',
      focusAreas: ['Refugee Support', 'Education', 'Livelihoods'],
      impact: '8,000+ refugee youth empowered through education',
      testimonial: {
        quote: 'Their dedication to refugee youth empowerment is truly inspiring.',
        author: 'UNHCR Rwanda',
        position: 'United Nations'
      }
    },
    {
      id: '10',
      name: 'UNICEF Rwanda',
      category: 'International',
      type: 'Funding',
      logo: '/images/partners/UNICEF.jpg',
      description: 'Collaboration on child protection and youth development programs across Rwanda.',
      website: 'https://unicef.org',
      location: 'Kigali, Rwanda',
      partnershipStart: '2017',
      focusAreas: ['Child Protection', 'Youth Development', 'Education'],
      impact: '20,000+ children and youth supported',
      testimonial: {
        quote: 'Their child-centered approach has significantly improved youth outcomes in Rwanda.',
        author: 'UNICEF Rwanda',
        position: 'United Nations'
      }
    },
    {
      id: '11',
      name: 'Interpeace',
      category: 'International',
      type: 'Technical',
      logo: '/images/partners/interpeace.jpg',
      description: 'Collaborating on peacebuilding and conflict resolution programs in the Great Lakes region.',
      website: 'https://interpeace.org',
      location: 'Geneva, Switzerland',
      partnershipStart: '2019',
      focusAreas: ['Peacebuilding', 'Conflict Resolution', 'Community Dialogue'],
      impact: '300+ community leaders trained in peacebuilding techniques',
      testimonial: {
        quote: 'Vision Jeunesse Nouvelle brings authentic local knowledge to our peacebuilding efforts.',
        author: 'Interpeace',
        position: 'International Organization'
      }
    },
    {
      id: '12',
      name: 'European Union',
      category: 'International',
      type: 'Funding',
      logo: '/images/partners/eu.jpg',
      description: 'EU funding support for youth development and community empowerment programs.',
      website: 'https://europa.eu',
      location: 'Brussels, Belgium',
      partnershipStart: '2021',
      focusAreas: ['Youth Development', 'Community Empowerment', 'Capacity Building'],
      impact: '15,000+ youth benefited from EU-funded programs',
      testimonial: {
        quote: 'Their programs demonstrate excellent value for money and sustainable impact.',
        author: 'European Union',
        position: 'International Organization'
      }
    },
    {
      id: '13',
      name: 'USAID Rwanda',
      category: 'International',
      type: 'Funding',
      logo: '/images/partners/USAID.jpg',
      description: 'USAID support for education and youth development initiatives across Rwanda.',
      website: 'https://usaid.gov',
      location: 'Kigali, Rwanda',
      partnershipStart: '2018',
      focusAreas: ['Education', 'Youth Development', 'Capacity Building'],
      impact: '12,000+ youth reached through USAID programs',
      testimonial: {
        quote: 'Their innovative approaches to youth development are making a real difference.',
        author: 'USAID Rwanda',
        position: 'US Government'
      }
    },

    // Sports Organizations
    {
      id: '14',
      name: 'FERWABA (Rwanda Basketball Federation)',
      category: 'NGO',
      type: 'Community',
      logo: '/images/partners/FERWABA.jpg',
      description: 'Partnership for basketball development and youth sports programs across Rwanda.',
      website: 'https://ferwaba.rw',
      location: 'Kigali, Rwanda',
      partnershipStart: '2016',
      focusAreas: ['Basketball', 'Youth Sports', 'Athletics'],
      impact: '3,000+ youth engaged in basketball programs',
      testimonial: {
        quote: 'Their basketball programs have significantly improved youth engagement in sports.',
        author: 'FERWABA',
        position: 'Sports Federation'
      }
    },
    {
      id: '15',
      name: 'FERWAFA (Rwanda Football Federation)',
      category: 'NGO',
      type: 'Community',
      logo: '/images/partners/ferwafa.jpg',
      description: 'Football development partnership for youth sports and community engagement.',
      website: 'https://ferwafa.rw',
      location: 'Kigali, Rwanda',
      partnershipStart: '2015',
      focusAreas: ['Football', 'Youth Sports', 'Community Development'],
      impact: '5,000+ youth engaged in football programs',
      testimonial: {
        quote: 'Their football programs have brought communities together through sports.',
        author: 'FERWAFA',
        position: 'Sports Federation'
      }
    },
    {
      id: '16',
      name: 'FERWAGY (Rwanda Gymnastics Federation)',
      category: 'NGO',
      type: 'Community',
      logo: '/images/partners/FERWAGY.jpg',
      description: 'Gymnastics development and youth sports programs in Rwanda.',
      website: 'https://ferwagy.rw',
      location: 'Kigali, Rwanda',
      partnershipStart: '2017',
      focusAreas: ['Gymnastics', 'Youth Sports', 'Physical Development'],
      impact: '1,500+ youth engaged in gymnastics programs',
      testimonial: {
        quote: 'Their gymnastics programs have developed both physical and mental strength in youth.',
        author: 'FERWAGY',
        position: 'Sports Federation'
      }
    },
    {
      id: '17',
      name: 'Rwanda Karate Federation',
      category: 'NGO',
      type: 'Community',
      logo: '/images/partners/RWANDA KARATE.jpg',
      description: 'Martial arts development and youth discipline programs across Rwanda.',
      website: 'https://rwandakarate.rw',
      location: 'Kigali, Rwanda',
      partnershipStart: '2018',
      focusAreas: ['Karate', 'Martial Arts', 'Youth Discipline'],
      impact: '2,000+ youth trained in karate and martial arts',
      testimonial: {
        quote: 'Their martial arts programs have instilled discipline and confidence in youth.',
        author: 'Rwanda Karate Federation',
        position: 'Sports Federation'
      }
    },
    {
      id: '18',
      name: 'Athletics Rwanda',
      category: 'NGO',
      type: 'Community',
      logo: '/images/partners/athletism.jpg',
      description: 'Track and field development programs for youth across Rwanda.',
      website: 'https://athleticsrwanda.rw',
      location: 'Kigali, Rwanda',
      partnershipStart: '2019',
      focusAreas: ['Athletics', 'Track & Field', 'Youth Sports'],
      impact: '2,500+ youth engaged in athletics programs',
      testimonial: {
        quote: 'Their athletics programs have produced talented young athletes for Rwanda.',
        author: 'Athletics Rwanda',
        position: 'Sports Federation'
      }
    },

    // Development Organizations
    {
      id: '19',
      name: 'CARE International',
      category: 'NGO',
      type: 'Community',
      logo: '/images/partners/care.jpg',
      description: 'Joint community development and women empowerment initiatives across Rwanda.',
      website: 'https://care.org',
      location: 'Kigali, Rwanda',
      partnershipStart: '2016',
      focusAreas: ['Women Empowerment', 'Community Development', 'Gender Equality'],
      impact: '8,000+ women and youth empowered through joint programs',
      testimonial: {
        quote: 'Their community-centered approach has transformed lives in rural Rwanda.',
        author: 'CARE Rwanda',
        position: 'International NGO'
      }
    },
    {
      id: '20',
      name: 'Caritas Rwanda',
      category: 'NGO',
      type: 'Community',
      logo: '/images/partners/caritas.jpg',
      description: 'Catholic charity partnership for community development and social services.',
      website: 'https://caritasrwanda.org',
      location: 'Kigali, Rwanda',
      partnershipStart: '2014',
      focusAreas: ['Social Services', 'Community Development', 'Faith-based Programs'],
      impact: '12,000+ families supported through joint programs',
      testimonial: {
        quote: 'Their faith-based approach to community development is truly inspiring.',
        author: 'Caritas Rwanda',
        position: 'Catholic Charity'
      }
    },
    {
      id: '21',
      name: 'Catholic Relief Services',
      category: 'NGO',
      type: 'Community',
      logo: '/images/partners/crs.jpg',
      description: 'CRS partnership for humanitarian aid and community development programs.',
      website: 'https://crs.org',
      location: 'Kigali, Rwanda',
      partnershipStart: '2017',
      focusAreas: ['Humanitarian Aid', 'Community Development', 'Emergency Response'],
      impact: '6,000+ families supported during emergencies',
      testimonial: {
        quote: 'Their rapid response capabilities have saved lives during critical times.',
        author: 'CRS Rwanda',
        position: 'International NGO'
      }
    },
    {
      id: '22',
      name: 'FHI 360',
      category: 'NGO',
      type: 'Technical',
      logo: '/images/partners/fhi.jpg',
      description: 'Technical partnership for health and education programs in Rwanda.',
      website: 'https://fhi360.org',
      location: 'Kigali, Rwanda',
      partnershipStart: '2018',
      focusAreas: ['Health', 'Education', 'Technical Support'],
      impact: '10,000+ youth reached through health and education programs',
      testimonial: {
        quote: 'Their technical expertise has enhanced our program delivery significantly.',
        author: 'FHI 360 Rwanda',
        position: 'International NGO'
      }
    },
    {
      id: '23',
      name: 'GIZ Rwanda',
      category: 'NGO',
      type: 'Technical',
      logo: '/images/partners/giz.jpg',
      description: 'German development cooperation for youth and community development programs.',
      website: 'https://giz.de',
      location: 'Kigali, Rwanda',
      partnershipStart: '2019',
      focusAreas: ['Technical Cooperation', 'Youth Development', 'Capacity Building'],
      impact: '7,000+ youth trained in technical skills',
      testimonial: {
        quote: 'Their technical cooperation approach has built sustainable capacity in Rwanda.',
        author: 'GIZ Rwanda',
        position: 'German Development Agency'
      }
    },
    {
      id: '24',
      name: 'Right to Play',
      category: 'NGO',
      type: 'Community',
      logo: '/images/partners/RIGHT TO PLAY.jpg',
      description: 'Play-based learning and youth development programs across Rwanda.',
      website: 'https://righttoplay.org',
      location: 'Kigali, Rwanda',
      partnershipStart: '2020',
      focusAreas: ['Play-based Learning', 'Youth Development', 'Education'],
      impact: '4,000+ children engaged in play-based learning',
      testimonial: {
        quote: 'Their play-based approach has revolutionized learning for children in Rwanda.',
        author: 'Right to Play Rwanda',
        position: 'International NGO'
      }
    },
    {
      id: '25',
      name: 'Gold Youth',
      category: 'NGO',
      type: 'Community',
      logo: '/images/partners/gold-youth.jpg',
      description: 'Youth leadership and peer education programs across Rwanda.',
      website: 'https://goldyouth.org',
      location: 'Kigali, Rwanda',
      partnershipStart: '2021',
      focusAreas: ['Youth Leadership', 'Peer Education', 'Mentorship'],
      impact: '2,000+ youth trained as peer educators',
      testimonial: {
        quote: 'Their peer education model has created a ripple effect in youth communities.',
        author: 'Gold Youth Rwanda',
        position: 'International NGO'
      }
    },

    // Educational Organizations
    {
      id: '26',
      name: 'Education Development Center',
      category: 'NGO',
      type: 'Technical',
      logo: '/images/partners/EDC.jpg',
      description: 'Educational technology and curriculum development partnership.',
      website: 'https://edc.org',
      location: 'Kigali, Rwanda',
      partnershipStart: '2019',
      focusAreas: ['Educational Technology', 'Curriculum Development', 'Teacher Training'],
      impact: '500+ teachers trained in new methodologies',
      testimonial: {
        quote: 'Their educational innovations have transformed teaching and learning in Rwanda.',
        author: 'EDC Rwanda',
        position: 'Educational NGO'
      }
    },
    {
      id: '27',
      name: 'Rwanda Book Mobile',
      category: 'NGO',
      type: 'Community',
      logo: '/images/partners/rwanda book mobile.jpg',
      description: 'Mobile library services and literacy programs for rural communities.',
      website: 'https://rwandabookmobile.org',
      location: 'Kigali, Rwanda',
      partnershipStart: '2018',
      focusAreas: ['Literacy', 'Mobile Libraries', 'Rural Education'],
      impact: '15,000+ children accessed mobile library services',
      testimonial: {
        quote: 'Their mobile library has brought books to the most remote communities.',
        author: 'Rwanda Book Mobile',
        position: 'Educational NGO'
      }
    },
    {
      id: '28',
      name: 'VTC (Vocational Training Center)',
      category: 'NGO',
      type: 'Technical',
      logo: '/images/partners/vtc.jpg',
      description: 'Vocational training and skills development partnership.',
      website: 'https://vtc.rw',
      location: 'Kigali, Rwanda',
      partnershipStart: '2017',
      focusAreas: ['Vocational Training', 'Skills Development', 'Employment'],
      impact: '3,000+ youth trained in vocational skills',
      testimonial: {
        quote: 'Their vocational training has created employment opportunities for youth.',
        author: 'VTC Rwanda',
        position: 'Training Institution'
      }
    },

    // Faith-based Organizations
    {
      id: '29',
      name: 'Nyundo Diocese',
      category: 'NGO',
      type: 'Community',
      logo: '/images/partners/NYUNDO DIOCESE.jpg',
      description: 'Catholic diocese partnership for community development and youth programs.',
      website: 'https://nyundodiocese.org',
      location: 'Nyundo, Rwanda',
      partnershipStart: '2015',
      focusAreas: ['Faith-based Programs', 'Community Development', 'Youth Ministry'],
      impact: '5,000+ youth engaged in faith-based programs',
      testimonial: {
        quote: 'Their faith-based approach has strengthened communities and youth spiritually.',
        author: 'Nyundo Diocese',
        position: 'Catholic Diocese'
      }
    },
    {
      id: '30',
      name: 'La Mennais Brothers',
      category: 'NGO',
      type: 'Community',
      logo: '/images/partners/LA MENNAIS.jpg',
      description: 'Catholic religious order partnership for education and youth development.',
      website: 'https://lamennais.org',
      location: 'Kigali, Rwanda',
      partnershipStart: '2016',
      focusAreas: ['Education', 'Youth Development', 'Faith Formation'],
      impact: '2,000+ youth educated through La Mennais programs',
      testimonial: {
        quote: 'Their educational approach combines academic excellence with moral formation.',
        author: 'La Mennais Brothers',
        position: 'Catholic Religious Order'
      }
    },
    {
      id: '31',
      name: 'Terre Sans Frontière',
      category: 'NGO',
      type: 'Community',
      logo: '/images/partners/TERRE SANS FRONTIERE.jpg',
      description: 'International solidarity and community development partnership.',
      website: 'https://terresansfrontiere.org',
      location: 'Kigali, Rwanda',
      partnershipStart: '2018',
      focusAreas: ['International Solidarity', 'Community Development', 'Cross-cultural Exchange'],
      impact: '1,500+ youth engaged in international exchange programs',
      testimonial: {
        quote: 'Their international perspective has broadened horizons for Rwandan youth.',
        author: 'Terre Sans Frontière',
        position: 'International NGO'
      }
    },

    // Other Partners
    {
      id: '32',
      name: 'Africa New Life',
      category: 'NGO',
      type: 'Community',
      logo: '/images/partners/AFRICA NEW LIFE.jpg',
      description: 'Community development and child sponsorship programs across Rwanda.',
      website: 'https://africanewlife.org',
      location: 'Kigali, Rwanda',
      partnershipStart: '2017',
      focusAreas: ['Child Sponsorship', 'Community Development', 'Education'],
      impact: '3,000+ children sponsored through joint programs',
      testimonial: {
        quote: 'Their child sponsorship program has transformed lives across Rwanda.',
        author: 'Africa New Life',
        position: 'International NGO'
      }
    },
    {
      id: '33',
      name: 'Imbuto Foundation',
      category: 'NGO',
      type: 'Community',
      logo: '/images/partners/imbuto.jpg',
      description: 'First Lady\'s foundation partnership for women and youth empowerment.',
      website: 'https://imbutofoundation.org',
      location: 'Kigali, Rwanda',
      partnershipStart: '2016',
      focusAreas: ['Women Empowerment', 'Youth Development', 'Leadership'],
      impact: '8,000+ women and youth empowered through joint programs',
      testimonial: {
        quote: 'Their empowerment programs have created strong women leaders in Rwanda.',
        author: 'Imbuto Foundation',
        position: 'First Lady\'s Foundation'
      }
    },
    {
      id: '34',
      name: 'NESA',
      category: 'NGO',
      type: 'Technical',
      logo: '/images/partners/NESA.jpg',
      description: 'Educational support and assessment partnership for quality education.',
      website: 'https://nesa.rw',
      location: 'Kigali, Rwanda',
      partnershipStart: '2019',
      focusAreas: ['Educational Assessment', 'Quality Assurance', 'Teacher Development'],
      impact: '1,000+ teachers trained in assessment methodologies',
      testimonial: {
        quote: 'Their assessment tools have improved education quality across Rwanda.',
        author: 'NESA Rwanda',
        position: 'Educational Agency'
      }
    },
    {
      id: '35',
      name: 'PFR (Partners in Faith Rwanda)',
      category: 'NGO',
      type: 'Community',
      logo: '/images/partners/pfr.jpg',
      description: 'Faith-based community development and youth programs.',
      website: 'https://pfr.rw',
      location: 'Kigali, Rwanda',
      partnershipStart: '2018',
      focusAreas: ['Faith-based Development', 'Community Programs', 'Youth Ministry'],
      impact: '4,000+ youth engaged in faith-based community programs',
      testimonial: {
        quote: 'Their faith-based approach has strengthened community bonds and youth development.',
        author: 'PFR Rwanda',
        position: 'Faith-based NGO'
      }
    },
    {
      id: '36',
      name: 'GOPA',
      category: 'NGO',
      type: 'Technical',
      logo: '/images/partners/GOPA.jpg',
      description: 'Technical assistance and capacity building partnership.',
      website: 'https://gopa.de',
      location: 'Kigali, Rwanda',
      partnershipStart: '2020',
      focusAreas: ['Technical Assistance', 'Capacity Building', 'Project Management'],
      impact: '500+ staff trained in project management and technical skills',
      testimonial: {
        quote: 'Their technical expertise has enhanced our organizational capacity significantly.',
        author: 'GOPA Rwanda',
        position: 'Technical Assistance Agency'
      }
    },
    {
      id: '37',
      name: 'FIC (Filles de Jésus)',
      category: 'NGO',
      type: 'Community',
      logo: '/images/partners/fic.jpg',
      description: 'Catholic religious congregation partnership for education and community development.',
      website: 'https://ficongregation.org',
      location: 'Kigali, Rwanda',
      partnershipStart: '2017',
      focusAreas: ['Education', 'Community Development', 'Women\'s Programs'],
      impact: '2,500+ women and youth served through FIC programs',
      testimonial: {
        quote: 'Their dedication to women and youth development is truly inspiring.',
        author: 'FIC Rwanda',
        position: 'Catholic Religious Congregation'
      }
    },
    {
      id: '38',
      name: 'MISEREOR',
      category: 'NGO',
      type: 'Funding',
      logo: '/images/partners/MISEREOR.jpg',
      description: 'German Catholic development agency supporting community development programs.',
      website: 'https://misereor.org',
      location: 'Kigali, Rwanda',
      partnershipStart: '2019',
      focusAreas: ['Community Development', 'Social Justice', 'Capacity Building'],
      impact: '6,000+ community members benefited from MISEREOR programs',
      testimonial: {
        quote: 'Their support has enabled us to reach the most vulnerable communities.',
        author: 'MISEREOR Rwanda',
        position: 'German Catholic Development Agency'
      }
    }
  ];

  const categories = ['All', 'Government', 'International', 'Local', 'Corporate', 'NGO'];
  const types = ['All', 'Strategic', 'Funding', 'Technical', 'Community'];

  const filteredPartners = partners.filter(partner => {
    const matchesSearch = partner.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         partner.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         partner.focusAreas.some(area => area.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'All' || partner.category === selectedCategory;
    const matchesType = selectedType === 'All' || partner.type === selectedType;
    
    return matchesSearch && matchesCategory && matchesType;
  });


  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Government': return <Building2 className="h-5 w-5" />;
      case 'International': return <Globe className="h-5 w-5" />;
      case 'Local': return <MapPin className="h-5 w-5" />;
      case 'Corporate': return <Building2 className="h-5 w-5" />;
      case 'NGO': return <Users className="h-5 w-5" />;
      default: return <Handshake className="h-5 w-5" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Strategic': return 'bg-blue-100 text-blue-800';
      case 'Funding': return 'bg-green-100 text-green-800';
      case 'Technical': return 'bg-purple-100 text-purple-800';
      case 'Community': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.5, 
        ease: "easeOut" 
      } 
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-vjn-blue via-blue-700 to-vjn-light-blue text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-20 h-20 border border-white/20 rounded-full"></div>
          <div className="absolute top-32 right-20 w-16 h-16 border border-white/20 rounded-full"></div>
          <div className="absolute bottom-20 left-1/4 w-12 h-12 border border-white/20 rounded-full"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Our Partners
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              Building Stronger Communities Through Strategic Partnerships
            </p>
            <p className="text-lg text-blue-200 max-w-3xl mx-auto">
              Since 2002, we've worked hand in hand with governments, international organizations, 
              and local communities to create lasting impact across Rwanda and beyond.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
          >
            {[
              { number: '38+', label: 'Active Partners' },
              { number: '22+', label: 'Years of Collaboration' },
              { number: '100+', label: 'Joint Programs' },
              { number: '∞', label: 'Lives Impacted' }
            ].map((stat, index) => (
              <div key={index} className="space-y-2">
                <div className="text-3xl md:text-4xl font-bold text-vjn-blue">{stat.number}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-8 bg-gray-100 sticky top-0 z-40">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search partners..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-vjn-blue focus:border-transparent"
                />
              </div>
              
              {/* Filter Toggle */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Filter className="h-5 w-5" />
                Filters
                <ChevronDown className={`h-4 w-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
              </button>
            </div>

            {/* Filter Options */}
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4 p-4 bg-white rounded-lg border border-gray-200"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-vjn-blue focus:border-transparent"
                    >
                      {categories.map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Partnership Type</label>
                    <select
                      value={selectedType}
                      onChange={(e) => setSelectedType(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-vjn-blue focus:border-transparent"
                    >
                      {types.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* Partners Grid */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
            {filteredPartners.length > 0 ? filteredPartners.map((partner, index) => (
              <motion.div
                key={partner.id}
                variants={fadeInUp}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group border border-gray-100"
              >
                {/* Partner Header with Logo */}
                <div className="p-6 pb-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-20 h-20 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl flex items-center justify-center border-2 border-gray-200 shadow-sm group-hover:shadow-md transition-shadow">
                        <img
                          src={partner.logo}
                          alt={`${partner.name} logo`}
                          className="w-14 h-14 object-contain"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                            target.nextElementSibling?.classList.remove('hidden');
                          }}
                        />
                        <div className="hidden w-14 h-14 bg-gradient-to-br from-vjn-blue/10 to-blue-100 rounded-lg flex items-center justify-center">
                          {getCategoryIcon(partner.category)}
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-xl text-gray-900 group-hover:text-vjn-blue transition-colors mb-1 line-clamp-2">
                          {partner.name}
                        </h3>
                        <div className="flex items-center space-x-2 text-sm text-gray-500 mb-2">
                          <span className="font-medium">{partner.category}</span>
                          <span>•</span>
                          <span className="truncate">{partner.location}</span>
                        </div>
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getTypeColor(partner.type)}`}>
                          {partner.type}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                    {partner.description}
                  </p>
                </div>

                {/* Partner Details - Compact Layout */}
                <div className="px-6 pb-4 space-y-3">
                  {/* Focus Areas */}
                  <div>
                    <h4 className="font-semibold text-xs text-gray-700 uppercase tracking-wide mb-2">Focus Areas</h4>
                    <div className="flex flex-wrap gap-1.5">
                      {partner.focusAreas.slice(0, 3).map((area, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 bg-vjn-blue/10 text-vjn-blue text-xs rounded-md font-medium"
                        >
                          {area}
                        </span>
                      ))}
                      {partner.focusAreas.length > 3 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md font-medium">
                          +{partner.focusAreas.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Impact & Duration Row */}
                  <div className="grid grid-cols-1 gap-3">
                    <div>
                      <h4 className="font-semibold text-xs text-gray-700 uppercase tracking-wide mb-1">Impact</h4>
                      <p className="text-sm text-gray-600 line-clamp-2">{partner.impact}</p>
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="h-4 w-4 mr-2 text-vjn-blue" />
                      <span>Since {partner.partnershipStart}</span>
                    </div>
                  </div>
                </div>

                {/* Testimonial - Compact */}
                {partner.testimonial && (
                  <div className="mx-6 mb-4 bg-gradient-to-r from-vjn-blue/5 to-blue-50 p-4 rounded-lg border-l-4 border-vjn-blue">
                    <blockquote className="text-sm text-gray-700 italic mb-2 line-clamp-2">
                      "{partner.testimonial.quote}"
                    </blockquote>
                    <div className="text-xs text-gray-500">
                      <div className="font-semibold text-vjn-blue">{partner.testimonial.author}</div>
                      <div>{partner.testimonial.position}</div>
                    </div>
                  </div>
                )}

                {/* Actions Footer */}
                <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
                  <div className="flex items-center justify-between">
                    {partner.website ? (
                      <a
                        href={partner.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-vjn-blue hover:text-blue-700 text-sm font-semibold transition-colors group/link"
                      >
                        Visit Website
                        <ExternalLink className="h-4 w-4 ml-1 group-hover/link:translate-x-0.5 transition-transform" />
                      </a>
                    ) : (
                      <div className="text-sm text-gray-400">No website available</div>
                    )}
                    <div className="flex items-center text-vjn-green text-sm font-semibold">
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Active
                    </div>
                  </div>
                </div>
              </motion.div>
            )) : (
              <div className="col-span-full text-center py-16">
                <div className="text-gray-400 mb-4">
                  <Building2 className="h-16 w-16 mx-auto" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No partners found</h3>
                <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
              </div>
            )}
          </div>

        </div>
      </section>

      {/* Partnership CTA Section */}
      <section className="py-20 bg-gradient-to-r from-vjn-blue to-blue-700 text-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Interested in Partnering with Us?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Join our network of partners making a difference in youth development and community empowerment.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="/contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center px-8 py-4 bg-white text-vjn-blue font-semibold rounded-lg hover:bg-gray-100 transition-colors"
              >
                Get in Touch
                <ArrowRight className="h-5 w-5 ml-2" />
              </motion.a>
              <motion.a
                href="/programs"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-vjn-blue transition-colors"
              >
                View Our Programs
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Partners;

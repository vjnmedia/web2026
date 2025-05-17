
export type Language = 'en' | 'fr';

export interface Translations {
  [key: string]: {
    en: string;
    fr: string;
  };
}

const translations: Translations = {
  // Navigation
  'nav.home': {
    en: 'Home',
    fr: 'Accueil',
  },
  'nav.about': {
    en: 'About Us',
    fr: 'À Propos',
  },
  'nav.programs': {
    en: 'Programs',
    fr: 'Programmes',
  },
  'nav.careers': {
    en: 'Careers',
    fr: 'Carrières',
  },
  'nav.media': {
    en: 'Media',
    fr: 'Média',
  },
  'nav.contact': {
    en: 'Contact',
    fr: 'Contact',
  },
  'nav.donate': {
    en: 'Donate',
    fr: 'Faire un Don',
  },
  
  // Hero section
  'hero.title': {
    en: 'Strengthening youth for a better future',
    fr: 'Renforcer la jeunesse pour un avenir meilleur',
  },
  'hero.subtitle': {
    en: 'Vision Jeunesse Nouvelle is dedicated to empowering youth through various programs, fostering peace, promoting economic development, and nurturing leadership among young people.',
    fr: 'Vision Jeunesse Nouvelle se consacre à l\'autonomisation des jeunes par le biais de divers programmes, en favorisant la paix, en promouvant le développement économique et en cultivant le leadership parmi les jeunes.',
  },
  'hero.cta.join': {
    en: 'Join Us',
    fr: 'Rejoignez-nous',
  },
  'hero.cta.donate': {
    en: 'Donate',
    fr: 'Faire un don',
  },
  'hero.cta.volunteer': {
    en: 'Volunteer',
    fr: 'Bénévole',
  },
  
  // About section
  'about.title': {
    en: 'About Vision Jeunesse Nouvelle',
    fr: 'À propos de Vision Jeunesse Nouvelle',
  },
  'about.subtitle': {
    en: 'Established in 2002 by Brother Gabriel Lauzon and Father Epimaque Makuza',
    fr: 'Fondée en 2002 par Frère Gabriel Lauzon et Père Epimaque Makuza',
  },
  'about.history': {
    en: 'Our History',
    fr: 'Notre Histoire',
  },
  'about.mission': {
    en: 'Our Mission',
    fr: 'Notre Mission',
  },
  'about.vision': {
    en: 'Our Vision',
    fr: 'Notre Vision',
  },
  'about.mission.text': {
    en: 'To empower Rwandan youth by providing them with the skills, knowledge, and opportunities needed to become responsible citizens and leaders in their communities.',
    fr: 'Autonomiser les jeunes rwandais en leur fournissant les compétences, les connaissances et les opportunités nécessaires pour devenir des citoyens responsables et des leaders dans leurs communautés.',
  },
  'about.vision.text': {
    en: 'A society where all young people are empowered to reach their full potential and contribute positively to their communities and country.',
    fr: 'Une société où tous les jeunes sont habilités à atteindre leur plein potentiel et à contribuer positivement à leurs communautés et à leur pays.',
  },
  'about.history.text': {
    en: 'Vision Jeunesse Nouvelle (VJN) was established in 2002 by Brother Gabriel Lauzon and Father Epimaque Makuza to respond to the needs of Rwandan youth in the aftermath of the 1994 genocide. What began as a small initiative has grown into a comprehensive organization addressing various aspects of youth development.',
    fr: 'Vision Jeunesse Nouvelle (VJN) a été créée en 2002 par Frère Gabriel Lauzon et Père Epimaque Makuza pour répondre aux besoins de la jeunesse rwandaise au lendemain du génocide de 1994. Ce qui a commencé comme une petite initiative s\'est transformé en une organisation complète qui aborde divers aspects du développement des jeunes.',
  },
  
  // Programs section
  'programs.title': {
    en: 'Our Programs',
    fr: 'Nos Programmes',
  },
  'programs.subtitle': {
    en: 'Empowering youth through comprehensive development initiatives',
    fr: 'Autonomiser les jeunes grâce à des initiatives de développement complètes',
  },
  'programs.education': {
    en: 'Education',
    fr: 'Éducation',
  },
  'programs.economic': {
    en: 'Economic Empowerment',
    fr: 'Autonomisation Économique',
  },
  'programs.health': {
    en: 'Health Promotion',
    fr: 'Promotion de la Santé',
  },
  'programs.peace': {
    en: 'Peace Building',
    fr: 'Consolidation de la Paix',
  },
  'programs.arts': {
    en: 'Sports, Culture & Arts',
    fr: 'Sports, Culture et Arts',
  },
  'programs.education.desc': {
    en: 'Vocational training, literacy classes, and special education initiatives.',
    fr: 'Formation professionnelle, cours d\'alphabétisation et initiatives d\'éducation spéciale.',
  },
  'programs.economic.desc': {
    en: 'Entrepreneurship training, support for youth cooperatives, and financial literacy programs.',
    fr: 'Formation à l\'entrepreneuriat, soutien aux coopératives de jeunes et programmes d\'alphabétisation financière.',
  },
  'programs.health.desc': {
    en: 'Sexual and reproductive health education, HIV/AIDS awareness, and pandemic response initiatives.',
    fr: 'Éducation à la santé sexuelle et reproductive, sensibilisation au VIH/SIDA et initiatives de réponse aux pandémies.',
  },
  'programs.peace.desc': {
    en: 'Conflict resolution training, peace camps, and interfaith dialogues.',
    fr: 'Formation à la résolution des conflits, camps de paix et dialogues interreligieux.',
  },
  'programs.arts.desc': {
    en: 'Talent development in sports and arts, cultural events, and artistic expression platforms.',
    fr: 'Développement des talents dans les sports et les arts, événements culturels et plateformes d\'expression artistique.',
  },
  'programs.learnMore': {
    en: 'Learn More',
    fr: 'En Savoir Plus',
  },
  
  // Contact section
  'contact.title': {
    en: 'Contact Us',
    fr: 'Contactez-nous',
  },
  'contact.subtitle': {
    en: 'Get in touch with our team',
    fr: 'Entrez en contact avec notre équipe',
  },
  'contact.form.name': {
    en: 'Your Name',
    fr: 'Votre Nom',
  },
  'contact.form.email': {
    en: 'Your Email',
    fr: 'Votre Email',
  },
  'contact.form.message': {
    en: 'Your Message',
    fr: 'Votre Message',
  },
  'contact.form.submit': {
    en: 'Send Message',
    fr: 'Envoyer le Message',
  },
  'contact.address': {
    en: 'Address',
    fr: 'Adresse',
  },
  'contact.phone': {
    en: 'Phone',
    fr: 'Téléphone',
  },
  'contact.email': {
    en: 'Email',
    fr: 'Email',
  },
  'contact.address.value': {
    en: 'Kimironko, Kigali, Rwanda',
    fr: 'Kimironko, Kigali, Rwanda',
  },
  
  // Footer
  'footer.rights': {
    en: 'All Rights Reserved',
    fr: 'Tous Droits Réservés',
  },
  'footer.privacy': {
    en: 'Privacy Policy',
    fr: 'Politique de Confidentialité',
  },
  'footer.terms': {
    en: 'Terms of Service',
    fr: 'Conditions d\'Utilisation',
  },
};

export default translations;

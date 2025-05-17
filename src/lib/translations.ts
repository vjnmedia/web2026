
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
  'nav.services': {
    en: 'Services',
    fr: 'Services',
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
  'programs.education.fullDesc': {
    en: 'Our Education Program focuses on developing practical skills and knowledge that empower young people to secure sustainable livelihoods. We believe that education is the foundation for personal growth and community development.',
    fr: 'Notre Programme d\'Éducation se concentre sur le développement de compétences pratiques et de connaissances qui permettent aux jeunes d\'assurer des moyens de subsistance durables. Nous croyons que l\'éducation est la base de la croissance personnelle et du développement communautaire.',
  },
  'programs.economic.fullDesc': {
    en: 'The Economic Empowerment Program equips youth with entrepreneurial skills, financial literacy, and resources needed to start and grow successful businesses. We foster economic independence and innovation among young Rwandans.',
    fr: 'Le Programme d\'Autonomisation Économique dote les jeunes de compétences entrepreneuriales, d\'éducation financière et des ressources nécessaires pour créer et développer des entreprises prospères. Nous favorisons l\'indépendance économique et l\'innovation parmi les jeunes Rwandais.',
  },
  'programs.health.fullDesc': {
    en: 'Our Health Promotion Program addresses critical health issues facing Rwandan youth, providing education, resources, and support for their physical and mental well-being. We focus on preventive care and healthy lifestyle choices.',
    fr: 'Notre Programme de Promotion de la Santé aborde les problèmes de santé critiques auxquels sont confrontés les jeunes Rwandais, en fournissant éducation, ressources et soutien pour leur bien-être physique et mental. Nous nous concentrons sur les soins préventifs et les choix de vie sains.',
  },
  'programs.peace.fullDesc': {
    en: 'The Peace Building Program works to heal the wounds of the past and create a culture of peace among Rwandan youth. Through dialogue, education, and community activities, we promote understanding, reconciliation, and social cohesion.',
    fr: 'Le Programme de Consolidation de la Paix travaille à guérir les blessures du passé et à créer une culture de paix parmi les jeunes Rwandais. Par le dialogue, l\'éducation et les activités communautaires, nous promouvons la compréhension, la réconciliation et la cohésion sociale.',
  },
  'programs.arts.fullDesc': {
    en: 'Our Sports, Culture & Arts Program celebrates Rwanda's rich cultural heritage while providing outlets for creative expression and physical activity. We believe that arts and sports are powerful tools for personal development and social change.',
    fr: 'Notre Programme de Sports, Culture et Arts célèbre le riche patrimoine culturel du Rwanda tout en offrant des débouchés pour l\'expression créative et l\'activité physique. Nous croyons que les arts et les sports sont des outils puissants pour le développement personnel et le changement social.',
  },
  'programs.education.subtitle': {
    en: 'Building knowledge and skills for a brighter future',
    fr: 'Construire des connaissances et des compétences pour un avenir meilleur',
  },
  'programs.economic.subtitle': {
    en: 'Creating pathways to financial independence',
    fr: 'Créer des voies vers l\'indépendance financière',
  },
  'programs.health.subtitle': {
    en: 'Promoting wellness and healthy lifestyles',
    fr: 'Promouvoir le bien-être et les modes de vie sains',
  },
  'programs.peace.subtitle': {
    en: 'Fostering reconciliation and social harmony',
    fr: 'Favoriser la réconciliation et l\'harmonie sociale',
  },
  'programs.arts.subtitle': {
    en: 'Nurturing creativity and cultural expression',
    fr: 'Nourrir la créativité et l\'expression culturelle',
  },
  'programs.education.detail1': {
    en: 'Vocational training in carpentry, welding, tailoring, and computer skills',
    fr: 'Formation professionnelle en menuiserie, soudure, couture et informatique',
  },
  'programs.education.detail2': {
    en: 'Literacy classes for youth who missed formal education',
    fr: 'Cours d\'alphabétisation pour les jeunes qui ont manqué l\'éducation formelle',
  },
  'programs.education.detail3': {
    en: 'Special education initiatives for differently-abled youth',
    fr: 'Initiatives d\'éducation spéciale pour les jeunes handicapés',
  },
  'programs.education.detail4': {
    en: 'Scholarship programs for secondary and tertiary education',
    fr: 'Programmes de bourses pour l\'enseignement secondaire et supérieur',
  },
  'programs.education.detail5': {
    en: 'Mentorship and career guidance services',
    fr: 'Services de mentorat et d\'orientation professionnelle',
  },
  'programs.economic.detail1': {
    en: 'Business plan development and entrepreneurship training',
    fr: 'Développement de plans d\'affaires et formation à l\'entrepreneuriat',
  },
  'programs.economic.detail2': {
    en: 'Support for youth cooperatives and small business startups',
    fr: 'Soutien aux coopératives de jeunes et aux startups de petites entreprises',
  },
  'programs.economic.detail3': {
    en: 'Financial literacy and savings programs',
    fr: 'Programmes d\'alphabétisation financière et d\'épargne',
  },
  'programs.economic.detail4': {
    en: 'Market linkage and product development assistance',
    fr: 'Assistance en matière de liaison avec le marché et de développement de produits',
  },
  'programs.economic.detail5': {
    en: 'Microfinance and small grants for youth-led enterprises',
    fr: 'Microfinance et petites subventions pour les entreprises dirigées par des jeunes',
  },
  'programs.health.detail1': {
    en: 'Sexual and reproductive health education',
    fr: 'Éducation à la santé sexuelle et reproductive',
  },
  'programs.health.detail2': {
    en: 'HIV/AIDS awareness and prevention programs',
    fr: 'Programmes de sensibilisation et de prévention du VIH/SIDA',
  },
  'programs.health.detail3': {
    en: 'Mental health support and trauma counseling',
    fr: 'Soutien en santé mentale et conseil en traumatologie',
  },
  'programs.health.detail4': {
    en: 'Nutrition and physical wellness initiatives',
    fr: 'Initiatives en nutrition et bien-être physique',
  },
  'programs.health.detail5': {
    en: 'Pandemic preparedness and response training',
    fr: 'Formation à la préparation et à la réponse aux pandémies',
  },
  'programs.peace.detail1': {
    en: 'Conflict resolution and mediation training',
    fr: 'Formation à la résolution des conflits et à la médiation',
  },
  'programs.peace.detail2': {
    en: 'Peace camps bringing together youth from diverse backgrounds',
    fr: 'Camps de paix rassemblant des jeunes de milieux divers',
  },
  'programs.peace.detail3': {
    en: 'Interfaith dialogue and cultural exchange programs',
    fr: 'Programmes de dialogue interreligieux et d\'échange culturel',
  },
  'programs.peace.detail4': {
    en: 'Genocide memory and reconciliation initiatives',
    fr: 'Initiatives de mémoire et de réconciliation du génocide',
  },
  'programs.peace.detail5': {
    en: 'Community service and social cohesion activities',
    fr: 'Activités de service communautaire et de cohésion sociale',
  },
  'programs.arts.detail1': {
    en: 'Sports training and competitions in football, basketball, and volleyball',
    fr: 'Entraînement sportif et compétitions en football, basketball et volleyball',
  },
  'programs.arts.detail2': {
    en: 'Traditional dance and music preservation',
    fr: 'Préservation de la danse traditionnelle et de la musique',
  },
  'programs.arts.detail3': {
    en: 'Visual arts and crafts workshops',
    fr: 'Ateliers d\'arts visuels et d\'artisanat',
  },
  'programs.arts.detail4': {
    en: 'Theater and drama for social change',
    fr: 'Théâtre et drame pour le changement social',
  },
  'programs.arts.detail5': {
    en: 'Cultural festivals and community celebrations',
    fr: 'Festivals culturels et célébrations communautaires',
  },
  'programs.learnMore': {
    en: 'Learn More',
    fr: 'En Savoir Plus',
  },
  'programs.backToAll': {
    en: 'Back to All Programs',
    fr: 'Retour à Tous les Programmes',
  },
  'programs.whatWeOffer': {
    en: 'What We Offer',
    fr: 'Ce Que Nous Offrons',
  },
  'programs.impactStories': {
    en: 'Impact Stories',
    fr: 'Histoires d\'Impact',
  },
  'programs.impactStoriesText': {
    en: 'Through our programs, we have witnessed remarkable transformations in the lives of Rwandan youth. From acquiring new skills to starting successful businesses, our participants have demonstrated resilience, innovation, and a commitment to building a better Rwanda.',
    fr: 'Grâce à nos programmes, nous avons été témoins de transformations remarquables dans la vie des jeunes Rwandais. De l\'acquisition de nouvelles compétences à la création d\'entreprises prospères, nos participants ont démontré résilience, innovation et engagement à construire un Rwanda meilleur.',
  },
  'programs.getInvolved': {
    en: 'Get Involved',
    fr: 'S\'Impliquer',
  },
  'programs.getInvolvedText': {
    en: 'There are many ways you can support our programs and make a difference in the lives of Rwandan youth. Whether through volunteering, donating, or partnering with us, your contribution helps create a brighter future for young people.',
    fr: 'Il existe de nombreuses façons de soutenir nos programmes et de faire une différence dans la vie des jeunes Rwandais. Que ce soit par le bénévolat, les dons ou un partenariat avec nous, votre contribution aide à créer un avenir meilleur pour les jeunes.',
  },
  'programs.volunteer': {
    en: 'Volunteer With Us',
    fr: 'Faire du Bénévolat',
  },
  'programs.donate': {
    en: 'Make a Donation',
    fr: 'Faire un Don',
  },
  'programs.contactUs': {
    en: 'Contact Us',
    fr: 'Contactez-Nous',
  },
  'programs.relatedPrograms': {
    en: 'Explore Our Other Programs',
    fr: 'Explorez Nos Autres Programmes',
  },
  'programs.relatedProgramsText': {
    en: 'At Vision Jeunesse Nouvelle, we offer a range of programs designed to address the diverse needs of Rwandan youth. Discover our other initiatives and how they work together to create lasting change.',
    fr: 'À Vision Jeunesse Nouvelle, nous proposons une gamme de programmes conçus pour répondre aux divers besoins des jeunes Rwandais. Découvrez nos autres initiatives et comment elles fonctionnent ensemble pour créer un changement durable.',
  },
  'programs.viewAllPrograms': {
    en: 'View All Programs',
    fr: 'Voir Tous les Programmes',
  },
  
  // Services section
  'services.title': {
    en: 'Our Services',
    fr: 'Nos Services',
  },
  'services.subtitle': {
    en: 'Comprehensive solutions for youth and community development',
    fr: 'Solutions complètes pour le développement de la jeunesse et de la communauté',
  },
  'services.whatWeOffer': {
    en: 'Services We Provide',
    fr: 'Services Que Nous Fournissons',
  },
  'services.whatWeOfferText': {
    en: 'Vision Jeunesse Nouvelle offers a range of professional services designed to support youth development, community growth, and organizational capacity building.',
    fr: 'Vision Jeunesse Nouvelle offre une gamme de services professionnels conçus pour soutenir le développement des jeunes, la croissance communautaire et le renforcement des capacités organisationnelles.',
  },
  'services.youthDevelopment': {
    en: 'Youth Development',
    fr: 'Développement des Jeunes',
  },
  'services.youthDevelopment.desc': {
    en: 'Comprehensive programs and services designed to help young people develop the skills, knowledge, and attitudes they need to become productive adults.',
    fr: 'Programmes et services complets conçus pour aider les jeunes à développer les compétences, les connaissances et les attitudes dont ils ont besoin pour devenir des adultes productifs.',
  },
  'services.youthDevelopment.offering1.title': {
    en: 'Leadership Training',
    fr: 'Formation au Leadership',
  },
  'services.youthDevelopment.offering1.desc': {
    en: 'Workshops and courses to develop strong leadership skills among youth.',
    fr: 'Ateliers et cours pour développer de solides compétences en leadership parmi les jeunes.',
  },
  'services.youthDevelopment.offering2.title': {
    en: 'Mentorship Programs',
    fr: 'Programmes de Mentorat',
  },
  'services.youthDevelopment.offering2.desc': {
    en: 'Connecting youth with experienced mentors for guidance and support.',
    fr: 'Connecter les jeunes avec des mentors expérimentés pour orientation et soutien.',
  },
  'services.youthDevelopment.offering3.title': {
    en: 'Skills Assessment',
    fr: 'Évaluation des Compétences',
  },
  'services.youthDevelopment.offering3.desc': {
    en: 'Identifying strengths and growth areas to create personalized development plans.',
    fr: 'Identifier les forces et les domaines de croissance pour créer des plans de développement personnalisés.',
  },
  'services.communityPrograms': {
    en: 'Community Programs',
    fr: 'Programmes Communautaires',
  },
  'services.communityPrograms.desc': {
    en: 'Initiatives that strengthen communities by promoting collaboration, addressing local challenges, and building capacity for sustainable development.',
    fr: 'Initiatives qui renforcent les communautés en favorisant la collaboration, en relevant les défis locaux et en renforçant les capacités pour un développement durable.',
  },
  'services.communityPrograms.offering1.title': {
    en: 'Community Assessments',
    fr: 'Évaluations Communautaires',
  },
  'services.communityPrograms.offering1.desc': {
    en: 'Research and analysis to identify community needs and resources.',
    fr: 'Recherche et analyse pour identifier les besoins et les ressources de la communauté.',
  },
  'services.communityPrograms.offering2.title': {
    en: 'Group Facilitation',
    fr: 'Facilitation de Groupe',
  },
  'services.communityPrograms.offering2.desc': {
    en: 'Professional facilitation for community meetings and collaborative projects.',
    fr: 'Facilitation professionnelle pour les réunions communautaires et les projets collaboratifs.',
  },
  'services.communityPrograms.offering3.title': {
    en: 'Capacity Building',
    fr: 'Renforcement des Capacités',
  },
  'services.communityPrograms.offering3.desc': {
    en: 'Training local leaders and organizations to address community challenges.',
    fr: 'Former les leaders locaux et les organisations à relever les défis communautaires.',
  },
  'services.educationResources': {
    en: 'Education Resources',
    fr: 'Ressources Éducatives',
  },
  'services.educationResources.desc': {
    en: 'Educational materials, training opportunities, and resources designed to support both formal and informal learning environments.',
    fr: 'Matériel éducatif, opportunités de formation et ressources conçus pour soutenir les environnements d\'apprentissage formels et informels.',
  },
  'services.educationResources.offering1.title': {
    en: 'Curriculum Development',
    fr: 'Développement de Programmes',
  },
  'services.educationResources.offering1.desc': {
    en: 'Creating tailored educational materials for various learning needs and contexts.',
    fr: 'Création de matériels éducatifs adaptés à divers besoins et contextes d\'apprentissage.',
  },
  'services.educationResources.offering2.title': {
    en: 'Teacher Training',
    fr: 'Formation des Enseignants',
  },
  'services.educationResources.offering2.desc': {
    en: 'Workshops to enhance teaching skills and methodologies.',
    fr: 'Ateliers pour améliorer les compétences et les méthodologies d\'enseignement.',
  },
  'services.educationResources.offering3.title': {
    en: 'Learning Materials',
    fr: 'Matériels d\'Apprentissage',
  },
  'services.educationResources.offering3.desc': {
    en: 'Access to books, digital resources, and learning tools.',
    fr: 'Accès aux livres, ressources numériques et outils d\'apprentissage.',
  },
  'services.consultation': {
    en: 'Consultation Services',
    fr: 'Services de Consultation',
  },
  'services.consultation.desc': {
    en: 'Professional advice and expertise to help organizations develop strategies, evaluate programs, and implement best practices.',
    fr: 'Conseils professionnels et expertise pour aider les organisations à développer des stratégies, évaluer des programmes et mettre en œuvre les meilleures pratiques.',
  },
  'services.consultation.offering1.title': {
    en: 'Program Evaluation',
    fr: 'Évaluation de Programmes',
  },
  'services.consultation.offering1.desc': {
    en: 'Assessment of program effectiveness and impact using proven methodologies.',
    fr: 'Évaluation de l\'efficacité et de l\'impact des programmes à l\'aide de méthodologies éprouvées.',
  },
  'services.consultation.offering2.title': {
    en: 'Strategic Planning',
    fr: 'Planification Stratégique',
  },
  'services.consultation.offering2.desc': {
    en: 'Guidance in developing clear, actionable organizational strategies.',
    fr: 'Orientation dans l\'élaboration de stratégies organisationnelles claires et réalisables.',
  },
  'services.consultation.offering3.title': {
    en: 'Grant Writing',
    fr: 'Rédaction de Subventions',
  },
  'services.consultation.offering3.desc': {
    en: 'Support in developing compelling funding proposals and applications.',
    fr: 'Soutien dans l\'élaboration de propositions de financement et de demandes convaincantes.',
  },
  'services.learnMore': {
    en: 'Learn More About This Service',
    fr: 'En Savoir Plus Sur Ce Service',
  },
  'services.requestInfo': {
    en: 'Request Information',
    fr: 'Demander des Informations',
  },
  'services.requestInfoText': {
    en: 'Interested in learning more about our services? Contact us to discuss how we can support your organization or community initiative.',
    fr: 'Intéressé à en savoir plus sur nos services? Contactez-nous pour discuter de la façon dont nous pouvons soutenir votre organisation ou votre initiative communautaire.',
  },
  'services.faqTitle': {
    en: 'Frequently Asked Questions',
    fr: 'Questions Fréquemment Posées',
  },
  'services.faqSubtitle': {
    en: 'Find answers to commonly asked questions about our services and how we work with clients and communities.',
    fr: 'Trouvez des réponses aux questions fréquemment posées sur nos services et notre façon de travailler avec les clients et les communautés.',
  },
  'services.faq1.question': {
    en: 'How do you determine the fees for your services?',
    fr: 'Comment déterminez-vous les frais pour vos services?',
  },
  'services.faq1.answer': {
    en: 'Our fees are based on the scope of work, complexity, duration, and resources required. We offer flexible pricing structures including sliding scales for organizations with limited resources. Contact us for a customized quote.',
    fr: 'Nos frais sont basés sur l\'étendue du travail, la complexité, la durée et les ressources requises. Nous offrons des structures de prix flexibles, y compris des échelles mobiles pour les organisations aux ressources limitées. Contactez-nous pour un devis personnalisé.',
  },
  'services.faq2.question': {
    en: 'Do you work with government agencies and international organizations?',
    fr: 'Travaillez-vous avec des agences gouvernementales et des organisations internationales?',
  },
  'services.faq2.answer': {
    en: 'Yes, we collaborate with a wide range of partners including government entities, international NGOs, and multinational organizations. We have experience adapting our services to meet the unique requirements of these partnerships.',
    fr: 'Oui, nous collaborons avec un large éventail de partenaires, y compris des entités gouvernementales, des ONG internationales et des organisations multinationales. Nous avons l\'expérience d\'adapter nos services pour répondre aux exigences uniques de ces partenariats.',
  },
  'services.faq3.question': {
    en: 'Can you customize your services for our specific needs?',
    fr: 'Pouvez-vous personnaliser vos services pour nos besoins spécifiques?',
  },
  'services.faq3.answer': {
    en: 'Absolutely. We believe in tailoring our approach to address the unique challenges and goals of each client. Our team works closely with you to understand your needs and develop customized solutions.',
    fr: 'Absolument. Nous croyons en l\'adaptation de notre approche pour répondre aux défis et objectifs uniques de chaque client. Notre équipe travaille en étroite collaboration avec vous pour comprendre vos besoins et développer des solutions personnalisées.',
  },
  'services.faq4.question': {
    en: 'What geographic areas do you serve?',
    fr: 'Quelles zones géographiques desservez-vous?',
  },
  'services.faq4.answer': {
    en: 'While our primary focus is Rwanda, we also work throughout the Great Lakes region of Africa. For certain services, we can provide remote support to organizations worldwide.',
    fr: 'Bien que notre objectif principal soit le Rwanda, nous travaillons également dans toute la région des Grands Lacs d\'Afrique. Pour certains services, nous pouvons fournir un soutien à distance aux organisations du monde entier.',
  },
  'services.faq5.question': {
    en: 'How do you measure the success of your services?',
    fr: 'Comment mesurez-vous le succès de vos services?',
  },
  'services.faq5.answer': {
    en: 'We establish clear metrics and evaluation frameworks at the beginning of each engagement. Throughout the project, we conduct regular assessments and provide detailed reports on progress and outcomes. We value transparency and work collaboratively with clients to ensure expectations are met.',
    fr: 'Nous établissons des métriques claires et des cadres d\'évaluation au début de chaque engagement. Tout au long du projet, nous effectuons des évaluations régulières et fournissons des rapports détaillés sur les progrès et les résultats. Nous valorisons la transparence et travaillons en collaboration avec les clients pour nous assurer que les attentes sont satisfaites.',
  },
  'services.startToday': {
    en: 'Ready to Get Started?',
    fr: 'Prêt à Commencer?',
  },
  'services.startTodayText': {
    en: 'Contact our team to discuss how our services can support your organization\'s goals and make a positive impact in your community.',
    fr: 'Contactez notre équipe pour discuter de la façon dont nos services peuvent soutenir les objectifs de votre organisation et avoir un impact positif dans votre communauté.',
  },
  'services.contactUs': {
    en: 'Contact Our Team',
    fr: 'Contacter Notre Équipe',
  },
  'services.explorePrograms': {
    en: 'Explore Our Programs',
    fr: 'Explorer Nos Programmes',
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

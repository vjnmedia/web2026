export type Language = 'en' | 'fr';

const translations = {
  'hero.title': {
    en: 'Empowering Rwandan Youth, Building a Brighter Future',
    fr: 'Autonomiser la jeunesse rwandaise, construire un avenir meilleur',
  },
  'hero.subtitle': {
    en: 'Join us in creating opportunities for education, economic empowerment, and peace.',
    fr: 'Rejoignez-nous pour créer des opportunités d\'éducation, d\'autonomisation économique et de paix.',
  },
  'hero.cta.join': {
    en: 'Join Us',
    fr: 'Rejoignez-nous',
  },
  'hero.cta.donate': {
    en: 'Donate',
    fr: 'Faire un don',
  },
  'programs.title': {
    en: 'Our Programs',
    fr: 'Nos programmes',
  },
  'programs.subtitle': {
    en: 'We focus on key areas to drive sustainable change and improve the lives of Rwandan youth.',
    fr: 'Nous nous concentrons sur des domaines clés pour impulser un changement durable et améliorer la vie des jeunes Rwandais.',
  },
  'programs.education': {
    en: 'Education',
    fr: 'Éducation',
  },
  'programs.education.desc': {
    en: 'Providing access to quality education and vocational training.',
    fr: 'Fournir un accès à une éducation de qualité et à une formation professionnelle.',
  },
  'programs.economic': {
    en: 'Economic Empowerment',
    fr: 'Autonomisation économique',
  },
  'programs.economic.desc': {
    en: 'Supporting entrepreneurship and creating economic opportunities for youth.',
    fr: 'Soutenir l\'entrepreneuriat et créer des opportunités économiques pour les jeunes.',
  },
  'programs.health': {
    en: 'Health & Well-being',
    fr: 'Santé et bien-être',
  },
  'programs.health.desc': {
    en: 'Promoting health awareness and providing access to healthcare services.',
    fr: 'Promouvoir la sensibilisation à la santé et fournir un accès aux services de santé.',
  },
  'programs.peace': {
    en: 'Peace Building',
    fr: 'Consolidation de la paix',
  },
  'programs.peace.desc': {
    en: 'Fostering peace and reconciliation through dialogue and community initiatives.',
    fr: 'Promouvoir la paix et la réconciliation par le dialogue et les initiatives communautaires.',
  },
  'programs.arts': {
    en: 'Arts & Culture',
    fr: 'Arts et culture',
  },
  'programs.arts.desc': {
    en: 'Celebrating Rwandan culture and providing platforms for artistic expression.',
    fr: 'Célébrer la culture rwandaise et offrir des plateformes d\'expression artistique.',
  },
  'about.title': {
    en: 'About VJN Rwanda',
    fr: 'À propos de VJN Rwanda',
  },
  'about.subtitle': {
    en: 'Vision Jeunesse Nouvelle (VJN) is a youth-led organization dedicated to empowering Rwandan youth through sustainable programs.',
    fr: 'Vision Jeunesse Nouvelle (VJN) est une organisation dirigée par des jeunes et dédiée à l\'autonomisation de la jeunesse rwandaise par le biais de programmes durables.',
  },
  'about.history': {
    en: 'Our History',
    fr: 'Notre histoire',
  },
  'about.history.text': {
    en: 'Founded in 2010, VJN Rwanda has been at the forefront of youth development, impacting thousands of lives across the country.',
    fr: 'Fondée en 2010, VJN Rwanda est à l\'avant-garde du développement de la jeunesse, ayant un impact sur des milliers de vies à travers le pays.',
  },
  'about.mission': {
    en: 'Our Mission',
    fr: 'Notre mission',
  },
  'contact.title': {
    en: 'Get In Touch',
    fr: 'Contactez-nous',
  },
  'contact.subtitle': {
    en: 'Have questions or want to get involved? Reach out to us today!',
    fr: 'Vous avez des questions ou souhaitez vous impliquer ? Contactez-nous dès aujourd\'hui !',
  },
  'contact.form.name': {
    en: 'Your Name',
    fr: 'Votre nom',
  },
  'contact.form.email': {
    en: 'Your Email',
    fr: 'Votre email',
  },
  'contact.form.message': {
    en: 'Message',
    fr: 'Message',
  },
  'contact.form.submit': {
    en: 'Send Message',
    fr: 'Envoyer le message',
  },
  'footer.copyright': {
    en: '© 2023 VJN Rwanda. All rights reserved.',
    fr: '© 2023 VJN Rwanda. Tous droits réservés.',
  },
  'dashboard.title': {
    en: 'Data Management System',
    fr: 'Système de Gestion des Données'
  },
  'dashboard.tableTitle': {
    en: 'Title',
    fr: 'Titre'
  },
  'dashboard.projects': {
    en: 'Projects',
    fr: 'Projets'
  },
  'dashboard.youth': {
    en: 'Youth Talents',
    fr: 'Jeunes Talents'
  },
  'dashboard.teams': {
    en: 'Teams',
    fr: 'Équipes'
  },
  'dashboard.blog': {
    en: 'Blog',
    fr: 'Blog'
  },
  'dashboard.social': {
    en: 'Social Media',
    fr: 'Médias Sociaux'
  },
  'dashboard.events': {
    en: 'Events',
    fr: 'Événements'
  },
  'dashboard.locations': {
    en: 'Locations',
    fr: 'Lieux'
  },
  'dashboard.projectsManagement': {
    en: 'Projects Management',
    fr: 'Gestion des Projets'
  },
  'dashboard.addProject': {
    en: 'Add Project',
    fr: 'Ajouter un Projet'
  },
  'dashboard.searchProjects': {
    en: 'Search Projects',
    fr: 'Rechercher des Projets'
  },
  'dashboard.projectName': {
    en: 'Project Name',
    fr: 'Nom du Projet'
  },
  'dashboard.status': {
    en: 'Status',
    fr: 'Statut'
  },
  'dashboard.startDate': {
    en: 'Start Date',
    fr: 'Date de Début'
  },
  'dashboard.endDate': {
    en: 'End Date',
    fr: 'Date de Fin'
  },
  'dashboard.actions': {
    en: 'Actions',
    fr: 'Actions'
  },
  'dashboard.noProjects': {
    en: 'No projects found',
    fr: 'Aucun projet trouvé'
  },
  'dashboard.youthTalentsManagement': {
    en: 'Youth Talents Management',
    fr: 'Gestion des Jeunes Talents'
  },
  'dashboard.addYouth': {
    en: 'Add Youth',
    fr: 'Ajouter un Jeune'
  },
  'dashboard.searchYouth': {
    en: 'Search Youth',
    fr: 'Rechercher des Jeunes'
  },
  'dashboard.name': {
    en: 'Name',
    fr: 'Nom'
  },
  'dashboard.age': {
    en: 'Age',
    fr: 'Âge'
  },
  'dashboard.talent': {
    en: 'Talent',
    fr: 'Talent'
  },
  'dashboard.program': {
    en: 'Program',
    fr: 'Programme'
  },
  'dashboard.joinedDate': {
    en: 'Joined Date',
    fr: 'Date d\'Adhésion'
  },
  'dashboard.noYouth': {
    en: 'No youth talents found',
    fr: 'Aucun jeune talent trouvé'
  },
  'dashboard.teamsManagement': {
    en: 'Teams Management',
    fr: 'Gestion des Équipes'
  },
  'dashboard.addTeam': {
    en: 'Add Team',
    fr: 'Ajouter une Équipe'
  },
  'dashboard.searchTeams': {
    en: 'Search Teams',
    fr: 'Rechercher des Équipes'
  },
  'dashboard.teamName': {
    en: 'Team Name',
    fr: 'Nom de l\'Équipe'
  },
  'dashboard.sport': {
    en: 'Sport',
    fr: 'Sport'
  },
  'dashboard.members': {
    en: 'Members',
    fr: 'Membres'
  },
  'dashboard.coach': {
    en: 'Coach',
    fr: 'Entraîneur'
  },
  'dashboard.founded': {
    en: 'Founded',
    fr: 'Fondée'
  },
  'dashboard.noTeams': {
    en: 'No teams found',
    fr: 'Aucune équipe trouvée'
  },
  'dashboard.blogManagement': {
    en: 'Blog Management',
    fr: 'Gestion du Blog'
  },
  'dashboard.addPost': {
    en: 'Add Post',
    fr: 'Ajouter un Article'
  },
  'dashboard.searchPosts': {
    en: 'Search Posts',
    fr: 'Rechercher des Articles'
  },
  'dashboard.category': {
    en: 'Category',
    fr: 'Catégorie'
  },
  'dashboard.author': {
    en: 'Author',
    fr: 'Auteur'
  },
  'dashboard.date': {
    en: 'Date',
    fr: 'Date'
  },
  'dashboard.noPosts': {
    en: 'No blog posts found',
    fr: 'Aucun article de blog trouvé'
  },
  'dashboard.socialMediaManagement': {
    en: 'Social Media Management',
    fr: 'Gestion des Médias Sociaux'
  },
  'dashboard.addSocialPost': {
    en: 'Add Social Post',
    fr: 'Ajouter une Publication'
  },
  'dashboard.searchSocialPosts': {
    en: 'Search Social Posts',
    fr: 'Rechercher des Publications'
  },
  'dashboard.platform': {
    en: 'Platform',
    fr: 'Plateforme'
  },
  'dashboard.content': {
    en: 'Content',
    fr: 'Contenu'
  },
  'dashboard.scheduledDate': {
    en: 'Scheduled Date',
    fr: 'Date Planifiée'
  },
  'dashboard.allPlatforms': {
    en: 'All Platforms',
    fr: 'Toutes les Plateformes'
  },
  'dashboard.noSocialPosts': {
    en: 'No social media posts found',
    fr: 'Aucune publication sur les médias sociaux trouvée'
  },
  'dashboard.eventsManagement': {
    en: 'Events Management',
    fr: 'Gestion des Événements'
  },
  'dashboard.addEvent': {
    en: 'Add Event',
    fr: 'Ajouter un Événement'
  },
  'dashboard.searchEvents': {
    en: 'Search Events',
    fr: 'Rechercher des Événements'
  },
  'dashboard.eventName': {
    en: 'Event Name',
    fr: 'Nom de l\'Événement'
  },
  'dashboard.location': {
    en: 'Location',
    fr: 'Lieu'
  },
  'dashboard.attendees': {
    en: 'Attendees',
    fr: 'Participants'
  },
  'dashboard.noEvents': {
    en: 'No events found',
    fr: 'Aucun événement trouvé'
  },
  'dashboard.upcomingEvents': {
    en: 'Upcoming Events',
    fr: 'Événements à Venir'
  },
  'dashboard.expectedAttendees': {
    en: 'Expected Attendees',
    fr: 'Participants Attendus'
  },
  'dashboard.viewDetails': {
    en: 'View Details',
    fr: 'Voir les Détails'
  },
  'dashboard.locationsManagement': {
    en: 'Locations Management',
    fr: 'Gestion des Lieux'
  },
  'dashboard.addLocation': {
    en: 'Add Location',
    fr: 'Ajouter un Lieu'
  },
  'dashboard.searchLocations': {
    en: 'Search Locations',
    fr: 'Rechercher des Lieux'
  },
  'dashboard.locationName': {
    en: 'Location Name',
    fr: 'Nom du Lieu'
  },
  'dashboard.address': {
    en: 'Address',
    fr: 'Adresse'
  },
  'dashboard.type': {
    en: 'Type',
    fr: 'Type'
  },
  'dashboard.services': {
    en: 'Services',
    fr: 'Services'
  },
  'dashboard.noLocations': {
    en: 'No locations found',
    fr: 'Aucun lieu trouvé'
  },
  'dashboard.locationMap': {
    en: 'Location Map',
    fr: 'Carte des Lieux'
  },
  'dashboard.mapPlaceholder': {
    en: 'Map integration coming soon!',
    fr: 'Intégration de la carte bientôt disponible !'
  },
  'dashboard.mapIntegration': {
    en: 'We are working on integrating map functionality to display locations.',
    fr: 'Nous travaillons à l\'intégration de la fonctionnalité de carte pour afficher les lieux.'
  },
  'dashboard.addProjectDescription': {
    en: 'Create a new project by filling out the form below.',
    fr: 'Créez un nouveau projet en remplissant le formulaire ci-dessous.'
  },
  'dashboard.allFieldsRequired': {
    en: 'All fields are required',
    fr: 'Tous les champs sont obligatoires'
  },
  'dashboard.close': {
    en: 'Close',
    fr: 'Fermer'
  },
  'dashboard.cancel': {
    en: 'Cancel',
    fr: 'Annuler'
  },
  'dashboard.save': {
    en: 'Save',
    fr: 'Enregistrer'
  },
  'dashboard.delete': {
    en: 'Delete',
    fr: 'Supprimer'
  },
  'dashboard.confirmDelete': {
    en: 'Confirm Deletion',
    fr: 'Confirmer la Suppression'
  },
  'dashboard.deleteProjectConfirmation': {
    en: 'Are you sure you want to delete this project? This action cannot be undone.',
    fr: 'Êtes-vous sûr de vouloir supprimer ce projet ? Cette action ne peut pas être annulée.'
  },
  'dashboard.projectAdded': {
    en: 'Project added successfully',
    fr: 'Projet ajouté avec succès'
  },
  'dashboard.projectUpdated': {
    en: 'Project updated successfully',
    fr: 'Projet mis à jour avec succès'
  },
  'dashboard.projectDeleted': {
    en: 'Project deleted successfully',
    fr: 'Projet supprimé avec succès'
  },
  'dashboard.editProject': {
    en: 'Edit Project',
    fr: 'Modifier le Projet'
  },
  'dashboard.selectStatus': {
    en: 'Select status',
    fr: 'Sélectionner le statut'
  },
  'dashboard.addYouthDescription': {
    en: 'Add a new youth talent by filling out the form below.',
    fr: 'Ajoutez un nouveau talent jeunesse en remplissant le formulaire ci-dessous.'
  },
  'dashboard.viewYouthDetails': {
    en: 'Youth Talent Details',
    fr: 'Détails du Talent Jeunesse'
  },
  'dashboard.editYouth': {
    en: 'Edit Youth Talent',
    fr: 'Modifier le Talent Jeunesse'
  },
  'dashboard.deleteYouthConfirmation': {
    en: 'Are you sure you want to delete this youth talent? This action cannot be undone.',
    fr: 'Êtes-vous sûr de vouloir supprimer ce talent jeunesse ? Cette action ne peut pas être annulée.'
  },
  'dashboard.youthAdded': {
    en: 'Youth talent added successfully',
    fr: 'Talent jeunesse ajouté avec succès'
  },
  'dashboard.youthUpdated': {
    en: 'Youth talent updated successfully',
    fr: 'Talent jeunesse mis à jour avec succès'
  },
  'dashboard.youthDeleted': {
    en: 'Youth talent deleted successfully',
    fr: 'Talent jeunesse supprimé avec succès'
  },
  'dashboard.selectProgram': {
    en: 'Select program',
    fr: 'Sélectionner le programme'
  },
  'dashboard.addTeamDescription': {
    en: 'Create a new sports team by filling out the form below.',
    fr: 'Créez une nouvelle équipe sportive en remplissant le formulaire ci-dessous.'
  },
  'dashboard.teamMembers': {
    en: 'Team Members',
    fr: 'Membres de l\'Équipe'
  },
  'dashboard.position': {
    en: 'Position',
    fr: 'Poste'
  },
  'dashboard.editTeam': {
    en: 'Edit Team',
    fr: 'Modifier l\'Équipe'
  },
  'dashboard.deleteTeamConfirmation': {
    en: 'Are you sure you want to delete this team? This action cannot be undone.',
    fr: 'Êtes-vous sûr de vouloir supprimer cette équipe ? Cette action ne peut pas être annulée.'
  },
  'dashboard.teamAdded': {
    en: 'Team added successfully',
    fr: 'Équipe ajoutée avec succès'
  },
  'dashboard.teamUpdated': {
    en: 'Team updated successfully',
    fr: 'Équipe mise à jour avec succès'
  },
  'dashboard.teamDeleted': {
    en: 'Team deleted successfully',
    fr: 'Équipe supprimée avec succès'
  },
  'dashboard.noMembersFound': {
    en: 'No team members found',
    fr: 'Aucun membre d\'équipe trouvé'
  }
}

export default translations;

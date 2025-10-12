// Browser console script to add slider data
// Copy and paste this into your browser console on the admin dashboard page

const sliderData = [
  {
    title: 'Vision Jeunesse Nouvelle',
    description: 'Empowering Youth for a Better Future',
    image: '/images/home-slider/youth.JPG',
    order_index: 1,
    is_active: true,
    language: 'en'
  },
  {
    title: 'Education & Development',
    description: 'Building tomorrow\'s leaders through quality education and skills training',
    image: '/images/home-slider/educ.JPG',
    order_index: 2,
    is_active: true,
    language: 'en'
  },
  {
    title: 'Peace & Community',
    description: 'Creating positive change in communities across Rwanda',
    image: '/images/home-slider/peace.jpg',
    order_index: 3,
    is_active: true,
    language: 'en'
  },
  {
    title: 'Youth Empowerment',
    description: 'Inspiring young people to reach their full potential',
    image: '/images/home-slider/youth2.JPG',
    order_index: 4,
    is_active: true,
    language: 'en'
  },
  {
    title: 'Economic Development',
    description: 'Supporting economic growth and entrepreneurship',
    image: '/images/home-slider/economic.jpg',
    order_index: 5,
    is_active: true,
    language: 'en'
  },
  {
    title: 'Vision Jeunesse Nouvelle',
    description: 'Autonomiser les jeunes pour un avenir meilleur',
    image: '/images/home-slider/youth.JPG',
    order_index: 1,
    is_active: true,
    language: 'fr'
  },
  {
    title: 'Éducation et Développement',
    description: 'Construire les leaders de demain grâce à une éducation de qualité et à la formation professionnelle',
    image: '/images/home-slider/educ.JPG',
    order_index: 2,
    is_active: true,
    language: 'fr'
  },
  {
    title: 'Paix et Communauté',
    description: 'Créer un changement positif dans les communautés à travers le Rwanda',
    image: '/images/home-slider/peace.jpg',
    order_index: 3,
    is_active: true,
    language: 'fr'
  },
  {
    title: 'Autonomisation des Jeunes',
    description: 'Inspirer les jeunes à atteindre leur plein potentiel',
    image: '/images/home-slider/youth2.JPG',
    order_index: 4,
    is_active: true,
    language: 'fr'
  },
  {
    title: 'Développement Économique',
    description: 'Soutenir la croissance économique et l\'entrepreneuriat',
    image: '/images/home-slider/economic.jpg',
    order_index: 5,
    is_active: true,
    language: 'fr'
  }
];

// Function to add slider data
async function addSliderData() {
  try {
    console.log('Starting to add slider data...');
    
    // Import the slider service (assuming it's available globally or you can import it)
    const { sliderService } = await import('/src/services/sliderService.ts');
    
    for (const slide of sliderData) {
      try {
        await sliderService.createSlider(slide);
        console.log(`Added slide: ${slide.title}`);
      } catch (error) {
        console.error(`Error adding slide ${slide.title}:`, error);
      }
    }
    
    console.log('Finished adding slider data!');
  } catch (error) {
    console.error('Error:', error);
  }
}

// Run the function
addSliderData();

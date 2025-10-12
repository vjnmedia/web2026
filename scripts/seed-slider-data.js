// Script to seed slider data
// Run this script to add sample slider data to your database

const { createClient } = require('@supabase/supabase-js');

// You'll need to replace these with your actual Supabase credentials
const supabaseUrl = process.env.VITE_SUPABASE_URL || 'your-supabase-url';
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY || 'your-supabase-anon-key';

const supabase = createClient(supabaseUrl, supabaseKey);

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

async function seedSliderData() {
  try {
    console.log('Starting to seed slider data...');
    
    // First, check if data already exists
    const { data: existingData, error: checkError } = await supabase
      .from('slider')
      .select('id')
      .limit(1);
    
    if (checkError) {
      console.error('Error checking existing data:', checkError);
      return;
    }
    
    if (existingData && existingData.length > 0) {
      console.log('Slider data already exists. Skipping seed.');
      return;
    }
    
    // Insert the data
    const { data, error } = await supabase
      .from('slider')
      .insert(sliderData);
    
    if (error) {
      console.error('Error inserting slider data:', error);
      return;
    }
    
    console.log('Successfully seeded slider data!');
    console.log('Inserted', sliderData.length, 'slider items');
    
  } catch (error) {
    console.error('Unexpected error:', error);
  }
}

// Run the seed function
seedSliderData();

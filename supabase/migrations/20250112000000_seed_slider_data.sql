-- Seed slider data for homepage
INSERT INTO slider (title, description, image, order_index, is_active, language) VALUES
('Vision Jeunesse Nouvelle', 'Empowering Youth for a Better Future', '/images/home-slider/youth.JPG', 1, true, 'en'),
('Education & Development', 'Building tomorrow''s leaders through quality education and skills training', '/images/home-slider/educ.JPG', 2, true, 'en'),
('Peace & Community', 'Creating positive change in communities across Rwanda', '/images/home-slider/peace.jpg', 3, true, 'en'),
('Youth Empowerment', 'Inspiring young people to reach their full potential', '/images/home-slider/youth2.JPG', 4, true, 'en'),
('Economic Development', 'Supporting economic growth and entrepreneurship', '/images/home-slider/economic.jpg', 5, true, 'en'),
('Vision Jeunesse Nouvelle', 'Autonomiser les jeunes pour un avenir meilleur', '/images/home-slider/youth.JPG', 1, true, 'fr'),
('Éducation et Développement', 'Construire les leaders de demain grâce à une éducation de qualité et à la formation professionnelle', '/images/home-slider/educ.JPG', 2, true, 'fr'),
('Paix et Communauté', 'Créer un changement positif dans les communautés à travers le Rwanda', '/images/home-slider/peace.jpg', 3, true, 'fr'),
('Autonomisation des Jeunes', 'Inspirer les jeunes à atteindre leur plein potentiel', '/images/home-slider/youth2.JPG', 4, true, 'fr'),
('Développement Économique', 'Soutenir la croissance économique et l''entrepreneuriat', '/images/home-slider/economic.jpg', 5, true, 'fr')
ON CONFLICT DO NOTHING;

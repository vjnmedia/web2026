import { Trophy, Users, Target, Clock, Award, Globe, Heart, Shield, BookOpen, ChevronRight, Mic, Palette, Activity, Download } from 'lucide-react';
import ProgramDetail from '@/components/ProgramDetail';
import { useLanguage } from '@/components/LanguageContext';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import ProgramsSidebar from '@/components/ProgramsSidebar';

const SportCultureArts = () => {
  const { t } = useLanguage();
  
  const sportsCultureArtsDetails = [
    t('programs.sportCultureArts.details.background1', 'The sports, culture, and arts program was launched at Vision Jeunesse Nouvelle in 2002, following Rwanda\'s recovery from the 1994 Genocide against the Tutsis. During this period, many young people were struggling, feeling lost, hopeless and resorted to drug use, poverty, and risky behaviors that led to sexual promiscuity. As a result, they became vulnerable to sexually transmitted infections, including HIV.'),
    t('programs.sportCultureArts.details.background2', 'Our program background centers on several core pillars that define our mission and impact:'),
    t('programs.sportCultureArts.details.youthEmpowerment', '1. Youth Empowerment: Through sport, culture, and art, we empower young individuals by nurturing their confidence, leadership skills, and sense of identity. Engaging in these activities helps youth discover their talents, cultivate discipline, and unlock their potential for personal and community growth.'),
    t('programs.sportCultureArts.details.culturalPreservation', '2. Cultural Preservation: We are dedicated to preserving and promoting Rwandan cultural heritage through diverse artistic expressions such as traditional dance, music, theatre, poetry, and visual arts. By celebrating these cultural traditions, we ensure that young people stay connected to their roots and contribute to a vibrant cultural landscape.'),
    t('programs.sportCultureArts.details.educationSkillDevelopment', '3. Education and Skill Development: Utilizing sport, culture, and art as educational tools, we impart essential life skills including teamwork, creativity, critical thinking, and resilience. Through structured programs and workshops, participants enhance their artistic and athletic abilities while preparing for future opportunities across various fields.'),
    t('programs.sportCultureArts.details.communityEngagement', '4. Community Engagement: We actively engage with communities through cultural events, performances, and outreach initiatives that foster social cohesion, dialogue, and mutual understanding. By involving local communities, we cultivate a sense of belonging and collective responsibility among participants and stakeholders alike.'),
    t('programs.sportCultureArts.details.healthyLifestyles', '5. Promotion of Healthy Lifestyles: We promote physical activity and wellness among youth through sports and recreational activities, aiming to combat sedentary behavior and enhance overall well-being.'),
    t('programs.sportCultureArts.details.advocacyPolicyInfluence', '6. Advocacy and Policy Influence: Advocating for youth development through sport, culture, and art at local, national, and international levels, we strive to influence policies and initiatives that prioritize empowerment and cultural preservation in development agenda.'),
    t('programs.sportCultureArts.details.diversityInclusivity', '7. Celebration of Diversity and Inclusivity: Embracing diversity within our organization and across the communities we serve, we create an inclusive environment where all youth can thrive and contribute positively to society.'),
    t('programs.sportCultureArts.details.entertainmentEngagement', '8. Entertainment and Engagement: Our sport, culture, and arts program is a vibrant initiative that brings together individuals from diverse backgrounds to participate in a wide range of activities. From sports leagues and tournaments to music, dance, and art classes, our program offers opportunities for physical and mental health improvement, social connection, and community building. We welcome youth of all ages to join us in these enriching experiences.')
  ];

  const objectives = [
    t('programs.sportCultureArts.objectives.general', 'Establishing a platform for discovering, nurturing, promoting, and developing the talents of young people with the aim of making them professionals, while also focusing on their values and behavior.'),
    t('programs.sportCultureArts.objectives.specific1', 'Promoting sports in the areas where Vision Jeunesse Nouvelle operates.'),
    t('programs.sportCultureArts.objectives.specific2', 'Developing and preserving the talents of young people in sports, culture, and the arts.'),
    t('programs.sportCultureArts.objectives.specific3', 'Delivering messages aimed at improving well-being and general health through sports, culture, and the arts.'),
    t('programs.sportCultureArts.objectives.specific4', 'Increasing visibility of the Vision Jeunesse Nouvelle organization through sports, culture, and the arts.')
  ];

  const problemContext = t('programs.sportCultureArts.problemContext', 'Following the tragic events of the genocide against the Tutsis, along with the wars and famines that devastated the lives of Rwandans, especially affecting their families, many young people were left to wander aimlessly. This sense of displacement ultimately led to an increase in the spread of sexually transmitted diseases, including HIV/AIDS. This is the reason why our program came to address these multifaceted challenges through strategic initiatives and collaborative efforts. By focusing on youth empowerment, cultural preservation, education, community engagement, health promotion, policy advocacy, diversity, and inclusive programming, by aiming to create a more vibrant, cohesive, and resilient community enriched by the transformative power of sport, culture, and art.');

  const targetGroups = {
    direct: [
      t('programs.sportCultureArts.targetGroups.direct1', 'Children and youth (students, school leavers, and adults) aged 7 to 26 years.'),
      t('programs.sportCultureArts.targetGroups.direct2', 'In culture and arts, we work with children and youth aged 10-25 years.'),
      t('programs.sportCultureArts.targetGroups.direct3', 'Youth and Adolescents: The primary beneficiaries are young individuals aged typically between 10 to 25 years old. These youth are directly involved in participating in various sports activities, cultural events, artistic workshops, and educational programs offered by the program. The aim is to empower them, enhance their skills, build confidence, and foster personal growth through these experiences.'),
      t('programs.sportCultureArts.targetGroups.direct4', 'Direct partners: Directly impacted by engagement in initiative events organized by the program.'),
      t('programs.sportCultureArts.targetGroups.direct5', 'Field agents and different coaches according to their respective skills and talents.'),
    ],
    indirect: [
      t('programs.sportCultureArts.targetGroups.indirect1', 'Local government'),
      t('programs.sportCultureArts.targetGroups.indirect2', 'Federations'),
      t('programs.sportCultureArts.targetGroups.indirect3', 'Training centers'),
      t('programs.sportCultureArts.targetGroups.indirect4', 'Schools'),
      t('programs.sportCultureArts.targetGroups.indirect5', 'parents or Guardians'),
    ]
  };

  const selectionCriteria = {
    individual: [
      t('programs.sportCultureArts.selectionCriteria.individual1', 'Issuing an announcement'),
      t('programs.sportCultureArts.selectionCriteria.individual2', 'Age range between 7 and 26'),
      t('programs.sportCultureArts.selectionCriteria.individual3', 'Residing in an area where VJN operates'),
      t('programs.sportCultureArts.selectionCriteria.individual4', 'Assessing talents and assigning them to the appropriate category'),
      t('programs.sportCultureArts.selectionCriteria.individual5', 'Talent scouting in groups or schools'),
      t('programs.sportCultureArts.selectionCriteria.individual6', 'Filling out the registration form (in Annex)'),
      t('programs.sportCultureArts.selectionCriteria.individual7', 'Assigning to groups'),
    ],
    groups: [
      t('programs.sportCultureArts.selectionCriteria.group1', 'The team seeks to become VJN\'s team.'),
      t('programs.sportCultureArts.selectionCriteria.group2', 'Application letter'),
      t('programs.sportCultureArts.selectionCriteria.group3', 'Signing an agreement once approved'),
      t('programs.sportCultureArts.selectionCriteria.group4', 'The team seeks to collaborate with VJN.'),
      t('programs.sportCultureArts.selectionCriteria.group5', 'Application letter'),
      t('programs.sportCultureArts.selectionCriteria.group6', 'Signing an agreement once approved'),
    ]
  };

  const scope = t('programs.sportCultureArts.scope', 'Sports, culture, and arts activities are currently held in Rubavu District. However, based on invitations from various partners, we plan to expand our programs across the entire country.');

  const mainActivities = [
    { title: t('programs.sportCultureArts.mainActivities.activity1', 'Participating in sports leagues once a year.'), duration: 'Once a year' },
    { title: t('programs.sportCultureArts.mainActivities.activity2', 'Organizing and facilitating tournaments that encourage physical activity, teamwork, and friendly competition among youth, once a year.'), duration: 'Once a year' },
    { title: t('programs.sportCultureArts.mainActivities.activity3', 'Providing coaching, training, and skill development sessions regularly.'), duration: 'Regularly' },
    { title: t('programs.sportCultureArts.mainActivities.activity4', 'Conducting workshops and classes on traditional Rwandan cultural practices such as dance, music, drumming, weaving, regularly.'), duration: 'Regularly' },
    { title: t('programs.sportCultureArts.mainActivities.activity5', 'Offering opportunities for youth to learn and practice various artistic techniques and cultural expressions under the guidance of experienced instructors, permanently.'), duration: 'Permanently' },
    { title: t('programs.sportCultureArts.mainActivities.activity6', 'Organizing cultural performances such as music concerts, dance recitals, theater productions, and poetry readings during competitions.'), duration: 'During competitions' },
    { title: t('programs.sportCultureArts.mainActivities.activity7', 'Exhibiting various artistic products once a year.'), duration: 'Once a year' },
    { title: t('programs.sportCultureArts.mainActivities.activity8', 'Organizing and hosting community engagement events such as cultural and intercultural festivals that promote social cohesion, dialogue, and mutual understanding among participants, regional and residents, once a year.'), duration: 'Once a year' },
    { title: t('programs.sportCultureArts.mainActivities.activity9', 'Organizing recreational activities and promoting physical activity and healthy lifestyles through sports clinics and fitness sessions, weekly.'), duration: 'Weekly' },
  ];

  const methodology = {
    intro: t('programs.sportCultureArts.methodology.intro', 'Our methodology for talent recruitment and development at VJN designed to identify and nurture promising young talents across Rwanda. We employ a structured approach that encompasses targeted recruitment strategies and age-specific categorization to ensure optimal training and growth opportunities for each young person.'),
    recruitmentApproach: [
      t('programs.sportCultureArts.methodology.recruitment1', 'Direct recruitment from local communities and schools.'),
      t('programs.sportCultureArts.methodology.recruitment2', 'Recommendations and referrals from parents and guardians.'),
      t('programs.sportCultureArts.methodology.recruitment3', 'Scouting talented individuals during matches and tournaments.'),
      t('programs.sportCultureArts.methodology.recruitment4', 'Community Outreach: Collaborate with local schools, youth clubs, and community centers to raise awareness about the benefits of Sport and the opportunities available at VJN.'),
      t('programs.sportCultureArts.methodology.recruitment5', 'Parent Engagement: Involve parents and guardians in the sensitization process, highlighting the positive impact of sports participation on youth development and encouraging their support.'),
      t('programs.sportCultureArts.methodology.recruitment6', 'Advertisement on Radios: Utilizing local radio stations to broadcast advertisements and announcements regarding sports activities, encouraging listeners to join and participate.'),
      t('programs.sportCultureArts.methodology.recruitment7', 'Social media: Leveraging popular social media platforms to disseminate information about sports initiatives, share updates, and interact with the community online.'),
    ],
  };

  const sports = {
    football: {
      title: t('programs.sportCultureArts.sports.football.title', 'Football (Soccer)'),
      description: t('programs.sportCultureArts.sports.football.description', 'Football, or soccer, is a globally popular team sport played between two teams of eleven players each. The objective is to score goals by kicking the ball into the opposing team\'s goal. Football emphasizes teamwork, communication, and strategy. Players must coordinate their movements, pass the ball efficiently, and work together to defend and attack as a cohesive unit. The sport promotes physical fitness, skill development, and camaraderie among teammates. As VJN, we not only promote the sport but also nurture youth talent. We believe in using football as a tool to empower young people, helping them develop skills that extend beyond the pitch to enrich their lives. By engaging with football, youth learn valuable lessons in discipline, teamwork, and perseverance, preparing them for a brighter future.'),
      ageGroups: [
        t('programs.sportCultureArts.sports.football.ageGroup1', 'Under Thirteen: Players aged 13 and below.'),
        t('programs.sportCultureArts.sports.football.ageGroup2', 'Under Fifteen: Players aged between 14 and 15.'),
        t('programs.sportCultureArts.sports.football.ageGroup3', 'Under Seventeen: Players aged between 16 and 17.'),
        t('programs.sportCultureArts.sports.football.ageGroup4', 'These age categories integrated into our academy structure. Players above seventeen but below twenty placed in our junior team.'),
        t('programs.sportCultureArts.sports.football.ageGroup5', 'For players above twenty but under twenty-four, they are eligible to join VJN FC and may scouted for opportunities in professional football teams outside our organization. Football is not war, for football you need to know how to play, football is not a mystery.'),
      ],
    },
    basketball: {
      title: t('programs.sportCultureArts.sports.basketball.title', 'Basketball'),
      description: t('programs.sportCultureArts.sports.basketball.description', 'Basketball is a fast-paced team sport played on a rectangular court, where two teams compete to score points by shooting the ball through the opponent\'s hoop. Basketball requires teamwork, coordination, and agility. Players must pass, dribble, and shoot the ball while adhering to offensive and defensive strategies. The sport fosters communication, decision-making, and adaptability, as players must quickly adjust to changing game situations and collaborate with teammates to outmaneuver the opposing team. The objective of this sensitization phase in highs schools and away is to engage and encourage youth within the age groups of under 10, under 13, under 15, and under 18 to participate actively in basketball at VJN. Through structured team participation, we aim to nurture talent, promote healthy competition, and instill values that will benefit our youth on and off the court.'),
      ageGroups: [
        { category: t('programs.sportCultureArts.sports.basketball.ageGroup1Category', 'Under 10 Category'), details: t('programs.sportCultureArts.sports.basketball.ageGroup1Details', 'Forming two teams to introduce the basics of basketball in a fun and supportive environment, laying the foundation for young athletes to develop their skills.') },
        { category: t('programs.sportCultureArts.sports.basketball.ageGroup2Category', 'Under 13 Category'), details: t('programs.sportCultureArts.sports.basketball.ageGroup2Details', 'Establishing two teams to advance fundamental basketball techniques and encourage strategic gameplay among participants transitioning from introductory levels.') },
        { category: t('programs.sportCultureArts.sports.basketball.ageGroup3Category', 'Under 15 Category'), details: t('programs.sportCultureArts.sports.basketball.ageGroup3Details', 'Structuring two teams further refine basketball skills, emphasizing teamwork, leadership, and competitive spirit in preparation for more challenging competitions.') },
        { category: t('programs.sportCultureArts.sports.basketball.ageGroup4Category', 'Under 18 Category'), details: t('programs.sportCultureArts.sports.basketball.ageGroup4Details', 'Organizing two teams to provide older youth with opportunities to show case their abilities, refine their techniques, and develop as role models within the VJN basketball community.') },
      ],
      outro: t('programs.sportCultureArts.sports.basketball.outro', 'By promoting basketball among youth aged 8 to 18 through structured teams and comprehensive support, we aim to nurture a love for the sport, foster personal development, and build a strong, inclusive community of young athletes. Together, let\'s dribble towards success and score big on and off the court!'),
    },
    volleyball: {
      title: t('programs.sportCultureArts.sports.volleyball.title', 'Volleyball & Beach Volleyball'),
      description: t('programs.sportCultureArts.sports.volleyball.description', 'Volleyball is a team sport played on a rectangular court, where two teams of six players each try to score points by hitting a ball over a net and into the opponent\'s court. Volleyball requires teamwork, communication, and precision. Players must pass, set, and spike the ball effectively while coordinating their movements with teammates to set up scoring opportunities and defend against the opponent\'s attacks. The sport fosters cooperation, coordination, and trust among teammates, as players must rely on each other to succeed. Beach volleyball is a team sport played by two teams of two players each on a sand court divided by a net. Similar to indoor volleyball, the objective of the game is to send the ball over the net and to ground it on the opponent\'s side of the court. Each team also works in unison to prevent the opposing team from grounding the ball on their side of the court. As VJ N, we are committed to advancing volleyball talent across Rwanda through a systematic approach that integrates outreach and structured development programs in both beach volleyball and traditional indoor volleyball.'),
      programs: [
        { name: t('programs.sportCultureArts.sports.volleyball.program1Name', 'Beach Volleyball'), details: t('programs.sportCultureArts.sports.volleyball.program1Details', 'Designed for players aged 10 to 17, accommodating both boys and girls. Teams consist of two players each, totaling 4 teams and 10 players in the program.') },
        { name: t('programs.sportCultureArts.sports.volleyball.program2Name', 'Volleyball'), details: t('programs.sportCultureArts.sports.volleyball.program2Details', 'Played indoors with a team size of 14 players per team. Our volleyball program includes 30 players, evenly split between boys and girls, fostering a balanced and competitive environment.') },
      ],
      outro: t('programs.sportCultureArts.sports.volleyball.outro', 'Through these structured programs, we aim to provide comprehensive training and development opportunities tailored to the specific needs and abilities of young athletes in both beach volleyball and traditional indoor volleyball disciplines. This approach not only cultivates technical skills but also promotes teamwork, sportsmanship, and personal growth among our players. Through these initiatives, we aspire to contribute positively to the sporting landscape while promoting personal development and community engagement among our participants. Keep the ball flying, the sky is only the limit.'),
    },
    handball: {
      title: t('programs.sportCultureArts.sports.handball.title', 'Handball'),
      description: t('programs.sportCultureArts.sports.handball.description', 'Is fast-paced team sport play on a court, primarily indoors, where two teams compete to score goals by throwing a ball into the opposing team\'s goal? - The primary objective of handball is to score goals by throwing the ball past the goalkeeper and into the opponent\'s net. The team with the most goals at the end of the game wins. Each team typically consists of seven players: one goalkeeper and six outfield players. Outfield players usually comprise a mix of attackers, defenders, and midfielders, each with specific roles and responsibilities during gameplay.'),
      ageGroups: [
        { category: t('programs.sportCultureArts.sports.handball.ageGroup1Category', 'Under 15 Team'), details: t('programs.sportCultureArts.sports.handball.ageGroup1Details', 'Forming a team to introduce the fundamentals of handball, focusing on skill development, teamwork, and sportsmanship among younger participants.') },
        { category: t('programs.sportCultureArts.sports.handball.ageGroup2Category', 'Under 17 Team'), details: t('programs.sportCultureArts.sports.handball.ageGroup2Details', 'Establishing a team to advance handball techniques, strategic gameplay, and physical conditioning for participants transitioning towards competitive levels.') },
        { category: t('programs.sportCultureArts.sports.handball.ageGroup3Category', 'Under 25 Team'), details: t('programs.sportCultureArts.sports.handball.ageGroup3Details', 'Organizing a team for older youth to hone their skills, display their talents, and foster leadership within the VJN handball community.') },
      ],
      outro: t('programs.sportCultureArts.sports.handball.outro', 'At Vision Jeunesse Nouvelle. By promoting handball among youth aged 8 to 25 through structured teams and comprehensive support, we aim to cultivate a passion for the sport, nurture athletic development, and build a vibrant community of young handball enthusiasts. Together, let\'s pass towards success and score big on the handball court.'),
    },
    swimming: {
      title: t('programs.sportCultureArts.sports.swimming.title', 'Swimming'),
      description: t('programs.sportCultureArts.sports.swimming.description', 'Swimming is a highly competitive sport with various events and disciplines, including freestyle, backstroke, breaststroke, butterfly, and individual medley. Competitive swimmers train rigorously to improve their speed, technique, and endurance, competing in local, national, and international competitions such as the Olympics, World Championships, and swim meets. The objective of this sensitization phase is to engage and encourage youth within the age groups of under 14, under 9, and under 23 to participate actively in swimming at VJN. Through structured team participation, we aim to foster a love for swimming, develop competitive skills, and provide a supportive environment for young athletes to excel in aquatic sports.'),
      ageGroups: [
        { category: t('programs.sportCultureArts.sports.swimming.ageGroup1Category', 'Under 14 Team'), details: t('programs.sportCultureArts.sports.swimming.ageGroup1Details', 'Forming a team to introduce basic swimming techniques and water safety skills to younger participants, focusing on building confidence and enjoyment in the water.') },
        { category: t('programs.sportCultureArts.sports.swimming.ageGroup2Category', 'Under 9 Team'), details: t('programs.sportCultureArts.sports.swimming.ageGroup2Details', 'Establishing a team for the youngest participants to learn fundamental swimming strokes and develop comfort in the water under the guidance of experienced instructors.') },
        { category: t('programs.sportCultureArts.sports.swimming.ageGroup3Category', 'Under 23 Team'), details: t('programs.sportCultureArts.sports.swimming.ageGroup3Details', 'Organizing a team for older youth to refine swimming techniques, enhance competitive skills, and participate in regional and national competitions as ambassadors of VJN.') },
      ],
      outro: t('programs.sportCultureArts.sports.swimming.outro', 'At Vision Jeunesse Nouvelle. By promoting swimming among youth under 23 through structured teams and comprehensive support, we aim to cultivate a lifelong passion for the sport, enhance aquatic skills, and foster camaraderie among participants. Together, let\'s make waves and celebrate the thrill of swimming!'),
    },
    athletics: {
      title: t('programs.sportCultureArts.sports.athletics.title', 'Athletics'),
      description: t('programs.sportCultureArts.sports.athletics.description', 'Athletics, also known as track and field, is a category of sports that involve competitive running, jumping, throwing, and walking. These fundamental human movements to develop into organized competitions for centuries. The most common types of athletics competitions include: Track and field: This is the classic form of athletics, held on a running track with a field for jumping and throwing events. Road running: This includes marathons, half marathons, 10Ks, and other races held on public roads. Cross-country running: This type of running takes place on natural terrain, often over hills and forests. Race walking: This is a competitive walking discipline with specific rules about foot contact with the ground.'),
      ageGroups: [
        t('programs.sportCultureArts.sports.athletics.ageGroup1', 'Under 16 Team: Forming a team to introduce basic athletics skills and techniques to younger participants, focusing on building foundation skills in running, jumping, and throwing events.'),
        t('programs.sportCultureArts.sports.athletics.ageGroup2', 'Under 21 Team: Establishing a team for the youngest participants to learn fundamental athletic movements and coordination through age-appropriate activities and games.'),
        t('programs.sportCultureArts.sports.athletics.ageGroup3', 'Above 22 Team: Organizing a team for older youth to advance their athletic abilities, specializing in specific track and field events, and preparing for regional and national competitions as representatives of VJN.'),
      ],
      outro: t('programs.sportCultureArts.sports.athletics.outro', 'At Vision Jeunesse Nouvelle, we aim to inspire a passion for track and field, develop athletic skills, and foster a sense of community and sportsmanship among participants. Together, let\'s run towards excellence and celebrate the thrill of athletics!'),
    },
    kungfu: {
      title: t('programs.sportCultureArts.sports.kungfu.title', 'Kung fu'),
      description: t('programs.sportCultureArts.sports.kungfu.description', 'Kung fu, also spelled Kungfu, is a broad term for various Chinese martial arts. Contrary to popular belief in the West, it does not solely refer to unarmed fighting. In its original Chinese meaning, kung fu refers to any discipline or skill achieved through hard work and practice. It can apply to things beyond martial arts, such as the discipline required for mastering calligraphy or playing a musical instrument. There are numerous kung fu styles, each with its unique philosophies, techniques, and training methods. The objective of this sensitization phase is to engage and encourage individuals across various age groups actively participate in Kung Fu at VJN. Through structured team participation, we aim to nurture skills, cultivate discipline, and foster a sense of community among Kung Fu enthusiasts.'),
      ageGroups: [
        { category: t('programs.sportCultureArts.sports.kungfu.ageGroup1Category', '4-8 Years Team'), details: t('programs.sportCultureArts.sports.kungfu.ageGroup1Details', 'Forming a team to introduce basic Kung Fu techniques and principles in a fun and engaging manner suitable for younger participants. Focus will be on building coordination, balance, and respect for martial arts traditions.') },
        { category: t('programs.sportCultureArts.sports.kungfu.ageGroup2Category', '8-15 Years Team'), details: t('programs.sportCultureArts.sports.kungfu.ageGroup2Details', 'Establishing a team for older children and teenagers to deepen their understanding of Kung Fu, develop advanced techniques, and participate in local demonstrations and competitions.') },
        { category: t('programs.sportCultureArts.sports.kungfu.ageGroup3Category', '15-35 Years Team'), details: t('programs.sportCultureArts.sports.kungfu.ageGroup3Details', 'Organizing a team for young adults and adults to refine their Kung Fu skills, engage in rigorous training sessions, and participate in regional and national tournaments to highlight their abilities.') },
      ],
      outro: t('programs.sportCultureArts.sports.kungfu.outro', 'At Vision Jeunesse Nouvelle. By promoting Kung Fu among individuals of all ages through structured teams and comprehensive support, we aim to foster a lifelong passion for martial arts, promote physical fitness, and cultivate discipline and respect among participants. Together, let\'s harness the power of Kung Fu to strengthen our minds, bodies, and spirits!'),
    },
    massSport: {
      title: t('programs.sportCultureArts.sports.massSport.title', 'Mass Sport'),
      description: t('programs.sportCultureArts.sports.massSport.description', 'A Mass sport is a sporting event in which many people participate. Often, participants spread out over several miles in variable terrain. This mass sport is one of the monthly district activity to be participated with everyone on his/her will. The purpose of mass sport initiatives, under the auspices of VJN, is multifaceted and geared towards fostering community health, social cohesion, and youth development through sports. Specifically, these initiatives aim to achieve the following objectives:'),
      objectives: [
        t('programs.sportCultureArts.sports.massSport.objective1', 'Promoting Physical Health: Encouraging regular physical activity among residents to improve overall fitness levels and combat lifestyle-related diseases such as obesity and cardiovascular conditions.'),
        t('programs.sportCultureArts.sports.massSport.objective2', 'Community Engagement: Providing a platform for community members of all ages to participate in sports activities together, fostering a sense of belonging and unity within neighborhoods.'),
        t('programs.sportCultureArts.sports.massSport.objective3', 'Youth Development: Offering structured sports programs that not only teach fundamental skills but also instill values such as teamwork, discipline, and perseverance among young participants.'),
        t('programs.sportCultureArts.sports.massSport.objective4', 'Social Integration: Using sports as a tool to break down social barriers and promote inclusivity, gender equality, and respect among participants from diverse backgrounds.'),
        t('programs.sportCultureArts.sports.massSport.objective5', 'Promotion of Sporting Culture: Cultivating a culture of sportsmanship, fair play, and respect for rules and opponents among participants and spectators alike'),
        t('programs.sportCultureArts.sports.massSport.objective6', 'Community Well-being: Contributing to the overall well-being of residents by providing recreational opportunities that contribute to mental and emotional health, stress reduction, and improved quality of life.'),
      ],
      outro: t('programs.sportCultureArts.sports.massSport.outro', 'Through these efforts, VJN aims to leverage the power of mass sports to create a healthier, more cohesive, and vibrant community, ultimately contributing to its social and economic development. Through these sensitization methods, VJN aims to effectively communicate the benefits of sports participation, promote community involvement, and ultimately enhance the health, well-being, and social fabric.'),
    },
    karate: {
      title: t('programs.sportCultureArts.sports.karate.title', 'Karate'),
      description: t('programs.sportCultureArts.sports.karate.description', 'Karate, literally meaning "empty hand" in Japanese (空手 - kara = empty, 手 - te = hand), is a traditional martial art originating from the Ryukyu Kingdom (present-day Okinawa, Japan). It emphasizes unarmed combat using punches, kicks, blocks, and throws to disable an opponent.'),
      ageGroups: [
        { category: t('programs.sportCultureArts.sports.karate.ageGroup1Category', '4-13 Years Category'), details: t('programs.sportCultureArts.sports.karate.ageGroup1Details', 'Introducing basic Karate techniques and principles tailored to younger participants, focusing on coordination, discipline, and respect for martial arts traditions.') },
        { category: t('programs.sportCultureArts.sports.karate.ageGroup2Category', '14-36 Years Category'), details: t('programs.sportCultureArts.sports.karate.ageGroup2Details', 'Offering advanced Karate training for teenagers and adults, emphasizing skill development, self-defense techniques, and participation in local tournaments and demonstrations.') },
      ],
      outro: t('programs.sportCultureArts.sports.karate.outro', 'At Vision Jeunesse Nouvelle. By promoting Karate among individuals of all ages through structured training and community support, we aim to instill discipline, build confidence, and foster a culture of respect and achievement among participants. Together, let\'s embody the spirit of Karate and empower ourselves through martial arts!'),
    },
    gymnastics: {
      title: t('programs.sportCultureArts.sports.gymnastics.title', 'Gymnastic (ACROBATICS)'),
      description: t('programs.sportCultureArts.sports.gymnastics.description', 'Acrobatics is the performance of human feats of balance, agility, and motor coordination. Acrobatic skills used in performing arts, sporting events, and martial arts. Extensive use of acrobatic skills are most often performed in acro dance, circus, gymnastics, and free running and to a lesser extent in other athletic activities including ballet, slacklining and diving. Although acrobatics is most commonly associated with human body performance, the term used to describe other types of performance, such as aerobatics. In Gymnastic, we have different styles such as: Rhythmic, Acrobatic, Aerobic.'),
      outro: t('programs.sportCultureArts.sports.gymnastics.outro', 'At Vision Jeunesse Nouvelle, we believe in the transformative power of gymnastic to inspire, empower, and unite individuals. Through this External Recruitment Sensitization Module, we have explored effective strategies to attract young talents who share our passion for acrobatics and our commitment to excellence. Above all, for player moving from one category (Group Age) to another one, requires to pass both theoretical and practical exams and fill out the approval and identification forms allowing him/her to be one of the youth of VJN to participate in different competitions and events.'),
    },
  };

  const culture = {
    intro: t('programs.sportCultureArts.culture.intro', 'In Cultural field, Youth are categorized into different customs, traditions, norms, values, and way of life of a particular group. We delve into the rich tapestry of cultural arts encompassed within VJN, focusing on theatre, poetry, dance (both Modern and Traditional), and music (both singing and playing musical instruments) to facilitate the development. Culture encompasses the collective knowledge, behaviors, and practices that learned and transmitted within a society, influencing individuals\' perspectives, behaviors, and interactions within that society. Through their exploration and practice, participants will not only hone their artistic skills but also contribute to the vibrant and inclusive cultural landscape of Rwanda.'),
    ageCategories: [
      t('programs.sportCultureArts.culture.ageCategory1', 'In Culture, we have two categories of participants where we have those in ages from 7-12 years, and another category from 13-25 years, they are trained on:'),
    ],
    objectives: [
      t('programs.sportCultureArts.culture.objective1', 'Understand the Role of Cultural Arts: Explore how theatre, poetry, dance, and music function as mediums for cultural expression, education, and community engagement.'),
      t('programs.sportCultureArts.culture.objective2', 'Develop Artistic Skills: Enhance proficiency in chosen art forms through practical workshops and theoretical insights.'),
      t('programs.sportCultureArts.culture.objective3', 'Foster Cultural Awareness: Gain a deeper appreciation for Rwandan cultural heritage and traditions through the lens of performing arts.'),
      t('programs.sportCultureArts.culture.objective4', 'Promote Youth Empowerment: Empower participants to find their voice and identity through creative expression, fostering confidence and leadership skills.'),
      t('programs.sportCultureArts.culture.objective5', 'Encourage Community Engagement: Utilize the arts as a catalyst for social change and community development, promoting dialogue and understanding among diverse groups.'),
    ],
    courseStructure: [
      { title: t('programs.sportCultureArts.culture.courseStructure1Title', 'Introduction to Cultural Arts in VJN'), details: [t('programs.sportCultureArts.culture.courseStructure1Detail1', 'Overview of theatre, poetry, dance (Modern and Traditional), and music as forms of cultural expression.'), t('programs.sportCultureArts.culture.courseStructure1Detail2', 'Historical context and significance of these art forms in Rwandan society.'), t('programs.sportCultureArts.culture.courseStructure1Detail3', 'Guest speakers and artists sharing their experiences and insights.')] },
      { title: t('programs.sportCultureArts.culture.courseStructure2Title', 'Theatre and its Educational Role'), details: [t('programs.sportCultureArts.culture.courseStructure2Detail1', 'Theatrical techniques and storytelling through drama.'), t('programs.sportCultureArts.culture.courseStructure2Detail2', 'Role-playing and improvisation exercises.'), t('programs.sportCultureArts.culture.courseStructure2Detail3', 'Using theatre for social awareness and education campaigns.')] },
      { title: t('programs.sportCultureArts.culture.courseStructure3Title', 'Poetry as a Medium of Expression'), details: [t('programs.sportCultureArts.culture.courseStructure3Detail1', 'Understanding poetry: rhythm, meter, and poetic devices.'), t('programs.sportCultureArts.culture.courseStructure3Detail2', 'Writing workshops: exploring personal and cultural themes.'), t('programs.sportCultureArts.culture.courseStructure3Detail3', 'Performance techniques: voice modulation and stage presence.')] },
      { title: t('programs.sportCultureArts.culture.courseStructure4Title', 'Dance - Modern and Traditional'), details: [t('programs.sportCultureArts.culture.courseStructure4Detail1', 'Learning traditional Rwandan dance forms: Umushagiriro, Intore, and more.'), t('programs.sportCultureArts.culture.courseStructure4Detail2', 'Modern dance styles: contemporary and fusion.'), t('programs.sportCultureArts.culture.courseStructure4Detail3', 'Choreography sessions and group performances.')] },
      { title: t('programs.sportCultureArts.culture.courseStructure5Title', 'Music - Singing and Instrumental'), details: [t('programs.sportCultureArts.culture.courseStructure5Detail1', 'Vocal training: breathing techniques, pitch control, and harmony.'), t('programs.sportCultureArts.culture.courseStructure5Detail2', 'Instrumental workshops: introduction to traditional Rwandan instruments.'), t('programs.sportCultureArts.culture.courseStructure5Detail3', 'Collaboration: forming bands and ensembles for collective music projects.')] },
    ],
    outro: t('programs.sportCultureArts.culture.outro', 'By the end, participants will have not only honed their artistic talents but also gained a deeper understanding of the transformative power of cultural arts. They will be equipped to contribute actively to VJN\'s mission of fostering a vibrant and inclusive cultural landscape in Rwanda, utilizing their newfound skills for personal and social transformation. Through this journey, we celebrate the diverse heritage of Rwanda while looking forward to a future enriched by the creative potential of its youth.'),
  };

  const evaluation = {
    individual: [
      t('programs.sportCultureArts.evaluation.individual1', 'Evaluation form for beneficiaries and instructors (in appendix)'),
    ],
    groupClub: [
      t('programs.sportCultureArts.evaluation.groupClub1', 'Regular attendance and contract respect.'),
      t('programs.sportCultureArts.evaluation.groupClub2', 'Monitoring and evaluation process by the program'),
      t('programs.sportCultureArts.evaluation.groupClub3', 'Setting clear objectives and indicators'),
      t('programs.sportCultureArts.evaluation.groupClub4', 'Data collection method: Survey and questionnaires, tests, observation, interviews, attendance and Field visits.'),
      t('programs.sportCultureArts.evaluation.groupClub5', 'Continuous feedback and reporting.'),
    ],
    graduation: t('programs.sportCultureArts.evaluation.graduation', 'After evaluating that the beneficiary\'s talent has come to maturity, the person concerned receives a certificate and a letter of recommendation from VJN, which will help him or her to get involved in other groups'),
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-2">
      <div className="flex flex-col lg:flex-row gap-1">
        {/* Sidebar - Hidden on mobile, shown on PC */}
        <div className="hidden lg:block">
          <ProgramsSidebar />
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {/* Full-width Hero Header Section */}
          <section className="w-full bg-vjn-blue py-16 md:py-20 mb-4 text-center">
            <div className="container mx-auto px-4">
              <h1 className="text-4xl md:text-5xl font-bold mb-3 text-green-600">
                {t('programs.sportCultureArts.title', 'Sport, Culture & Arts Program')}
              </h1>
              <h2 className="text-2xl md:text-3xl font-semibold mb-2 text-white">
                {t('programs.sportCultureArts.subtitle', 'Empowering Youth Through Sport, Culture & Arts')}
              </h2>
              <p className="text-lg md:text-xl max-w-2xl mx-auto text-white">
                {t('programs.sportCultureArts.intro.description', 'Our Sport, Culture & Arts Program empowers youth by nurturing their talents, promoting healthy lifestyles, and fostering cultural pride and creativity through diverse activities and events.')}
              </p>
            </div>
          </section>

          {/* Download Brochure Button */}
          <div className="mb-4 flex justify-end">
            <a
              href="/downloads/brochures/Sports_culture_arts.pdf"
              download
              className="inline-flex items-center px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700 transition"
            >
              <Download className="mr-2 w-4 h-4" />
              Download Brochure
            </a>
          </div>

          {/* Program Highlights Section */}
          <section className="bg-gradient-to-br from-yellow-50 to-white rounded-md shadow-xs p-2 mb-1">
            <h2 className="text-lg md:text-xl font-bold mb-1 flex items-center text-gray-900">
              <Award className="h-4 w-4 mr-1 text-yellow-600" />
              {t('programs.keyHighlights.title', 'Program Highlights')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-1">
              <div className="bg-white rounded-md p-2 text-center shadow-xs hover:shadow-sm transition-shadow">
                <div className="text-yellow-600 mb-0.5 flex justify-center">
                  <Users className="h-5 w-5" />
                </div>
                <div className="text-lg font-bold text-gray-900 mb-0.5">3000+</div>
                <div className="text-gray-700 text-sm">Youth Engaged</div>
              </div>
              <div className="bg-white rounded-md p-2 text-center shadow-xs hover:shadow-sm transition-shadow">
                <div className="text-yellow-600 mb-0.5 flex justify-center">
                  <Mic className="h-5 w-5" />
                </div>
                <div className="text-lg font-bold text-gray-900 mb-0.5">60+</div>
                <div className="text-gray-700 text-sm">Talents Promoted</div>
              </div>
              <div className="bg-white rounded-md p-2 text-center shadow-xs hover:shadow-sm transition-shadow">
                <div className="text-yellow-600 mb-0.5 flex justify-center">
                  <Trophy className="h-5 w-5" />
                </div>
                <div className="text-lg font-bold text-gray-900 mb-0.5">15+</div>
                <div className="text-gray-700 text-sm">Awards Won</div>
              </div>
              <div className="bg-white rounded-md p-2 text-center shadow-xs hover:shadow-sm transition-shadow">
                <div className="text-yellow-600 mb-0.5 flex justify-center">
                  <Palette className="h-5 w-5" />
                </div>
                <div className="text-lg font-bold text-gray-900 mb-0.5">1800+</div>
                <div className="text-gray-700 text-sm">Creative Arts Participants</div>
              </div>
              <div className="bg-white rounded-md p-2 text-center shadow-xs hover:shadow-sm transition-shadow">
                <div className="text-yellow-600 mb-0.5 flex justify-center">
                  <Activity className="h-5 w-5" />
                </div>
                <div className="text-lg font-bold text-gray-900 mb-0.5">25+</div>
                <div className="text-gray-700 text-sm">Active Sports Teams</div>
              </div>
            </div>
          </section>

          {/* What We Offer Section - Program Background */}
          <section className="bg-gradient-to-br from-green-50 to-white rounded-md shadow-xs p-2 mb-2">
            <div className="flex flex-col md:flex-row gap-2 items-start">
              <div className="md:w-1/3">
                <div className="bg-white p-2 rounded-sm shadow-xs border border-blue-100">
                  <div className="text-blue-600 mb-2">
                    <Trophy size={24} />
                  </div>
                  <h2 className="text-lg font-bold text-gray-900 mb-1">
                    {t('programs.sportCultureArts.title', 'Sport, Culture & Arts Program')}
                  </h2>
                  <h3 className="text-sm font-semibold text-blue-600 mb-1.5">
                    {t('programs.sportCultureArts.subtitle', 'Fostering Talent & Harmony')}
                  </h3>
                  <p className="text-gray-700 leading-relaxed text-xs">
                    {t('programs.sportCultureArts.description', 'Our program promotes holistic youth development through sports, cultural activities, and arts, fostering physical well-being, creativity, and social harmony.')}
                  </p>
                </div>
              </div>
              
              <div className="md:w-2/3">
                <div className="bg-white rounded-sm shadow-xs p-2.5 border border-blue-100">
                  <h4 className="text-base font-semibold text-gray-900 mb-2.5">
                    {t('programs.sportCultureArts.details.title', 'Program Background')}
                  </h4>
                  <div className="space-y-1.5">
                    {sportsCultureArtsDetails.map((detail, index) => (
                      <div key={index} className="flex items-start space-x-1.5 group">
                        <div className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
                          <span className="text-blue-600 font-semibold text-xs">{index + 1}</span>
                        </div>
                        <p className="text-gray-700 text-sm">{detail}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Problem Context Section */}
          <section className="bg-gradient-to-br from-green-50 to-white rounded-md shadow-xs p-2.5 mb-2">
            <h2 className="text-xl font-bold mb-2.5 flex items-center text-gray-900">
              <Shield className="h-4 w-4 mr-1 text-blue-600" />
              {t('programs.sportCultureArts.problemContext.title', 'Problem Context')}
            </h2>
            <p className="text-gray-700 text-sm">{problemContext}</p>
          </section>

          {/* Objectives Section */}
          <section className="bg-gradient-to-br from-green-50 to-white rounded-md shadow-xs p-2.5 mb-2">
            <h2 className="text-xl font-bold mb-2.5 flex items-center text-gray-900">
              <Target className="h-4 w-4 mr-1 text-blue-600" />
              {t('programs.sportCultureArts.objectives.title', 'Program Objectives')}
            </h2>
            <h3 className="text-lg font-semibold text-gray-900 mb-1.5">{t('programs.sportCultureArts.objectives.generalTitle', 'General Objective')}</h3>
            <p className="text-gray-700 text-sm mb-2">{objectives[0]}</p>
            <h3 className="text-lg font-semibold text-gray-900 mb-1.5">{t('programs.sportCultureArts.objectives.specificTitle', 'Specific Objectives')}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-1.5">
              {objectives.slice(1).map((objective, index) => (
                <div key={index} className="flex items-start space-x-1.5 bg-white p-2.5 rounded-sm shadow-xs hover:shadow-sm transition-shadow border border-blue-100 group">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center group-hover:bg-blue-600 transition-colors">
                    <Award className="h-4 w-4 text-blue-600 group-hover:text-white" />
                  </div>
                  <p className="text-gray-700 text-sm">{objective}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Target Groups Section */}
          <section className="bg-gradient-to-br from-green-50 to-white rounded-md shadow-xs p-2.5 mb-2">
            <h2 className="text-xl font-bold mb-2.5 flex items-center text-gray-900">
              <Users className="h-4 w-4 mr-1 text-blue-600" />
              {t('programs.sportCultureArts.targetGroups.mainTitle', 'Target Groups')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-1.5">
              <div className="bg-white rounded-sm shadow-xs p-2.5 border border-blue-100">
                <h3 className="text-base font-semibold text-blue-600 mb-2.5">{t('programs.sportCultureArts.targetGroups.directTitle', 'A. Direct Target Groups')}</h3>
                <ul className="space-y-1.5">
                  {targetGroups.direct.map((group, index) => (
                    <li key={index} className="flex items-start space-x-1.5">
                      <ChevronRight className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 text-sm">{group}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-white rounded-sm shadow-xs p-2.5 border border-blue-100">
                <h3 className="text-base font-semibold text-blue-600 mb-2.5">{t('programs.sportCultureArts.targetGroups.indirectTitle', 'B. Indirect Target Groups')}</h3>
                <ul className="space-y-1.5">
                  {targetGroups.indirect.map((group, index) => (
                    <li key={index} className="flex items-start space-x-1.5">
                      <ChevronRight className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 text-sm">{group}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* Selection Criteria Section */}
          <section className="bg-gradient-to-br from-green-50 to-white rounded-md shadow-xs p-2.5 mb-2">
            <h2 className="text-xl font-bold mb-2.5 flex items-center text-gray-900">
              <Users className="h-4 w-4 mr-1 text-blue-600" />
              {t('programs.sportCultureArts.selectionCriteria.title', 'Selection Criteria')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-1.5">
              <div className="bg-white rounded-sm shadow-xs p-2.5 border border-blue-100">
                <h3 className="text-base font-semibold text-blue-600 mb-2.5">{t('programs.sportCultureArts.selectionCriteria.individualTitle', 'Individual')}</h3>
                <ul className="space-y-1.5">
                  {selectionCriteria.individual.map((criteria, index) => (
                    <li key={index} className="flex items-start space-x-1.5">
                      <ChevronRight className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 text-sm">{criteria}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-white rounded-sm shadow-xs p-2.5 border border-blue-100">
                <h3 className="text-base font-semibold text-blue-600 mb-2.5">{t('programs.sportCultureArts.selectionCriteria.groupsTitle', 'Groups')}</h3>
                <ul className="space-y-1.5">
                  {selectionCriteria.groups.map((criteria, index) => (
                    <li key={index} className="flex items-start space-x-1.5">
                      <ChevronRight className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 text-sm">{criteria}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* Scope Section */}
          <section className="bg-gradient-to-br from-green-50 to-white rounded-md shadow-xs p-2.5 mb-2">
            <h2 className="text-xl font-bold mb-2.5 flex items-center text-gray-900">
              <Globe className="h-4 w-4 mr-1 text-blue-600" />
              {t('programs.sportCultureArts.scope.title', 'Scope')}
            </h2>
            <p className="text-gray-700 text-sm">{scope}</p>
          </section>

          {/* Main Program Activities and Their Duration Section */}
          <section className="bg-gradient-to-br from-green-50 to-white rounded-md shadow-xs p-2.5 mb-2">
            <h2 className="text-xl font-bold mb-2.5 flex items-center text-gray-900">
              <Clock className="h-4 w-4 mr-1 text-blue-600" />
              {t('programs.sportCultureArts.mainActivities.title', 'Main Program Activities and Their Duration')}
            </h2>
            <ul className="space-y-1.5">
              {mainActivities.map((activity, index) => (
                <li key={index} className="flex items-start space-x-1.5 bg-white p-2.5 rounded-sm shadow-xs hover:shadow-sm transition-shadow border border-blue-100 group">
                  <ChevronRight className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700 text-sm">{activity.title} <span className="font-semibold">({activity.duration})</span></span>
                </li>
              ))}
            </ul>
          </section>

          {/* Program Approaches - Methodologies Section */}
          <section className="bg-gradient-to-br from-green-50 to-white rounded-md shadow-xs p-2.5 mb-2">
            <h2 className="text-xl font-bold mb-2.5 flex items-center text-gray-900">
              <Target className="h-4 w-4 mr-1 text-blue-600" />
              {t('programs.sportCultureArts.methodology.title', 'Program approaches - Methodologies')}
            </h2>
            <p className="text-gray-700 text-sm mb-2">{methodology.intro}</p>
            <h3 className="text-base font-semibold text-gray-900 mb-1.5">{t('programs.sportCultureArts.methodology.recruitmentApproachTitle', 'Recruitment Approach')}</h3>
            <ul className="space-y-1.5">
              {methodology.recruitmentApproach.map((approach, index) => (
                <li key={index} className="flex items-start space-x-1.5">
                  <ChevronRight className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700 text-sm">{approach}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Sports Section */}
          <section className="bg-gradient-to-br from-green-50 to-white rounded-md shadow-xs p-2.5 mb-2">
            <h2 className="text-xl font-bold mb-2.5 flex items-center text-gray-900">
              <Trophy className="h-4 w-4 mr-1 text-blue-600" />
              {t('programs.sportCultureArts.sports.title', 'Sports')}
            </h2>
            {Object.entries(sports).map(([key, sport]) => (
              <div key={key} className="mb-4 p-2.5 bg-white rounded-sm shadow-xs border border-blue-100">
                <h3 className="text-lg font-semibold text-blue-600 mb-1.5">{sport.title}</h3>
                <p className="text-gray-700 text-sm mb-2">{sport.description}</p>
                {sport.ageGroups && (
                  <div className="mt-2">
                    <h4 className="text-sm font-semibold text-gray-800 mb-1">{t('programs.sportCultureArts.sports.ageGroupTitle', 'Age Group Teams')}</h4>
                    <ul className="space-y-1">
                      {sport.ageGroups.map((group, idx) => (
                        <li key={idx} className="flex items-start space-x-1">
                          <ChevronRight className="h-3.5 w-3.5 text-blue-600 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700 text-xs">{typeof group === 'string' ? group : `${group.category}: ${group.details}`}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {sport.programs && (
                  <div className="mt-2">
                    <h4 className="text-sm font-semibold text-gray-800 mb-1">{t('programs.sportCultureArts.sports.programTitle', 'Programs')}</h4>
                    <ul className="space-y-1">
                      {sport.programs.map((program, idx) => (
                        <li key={idx} className="flex items-start space-x-1">
                          <ChevronRight className="h-3.5 w-3.5 text-blue-600 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700 text-xs">{program.name}: {program.details}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {sport.objectives && (
                  <div className="mt-2">
                    <h4 className="text-sm font-semibold text-gray-800 mb-1">{t('programs.sportCultureArts.sports.objectivesTitle', 'Objectives')}</h4>
                    <ul className="space-y-1">
                      {sport.objectives.map((objective, idx) => (
                        <li key={idx} className="flex items-start space-x-1">
                          <ChevronRight className="h-3.5 w-3.5 text-blue-600 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700 text-xs">{objective}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {sport.outro && (
                  <p className="text-gray-700 text-sm mt-2">{sport.outro}</p>
                )}
              </div>
            ))}
          </section>

          {/* Culture Section */}
          <section className="bg-gradient-to-br from-green-50 to-white rounded-md shadow-xs p-2.5 mb-2">
            <h2 className="text-xl font-bold mb-2.5 flex items-center text-gray-900">
              <Users className="h-4 w-4 mr-1 text-blue-600" />
              {t('programs.sportCultureArts.culture.mainTitle', 'Culture')}
            </h2>
            <p className="text-gray-700 text-sm mb-2">{culture.intro}</p>
            <h3 className="text-base font-semibold text-gray-900 mb-1.5">{t('programs.sportCultureArts.culture.ageCategoryTitle', 'Categorization According to Age')}</h3>
            <ul className="space-y-1.5 mb-2">
              {culture.ageCategories.map((category, index) => (
                <li key={index} className="flex items-start space-x-1.5">
                  <ChevronRight className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700 text-sm">{category}</span>
                </li>
              ))}
            </ul>
            <h3 className="text-base font-semibold text-gray-900 mb-1.5">{t('programs.sportCultureArts.culture.objectivesTitle', 'Objectives')}</h3>
            <ul className="space-y-1.5 mb-2">
              {culture.objectives.map((objective, index) => (
                <li key={index} className="flex items-start space-x-1.5">
                  <ChevronRight className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700 text-sm">{objective}</span>
                </li>
              ))}
            </ul>
            <h3 className="text-base font-semibold text-gray-900 mb-1.5">{t('programs.sportCultureArts.culture.courseStructureTitle', 'Course Structure')}</h3>
            <div className="space-y-3">
              {culture.courseStructure.map((section, index) => (
                <div key={index} className="bg-white p-2.5 rounded-sm shadow-xs border border-blue-100">
                  <h4 className="text-base font-semibold text-blue-600 mb-1">{section.title}</h4>
                  <ul className="space-y-1">
                    {section.details.map((detail, idx) => (
                      <li key={idx} className="flex items-start space-x-1">
                        <ChevronRight className="h-3.5 w-3.5 text-blue-600 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700 text-xs">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <p className="text-gray-700 text-sm mt-2">{culture.outro}</p>
          </section>

          {/* Evaluation Section */}
          <section className="bg-gradient-to-br from-green-50 to-white rounded-md shadow-xs p-2.5 mb-2">
            <h2 className="text-xl font-bold mb-2.5 flex items-center text-gray-900">
              <Award className="h-4 w-4 mr-1 text-blue-600" />
              {t('programs.sportCultureArts.evaluation.title', 'Evaluation')}
            </h2>
            <h3 className="text-base font-semibold text-gray-900 mb-1.5">{t('programs.sportCultureArts.evaluation.individualTitle', 'Individual')}</h3>
            <ul className="space-y-1.5 mb-2">
              {evaluation.individual.map((item, index) => (
                <li key={index} className="flex items-start space-x-1.5">
                  <ChevronRight className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700 text-sm">{item}</span>
                </li>
              ))}
            </ul>
            <h3 className="text-base font-semibold text-gray-900 mb-1.5">{t('programs.sportCultureArts.evaluation.groupClubTitle', 'Group/Club')}</h3>
            <ul className="space-y-1.5 mb-2">
              {evaluation.groupClub.map((item, index) => (
                <li key={index} className="flex items-start space-x-1.5">
                  <ChevronRight className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700 text-sm">{item}</span>
                </li>
              ))}
            </ul>
            <h3 className="text-base font-semibold text-gray-900 mb-1.5">{t('programs.sportCultureArts.evaluation.graduationTitle', 'Graduation')}</h3>
            <p className="text-gray-700 text-sm">{evaluation.graduation}</p>
          </section>

          {/* Call to Action Section */}
          <section className="mt-4 bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl shadow-lg p-4">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-3 text-white">
                {t('programs.sportCultureArts.cta.title', 'Get Involved')}
              </h2>
              <p className="text-blue-100 text-base mb-4 max-w-2xl mx-auto">
                {t('programs.sportCultureArts.cta.description', 'Join us in our mission to promote holistic youth development through sports, cultural activities, and arts. Your support can make a difference.')}
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                <Link to="/volunteer">
                  <Button className="bg-white text-blue-600 hover:bg-blue-50">
                    {t('programs.sportCultureArts.cta.volunteer', 'Volunteer With Us')}
                  </Button>
                </Link>
                <Link to="/donate">
                  <Button variant="outline" className="border-white text-white hover:bg-blue-700">
                    {t('programs.sportCultureArts.cta.donate', 'Support Our Programs')}
                  </Button>
                </Link>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default SportCultureArts; 
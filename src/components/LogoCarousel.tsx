import { useEffect, useRef } from 'react';

const LogoCarousel = () => {
  const logos = [
    {
      name: 'Partner 1',
      logo: 'https://picsum.photos/seed/partner1/200/100',
    },
    {
      name: 'Partner 2',
      logo: 'https://picsum.photos/seed/partner2/200/100',
    },
    {
      name: 'Partner 3',
      logo: 'https://picsum.photos/seed/partner3/200/100',
    },
    {
      name: 'Partner 4',
      logo: 'https://picsum.photos/seed/partner4/200/100',
    },
    {
      name: 'Partner 5',
      logo: 'https://picsum.photos/seed/partner5/200/100',
    },
    {
      name: 'Partner 6',
      logo: 'https://picsum.photos/seed/partner6/200/100',
    },
  ];

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    const scroll = () => {
      if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth - scrollContainer.clientWidth) {
        scrollContainer.scrollLeft = 0;
      } else {
        scrollContainer.scrollLeft += 1;
      }
    };

    const interval = setInterval(scroll, 30);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-12 bg-gray-50">
      <div className="container-custom">
        <h2 className="text-center mb-8">Our Partners & Donors</h2>
        <div 
          ref={scrollRef}
          className="flex gap-8 overflow-x-hidden"
          style={{ scrollBehavior: 'smooth' }}
        >
          {[...logos, ...logos].map((logo, index) => (
            <div
              key={`${logo.name}-${index}`}
              className="flex-shrink-0 w-48 h-24 bg-white rounded-lg shadow-sm p-4 flex items-center justify-center"
            >
              <img
                src={logo.logo}
                alt={logo.name}
                className="max-w-full max-h-full object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LogoCarousel; 
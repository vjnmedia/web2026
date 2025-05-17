
import { useLanguage } from './LanguageContext';
import { Button } from '@/components/ui/button';

const Hero = () => {
  const { t } = useLanguage();

  return (
    <div className="relative bg-vjn-blue text-white overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-black/50 to-transparent z-10"></div>
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat" 
        style={{ 
          backgroundImage: `url('https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')`,
          filter: 'brightness(0.6)'
        }}
      ></div>
      
      <div className="container-custom relative z-20 py-20 md:py-32 lg:py-40 flex flex-col items-start">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 max-w-3xl animate-fade-in">
          {t('hero.title')}
        </h1>
        <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl animate-fade-in-up">
          {t('hero.subtitle')}
        </p>
        <div className="flex flex-wrap gap-4">
          <Button size="lg" className="bg-white text-vjn-blue hover:bg-gray-100">
            {t('hero.cta.join')}
          </Button>
          <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
            {t('hero.cta.donate')}
          </Button>
          <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
            {t('hero.cta.volunteer')}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Hero;

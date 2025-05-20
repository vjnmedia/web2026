import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useLanguage } from '@/components/LanguageContext';

const NewsletterForm = () => {
  const { t } = useLanguage();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    
    try {
      // TODO: Implement newsletter subscription API call
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulated API call
      setStatus('success');
      setEmail('');
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <div className="bg-vjn-gray p-8 rounded-lg">
      <h3 className="text-xl font-semibold mb-4">{t('newsletter.title')}</h3>
      <p className="text-gray-600 mb-6">{t('newsletter.description')}</p>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <Input
            type="email"
            placeholder={t('newsletter.emailPlaceholder')}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="flex-1"
          />
          <Button 
            type="submit" 
            className="bg-vjn-blue hover:bg-vjn-light-blue whitespace-nowrap"
            disabled={status === 'loading'}
          >
            {status === 'loading' ? t('newsletter.subscribing') : t('newsletter.subscribe')}
          </Button>
        </div>
        
        {status === 'success' && (
          <p className="text-green-600">{t('newsletter.success')}</p>
        )}
        {status === 'error' && (
          <p className="text-red-600">{t('newsletter.error')}</p>
        )}
      </form>
    </div>
  );
};

export default NewsletterForm; 
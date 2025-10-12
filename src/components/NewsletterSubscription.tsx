import React, { useState } from 'react';
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTranslation } from 'react-i18next';

const NewsletterSubscription = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [blogOptIn, setBlogOptIn] = useState(false);
  const { toast } = useToast();
  const { t } = useTranslation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, blogOptIn }),
      });

      const data = await response.json();

      if (response.ok) {
        toast({
          title: t('newsletter.success'),
          description: t('newsletter.successMessage'),
        });
        setEmail('');
        setBlogOptIn(false);
      } else {
        throw new Error(data.message || 'Something went wrong');
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: t('newsletter.error'),
        description: t('newsletter.errorMessage'),
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 max-w-md">
      <div className="flex flex-col sm:flex-row gap-2">
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={t('newsletter.emailPlaceholder')}
          required
          className="flex-grow"
          disabled={loading}
        />
        <Button type="submit" disabled={loading}>
          {loading ? t('newsletter.subscribing') : t('newsletter.subscribe')}
        </Button>
      </div>
      <label className="flex items-center gap-2 text-sm text-gray-300">
        <input
          type="checkbox"
          checked={blogOptIn}
          onChange={(e) => setBlogOptIn(e.target.checked)}
          disabled={loading}
        />
        <span>{t('newsletter.blogOptIn', 'Also send me new blog posts')}</span>
      </label>
    </form>
  );
};

export default NewsletterSubscription; 
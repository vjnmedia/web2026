import React from 'react';
import { useTranslation } from 'react-i18next';

const NewsUpdates: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">{t('news.title', 'News Updates')}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Add your news content here */}
      </div>
    </div>
  );
};

export default NewsUpdates; 
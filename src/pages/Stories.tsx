import React from 'react';
import { useTranslation } from 'react-i18next';

const Stories: React.FC = () => {
  const { t } = useTranslation();

  const stories = [
    {
      title: t('stories.story1.title'),
      content: t('stories.story1.content'),
      author: t('stories.story1.author'),
      role: t('stories.story1.role'),
    },
    {
      title: t('stories.story2.title'),
      content: t('stories.story2.content'),
      author: t('stories.story2.author'),
      role: t('stories.story2.role'),
    },
    {
      title: t('stories.story3.title'),
      content: t('stories.story3.content'),
      author: t('stories.story3.author'),
      role: t('stories.story3.role'),
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">{t('stories.title')}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stories.map((story, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-2">{story.title}</h2>
            <p className="text-gray-600 mb-4">{story.content}</p>
            <div className="text-sm text-gray-500">
              <p>{story.author}</p>
              <p>{story.role}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Stories; 
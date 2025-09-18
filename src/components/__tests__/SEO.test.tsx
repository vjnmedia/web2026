import React from 'react';
import { render, screen } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import SEO from '../SEO';

const renderWithHelmet = (component: React.ReactElement) => {
  return render(
    <HelmetProvider>
      {component}
    </HelmetProvider>
  );
};

describe('SEO Component', () => {
  it('renders with default props', () => {
    renderWithHelmet(<SEO />);
    
    expect(document.title).toBe('Vision Jeunesse Nouvelle - Empowering Youth for a Better Future');
  });

  it('renders with custom title', () => {
    renderWithHelmet(<SEO title="Custom Title" />);
    
    expect(document.title).toBe('Custom Title | Vision Jeunesse Nouvelle');
  });

  it('renders with custom description', () => {
    renderWithHelmet(<SEO description="Custom description" />);
    
    const metaDescription = document.querySelector('meta[name="description"]');
    expect(metaDescription).toHaveAttribute('content', 'Custom description');
  });

  it('renders Open Graph meta tags', () => {
    renderWithHelmet(
      <SEO 
        title="Test Title"
        description="Test Description"
        image="/test-image.jpg"
        url="https://test.com"
        type="article"
      />
    );

    expect(document.querySelector('meta[property="og:title"]')).toHaveAttribute('content', 'Test Title | Vision Jeunesse Nouvelle');
    expect(document.querySelector('meta[property="og:description"]')).toHaveAttribute('content', 'Test Description');
    expect(document.querySelector('meta[property="og:image"]')).toHaveAttribute('content', '/test-image.jpg');
    expect(document.querySelector('meta[property="og:url"]')).toHaveAttribute('content', 'https://test.com');
    expect(document.querySelector('meta[property="og:type"]')).toHaveAttribute('content', 'article');
  });

  it('renders Twitter Card meta tags', () => {
    renderWithHelmet(<SEO title="Test Title" description="Test Description" />);

    expect(document.querySelector('meta[name="twitter:card"]')).toHaveAttribute('content', 'summary_large_image');
    expect(document.querySelector('meta[name="twitter:title"]')).toHaveAttribute('content', 'Test Title | Vision Jeunesse Nouvelle');
    expect(document.querySelector('meta[name="twitter:description"]')).toHaveAttribute('content', 'Test Description');
  });

  it('renders structured data', () => {
    renderWithHelmet(<SEO />);

    const structuredData = document.querySelector('script[type="application/ld+json"]');
    expect(structuredData).toBeInTheDocument();
    
    const data = JSON.parse(structuredData?.textContent || '{}');
    expect(data['@type']).toBe('Organization');
    expect(data.name).toBe('Vision Jeunesse Nouvelle');
  });

  it('handles article type with additional props', () => {
    renderWithHelmet(
      <SEO 
        type="article"
        title="Article Title"
        author="John Doe"
        publishedTime="2024-01-01T00:00:00Z"
        tags={['tag1', 'tag2']}
      />
    );

    const structuredData = document.querySelector('script[type="application/ld+json"]');
    const data = JSON.parse(structuredData?.textContent || '{}');
    
    expect(data['@type']).toBe('Article');
    expect(data.headline).toBe('Article Title');
    expect(data.author.name).toBe('John Doe');
    expect(data.datePublished).toBe('2024-01-01T00:00:00Z');
    expect(data.keywords).toBe('tag1, tag2');
  });
});



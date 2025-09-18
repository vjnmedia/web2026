import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'profile';
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  section?: string;
  tags?: string[];
  noindex?: boolean;
  canonical?: string;
}

const SEO: React.FC<SEOProps> = ({
  title = "Vision Jeunesse Nouvelle - Empowering Youth for a Better Future",
  description = "Vision Jeunesse Nouvelle (VJN) is a youth development organization in Rwanda focused on education, health, economic empowerment, peace building, and cultural development.",
  image = "/images/VJN_LOGO.jpg",
  url = "https://visionjeunessenouvelle.org.rw",
  type = "website",
  author = "Vision Jeunesse Nouvelle",
  publishedTime,
  modifiedTime,
  section,
  tags = [],
  noindex = false,
  canonical
}) => {
  const fullTitle = title.includes("Vision Jeunesse Nouvelle") ? title : `${title} | Vision Jeunesse Nouvelle`;
  const fullImageUrl = image.startsWith('http') ? image : `${url}${image}`;
  const fullUrl = canonical || `${url}${typeof window !== 'undefined' ? window.location.pathname : ''}`;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": type === 'article' ? "Article" : "Organization",
    "name": "Vision Jeunesse Nouvelle",
    "alternateName": "VJN",
    "url": url,
    "logo": fullImageUrl,
    "description": description,
    "foundingDate": "2010",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Gisenyi Sector, Nengo Cell, Gikarani Village",
      "addressLocality": "Rubavu District",
      "addressRegion": "Western Province",
      "addressCountry": "Rwanda"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+250-784-847-218",
      "email": "visionjeunesse2050@gmail.com",
      "contactType": "General Inquiry"
    },
    "sameAs": [
      "https://www.facebook.com/visionjeunesse2",
      "https://www.twitter.com/visionjeunesse2",
      "https://www.instagram.com/visionjeunesse2",
      "https://www.linkedin.com/in/visionjeunesse2",
      "https://www.tiktok.com/@visionjeunesse2",
      "https://www.youtube.com/@visionjeunesse2"
    ],
    "areaServed": {
      "@type": "Country",
      "name": "Rwanda"
    },
    "knowsAbout": [
      "Youth Development",
      "Education",
      "Health Programs",
      "Economic Empowerment",
      "Peace Building",
      "Cultural Development",
      "Sports Programs"
    ]
  };

  if (type === 'article' && publishedTime) {
    structuredData["@type"] = "Article";
    structuredData["headline"] = title;
    structuredData["author"] = {
      "@type": "Person",
      "name": author
    };
    structuredData["datePublished"] = publishedTime;
    if (modifiedTime) {
      structuredData["dateModified"] = modifiedTime;
    }
    if (section) {
      structuredData["articleSection"] = section;
    }
    if (tags.length > 0) {
      structuredData["keywords"] = tags.join(", ");
    }
  }

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="author" content={author} />
      <meta name="robots" content={noindex ? "noindex,nofollow" : "index,follow"} />
      <link rel="canonical" href={fullUrl} />

      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImageUrl} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="Vision Jeunesse Nouvelle" />
      <meta property="og:locale" content="en_US" />
      <meta property="og:locale:alternate" content="fr_RW" />

      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@visionjeunesse2" />
      <meta name="twitter:creator" content="@visionjeunesse2" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImageUrl} />

      {/* Additional Meta Tags */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="theme-color" content="#1e40af" />
      <meta name="msapplication-TileColor" content="#1e40af" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content="VJN" />

      {/* Language and Region */}
      <meta name="language" content="English" />
      <meta name="geo.region" content="RW" />
      <meta name="geo.country" content="Rwanda" />
      <meta name="geo.placename" content="Rubavu District" />

      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>

      {/* Preconnect to external domains */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="preconnect" href="https://images.unsplash.com" />
    </Helmet>
  );
};

export default SEO;



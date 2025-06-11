import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Search as SearchIcon, Loader2 } from 'lucide-react';

interface SearchResult {
  title: string;
  description: string;
  url: string;
  type: 'page' | 'news' | 'program' | 'resource';
}

const Search: React.FC = () => {
  const [searchParams] = useSearchParams();
  const { t } = useTranslation();
  const query = searchParams.get('q') || '';
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSearchResults = async () => {
      setIsLoading(true);
      try {
        // TODO: Replace with actual API call
        // This is a mock implementation
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock results
        const mockResults: SearchResult[] = [
          {
            title: 'About Us',
            description: 'Learn about Vision Jeunesse Nouvelle\'s history, mission, and vision.',
            url: '/about',
            type: 'page'
          },
          {
            title: 'Education Program',
            description: 'Our comprehensive education and vocational training programs.',
            url: '/programs/education',
            type: 'program'
          },
          {
            title: 'Latest News',
            description: 'Stay updated with our latest news and announcements.',
            url: '/news',
            type: 'news'
          },
          {
            title: 'Resources',
            description: 'Access our resource library and documentation.',
            url: '/resources',
            type: 'resource'
          }
        ].filter(result => 
          result.title.toLowerCase().includes(query.toLowerCase()) ||
          result.description.toLowerCase().includes(query.toLowerCase())
        );

        setResults(mockResults);
      } catch (error) {
        console.error('Error fetching search results:', error);
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    };

    if (query) {
      fetchSearchResults();
    } else {
      setResults([]);
      setIsLoading(false);
    }
  }, [query]);

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Search Results</h1>
          <p className="text-gray-600">
            {query ? `Showing results for "${query}"` : 'Enter a search term to begin'}
          </p>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 text-vjn-blue animate-spin" />
          </div>
        ) : results.length > 0 ? (
          <div className="space-y-6">
            {results.map((result, index) => (
              <a
                key={index}
                href={result.url}
                className="block bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-start">
                  <div className="flex-1">
                    <h2 className="text-xl font-semibold text-gray-900 mb-2">
                      {result.title}
                    </h2>
                    <p className="text-gray-600 mb-2">{result.description}</p>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
                      {result.type}
                    </span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        ) : query ? (
          <div className="text-center py-12">
            <SearchIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No results found
            </h3>
            <p className="text-gray-600">
              Try adjusting your search terms or browse our site navigation
            </p>
          </div>
        ) : (
          <div className="text-center py-12">
            <SearchIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Start your search
            </h3>
            <p className="text-gray-600">
              Enter a search term in the search box above
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search; 
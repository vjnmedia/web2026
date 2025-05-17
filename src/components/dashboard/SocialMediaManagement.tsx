
import { useState } from 'react';
import { useLanguage } from '@/components/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Pencil, Trash2, Facebook, Twitter, Instagram } from 'lucide-react';

// Mock data for social media posts
const mockSocialPosts = [
  { 
    id: 1, 
    content: "Join us for our Youth Leadership Summit next week!", 
    platform: "Facebook", 
    scheduled: "2023-07-15", 
    status: "Scheduled" 
  },
  { 
    id: 2, 
    content: "Check out our latest blog post on youth empowerment!", 
    platform: "Twitter", 
    scheduled: "2023-07-10", 
    status: "Posted" 
  },
  { 
    id: 3, 
    content: "Photos from our Community Day event are now live on our website!", 
    platform: "Instagram", 
    scheduled: "2023-07-05", 
    status: "Posted" 
  },
  { 
    id: 4, 
    content: "Registration for our summer programs starts tomorrow!", 
    platform: "Facebook", 
    scheduled: "2023-07-20", 
    status: "Draft" 
  },
];

const SocialMediaManagement = () => {
  const { t } = useLanguage();
  const [socialPosts, setSocialPosts] = useState(mockSocialPosts);
  const [searchTerm, setSearchTerm] = useState('');
  const [activePlatform, setActivePlatform] = useState("all");

  const filteredPosts = socialPosts.filter(post => {
    const matchesSearch = post.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPlatform = activePlatform === "all" || post.platform.toLowerCase() === activePlatform.toLowerCase();
    return matchesSearch && matchesPlatform;
  });

  const handleAddPost = () => {
    console.log("Add new social media post");
  };

  const handleEditPost = (id: number) => {
    console.log("Edit social media post with id:", id);
  };

  const handleDeletePost = (id: number) => {
    console.log("Delete social media post with id:", id);
    setSocialPosts(socialPosts.filter(post => post.id !== id));
  };

  const getPlatformIcon = (platform: string) => {
    switch(platform.toLowerCase()) {
      case 'facebook':
        return <Facebook className="h-4 w-4 text-blue-600" />;
      case 'twitter':
        return <Twitter className="h-4 w-4 text-blue-400" />;
      case 'instagram':
        return <Instagram className="h-4 w-4 text-pink-600" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">{t('dashboard.socialMediaManagement')}</h2>
        <Button onClick={handleAddPost} className="bg-vjn-blue hover:bg-vjn-light-blue">
          <Plus className="mr-2 h-4 w-4" />
          {t('dashboard.addSocialPost')}
        </Button>
      </div>
      
      <div className="flex items-center">
        <Input
          placeholder={t('dashboard.searchSocialPosts')}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
      </div>
      
      <Tabs value={activePlatform} onValueChange={setActivePlatform}>
        <TabsList>
          <TabsTrigger value="all">{t('dashboard.allPlatforms')}</TabsTrigger>
          <TabsTrigger value="facebook">Facebook</TabsTrigger>
          <TabsTrigger value="twitter">Twitter</TabsTrigger>
          <TabsTrigger value="instagram">Instagram</TabsTrigger>
        </TabsList>
        
        <TabsContent value={activePlatform} className="pt-4">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t('dashboard.platform')}</TableHead>
                  <TableHead>{t('dashboard.content')}</TableHead>
                  <TableHead>{t('dashboard.scheduledDate')}</TableHead>
                  <TableHead>{t('dashboard.status')}</TableHead>
                  <TableHead className="text-right">{t('dashboard.actions')}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPosts.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-4">
                      {t('dashboard.noSocialPosts')}
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredPosts.map((post) => (
                    <TableRow key={post.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getPlatformIcon(post.platform)}
                          {post.platform}
                        </div>
                      </TableCell>
                      <TableCell className="max-w-xs truncate">{post.content}</TableCell>
                      <TableCell>{post.scheduled}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          post.status === 'Posted' ? 'bg-green-100 text-green-800' : 
                          post.status === 'Scheduled' ? 'bg-blue-100 text-blue-800' : 
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {post.status}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon" onClick={() => handleEditPost(post.id)}>
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDeletePost(post.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SocialMediaManagement;


import { useState } from 'react';
import { useLanguage } from '@/components/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Pencil, Trash2, Eye } from 'lucide-react';

// Mock data for blog posts
const mockBlogPosts = [
  { 
    id: 1, 
    title: "Youth Leadership Summit 2023", 
    category: "Events", 
    author: "Emmanuel Mugisha", 
    date: "2023-05-20",
    status: "Published"
  },
  { 
    id: 2, 
    title: "Success Stories from Our Vocational Training", 
    category: "Education", 
    author: "Christine Uwimana", 
    date: "2023-04-15",
    status: "Published"
  },
  { 
    id: 3, 
    title: "Health Awareness Campaign Results", 
    category: "Health", 
    author: "Jean Paul Habimana", 
    date: "2023-06-10",
    status: "Draft"
  },
  { 
    id: 4, 
    title: "Community Peacebuilding Workshop", 
    category: "Peace", 
    author: "Alice Mukamana", 
    date: "2023-03-28",
    status: "Published"
  },
];

const BlogManagement = () => {
  const { t } = useLanguage();
  const [blogPosts, setBlogPosts] = useState(mockBlogPosts);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPosts = blogPosts.filter(post => 
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddPost = () => {
    console.log("Add new blog post");
  };

  const handleViewPost = (id: number) => {
    console.log("View blog post with id:", id);
  };

  const handleEditPost = (id: number) => {
    console.log("Edit blog post with id:", id);
  };

  const handleDeletePost = (id: number) => {
    console.log("Delete blog post with id:", id);
    setBlogPosts(blogPosts.filter(post => post.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">{t('dashboard.blogManagement')}</h2>
        <Button onClick={handleAddPost} className="bg-vjn-blue hover:bg-vjn-light-blue">
          <Plus className="mr-2 h-4 w-4" />
          {t('dashboard.addPost')}
        </Button>
      </div>
      
      <div className="flex items-center">
        <Input
          placeholder={t('dashboard.searchPosts')}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
      </div>
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t('dashboard.title')}</TableHead>
              <TableHead>{t('dashboard.category')}</TableHead>
              <TableHead>{t('dashboard.author')}</TableHead>
              <TableHead>{t('dashboard.date')}</TableHead>
              <TableHead>{t('dashboard.status')}</TableHead>
              <TableHead className="text-right">{t('dashboard.actions')}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPosts.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-4">
                  {t('dashboard.noPosts')}
                </TableCell>
              </TableRow>
            ) : (
              filteredPosts.map((post) => (
                <TableRow key={post.id}>
                  <TableCell>{post.title}</TableCell>
                  <TableCell>{post.category}</TableCell>
                  <TableCell>{post.author}</TableCell>
                  <TableCell>{post.date}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      post.status === 'Published' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {post.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" onClick={() => handleViewPost(post.id)}>
                      <Eye className="h-4 w-4" />
                    </Button>
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
    </div>
  );
};

export default BlogManagement;

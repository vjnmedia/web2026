import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import RichTextEditor from '@/components/ui/rich-text-editor';
import { toast } from 'sonner';
import { pageService, type Page } from '@/services/pageService';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Pencil, Trash2 } from 'lucide-react';

export function PageManagement() {
    const { t } = useTranslation();
    const { user } = useAuth();
    const [pages, setPages] = useState<Page[]>([]);
    const [selectedPage, setSelectedPage] = useState<Page | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        slug: '',
        title: '',
        content: '',
        language: 'en',
        status: 'draft' as const
    });

    useEffect(() => {
        console.log('PageManagement mounted, user:', user);
        if (user) {
            loadPages();
        }
    }, [user]);

    const loadPages = async () => {
        try {
            setIsLoading(true);
            const data = await pageService.getPages();
            setPages(data);
        } catch (error) {
            console.error('Error loading pages:', error);
            toast.error(t('errors.pages.load'));
        } finally {
            setIsLoading(false);
        }
    };

    const handleCreatePage = async () => {
        setIsLoading(true);
        try {
            await pageService.createPage(formData);
            toast.success(t('success.pages.create'));
            loadPages();
            resetForm();
        } catch (error) {
            toast.error(t('errors.pages.create'));
        } finally {
            setIsLoading(false);
        }
    };

    const handleUpdatePage = async () => {
        if (!selectedPage) return;
        setIsLoading(true);
        try {
            await pageService.updatePage(selectedPage.id, formData);
            toast.success(t('success.pages.update'));
            loadPages();
            resetForm();
        } catch (error) {
            toast.error(t('errors.pages.update'));
        } finally {
            setIsLoading(false);
        }
    };

    const handleDeletePage = async (id: string) => {
        if (!confirm(t('confirm.pages.delete'))) return;
        try {
            await pageService.deletePage(id);
            toast.success(t('success.pages.delete'));
            loadPages();
            resetForm();
        } catch (error) {
            toast.error(t('errors.pages.delete'));
        }
    };

    const resetForm = () => {
        setFormData({
            slug: '',
            title: '',
            content: '',
            language: 'en',
            status: 'draft'
        });
        setSelectedPage(null);
        setIsEditing(false);
    };

    const handleEdit = (page: Page) => {
        setSelectedPage(page);
        setFormData({
            slug: page.slug,
            title: page.title,
            content: page.content,
            language: page.language,
            status: page.status
        });
        setIsEditing(true);
    };

    if (!user) {
        console.log('No user found in PageManagement');
        return (
            <div className="flex items-center justify-center p-8">
                <div className="text-center">
                    <h2 className="text-xl font-semibold mb-2">{t('errors.unauthorized')}</h2>
                    <p className="text-gray-600">Please log in to access this page.</p>
                </div>
            </div>
        );
    }

    console.log('Checking user role:', user.role);
    if (user.role !== 'admin' && user.role !== 'editor') {
        console.log('User role check failed:', { role: user.role });
        return (
            <div className="flex items-center justify-center p-8">
                <div className="text-center">
                    <h2 className="text-xl font-semibold mb-2">{t('errors.unauthorized')}</h2>
                    <p className="text-gray-600">You need admin or editor privileges to access this page.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">{t('pages.management')}</h2>
                <Button onClick={() => resetForm()} className="bg-vjn-blue hover:bg-vjn-light-blue">
                    <Plus className="mr-2 h-4 w-4" />
                    {isEditing ? t('common.cancel') : t('pages.create')}
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>{isEditing ? t('pages.edit') : t('pages.create')}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <Label htmlFor="slug">{t('pages.slug')}</Label>
                            <Input
                                id="slug"
                                value={formData.slug}
                                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                                placeholder={t('pages.slugPlaceholder')}
                            />
                        </div>
                        <div>
                            <Label htmlFor="title">{t('pages.title')}</Label>
                            <Input
                                id="title"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                placeholder={t('pages.titlePlaceholder')}
                            />
                        </div>
                        <div>
                            <Label htmlFor="language">{t('pages.language')}</Label>
                            <Select
                                value={formData.language}
                                onValueChange={(value) => setFormData({ ...formData, language: value })}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder={t('pages.selectLanguage')} />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="en">{t('common.language.en')}</SelectItem>
                                    <SelectItem value="fr">{t('common.language.fr')}</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <Label htmlFor="status">{t('pages.status')}</Label>
                            <Select
                                value={formData.status}
                                onValueChange={(value: 'draft' | 'published' | 'archived') => setFormData({ ...formData, status: value })}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder={t('pages.selectStatus')} />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="draft">{t('pages.draft')}</SelectItem>
                                    <SelectItem value="published">{t('pages.published')}</SelectItem>
                                    <SelectItem value="archived">{t('pages.archived')}</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <Label htmlFor="content">{t('pages.content')}</Label>
                            <RichTextEditor
                                value={formData.content}
                                onChange={(content) => setFormData({ ...formData, content })}
                            />
                        </div>
                        <Button
                            onClick={isEditing ? handleUpdatePage : handleCreatePage}
                            disabled={isLoading}
                            className="w-full bg-vjn-blue hover:bg-vjn-light-blue"
                        >
                            {isEditing ? t('common.update') : t('common.create')}
                        </Button>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>{t('pages.list')}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {pages.map((page) => (
                                <div
                                    key={page.id}
                                    className="flex items-center justify-between p-4 border rounded-lg"
                                >
                                    <div>
                                        <h4 className="font-medium">{page.title}</h4>
                                        <p className="text-sm text-gray-500">
                                            {page.slug} - {page.language} - {page.status}
                                        </p>
                                    </div>
                                    <div className="space-x-2">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => handleEdit(page)}
                                        >
                                            <Pencil className="h-4 w-4" />
                                        </Button>
                                        {user.role === 'admin' && (
                                            <Button
                                                variant="destructive"
                                                size="sm"
                                                onClick={() => handleDeletePage(page.id)}
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
} 
import React from 'react';
import { useLanguage } from '@/components/LanguageContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, FileText, Image, Settings, Sliders } from 'lucide-react';
import { UserManagement } from './UserManagement';
import { PageManagement } from './PageManagement';
import { SliderManagement } from './SliderManagement';
import ImageManager from '@/pages/ImageManager';

export default function AdminSettings() {
    const { t } = useLanguage();

    return (
        <div className="container mx-auto py-6 space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">{t('dashboard.adminSettings.title')}</h1>
                <p className="text-muted-foreground">{t('dashboard.adminSettingsDescription')}</p>
            </div>

            <Tabs defaultValue="users" className="space-y-4">
                <TabsList>
                    <TabsTrigger value="users" className="flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        {t('dashboard.users')}
                    </TabsTrigger>
                    <TabsTrigger value="pages" className="flex items-center gap-2">
                        <FileText className="h-4 w-4" />
                        {t('dashboard.pages')}
                    </TabsTrigger>
                    <TabsTrigger value="slider" className="flex items-center gap-2">
                        <Sliders className="h-4 w-4" />
                        {t('dashboard.slider')}
                    </TabsTrigger>
                    <TabsTrigger value="media" className="flex items-center gap-2">
                        <Image className="h-4 w-4" />
                        {t('dashboard.media')}
                    </TabsTrigger>
                    <TabsTrigger value="settings" className="flex items-center gap-2">
                        <Settings className="h-4 w-4" />
                        {t('dashboard.settings')}
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="users">
                    <Card>
                        <CardHeader>
                            <CardTitle>{t('dashboard.users')}</CardTitle>
                            <CardDescription>{t('dashboard.usersDescription')}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <UserManagement />
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="pages">
                    <Card>
                        <CardHeader>
                            <CardTitle>{t('dashboard.pages')}</CardTitle>
                            <CardDescription>{t('dashboard.pagesDescription')}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <PageManagement />
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="slider">
                    <Card>
                        <CardHeader>
                            <CardTitle>{t('dashboard.slider')}</CardTitle>
                            <CardDescription>{t('dashboard.sliderDescription')}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <SliderManagement />
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="media">
                    <Card>
                        <CardHeader>
                            <CardTitle>{t('dashboard.media')}</CardTitle>
                            <CardDescription>{t('dashboard.mediaDescription')}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ImageManager />
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="settings">
                    <Card>
                        <CardHeader>
                            <CardTitle>{t('dashboard.settings')}</CardTitle>
                            <CardDescription>{t('dashboard.settingsDescription')}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="text-center py-8">
                                <p className="text-muted-foreground">{t('dashboard.comingSoon')}</p>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
} 
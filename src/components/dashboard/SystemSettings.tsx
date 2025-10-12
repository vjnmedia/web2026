import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/components/LanguageContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Globe, Save, RefreshCw, CheckCircle, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';
import { settingsService, type SystemSettings } from '@/services/settingsService';

export default function SystemSettings() {
    const { t } = useLanguage();
    const [settings, setSettings] = useState<SystemSettings | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [hasChanges, setHasChanges] = useState(false);

    const [formData, setFormData] = useState({
        site_name: '',
        site_description: '',
        default_language: 'en',
        theme: 'light',
        email_notifications: true,
        cache_enabled: true,
        log_retention: 30
    });

    useEffect(() => {
        loadSettings();
    }, []);

    const loadSettings = async () => {
        try {
            setIsLoading(true);
            const data = await settingsService.getSettings();
            setSettings(data);
            setFormData({
                site_name: data.site_name,
                site_description: data.site_description,
                default_language: data.default_language,
                theme: data.theme,
                email_notifications: data.email_notifications,
                cache_enabled: data.cache_enabled,
                log_retention: data.log_retention
            });
        } catch (error) {
            console.error('Error loading settings:', error);
            toast.error('Failed to load system settings');
        } finally {
            setIsLoading(false);
        }
    };

    const handleSave = async () => {
        if (!settings) return;
        
        try {
            setIsSaving(true);
            await settingsService.updateSettings(formData);
            setSettings({ ...settings, ...formData });
            setHasChanges(false);
            toast.success('System settings updated successfully');
        } catch (error) {
            console.error('Error saving settings:', error);
            toast.error('Failed to save system settings');
        } finally {
            setIsSaving(false);
        }
    };

    const handleReset = () => {
        if (settings) {
            setFormData({
                site_name: settings.site_name,
                site_description: settings.site_description,
                default_language: settings.default_language,
                theme: settings.theme,
                email_notifications: settings.email_notifications,
                cache_enabled: settings.cache_enabled,
                log_retention: settings.log_retention
            });
            setHasChanges(false);
        }
    };

    const handleInputChange = (field: string, value: any) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        setHasChanges(true);
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center py-12">
                <div className="text-center">
                    <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4 text-gray-400" />
                    <p className="text-gray-600">Loading system settings...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Status Card */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Globe className="h-5 w-5" />
                        System Status
                    </CardTitle>
                    <CardDescription>
                        Current system configuration and status
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="flex items-center space-x-3">
                            <div className="flex-shrink-0">
                                {settings?.maintenance_mode ? (
                                    <AlertCircle className="h-5 w-5 text-orange-500" />
                                ) : (
                                    <CheckCircle className="h-5 w-5 text-green-500" />
                                )}
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-900">System Status</p>
                                <Badge variant={settings?.maintenance_mode ? "destructive" : "default"}>
                                    {settings?.maintenance_mode ? 'Maintenance Mode' : 'Operational'}
                                </Badge>
                            </div>
                        </div>
                        <div className="flex items-center space-x-3">
                            <div className="flex-shrink-0">
                                <CheckCircle className="h-5 w-5 text-green-500" />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-900">Cache Status</p>
                                <Badge variant={settings?.cache_enabled ? "default" : "secondary"}>
                                    {settings?.cache_enabled ? 'Enabled' : 'Disabled'}
                                </Badge>
                            </div>
                        </div>
                        <div className="flex items-center space-x-3">
                            <div className="flex-shrink-0">
                                <CheckCircle className="h-5 w-5 text-green-500" />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-900">Security Level</p>
                                <Badge variant="default" className="capitalize">
                                    {settings?.security_level}
                                </Badge>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Site Configuration */}
            <Card>
                <CardHeader>
                    <CardTitle>Site Configuration</CardTitle>
                    <CardDescription>
                        Basic site information and appearance settings
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="site_name">{t('dashboard.adminSettings.siteName')}</Label>
                            <Input
                                id="site_name"
                                value={formData.site_name}
                                onChange={(e) => handleInputChange('site_name', e.target.value)}
                                placeholder={t('dashboard.adminSettings.siteNamePlaceholder')}
                            />
                            <p className="text-xs text-gray-500">
                                {t('dashboard.adminSettings.siteNameHelp')}
                            </p>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="default_language">{t('dashboard.adminSettings.defaultLanguage')}</Label>
                            <Select
                                value={formData.default_language}
                                onValueChange={(value) => handleInputChange('default_language', value)}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder={t('dashboard.adminSettings.defaultLanguagePlaceholder')} />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="en">English</SelectItem>
                                    <SelectItem value="fr">Français</SelectItem>
                                </SelectContent>
                            </Select>
                            <p className="text-xs text-gray-500">
                                {t('dashboard.adminSettings.defaultLanguageHelp')}
                            </p>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="site_description">{t('dashboard.adminSettings.siteDescription')}</Label>
                        <Textarea
                            id="site_description"
                            value={formData.site_description}
                            onChange={(e) => handleInputChange('site_description', e.target.value)}
                            placeholder={t('dashboard.adminSettings.siteDescriptionPlaceholder')}
                            rows={3}
                        />
                        <p className="text-xs text-gray-500">
                            {t('dashboard.adminSettings.siteDescriptionHelp')}
                        </p>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="theme">{t('dashboard.adminSettings.theme')}</Label>
                        <Select
                            value={formData.theme}
                            onValueChange={(value) => handleInputChange('theme', value)}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder={t('dashboard.adminSettings.themePlaceholder')} />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="light">{t('dashboard.adminSettings.themeLight')}</SelectItem>
                                <SelectItem value="dark">{t('dashboard.adminSettings.themeDark')}</SelectItem>
                                <SelectItem value="system">{t('dashboard.adminSettings.themeSystem')}</SelectItem>
                            </SelectContent>
                        </Select>
                        <p className="text-xs text-gray-500">
                            {t('dashboard.adminSettings.themeHelp')}
                        </p>
                    </div>
                </CardContent>
            </Card>

            {/* System Preferences */}
            <Card>
                <CardHeader>
                    <CardTitle>System Preferences</CardTitle>
                    <CardDescription>
                        Configure system behavior and performance settings
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <Label htmlFor="email_notifications">Email Notifications</Label>
                            <p className="text-sm text-gray-500">
                                Enable email notifications for system events
                            </p>
                        </div>
                        <Switch
                            id="email_notifications"
                            checked={formData.email_notifications}
                            onCheckedChange={(checked) => handleInputChange('email_notifications', checked)}
                        />
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <Label htmlFor="cache_enabled">Cache System</Label>
                            <p className="text-sm text-gray-500">
                                Enable caching to improve performance
                            </p>
                        </div>
                        <Switch
                            id="cache_enabled"
                            checked={formData.cache_enabled}
                            onCheckedChange={(checked) => handleInputChange('cache_enabled', checked)}
                        />
                    </div>

                    <Separator />

                    <div className="space-y-2">
                        <Label htmlFor="log_retention">Log Retention (Days)</Label>
                        <Input
                            id="log_retention"
                            type="number"
                            min="1"
                            max="365"
                            value={formData.log_retention}
                            onChange={(e) => handleInputChange('log_retention', parseInt(e.target.value))}
                        />
                        <p className="text-xs text-gray-500">
                            Number of days to keep system logs
                        </p>
                    </div>
                </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex items-center justify-between pt-6 border-t">
                <div className="text-sm text-gray-500">
                    {hasChanges && (
                        <span className="flex items-center gap-1 text-orange-600">
                            <AlertCircle className="h-4 w-4" />
                            You have unsaved changes
                        </span>
                    )}
                </div>
                <div className="flex items-center gap-3">
                    <Button
                        variant="outline"
                        onClick={handleReset}
                        disabled={!hasChanges || isSaving}
                    >
                        <RefreshCw className="h-4 w-4 mr-2" />
                        Reset
                    </Button>
                    <Button
                        onClick={handleSave}
                        disabled={!hasChanges || isSaving}
                        className="bg-vjn-blue hover:bg-vjn-light-blue"
                    >
                        {isSaving ? (
                            <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                        ) : (
                            <Save className="h-4 w-4 mr-2" />
                        )}
                        Save Changes
                    </Button>
                </div>
            </div>
        </div>
    );
}


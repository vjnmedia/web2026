import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/components/LanguageContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Shield, 
  Save, 
  RefreshCw, 
  CheckCircle, 
  AlertTriangle, 
  Lock,
  Eye,
  EyeOff,
  AlertCircle
} from 'lucide-react';
import { toast } from 'sonner';
import { settingsService, type SystemSettings } from '@/services/settingsService';

export default function SecuritySettings() {
    const { t } = useLanguage();
    const [settings, setSettings] = useState<SystemSettings | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [hasChanges, setHasChanges] = useState(false);

    const [formData, setFormData] = useState({
        maintenance_mode: false,
        security_level: 'high',
        api_enabled: false
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
                maintenance_mode: data.maintenance_mode,
                security_level: data.security_level,
                api_enabled: data.api_enabled
            });
        } catch (error) {
            console.error('Error loading settings:', error);
            toast.error('Failed to load security settings');
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
            toast.success('Security settings updated successfully');
        } catch (error) {
            console.error('Error saving settings:', error);
            toast.error('Failed to save security settings');
        } finally {
            setIsSaving(false);
        }
    };

    const handleReset = () => {
        if (settings) {
            setFormData({
                maintenance_mode: settings.maintenance_mode,
                security_level: settings.security_level,
                api_enabled: settings.api_enabled
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
                    <p className="text-gray-600">Loading security settings...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Security Status */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Shield className="h-5 w-5" />
                        Security Status
                    </CardTitle>
                    <CardDescription>
                        Current security configuration and system status
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="flex items-center space-x-3">
                            <div className="flex-shrink-0">
                                {formData.maintenance_mode ? (
                                    <AlertTriangle className="h-5 w-5 text-orange-500" />
                                ) : (
                                    <CheckCircle className="h-5 w-5 text-green-500" />
                                )}
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-900">Maintenance Mode</p>
                                <Badge variant={formData.maintenance_mode ? "destructive" : "default"}>
                                    {formData.maintenance_mode ? 'Enabled' : 'Disabled'}
                                </Badge>
                            </div>
                        </div>
                        <div className="flex items-center space-x-3">
                            <div className="flex-shrink-0">
                                <Lock className="h-5 w-5 text-blue-500" />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-900">Security Level</p>
                                <Badge variant="default" className="capitalize">
                                    {formData.security_level}
                                </Badge>
                            </div>
                        </div>
                        <div className="flex items-center space-x-3">
                            <div className="flex-shrink-0">
                                {formData.api_enabled ? (
                                    <Eye className="h-5 w-5 text-green-500" />
                                ) : (
                                    <EyeOff className="h-5 w-5 text-gray-400" />
                                )}
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-900">API Access</p>
                                <Badge variant={formData.api_enabled ? "default" : "secondary"}>
                                    {formData.api_enabled ? 'Enabled' : 'Disabled'}
                                </Badge>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Maintenance Mode */}
            <Card>
                <CardHeader>
                    <CardTitle>Maintenance Mode</CardTitle>
                    <CardDescription>
                        Control system access during maintenance or updates
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {formData.maintenance_mode && (
                        <Alert>
                            <AlertTriangle className="h-4 w-4" />
                            <AlertDescription>
                                Maintenance mode is currently enabled. Users will see a maintenance page instead of the normal site.
                            </AlertDescription>
                        </Alert>
                    )}
                    
                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <Label htmlFor="maintenance_mode">Enable Maintenance Mode</Label>
                            <p className="text-sm text-gray-500">
                                {t('dashboard.adminSettings.maintenanceHelp')}
                            </p>
                        </div>
                        <Switch
                            id="maintenance_mode"
                            checked={formData.maintenance_mode}
                            onCheckedChange={(checked) => handleInputChange('maintenance_mode', checked)}
                        />
                    </div>
                </CardContent>
            </Card>

            {/* Security Policies */}
            <Card>
                <CardHeader>
                    <CardTitle>Security Policies</CardTitle>
                    <CardDescription>
                        Configure security levels and access policies
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="security_level">{t('dashboard.adminSettings.securityLevel')}</Label>
                        <Select
                            value={formData.security_level}
                            onValueChange={(value) => handleInputChange('security_level', value)}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder={t('dashboard.adminSettings.securityLevelPlaceholder')} />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="low">
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                        {t('dashboard.adminSettings.securityLow')} - Basic protection
                                    </div>
                                </SelectItem>
                                <SelectItem value="medium">
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                                        {t('dashboard.adminSettings.securityMedium')} - Enhanced protection
                                    </div>
                                </SelectItem>
                                <SelectItem value="high">
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                                        {t('dashboard.adminSettings.securityHigh')} - Maximum protection
                                    </div>
                                </SelectItem>
                            </SelectContent>
                        </Select>
                        <p className="text-xs text-gray-500">
                            {t('dashboard.adminSettings.securityLevelHelp')}
                        </p>
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <Label htmlFor="api_enabled">API Access</Label>
                            <p className="text-sm text-gray-500">
                                Enable or disable API access for external integrations
                            </p>
                        </div>
                        <Switch
                            id="api_enabled"
                            checked={formData.api_enabled}
                            onCheckedChange={(checked) => handleInputChange('api_enabled', checked)}
                        />
                    </div>
                </CardContent>
            </Card>

            {/* Security Recommendations */}
            <Card>
                <CardHeader>
                    <CardTitle>Security Recommendations</CardTitle>
                    <CardDescription>
                        Best practices and recommendations for your security configuration
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div className="flex items-start space-x-3">
                            <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                            <div>
                                <p className="text-sm font-medium text-gray-900">Regular Backups</p>
                                <p className="text-sm text-gray-500">
                                    Ensure regular backups are configured and tested
                                </p>
                            </div>
                        </div>
                        <div className="flex items-start space-x-3">
                            <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                            <div>
                                <p className="text-sm font-medium text-gray-900">Strong Passwords</p>
                                <p className="text-sm text-gray-500">
                                    Enforce strong password policies for all user accounts
                                </p>
                            </div>
                        </div>
                        <div className="flex items-start space-x-3">
                            <AlertCircle className="h-5 w-5 text-orange-500 mt-0.5" />
                            <div>
                                <p className="text-sm font-medium text-gray-900">Monitor Access Logs</p>
                                <p className="text-sm text-gray-500">
                                    Regularly review access logs for suspicious activity
                                </p>
                            </div>
                        </div>
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


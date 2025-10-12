import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/components/LanguageContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Mail, 
  Save, 
  RefreshCw, 
  CheckCircle, 
  AlertCircle, 
  Send,
  Eye,
  EyeOff,
  TestTube
} from 'lucide-react';
import { toast } from 'sonner';
import { settingsService, type SystemSettings } from '@/services/settingsService';

export default function EmailSettings() {
    const { t } = useLanguage();
    const [settings, setSettings] = useState<SystemSettings | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [isTesting, setIsTesting] = useState(false);
    const [hasChanges, setHasChanges] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const [formData, setFormData] = useState({
        email_notifications: true,
        smtp_host: '',
        smtp_port: 587,
        smtp_user: '',
        smtp_password: '',
        smtp_secure: false
    });

    const [testEmail, setTestEmail] = useState('');

    useEffect(() => {
        loadSettings();
    }, []);

    const loadSettings = async () => {
        try {
            setIsLoading(true);
            const data = await settingsService.getSettings();
            setSettings(data);
            setFormData({
                email_notifications: data.email_notifications,
                smtp_host: data.smtp_host || '',
                smtp_port: data.smtp_port || 587,
                smtp_user: data.smtp_user || '',
                smtp_password: '', // Never load password from settings
                smtp_secure: data.smtp_secure || false
            });
        } catch (error) {
            console.error('Error loading settings:', error);
            toast.error('Failed to load email settings');
        } finally {
            setIsLoading(false);
        }
    };

    const handleSave = async () => {
        if (!settings) return;
        
        try {
            setIsSaving(true);
            const updateData = { ...formData };
            // Only update password if it's been entered
            if (!updateData.smtp_password) {
                delete updateData.smtp_password;
            }
            
            await settingsService.updateSettings(updateData);
            setSettings({ ...settings, ...updateData });
            setHasChanges(false);
            toast.success('Email settings updated successfully');
        } catch (error) {
            console.error('Error saving settings:', error);
            toast.error('Failed to save email settings');
        } finally {
            setIsSaving(false);
        }
    };

    const handleTestEmail = async () => {
        if (!testEmail || !formData.smtp_host || !formData.smtp_user || !formData.smtp_password) {
            toast.error('Please fill in all required fields and test email address');
            return;
        }

        try {
            setIsTesting(true);
            const testSettings = {
                smtp_host: formData.smtp_host,
                smtp_port: formData.smtp_port,
                smtp_user: formData.smtp_user,
                smtp_password: formData.smtp_password,
                smtp_secure: formData.smtp_secure
            };

            await settingsService.testEmailSettings(testSettings);
            toast.success('Test email sent successfully!');
        } catch (error) {
            console.error('Error testing email:', error);
            toast.error('Failed to send test email. Please check your settings.');
        } finally {
            setIsTesting(false);
        }
    };

    const handleReset = () => {
        if (settings) {
            setFormData({
                email_notifications: settings.email_notifications,
                smtp_host: settings.smtp_host || '',
                smtp_port: settings.smtp_port || 587,
                smtp_user: settings.smtp_user || '',
                smtp_password: '',
                smtp_secure: settings.smtp_secure || false
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
                    <p className="text-gray-600">Loading email settings...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Email Status */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Mail className="h-5 w-5" />
                        Email Configuration Status
                    </CardTitle>
                    <CardDescription>
                        Current email settings and notification status
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-center space-x-3">
                            <div className="flex-shrink-0">
                                {formData.email_notifications ? (
                                    <CheckCircle className="h-5 w-5 text-green-500" />
                                ) : (
                                    <AlertCircle className="h-5 w-5 text-gray-400" />
                                )}
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-900">Email Notifications</p>
                                <Badge variant={formData.email_notifications ? "default" : "secondary"}>
                                    {formData.email_notifications ? 'Enabled' : 'Disabled'}
                                </Badge>
                            </div>
                        </div>
                        <div className="flex items-center space-x-3">
                            <div className="flex-shrink-0">
                                {formData.smtp_host ? (
                                    <CheckCircle className="h-5 w-5 text-green-500" />
                                ) : (
                                    <AlertCircle className="h-5 w-5 text-orange-500" />
                                )}
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-900">SMTP Configuration</p>
                                <Badge variant={formData.smtp_host ? "default" : "destructive"}>
                                    {formData.smtp_host ? 'Configured' : 'Not Configured'}
                                </Badge>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Email Notifications */}
            <Card>
                <CardHeader>
                    <CardTitle>Email Notifications</CardTitle>
                    <CardDescription>
                        Configure email notification preferences
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <Label htmlFor="email_notifications">Enable Email Notifications</Label>
                            <p className="text-sm text-gray-500">
                                Send email notifications for system events and user activities
                            </p>
                        </div>
                        <Switch
                            id="email_notifications"
                            checked={formData.email_notifications}
                            onCheckedChange={(checked) => handleInputChange('email_notifications', checked)}
                        />
                    </div>
                </CardContent>
            </Card>

            {/* SMTP Configuration */}
            <Card>
                <CardHeader>
                    <CardTitle>SMTP Configuration</CardTitle>
                    <CardDescription>
                        Configure SMTP settings for sending emails
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="smtp_host">SMTP Host</Label>
                            <Input
                                id="smtp_host"
                                value={formData.smtp_host}
                                onChange={(e) => handleInputChange('smtp_host', e.target.value)}
                                placeholder="smtp.gmail.com"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="smtp_port">SMTP Port</Label>
                            <Input
                                id="smtp_port"
                                type="number"
                                value={formData.smtp_port}
                                onChange={(e) => handleInputChange('smtp_port', parseInt(e.target.value))}
                                placeholder="587"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="smtp_user">SMTP Username</Label>
                        <Input
                            id="smtp_user"
                            value={formData.smtp_user}
                            onChange={(e) => handleInputChange('smtp_user', e.target.value)}
                            placeholder="your-email@example.com"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="smtp_password">SMTP Password</Label>
                        <div className="relative">
                            <Input
                                id="smtp_password"
                                type={showPassword ? "text" : "password"}
                                value={formData.smtp_password}
                                onChange={(e) => handleInputChange('smtp_password', e.target.value)}
                                placeholder="Enter your SMTP password"
                            />
                            <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? (
                                    <EyeOff className="h-4 w-4" />
                                ) : (
                                    <Eye className="h-4 w-4" />
                                )}
                            </Button>
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <Label htmlFor="smtp_secure">Use SSL/TLS</Label>
                            <p className="text-sm text-gray-500">
                                Enable secure connection (recommended for most providers)
                            </p>
                        </div>
                        <Switch
                            id="smtp_secure"
                            checked={formData.smtp_secure}
                            onCheckedChange={(checked) => handleInputChange('smtp_secure', checked)}
                        />
                    </div>
                </CardContent>
            </Card>

            {/* Test Email */}
            <Card>
                <CardHeader>
                    <CardTitle>Test Email Configuration</CardTitle>
                    <CardDescription>
                        Send a test email to verify your SMTP settings
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="test_email">Test Email Address</Label>
                        <Input
                            id="test_email"
                            type="email"
                            value={testEmail}
                            onChange={(e) => setTestEmail(e.target.value)}
                            placeholder="test@example.com"
                        />
                    </div>
                    
                    <Button
                        onClick={handleTestEmail}
                        disabled={isTesting || !testEmail || !formData.smtp_host}
                        variant="outline"
                        className="w-full"
                    >
                        {isTesting ? (
                            <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                        ) : (
                            <Send className="h-4 w-4 mr-2" />
                        )}
                        Send Test Email
                    </Button>
                </CardContent>
            </Card>

            {/* Common SMTP Providers */}
            <Card>
                <CardHeader>
                    <CardTitle>Common SMTP Providers</CardTitle>
                    <CardDescription>
                        Quick reference for popular email providers
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <h4 className="font-medium">Gmail</h4>
                            <p className="text-sm text-gray-600">Host: smtp.gmail.com</p>
                            <p className="text-sm text-gray-600">Port: 587 (TLS) or 465 (SSL)</p>
                        </div>
                        <div className="space-y-2">
                            <h4 className="font-medium">Outlook/Hotmail</h4>
                            <p className="text-sm text-gray-600">Host: smtp-mail.outlook.com</p>
                            <p className="text-sm text-gray-600">Port: 587 (TLS)</p>
                        </div>
                        <div className="space-y-2">
                            <h4 className="font-medium">Yahoo</h4>
                            <p className="text-sm text-gray-600">Host: smtp.mail.yahoo.com</p>
                            <p className="text-sm text-gray-600">Port: 587 (TLS) or 465 (SSL)</p>
                        </div>
                        <div className="space-y-2">
                            <h4 className="font-medium">Custom</h4>
                            <p className="text-sm text-gray-600">Contact your hosting provider</p>
                            <p className="text-sm text-gray-600">for SMTP details</p>
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

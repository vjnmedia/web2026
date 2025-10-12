import React, { useState } from 'react';
import { useLanguage } from '@/components/LanguageContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  FileText, 
  Image, 
  Settings, 
  Sliders, 
  Shield, 
  Mail, 
  Database,
  Globe,
  Bell,
  Server
} from 'lucide-react';
import { UserManagement } from './UserManagement';
import { PageManagement } from './PageManagement';
import { SliderManagement } from './SliderManagement';
import ImageManager from '@/pages/ImageManager';
import SystemSettings from './SystemSettings';
import SecuritySettings from './SecuritySettings';
import EmailSettings from './EmailSettings';
import BackupManagement from './BackupManagement';

export default function AdminSettings() {
    const { t } = useLanguage();
    const [activeTab, setActiveTab] = useState('system');

    const tabs = [
        {
            id: 'system',
            label: t('dashboard.adminSettings.general'),
            icon: Globe,
            description: 'Site configuration and basic settings'
        },
        {
            id: 'security',
            label: t('dashboard.adminSettings.security'),
            icon: Shield,
            description: 'Security policies and access control'
        },
        {
            id: 'email',
            label: t('dashboard.adminSettings.email'),
            icon: Mail,
            description: 'Email configuration and notifications'
        },
        {
            id: 'backup',
            label: t('dashboard.adminSettings.backup'),
            icon: Database,
            description: 'System backups and data management'
        },
        {
            id: 'users',
            label: t('dashboard.users'),
            icon: Users,
            description: 'User accounts and permissions'
        },
        {
            id: 'pages',
            label: t('dashboard.pages'),
            icon: FileText,
            description: 'Content pages and site structure'
        },
        {
            id: 'slider',
            label: t('dashboard.slider'),
            icon: Sliders,
            description: 'Homepage slider management'
        },
        {
            id: 'media',
            label: t('dashboard.media'),
            icon: Image,
            description: 'Media files and image management'
        }
    ];

    const renderTabContent = () => {
        switch (activeTab) {
            case 'system':
                return <SystemSettings />;
            case 'security':
                return <SecuritySettings />;
            case 'email':
                return <EmailSettings />;
            case 'backup':
                return <BackupManagement />;
            case 'users':
                return <UserManagement />;
            case 'pages':
                return <PageManagement />;
            case 'slider':
                return <SliderManagement />;
            case 'media':
                return <ImageManager />;
            default:
                return <SystemSettings />;
        }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                        {t('dashboard.adminSettings.title')}
                    </h1>
                    <p className="text-gray-600 mt-1">
                        Manage your organization's system settings and configurations
                    </p>
                </div>
                <Badge variant="outline" className="text-sm">
                    <Server className="w-4 h-4 mr-1" />
                    Admin Panel
                </Badge>
            </div>

            {/* Modern Tab Navigation */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
                <div className="border-b border-gray-200">
                    <nav className="flex space-x-8 px-6" aria-label="Tabs">
                        {tabs.map((tab) => {
                            const Icon = tab.icon;
                            const isActive = activeTab === tab.id;
                            
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`
                                        group inline-flex items-center py-4 px-1 border-b-2 font-medium text-sm transition-colors
                                        ${isActive 
                                            ? 'border-vjn-blue text-vjn-blue' 
                                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                        }
                                    `}
                                >
                                    <Icon className={`
                                        -ml-0.5 mr-2 h-5 w-5 transition-colors
                                        ${isActive ? 'text-vjn-blue' : 'text-gray-400 group-hover:text-gray-500'}
                                    `} />
                                    {tab.label}
                                </button>
                            );
                        })}
                    </nav>
                </div>

                {/* Tab Content */}
                <div className="p-6">
                    <div className="mb-4">
                        <h2 className="text-lg font-semibold text-gray-900">
                            {tabs.find(tab => tab.id === activeTab)?.label}
                        </h2>
                        <p className="text-sm text-gray-600">
                            {tabs.find(tab => tab.id === activeTab)?.description}
                        </p>
                    </div>
                    
                    <div className="min-h-[600px]">
                        {renderTabContent()}
                    </div>
                </div>
            </div>
        </div>
    );
} 
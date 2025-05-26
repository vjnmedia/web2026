import { useState, useEffect } from 'react';
import { useLanguage } from '@/components/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import { userService, User, UserRole } from '@/services/userService';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { PageManagement } from './PageManagement';
import {
  Settings,
  Users,
  Shield,
  Mail,
  Database,
  Bell,
  Globe,
  Palette,
  Package,
  RefreshCw,
  Save,
  AlertTriangle,
  Plus,
  Pencil,
  Trash2,
  Download,
  Upload,
  History,
  FileText
} from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';

const AdminSettings = () => {
  const { t } = useLanguage();
  const { theme, setTheme } = useTheme();
  const [activeTab, setActiveTab] = useState('general');
  const [settings, setSettings] = useState({
    siteName: 'Vision Jeunesse Nouvelle',
    siteDescription: 'Empowering youth for a better future',
    maintenanceMode: false,
    defaultLanguage: 'en',
    theme: theme,
    emailNotifications: true,
    backupFrequency: 'daily',
    securityLevel: 'high',
    apiEnabled: false,
    cacheEnabled: true,
    logRetention: '30',
  });

  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddUserDialogOpen, setIsAddUserDialogOpen] = useState(false);
  const [isEditUserDialogOpen, setIsEditUserDialogOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [newUser, setNewUser] = useState({ name: '', email: '', role: 'viewer' as UserRole });
  const [isBackupInProgress, setIsBackupInProgress] = useState(false);
  const [backups, setBackups] = useState([]);
  const [selectedBackup, setSelectedBackup] = useState(null);
  const [isRestoreDialogOpen, setIsRestoreDialogOpen] = useState(false);

  // Fetch users on component mount
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setIsLoading(true);
      const fetchedUsers = await userService.getUsers();
      setUsers(fetchedUsers);
    } catch (error) {
      console.error('Error fetching users:', error);
      toast.error(t('dashboard.adminSettings.fetchUsersError'));
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddUser = async () => {
    try {
      const createdUser = await userService.createUser(newUser);
      setUsers([...users, createdUser]);
      setIsAddUserDialogOpen(false);
      setNewUser({ name: '', email: '', role: 'viewer' });
      toast.success(t('dashboard.adminSettings.userAdded'));
    } catch (error) {
      console.error('Error adding user:', error);
      toast.error(t('dashboard.adminSettings.addUserError'));
    }
  };

  const handleUpdateUser = async () => {
    if (!currentUser) return;
    try {
      const updatedUser = await userService.updateUser(currentUser.id, currentUser);
      setUsers(users.map(u => u.id === currentUser.id ? updatedUser : u));
      setIsEditUserDialogOpen(false);
      toast.success(t('dashboard.adminSettings.userUpdated'));
    } catch (error) {
      console.error('Error updating user:', error);
      toast.error(t('dashboard.adminSettings.updateUserError'));
    }
  };

  const handleDeleteUser = async (userId: string) => {
    if (!window.confirm(t('dashboard.adminSettings.confirmDeleteUser'))) return;
    try {
      await userService.deleteUser(userId);
      setUsers(users.filter(u => u.id !== userId));
      toast.success(t('dashboard.adminSettings.userDeleted'));
    } catch (error) {
      console.error('Error deleting user:', error);
      toast.error(t('dashboard.adminSettings.deleteUserError'));
    }
  };

  const handleSettingChange = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
    
    // Handle theme change
    if (key === 'theme') {
      setTheme(value);
      toast.success(t('dashboard.adminSettings.themeChanged'));
    }
    
    // ... handle other settings
  };

  const handleSaveSettings = () => {
    // Here you would typically make an API call to save the settings
    toast.success(t('dashboard.adminSettings.settingsSaved'));
  };

  const handleResetSettings = () => {
    if (window.confirm(t('dashboard.adminSettings.confirmReset'))) {
      // Here you would typically make an API call to reset the settings
      toast.success(t('dashboard.adminSettings.settingsReset'));
    }
  };

  const handleBackupNow = async () => {
    setIsBackupInProgress(true);
    try {
      // Here you would typically make an API call to create a backup
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate API call
      const newBackup = {
        id: Date.now(),
        date: new Date().toISOString(),
        size: '2.5 MB',
        type: 'Full Backup',
        status: 'Completed'
      };
      setBackups(prev => [newBackup, ...prev]);
      toast.success(t('dashboard.adminSettings.backupCreated'));
    } catch (error) {
      toast.error(t('dashboard.adminSettings.backupError'));
    } finally {
      setIsBackupInProgress(false);
    }
  };

  const handleRestoreBackup = async (backup) => {
    setSelectedBackup(backup);
    setIsRestoreDialogOpen(true);
  };

  const confirmRestore = async () => {
    try {
      // Here you would typically make an API call to restore from backup
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate API call
      toast.success(t('dashboard.adminSettings.backupRestored'));
      setIsRestoreDialogOpen(false);
    } catch (error) {
      toast.error(t('dashboard.adminSettings.restoreError'));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">{t('dashboard.adminSettings.title')}</h2>
        <div className="space-x-2">
          <Button onClick={handleSaveSettings} className="bg-vjn-blue hover:bg-vjn-light-blue">
            <Save className="mr-2 h-4 w-4" />
            {t('dashboard.adminSettings.saveChanges')}
          </Button>
          <Button variant="outline" onClick={handleResetSettings}>
            <RefreshCw className="mr-2 h-4 w-4" />
            {t('dashboard.adminSettings.resetSettings')}
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-2">
          <TabsTrigger value="general" className="flex items-center">
            <Settings className="mr-2 h-4 w-4" />
            {t('dashboard.adminSettings.general')}
          </TabsTrigger>
          <TabsTrigger value="users" className="flex items-center">
            <Users className="mr-2 h-4 w-4" />
            {t('dashboard.adminSettings.users')}
          </TabsTrigger>
          <TabsTrigger value="pages" className="flex items-center">
            <FileText className="mr-2 h-4 w-4" />
            {t('dashboard.adminSettings.pages')}
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center">
            <Shield className="mr-2 h-4 w-4" />
            {t('dashboard.adminSettings.security')}
          </TabsTrigger>
          <TabsTrigger value="email" className="flex items-center">
            <Mail className="mr-2 h-4 w-4" />
            {t('dashboard.adminSettings.email')}
          </TabsTrigger>
          <TabsTrigger value="system" className="flex items-center">
            <Database className="mr-2 h-4 w-4" />
            {t('dashboard.adminSettings.system')}
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center">
            <Bell className="mr-2 h-4 w-4" />
            {t('dashboard.adminSettings.notifications')}
          </TabsTrigger>
          <TabsTrigger value="backup" className="flex items-center">
            <Database className="mr-2 h-4 w-4" />
            {t('dashboard.adminSettings.backup')}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{t('dashboard.adminSettings.general')}</CardTitle>
              <CardDescription>{t('dashboard.adminSettings.siteSettings')}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="siteName">{t('dashboard.adminSettings.siteName') || t('dashboard.adminSettings.general')}</Label>
                  <Input
                    id="siteName"
                    aria-label={t('dashboard.adminSettings.siteName') || t('dashboard.adminSettings.general')}
                    value={settings.siteName}
                    onChange={(e) => handleSettingChange('siteName', e.target.value)}
                    placeholder={t('dashboard.adminSettings.siteNamePlaceholder')}
                  />
                  <p className="text-xs text-gray-500">{t('dashboard.adminSettings.siteNameHelp')}</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="siteDescription">{t('dashboard.adminSettings.siteDescription')}</Label>
                  <Input
                    id="siteDescription"
                    aria-label={t('dashboard.adminSettings.siteDescription')}
                    value={settings.siteDescription}
                    onChange={(e) => handleSettingChange('siteDescription', e.target.value)}
                    placeholder={t('dashboard.adminSettings.siteDescriptionPlaceholder')}
                  />
                  <p className="text-xs text-gray-500">{t('dashboard.adminSettings.siteDescriptionHelp')}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="defaultLanguage">{t('dashboard.adminSettings.defaultLanguage')}</Label>
                  <Select
                    value={settings.defaultLanguage}
                    onValueChange={(value) => handleSettingChange('defaultLanguage', value)}
                  >
                    <SelectTrigger aria-label={t('dashboard.adminSettings.defaultLanguage')}>
                      <SelectValue placeholder={t('dashboard.adminSettings.defaultLanguagePlaceholder')} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">{t('common.language.en')}</SelectItem>
                      <SelectItem value="fr">{t('common.language.fr')}</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-gray-500">{t('dashboard.adminSettings.defaultLanguageHelp')}</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="theme">{t('dashboard.adminSettings.theme')}</Label>
                  <Select
                    value={settings.theme}
                    onValueChange={(value) => handleSettingChange('theme', value)}
                  >
                    <SelectTrigger aria-label={t('dashboard.adminSettings.theme')}>
                      <SelectValue placeholder={t('dashboard.adminSettings.themePlaceholder')} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">{t('dashboard.adminSettings.themeLight')}</SelectItem>
                      <SelectItem value="dark">{t('dashboard.adminSettings.themeDark')}</SelectItem>
                      <SelectItem value="system">{t('dashboard.adminSettings.themeSystem')}</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-gray-500">{t('dashboard.adminSettings.themeHelp')}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{t('dashboard.adminSettings.security')}</CardTitle>
              <CardDescription>{t('dashboard.adminSettings.securityPolicies')}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>{t('dashboard.adminSettings.maintenance')}</Label>
                  <p className="text-sm text-gray-500">
                    {t('dashboard.adminSettings.maintenanceHelp')}
                  </p>
                </div>
                <Switch
                  checked={settings.maintenanceMode}
                  onCheckedChange={(checked) => handleSettingChange('maintenanceMode', checked)}
                  aria-label={t('dashboard.adminSettings.maintenance')}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="securityLevel">{t('dashboard.adminSettings.securityLevel')}</Label>
                <Select
                  value={settings.securityLevel}
                  onValueChange={(value) => handleSettingChange('securityLevel', value)}
                >
                  <SelectTrigger aria-label={t('dashboard.adminSettings.securityLevel')}>
                    <SelectValue placeholder={t('dashboard.adminSettings.securityLevelPlaceholder')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">{t('dashboard.adminSettings.securityLow')}</SelectItem>
                    <SelectItem value="medium">{t('dashboard.adminSettings.securityMedium')}</SelectItem>
                    <SelectItem value="high">{t('dashboard.adminSettings.securityHigh')}</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-gray-500">{t('dashboard.adminSettings.securityLevelHelp')}</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="system" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{t('dashboard.adminSettings.system')}</CardTitle>
              <CardDescription>{t('dashboard.adminSettings.systemStatus')}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>{t('dashboard.adminSettings.cache')}</Label>
                  <p className="text-sm text-gray-500">
                    {t('dashboard.adminSettings.cacheHelp')}
                  </p>
                </div>
                <Switch
                  checked={settings.cacheEnabled}
                  onCheckedChange={(checked) => handleSettingChange('cacheEnabled', checked)}
                  aria-label={t('dashboard.adminSettings.cache')}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="backupFrequency">{t('dashboard.adminSettings.backupFrequency')}</Label>
                <Select
                  value={settings.backupFrequency}
                  onValueChange={(value) => handleSettingChange('backupFrequency', value)}
                >
                  <SelectTrigger aria-label={t('dashboard.adminSettings.backupFrequency')}>
                    <SelectValue placeholder={t('dashboard.adminSettings.backupFrequencyPlaceholder')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hourly">{t('dashboard.adminSettings.backupHourly')}</SelectItem>
                    <SelectItem value="daily">{t('dashboard.adminSettings.backupDaily')}</SelectItem>
                    <SelectItem value="weekly">{t('dashboard.adminSettings.backupWeekly')}</SelectItem>
                    <SelectItem value="monthly">{t('dashboard.adminSettings.backupMonthly')}</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-gray-500">{t('dashboard.adminSettings.backupFrequencyHelp')}</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="logRetention">{t('dashboard.adminSettings.logRetention')}</Label>
                <Input
                  id="logRetention"
                  type="number"
                  value={settings.logRetention}
                  onChange={(e) => handleSettingChange('logRetention', e.target.value)}
                  aria-label={t('dashboard.adminSettings.logRetention')}
                  placeholder={t('dashboard.adminSettings.logRetentionPlaceholder')}
                />
                <p className="text-xs text-gray-500">{t('dashboard.adminSettings.logRetentionHelp')}</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="email" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{t('dashboard.adminSettings.email')}</CardTitle>
              <CardDescription>{t('dashboard.adminSettings.emailTemplates')}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>{t('dashboard.adminSettings.notifications')}</Label>
                  <p className="text-sm text-gray-500">
                    {t('dashboard.adminSettings.notificationsHelp')}
                  </p>
                </div>
                <Switch
                  checked={settings.emailNotifications}
                  onCheckedChange={(checked) => handleSettingChange('emailNotifications', checked)}
                  aria-label={t('dashboard.adminSettings.notifications')}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{t('dashboard.adminSettings.users')}</CardTitle>
              <CardDescription>{t('dashboard.adminSettings.userRoles')}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between mb-4">
                <Button onClick={() => setIsAddUserDialogOpen(true)} className="bg-vjn-blue hover:bg-vjn-light-blue">
                  <Plus className="mr-2 h-4 w-4" />
                  {t('dashboard.adminSettings.addUser')}
                </Button>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{t('dashboard.adminSettings.userName')}</TableHead>
                    <TableHead>{t('dashboard.adminSettings.userEmail')}</TableHead>
                    <TableHead>{t('dashboard.adminSettings.userRole')}</TableHead>
                    <TableHead className="text-right">{t('dashboard.actions')}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isLoading ? (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center">
                        {t('dashboard.loading')}
                      </TableCell>
                    </TableRow>
                  ) : (
                    users.map(user => (
                      <TableRow key={user.id}>
                        <TableCell>{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{user.role}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="icon" onClick={() => { setCurrentUser(user); setIsEditUserDialogOpen(true); }}>
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => handleDeleteUser(user.id)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>

              {/* Add User Dialog */}
              <Dialog open={isAddUserDialogOpen} onOpenChange={setIsAddUserDialogOpen}>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>{t('dashboard.adminSettings.addUser')}</DialogTitle>
                    <DialogDescription>{t('dashboard.adminSettings.addUserDescription')}</DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="name" className="text-right">{t('dashboard.adminSettings.userName')}</Label>
                      <Input id="name" value={newUser.name} onChange={e => setNewUser({ ...newUser, name: e.target.value })} className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="email" className="text-right">{t('dashboard.adminSettings.userEmail')}</Label>
                      <Input id="email" type="email" value={newUser.email} onChange={e => setNewUser({ ...newUser, email: e.target.value })} className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="role" className="text-right">{t('dashboard.adminSettings.userRole')}</Label>
                      <Select value={newUser.role} onValueChange={(value: UserRole) => setNewUser({ ...newUser, role: value })}>
                        <SelectTrigger className="col-span-3">
                          <SelectValue placeholder={t('dashboard.adminSettings.userRole')} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="admin">Admin</SelectItem>
                          <SelectItem value="editor">Editor</SelectItem>
                          <SelectItem value="viewer">Viewer</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsAddUserDialogOpen(false)}>{t('dashboard.cancel')}</Button>
                    <Button onClick={handleAddUser}>{t('dashboard.save')}</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              {/* Edit User Dialog */}
              <Dialog open={isEditUserDialogOpen} onOpenChange={setIsEditUserDialogOpen}>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>{t('dashboard.adminSettings.editUser')}</DialogTitle>
                  </DialogHeader>
                  {currentUser && (
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="edit-name" className="text-right">{t('dashboard.adminSettings.userName')}</Label>
                        <Input id="edit-name" value={currentUser.name} onChange={e => setCurrentUser({ ...currentUser, name: e.target.value })} className="col-span-3" />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="edit-email" className="text-right">{t('dashboard.adminSettings.userEmail')}</Label>
                        <Input id="edit-email" type="email" value={currentUser.email} onChange={e => setCurrentUser({ ...currentUser, email: e.target.value })} className="col-span-3" />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="edit-role" className="text-right">{t('dashboard.adminSettings.userRole')}</Label>
                        <Select value={currentUser.role} onValueChange={(value: UserRole) => setCurrentUser({ ...currentUser, role: value })}>
                          <SelectTrigger className="col-span-3">
                            <SelectValue placeholder={t('dashboard.adminSettings.userRole')} />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="admin">Admin</SelectItem>
                            <SelectItem value="editor">Editor</SelectItem>
                            <SelectItem value="viewer">Viewer</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  )}
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsEditUserDialogOpen(false)}>{t('dashboard.cancel')}</Button>
                    <Button onClick={handleUpdateUser}>{t('dashboard.save')}</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{t('dashboard.adminSettings.notifications')}</CardTitle>
              <CardDescription>{t('dashboard.adminSettings.notificationPreferences')}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>System Notifications</Label>
                  <p className="text-sm text-gray-500">
                    Receive notifications about system events
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>User Activity</Label>
                  <p className="text-sm text-gray-500">
                    Receive notifications about user activities
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="backup" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{t('dashboard.adminSettings.backup')}</CardTitle>
              <CardDescription>{t('dashboard.adminSettings.backupDescription')}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="space-y-1">
                  <h3 className="text-lg font-medium">{t('dashboard.adminSettings.backupNow')}</h3>
                  <p className="text-sm text-gray-500">
                    {t('dashboard.adminSettings.backupNowDescription')}
                  </p>
                </div>
                <Button 
                  onClick={handleBackupNow} 
                  disabled={isBackupInProgress}
                  className="bg-vjn-blue hover:bg-vjn-light-blue"
                >
                  <Download className="mr-2 h-4 w-4" />
                  {isBackupInProgress ? t('dashboard.adminSettings.backupInProgress') : t('dashboard.adminSettings.backupNow')}
                </Button>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">{t('dashboard.adminSettings.backupHistory')}</h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>{t('dashboard.adminSettings.backupDate')}</TableHead>
                      <TableHead>{t('dashboard.adminSettings.backupSize')}</TableHead>
                      <TableHead>{t('dashboard.adminSettings.backupType')}</TableHead>
                      <TableHead>{t('dashboard.adminSettings.backupStatus')}</TableHead>
                      <TableHead className="text-right">{t('dashboard.actions')}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {backups.map(backup => (
                      <TableRow key={backup.id}>
                        <TableCell>{backup.date}</TableCell>
                        <TableCell>{backup.size}</TableCell>
                        <TableCell>{backup.type}</TableCell>
                        <TableCell>{backup.status}</TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleRestoreBackup(backup)}
                          >
                            <Upload className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => {/* Implement download */}}
                          >
                            <Download className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pages" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{t('dashboard.adminSettings.pageManagement')}</CardTitle>
              <CardDescription>{t('dashboard.adminSettings.pages')}</CardDescription>
            </CardHeader>
            <CardContent>
              <PageManagement />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Restore Confirmation Dialog */}
      <Dialog open={isRestoreDialogOpen} onOpenChange={setIsRestoreDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t('dashboard.adminSettings.restoreBackup')}</DialogTitle>
            <DialogDescription>
              {t('dashboard.adminSettings.restoreBackupDescription')}
            </DialogDescription>
          </DialogHeader>
          {selectedBackup && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>{t('dashboard.adminSettings.backupDate')}</Label>
                  <p>{selectedBackup.date}</p>
                </div>
                <div>
                  <Label>{t('dashboard.adminSettings.backupSize')}</Label>
                  <p>{selectedBackup.size}</p>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsRestoreDialogOpen(false)}>
              {t('dashboard.cancel')}
            </Button>
            <Button onClick={confirmRestore} className="bg-vjn-blue hover:bg-vjn-light-blue">
              {t('dashboard.adminSettings.restoreBackup')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminSettings; 
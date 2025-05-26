import { useState, useEffect } from 'react';
import { useLanguage } from '@/components/LanguageContext';
import { useAuth } from '@/hooks/useAuth';
import { userService } from '@/services/userService';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { User, UserPreferences } from '@/services/userService';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useDropzone } from 'react-dropzone';
import { supabase } from '@/lib/supabase';

const UserProfile = () => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [profile, setProfile] = useState<User | null>(null);
  const [preferences, setPreferences] = useState<UserPreferences | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (user) {
      fetchUserData();
    }
  }, [user]);

  const fetchUserData = async () => {
    try {
      setIsLoading(true);
      if (!user?.id) {
        throw new Error('No user ID available');
      }

      const [userData, userPrefs] = await Promise.all([
        userService.getUserById(user.id),
        userService.getUserPreferences(user.id)
      ]);

      setProfile(userData);
      setPreferences(userPrefs);
    } catch (error: any) {
      console.error('Error fetching user data:', error);
      if (error.message === 'User not found') {
        toast.error(t('profile.userNotFound'));
      } else if (error.message === 'No user ID available') {
        toast.error(t('profile.noUserId'));
      } else {
        toast.error(t('profile.fetchError'));
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleProfileUpdate = async () => {
    if (!profile) return;
    try {
      setIsSaving(true);
      await userService.updateUser(profile.id, profile);
      toast.success(t('profile.updateSuccess'));
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error(t('profile.updateError'));
    } finally {
      setIsSaving(false);
    }
  };

  const handlePreferencesUpdate = async () => {
    if (!preferences || !user) return;
    try {
      setIsSaving(true);
      await userService.updateUserPreferences(user.id, preferences);
      toast.success(t('profile.preferencesUpdateSuccess'));
    } catch (error) {
      console.error('Error updating preferences:', error);
      toast.error(t('profile.preferencesUpdateError'));
    } finally {
      setIsSaving(false);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif']
    },
    maxSize: 5242880, // 5MB
    onDrop: async (acceptedFiles) => {
      if (!user) return;
      try {
        const file = acceptedFiles[0];
        const fileExt = file.name.split('.').pop();
        const fileName = `${user.id}-${Math.random()}.${fileExt}`;
        const filePath = `avatars/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('profiles')
          .upload(filePath, file);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from('profiles')
          .getPublicUrl(filePath);

        if (profile) {
          await userService.updateUser(profile.id, { ...profile, avatar_url: publicUrl });
          setProfile({ ...profile, avatar_url: publicUrl });
          toast.success(t('profile.avatarUpdateSuccess'));
        }
      } catch (error) {
        console.error('Error uploading avatar:', error);
        toast.error(t('profile.avatarUpdateError'));
      }
    }
  });

  if (isLoading) {
    return <div className="flex justify-center items-center h-64">{t('common.loading')}</div>;
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{t('profile.title')}</CardTitle>
          <CardDescription>{t('profile.description')}</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="profile">{t('profile.tabs.profile')}</TabsTrigger>
              <TabsTrigger value="preferences">{t('profile.tabs.preferences')}</TabsTrigger>
            </TabsList>

            <TabsContent value="profile" className="space-y-4">
              <div className="flex items-center space-x-4">
                <div {...getRootProps()} className="cursor-pointer">
                  <input {...getInputProps()} />
                  <Avatar className="h-20 w-20">
                    <AvatarImage src={profile?.avatar_url} />
                    <AvatarFallback>{profile?.name?.charAt(0)}</AvatarFallback>
                  </Avatar>
                </div>
                <div>
                  <h3 className="text-lg font-medium">{profile?.name}</h3>
                  <p className="text-sm text-gray-500">{profile?.email}</p>
                </div>
              </div>

              <div className="grid gap-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    {t('profile.name')}
                  </Label>
                  <Input
                    id="name"
                    value={profile?.name || ''}
                    onChange={(e) => setProfile(profile ? { ...profile, name: e.target.value } : null)}
                    className="col-span-3"
                  />
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="email" className="text-right">
                    {t('profile.email')}
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={profile?.email || ''}
                    disabled
                    className="col-span-3"
                  />
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="role" className="text-right">
                    {t('profile.role')}
                  </Label>
                  <div className="col-span-3">
                    <span className="text-sm text-gray-500">{profile?.role}</span>
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <Button onClick={handleProfileUpdate} disabled={isSaving}>
                  {isSaving ? t('common.saving') : t('common.save')}
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="preferences" className="space-y-4">
              {preferences && (
                <>
                  <div className="grid gap-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>{t('profile.preferences.theme')}</Label>
                        <p className="text-sm text-gray-500">
                          {t('profile.preferences.themeDescription')}
                        </p>
                      </div>
                      <Select
                        value={preferences.theme}
                        onValueChange={(value) => setPreferences({ ...preferences, theme: value })}
                      >
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder={t('profile.preferences.selectTheme')} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="light">{t('profile.preferences.light')}</SelectItem>
                          <SelectItem value="dark">{t('profile.preferences.dark')}</SelectItem>
                          <SelectItem value="system">{t('profile.preferences.system')}</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>{t('profile.preferences.language')}</Label>
                        <p className="text-sm text-gray-500">
                          {t('profile.preferences.languageDescription')}
                        </p>
                      </div>
                      <Select
                        value={preferences.language}
                        onValueChange={(value) => setPreferences({ ...preferences, language: value })}
                      >
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder={t('profile.preferences.selectLanguage')} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="en">English</SelectItem>
                          <SelectItem value="fr">Français</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>{t('profile.preferences.notifications')}</Label>
                        <p className="text-sm text-gray-500">
                          {t('profile.preferences.notificationsDescription')}
                        </p>
                      </div>
                      <Switch
                        checked={preferences.notifications_enabled}
                        onCheckedChange={(checked) =>
                          setPreferences({ ...preferences, notifications_enabled: checked })
                        }
                      />
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button onClick={handlePreferencesUpdate} disabled={isSaving}>
                      {isSaving ? t('common.saving') : t('common.save')}
                    </Button>
                  </div>
                </>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserProfile; 
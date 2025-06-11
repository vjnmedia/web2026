import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { userService, type User, type UserRole } from '@/services/userService';
import { useAuth } from '@/hooks/useAuth';

export function UserManagement() {
    const { t } = useTranslation();
    const { user } = useAuth();
    const [users, setUsers] = useState<User[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        role: 'viewer' as UserRole
    });

    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = async () => {
        try {
            setIsLoading(true);
            const data = await userService.getUsers();
            setUsers(data);
        } catch (error) {
            console.error('Error loading users:', error);
            toast.error(t('errors.users.load'));
        } finally {
            setIsLoading(false);
        }
    };

    const handleCreateUser = async () => {
        try {
            const createdUser = await userService.createUser(formData);
            setUsers([...users, createdUser]);
            toast.success(t('success.users.create'));
            resetForm();
            setIsDialogOpen(false);
        } catch (error) {
            console.error('Error creating user:', error);
            toast.error(t('errors.users.create'));
        }
    };

    const handleUpdateUser = async () => {
        if (!selectedUser) return;
        try {
            const updatedUser = await userService.updateUser(selectedUser.id, formData);
            setUsers(users.map(u => u.id === selectedUser.id ? updatedUser : u));
            toast.success(t('success.users.update'));
            resetForm();
            setIsDialogOpen(false);
        } catch (error) {
            console.error('Error updating user:', error);
            toast.error(t('errors.users.update'));
        }
    };

    const handleDeleteUser = async (userId: string) => {
        if (!confirm(t('confirm.users.delete'))) return;
        try {
            await userService.deleteUser(userId);
            setUsers(users.filter(u => u.id !== userId));
            toast.success(t('success.users.delete'));
        } catch (error) {
            console.error('Error deleting user:', error);
            toast.error(t('errors.users.delete'));
        }
    };

    const resetForm = () => {
        setFormData({
            name: '',
            email: '',
            role: 'viewer'
        });
        setSelectedUser(null);
        setIsEditing(false);
    };

    const handleEdit = (user: User) => {
        setSelectedUser(user);
        setFormData({
            name: user.name,
            email: user.email,
            role: user.role
        });
        setIsEditing(true);
        setIsDialogOpen(true);
    };

    if (!user || (user.role !== 'admin' && user.role !== 'editor')) {
        return (
            <div className="flex items-center justify-center p-8">
                <div className="text-center">
                    <h2 className="text-xl font-semibold mb-2">{t('errors.unauthorized')}</h2>
                    <p className="text-gray-600">{t('errors.unauthorized.message')}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <Button
                    onClick={() => {
                        resetForm();
                        setIsDialogOpen(true);
                    }}
                    className="bg-vjn-blue hover:bg-vjn-light-blue"
                >
                    <Plus className="mr-2 h-4 w-4" />
                    {t('dashboard.create')}
                </Button>
            </div>

            <div className="border rounded-lg">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>{t('users.name')}</TableHead>
                            <TableHead>{t('users.email')}</TableHead>
                            <TableHead>{t('users.role')}</TableHead>
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
                        ) : users.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={4} className="text-center">
                                    {t('users.noUsers')}
                                </TableCell>
                            </TableRow>
                        ) : (
                            users.map((user) => (
                                <TableRow key={user.id}>
                                    <TableCell>{user.name}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell className="capitalize">{user.role}</TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end space-x-2">
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => handleEdit(user)}
                                            >
                                                <Pencil className="h-4 w-4" />
                                            </Button>
                                            {user.role !== 'admin' && (
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() => handleDeleteUser(user.id)}
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            )}
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            {isEditing ? t('dashboard.edit') : t('dashboard.create')}
                        </DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                        <div>
                            <Label htmlFor="name">{t('users.name')}</Label>
                            <Input
                                id="name"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                placeholder={t('users.namePlaceholder')}
                            />
                        </div>
                        <div>
                            <Label htmlFor="email">{t('users.email')}</Label>
                            <Input
                                id="email"
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                placeholder={t('users.emailPlaceholder')}
                            />
                        </div>
                        <div>
                            <Label htmlFor="role">{t('users.role')}</Label>
                            <Select
                                value={formData.role}
                                onValueChange={(value: UserRole) => setFormData({ ...formData, role: value })}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder={t('users.selectRole')} />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="admin">{t('users.roles.admin')}</SelectItem>
                                    <SelectItem value="editor">{t('users.roles.editor')}</SelectItem>
                                    <SelectItem value="viewer">{t('users.roles.viewer')}</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                            {t('dashboard.cancel')}
                        </Button>
                        <Button
                            onClick={isEditing ? handleUpdateUser : handleCreateUser}
                            className="bg-vjn-blue hover:bg-vjn-light-blue"
                        >
                            {isEditing ? t('dashboard.update') : t('dashboard.create')}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
} 
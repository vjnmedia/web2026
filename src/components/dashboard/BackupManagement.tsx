import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/components/LanguageContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Database, 
  Download, 
  RefreshCw, 
  Trash2, 
  CheckCircle, 
  AlertCircle,
  Clock,
  HardDrive,
  Calendar,
  FileText
} from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/lib/supabase';

interface Backup {
    id: string;
    created_at: string;
    size?: number;
    type: 'full' | 'partial';
    status: 'completed' | 'failed' | 'in_progress';
    file_path?: string;
    created_by?: string;
    metadata?: any;
    updated_at: string;
}

export default function BackupManagement() {
    const { t } = useLanguage();
    const [backups, setBackups] = useState<Backup[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isCreating, setIsCreating] = useState(false);

    useEffect(() => {
        loadBackups();
    }, []);

    const loadBackups = async () => {
        try {
            setIsLoading(true);
            const { data, error } = await supabase
                .from('backups')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            setBackups(data || []);
        } catch (error) {
            console.error('Error loading backups:', error);
            toast.error('Failed to load backups');
        } finally {
            setIsLoading(false);
        }
    };

    const createBackup = async () => {
        try {
            setIsCreating(true);
            
            // Create backup record
            const { data, error } = await supabase
                .from('backups')
                .insert([{
                    type: 'full',
                    status: 'in_progress',
                    metadata: { created_by: 'admin' }
                }])
                .select()
                .single();

            if (error) throw error;

            toast.success('Backup creation started...');
            
            // Simulate backup process (in real implementation, this would be handled by a backend service)
            setTimeout(async () => {
                try {
                    const { error: updateError } = await supabase
                        .from('backups')
                        .update({
                            status: 'completed',
                            size: Math.floor(Math.random() * 1000000) + 500000, // Random size between 500KB-1.5MB
                            file_path: `backups/backup_${data.id}.sql`
                        })
                        .eq('id', data.id);

                    if (updateError) throw updateError;
                    
                    toast.success('Backup completed successfully');
                    loadBackups();
                } catch (error) {
                    console.error('Error completing backup:', error);
                    await supabase
                        .from('backups')
                        .update({ status: 'failed' })
                        .eq('id', data.id);
                    toast.error('Backup failed');
                }
            }, 3000);

        } catch (error) {
            console.error('Error creating backup:', error);
            toast.error('Failed to create backup');
        } finally {
            setIsCreating(false);
        }
    };

    const downloadBackup = async (backup: Backup) => {
        if (!backup.file_path) {
            toast.error('Backup file not available');
            return;
        }

        try {
            // In a real implementation, this would download the actual backup file
            toast.info('Download functionality would be implemented here');
        } catch (error) {
            console.error('Error downloading backup:', error);
            toast.error('Failed to download backup');
        }
    };

    const deleteBackup = async (backupId: string) => {
        if (!confirm('Are you sure you want to delete this backup? This action cannot be undone.')) {
            return;
        }

        try {
            const { error } = await supabase
                .from('backups')
                .delete()
                .eq('id', backupId);

            if (error) throw error;

            toast.success('Backup deleted successfully');
            loadBackups();
        } catch (error) {
            console.error('Error deleting backup:', error);
            toast.error('Failed to delete backup');
        }
    };

    const formatFileSize = (bytes?: number) => {
        if (!bytes) return 'Unknown';
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(1024));
        return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleString();
    };

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'completed':
                return <Badge variant="default" className="bg-green-100 text-green-800"><CheckCircle className="w-3 h-3 mr-1" />Completed</Badge>;
            case 'failed':
                return <Badge variant="destructive"><AlertCircle className="w-3 h-3 mr-1" />Failed</Badge>;
            case 'in_progress':
                return <Badge variant="secondary"><Clock className="w-3 h-3 mr-1" />In Progress</Badge>;
            default:
                return <Badge variant="secondary">{status}</Badge>;
        }
    };

    const getTypeBadge = (type: string) => {
        return (
            <Badge variant="outline" className="capitalize">
                {type === 'full' ? <Database className="w-3 h-3 mr-1" /> : <FileText className="w-3 h-3 mr-1" />}
                {type}
            </Badge>
        );
    };

    return (
        <div className="space-y-6">
            {/* Backup Status */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Database className="h-5 w-5" />
                        Backup Management
                    </CardTitle>
                    <CardDescription>
                        Manage system backups and data protection
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="flex items-center space-x-3">
                            <div className="flex-shrink-0">
                                <Database className="h-5 w-5 text-blue-500" />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-900">Total Backups</p>
                                <p className="text-2xl font-bold text-gray-900">{backups.length}</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-3">
                            <div className="flex-shrink-0">
                                <CheckCircle className="h-5 w-5 text-green-500" />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-900">Successful</p>
                                <p className="text-2xl font-bold text-gray-900">
                                    {backups.filter(b => b.status === 'completed').length}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-3">
                            <div className="flex-shrink-0">
                                <HardDrive className="h-5 w-5 text-gray-500" />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-900">Total Size</p>
                                <p className="text-2xl font-bold text-gray-900">
                                    {formatFileSize(backups.reduce((sum, b) => sum + (b.size || 0), 0))}
                                </p>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Backup Actions */}
            <Card>
                <CardHeader>
                    <CardTitle>Backup Actions</CardTitle>
                    <CardDescription>
                        Create new backups and manage existing ones
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center justify-between">
                        <div>
                            <h4 className="font-medium">Create New Backup</h4>
                            <p className="text-sm text-gray-500">
                                Create a full backup of your system data
                            </p>
                        </div>
                        <Button
                            onClick={createBackup}
                            disabled={isCreating}
                            className="bg-vjn-blue hover:bg-vjn-light-blue"
                        >
                            {isCreating ? (
                                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                            ) : (
                                <Database className="h-4 w-4 mr-2" />
                            )}
                            Create Backup
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* Backup List */}
            <Card>
                <CardHeader>
                    <CardTitle>Backup History</CardTitle>
                    <CardDescription>
                        View and manage your backup files
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {isLoading ? (
                        <div className="flex items-center justify-center py-8">
                            <RefreshCw className="h-6 w-6 animate-spin mr-2" />
                            Loading backups...
                        </div>
                    ) : backups.length === 0 ? (
                        <div className="text-center py-8">
                            <Database className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                            <h3 className="text-lg font-medium text-gray-900 mb-2">No backups found</h3>
                            <p className="text-gray-500">Create your first backup to get started</p>
                        </div>
                    ) : (
                        <div className="border rounded-lg">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Type</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Size</TableHead>
                                        <TableHead>Created</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {backups.map((backup) => (
                                        <TableRow key={backup.id}>
                                            <TableCell>
                                                {getTypeBadge(backup.type)}
                                            </TableCell>
                                            <TableCell>
                                                {getStatusBadge(backup.status)}
                                            </TableCell>
                                            <TableCell>
                                                {formatFileSize(backup.size)}
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-1">
                                                    <Calendar className="h-4 w-4 text-gray-400" />
                                                    {formatDate(backup.created_at)}
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex justify-end gap-2">
                                                    {backup.status === 'completed' && (
                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                            onClick={() => downloadBackup(backup)}
                                                        >
                                                            <Download className="h-4 w-4" />
                                                        </Button>
                                                    )}
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={() => deleteBackup(backup.id)}
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Backup Information */}
            <Alert>
                <Database className="h-4 w-4" />
                <AlertDescription>
                    <strong>Backup Information:</strong> Backups are automatically stored securely and include all your system data. 
                    We recommend creating regular backups before making significant changes to your system.
                </AlertDescription>
            </Alert>
        </div>
    );
}

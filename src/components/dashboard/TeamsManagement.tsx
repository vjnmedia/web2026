
import { useState } from 'react';
import { useLanguage } from '@/components/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Pencil, Trash2, Users } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

// Team type definition
interface Team {
  id: number;
  name: string;
  sport: string;
  members: number;
  coach: string;
  founded: string;
}

// Mock data for sports teams
const mockTeams = [
  { id: 1, name: "VJN Eagles", sport: "Football", members: 22, coach: "Eric Mutabazi", founded: "2015" },
  { id: 2, name: "VJN Tigers", sport: "Basketball", members: 15, coach: "Claudine Uwase", founded: "2017" },
  { id: 3, name: "VJN Warriors", sport: "Volleyball", members: 12, coach: "Jean Bosco", founded: "2019" },
  { id: 4, name: "VJN Runners", sport: "Athletics", members: 18, coach: "Marie Gahima", founded: "2016" },
];

// Mock team members for demonstration
const mockTeamMembers = {
  1: [
    { id: 1, name: "Jean Claude", position: "Forward", age: 19 },
    { id: 2, name: "Pierre Nkusi", position: "Midfielder", age: 20 },
    { id: 3, name: "Samuel Gatete", position: "Goalkeeper", age: 21 },
    // Add more mock members
  ],
  2: [
    { id: 1, name: "Marie Uwase", position: "Point Guard", age: 18 },
    { id: 2, name: "Joseph Habimana", position: "Center", age: 22 },
    // Add more mock members
  ],
  // Add members for other teams
};

const TeamsManagement = () => {
  const { t } = useLanguage();
  const [teams, setTeams] = useState<Team[]>(mockTeams);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isViewMembersDialogOpen, setIsViewMembersDialogOpen] = useState(false);
  const [currentTeam, setCurrentTeam] = useState<Team | null>(null);
  const [currentTeamMembers, setCurrentTeamMembers] = useState<any[]>([]);
  const [newTeam, setNewTeam] = useState<Omit<Team, 'id'>>({
    name: '',
    sport: '',
    members: 0,
    coach: '',
    founded: ''
  });

  const filteredTeams = teams.filter(team => 
    team.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    team.sport.toLowerCase().includes(searchTerm.toLowerCase()) ||
    team.coach.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddTeam = () => {
    setNewTeam({
      name: '',
      sport: '',
      members: 0,
      coach: '',
      founded: ''
    });
    setIsAddDialogOpen(true);
  };

  const handleViewMembers = (id: number) => {
    const team = teams.find(team => team.id === id);
    if (team) {
      setCurrentTeam(team);
      // In a real app, this would fetch members from an API
      setCurrentTeamMembers(mockTeamMembers[id as keyof typeof mockTeamMembers] || []);
      setIsViewMembersDialogOpen(true);
    }
  };

  const handleEditTeam = (id: number) => {
    const teamToEdit = teams.find(team => team.id === id);
    if (teamToEdit) {
      setCurrentTeam(teamToEdit);
      setIsEditDialogOpen(true);
    }
  };

  const handleDeleteTeam = (id: number) => {
    const teamToDelete = teams.find(team => team.id === id);
    if (teamToDelete) {
      setCurrentTeam(teamToDelete);
      setIsDeleteDialogOpen(true);
    }
  };

  const saveNewTeam = () => {
    if (!newTeam.name || !newTeam.sport || !newTeam.coach) {
      toast.error(t('dashboard.allFieldsRequired'));
      return;
    }

    const newId = Math.max(...teams.map(t => t.id), 0) + 1;
    const teamToAdd = { id: newId, ...newTeam };
    
    setTeams([...teams, teamToAdd]);
    setIsAddDialogOpen(false);
    toast.success(t('dashboard.teamAdded'));
  };

  const saveEditedTeam = () => {
    if (!currentTeam) return;
    
    const updatedTeams = teams.map(team =>
      team.id === currentTeam.id ? currentTeam : team
    );
    
    setTeams(updatedTeams);
    setIsEditDialogOpen(false);
    toast.success(t('dashboard.teamUpdated'));
  };

  const confirmDeleteTeam = () => {
    if (!currentTeam) return;
    
    setTeams(teams.filter(team => team.id !== currentTeam.id));
    setIsDeleteDialogOpen(false);
    toast.success(t('dashboard.teamDeleted'));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">{t('dashboard.teamsManagement')}</h2>
        <Button onClick={handleAddTeam} className="bg-vjn-blue hover:bg-vjn-light-blue">
          <Plus className="mr-2 h-4 w-4" />
          {t('dashboard.addTeam')}
        </Button>
      </div>
      
      <div className="flex items-center">
        <Input
          placeholder={t('dashboard.searchTeams')}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
      </div>
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t('dashboard.teamName')}</TableHead>
              <TableHead>{t('dashboard.sport')}</TableHead>
              <TableHead>{t('dashboard.members')}</TableHead>
              <TableHead>{t('dashboard.coach')}</TableHead>
              <TableHead>{t('dashboard.founded')}</TableHead>
              <TableHead className="text-right">{t('dashboard.actions')}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTeams.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-4">
                  {t('dashboard.noTeams')}
                </TableCell>
              </TableRow>
            ) : (
              filteredTeams.map((team) => (
                <TableRow key={team.id}>
                  <TableCell>{team.name}</TableCell>
                  <TableCell>{team.sport}</TableCell>
                  <TableCell>{team.members}</TableCell>
                  <TableCell>{team.coach}</TableCell>
                  <TableCell>{team.founded}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" onClick={() => handleViewMembers(team.id)}>
                      <Users className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleEditTeam(team.id)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDeleteTeam(team.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
      
      {/* Add Team Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{t('dashboard.addTeam')}</DialogTitle>
            <DialogDescription>
              {t('dashboard.addTeamDescription')}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                {t('dashboard.teamName')}
              </Label>
              <Input
                id="name"
                value={newTeam.name}
                onChange={(e) => setNewTeam({...newTeam, name: e.target.value})}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="sport" className="text-right">
                {t('dashboard.sport')}
              </Label>
              <Input
                id="sport"
                value={newTeam.sport}
                onChange={(e) => setNewTeam({...newTeam, sport: e.target.value})}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="members" className="text-right">
                {t('dashboard.members')}
              </Label>
              <Input
                id="members"
                type="number"
                min="1"
                value={newTeam.members}
                onChange={(e) => setNewTeam({...newTeam, members: parseInt(e.target.value)})}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="coach" className="text-right">
                {t('dashboard.coach')}
              </Label>
              <Input
                id="coach"
                value={newTeam.coach}
                onChange={(e) => setNewTeam({...newTeam, coach: e.target.value})}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="founded" className="text-right">
                {t('dashboard.founded')}
              </Label>
              <Input
                id="founded"
                type="text"
                placeholder="YYYY"
                value={newTeam.founded}
                onChange={(e) => setNewTeam({...newTeam, founded: e.target.value})}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              {t('dashboard.cancel')}
            </Button>
            <Button onClick={saveNewTeam} className="bg-vjn-blue hover:bg-vjn-light-blue">
              {t('dashboard.save')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Team Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{t('dashboard.editTeam')}</DialogTitle>
          </DialogHeader>
          {currentTeam && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-name" className="text-right">
                  {t('dashboard.teamName')}
                </Label>
                <Input
                  id="edit-name"
                  value={currentTeam.name}
                  onChange={(e) => setCurrentTeam({...currentTeam, name: e.target.value})}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-sport" className="text-right">
                  {t('dashboard.sport')}
                </Label>
                <Input
                  id="edit-sport"
                  value={currentTeam.sport}
                  onChange={(e) => setCurrentTeam({...currentTeam, sport: e.target.value})}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-members" className="text-right">
                  {t('dashboard.members')}
                </Label>
                <Input
                  id="edit-members"
                  type="number"
                  min="1"
                  value={currentTeam.members}
                  onChange={(e) => setCurrentTeam({...currentTeam, members: parseInt(e.target.value)})}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-coach" className="text-right">
                  {t('dashboard.coach')}
                </Label>
                <Input
                  id="edit-coach"
                  value={currentTeam.coach}
                  onChange={(e) => setCurrentTeam({...currentTeam, coach: e.target.value})}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-founded" className="text-right">
                  {t('dashboard.founded')}
                </Label>
                <Input
                  id="edit-founded"
                  value={currentTeam.founded}
                  onChange={(e) => setCurrentTeam({...currentTeam, founded: e.target.value})}
                  className="col-span-3"
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              {t('dashboard.cancel')}
            </Button>
            <Button onClick={saveEditedTeam} className="bg-vjn-blue hover:bg-vjn-light-blue">
              {t('dashboard.save')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Team Members Dialog */}
      <Dialog open={isViewMembersDialogOpen} onOpenChange={setIsViewMembersDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>
              {currentTeam ? `${currentTeam.name} ${t('dashboard.members')}` : t('dashboard.teamMembers')}
            </DialogTitle>
            <DialogDescription>
              {currentTeam && `${t('dashboard.sport')}: ${currentTeam.sport}`}
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            {currentTeamMembers.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{t('dashboard.name')}</TableHead>
                    <TableHead>{t('dashboard.position')}</TableHead>
                    <TableHead>{t('dashboard.age')}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentTeamMembers.map((member) => (
                    <TableRow key={member.id}>
                      <TableCell>{member.name}</TableCell>
                      <TableCell>{member.position}</TableCell>
                      <TableCell>{member.age}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <p className="text-center py-4">{t('dashboard.noMembersFound')}</p>
            )}
          </div>
          <DialogFooter>
            <Button onClick={() => setIsViewMembersDialogOpen(false)}>
              {t('dashboard.close')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{t('dashboard.confirmDelete')}</DialogTitle>
            <DialogDescription>
              {t('dashboard.deleteTeamConfirmation')}
            </DialogDescription>
          </DialogHeader>
          {currentTeam && (
            <div className="py-4">
              <p className="text-center font-medium">{currentTeam.name}</p>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              {t('dashboard.cancel')}
            </Button>
            <Button variant="destructive" onClick={confirmDeleteTeam}>
              {t('dashboard.delete')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TeamsManagement;

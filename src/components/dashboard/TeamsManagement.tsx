
import { useState } from 'react';
import { useLanguage } from '@/components/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Pencil, Trash2, Users } from 'lucide-react';

// Mock data for sports teams
const mockTeams = [
  { id: 1, name: "VJN Eagles", sport: "Football", members: 22, coach: "Eric Mutabazi", founded: "2015" },
  { id: 2, name: "VJN Tigers", sport: "Basketball", members: 15, coach: "Claudine Uwase", founded: "2017" },
  { id: 3, name: "VJN Warriors", sport: "Volleyball", members: 12, coach: "Jean Bosco", founded: "2019" },
  { id: 4, name: "VJN Runners", sport: "Athletics", members: 18, coach: "Marie Gahima", founded: "2016" },
];

const TeamsManagement = () => {
  const { t } = useLanguage();
  const [teams, setTeams] = useState(mockTeams);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTeams = teams.filter(team => 
    team.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    team.sport.toLowerCase().includes(searchTerm.toLowerCase()) ||
    team.coach.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddTeam = () => {
    console.log("Add new team");
  };

  const handleViewMembers = (id: number) => {
    console.log("View members of team with id:", id);
  };

  const handleEditTeam = (id: number) => {
    console.log("Edit team with id:", id);
  };

  const handleDeleteTeam = (id: number) => {
    console.log("Delete team with id:", id);
    setTeams(teams.filter(team => team.id !== id));
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
    </div>
  );
};

export default TeamsManagement;

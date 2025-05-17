
import { useState } from 'react';
import { useLanguage } from '@/components/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Pencil, Trash2, Eye } from 'lucide-react';

// Mock data for youth talents
const mockYouthTalents = [
  { id: 1, name: "Jean Pierre", age: 18, talent: "Music", program: "Arts", joinedDate: "2022-03-15" },
  { id: 2, name: "Marie Claire", age: 20, talent: "Dance", program: "Arts", joinedDate: "2021-07-10" },
  { id: 3, name: "Emmanuel", age: 16, talent: "Football", program: "Sports", joinedDate: "2023-01-20" },
  { id: 4, name: "Diane", age: 19, talent: "Painting", program: "Arts", joinedDate: "2022-11-05" },
  { id: 5, name: "Patrick", age: 17, talent: "Basketball", program: "Sports", joinedDate: "2023-04-12" },
];

const YouthTalentsManagement = () => {
  const { t } = useLanguage();
  const [youthTalents, setYouthTalents] = useState(mockYouthTalents);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTalents = youthTalents.filter(youth => 
    youth.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    youth.talent.toLowerCase().includes(searchTerm.toLowerCase()) ||
    youth.program.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddYouth = () => {
    console.log("Add new youth talent");
  };

  const handleViewYouth = (id: number) => {
    console.log("View youth with id:", id);
  };

  const handleEditYouth = (id: number) => {
    console.log("Edit youth with id:", id);
  };

  const handleDeleteYouth = (id: number) => {
    console.log("Delete youth with id:", id);
    setYouthTalents(youthTalents.filter(youth => youth.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">{t('dashboard.youthTalentsManagement')}</h2>
        <Button onClick={handleAddYouth} className="bg-vjn-blue hover:bg-vjn-light-blue">
          <Plus className="mr-2 h-4 w-4" />
          {t('dashboard.addYouth')}
        </Button>
      </div>
      
      <div className="flex items-center">
        <Input
          placeholder={t('dashboard.searchYouth')}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
      </div>
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t('dashboard.name')}</TableHead>
              <TableHead>{t('dashboard.age')}</TableHead>
              <TableHead>{t('dashboard.talent')}</TableHead>
              <TableHead>{t('dashboard.program')}</TableHead>
              <TableHead>{t('dashboard.joinedDate')}</TableHead>
              <TableHead className="text-right">{t('dashboard.actions')}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTalents.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-4">
                  {t('dashboard.noYouth')}
                </TableCell>
              </TableRow>
            ) : (
              filteredTalents.map((youth) => (
                <TableRow key={youth.id}>
                  <TableCell>{youth.name}</TableCell>
                  <TableCell>{youth.age}</TableCell>
                  <TableCell>{youth.talent}</TableCell>
                  <TableCell>{youth.program}</TableCell>
                  <TableCell>{youth.joinedDate}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" onClick={() => handleViewYouth(youth.id)}>
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleEditYouth(youth.id)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDeleteYouth(youth.id)}>
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

export default YouthTalentsManagement;

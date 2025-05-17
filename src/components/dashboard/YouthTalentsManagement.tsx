
import { useState } from 'react';
import { useLanguage } from '@/components/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Pencil, Trash2, Eye } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Youth talent type definition
interface YouthTalent {
  id: number;
  name: string;
  age: number;
  talent: string;
  program: string;
  joinedDate: string;
}

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
  const [youthTalents, setYouthTalents] = useState<YouthTalent[]>(mockYouthTalents);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [currentYouth, setCurrentYouth] = useState<YouthTalent | null>(null);
  const [newYouth, setNewYouth] = useState<Omit<YouthTalent, 'id'>>({
    name: '',
    age: 16,
    talent: '',
    program: 'Arts',
    joinedDate: ''
  });

  const filteredTalents = youthTalents.filter(youth => 
    youth.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    youth.talent.toLowerCase().includes(searchTerm.toLowerCase()) ||
    youth.program.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddYouth = () => {
    setNewYouth({
      name: '',
      age: 16,
      talent: '',
      program: 'Arts',
      joinedDate: ''
    });
    setIsAddDialogOpen(true);
  };

  const handleViewYouth = (id: number) => {
    const youthToView = youthTalents.find(youth => youth.id === id);
    if (youthToView) {
      setCurrentYouth(youthToView);
      setIsViewDialogOpen(true);
    }
  };

  const handleEditYouth = (id: number) => {
    const youthToEdit = youthTalents.find(youth => youth.id === id);
    if (youthToEdit) {
      setCurrentYouth(youthToEdit);
      setIsEditDialogOpen(true);
    }
  };

  const handleDeleteYouth = (id: number) => {
    const youthToDelete = youthTalents.find(youth => youth.id === id);
    if (youthToDelete) {
      setCurrentYouth(youthToDelete);
      setIsDeleteDialogOpen(true);
    }
  };

  const saveNewYouth = () => {
    if (!newYouth.name || !newYouth.talent || !newYouth.joinedDate) {
      toast.error(t('dashboard.allFieldsRequired'));
      return;
    }

    const newId = Math.max(...youthTalents.map(y => y.id), 0) + 1;
    const youthToAdd = { id: newId, ...newYouth };
    
    setYouthTalents([...youthTalents, youthToAdd]);
    setIsAddDialogOpen(false);
    toast.success(t('dashboard.youthAdded'));
  };

  const saveEditedYouth = () => {
    if (!currentYouth) return;
    
    const updatedYouths = youthTalents.map(youth =>
      youth.id === currentYouth.id ? currentYouth : youth
    );
    
    setYouthTalents(updatedYouths);
    setIsEditDialogOpen(false);
    toast.success(t('dashboard.youthUpdated'));
  };

  const confirmDeleteYouth = () => {
    if (!currentYouth) return;
    
    setYouthTalents(youthTalents.filter(youth => youth.id !== currentYouth.id));
    setIsDeleteDialogOpen(false);
    toast.success(t('dashboard.youthDeleted'));
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

      {/* Add Youth Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{t('dashboard.addYouth')}</DialogTitle>
            <DialogDescription>
              {t('dashboard.addYouthDescription')}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                {t('dashboard.name')}
              </Label>
              <Input
                id="name"
                value={newYouth.name}
                onChange={(e) => setNewYouth({...newYouth, name: e.target.value})}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="age" className="text-right">
                {t('dashboard.age')}
              </Label>
              <Input
                id="age"
                type="number"
                min="10"
                max="30"
                value={newYouth.age}
                onChange={(e) => setNewYouth({...newYouth, age: parseInt(e.target.value)})}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="talent" className="text-right">
                {t('dashboard.talent')}
              </Label>
              <Input
                id="talent"
                value={newYouth.talent}
                onChange={(e) => setNewYouth({...newYouth, talent: e.target.value})}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="program" className="text-right">
                {t('dashboard.program')}
              </Label>
              <Select 
                value={newYouth.program} 
                onValueChange={(value) => setNewYouth({...newYouth, program: value})}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder={t('dashboard.selectProgram')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Arts">Arts</SelectItem>
                  <SelectItem value="Sports">Sports</SelectItem>
                  <SelectItem value="Education">Education</SelectItem>
                  <SelectItem value="Health">Health</SelectItem>
                  <SelectItem value="Peace">Peace</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="joinedDate" className="text-right">
                {t('dashboard.joinedDate')}
              </Label>
              <Input
                id="joinedDate"
                type="date"
                value={newYouth.joinedDate}
                onChange={(e) => setNewYouth({...newYouth, joinedDate: e.target.value})}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              {t('dashboard.cancel')}
            </Button>
            <Button onClick={saveNewYouth} className="bg-vjn-blue hover:bg-vjn-light-blue">
              {t('dashboard.save')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Youth Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{t('dashboard.viewYouthDetails')}</DialogTitle>
          </DialogHeader>
          {currentYouth && (
            <div className="py-4">
              <div className="space-y-3">
                <div className="flex items-center">
                  <span className="font-medium w-32">{t('dashboard.name')}:</span>
                  <span>{currentYouth.name}</span>
                </div>
                <div className="flex items-center">
                  <span className="font-medium w-32">{t('dashboard.age')}:</span>
                  <span>{currentYouth.age} years</span>
                </div>
                <div className="flex items-center">
                  <span className="font-medium w-32">{t('dashboard.talent')}:</span>
                  <span>{currentYouth.talent}</span>
                </div>
                <div className="flex items-center">
                  <span className="font-medium w-32">{t('dashboard.program')}:</span>
                  <span>{currentYouth.program}</span>
                </div>
                <div className="flex items-center">
                  <span className="font-medium w-32">{t('dashboard.joinedDate')}:</span>
                  <span>{currentYouth.joinedDate}</span>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button onClick={() => setIsViewDialogOpen(false)}>
              {t('dashboard.close')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Youth Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{t('dashboard.editYouth')}</DialogTitle>
          </DialogHeader>
          {currentYouth && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-name" className="text-right">
                  {t('dashboard.name')}
                </Label>
                <Input
                  id="edit-name"
                  value={currentYouth.name}
                  onChange={(e) => setCurrentYouth({...currentYouth, name: e.target.value})}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-age" className="text-right">
                  {t('dashboard.age')}
                </Label>
                <Input
                  id="edit-age"
                  type="number"
                  min="10"
                  max="30"
                  value={currentYouth.age}
                  onChange={(e) => setCurrentYouth({...currentYouth, age: parseInt(e.target.value)})}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-talent" className="text-right">
                  {t('dashboard.talent')}
                </Label>
                <Input
                  id="edit-talent"
                  value={currentYouth.talent}
                  onChange={(e) => setCurrentYouth({...currentYouth, talent: e.target.value})}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-program" className="text-right">
                  {t('dashboard.program')}
                </Label>
                <Select 
                  value={currentYouth.program} 
                  onValueChange={(value) => setCurrentYouth({...currentYouth, program: value})}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder={t('dashboard.selectProgram')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Arts">Arts</SelectItem>
                    <SelectItem value="Sports">Sports</SelectItem>
                    <SelectItem value="Education">Education</SelectItem>
                    <SelectItem value="Health">Health</SelectItem>
                    <SelectItem value="Peace">Peace</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-joinedDate" className="text-right">
                  {t('dashboard.joinedDate')}
                </Label>
                <Input
                  id="edit-joinedDate"
                  type="date"
                  value={currentYouth.joinedDate}
                  onChange={(e) => setCurrentYouth({...currentYouth, joinedDate: e.target.value})}
                  className="col-span-3"
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              {t('dashboard.cancel')}
            </Button>
            <Button onClick={saveEditedYouth} className="bg-vjn-blue hover:bg-vjn-light-blue">
              {t('dashboard.save')}
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
              {t('dashboard.deleteYouthConfirmation')}
            </DialogDescription>
          </DialogHeader>
          {currentYouth && (
            <div className="py-4">
              <p className="text-center font-medium">{currentYouth.name}</p>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              {t('dashboard.cancel')}
            </Button>
            <Button variant="destructive" onClick={confirmDeleteYouth}>
              {t('dashboard.delete')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default YouthTalentsManagement;

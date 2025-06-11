import React, { useState, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Edit, Trash2, PlusCircle } from 'lucide-react';
import { ImageUpload } from '@/components/ImageUpload'; // Import ImageUpload component
import { useStaff, StaffMember } from '@/contexts/StaffContext'; // Import useStaff and StaffMember
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Interface for Staff Member (should match database schema)
interface StaffMember {
  id: number; // We'll generate IDs based on the data
  displayName: string; // New field from CSV
  firstName: string;
  lastName: string; // Corrected mapping
  position: string; // Mapped from 'Title'
  department?: string; // New field from CSV
  phone?: string; // Phone is not in this CSV, will be undefined
  email?: string;
  imageUrl?: string; // URL or path to the profile picture
  isSeniorManagement?: boolean; // New field to distinguish senior management
}

// Define titles considered as senior management
const seniorManagementTitles = [
  'Executive director',
  'Coordinator of Administration and Finance Services',
  'Programs Coordinator',
  'National coordinator/EU',
  'Human Resource Officer',
  'Dean of Studies',
  'Accountant/MISEREOR',
  'Project coordinator/Interpeace',
  'Digital Transformation Officer/Y4Y',
  'LA MENNAIS DIRECTOR'
];

// Data parsed from public/VJN staff.csv
const csvData = `Display name,email,First name,Last name,Title,Department,Preferred data location
Abdoulah,a.uwimana@visionjeunessenouvelle.org.rw,UWIMANA,Abdoulah,Facilitator Intern,Education,
Abdulkalim,m.mvunabandi@visionjeunessenouvelle.org.rw,MVUNABANDI,Abdulkalim,Assistant Technician,Sport culture and arts,
Adrien,a.hashakimana@visionjeunessenouvelle.org.rw,HASHAKIMANA,Adrien,School Director,Education,
Akabibi,a.akabibi@visionjeunessenouvelle.org.rw,AKABIBI,Adia,Communication and Visibility,VJN,
Ally Mustapha,a.mustapha@visionjeunessenou Nouvelle.org.rw,RWANGO,Ally Mustapha,Field Officer and Driver,Economic strengthening,
Amiel,a.manirakiza@visionjeunessenouvelle.org.rw,MANIRAKIZA,Amiel,Assistant Librarian and FI,Education,
BAMURANGE Juliene,b.juliene@visionjeunessenouvelle.org.rw,BAMURANGE,Juliene,Field Officer,Peace building,
Bienfait,b.uwizeye@visionjeunessenouvelle.org.rw,UWIZEYE,Bienfait,Programs Coordinator,Administration,
Brother Callixte,callixte@visionjeunessenouvelle.org.rw,Callixte,HABIYAREMYE,LA MENNAIS DIRECTOR,LAMENNAIS,
Celestin,c.nshimiyimana@visionjeunessenouvelle.org.rw,NSHIMIYIMANA,Celestin,Teacher in Automobile,Education,
Christine,c.uwizerimana@visionjeunessenouvelle.org.rw,UWIZERIMANA,Christine,Teacher in tailoring,Education,
COMMUNICATION,communication@visionjeunessenouvelle.org.rw,,,,,
Deborah,d.muhire@visionjeunessenouvelle.org.rw,MUHIRE,Deborah,Teacher in beauty and Hair dressing,Education,
Dusengimana,theophile@visionjeunessenouvelle.org.rw,DUSENGIMANA,Theophile,Ass.Finances and Aministration,VJN,
Emmanuel,e.iradukunda@visionjeunessenouvelle.org.rw,IRADUKUNDA,Emmanuel,Coordinator of Administration and Finance Services,General service,
Gisele,g.ishimwe@visionjeunessenouvelle.org.rw,ISHIMWE,Gisele,Receptionist at VJN HQ and FI,Education,
HABIYAREMYE Callixte,c.habiyaremye@visionjeunessenouvelle.org.rw,HABIYAREMYE,Callixte,,,
Hagenimana  Jean de DIeu,hagenimana@visionjeunessenouvelle.org.rw,Hagenimana,Jean de DIeu,,,
Hashakimana Adrien,adrien@visionjeunessenouvelle.org.rw,Hashakimana,Adrien,,,
ICYITEGETSE Victoire,v.icyitegetse@visionjeunessenouvelle.org.rw,ICYITEGETSE,Victoire,Administrative Assistant,Administration,
IRADUKUNDA Diane,d.iradukunda@visionjeunessenouvelle.org.rw,IRADUKUNDA,Diane,,,
Iragena,pascal@visionjeunessenouvelle.org.rw,IRAGENA,PASCAL,Accountant/MISEREOR,VJN,
Ismael,m.mpawenimana@visionjeunessenouvelle.org.rw,MPAWENIMANA,Ismael,Field Officer,Economic strengthening,
Izerimana Raphael,r.izerimana@visionjeunessenouvelle.org.rw,Izerimana,Raphael,,,
Jean Baptiste,n.baptiste@visionjeunessenouvelle.org.rw,NKUBITO,Jean Baptiste,Teacher of Children with disabilities,Education,
Julienne,b.bamurange@visionjeunessenouvelle.org.rw,BAMURANGE,Julienne,Field Officer,Peace building,
Kezia,k.uwizuru@visionjeunessenouvelle.org.rw,UWIZURU,Kezia,Teacher in tailoring,Education,
Marie,m.uwankana@visionjeunessenouvelle.org.rw,UWANKANA,Marie,Accountant,Finance,
Mukaremezo,m.mukaremezo@visionjeunessenouvelle.org.rw,MUKAREMEZO,Mediatrice,Programs Coordinator,VJN,
Ndakengerwa,m.ndakengerwa@visionjeunessenouvelle.org.rw,NDAKENGERWA,Moise,Project coordinator/Interpeace,VJN,
Nisingizwe Rugwiro,v.rugwiro@visionjeunessenouvelle.org.rw,NISINGIZWE RUGWIRO,Vanessa,Human Resource Officer,VJN,
Niyitegeka Mbonyurugo,b.niyitegeka@visionjeunessenouvelle.org.rw,NIYITEGEKA MBONYURUGO,Jean Bosco,Dean of Studies,VJN,
Nsanzubuhoro,philimin@visionjeunessenouvelle.org.rw,NSANZUBUHORO,Philimin,Field officer/Misereor,VJN,
Nsengiyaremye,quatremoteurs@visionjeunessenouvelle.org.rw,NSENGIYAREMYE,Quatremoteurs Faustin,Field officer/Alphabetisation&Evangelization,VJN,
Nyirashyerezo Viviane,viviane@visionjeunessenouvelle.org.rw,Nyirashyerezo,Viviane,,,
Nzitukuze,lionel@visionjeunessenouvelle.org.rw,NZITUKUZE,Lionel,Coordinator/GOPA,VJN,
ODILE NIYIGENA,o.niyigena@visionjeunessenouvelle.org.rw,ODILE,NIYIGENA,,,
Pascal,i.iragena@visionjeunessenouvelle.org.rw,IRAGENA,Pascal,Maintenance Officer,Administration,
Patrick,p.nkusi@visionjeunessenouvelle.org.rw,NKUSI,Patrick,Local Peace Advisor,Peace building,
Patrick,p.ntawusenyurwe@visionjeunessenouvelle.org.rw,NTAWUSENYURWE,Patrick,Studio Producer,Sport culture and arts,
Patrick,n.ndacyayisenga@visionjeunessenouvelle.org.rw,NDACYAYISENGA,Patrick,Teacher in welding,Education,
Ringuyeneza,v.ringuyeneza@visionjeunessenouvelle.org.rw,RINGUYENEZA,Vital,Executive director,VJN,
Segikwiye Venuste,v.segikwiye@visionjeunessenouvelle.org.rw,Segikwiye,Venuste,,,
Thogne DUSENGIMANA,dusengimana@visionjeunessenouvelle.org.rw,Thogne,DUSENGIMANA,,,
Thophile,d.dusengimana@visionjeunessenouvelle.org.rw,DUSENGIMANA,Thophile,Finance and Administration Assistant,Finance,
Thierry,t.izere@visionjeunessenouvelle.org.rw,IZERE,Thierry,Dean of Studies,Education,
Umurerwa,d.umurerwa@visionjeunessenouvelle.org.rw,UMURERWA,Divine,Digital Transformation Officer/Y4Y,VJN,
Umutoni,r.umutoni@visionjeunessenouvelle.org.rw,UMUTONI,Redempta,Receptionist,VJN,
Uwankana,marie@visionjeunessenouvelle.org.rw,UWANKANA,Marie,Field officer/Economic Strengthening ,VJN,
Uwizeye,bienfait@visionjeunessenouvelle.org.rw,UWIZEYE,Bienfait,National coordinator/EU,VJN,
Vanessa,v.nisingizwe@visionjeunessenouvelle.org.rw,NISINGIZWE RUGWIRO,Vanessa,Human Resources Officer and Logistician,Administration,
Vedaste,v.niyitegeka@visionjeunessenouvelle.org.rw,NIYITEGEKA,Vedaste,Receptionist at VTC and FI,Education,
Victoire,i.icyitegetse@visionjeunessenouvelle.org.rw,ICYITEGETSE,Victoire,Administrative Assistant,Administration,
`;

const parseCsv = (csvText: string): StaffMember[] => {
  const lines = csvText.trim().split('\n');
  const headers = lines[0].split(',');
  const data = lines.slice(1).map((line, index) => {
    const values = line.split(',');
    const position = values[headers.indexOf('Title')] || '';
    const staff: StaffMember = {
      id: index + 1, // Generate simple ID
      displayName: values[headers.indexOf('Display name')] || '',
      firstName: values[headers.indexOf('First name')] || '',
      lastName: values[headers.indexOf('Last name')] || '',
      position: position,
      department: values[headers.indexOf('Department')] || '',
      email: values[headers.indexOf('email')] || '',
      isSeniorManagement: seniorManagementTitles.includes(position.trim()), // Check if position is in senior management titles
      // Phone is not in this CSV, so it will be undefined
      // imageUrl is a placeholder, will be undefined
    };
    return staff;
  }).filter(staff => staff.displayName || staff.firstName || staff.lastName); // Filter out empty rows
  return data;
};

const staffData: StaffMember[] = parseCsv(csvData);

interface AddEditStaffModalProps {
  isOpen: boolean;
  onClose: () => void;
  formData: {
    lastName: string;
    firstName: string;
    position: string;
    department: string;
    phone: string;
    email: string;
    imageUrl: string;
  };
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSave: () => void;
  isEditing: boolean;
  initialImageUrl?: string;
  allDepartments: string[]; // Add prop for all departments
}

const AddEditStaffModal: React.FC<AddEditStaffModalProps> = ({
  isOpen,
  onClose,
  formData,
  onInputChange,
  onSave,
  isEditing,
  initialImageUrl,
  allDepartments // Destructure allDepartments
}) => {
  const { t } = useTranslation();

  const handleImageUpload = (imageUrl: string) => {
    onInputChange({ target: { name: 'imageUrl', value: imageUrl } } as React.ChangeEvent<HTMLInputElement>);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{isEditing ? t('dashboard.staff.editStaff', 'Edit Staff Member') : t('dashboard.staff.addStaff', 'Add New Staff Member')}</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
          <div className="col-span-1">
            <Label htmlFor="firstName">{t('staff.firstName', 'First Name')}</Label>
            <Input id="firstName" name="firstName" value={formData.firstName} onChange={onInputChange} />
          </div>
          <div className="col-span-1">
            <Label htmlFor="lastName">{t('staff.lastName', 'Last Name')}</Label>
            <Input id="lastName" name="lastName" value={formData.lastName} onChange={onInputChange} />
          </div>
          <div className="col-span-1">
            <Label htmlFor="position">{t('staff.position', 'Position')}</Label>
            <Input id="position" name="position" value={formData.position} onChange={onInputChange} />
          </div>
          <div className="col-span-1">
            <Label htmlFor="department">{t('staff.department', 'Department')}</Label>
            <Select onValueChange={(value) => onInputChange({ target: { name: 'department', value } } as React.ChangeEvent<HTMLInputElement>)} value={formData.department}>
              <SelectTrigger>
                <SelectValue placeholder="Select a department" />
              </SelectTrigger>
              <SelectContent>
                {allDepartments.map(dept => (
                  <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="col-span-1">
            <Label htmlFor="phone">{t('staff.phone', 'Phone')}</Label>
            <Input id="phone" name="phone" value={formData.phone} onChange={onInputChange} />
          </div>
          <div className="col-span-1">
            <Label htmlFor="email">{t('staff.email', 'Email')}</Label>
            <Input id="email" name="email" value={formData.email} onChange={onInputChange} />
          </div>
          <div className="md:col-span-2">
            <ImageUpload
              onImageUpload={handleImageUpload}
              initialImage={initialImageUrl}
              bucketName="staff-photos" // Specify the bucket for staff photos
              label={t('staff.image', 'Profile Image')}
              description={t('staff.imageDescription', 'Upload a profile picture for the staff member.')}
              aspectRatio={1/1} // Assuming square profile pictures
              maxSize={2} // Max 2MB for profile pictures
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={onSave}>{isEditing ? t('saveChanges', 'Save changes') : t('addStaff', 'Add Staff')}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

const StaffManagement = () => {
  const { t } = useTranslation();
  const { staff, addStaff, updateStaff, deleteStaff, allDepartments, seniorManagementTitles } = useStaff(); // Use context
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStaff, setEditingStaff] = useState<StaffMember | null>(null);
  const [formData, setFormData] = useState({
    lastName: '',
    firstName: '',
    position: '',
    department: '',
    phone: '',
    email: '',
    imageUrl: '',
  });
  const [sortConfig, setSortConfig] = useState<{ key: keyof StaffMember; direction: 'ascending' | 'descending' | null }>({ key: 'isSeniorManagement', direction: 'descending' }); // Default sort by senior management descending

  const sortedStaff = useMemo(() => {
    let sortableStaff = [...staff];
    if (sortConfig.key !== null) {
      sortableStaff.sort((a, b) => {
        if (sortConfig.key === 'isSeniorManagement') {
          // Senior management always comes first
          if (a.isSeniorManagement && !b.isSeniorManagement) return -1;
          if (!a.isSeniorManagement && b.isSeniorManagement) return 1;
        }

        // Secondary sort by department
        if (sortConfig.key === 'department' && a.department && b.department) {
          const departmentA = a.department.toLowerCase();
          const departmentB = b.department.toLowerCase();
          if (departmentA < departmentB) return sortConfig.direction === 'ascending' ? -1 : 1;
          if (departmentA > departmentB) return sortConfig.direction === 'ascending' ? 1 : -1;
        }

        // Tertiary sort by position (alphabetical)
        if (sortConfig.key === 'position' && a.position && b.position) {
          const positionA = a.position.toLowerCase();
          const positionB = b.position.toLowerCase();
          if (positionA < positionB) return sortConfig.direction === 'ascending' ? -1 : 1;
          if (positionA > positionB) return sortConfig.direction === 'ascending' ? 1 : -1;
        }

        // Default alphabetical sort for other keys or if primary/secondary are equal
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];

        if (typeof aValue === 'string' && typeof bValue === 'string') {
          if (aValue < bValue) {
            return sortConfig.direction === 'ascending' ? -1 : 1;
          }
          if (aValue > bValue) {
            return sortConfig.direction === 'ascending' ? 1 : -1;
          }
        }
        return 0;
      });
    }
    return sortableStaff;
  }, [staff, sortConfig]);

  const requestSort = (key: keyof StaffMember) => {
    let direction: 'ascending' | 'descending' | null = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    } else if (sortConfig.key === key && sortConfig.direction === 'descending') {
        direction = null; // Cycle to no sort if already descending
    }
    setSortConfig({ key, direction });
  };

  const getSortIndicator = (key: keyof StaffMember) => {
    if (sortConfig.key === key) {
      if (sortConfig.direction === 'ascending') return ' ▲';
      if (sortConfig.direction === 'descending') return ' ▼';
    }
    return '';
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddStaff = () => {
    setEditingStaff(null);
    setFormData({ lastName: '', firstName: '', position: '', department: '', phone: '', email: '', imageUrl: '' });
    setIsModalOpen(true);
  };

  const handleEditStaff = (staffMember: StaffMember) => {
    setEditingStaff(staffMember);
    setFormData({
      lastName: staffMember.lastName,
      firstName: staffMember.firstName,
      position: staffMember.position,
      department: staffMember.department || '',
      phone: staffMember.phone || '',
      email: staffMember.email || '',
      imageUrl: staffMember.imageUrl || '',
    });
    setIsModalOpen(true);
  };

  const handleDeleteStaff = async (id: number) => {
    if (confirm('Are you sure you want to delete this staff member?')) {
      await deleteStaff(id);
    }
  };

  const handleSaveStaff = async () => {
    if (editingStaff) {
      await updateStaff(editingStaff.id, formData);
    } else {
      await addStaff(formData);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">{t('dashboard.staff.title', 'Manage Staff')}</h1>

      <Button className="mb-4" onClick={handleAddStaff}>
        <PlusCircle className="mr-2" size={18} />
        {t('dashboard.staff.add', 'Add New Staff')}
      </Button>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead onClick={() => requestSort('id')} className="cursor-pointer"># {getSortIndicator('id')}</TableHead>
              <TableHead onClick={() => requestSort('displayName')} className="cursor-pointer">{t('staff.displayName', 'Display Name')} {getSortIndicator('displayName')}</TableHead>
              <TableHead onClick={() => requestSort('firstName')} className="cursor-pointer">{t('staff.firstName', 'First Name')} {getSortIndicator('firstName')}</TableHead>
              <TableHead onClick={() => requestSort('lastName')} className="cursor-pointer">{t('staff.lastName', 'Last Name')} {getSortIndicator('lastName')}</TableHead>
              <TableHead onClick={() => requestSort('position')} className="cursor-pointer">{t('staff.position', 'Position')} {getSortIndicator('position')}</TableHead>
              <TableHead onClick={() => requestSort('department')} className="cursor-pointer">{t('staff.department', 'Department')} {getSortIndicator('department')}</TableHead>
              <TableHead>{t('staff.phone', 'Phone')}</TableHead>
              <TableHead>{t('staff.email', 'Email')}</TableHead>
              <TableHead>{t('staff.image', 'Image URL')}</TableHead>
              <TableHead>{t('actions', 'Actions')}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedStaff.map((member) => (
              <TableRow key={member.id} className={member.isSeniorManagement ? 'bg-blue-50/20 hover:bg-blue-100/30' : ''}>
                <TableCell>{member.id}</TableCell>
                <TableCell>{member.displayName}</TableCell>
                <TableCell>{member.firstName}</TableCell>
                <TableCell>{member.lastName}</TableCell>
                <TableCell>{member.position}</TableCell>
                <TableCell>{member.department}</TableCell>
                <TableCell>{member.phone}</TableCell>
                <TableCell>{member.email}</TableCell>
                <TableCell>{member.imageUrl}</TableCell>
                <TableCell className="flex items-center space-x-2">
                  <Button variant="outline" size="sm" onClick={() => handleEditStaff(member)}>
                    <Edit size={16} />
                  </Button>
                  <Button variant="destructive" size="sm" onClick={() => handleDeleteStaff(member.id)}>
                    <Trash2 size={16} />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <AddEditStaffModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        formData={formData}
        onInputChange={handleInputChange}
        onSave={handleSaveStaff}
        isEditing={editingStaff !== null}
        initialImageUrl={editingStaff?.imageUrl}
        allDepartments={allDepartments} // Pass allDepartments to the modal
      />
    </div>
  );
};

export default StaffManagement; 
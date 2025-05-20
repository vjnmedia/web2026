import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Edit, Trash2, PlusCircle } from 'lucide-react';

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
}

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
Victoire,i.icyitegetse@visionjeunessenouvelle.org.rw,ICYITEGETSE,Victoire,Executive Assistant,Administration,
`;

const parseCsv = (csvText: string): StaffMember[] => {
  const lines = csvText.trim().split('\n');
  const headers = lines[0].split(',');
  const data = lines.slice(1).map((line, index) => {
    const values = line.split(',');
    const staff: StaffMember = {
      id: index + 1, // Generate simple ID
      displayName: values[headers.indexOf('Display name')] || '',
      firstName: values[headers.indexOf('First name')] || '',
      lastName: values[headers.indexOf('Last name')] || '',
      position: values[headers.indexOf('Title')] || '',
      department: values[headers.indexOf('Department')] || '',
      email: values[headers.indexOf('email')] || '',
      // Phone is not in this CSV, so it will be undefined
      // imageUrl is a placeholder, will be undefined
    };
    return staff;
  }).filter(staff => staff.displayName || staff.firstName || staff.lastName); // Filter out empty rows
};

const staffData: StaffMember[] = parseCsv(csvData);

const StaffManagement = () => {
  const { t } = useTranslation();
  const [staff, setStaff] = useState<StaffMember[]>(staffData); // Initialize with parsed data
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStaff, setEditingStaff] = useState<StaffMember | null>(null);
  const [formData, setFormData] = useState({
    lastName: '',
    firstName: '',
    position: '',
    department: '', // Added department to form data
    phone: '',
    email: '',
    imageUrl: '',
  });

  // --- Database/API Interaction (Placeholders) ---
  useEffect(() => {
    // TODO: Fetch staff data from your backend API on component mount
    // This useEffect might be adjusted later when integrating with a backend
    // Example: fetch('/api/staff').then(res => res.json()).then(data => setStaff(data));
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddStaff = () => {
    setEditingStaff(null);
    setFormData({ lastName: '', firstName: '', position: '', department: '', phone: '', email: '', imageUrl: '' }); // Reset form with department
    setIsModalOpen(true);
  };

  const handleEditStaff = (staff: StaffMember) => {
    setEditingStaff(staff);
    setFormData({
      lastName: staff.lastName,
      firstName: staff.firstName,
      position: staff.position,
      department: staff.department || '', // Populate department in form
      phone: staff.phone || '',
      email: staff.email || '',
      imageUrl: staff.imageUrl || '',
    });
    setIsModalOpen(true);
  };

  const handleDeleteStaff = (id: number) => {
    // TODO: Implement delete logic via API
    console.log('Deleting staff with id:', id);
    setStaff(staff.filter(s => s.id !== id)); // Optimistic update
  };

  const handleSaveStaff = () => {
    if (editingStaff) {
      // TODO: Implement update logic via API
      console.log('Updating staff:', { ...editingStaff, ...formData });
      setStaff(staff.map(s => s.id === editingStaff.id ? { ...s, ...formData, id: s.id } : s)); // Optimistic update
    } else {
      // TODO: Implement create logic via API
      console.log('Adding new staff:', formData);
      // Assuming backend returns new staff with ID
      const newStaff = { ...formData, id: staff.length + 1 }; // Mock ID assignment
      setStaff([...staff, newStaff]); // Optimistic update
    }
    setIsModalOpen(false);
  };
  // -----------------------------------------

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
              <TableHead>#</TableHead>
              <TableHead>{t('staff.displayName', 'Display Name')}</TableHead> {/* Display Name Column */}
              <TableHead>{t('staff.firstName', 'First Name')}</TableHead>
              <TableHead>{t('staff.lastName', 'Last Name')}</TableHead>
              <TableHead>{t('staff.position', 'Position')}</TableHead>
              <TableHead>{t('staff.department', 'Department')}</TableHead> {/* Department Column */}
              <TableHead>{t('staff.phone', 'Phone')}</TableHead>
              <TableHead>{t('staff.email', 'Email')}</TableHead>
              <TableHead>{t('staff.image', 'Image URL')}</TableHead>
              <TableHead>{t('actions', 'Actions')}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {staff.map((member) => (
              <TableRow key={member.id}>
                <TableCell>{member.id}</TableCell>
                <TableCell>{member.displayName}</TableCell> {/* Display Name Data */}
                <TableCell>{member.firstName}</TableCell>
                <TableCell>{member.lastName}</TableCell>
                <TableCell>{member.position}</TableCell>
                <TableCell>{member.department}</TableCell> {/* Department Data */}
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

      {/* Add/Edit Staff Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{editingStaff ? t('dashboard.staff.edit', 'Edit Staff') : t('dashboard.staff.add', 'Add New Staff')}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="displayName" className="text-right">
                 {t('staff.displayName', 'Display Name')}
              </Label>
              <Input
                id="displayName"
                name="displayName"
                value={formData.displayName}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="firstName" className="text-right">
                {t('staff.firstName', 'First Name')}
              </Label>
              <Input
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="lastName" className="text-right">
                {t('staff.lastName', 'Last Name')}
              </Label>
              <Input
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="position" className="text-right">
                {t('staff.position', 'Position')}
              </Label>
              <Input
                id="position"
                name="position"
                value={formData.position}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="department" className="text-right">
                {t('staff.department', 'Department')}
              </Label>
              <Input
                id="department"
                name="department"
                value={formData.department}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="phone" className="text-right">
                {t('staff.phone', 'Phone')}
              </Label>
              <Input
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                {t('staff.email', 'Email')}
              </Label>
              <Input
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="imageUrl" className="text-right">
                {t('staff.image', 'Image URL')}
              </Label>
              <Input
                id="imageUrl"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleSaveStaff}>{editingStaff ? t('save', 'Save changes') : t('add', 'Add')}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default StaffManagement; 
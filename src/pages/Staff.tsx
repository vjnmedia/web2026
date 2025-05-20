import React, { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Mail, Phone, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface StaffMember {
  id: number; // We'll generate IDs based on the data
  displayName: string; // New field from CSV
  firstName: string;
  lastName: string; // Corrected mapping
  position: string; // Mapped from 'Title'
  department?: string; // New field from CSV
  phone?: string; // Phone is not in this CSV, will be undefined
  email?: string;
  imageUrl?: string; // Placeholder for profile picture
}

// Data parsed from public/VJN staff.csv
const csvData = `Display name,email,First name,Last name,Title,Department,Preferred data location
Abdoulah,a.uwimana@visionjeunessenouvelle.org.rw,UWIMANA,Abdoulah,Facilitator Intern,Education,
Abdulkalim,m.mvunabandi@visionjeunessenouvelle.org.rw,MVUNABANDI,Abdulkalim,Assistant Technician,Sport culture and arts,
Adrien,a.hashakimana@visionjeunessenouvelle.org.rw,HASHAKIMANA,Adrien,School Director,Education,
Akabibi,a.akabibi@visionjeunessenouvelle.org.rw,AKABIBI,Adia,Communication and Visibility,VJN,
Ally Mustapha,a.mustapha@visionjeunessenouvelle.org.rw,RWANGO,Ally Mustapha,Field Officer and Driver,Economic strengthening,
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
  try {
    const lines = csvText.trim().split('\n');
    const headers = lines[0].split(',');
    return lines.slice(1).map((line, index) => {
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
  } catch (error) {
    console.error('Error parsing CSV:', error);
    return []; // Return empty array if parsing fails
  }
};

const Staff = () => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('All');

  // Initialize staffData with useMemo
  const staffData = useMemo(() => {
    const parsed = parseCsv(csvData);
    return Array.isArray(parsed) ? parsed : [];
  }, []);

  // Get unique departments with useMemo
  const departments = useMemo(() => {
    if (!Array.isArray(staffData)) return ['All'];
    const depts = new Set(staffData.map(staff => staff.department).filter(Boolean));
    return ['All', ...Array.from(depts)];
  }, [staffData]);

  // Filter staff with useMemo
  const filteredStaff = useMemo(() => {
    if (!Array.isArray(staffData)) return [];
    return staffData.filter(staff => {
      const searchLower = searchTerm.toLowerCase();
      const matchesSearch = 
        staff.displayName.toLowerCase().includes(searchLower) ||
        staff.firstName.toLowerCase().includes(searchLower) ||
        staff.lastName.toLowerCase().includes(searchLower) ||
        staff.position.toLowerCase().includes(searchLower) ||
        (staff.department && staff.department.toLowerCase().includes(searchLower));

      const matchesDepartment = selectedDepartment === 'All' || staff.department === selectedDepartment;

      return matchesSearch && matchesDepartment;
    });
  }, [staffData, searchTerm, selectedDepartment]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">{t('staff.title', 'Our Staff')}</h1>

      {/* Filter and Search */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <Input
            type="text"
            placeholder={t('staff.searchPlaceholder', 'Search staff...')}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select onValueChange={setSelectedDepartment} value={selectedDepartment}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder={t('staff.filterByDepartment', 'Filter by Department')} />
          </SelectTrigger>
          <SelectContent>
            {departments.map(dept => (
              <SelectItem key={dept} value={dept}>{dept}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredStaff.map((staff) => (
          <Card key={staff.id} className="flex flex-col items-center text-center">
            <CardHeader className="pb-2">
              <Avatar className="h-24 w-24 mb-4">
                <AvatarImage src={staff.imageUrl} alt={`${staff.firstName} ${staff.lastName}`} />
                <AvatarFallback>{staff.firstName.charAt(0)}{staff.lastName.charAt(0)}</AvatarFallback>
              </Avatar>
              <CardTitle className="text-xl">{`${staff.firstName} ${staff.lastName}`}</CardTitle>
              <p className="text-sm text-gray-600">{staff.position}</p>
              {staff.department && <p className="text-xs text-gray-500">{staff.department}</p>}
            </CardHeader>
            <CardContent className="text-sm text-gray-700 w-full">
              {staff.phone && (
                <div className="flex items-center justify-center mb-1">
                  <Phone className="h-4 w-4 mr-2" />
                  <span>{staff.phone}</span>
                </div>
              )}
              {staff.email && (
                <div className="flex items-center justify-center">
                  <Mail className="h-4 w-4 mr-2" />
                  <a href={`mailto:${staff.email}`} className="hover:underline">{staff.email}</a>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
       {filteredStaff.length === 0 && (
        <div className="text-center text-gray-500 text-lg mt-8">
          {t('staff.noResults', 'No staff found matching your criteria.')}
        </div>
      )}
    </div>
  );
};

export default Staff; 
import React, { useState, useMemo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Mail, Phone, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useStaff, StaffMember } from '@/contexts/StaffContext'; // Import useStaff and StaffMember type
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'; // Import Collapsible components
import { ChevronDown } from 'lucide-react'; // Import ChevronDown icon

// Removed: interface StaffMember { ... }

// Removed: const csvData = `...`;

// Removed: const parseCsv = (csvText: string): StaffMember[] => { ... };

const Staff = () => {
  const { t } = useTranslation();
  const { staff: allStaff, isLoading, error } = useStaff(); // Use staff from context
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('All');

  // Get unique departments from context staff
  const departments = useMemo(() => {
    if (!Array.isArray(allStaff)) return ['All'];
    const depts = new Set(allStaff.map(staff => staff.department).filter(Boolean));
    return ['All', ...Array.from(depts)];
  }, [allStaff]);

  // Filter staff with useMemo
  const filteredStaff = useMemo(() => {
    if (isLoading || error) return [];
    if (!Array.isArray(allStaff)) return [];

    let staffToShow = allStaff.filter(staff => {
      const searchLower = searchTerm.toLowerCase();
      const matchesSearch = 
        (staff.displayName && staff.displayName.toLowerCase().includes(searchLower)) ||
        (staff.firstName && staff.firstName.toLowerCase().includes(searchLower)) ||
        (staff.lastName && staff.lastName.toLowerCase().includes(searchLower)) ||
        (staff.position && staff.position.toLowerCase().includes(searchLower)) ||
        (staff.department && staff.department.toLowerCase().includes(searchLower));

      const matchesDepartment = selectedDepartment === 'All' || staff.department === selectedDepartment;

      return matchesSearch && matchesDepartment;
    });

    // Custom sorting logic
    staffToShow.sort((a, b) => {
      // 1. Executive Director at the very top
      const aIsExecutiveDirector = a.position.toLowerCase().includes('executive director');
      const bIsExecutiveDirector = b.position.toLowerCase().includes('executive director');

      if (aIsExecutiveDirector && !bIsExecutiveDirector) return -1;
      if (!aIsExecutiveDirector && bIsExecutiveDirector) return 1;

      // 2. Program Coordinator and Director of Finance (or similar) next
      const aIsSecondTier = a.position.toLowerCase().includes('program coordinator') || a.position.toLowerCase().includes('finance and administration assistant') || a.position.toLowerCase().includes('managing director of lamennais ltd');
      const bIsSecondTier = b.position.toLowerCase().includes('program coordinator') || b.position.toLowerCase().includes('finance and administration assistant') || b.position.toLowerCase().includes('managing director of lamennais ltd');

      if (aIsExecutiveDirector && bIsExecutiveDirector) {
        // If both are Executive Directors, sort alphabetically by last name
        return (a.lastName || '').localeCompare(b.lastName || '');
      }

      if (aIsSecondTier && !bIsSecondTier) return -1;
      if (!aIsSecondTier && bIsSecondTier) return 1;

      if (aIsSecondTier && bIsSecondTier) {
        // If both are second tier, sort alphabetically by position, then by last name
        const positionCompare = (a.position || '').localeCompare(b.position || '');
        if (positionCompare !== 0) return positionCompare;
        return (a.lastName || '').localeCompare(b.lastName || '');
      }
      
      // Default sorting: senior management first (from context), then department, then position
      if (a.isSeniorManagement && !b.isSeniorManagement) return -1;
      if (!a.isSeniorManagement && b.isSeniorManagement) return 1;

      if (a.department && b.department) {
        const departmentCompare = a.department.localeCompare(b.department);
        if (departmentCompare !== 0) return departmentCompare;
      }
      return (a.position || '').localeCompare(b.position || '');
    });

    return staffToShow;
  }, [allStaff, searchTerm, selectedDepartment, isLoading, error]);

  const groupedStaff = useMemo(() => {
    const groups: { [key: string]: StaffMember[] } = {};
    filteredStaff.forEach(member => {
      const department = member.department || t('staff.unspecifiedDepartment', 'Unspecified Department');
      if (!groups[department]) {
        groups[department] = [];
      }
      groups[department].push(member);
    });
    return groups;
  }, [filteredStaff, t]);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-vjn-blue text-white py-20">
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {t('staff.heroTitle', 'Meet Our Dedicated Team')}
            </h1>
            <p className="text-lg md:text-xl max-w-2xl mx-auto">
              {t('staff.heroSubtitle', 'Together, we work towards empowering youth and building stronger communities')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-gray-900">
              {t('staff.introTitle', 'Passionate Professionals Making a Difference')}
            </h2>
            <p className="text-gray-600 mb-8 leading-relaxed">
              {t('staff.introText', 'Our team consists of dedicated professionals from diverse backgrounds, united by a common goal: to create positive change in our community. Each member brings unique expertise and perspective to our mission of youth empowerment and community development.')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Staff Directory Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
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
                <SelectItem value="All">All Departments</SelectItem>
                {departments.map(dept => (
                  <SelectItem key={dept} value={dept}>
                    {dept}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-vjn-blue" />
              <p className="ml-3 text-gray-600">Loading staff...</p>
            </div>
          ) : error ? (
            <div className="text-center py-8 text-red-500">
              <p>{error}</p>
            </div>
          ) : filteredStaff.length === 0 ? (
            <div className="text-center py-8 text-gray-600">
              <p>{t('staff.noStaffFound', 'No staff members found matching your criteria.')}</p>
            </div>
          ) : (
            <div className="space-y-8">
              {Object.entries(groupedStaff).map(([department, members]) => (
                <Collapsible key={department} defaultOpen={true}>
                  <CollapsibleTrigger className="flex justify-between items-center w-full px-4 py-3 bg-gray-100 rounded-md shadow-sm hover:bg-gray-200 transition-colors duration-200 text-left text-lg font-semibold text-gray-800">
                    {department} ({members.length})
                    <ChevronDown className="h-5 w-5 transition-transform duration-200 data-[state=open]:rotate-180" />
                  </CollapsibleTrigger>
                  <CollapsibleContent className="pt-6">
                    <motion.div
                      initial="hidden"
                      animate="visible"
                      variants={containerVariants}
                      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    >
                      {members.map((member) => (
                        <motion.div variants={itemVariants} key={member.id}>
                          <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                            <CardHeader className="p-0 relative h-48 bg-vjn-blue flex items-center justify-center">
                              {member.imageUrl ? (
                                <Avatar className="w-32 h-32 border-4 border-white shadow-md z-10">
                                  <AvatarImage src={member.imageUrl} alt={member.displayName || `${member.firstName} ${member.lastName}`} />
                                  <AvatarFallback className="text-xl font-semibold bg-white text-vjn-blue">
                                    {(member.firstName ? member.firstName[0] : '') + (member.lastName ? member.lastName[0] : '')}
                                  </AvatarFallback>
                                </Avatar>
                              ) : (
                                <Avatar className="w-32 h-32 border-4 border-white shadow-md z-10">
                                  <AvatarFallback className="text-xl font-semibold bg-white text-vjn-blue">
                                    {(member.firstName ? member.firstName[0] : '') + (member.lastName ? member.lastName[0] : '')}
                                  </AvatarFallback>
                                </Avatar>
                              )}
                              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent"></div>
                            </CardHeader>
                            <CardContent className="pt-6 text-center">
                              <CardTitle className="text-xl font-bold text-gray-900 mb-1">
                                {member.displayName || `${member.firstName} ${member.lastName}`}
                              </CardTitle>
                              <p className="text-gray-900 font-semibold mb-2">{member.position}</p>
                              {member.department && (
                                <p className="text-gray-900 text-sm mb-2">{member.department}</p>
                              )}
                              <div className="flex items-center justify-center space-x-4 text-gray-700">
                                {member.email && (
                                  <a href={`mailto:${member.email}`} className="hover:text-vjn-blue transition-colors">
                                    <Mail size={18} />
                                  </a>
                                )}
                                {member.phone && (
                                  <a href={`tel:${member.phone}`} className="hover:text-vjn-blue transition-colors">
                                    <Phone size={18} />
                                  </a>
                                )}
                              </div>
                            </CardContent>
                          </Card>
                        </motion.div>
                      ))}
                    </motion.div>
                  </CollapsibleContent>
                </Collapsible>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Staff;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
}; 
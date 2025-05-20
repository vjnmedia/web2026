import { Button } from "@/components/ui/button";
import { Download, Trash2, FileSpreadsheet, FileText, Upload, Edit } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import * as XLSX from 'xlsx';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import DMSBulkUpdate from './DMSBulkUpdate';
import DMSImport from './DMSImport';

interface DMSBulkActionsProps {
  selectedItems: any[];
  onDelete: (ids: number[]) => void;
  onBulkUpdate: (data: any) => void;
  onImport: (data: any[]) => void;
  type: 'project' | 'youth' | 'team';
  data: any[];
}

const DMSBulkActions = ({ selectedItems, onDelete, onBulkUpdate, onImport, type, data }: DMSBulkActionsProps) => {
  const [isExporting, setIsExporting] = useState(false);
  const [isBulkUpdateOpen, setIsBulkUpdateOpen] = useState(false);
  const [isImportOpen, setIsImportOpen] = useState(false);

  const handleExportCSV = () => {
    setIsExporting(true);
    try {
      const worksheet = XLSX.utils.json_to_sheet(data);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, type);
      XLSX.writeFile(workbook, `${type}_export_${new Date().toISOString().split('T')[0]}.xlsx`);
      toast.success('Data exported successfully');
    } catch (error) {
      console.error('Error exporting data:', error);
      toast.error('Failed to export data');
    } finally {
      setIsExporting(false);
    }
  };

  const handleExportPDF = () => {
    setIsExporting(true);
    try {
      const doc = new jsPDF();
      
      // Add title
      doc.setFontSize(16);
      doc.text(`${type.charAt(0).toUpperCase() + type.slice(1)} Data Export`, 14, 15);
      
      // Add date
      doc.setFontSize(10);
      doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 22);

      // Prepare table data
      const tableData = data.map(item => {
        switch (type) {
          case 'project':
            return [
              item.name,
              item.status,
              item.startDate,
              item.endDate,
              `$${item.budget.toLocaleString()}`,
              item.location
            ];
          case 'youth':
            return [
              item.name,
              item.age,
              item.talent,
              item.program,
              item.joinedDate
            ];
          case 'team':
            return [
              item.name,
              item.sport,
              item.members,
              item.coach,
              item.founded
            ];
          default:
            return [];
        }
      });

      // Define table headers based on type
      const headers = {
        project: ['Name', 'Status', 'Start Date', 'End Date', 'Budget', 'Location'],
        youth: ['Name', 'Age', 'Talent', 'Program', 'Joined Date'],
        team: ['Name', 'Sport', 'Members', 'Coach', 'Founded']
      };

      // Add table
      (doc as any).autoTable({
        head: [headers[type]],
        body: tableData,
        startY: 30,
        theme: 'grid',
        styles: { fontSize: 8 },
        headStyles: { fillColor: [41, 128, 185] }
      });

      // Save the PDF
      doc.save(`${type}_export_${new Date().toISOString().split('T')[0]}.pdf`);
      toast.success('PDF exported successfully');
    } catch (error) {
      console.error('Error exporting PDF:', error);
      toast.error('Failed to export PDF');
    } finally {
      setIsExporting(false);
    }
  };

  const handleBulkDelete = () => {
    if (!confirm(`Are you sure you want to delete ${selectedItems.length} items?`)) return;
    onDelete(selectedItems.map(item => item.id));
  };

  const handleBulkUpdate = (data: any) => {
    onBulkUpdate(data);
    setIsBulkUpdateOpen(false);
  };

  const handleImport = (data: any[]) => {
    onImport(data);
    setIsImportOpen(false);
  };

  return (
    <>
      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsImportOpen(true)}
        >
          <Upload className="h-4 w-4 mr-2" />
          Import
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={handleExportCSV}
          disabled={isExporting || data.length === 0}
        >
          <FileSpreadsheet className="h-4 w-4 mr-2" />
          Export CSV
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={handleExportPDF}
          disabled={isExporting || data.length === 0}
        >
          <FileText className="h-4 w-4 mr-2" />
          Export PDF
        </Button>
        {selectedItems.length > 0 && (
          <>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsBulkUpdateOpen(true)}
            >
              <Edit className="h-4 w-4 mr-2" />
              Update Selected ({selectedItems.length})
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={handleBulkDelete}
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete Selected ({selectedItems.length})
            </Button>
          </>
        )}
      </div>

      <DMSBulkUpdate
        isOpen={isBulkUpdateOpen}
        onClose={() => setIsBulkUpdateOpen(false)}
        onSubmit={handleBulkUpdate}
        type={type}
        selectedCount={selectedItems.length}
      />

      <DMSImport
        isOpen={isImportOpen}
        onClose={() => setIsImportOpen(false)}
        onSubmit={handleImport}
        type={type}
      />
    </>
  );
};

export default DMSBulkActions; 
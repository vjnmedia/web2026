import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { toast } from "sonner";
import * as XLSX from 'xlsx';

interface DMSImportProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any[]) => void;
  type: 'project' | 'youth' | 'team';
}

const DMSImport = ({ isOpen, onClose, onSubmit, type }: DMSImportProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
          selectedFile.type === 'application/vnd.ms-excel') {
        setFile(selectedFile);
      } else {
        toast.error('Please select a valid Excel file (.xlsx or .xls)');
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    setIsLoading(true);
    try {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = new Uint8Array(e.target?.result as ArrayBuffer);
          const workbook = XLSX.read(data, { type: 'array' });
          const worksheet = workbook.Sheets[workbook.SheetNames[0]];
          const jsonData = XLSX.utils.sheet_to_json(worksheet);

          // Validate and transform data based on type
          const validatedData = jsonData.map((item: any) => {
            switch (type) {
              case 'project':
                return {
                  name: item.name,
                  status: item.status || 'active',
                  startDate: item.startDate,
                  endDate: item.endDate,
                  budget: Number(item.budget),
                  location: item.location
                };
              case 'youth':
                return {
                  name: item.name,
                  age: Number(item.age),
                  talent: item.talent,
                  program: item.program,
                  joinedDate: item.joinedDate
                };
              case 'team':
                return {
                  name: item.name,
                  sport: item.sport,
                  members: Number(item.members),
                  coach: item.coach,
                  founded: item.founded
                };
              default:
                return item;
            }
          });

          onSubmit(validatedData);
          toast.success('File processed successfully');
          onClose();
        } catch (error) {
          console.error('Error processing file:', error);
          toast.error('Failed to process file. Please check the format.');
        }
      };
      reader.readAsArrayBuffer(file);
    } catch (error) {
      console.error('Error reading file:', error);
      toast.error('Failed to read file');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Import {type.charAt(0).toUpperCase() + type.slice(1)}s</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="file" className="text-right">Excel File</Label>
              <Input
                id="file"
                type="file"
                accept=".xlsx,.xls"
                onChange={handleFileChange}
                className="col-span-3"
              />
            </div>
            <div className="text-sm text-gray-500">
              <p>Please upload an Excel file with the following columns:</p>
              {type === 'project' && (
                <ul className="list-disc list-inside">
                  <li>name (required)</li>
                  <li>status (optional, defaults to 'active')</li>
                  <li>startDate (required)</li>
                  <li>endDate (required)</li>
                  <li>budget (required, numeric)</li>
                  <li>location (required)</li>
                </ul>
              )}
              {type === 'youth' && (
                <ul className="list-disc list-inside">
                  <li>name (required)</li>
                  <li>age (required, numeric)</li>
                  <li>talent (required)</li>
                  <li>program (required)</li>
                  <li>joinedDate (required)</li>
                </ul>
              )}
              {type === 'team' && (
                <ul className="list-disc list-inside">
                  <li>name (required)</li>
                  <li>sport (required)</li>
                  <li>members (required, numeric)</li>
                  <li>coach (required)</li>
                  <li>founded (required)</li>
                </ul>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={!file || isLoading}>
              {isLoading ? 'Processing...' : 'Import'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default DMSImport; 
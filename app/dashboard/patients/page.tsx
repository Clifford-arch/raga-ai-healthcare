'use client';

import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { PatientGrid } from '@/components/patients/patient-grid';
import { PatientList } from '@/components/patients/patient-list';
import { ViewToggle } from '@/components/patients/view-toggle';
import { usePatientStore } from '@/stores/patient-store';

const STATUS_OPTIONS = ['all', 'active', 'critical', 'discharged'] as const;

export default function PatientsPage() {
  const viewMode = usePatientStore((s) => s.viewMode);
  const searchQuery = usePatientStore((s) => s.searchQuery);
  const statusFilter = usePatientStore((s) => s.statusFilter);
  const setViewMode = usePatientStore((s) => s.setViewMode);
  const setSearchQuery = usePatientStore((s) => s.setSearchQuery);
  const setStatusFilter = usePatientStore((s) => s.setStatusFilter);
  const getFilteredPatients = usePatientStore((s) => s.getFilteredPatients);

  const patients = getFilteredPatients();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Patient Details</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">Manage and view all patient information</p>
      </div>

      {/* filters */}
      <Card variant="bordered" className="p-4">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search patients..."
              className="pl-9"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <div className="flex gap-2 flex-wrap">
              {STATUS_OPTIONS.map((status) => (
                <button
                  key={status}
                  onClick={() => setStatusFilter(status)}
                  className={`px-3 py-1.5 text-sm font-medium rounded-lg capitalize ${
                    statusFilter === status
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
            <ViewToggle value={viewMode} onChange={setViewMode} />
          </div>
        </div>
      </Card>

      <p className="text-sm text-gray-600 dark:text-gray-400">
        Showing {patients.length} patient{patients.length === 1 ? '' : 's'}
      </p>

      {/* patient list */}
      <Card variant="bordered" className="p-4">
        {viewMode === 'grid' ? <PatientGrid patients={patients} /> : <PatientList patients={patients} />}
      </Card>
    </div>
  );
}

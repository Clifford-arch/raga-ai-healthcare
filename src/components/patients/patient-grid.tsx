'use client';

import { PatientCard } from './patient-card';
import type { Patient } from '@/types';

interface PatientGridProps {
  patients: Patient[];
}

export function PatientGrid({ patients }: PatientGridProps) {
  if (patients.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 dark:text-gray-400">No patients found</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
      {patients.map((patient) => (
        <PatientCard key={patient.id} patient={patient} />
      ))}
    </div>
  );
}

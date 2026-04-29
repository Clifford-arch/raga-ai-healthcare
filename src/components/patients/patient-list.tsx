'use client';

import { Avatar, Badge } from '@/components/ui';
import { formatDate } from '@/lib/utils';
import type { Patient } from '@/types';

interface PatientListProps {
  patients: Patient[];
}

export function PatientList({ patients }: PatientListProps) {
  if (patients.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 dark:text-gray-400">No patients found</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-200 dark:border-gray-700">
            <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900 dark:text-white">
              Patient
            </th>
            <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900 dark:text-white hidden sm:table-cell">
              Condition
            </th>
            <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900 dark:text-white hidden md:table-cell">
              Last Visit
            </th>
            <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900 dark:text-white hidden lg:table-cell">
              Contact
            </th>
            <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900 dark:text-white">
              Status
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
          {patients.map((patient) => {
            const statusVariant = patient.status === 'active' ? 'success' : patient.status === 'critical' ? 'danger' : 'default';

            return (
              <tr
                key={patient.id}
                className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
              >
                <td className="py-3 px-4">
                  <div className="flex items-center gap-3">
                    <Avatar name={patient.name} size="sm" />
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {patient.name}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {patient.age} yrs, {patient.gender}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="py-3 px-4 hidden sm:table-cell">
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {patient.condition}
                  </p>
                </td>
                <td className="py-3 px-4 hidden md:table-cell">
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {formatDate(patient.lastVisit)}
                  </p>
                </td>
                <td className="py-3 px-4 hidden lg:table-cell">
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {patient.contactNumber}
                  </p>
                </td>
                <td className="py-3 px-4">
                  <Badge variant={statusVariant} className="capitalize">
                    {patient.status}
                  </Badge>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

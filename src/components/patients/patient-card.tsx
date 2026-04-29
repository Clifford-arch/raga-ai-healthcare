'use client';

import { Phone, Mail, Calendar } from 'lucide-react';
import { Card, CardContent, Avatar, Badge } from '@/components/ui';
import { formatDate, getStatusColor } from '@/lib/utils';
import type { Patient } from '@/types';

interface PatientCardProps {
  patient: Patient;
}

export function PatientCard({ patient }: PatientCardProps) {
  const statusVariant = patient.status === 'active' ? 'success' : patient.status === 'critical' ? 'danger' : 'default';

  return (
    <Card variant="bordered" className="hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-start gap-4">
          <Avatar name={patient.name} size="lg" />
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2">
              <h3 className="font-semibold text-gray-900 dark:text-white truncate">
                {patient.name}
              </h3>
              <Badge variant={statusVariant} className="capitalize shrink-0">
                {patient.status}
              </Badge>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              {patient.condition}
            </p>
            <div className="flex items-center gap-4 mt-3 text-sm text-gray-500 dark:text-gray-400">
              <span>{patient.age} yrs</span>
              <span className="capitalize">{patient.gender}</span>
              {patient.bloodType && <span>{patient.bloodType}</span>}
            </div>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700 space-y-2">
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <Calendar className="w-4 h-4" />
            <span>Last visit: {formatDate(patient.lastVisit)}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <Phone className="w-4 h-4" />
            <span>{patient.contactNumber}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <Mail className="w-4 h-4" />
            <span className="truncate">{patient.email}</span>
          </div>
        </div>

        {patient.roomNumber && (
          <div className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-700">
            <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
              Room: {patient.roomNumber}
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

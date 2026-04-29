'use client';

import { Users, UserCheck, AlertTriangle, Calendar, Activity, TrendingUp } from 'lucide-react';
import { StatsCard } from '@/components/analytics/stats-card';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { useAuthStore } from '@/stores/auth-store';
import { usePatientStore } from '@/stores/patient-store';
import { mockAnalyticsData } from '@/data/mock-patients';
import { formatDate } from '@/lib/utils';

export default function DashboardPage() {
  const user = useAuthStore((s) => s.user);
  const patients = usePatientStore((s) => s.patients);

  // quick stats from patient list
  const activeCount = patients.filter((p) => p.status === 'active').length;
  const criticalCount = patients.filter((p) => p.status === 'critical').length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Welcome back{user?.displayName ? `, ${user.displayName}` : ''}. Here&apos;s your overview.
        </p>
      </div>

      {/* stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Total Patients"
          value={mockAnalyticsData.totalPatients}
          change="+12% from last month"
          changeType="positive"
          icon={Users}
          iconColor="text-blue-600"
        />
        <StatsCard
          title="Active Patients"
          value={activeCount}
          change={`${activeCount} currently admitted`}
          changeType="neutral"
          icon={UserCheck}
          iconColor="text-green-600"
        />
        <StatsCard
          title="Critical Cases"
          value={criticalCount}
          change="Requires immediate attention"
          changeType="negative"
          icon={AlertTriangle}
          iconColor="text-red-600"
        />
        <StatsCard
          title="Appointments Today"
          value={mockAnalyticsData.appointmentsToday}
          change="+5 from yesterday"
          changeType="positive"
          icon={Calendar}
          iconColor="text-purple-600"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* recent patients */}
        <Card variant="bordered">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recent Patients</CardTitle>
            <Activity className="w-5 h-5 text-gray-400" />
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-gray-100 dark:divide-gray-800">
              {patients.slice(0, 5).map((patient) => (
                <div
                  key={patient.id}
                  className="flex items-center justify-between px-6 py-3 hover:bg-gray-50 dark:hover:bg-gray-800/50"
                >
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">{patient.name}</p>
                    <p className="text-sm text-gray-500">{patient.condition}</p>
                  </div>
                  <div className="text-right">
                    <p className={`text-sm font-medium capitalize ${
                      patient.status === 'critical' ? 'text-red-600' :
                      patient.status === 'active' ? 'text-green-600' : 'text-gray-500'
                    }`}>
                      {patient.status}
                    </p>
                    <p className="text-xs text-gray-400">{formatDate(patient.lastVisit)}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* performance - hardcoded for now, would come from API */}
        <Card variant="bordered">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Performance Overview</CardTitle>
            <TrendingUp className="w-5 h-5 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { label: 'Patient Satisfaction', value: 92, color: 'bg-green-600' },
                { label: 'Bed Occupancy', value: 78, color: 'bg-blue-600' },
                { label: 'Staff Efficiency', value: 85, color: 'bg-purple-600' },
                { label: 'Emergency Response', value: 95, color: 'bg-orange-600' },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{stat.label}</span>
                    <span className="text-sm font-bold" style={{ color: stat.color.replace('bg-', '').replace('-600', '') }}>
                      {stat.value}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div className={`${stat.color} h-2 rounded-full`} style={{ width: `${stat.value}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

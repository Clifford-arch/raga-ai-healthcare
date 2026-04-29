'use client';

import { Users, UserCheck, AlertTriangle, Calendar, Clock } from 'lucide-react';
import { StatsCard, PatientTrendChart, AppointmentBarChart, ConditionPieChart } from '@/components/analytics';
import { mockAnalyticsData } from '@/data/mock-patients';

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Analytics
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Monitor key metrics and performance indicators
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
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
          value={mockAnalyticsData.activePatients}
          change="Currently admitted"
          changeType="neutral"
          icon={UserCheck}
          iconColor="text-green-600"
        />
        <StatsCard
          title="Critical Cases"
          value={mockAnalyticsData.criticalPatients}
          change="Immediate attention"
          changeType="negative"
          icon={AlertTriangle}
          iconColor="text-red-600"
        />
        <StatsCard
          title="Appointments"
          value={mockAnalyticsData.appointmentsToday}
          change="Today's schedule"
          changeType="neutral"
          icon={Calendar}
          iconColor="text-purple-600"
        />
        <StatsCard
          title="Discharged Today"
          value={mockAnalyticsData.dischargedToday}
          change="Released patients"
          changeType="positive"
          icon={Clock}
          iconColor="text-orange-600"
        />
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PatientTrendChart data={mockAnalyticsData.monthlyData} />
        <AppointmentBarChart data={mockAnalyticsData.monthlyData} />
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ConditionPieChart data={mockAnalyticsData.conditionDistribution} />

        {/* Summary Card */}
        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl p-6 text-white">
          <h3 className="text-lg font-semibold mb-4">Monthly Summary</h3>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-blue-100">Average Daily Patients</span>
              <span className="text-xl font-bold">45</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-blue-100">Average Wait Time</span>
              <span className="text-xl font-bold">12 min</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-blue-100">Patient Satisfaction</span>
              <span className="text-xl font-bold">92%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-blue-100">Bed Utilization</span>
              <span className="text-xl font-bold">78%</span>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-blue-400/30">
            <p className="text-sm text-blue-100">
              Performance is trending upward compared to the previous month.
              Continue monitoring critical cases for optimal care.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

'use client';

import { create } from 'zustand';
import type { Patient, ViewMode } from '@/types';
import { mockPatients } from '@/data/mock-patients';

interface PatientStore {
  patients: Patient[];
  viewMode: ViewMode;
  searchQuery: string;
  statusFilter: 'all' | 'active' | 'discharged' | 'critical';
  setViewMode: (mode: ViewMode) => void;
  setSearchQuery: (query: string) => void;
  setStatusFilter: (status: 'all' | 'active' | 'discharged' | 'critical') => void;
  getFilteredPatients: () => Patient[];
}

export const usePatientStore = create<PatientStore>((set, get) => ({
  patients: mockPatients,
  viewMode: 'grid',
  searchQuery: '',
  statusFilter: 'all',

  setViewMode: (mode: ViewMode) => {
    set({ viewMode: mode });
  },

  setSearchQuery: (query: string) => {
    set({ searchQuery: query });
  },

  setStatusFilter: (status: 'all' | 'active' | 'discharged' | 'critical') => {
    set({ statusFilter: status });
  },

  getFilteredPatients: () => {
    const { patients, searchQuery, statusFilter } = get();

    return patients.filter((patient) => {
      // Search filter
      const matchesSearch = searchQuery === '' ||
        patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        patient.condition.toLowerCase().includes(searchQuery.toLowerCase()) ||
        patient.email.toLowerCase().includes(searchQuery.toLowerCase());

      // Status filter
      const matchesStatus = statusFilter === 'all' || patient.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  },
}));

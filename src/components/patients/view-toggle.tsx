'use client';

import { LayoutGrid, List } from 'lucide-react';
import { Toggle } from '@/components/ui';
import type { ViewMode } from '@/types';

interface ViewToggleProps {
  value: ViewMode;
  onChange: (value: ViewMode) => void;
}

export function ViewToggle({ value, onChange }: ViewToggleProps) {
  const options = [
    { value: 'grid', label: 'Grid', icon: <LayoutGrid className="w-4 h-4" /> },
    { value: 'list', label: 'List', icon: <List className="w-4 h-4" /> },
  ];

  return (
    <Toggle
      options={options}
      value={value}
      onChange={(v) => onChange(v as ViewMode)}
    />
  );
}

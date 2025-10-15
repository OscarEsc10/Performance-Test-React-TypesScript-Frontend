import React from 'react';

export const Badge = ({ label, color = 'gray' }: { label: string; color?: string }) => {
  const colors: Record<string, string> = {
    gray: 'bg-gray-200 text-gray-700',
    blue: 'bg-blue-100 text-blue-700',
    green: 'bg-green-100 text-green-700',
    red: 'bg-red-100 text-red-700',
  };
  return <span className={`px-2 py-1 rounded-full text-xs font-semibold ${colors[color]}`}>{label}</span>;
};

import React from 'react';
import type { Incident } from '../types';
import IncidentItem from './IncidentItem';

interface IncidentsListProps {
  incidents: Incident[];
  resolvedCount: number;
  onResolve: (id: string) => void;
}

const IncidentsList: React.FC<IncidentsListProps> = ({ incidents, resolvedCount, onResolve }) => {
  return (
    <div className="bg-[#141C31] h-full rounded-lg flex flex-col p-3 sm:p-4 border border-slate-700/50 w-full max-h-full">
      
      {/* Header */}
      <div className="flex-shrink-0 mb-4">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 mb-2">
          <h2 className="text-base sm:text-lg font-semibold text-gray-100 flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-red-500/20 text-red-400 flex items-center justify-center text-xs border border-red-500/50">!</span>
            {incidents.length} Unresolved Incidents
          </h2>

          <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-400 bg-slate-700/50 px-2 sm:px-3 py-1.5 rounded-md border border-slate-600 w-fit">
            <span className="text-green-400">✔</span>
            <span>{resolvedCount} resolved incidents</span>
          </div>
        </div>
      </div>

      {/* Incident List */}
      <div className="flex-1 overflow-y-auto pr-1 sm:pr-2 -mr-1 sm:-mr-2">
        <div className="space-y-3">
          {incidents.map((incident) => (
            <IncidentItem key={incident.id} incident={incident} onResolve={onResolve} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default IncidentsList;

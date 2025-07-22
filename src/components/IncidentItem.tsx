import React from 'react';
import type { Incident } from '../types';
import { UnauthorisedAccessIcon, GunThreatIcon } from './icons';

interface IncidentItemProps {
  incident: Incident;
  onResolve: (id: string) => void;
}

const IncidentIcon: React.FC<{ type: string }> = ({ type }) => {
  switch (type) {
    case 'Unauthorised Access':
      return <UnauthorisedAccessIcon className="w-5 h-5 text-orange-400" />;
    case 'Gun Threat':
      return <GunThreatIcon className="w-5 h-5 text-red-500" />;
    default:
      return null;
  }
};

const IncidentItem: React.FC<IncidentItemProps> = ({ incident, onResolve }) => {
  const handleResolveClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onResolve(incident.id);
  };

  return (
    <div className="bg-slate-800/50 hover:bg-slate-700/70 transition-colors p-3 sm:p-4 rounded-lg flex flex-col sm:flex-row gap-3 sm:gap-4 items-start sm:items-center border border-slate-700/50">
      {/* Image */}
      <img
        src={incident.imageUrl}
        alt={incident.type}
        className="w-full sm:w-24 h-40 sm:h-16 object-cover rounded-md flex-shrink-0"
      />

      {/* Details */}
      <div className="flex-1 w-full">
        <div className="flex items-center gap-2 mb-1">
          <IncidentIcon type={incident.type} />
          <h3
            className={`text-sm sm:text-base font-semibold ${
              incident.type === 'Gun Threat' ? 'text-red-400' : 'text-orange-400'
            }`}
          >
            {incident.type}
          </h3>
        </div>
        <p className="text-sm text-gray-300">{incident.location}</p>
        <div className="flex items-center gap-2 text-xs text-gray-400 mt-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <polyline points="12 6 12 12 16 14"></polyline>
          </svg>
          <span>{incident.time}</span>
        </div>
      </div>

      {/* Resolve Button */}
      <a
        href="#"
        onClick={handleResolveClick}
        className="text-sm text-yellow-400 hover:text-yellow-300 flex items-center gap-1 sm:ml-2 mt-2 sm:mt-0 self-end sm:self-auto"
      >
        <span>Resolve</span>
        <span>&gt;</span>
      </a>
    </div>
  );
};

export default IncidentItem;

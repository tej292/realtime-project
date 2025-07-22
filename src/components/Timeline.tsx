import React from 'react';
import type { Camera, TimelineEvent } from '../types';
import { UnauthorisedAccessIcon, GunThreatIcon } from './icons';

interface TimelineProps {
  cameras: Camera[];
  currentTime: number; // In hours, e.g., 3.21
  activeCameraId: string;
  onCameraChange: (id: string) => void;
}

const getEventStyles = (type: string) => {
  switch (type) {
    case 'Unauthorised Access': return 'bg-orange-800/70 border-orange-600/80 text-orange-200';
    case 'Gun Threat': return 'bg-red-800/70 border-red-600/80 text-red-200';
    case 'Face Recognised': return 'bg-blue-800/70 border-blue-600/80 text-blue-200';
    case 'Traffic congestion': return 'bg-green-800/70 border-green-600/80 text-green-200';
    case 'Multiple Events': return 'bg-purple-800/70 border-purple-600/80 text-purple-200';
    default: return 'bg-gray-700/70 border-gray-500/80 text-gray-200';
  }
};

const TimelineEventBlock: React.FC<{ event: TimelineEvent, totalHours: number }> = ({ event, totalHours }) => {
  const left = (event.startHour / totalHours) * 100;

  return (
    <div
      className={`absolute top-1/2 -translate-y-1/2 flex items-center gap-1.5 px-2 py-1 rounded text-[10px] sm:text-xs whitespace-nowrap border ${getEventStyles(event.type)}`}
      style={{ left: `${left}%` }}
    >
      {event.type === 'Unauthorised Access' && <UnauthorisedAccessIcon className="w-3 h-3" />}
      {event.type === 'Gun Threat' && <GunThreatIcon className="w-3 h-3" />}
      <span>{event.type}</span>
    </div>
  );
};

const Timeline: React.FC<TimelineProps> = ({ cameras, currentTime, activeCameraId, onCameraChange }) => {
  const totalHours = 16;
  const timeLabels = Array.from({ length: totalHours + 1 }, (_, i) => i);
  const timeCursorPosition = (currentTime / totalHours) * 100;

  return (
    <div className="bg-[#281E16] p-3 sm:p-4 rounded-lg max-h-[400px] sm:h-64 flex flex-col border border-black/30 w-full overflow-x-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-base sm:text-lg font-semibold text-gray-200">Camera List</h3>
      </div>

      {/* Timeline Body */}
      <div className="flex-1 flex flex-col gap-2 relative min-w-[600px]">
        {/* Time Scale */}
        <div className="relative h-8 flex-shrink-0 border-b border-gray-600/50">
          {timeLabels.map(hour => (
            <div
              key={hour}
              className="absolute -bottom-2 text-[10px] sm:text-xs text-gray-500 text-center w-12"
              style={{ left: `${(hour / totalHours) * 100}%`, transform: 'translateX(-50%)' }}
            >
              <span className="block h-2 border-l border-gray-600/50 mx-auto"></span>
              {`${String(hour).padStart(2, '0')}:00`}
            </div>
          ))}
        </div>

        {/* Time Cursor */}
        <div className="absolute top-0 bottom-0 z-10" style={{ left: `${timeCursorPosition}%` }}>
          <div className="w-0.5 h-full bg-yellow-400"></div>
          <div className="absolute -top-5 -translate-x-1/2 bg-yellow-400 text-black text-[10px] sm:text-xs font-bold px-1 py-0.5 rounded">
            {new Date(0, 0, 0, Math.floor(currentTime), (currentTime % 1) * 60).toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit',
              hour12: false
            })}
          </div>
        </div>

        {/* Camera Rows */}
        <div className="flex-1 flex flex-col justify-around gap-1">
          {cameras.map(camera => {
            const isActive = camera.id === activeCameraId;
            return (
              <div
                key={camera.id}
                onClick={() => onCameraChange(camera.id)}
                className={`flex items-center h-12 border-b border-gray-700/40 cursor-pointer transition-colors ${
                  isActive ? 'bg-slate-700/30' : 'hover:bg-slate-800/60'
                }`}
              >
                {/* Camera Label */}
                <div
                  className={`w-28 sm:w-32 flex-shrink-0 text-xs sm:text-sm transition-colors flex items-center gap-1 sm:gap-2 ${
                    isActive ? 'text-gray-100 font-semibold' : 'text-gray-400'
                  }`}
                >
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
                    className={isActive ? 'text-blue-400' : ''}
                  >
                    <path d="m13.2 2.1-7.4 12.1-2.4-2.4a1 1 0 0 0-1.4 0L1 13l3 3 1.4-1.4a1 1 0 0 0 0-1.4l-2-2.1L7 8l6.2 10.1 3.8-6.1a1 1 0 0 0-.2-1.3L17 7l-3.8-4.9a1 1 0 0 0-1.4-.2z" />
                  </svg>
                  {camera.name}
                </div>

                {/* Event Row */}
                <div className="relative flex-1 h-full">
                  {camera.events.map(event => (
                    <TimelineEventBlock key={event.id} event={event} totalHours={totalHours} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Timeline;

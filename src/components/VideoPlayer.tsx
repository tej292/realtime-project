import React from 'react';
import { CameraIcon, InfoIcon } from './icons';
import type { Camera } from '../types';

interface VideoPlayerProps {
  cameras: Camera[];
  activeCamera: Camera;
  onCameraChange: (id: string) => void;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ cameras, activeCamera, onCameraChange }) => {
  const otherCameras = cameras.filter(c => c.id !== activeCamera.id).slice(0, 2);

  return (
    <div className="bg-[#141C31] rounded-lg overflow-hidden flex-1 flex flex-col border border-slate-700/50 w-full">
      {/* Video Area */}
      <div className="relative flex-1 bg-black group aspect-video sm:aspect-[4/3] md:aspect-[16/9]">
        <img
          src={activeCamera.videoUrl}
          alt={activeCamera.name}
          className="w-full h-full object-cover"
        />
        {/* Timestamp Top Left */}
        <div className="absolute top-2 left-2 sm:top-4 sm:left-4 bg-black/50 text-white px-2 sm:px-3 py-1 rounded text-xs sm:text-sm flex items-center gap-1 sm:gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="7" width="10" height="10" rx="2" ry="2" />
            <path d="M12 2v4M2 12H0M22 12h2" />
          </svg>
          <span>11/7/2025 - 03:12:37</span>
        </div>

        {/* Camera Name Bottom Left */}
        <div className="absolute bottom-2 left-2 sm:bottom-4 sm:left-4 bg-black/50 text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm flex items-center gap-1 sm:gap-2">
          <CameraIcon className="w-4 h-4" />
          <span>{activeCamera.name}</span>
        </div>

        {/* Thumbnail Previews Bottom Right */}
        <div className="absolute bottom-2 right-2 sm:bottom-4 sm:right-4 flex gap-2 flex-wrap sm:flex-nowrap">
          {otherCameras.map(camera => (
            <div
              key={camera.id}
              onClick={() => onCameraChange(camera.id)}
              className="bg-black/50 rounded-md p-1 sm:p-2 w-24 sm:w-48 h-16 sm:h-28 border border-slate-600 relative cursor-pointer hover:border-blue-500 transition-colors"
            >
              <img
                src={camera.thumbnailUrl}
                alt={camera.name}
                className="w-full h-full object-cover rounded"
              />
              <span className="absolute bottom-1 left-1 text-[10px] sm:text-xs text-white bg-black/60 px-1 rounded">
                {camera.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Controls Bar */}
      <div className="bg-[#281E16] h-12 sm:h-14 flex-shrink-0 flex flex-col sm:flex-row items-center justify-between px-2 sm:px-4 text-gray-400 border-t border-black/30 gap-1 sm:gap-0">
        <div className="flex items-center gap-3 sm:gap-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 cursor-pointer hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <polygon points="19 20 9 12 19 4 19 20"></polygon>
            <line x1="5" y1="19" x2="5" y2="5"></line>
          </svg>
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 cursor-pointer hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
            <path d="M3 3v5h5" />
          </svg>
          <div className="bg-blue-500 rounded-full p-2 cursor-pointer shadow-lg shadow-blue-500/30">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="white" viewBox="0 0 24 24" stroke="white">
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
          </div>
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 cursor-pointer hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8" />
            <path d="M21 3v5h-5" />
          </svg>
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 cursor-pointer hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <polygon points="5 4 15 12 5 20 5 4" />
            <line x1="19" y1="5" x2="19" y2="19" />
          </svg>
        </div>

        {/* Timestamp */}
        <div className="text-xs sm:text-sm text-gray-300 font-mono">
          <span>03:12:37</span>
          <span className="text-gray-500"> (15-Jun-2025)</span>
        </div>

        {/* Speed & Info */}
        <div className="flex items-center gap-2 sm:gap-4">
          <span className="text-xs sm:text-sm border border-gray-600 px-2 py-0.5 rounded">1x</span>
          <InfoIcon className="w-5 h-5 cursor-pointer hover:text-white" />
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;

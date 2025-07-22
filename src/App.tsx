import React, { useState } from 'react';
import Header from './components/Header';
import VideoPlayer from './components/VideoPlayer';
import IncidentsList from './components/IncidentList';
import Timeline from './components/Timeline';
import type { Incident, Camera } from './types';

const initialIncidents: Incident[] = [
  { id: '1', type: 'Unauthorised Access', location: 'Shop Floor Camera A', time: '14:35 - 14:37 on 7-Jul-2025', imageUrl: 'https://picsum.photos/id/10/100/60', status: 'unresolved' },
  { id: '2', type: 'Gun Threat', location: 'Shop Floor Camera A', time: '14:35 - 14:37 on 7-Jul-2025', imageUrl: 'https://picsum.photos/id/20/100/60', status: 'unresolved' },
  { id: '3', type: 'Unauthorised Access', location: 'Shop Floor Camera A', time: '14:35 - 14:37 on 7-Jul-2025', imageUrl: 'https://picsum.photos/id/30/100/60', status: 'unresolved' },
  { id: '4', type: 'Unauthorised Access', location: 'Shop Floor Camera A', time: '14:35 - 14:37 on 7-Jul-2025', imageUrl: 'https://picsum.photos/id/40/100/60', status: 'unresolved' },
  { id: '5', type: 'Unauthorised Access', location: 'Shop Floor Camera A', time: '14:35 - 14:37 on 7-Jul-2025', imageUrl: 'https://picsum.photos/id/50/100/60', status: 'unresolved' },
];

const mockCameras: Camera[] = [
    {
        id: 'cam1',
        name: 'Camera - 01',
        videoUrl: 'https://picsum.photos/seed/security/1920/1080',
        thumbnailUrl: 'https://picsum.photos/seed/cam1_thumb/192/112',
        events: [
            { id: 'e1', type: 'Unauthorised Access', startHour: 2.2 },
            { id: 'e2', type: 'Multiple Events', startHour: 6.5 },
            { id: 'e3', type: 'Gun Threat', startHour: 14.5 },
        ]
    },
    {
        id: 'cam2',
        name: 'Camera - 02',
        videoUrl: 'https://picsum.photos/seed/cam2_main/1920/1080',
        thumbnailUrl: 'https://picsum.photos/seed/cam2/192/112',
        events: [
            { id: 'e4', type: 'Unauthorised Access', startHour: 3.1 },
            { id: 'e5', type: 'Face Recognised', startHour: 7.75 },
        ]
    },
    {
        id: 'cam3',
        name: 'Camera - 03',
        videoUrl: 'https://picsum.photos/seed/cam3_main/1920/1080',
        thumbnailUrl: 'https://picsum.photos/seed/cam3/192/112',
        events: [
            { id: 'e6', type: 'Traffic congestion', startHour: 6.8 },
            { id: 'e7', type: 'Face Recognised', startHour: 9.2 },
            { id: 'e8', type: 'Unauthorised Access', startHour: 11.5 },
        ]
    }
];


const App: React.FC = () => {
  const [incidents, setIncidents] = useState<Incident[]>(initialIncidents);
  const [resolvedCount, setResolvedCount] = useState(4);
  const [cameras] = useState<Camera[]>(mockCameras);
  const [activeCameraId, setActiveCameraId] = useState<string>('cam1');

  const handleResolveIncident = (incidentId: string) => {
    setIncidents(prevIncidents => prevIncidents.filter(inc => inc.id !== incidentId));
    setResolvedCount(prevCount => prevCount + 1);
  };

  const activeCamera = cameras.find(c => c.id === activeCameraId) || cameras[0];

  return (
    <div className="bg-[#0D1424] text-gray-300 font-sans min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex flex-row p-4 gap-4 overflow-hidden">
        <div className="flex-1 flex flex-col gap-4">
          <VideoPlayer 
            cameras={cameras}
            activeCamera={activeCamera}
            onCameraChange={setActiveCameraId}
          />
          <Timeline 
            cameras={cameras} 
            currentTime={3.21} 
            activeCameraId={activeCameraId}
            onCameraChange={setActiveCameraId}
          />
        </div>
        <aside className="w-[450px] flex-shrink-0">
          <IncidentsList incidents={incidents} resolvedCount={resolvedCount} onResolve={handleResolveIncident} />
        </aside>
      </main>
    </div>
  );
};

export default App;
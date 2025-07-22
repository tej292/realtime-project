export interface Incident {
  id: string;
  type: string;
  location: string;
  time: string;
  imageUrl: string;
  status: 'unresolved' | 'resolved';
}

export interface TimelineEvent {
    id: string;
    type: string;
    startHour: number; // e.g., 2.5 for 02:30
}

export interface Camera {
    id: string;
    name: string;
    events: TimelineEvent[];
    videoUrl: string;
    thumbnailUrl: string;
}

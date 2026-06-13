import { createContext, useContext } from 'react';

interface GalleryWaveContextValue {
  isPaused: boolean;
}

export const GalleryWaveContext = createContext<GalleryWaveContextValue>({ isPaused: false });

export function useGalleryWave() {
  return useContext(GalleryWaveContext);
}
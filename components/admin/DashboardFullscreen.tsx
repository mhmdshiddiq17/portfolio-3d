'use client';

import { Maximize2, Minimize2 } from 'lucide-react';
import { useFullscreen } from '@/hooks/useFullscreen';

export function DashboardFullscreen() {
  const { isFullscreen, toggleFullscreen } = useFullscreen();

  return (
    <button
      onClick={toggleFullscreen}
      className="p-2 glass rounded-lg hover:glow-border transition-all duration-300 text-gray-400 hover:text-white"
      title={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
    >
      {isFullscreen ? <Minimize2 size={20} /> : <Maximize2 size={20} />}
    </button>
  );
}

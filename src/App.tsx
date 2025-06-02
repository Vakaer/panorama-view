import { useEffect, useRef } from 'react';
import { Viewer } from '@photo-sphere-viewer/core';
import '@photo-sphere-viewer/core/index.css';
import './App.css';

const baseUrl = 'https://photo-sphere-viewer-data.netlify.app/assets/';

function App() {
  const viewerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (viewerRef.current) {
      const viewer = new Viewer({
        container: viewerRef.current,
        panorama: '/panoramic-living-room-shot.jpg',
        caption: '',
        loadingImg: baseUrl + 'loader.gif',
        touchmoveTwoFingers: true,
        mousewheelCtrlKey: true,
      });

      return () => {
        viewer.destroy();
      };
    }
  }, []);

  return (
      <div
        ref={viewerRef}
        id="viewer"
        className='w-full h-screen'
      />
  );
}

export default App;

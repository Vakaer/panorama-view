import { Viewer } from '@photo-sphere-viewer/core';
import '@photo-sphere-viewer/core/index.css';
import { GalleryPlugin } from '@photo-sphere-viewer/gallery-plugin';
import '@photo-sphere-viewer/gallery-plugin/index.css';
import '@photo-sphere-viewer/markers-plugin/index.css';
import { VirtualTourPlugin } from '@photo-sphere-viewer/virtual-tour-plugin';
import '@photo-sphere-viewer/virtual-tour-plugin/index.css';
import { useEffect, useRef } from 'react';

import './App.css';

const baseUrl = 'https://photo-sphere-viewer-data.netlify.app/assets/';

const nodes = [
  {
    id: '1',
    panorama: '/eiffel-1.jpg',
    thumbnail: '/eiffel-1.jpg',
    name: 'First Level',
    caption: `[1] First Level | Eiffel Tower`,
    links: [{ nodeId: '2' }],
    gps: [-120.156479, 30.666725]
  },
  {
    id: '2',
    panorama: '/eiffel-2.jpg',
    thumbnail: '/eiffel-2.jpg',
    name: 'Second Level',
    caption: `[2] Second Level | Eiffel Tower`,
    links: [
      { nodeId: '1', gps: [80.156168, 25.666623] },
      { nodeId: '3', gps: [-20.156168, 25.666623] },
    ],
    gps: [80.156168, 25.666623],
  },
  {
    id: '3',
    panorama: '/eiffel-3.jpg',
    thumbnail: '/eiffel-3.jpg',
    name: 'Summit',
    caption: `[3] Summit | Eiffel Tower`,
    links: [{ nodeId: '2' }],
    gps: [-120.156168, -90.666623],
  },
];


function App() {
  const viewerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (viewerRef.current) {
      const viewer = new Viewer({
        container: 'viewer',
        loadingImg: baseUrl + 'loader.gif',
        touchmoveTwoFingers: true,
        mousewheelCtrlKey: false,
        defaultYaw: '45deg',
        minFov: 80,
        maxFov: 100,
        navbar: 'zoom move gallery caption fullscreen',

        plugins: [
            [GalleryPlugin, {
                thumbnailSize: { width: 100, height: 100 },
            }],
            [VirtualTourPlugin, {
                positionMode: 'gps',
                renderMode: '3d',
                nodes: nodes,
                startNodeId: '1',
            }],
        ],
      });
      viewer.overlay.hide()
      return () => {
        viewer.destroy();
      };
    }
  }, []);

  return (
    <div
      ref={viewerRef}
      id="viewer"
      className="w-full h-screen"
    />
  );
}

export default App;

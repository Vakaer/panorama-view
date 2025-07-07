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
    name: 'One',
    caption: `[1] Floor 3, Algosoft | Daftarkhwan`,
    links: [{ nodeId: '2' }],
    gps: [-120.156479, 25.666725],
    defaultZoomLvl: 0,
    zoom: 0
  },
  {
    id: '2',
    panorama: '/eiffel-2.jpg',
    thumbnail: '/eiffel-2.jpg',
    name: 'Two',
    caption: `[2] Basement Cafetaria | Daftarkhwan Vantage`,
    links: [
      { nodeId: '1' },
      { nodeId: '3' },
    ],
    gps: [80.156168, 25.666623],
  },
  {
    id: '3',
    panorama: '/eiffel-main.jpg',
    thumbnail: '/eiffel-main.jpg',
    name: 'Three',
    caption: `[3] Outside Area | Daftarkhwan Vantage`,
    links: [{ nodeId: '2' }],
    gps: [-80.156168, 25.666623],
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
      viewer.zoom(0);
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

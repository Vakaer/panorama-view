import { useEffect, useRef } from 'react';
import { Viewer } from '@photo-sphere-viewer/core';
import { VirtualTourPlugin } from '@photo-sphere-viewer/virtual-tour-plugin';
import { GalleryPlugin } from '@photo-sphere-viewer/gallery-plugin';
import { MarkersPlugin } from '@photo-sphere-viewer/markers-plugin';
import '@photo-sphere-viewer/core/index.css';
import '@photo-sphere-viewer/markers-plugin/index.css';
import '@photo-sphere-viewer/gallery-plugin/index.css'
import '@photo-sphere-viewer/virtual-tour-plugin/index.css';

import './App.css';

const baseUrl = 'https://photo-sphere-viewer-data.netlify.app/assets/';

const nodes = [
    {
        id: '1',
        panorama: '/office-inside.jpg',
        thumbnail: '/office-inside.jpg',
        name: 'One',
        caption: `[1] Floor 3, Algosoft | Daftarkhwan`,
        links: [{ nodeId: '2' }],
        // markers: [markerLighthouse],
        gps: [-120.156479, 25.666725, 3],
        sphereCorrection: { pan: '60deg' },
        fisheye: true,moveInertia: true
    },
    {
        id: '2',
        panorama: '/office-basement.jpg',
        thumbnail: '/office-basement.jpg',
        name: 'Two',
        caption: `[2] Basement Cafetaria | Daftarkhwan Vantage`,
        links: [{ nodeId: '3' }],
        // markers: [markerLighthouse],
        gps: [80.156168, 25.666623, 3],
        sphereCorrection: { pan: '60deg' },
    },
    {
        id: '3',
        panorama: '/office-outside.jpg',
        thumbnail: '/office-outside.jpg',
        name: 'Two',
        caption: `[2] Outside Area | Daftarkhwan Vantage`,
        links: [{ nodeId: '2' }],
        // markers: [markerLighthouse],
        gps: [-80.156168, 25.666623, 3],
        sphereCorrection: { pan: '42deg' },
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
            MarkersPlugin,
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

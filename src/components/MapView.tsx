import React, { useEffect, useRef, useState } from 'react';
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { defaults as defaultControls } from 'ol/control';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Draw from 'ol/interaction/Draw';
import Geometry from 'ol/geom/Geometry.js';
import Modify from 'ol/interaction/Modify';
import { Circle as CircleStyle, Fill, Stroke, Style } from 'ol/style';
import Select from 'ol/interaction/Select';
import { click } from 'ol/events/condition';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';

enum DrawMode {
  None,
  Draw,
  Edit,
  Delete
}

const MapView: React.FC = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<Map | null>(null);
  const vectorSourceRef = useRef<VectorSource | null>(null);
  const drawInteractionRef = useRef<Draw | null>(null);
  const modifyInteractionRef = useRef<Modify | null>(null);
  const selectInteractionRef = useRef<Select | null>(null);
  
  const [drawMode, setDrawMode] = useState<DrawMode>(DrawMode.None);
  const [polygonCount, setPolygonCount] = useState(0);
  
  useEffect(() => {
    if (!mapRef.current) return;
    
    const vectorSource = new VectorSource();
    vectorSourceRef.current = vectorSource;
    
    const vectorLayer = new VectorLayer({
      source: vectorSource,
      style: new Style({
        fill: new Fill({
          color: 'rgba(66, 135, 245, 0.2)'
        }),
        stroke: new Stroke({
          color: '#4287f5',
          width: 2
        }),
        image: new CircleStyle({
          radius: 7,
          fill: new Fill({
            color: '#4287f5'
          })
        })
      })
    });
    
    const map = new Map({
      target: mapRef.current,
      layers: [
        new TileLayer({
          source: new OSM()
        }),
        vectorLayer
      ],
      view: new View({
        center: [0, 0],
        zoom: 2,
        constrainResolution: true
      }),
      controls: defaultControls({
        zoom: true,
        rotate: false,
        attribution: false
      })
    });
    
    mapInstance.current = map;
    
    vectorSource.on('addfeature', () => {
      setPolygonCount(vectorSource.getFeatures().length);
    });
    
    vectorSource.on('removefeature', () => {
      setPolygonCount(vectorSource.getFeatures().length);
    });
    
    return () => {
      if (mapInstance.current) {
        mapInstance.current.dispose();
      }
    };
  }, []);
  
  useEffect(() => {
    if (!mapInstance.current) return;
    
    if (drawInteractionRef.current) {
      mapInstance.current.removeInteraction(drawInteractionRef.current);
      drawInteractionRef.current = null;
    }
    
    if (modifyInteractionRef.current) {
      mapInstance.current.removeInteraction(modifyInteractionRef.current);
      modifyInteractionRef.current = null;
    }
    
    if (selectInteractionRef.current) {
      mapInstance.current.removeInteraction(selectInteractionRef.current);
      selectInteractionRef.current = null;
    }
    
    switch (drawMode) {
      case DrawMode.Draw:
        const drawInteraction = new Draw({
          source: vectorSourceRef.current!,
          type: 'Polygon'
        });
        
        drawInteraction.on('drawend', () => {
          toast.success('Polygon drawn successfully');
        });
        
        mapInstance.current.addInteraction(drawInteraction);
        drawInteractionRef.current = drawInteraction;
        break;
        
      case DrawMode.Edit:
        const modifyInteraction = new Modify({
          source: vectorSourceRef.current!
        });
        
        modifyInteraction.on('modifyend', () => {
          toast.success('Polygon modified successfully');
        });
        
        mapInstance.current.addInteraction(modifyInteraction);
        modifyInteractionRef.current = modifyInteraction;
        break;
        
      case DrawMode.Delete:
        const selectInteraction = new Select({
          condition: click
        });
        
        selectInteraction.on('select', (e) => {
          if (e.selected.length > 0) {
            vectorSourceRef.current!.removeFeature(e.selected[0]);
            toast.success('Polygon deleted successfully');
          }
        });
        
        mapInstance.current.addInteraction(selectInteraction);
        selectInteractionRef.current = selectInteraction;
        break;
        
      default:
        break;
    }
  }, [drawMode]);
  
  return (
    <div className="w-full h-full relative">
      <div ref={mapRef} className="map-container"></div>
      
      <div className="map-tools">
        <AnimatePresence>
          <motion.div 
            className="glassmorphism rounded-xl overflow-hidden"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col p-1">
              <button
                onClick={() => setDrawMode(DrawMode.Draw)}
                className={`p-3 rounded-lg flex items-center transition-all duration-200 ${drawMode === DrawMode.Draw ? 'bg-primary text-white' : 'hover:bg-gray-100'}`}
                aria-label="Draw polygon"
                title="Draw polygon"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 19V3" />
                  <path d="M5 12h14" />
                </svg>
              </button>
              
              <button
                onClick={() => setDrawMode(DrawMode.Edit)}
                className={`p-3 rounded-lg flex items-center transition-all duration-200 ${drawMode === DrawMode.Edit ? 'bg-primary text-white' : 'hover:bg-gray-100'}`}
                aria-label="Edit polygon"
                title="Edit polygon"
                disabled={polygonCount === 0}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 3a2.85 2.85 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
                </svg>
              </button>
              
              <button
                onClick={() => setDrawMode(DrawMode.Delete)}
                className={`p-3 rounded-lg flex items-center transition-all duration-200 ${drawMode === DrawMode.Delete ? 'bg-primary text-white' : 'hover:bg-gray-100'}`}
                aria-label="Delete polygon"
                title="Delete polygon"
                disabled={polygonCount === 0}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 6h18" />
                  <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                  <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                </svg>
              </button>
              
              <button
                onClick={() => setDrawMode(DrawMode.None)}
                className={`p-3 rounded-lg flex items-center transition-all duration-200 ${drawMode === DrawMode.None ? 'bg-primary text-white' : 'hover:bg-gray-100'}`}
                aria-label="Pan mode"
                title="Pan mode"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M8 3H7a2 2 0 0 0-2 2v5a2 2 0 0 1-2 2 2 2 0 0 1 2 2v5c0 1.1.9 2 2 2h1" />
                  <path d="M16 21h1a2 2 0 0 0 2-2v-5c0-1.1.9-2 2-2a2 2 0 0 1-2-2V5a2 2 0 0 0-2-2h-1" />
                </svg>
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
        
        <AnimatePresence>
          {polygonCount > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="glassmorphism px-3 py-2 rounded-lg text-sm font-medium"
            >
              {polygonCount} {polygonCount === 1 ? 'polygon' : 'polygons'}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default MapView;

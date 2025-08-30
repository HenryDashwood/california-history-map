import React, { useState } from 'react';
import CaliforniaMap from './components/CaliforniaMap';
import TimelineSlider from './components/TimelineSlider';
import { getActiveExpeditionsGeoJSON } from './data/expeditionsGeoJSON';

const MIN_YEAR = 1769;
const MAX_YEAR = 1850;

export interface LayerVisibility {
  settlements: boolean;
  populationDensity: boolean;
  nativeRegions: boolean;
  expeditions: boolean;
}

function App() {
  const [currentYear, setCurrentYear] = useState<number>(1769);
  const [isPlaying, setIsPlaying] = useState(false);
  const [layerVisibility, setLayerVisibility] = useState<LayerVisibility>({
    settlements: true,
    populationDensity: true,
    nativeRegions: false,
    expeditions: true,
  });

  const toggleLayer = (layer: keyof LayerVisibility) => {
    setLayerVisibility(prev => ({ ...prev, [layer]: !prev[layer] }));
  };

  // Get active expeditions for current year
  const activeExpeditions = getActiveExpeditionsGeoJSON(currentYear);

  return (
    <div className="relative h-screen w-screen">
      <CaliforniaMap 
        currentYear={currentYear} 
        layerVisibility={layerVisibility}
      />
      
      {/* Timeline Slider positioned at bottom */}
      <div className="absolute bottom-5 left-5 right-5 z-[1000]">
        <TimelineSlider
          minYear={MIN_YEAR}
          maxYear={MAX_YEAR}
          currentYear={currentYear}
          onYearChange={setCurrentYear}
          isPlaying={isPlaying}
          onPlayToggle={setIsPlaying}
        />
      </div>

      {/* Year display in top left */}
      <div className="absolute top-5 left-5 z-[1000] p-4 rounded-lg shadow-lg border-2" 
           style={{ backgroundColor: '#f9e9cb', borderColor: '#faad19' }}>
        <div className="text-3xl font-bold mb-1" style={{ color: '#171717', fontFamily: 'Georgia, serif' }}>
          {currentYear}
        </div>
        <div className="text-sm" style={{ color: '#171717' }}>
          {currentYear < 1821 && "Spanish Colonial Period"}
          {currentYear >= 1821 && currentYear < 1846 && "Mexican Period"}
          {currentYear >= 1846 && currentYear < 1849 && "American Conquest"}
          {currentYear >= 1849 && "Gold Rush & Statehood"}
        </div>
      </div>

      {/* Legend in top right */}
      <div className="absolute top-5 right-5 z-[1000] p-4 rounded-lg shadow-lg border-2 max-w-xs"
           style={{ backgroundColor: '#f9e9cb', borderColor: '#faad19' }}>
        <h3 className="text-lg font-bold mb-3 pb-2" 
            style={{ color: '#171717', borderBottom: '2px solid #faad19', fontFamily: 'Georgia, serif' }}>
          Settlement Types
        </h3>
        <div className="space-y-3 text-sm" style={{ color: '#171717' }}>
          <div className="flex items-center gap-3">
            <div dangerouslySetInnerHTML={{ __html: `
              <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <g transform="translate(12, 12)">
                  <rect x="-5" y="-2" width="10" height="12" fill="#8B4513" stroke="#171717" stroke-width="1"/>
                  <path d="M -7 -2 L 0 -7 L 7 -2 Z" fill="#D2691E" stroke="#171717" stroke-width="1"/>
                  <rect x="-1" y="-11" width="2" height="5" fill="#faad19"/>
                  <rect x="-2" y="-10" width="4" height="1.5" fill="#faad19"/>
                  <circle cx="0" cy="4" r="2" fill="#171717"/>
                  <rect x="-2" y="6" width="4" height="4" fill="#4A4A4A"/>
                </g>
              </svg>
            ` }} />
            <span style={{ fontFamily: 'Georgia, serif' }}>Spanish Missions</span>
          </div>
          <div className="flex items-center gap-3">
            <div dangerouslySetInnerHTML={{ __html: `
              <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <g transform="translate(12, 12)">
                  <path d="M 0,-8 L 2,-2 L 8,-2 L 3,1 L 5,7 L 0,3 L -5,7 L -3,1 L -8,-2 L -2,-2 Z" 
                        fill="#4169E1" stroke="#171717" stroke-width="1"/>
                  <rect x="-2" y="-2" width="4" height="3" fill="#FFD700" opacity="0.7"/>
                </g>
              </svg>
            ` }} />
            <span style={{ fontFamily: 'Georgia, serif' }}>Presidios (Forts)</span>
          </div>
          <div className="flex items-center gap-3">
            <div dangerouslySetInnerHTML={{ __html: `
              <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <g transform="translate(12, 12)">
                  <rect x="-7" y="2" width="5" height="6" fill="#CD853F" stroke="#171717" stroke-width="1"/>
                  <rect x="-1" y="-2" width="4" height="10" fill="#8B7355" stroke="#171717" stroke-width="1"/>
                  <rect x="4" y="0" width="4" height="8" fill="#A0826D" stroke="#171717" stroke-width="1"/>
                  <path d="M -7 2 L -4.5 -1 L -2 2 Z" fill="#8B4513" stroke="#171717" stroke-width="0.5"/>
                  <path d="M -1 -2 L 1 -5 L 3 -2 Z" fill="#8B4513" stroke="#171717" stroke-width="0.5"/>
                  <path d="M 4 0 L 6 -3 L 8 0 Z" fill="#8B4513" stroke="#171717" stroke-width="0.5"/>
                </g>
              </svg>
            ` }} />
            <span style={{ fontFamily: 'Georgia, serif' }}>Pueblos & Cities</span>
          </div>
          {currentYear >= 1848 && (
            <div className="flex items-center gap-3">
              <div dangerouslySetInnerHTML={{ __html: `
                <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <g transform="translate(12, 12)">
                    <path d="M -6 8 L 0 -2 L 6 8 Z" fill="#DEB887" stroke="#171717" stroke-width="1"/>
                    <path d="M -3 8 L 0 2 L 3 8 Z" fill="#8B7355"/>
                    <rect x="2" y="-8" width="2" height="10" fill="#4A4A4A" transform="rotate(45 3 -3)"/>
                    <path d="M 4 -8 L 7 -8 L 7 -6 L 5 -5 L 4 -6 Z" fill="#696969" stroke="#171717" stroke-width="0.5"/>
                    <circle cx="-4" cy="6" r="1.5" fill="#FFD700"/>
                    <circle cx="4" cy="5" r="1.5" fill="#FFD700"/>
                  </g>
                </svg>
              ` }} />
              <span style={{ fontFamily: 'Georgia, serif' }}>Mining Camps</span>
            </div>
          )}
          {currentYear >= 1809 && currentYear <= 1841 && (
            <div className="flex items-center gap-3">
              <div dangerouslySetInnerHTML={{ __html: `
                <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <g transform="translate(12, 12)">
                    <rect x="-6" y="2" width="12" height="6" fill="#8B4513" stroke="#171717" stroke-width="1"/>
                    <path d="M -3 2 Q -3 -2, 0 -4 Q 3 -2, 3 2 Z" fill="#DC143C" stroke="#171717" stroke-width="1"/>
                    <rect x="-0.5" y="-7" width="1" height="4" fill="#FFD700"/>
                    <rect x="-1.5" y="-6.5" width="3" height="0.7" fill="#FFD700"/>
                    <rect x="-1" y="-5.5" width="2" height="0.5" fill="#FFD700" transform="rotate(20 0 -5.5)"/>
                    <rect x="-4" y="3" width="1.5" height="2" fill="#171717"/>
                    <rect x="2.5" y="3" width="1.5" height="2" fill="#171717"/>
                    <rect x="-1.5" y="4" width="3" height="4" fill="#4A4A4A"/>
                  </g>
                </svg>
              ` }} />
              <span style={{ fontFamily: 'Georgia, serif' }}>Russian Forts</span>
            </div>
          )}
          <div className="flex items-center gap-2">
            <div className="w-4 h-3 rounded-full bg-gradient-to-r from-orange-400 to-yellow-200 opacity-60"></div>
            <span style={{ fontFamily: 'Georgia, serif' }}>Population Density</span>
          </div>
        </div>
        
        {/* Layer toggles */}
        <div className="mt-4 pt-3 border-t-2" style={{ borderColor: '#faad19' }}>
          <h4 className="text-sm font-bold mb-2" style={{ color: '#171717', fontFamily: 'Georgia, serif' }}>
            Toggle Layers
          </h4>
          <div className="space-y-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input 
                type="checkbox" 
                checked={layerVisibility.settlements}
                onChange={() => toggleLayer('settlements')}
                className="cursor-pointer"
              />
              <span className="text-sm" style={{ fontFamily: 'Georgia, serif' }}>Settlements</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input 
                type="checkbox" 
                checked={layerVisibility.populationDensity}
                onChange={() => toggleLayer('populationDensity')}
                className="cursor-pointer"
              />
              <span className="text-sm" style={{ fontFamily: 'Georgia, serif' }}>Population Density</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input 
                type="checkbox" 
                checked={layerVisibility.expeditions}
                onChange={() => toggleLayer('expeditions')}
                className="cursor-pointer"
              />
              <span className="text-sm" style={{ fontFamily: 'Georgia, serif' }}>Expedition Routes</span>
            </label>
          </div>
        </div>
        
        {/* Active expeditions indicator */}
        {activeExpeditions.length > 0 && layerVisibility.expeditions && (
          <div className="mt-4 pt-3 border-t-2" style={{ borderColor: '#faad19' }}>
            <h4 className="text-sm font-bold mb-2" style={{ color: '#171717', fontFamily: 'Georgia, serif' }}>
              Active Expeditions ({currentYear})
            </h4>
            <div className="space-y-1">
              {activeExpeditions.map(exp => (
                <div key={exp.name} className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: exp.color }}
                  />
                  <span className="text-xs" style={{ fontFamily: 'Georgia, serif' }}>
                    {exp.leader}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
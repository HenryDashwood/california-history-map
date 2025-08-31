import React, { useState, useEffect } from 'react';
import CaliforniaMap from './components/CaliforniaMap';
import TimelineSlider from './components/TimelineSlider';
import CollapsiblePanel from './components/CollapsiblePanel';
import YearDisplay from './components/YearDisplay';
import Legend from './components/Legend';
import { useHistoricalData } from './hooks/useHistoricalData';
import { getActiveExpeditions } from './data/earlyExpeditions';
import { getActiveExpeditionsGeoJSON } from './data/expeditionsGeoJSON';

const MIN_YEAR = 1533; // Starting with first California expedition
const MAX_YEAR = 1850;

export interface LayerVisibility {
  settlements: boolean;
  populationDensity: boolean;
  nativeRegions: boolean;
  expeditions: boolean;
}

function App() {
  const [currentYear, setCurrentYear] = useState<number>(1533);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [layerVisibility, setLayerVisibility] = useState<LayerVisibility>({
    settlements: true,
    populationDensity: true,
    nativeRegions: false,
    expeditions: true,
  });

  // Get historical data for current year
  const historicalData = useHistoricalData(currentYear);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const toggleLayer = (layer: keyof LayerVisibility) => {
    setLayerVisibility(prev => ({ ...prev, [layer]: !prev[layer] }));
  };

  // Combine early and later expeditions
  const activeExpeditions = currentYear < 1769 
    ? getActiveExpeditions(currentYear).map(exp => ({
        name: exp.expedition.name,
        leader: exp.expedition.leader,
        color: exp.expedition.color || '#FF6B6B'
      }))
    : getActiveExpeditionsGeoJSON(currentYear);

  return (
    <div className="relative h-screen w-screen overflow-hidden">
      <CaliforniaMap 
        currentYear={currentYear} 
        layerVisibility={layerVisibility}
      />
      
      {/* Mobile Layout */}
      {isMobile ? (
        <>
          {/* Mobile Header */}
          <div className="absolute top-0 left-0 right-0 z-[1000] p-3 bg-gradient-to-b from-white/90 to-transparent pointer-events-none">
            <div className="pointer-events-auto">
              <YearDisplay currentYear={currentYear} isMobile={true} />
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            className="absolute top-20 right-3 z-[1001] p-3 rounded-lg shadow-lg border-2 pointer-events-auto"
            style={{ backgroundColor: '#f9e9cb', borderColor: '#faad19' }}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {showMobileMenu ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>

          {/* Mobile Slide-out Menu */}
          <div 
            className={`absolute top-0 right-0 h-full w-80 max-w-[85vw] z-[999] transform transition-transform duration-300 overflow-y-auto ${
              showMobileMenu ? 'translate-x-0' : 'translate-x-full'
            }`}
            style={{ backgroundColor: '#f9e9cb' }}
          >
            <div className="p-4 pt-24">
              <h3 className="text-lg font-bold mb-3 pb-2" 
                  style={{ color: '#171717', borderBottom: '2px solid #faad19', fontFamily: 'Georgia, serif' }}>
                Map Legend
              </h3>
              <Legend 
                currentYear={currentYear}
                layerVisibility={layerVisibility}
                onToggleLayer={toggleLayer}
                activeExpeditions={activeExpeditions}
              />
            </div>
          </div>

          {/* Mobile Timeline at bottom */}
          <div className="absolute bottom-0 left-0 right-0 z-[1000] p-3">
            <TimelineSlider
              minYear={MIN_YEAR}
              maxYear={MAX_YEAR}
              currentYear={currentYear}
              onYearChange={setCurrentYear}
              isPlaying={isPlaying}
              onPlayToggle={setIsPlaying}
            />
          </div>
        </>
      ) : (
        /* Desktop Layout */
        <>
          {/* Year display - positioned to avoid zoom controls */}
          <div className="absolute top-20 left-5 z-[1000]">
            <YearDisplay currentYear={currentYear} />
          </div>

          {/* Legend - collapsible panel on right, positioned below zoom controls */}
          <div className="absolute top-32 right-5 z-[1000]">
            <CollapsiblePanel 
              title="Map Legend" 
              defaultOpen={true}
              className="rounded-lg shadow-lg border-2"
            >
              <Legend 
                currentYear={currentYear}
                layerVisibility={layerVisibility}
                onToggleLayer={toggleLayer}
                activeExpeditions={activeExpeditions}
              />
            </CollapsiblePanel>
          </div>

          {/* Timeline Slider at bottom */}
          <div className="absolute bottom-5 left-5 right-5 z-[1000] max-w-4xl mx-auto">
            <TimelineSlider
              minYear={MIN_YEAR}
              maxYear={MAX_YEAR}
              currentYear={currentYear}
              onYearChange={setCurrentYear}
              isPlaying={isPlaying}
              onPlayToggle={setIsPlaying}
            />
          </div>
        </>
      )}
    </div>
  );
}

export default App;
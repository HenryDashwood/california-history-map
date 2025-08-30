import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import { timelineData, TimelineSettlement } from '../data/timelineData';
import { getSourcesForSettlement, formatSourceCitation } from '../data/sources';
import { createCustomIcon } from './MapIcons';
import GridPopulationDensity from './GridPopulationDensity';
import ExpeditionRoutesGeoJSON from './ExpeditionRoutesGeoJSON';
import { LayerVisibility } from '../App';

interface CaliforniaMapProps {
  currentYear: number;
  layerVisibility: LayerVisibility;
}

const CaliforniaMap: React.FC<CaliforniaMapProps> = ({ currentYear, layerVisibility }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const layerGroupsRef = useRef<{
    settlements: L.LayerGroup;
    nativeRegions: L.LayerGroup;
  } | null>(null);
  const markersRef = useRef<Map<string, { marker: L.Marker; settlement: TimelineSettlement; lastPopulation?: number }>>(new Map());

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    // Initialize map
    const map = L.map(mapRef.current).setView([37.5, -119.5], 6);
    mapInstanceRef.current = map;

    // Add base layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
      opacity: 0.7,
    }).addTo(map);

    // Initialize layer groups
    layerGroupsRef.current = {
      settlements: L.layerGroup().addTo(map),
      nativeRegions: L.layerGroup().addTo(map),
    };

    // Add scale control
    L.control.scale().addTo(map);

    return () => {
      map.remove();
      mapInstanceRef.current = null;
      layerGroupsRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!layerGroupsRef.current) return;

    const layers = layerGroupsRef.current;
    const markers = markersRef.current;
    
    // Toggle settlements layer visibility
    if (layerVisibility.settlements) {
      layers.settlements.addTo(mapInstanceRef.current!);
    } else {
      layers.settlements.remove();
    }

    // Helper function to interpolate population between years
    const interpolatePopulation = (settlement: TimelineSettlement, year: number): number => {
      const years = Object.keys(settlement.populationByYear)
        .map(y => parseInt(y))
        .sort((a, b) => a - b);
      
      // If year is before first data point, return 0 (not founded yet)
      if (year < settlement.founded || year < years[0]) {
        return 0;
      }
      
      // If year is after last data point, use last known population
      if (year >= years[years.length - 1]) {
        return settlement.populationByYear[years[years.length - 1]];
      }
      
      // Find the two years to interpolate between
      let lowerYear = years[0];
      let upperYear = years[years.length - 1];
      
      for (let i = 0; i < years.length - 1; i++) {
        if (years[i] <= year && years[i + 1] > year) {
          lowerYear = years[i];
          upperYear = years[i + 1];
          break;
        }
      }
      
      // Linear interpolation
      const lowerPop = settlement.populationByYear[lowerYear];
      const upperPop = settlement.populationByYear[upperYear];
      const ratio = (year - lowerYear) / (upperYear - lowerYear);
      
      return Math.round(lowerPop + (upperPop - lowerPop) * ratio);
    };

    // Update settlements based on current year
    timelineData.settlements.forEach(settlement => {
      const population = interpolatePopulation(settlement, currentYear);
      const markerKey = settlement.name;
      const existingMarker = markers.get(markerKey);

      // If settlement should exist (has population > 0)
      if (population > 0) {
        if (existingMarker) {
          // Update popup with current population (icon stays the same)
          if (!existingMarker.lastPopulation || 
              Math.abs(existingMarker.lastPopulation - population) > existingMarker.lastPopulation * 0.1) {
            
            existingMarker.lastPopulation = population;
            
            // Update popup with current population
            const sources = getSourcesForSettlement(settlement.type);
            const primarySource = sources[0];
            existingMarker.marker.setPopupContent(`
              <div class="text-sm" style="max-width: 300px; font-family: system-ui, -apple-system, sans-serif;">
                <h3 style="font-weight: bold; font-size: 1.1rem; margin-bottom: 8px; color: #171717; border-bottom: 2px solid #faad19; padding-bottom: 4px;">${settlement.name}</h3>
                <p style="margin: 4px 0;"><strong>Founded:</strong> ${settlement.founded}</p>
                <p style="margin: 4px 0;"><strong>Population (${currentYear}):</strong> ~${population.toLocaleString()}</p>
                <p style="margin: 4px 0;"><strong>Type:</strong> ${settlement.type.charAt(0).toUpperCase() + settlement.type.slice(1)}</p>
                <div style="margin-top: 10px; padding-top: 10px; border-top: 1px solid #faad19;">
                  <p style="font-size: 11px; color: #666; margin-bottom: 5px;"><strong>Source:</strong></p>
                  <p style="font-size: 11px; color: #666; line-height: 1.4;">
                    ${formatSourceCitation(primarySource)}
                  </p>
                </div>
              </div>
            `);
          }
        } else {
          // Create new marker with custom icon
          const sources = getSourcesForSettlement(settlement.type);
          const primarySource = sources[0];
          
          const marker = L.marker(settlement.coords, {
            icon: createCustomIcon(settlement.type),
            opacity: 0,
          }).bindPopup(`
            <div class="text-sm" style="max-width: 300px; font-family: system-ui, -apple-system, sans-serif;">
              <h3 style="font-weight: bold; font-size: 1.1rem; margin-bottom: 8px; color: #171717; border-bottom: 2px solid #faad19; padding-bottom: 4px;">${settlement.name}</h3>
              <p style="margin: 4px 0;"><strong>Founded:</strong> ${settlement.founded}</p>
              <p style="margin: 4px 0;"><strong>Population (${currentYear}):</strong> ~${population.toLocaleString()}</p>
              <p style="margin: 4px 0;"><strong>Type:</strong> ${settlement.type.charAt(0).toUpperCase() + settlement.type.slice(1)}</p>
              <div style="margin-top: 10px; padding-top: 10px; border-top: 1px solid #faad19;">
                <p style="font-size: 11px; color: #666; margin-bottom: 5px;"><strong>Source:</strong></p>
                <p style="font-size: 11px; color: #666; line-height: 1.4;">
                  ${formatSourceCitation(primarySource)}
                </p>
              </div>
            </div>
          `);

          marker.addTo(layers.settlements);
          
          // Fade in animation
          setTimeout(() => {
            marker.setOpacity(1);
          }, 100);

          markers.set(markerKey, {
            marker,
            settlement,
            lastPopulation: population,
          });
        }
      } else {
        // Remove marker if settlement shouldn't exist yet or is abandoned
        if (existingMarker) {
          layers.settlements.removeLayer(existingMarker.marker);
          markers.delete(markerKey);
        }
      }
    });

    // Native regions are now handled as part of the heatmap visualization
    layers.nativeRegions.clearLayers();
  }, [currentYear, layerVisibility]);

  return (
    <>
      <div ref={mapRef} className="h-full w-full" />
      <GridPopulationDensity 
        map={mapInstanceRef.current} 
        currentYear={currentYear}
        visible={layerVisibility.populationDensity}
      />
      <ExpeditionRoutesGeoJSON
        map={mapInstanceRef.current}
        currentYear={currentYear}
        visible={layerVisibility.expeditions}
      />
    </>
  );
};

export default CaliforniaMap;
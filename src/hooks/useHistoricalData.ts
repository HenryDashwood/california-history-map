import { useState, useEffect, useMemo } from 'react';
import { FeatureCollection } from 'geojson';
import { earlyExpeditions, getActiveExpeditions, expeditionsToGeoJSON } from '../data/earlyExpeditions';
import { timelineData } from '../data/timelineData';
import { getActiveExpeditionsGeoJSON } from '../data/expeditionsGeoJSON';

export interface HistoricalData {
  expeditions: FeatureCollection;
  settlements: FeatureCollection;
  annotations: any[];
}

export function useHistoricalData(year: number) {
  const [data, setData] = useState<HistoricalData>({
    expeditions: { type: 'FeatureCollection', features: [] },
    settlements: { type: 'FeatureCollection', features: [] },
    annotations: []
  });

  // Get expeditions for the current year
  const expeditions = useMemo(() => {
    const features = [];
    
    // Add early expeditions (pre-1769)
    if (year < 1769) {
      const earlyExps = getActiveExpeditions(year);
      const earlyGeoJSON = expeditionsToGeoJSON(earlyExps);
      features.push(...earlyGeoJSON.features);
    }
    
    // Add later expeditions (1769+)
    if (year >= 1769) {
      const laterExps = getActiveExpeditionsGeoJSON(year);
      features.push(...laterExps);
    }
    
    return {
      type: 'FeatureCollection' as const,
      features
    };
  }, [year]);

  // Get settlements for the current year
  const settlements = useMemo(() => {
    const features: any[] = [];
    
    // Use timelineData settlements
    timelineData.settlements.forEach(settlement => {
      // Check if settlement was founded by this year
      if (settlement.founded <= year) {
        // Get population for the current year
        const populationYears = Object.keys(settlement.populationByYear)
          .map(y => parseInt(y))
          .sort((a, b) => a - b);
        
        let population = 0;
        if (year >= populationYears[0]) {
          // Find the appropriate population value
          const yearData = populationYears.find(y => y <= year);
          if (yearData) {
            population = settlement.populationByYear[yearData];
          }
        }
        
        if (population > 0) {
          features.push({
            type: 'Feature' as const,
            geometry: {
              type: 'Point' as const,
              coordinates: [settlement.coords[1], settlement.coords[0]]
            },
            properties: {
              name: settlement.name,
              type: settlement.type,
              founded: settlement.founded,
              population: population
            }
          });
        }
      }
    });
    
    return {
      type: 'FeatureCollection' as const,
      features
    };
  }, [year]);

  // Get annotations for current expeditions and settlements
  const annotations = useMemo(() => {
    const anns = [];
    
    // Add annotations from early expeditions
    const activeEarlyExps = getActiveExpeditions(year);
    for (const exp of activeEarlyExps) {
      if (exp.annotations) {
        anns.push(...exp.annotations.map(ann => ({
          ...ann,
          expedition: exp.expedition.name
        })));
      }
    }
    
    return anns;
  }, [year]);

  useEffect(() => {
    setData({
      expeditions,
      settlements,
      annotations
    });
  }, [expeditions, settlements, annotations]);

  return data;
}
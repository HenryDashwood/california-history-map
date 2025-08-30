import { useEffect, useRef } from 'react';
import L from 'leaflet';
import { timelineData } from '../data/timelineData';

interface GridPopulationDensityProps {
  map: L.Map | null;
  currentYear: number;
  visible: boolean;
}

interface PopulationGrid {
  lat: number;
  lng: number;
  totalDensity: number;
  nativePop: number;
  spanishMexicanPop: number;
  americanPop: number;
  dominantGroup: 'native' | 'spanish' | 'mexican' | 'american' | 'mixed';
}

const GridPopulationDensity: React.FC<GridPopulationDensityProps> = ({
  map,
  currentYear,
  visible
}) => {
  const gridLayersRef = useRef<L.Rectangle[]>([]);

  useEffect(() => {
    if (!map || !visible) {
      // Clear existing grid
      gridLayersRef.current.forEach(layer => map?.removeLayer(layer));
      gridLayersRef.current = [];
      return;
    }

    // Clear previous grid
    gridLayersRef.current.forEach(layer => map.removeLayer(layer));
    gridLayersRef.current = [];

    // Define California bounds (approximate)
    const bounds = {
      north: 42.0,
      south: 32.5,
      west: -124.5,
      east: -114.0
    };

    // Create grid cells (0.5 degree resolution for historical period)
    const gridSize = 0.5;
    const grid: PopulationGrid[] = [];

    // Helper function to calculate distance between two points
    const distance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
      const R = 3959; // Earth radius in miles
      const dLat = (lat2 - lat1) * Math.PI / 180;
      const dLon = (lon2 - lon1) * Math.PI / 180;
      const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon/2) * Math.sin(dLon/2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
      return R * c;
    };

    // Helper to interpolate population
    const interpolatePopulation = (populationByYear: { [year: number]: number }, year: number): number => {
      const years = Object.keys(populationByYear).map(y => parseInt(y)).sort((a, b) => a - b);
      
      if (years.length === 0) return 0;
      if (year <= years[0]) return populationByYear[years[0]];
      if (year >= years[years.length - 1]) return populationByYear[years[years.length - 1]];
      
      for (let i = 0; i < years.length - 1; i++) {
        if (years[i] <= year && years[i + 1] > year) {
          const lowerPop = populationByYear[years[i]];
          const upperPop = populationByYear[years[i + 1]];
          const ratio = (year - years[i]) / (years[i + 1] - years[i]);
          return lowerPop + (upperPop - lowerPop) * ratio;
        }
      }
      return 0;
    };

    // Generate grid cells and calculate population density
    for (let lat = bounds.south; lat < bounds.north; lat += gridSize) {
      for (let lng = bounds.west; lng < bounds.east; lng += gridSize) {
        const cellCenter = {
          lat: lat + gridSize / 2,
          lng: lng + gridSize / 2
        };

        let nativePop = 0;
        let spanishMexicanPop = 0;
        let americanPop = 0;

        // Calculate native population influence
        timelineData.populationCenters.forEach(center => {
          const dist = distance(cellCenter.lat, cellCenter.lng, center.coords[0], center.coords[1]);
          if (dist < center.radius * 2) { // Extended influence area
            const years = Object.keys(center.densityByYear).map(y => parseInt(y)).sort();
            let density = 0;
            
            if (currentYear <= years[0] && years.length > 0) {
              density = center.densityByYear[years[0]];
            } else if (currentYear >= years[years.length - 1] && years.length > 0) {
              density = center.densityByYear[years[years.length - 1]];
            } else {
              for (let i = 0; i < years.length - 1; i++) {
                if (years[i] <= currentYear && years[i + 1] > currentYear) {
                  const lowerDensity = center.densityByYear[years[i]];
                  const upperDensity = center.densityByYear[years[i + 1]];
                  const ratio = (currentYear - years[i]) / (years[i + 1] - years[i]);
                  density = lowerDensity + (upperDensity - lowerDensity) * ratio;
                  break;
                }
              }
            }
            
            // Apply distance decay
            const influence = Math.exp(-dist / center.radius);
            nativePop += density * influence;
          }
        });

        // Calculate settlement population influence
        timelineData.settlements.forEach(settlement => {
          const population = interpolatePopulation(settlement.populationByYear, currentYear);
          if (population > 0) {
            const dist = distance(cellCenter.lat, cellCenter.lng, settlement.coords[0], settlement.coords[1]);
            
            // Different radius based on settlement type
            let effectiveRadius = 10; // miles
            if (settlement.type === 'city' || settlement.type === 'pueblo') {
              effectiveRadius = 15;
            } else if (settlement.type === 'mining') {
              effectiveRadius = 20;
            } else if (settlement.type === 'mission' || settlement.type === 'presidio') {
              effectiveRadius = 12;
            }
            
            if (dist < effectiveRadius * 2) {
              // Estimate density based on population and area
              const baseDensity = population / (Math.PI * effectiveRadius * effectiveRadius);
              const influence = Math.exp(-dist / effectiveRadius);
              const contributedDensity = baseDensity * influence * 10; // Scale factor
              
              // Assign to appropriate group based on year and nationality
              if (settlement.nationality === 'russian') {
                spanishMexicanPop += contributedDensity; // Group with Spanish/Mexican for simplicity
              } else if (currentYear < 1821) {
                spanishMexicanPop += contributedDensity; // Spanish period
              } else if (currentYear < 1847) {
                spanishMexicanPop += contributedDensity; // Mexican period
              } else {
                americanPop += contributedDensity; // American period
                // Add some Spanish/Mexican population that remains
                spanishMexicanPop += contributedDensity * 0.3;
              }
            }
          }
        });

        const totalDensity = nativePop + spanishMexicanPop + americanPop;
        
        if (totalDensity > 0.1) { // Only show cells with meaningful population
          // Determine dominant group
          let dominantGroup: 'native' | 'spanish' | 'mexican' | 'american' | 'mixed' = 'native';
          const maxPop = Math.max(nativePop, spanishMexicanPop, americanPop);
          
          if (maxPop === americanPop && americanPop > 0) {
            dominantGroup = 'american';
          } else if (maxPop === spanishMexicanPop && spanishMexicanPop > 0) {
            dominantGroup = currentYear < 1821 ? 'spanish' : 'mexican';
          } else if (nativePop > 0 && spanishMexicanPop > 0 && Math.abs(nativePop - spanishMexicanPop) < 2) {
            dominantGroup = 'mixed';
          }

          grid.push({
            lat: lat,
            lng: lng,
            totalDensity,
            nativePop,
            spanishMexicanPop,
            americanPop,
            dominantGroup
          });
        }
      }
    }

    // Find max density for normalization
    const maxDensity = Math.max(...grid.map(g => g.totalDensity), 1);

    // Render grid cells
    grid.forEach(cell => {
      const normalizedDensity = Math.pow(cell.totalDensity / maxDensity, 0.7); // Power for better visualization
      
      // Color based on dominant group and density
      let hue = 30; // Default warm orange
      let saturation = 40;
      
      switch(cell.dominantGroup) {
        case 'native':
          hue = 30; // Orange-brown for native
          saturation = 35;
          break;
        case 'spanish':
          hue = 45; // Golden for Spanish
          saturation = 50;
          break;
        case 'mexican':
          hue = 40; // Slightly different golden for Mexican
          saturation = 45;
          break;
        case 'american':
          hue = 210; // Blue for American
          saturation = 40;
          break;
        case 'mixed':
          hue = 35; // In-between color
          saturation = 30;
          break;
      }
      
      // Adjust lightness based on density (darker = more dense)
      const lightness = 85 - normalizedDensity * 35;
      
      // Create rectangle for grid cell
      const bounds: L.LatLngBoundsExpression = [
        [cell.lat, cell.lng],
        [cell.lat + gridSize, cell.lng + gridSize]
      ];
      
      const rectangle = L.rectangle(bounds, {
        fillColor: `hsl(${hue}, ${saturation}%, ${lightness}%)`,
        fillOpacity: 0.6,
        weight: 0,
        interactive: true
      });

      // Add popup with details
      const popupContent = `
        <div style="font-family: Georgia, serif; max-width: 250px;">
          <h3 style="font-weight: bold; margin-bottom: 8px; color: #171717; border-bottom: 2px solid #faad19; padding-bottom: 4px;">
            Population Density (${currentYear})
          </h3>
          <p style="margin: 4px 0;"><strong>Total:</strong> ~${Math.round(cell.totalDensity)} people/sq mile</p>
          ${cell.nativePop > 0.1 ? `<p style="margin: 4px 0;">Native: ~${Math.round(cell.nativePop)}</p>` : ''}
          ${cell.spanishMexicanPop > 0.1 ? `<p style="margin: 4px 0;">${currentYear < 1821 ? 'Spanish' : currentYear < 1847 ? 'Mexican' : 'Spanish/Mexican'}: ~${Math.round(cell.spanishMexicanPop)}</p>` : ''}
          ${cell.americanPop > 0.1 ? `<p style="margin: 4px 0;">American: ~${Math.round(cell.americanPop)}</p>` : ''}
          <p style="margin-top: 8px; font-size: 11px; color: #666;">
            Grid cell: ${gridSize}° × ${gridSize}°
          </p>
        </div>
      `;
      
      rectangle.bindPopup(popupContent);
      rectangle.addTo(map);
      gridLayersRef.current.push(rectangle);
    });

    // Cleanup function
    return () => {
      gridLayersRef.current.forEach(layer => {
        map.removeLayer(layer);
      });
      gridLayersRef.current = [];
    };
  }, [map, currentYear, visible]);

  return null;
};

export default GridPopulationDensity;
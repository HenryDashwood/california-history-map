import { useEffect, useRef } from 'react';
import L from 'leaflet';
import { getActiveExpeditionsGeoJSON } from '../data/expeditionsGeoJSON';

interface ExpeditionRoutesProps {
  map: L.Map | null;
  currentYear: number;
  visible: boolean;
}

const ExpeditionRoutesGeoJSON: React.FC<ExpeditionRoutesProps> = ({
  map,
  currentYear,
  visible
}) => {
  const routesRef = useRef<L.Polyline[]>([]);
  const markersRef = useRef<L.Marker[]>([]);

  useEffect(() => {
    if (!map || !visible) {
      // Clear existing routes
      routesRef.current.forEach(route => map?.removeLayer(route));
      markersRef.current.forEach(marker => map?.removeLayer(marker));
      routesRef.current = [];
      markersRef.current = [];
      return;
    }

    // Clear previous routes
    routesRef.current.forEach(route => map.removeLayer(route));
    markersRef.current.forEach(marker => map.removeLayer(marker));
    routesRef.current = [];
    markersRef.current = [];

    // Get expeditions active in current year
    const activeExpeditions = getActiveExpeditionsGeoJSON(currentYear);

    activeExpeditions.forEach(expedition => {
      // Convert coordinates from [lng, lat] to [lat, lng] for Leaflet
      const latLngCoords = expedition.coordinates.map(coord => [coord[1], coord[0]] as L.LatLngExpression);
      
      // Create animated dashed line style for sea routes
      const isSeaRoute = expedition.type === 'sea';
      
      // Draw the full route as one polyline
      const route = L.polyline(
        latLngCoords,
        {
          color: expedition.color,
          weight: 3,
          opacity: 0.8,
          dashArray: isSeaRoute ? '10, 10' : undefined,
          className: isSeaRoute ? 'sea-route-animation' : undefined
        }
      );

      // Add popup with expedition info
      route.bindPopup(`
        <div style="font-family: Georgia, serif; max-width: 250px;">
          <h3 style="font-weight: bold; margin-bottom: 8px; color: #171717; border-bottom: 2px solid #faad19; padding-bottom: 4px;">
            ${expedition.name}
          </h3>
          <p style="margin: 4px 0;"><strong>Leader:</strong> ${expedition.leader}</p>
          <p style="margin: 4px 0;"><strong>Years:</strong> ${expedition.startYear}-${expedition.endYear}</p>
          <p style="margin-top: 8px; font-size: 12px; color: #666;">
            ${expedition.description}
          </p>
        </div>
      `);

      route.addTo(map);
      routesRef.current.push(route);

      // Add start and end markers
      if (expedition.coordinates.length > 0) {
        const firstCoord = expedition.coordinates[0];
        const lastCoord = expedition.coordinates[expedition.coordinates.length - 1];

        // Start marker
        const startIcon = L.divIcon({
          html: `
            <div style="
              width: 12px;
              height: 12px;
              background-color: ${expedition.color};
              border: 2px solid white;
              border-radius: 50%;
              box-shadow: 0 2px 4px rgba(0,0,0,0.3);
            "></div>
          `,
          className: 'expedition-marker',
          iconSize: [16, 16],
          iconAnchor: [8, 8]
        });

        const startMarker = L.marker([firstCoord[1], firstCoord[0]], { icon: startIcon })
          .bindPopup(`
            <div style="font-family: Georgia, serif;">
              <h4 style="font-weight: bold; color: #171717;">
                ${expedition.name} - Start
              </h4>
              <p style="margin: 4px 0;">${expedition.leader}</p>
              <p style="margin: 4px 0;">${expedition.startYear}</p>
            </div>
          `);
        
        startMarker.addTo(map);
        markersRef.current.push(startMarker);

        // End marker (with arrow icon)
        const endIcon = L.divIcon({
          html: `
            <div style="
              width: 0;
              height: 0;
              border-left: 8px solid transparent;
              border-right: 8px solid transparent;
              border-bottom: 14px solid ${expedition.color};
              filter: drop-shadow(0 2px 4px rgba(0,0,0,0.3));
            "></div>
          `,
          className: 'expedition-marker',
          iconSize: [16, 14],
          iconAnchor: [8, 14]
        });

        const endMarker = L.marker([lastCoord[1], lastCoord[0]], { icon: endIcon })
          .bindPopup(`
            <div style="font-family: Georgia, serif;">
              <h4 style="font-weight: bold; color: #171717;">
                ${expedition.name} - End
              </h4>
              <p style="margin: 4px 0;">${expedition.leader}</p>
              <p style="margin: 4px 0;">${expedition.endYear}</p>
            </div>
          `);
        
        endMarker.addTo(map);
        markersRef.current.push(endMarker);
      }
    });

    // Cleanup function
    return () => {
      routesRef.current.forEach(route => {
        map.removeLayer(route);
      });
      markersRef.current.forEach(marker => {
        map.removeLayer(marker);
      });
      routesRef.current = [];
      markersRef.current = [];
    };
  }, [map, currentYear, visible]);

  return null;
};

export default ExpeditionRoutesGeoJSON;
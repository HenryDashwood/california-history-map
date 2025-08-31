import React, { useEffect } from 'react';
import L from 'leaflet';
import { useHistoricalData } from '../hooks/useHistoricalData';

interface EarlyExpeditionRoutesProps {
  map: L.Map | null;
  currentYear: number;
  visible: boolean;
}

const EarlyExpeditionRoutes: React.FC<EarlyExpeditionRoutesProps> = ({ map, currentYear, visible }) => {
  const historicalData = useHistoricalData(currentYear);
  const layerGroupRef = React.useRef<L.LayerGroup | null>(null);

  useEffect(() => {
    if (!map) return;

    // Create layer group if it doesn't exist
    if (!layerGroupRef.current) {
      layerGroupRef.current = L.layerGroup().addTo(map);
    }

    // Clear existing routes
    layerGroupRef.current.clearLayers();

    if (!visible || currentYear >= 1769) {
      return;
    }

    // Add expedition routes from historical data
    historicalData.expeditions.features.forEach((feature: any) => {
      if (feature.geometry && feature.geometry.type === 'LineString' && feature.geometry.coordinates.length > 0) {
        const polyline = L.polyline(
          feature.geometry.coordinates.map((coord: [number, number]) => [coord[1], coord[0]]),
          {
            color: feature.properties.color || '#FF6B6B',
            weight: 3,
            opacity: 0.8,
            dashArray: '10, 5'
          }
        );

        // Add popup with expedition info
        const popupContent = `
          <div style="min-width: 200px;">
            <h3 style="margin: 0 0 8px 0; color: #171717; font-family: Georgia, serif;">
              ${feature.properties.name}
            </h3>
            <p style="margin: 4px 0; font-size: 14px;">
              <strong>Leader:</strong> ${feature.properties.leader}<br/>
              <strong>Year:</strong> ${feature.properties.year || feature.properties.startYear}<br/>
              ${feature.properties.description ? `<strong>Description:</strong> ${feature.properties.description}` : ''}
            </p>
          </div>
        `;
        polyline.bindPopup(popupContent);

        if (layerGroupRef.current) {
          polyline.addTo(layerGroupRef.current);
        }
      }
    });

    // Add annotations as markers
    historicalData.annotations.forEach((annotation: any) => {
      if (annotation.coordinates) {
        const marker = L.circleMarker([annotation.coordinates[1], annotation.coordinates[0]], {
          radius: 6,
          fillColor: '#FFD700',
          color: '#000',
          weight: 1,
          opacity: 1,
          fillOpacity: 0.8
        });

        const popupContent = `
          <div style="min-width: 200px;">
            <h4 style="margin: 0 0 8px 0; color: #171717; font-family: Georgia, serif;">
              ${annotation.title}
            </h4>
            <p style="margin: 4px 0; font-size: 14px;">
              ${annotation.description}
              ${annotation.date ? `<br/><em>Date: ${annotation.date}</em>` : ''}
              ${annotation.expedition ? `<br/><strong>Expedition:</strong> ${annotation.expedition}` : ''}
            </p>
          </div>
        `;
        marker.bindPopup(popupContent);
        if (layerGroupRef.current) {
          marker.addTo(layerGroupRef.current);
        }
      }
    });

  }, [map, currentYear, visible, historicalData]);

  return null;
};

export default EarlyExpeditionRoutes;
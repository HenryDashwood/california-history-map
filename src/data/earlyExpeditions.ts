import { ExpeditionData, RouteSegment } from './database/DatabaseManager';

export interface ExpeditionWithRoute {
  expedition: ExpeditionData;
  route: RouteSegment[];
  annotations?: Array<{
    title: string;
    description: string;
    coordinates?: [number, number];
    date?: string;
  }>;
}

export const earlyExpeditions: ExpeditionWithRoute[] = [
  {
    expedition: {
      name: 'Jimenez Expedition',
      leader: 'Fortun Jimenez',
      startYear: 1533,
      endYear: 1533,
      sponsor: 'Hernán Cortés',
      purpose: 'Exploration and discovery',
      description: 'First European expedition to cross the Gulf of California and land on the Baja California peninsula.',
      color: '#8B4513'
    },
    route: [
      {
        coordinates: [
          [-109.916, 22.876], // Mazatlán area (departure)
          [-110.311, 24.142], // La Paz, Baja California Sur
        ],
        description: 'Crossed the Gulf of California to Baja Peninsula'
      }
    ],
    annotations: [
      {
        title: 'First California Landing',
        description: 'First recorded European landing on what would be called California. Jimenez was likely the first to use the name "California" for this land.',
        coordinates: [-110.311, 24.142],
        date: '1533'
      }
    ]
  },
  {
    expedition: {
      name: 'Cortés Expedition',
      leader: 'Hernán Cortés',
      startYear: 1535,
      endYear: 1535,
      sponsor: 'Spanish Crown',
      purpose: 'Colonial establishment',
      description: 'Attempted to establish a colony at La Paz (Santa Cruz) in Baja California.',
      color: '#DC143C'
    },
    route: [
      {
        coordinates: [
          [-109.916, 22.876], // Mainland Mexico
          [-110.311, 24.142], // La Paz (Santa Cruz)
        ],
        description: 'Crossed Gulf to establish colony at Santa Cruz (La Paz)'
      }
    ],
    annotations: [
      {
        title: 'Santa Cruz Colony',
        description: 'Cortés named this location Santa Cruz and attempted to found a colony here. The colony ultimately failed due to harsh conditions.',
        coordinates: [-110.311, 24.142],
        date: '1535'
      }
    ]
  },
  {
    expedition: {
      name: 'Cabrillo-Ferrer Expedition',
      leader: 'Juan Rodríguez Cabrillo',
      startYear: 1542,
      endYear: 1543,
      sponsor: 'Viceroy of New Spain',
      purpose: 'Coastal exploration',
      description: 'First European expedition to explore the California coast from San Diego to Oregon.',
      color: '#4169E1'
    },
    route: [
      {
        coordinates: [
          [-117.126, 32.534], // San Diego Bay
          [-117.183, 32.718], // San Diego
          [-117.254, 33.017], // Encinitas area
          [-118.243, 34.052], // Los Angeles area
          [-119.702, 34.420], // Santa Barbara
          [-120.650, 35.260], // San Luis Obispo area
          [-121.901, 36.603], // Monterey Bay
          [-122.419, 37.807], // San Francisco area
          [-122.932, 38.033], // Point Reyes
        ],
        startDate: '1542-09-28',
        endDate: '1543-01-03',
        description: 'Northward journey along California coast'
      },
      {
        coordinates: [
          [-122.932, 38.033], // Point Reyes
          [-124.211, 41.755], // California-Oregon border (reached by Ferrer)
        ],
        startDate: '1543-01',
        endDate: '1543-03',
        description: 'Bartolome Ferrer continues north after Cabrillo\'s death'
      }
    ],
    annotations: [
      {
        title: 'San Diego Bay',
        description: 'Cabrillo anchors in San Diego Bay, first European to do so.',
        coordinates: [-117.183, 32.718],
        date: '1542-09-28'
      },
      {
        title: 'Death of Cabrillo',
        description: 'Cabrillo died on San Miguel Island from gangrene resulting from a broken leg.',
        coordinates: [-120.038, 34.004], // San Miguel Island
        date: '1543-01-03'
      },
      {
        title: 'Northernmost Point',
        description: 'Ferrer reaches present-day California-Oregon border, the expedition\'s northernmost point.',
        coordinates: [-124.211, 41.755],
        date: '1543-03'
      }
    ]
  },
  {
    expedition: {
      name: 'Drake\'s Circumnavigation',
      leader: 'Francis Drake',
      startYear: 1579,
      endYear: 1579,
      sponsor: 'Queen Elizabeth I of England',
      purpose: 'Privateering and exploration',
      description: 'Drake explored California coast during his circumnavigation, claimed land as "New Albion" for England.',
      color: '#FF6347'
    },
    route: [
      {
        coordinates: [
          [-124.211, 41.755], // Approached from north
          [-122.932, 38.033], // Drake\'s Bay, Point Reyes
        ],
        startDate: '1579-06-17',
        endDate: '1579-07-23',
        description: 'California coastal exploration'
      }
    ],
    annotations: [
      {
        title: 'Drake\'s Bay Landing',
        description: 'Drake landed at what is now Drake\'s Bay on Point Reyes peninsula, stayed for 5 weeks to repair his ship.',
        coordinates: [-122.932, 38.033],
        date: '1579-06-17'
      },
      {
        title: 'New Albion',
        description: 'Drake claimed the territory as "New Albion" for England and left a brass plaque. Interacted peacefully with Coast Miwok tribe.',
        coordinates: [-122.932, 38.033],
        date: '1579-06'
      }
    ]
  },
  {
    expedition: {
      name: 'Cermeño Expedition',
      leader: 'Sebastian Rodriguez Cermeño',
      startYear: 1595,
      endYear: 1595,
      sponsor: 'Spanish Crown',
      purpose: 'Port exploration for Manila galleons',
      description: 'Explored Alta California coast searching for safe ports for Manila galleons.',
      color: '#9370DB'
    },
    route: [
      {
        coordinates: [
          [-122.932, 38.033], // Drake\'s Bay (called it Bay of San Francisco)
          [-121.901, 36.603], // Monterey area
        ],
        startDate: '1595-11',
        endDate: '1595-12',
        description: 'Coastal survey for ports'
      }
    ],
    annotations: [
      {
        title: 'Bay of San Francisco',
        description: 'Cermeño anchored in the same bay as Drake, naming it "Bay of San Francisco" (not the current San Francisco Bay).',
        coordinates: [-122.932, 38.033],
        date: '1595-11'
      },
      {
        title: 'Shipwreck',
        description: 'Cermeño\'s ship San Agustin was driven aground by a storm and wrecked.',
        coordinates: [-122.932, 38.033],
        date: '1595-11-30'
      }
    ]
  },
  {
    expedition: {
      name: 'Vizcaíno Expedition',
      leader: 'Sebastián Vizcaíno',
      startYear: 1602,
      endYear: 1603,
      sponsor: 'Spanish Crown',
      purpose: 'Detailed coastal mapping',
      description: 'Most thorough exploration and mapping of California coast before Spanish colonization.',
      color: '#FF8C00'
    },
    route: [
      {
        coordinates: [
          [-103.344, 20.624], // Acapulco (departure)
          [-117.183, 32.718], // San Diego
          [-118.243, 34.052], // Los Angeles area
          [-119.702, 34.420], // Santa Barbara
          [-121.901, 36.603], // Monterey Bay
          [-122.419, 37.807], // San Francisco area (but missed the bay)
        ],
        startDate: '1602-05-05',
        endDate: '1603-01-03',
        description: 'Comprehensive coastal survey from Acapulco to Monterey'
      }
    ],
    annotations: [
      {
        title: 'San Diego Named',
        description: 'Vizcaíno gave San Diego its current name, after Saint Didacus.',
        coordinates: [-117.183, 32.718],
        date: '1602-11-10'
      },
      {
        title: 'Monterey Bay',
        description: 'Vizcaíno described Monterey Bay in glowing terms, recommending it as an ideal port for Spanish galleons.',
        coordinates: [-121.901, 36.603],
        date: '1602-12-16'
      },
      {
        title: 'Missed San Francisco Bay',
        description: 'Despite sailing past, Vizcaíno failed to discover San Francisco Bay due to fog.',
        coordinates: [-122.419, 37.807],
        date: '1603-01'
      }
    ]
  }
];

// Helper function to get expeditions active in a given year
export function getActiveExpeditions(year: number): ExpeditionWithRoute[] {
  return earlyExpeditions.filter(exp => 
    exp.expedition.startYear <= year && 
    (exp.expedition.endYear ? exp.expedition.endYear >= year : exp.expedition.startYear === year)
  );
}

// Convert to GeoJSON format for map display
export function expeditionsToGeoJSON(expeditions: ExpeditionWithRoute[]): any {
  return {
    type: 'FeatureCollection',
    features: expeditions.map(exp => ({
      type: 'Feature',
      geometry: {
        type: 'LineString',
        coordinates: exp.route.flatMap(segment => segment.coordinates)
      },
      properties: {
        name: exp.expedition.name,
        leader: exp.expedition.leader,
        year: exp.expedition.startYear,
        color: exp.expedition.color,
        description: exp.expedition.description
      }
    }))
  };
}
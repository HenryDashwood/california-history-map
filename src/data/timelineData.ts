export interface TimelineSettlement {
  name: string;
  coords: [number, number];
  type:
    | "mission"
    | "presidio"
    | "pueblo"
    | "city"
    | "mining"
    | "ranch"
    | "russian";
  founded: number;
  // Population data by year - allows for growth/decline over time
  populationByYear: { [year: number]: number };
  // Optional end year if settlement was abandoned
  abandoned?: number;
  // Optional nationality for non-Spanish settlements
  nationality?: "spanish" | "mexican" | "american" | "russian";
}

export interface PopulationCenter {
  name: string;
  coords: [number, number];
  // Population density by year (people per square mile)
  densityByYear: { [year: number]: number };
  // Radius of influence in miles
  radius: number;
}

export interface TimelineData {
  settlements: TimelineSettlement[];
  populationCenters: PopulationCenter[];
  nativePopulation: {
    // Native population estimates by region and year
    regions: {
      name: string;
      coords: [number, number];
      area: [number, number][];
      populationByYear: { [year: number]: number };
    }[];
  };
}

export const timelineData: TimelineData = {
  settlements: [
    // Spanish Missions
    {
      name: "San Diego de Alcalá",
      coords: [32.7157, -117.1611],
      type: "mission",
      founded: 1769,
      populationByYear: {
        1770: 50,
        1773: 76,
        1775: 80,
        1776: 87,
        1778: 98,
        1780: 120,
        1783: 145,
        1785: 162,
        1790: 180,
        1795: 195,
        1797: 198,
        1800: 200,
        1805: 195,
        1810: 180,
        1815: 170,
        1820: 160,
        1825: 150,
        1830: 140,
        1832: 260, // Peak mission population
        1834: 240, // Secularization begins
        1835: 180,
        1840: 120,
        1845: 100,
        1850: 100,
      },
    },
    {
      name: "San Carlos Borromeo de Carmelo",
      coords: [36.5397, -121.9256],
      type: "mission",
      founded: 1770,
      populationByYear: {
        1771: 60,
        1773: 85,
        1775: 100,
        1777: 125,
        1780: 150,
        1783: 175,
        1785: 195,
        1790: 220,
        1795: 240,
        1800: 250,
        1805: 245,
        1810: 230,
        1815: 210,
        1820: 200,
        1825: 185,
        1830: 170,
        1834: 165, // Secularization
        1835: 150,
        1840: 140,
        1845: 125,
        1850: 120,
      },
    },
    {
      name: "San Antonio de Padua",
      coords: [36.0214, -121.1742],
      type: "mission",
      founded: 1771,
      populationByYear: {
        1772: 40,
        1775: 70,
        1780: 110,
        1790: 160,
        1800: 180,
        1810: 170,
        1820: 150,
        1830: 120,
        1840: 100,
        1850: 80,
      },
    },
    {
      name: "San Gabriel Arcángel",
      coords: [34.0983, -118.1067],
      type: "mission",
      founded: 1771,
      populationByYear: {
        1772: 45,
        1775: 80,
        1780: 130,
        1790: 200,
        1800: 240,
        1810: 220,
        1820: 190,
        1830: 160,
        1840: 130,
        1850: 90,
      },
    },
    {
      name: "San Luis Obispo de Tolosa",
      coords: [35.2827, -120.6596],
      type: "mission",
      founded: 1772,
      populationByYear: {
        1773: 35,
        1775: 60,
        1780: 95,
        1790: 140,
        1800: 160,
        1810: 150,
        1820: 130,
        1830: 110,
        1840: 90,
        1850: 70,
      },
    },
    // Adding remaining missions in chronological order
    {
      name: "San Francisco de Asís (Mission Dolores)",
      coords: [37.7644, -122.4278],
      type: "mission",
      founded: 1776,
      populationByYear: {
        1777: 40,
        1780: 70,
        1790: 120,
        1800: 150,
        1810: 180,
        1820: 200,
        1830: 160,
        1834: 150,
        1840: 100,
        1850: 80,
      },
    },
    {
      name: "San Juan Capistrano",
      coords: [33.5017, -117.6628],
      type: "mission",
      founded: 1776,
      populationByYear: {
        1777: 50,
        1780: 85,
        1790: 140,
        1800: 180,
        1810: 220,
        1820: 250,
        1830: 200,
        1834: 180,
        1840: 120,
        1850: 100,
      },
    },
    {
      name: "Santa Clara de Asís",
      coords: [37.3486, -121.9416],
      type: "mission",
      founded: 1777,
      populationByYear: {
        1778: 60,
        1780: 100,
        1790: 180,
        1800: 250,
        1810: 300,
        1820: 350,
        1830: 280,
        1834: 250,
        1840: 180,
        1850: 150,
      },
    },
    {
      name: "San Buenaventura",
      coords: [34.2756, -119.299],
      type: "mission",
      founded: 1782,
      populationByYear: {
        1783: 40,
        1790: 120,
        1800: 200,
        1810: 280,
        1820: 320,
        1830: 260,
        1834: 240,
        1840: 160,
        1850: 120,
      },
    },
    {
      name: "Santa Bárbara",
      coords: [34.4362, -119.7137],
      type: "mission",
      founded: 1786,
      populationByYear: {
        1787: 50,
        1790: 100,
        1800: 220,
        1810: 350,
        1820: 400,
        1830: 320,
        1834: 300,
        1840: 200,
        1850: 150,
      },
    },
    {
      name: "La Purísima Concepción",
      coords: [34.6721, -120.4199],
      type: "mission",
      founded: 1787,
      populationByYear: {
        1788: 45,
        1790: 90,
        1800: 180,
        1810: 250,
        1820: 300,
        1830: 240,
        1834: 220,
        1840: 140,
        1850: 100,
      },
    },
    {
      name: "La Exaltación de la Santa Cruz",
      coords: [36.9719, -121.9576],
      type: "mission",
      founded: 1791,
      populationByYear: {
        1792: 40,
        1800: 120,
        1810: 180,
        1820: 200,
        1830: 160,
        1834: 140,
        1840: 100,
        1850: 80,
      },
    },
    {
      name: "Nuestra Señora de la Soledad",
      coords: [36.4011, -121.32],
      type: "mission",
      founded: 1791,
      populationByYear: {
        1792: 35,
        1800: 100,
        1810: 160,
        1820: 180,
        1830: 140,
        1834: 120,
        1840: 80,
        1850: 60,
      },
    },
    {
      name: "San José de Guadalupe",
      coords: [37.5435, -122.039],
      type: "mission",
      founded: 1797,
      populationByYear: {
        1798: 50,
        1800: 80,
        1810: 180,
        1820: 260,
        1830: 220,
        1834: 200,
        1840: 140,
        1850: 120,
      },
    },
    {
      name: "San Juan Bautista",
      coords: [36.8455, -121.537],
      type: "mission",
      founded: 1797,
      populationByYear: {
        1798: 45,
        1800: 90,
        1810: 170,
        1820: 220,
        1830: 180,
        1834: 160,
        1840: 120,
        1850: 100,
      },
    },
    {
      name: "San Miguel Arcángel",
      coords: [35.7455, -120.696],
      type: "mission",
      founded: 1797,
      populationByYear: {
        1798: 40,
        1800: 85,
        1810: 160,
        1820: 200,
        1830: 160,
        1834: 140,
        1840: 100,
        1850: 80,
      },
    },
    {
      name: "San Fernando Rey de España",
      coords: [34.2808, -118.552],
      type: "mission",
      founded: 1797,
      populationByYear: {
        1798: 55,
        1800: 100,
        1810: 200,
        1820: 280,
        1830: 240,
        1834: 220,
        1840: 160,
        1850: 130,
      },
    },
    {
      name: "San Luis Rey de Francia",
      coords: [33.2406, -117.3359],
      type: "mission",
      founded: 1798,
      populationByYear: {
        1799: 60,
        1800: 100,
        1810: 250,
        1820: 400,
        1830: 340,
        1834: 320,
        1840: 200,
        1850: 150,
      },
    },
    {
      name: "Santa Inés",
      coords: [34.5948, -120.1368],
      type: "mission",
      founded: 1804,
      populationByYear: {
        1805: 45,
        1810: 120,
        1820: 180,
        1830: 150,
        1834: 130,
        1840: 90,
        1850: 70,
      },
    },
    {
      name: "San Rafael Arcángel",
      coords: [37.9735, -122.5311],
      type: "mission",
      founded: 1817,
      populationByYear: {
        1818: 40,
        1820: 80,
        1830: 120,
        1834: 100,
        1840: 70,
        1850: 50,
      },
    },
    {
      name: "San Francisco Solano",
      coords: [38.2919, -122.458],
      type: "mission",
      founded: 1823,
      populationByYear: {
        1824: 35,
        1830: 90,
        1834: 80,
        1840: 50,
        1850: 30,
      },
    },
    // Presidios
    {
      name: "Presidio of Monterey",
      coords: [36.6002, -121.8947],
      type: "presidio",
      founded: 1770,
      populationByYear: {
        1771: 100,
        1775: 120,
        1780: 140,
        1790: 160,
        1800: 180,
        1810: 170,
        1820: 160,
        1830: 150,
        1840: 140,
        1850: 150,
      },
    },
    {
      name: "Presidio of San Francisco",
      coords: [37.7989, -122.4662],
      type: "presidio",
      founded: 1776,
      populationByYear: {
        1777: 150,
        1780: 170,
        1790: 200,
        1800: 220,
        1810: 210,
        1820: 200,
        1830: 190,
        1840: 180,
        1850: 200,
      },
    },
    // Major Cities/Towns
    {
      name: "Los Angeles",
      coords: [34.0522, -118.2437],
      type: "pueblo",
      founded: 1781,
      populationByYear: {
        1782: 44, // Original 11 founding families (44 persons)
        1785: 75,
        1790: 139, // Spanish census
        1795: 180,
        1800: 315, // Spanish census
        1805: 365,
        1810: 365, // Census
        1815: 450,
        1820: 650, // Mexican period begins
        1825: 800,
        1830: 1200, // Ranch period growth
        1836: 2228, // Mexican census
        1840: 2300,
        1844: 2500, // Last Mexican census
        1846: 2500, // American conquest
        1847: 3000,
        1848: 3500,
        1849: 4000,
        1850: 1610, // U.S. Census (many left for gold fields)
      },
    },
    {
      name: "San Jose",
      coords: [37.3382, -121.8863],
      type: "pueblo",
      founded: 1777,
      populationByYear: {
        1778: 68, // First settlers
        1780: 50,
        1785: 75,
        1790: 80,
        1795: 100,
        1800: 170, // Spanish census
        1805: 200,
        1810: 150,
        1815: 180,
        1820: 240, // Mexican period
        1825: 280,
        1830: 524, // Ranch period
        1835: 600,
        1840: 700,
        1844: 900, // Last Mexican census
        1846: 900, // American conquest
        1848: 700, // Many left for gold
        1849: 600, // More left for gold
        1850: 3000, // Became supply center
      },
    },
    // Gold Rush boom towns
    {
      name: "San Francisco",
      coords: [37.7749, -122.4194],
      type: "city",
      founded: 1835, // As Yerba Buena
      populationByYear: {
        1835: 50, // Yerba Buena settlement
        1840: 100,
        1844: 150,
        1846: 200, // Renamed San Francisco
        1847: 459, // Pre-gold rush
        1848: 1000, // Gold discovery announced
        1849: 25000, // Gold Rush explosion
        1850: 25000, // U.S. Census
      },
    },
    {
      name: "Sacramento",
      coords: [38.5816, -121.4944],
      type: "city",
      founded: 1839, // Sutter's Fort
      populationByYear: {
        1839: 10, // Sutter's Fort established
        1841: 50,
        1844: 100,
        1846: 150,
        1847: 200,
        1848: 500, // Gold discovered nearby
        1849: 6000, // Boom town
        1850: 6820, // U.S. Census
      },
    },
    // Mining camps
    {
      name: "Coloma (Sutter's Mill)",
      coords: [38.8002, -120.8888],
      type: "mining",
      founded: 1847, // Sawmill built
      populationByYear: {
        1847: 20, // Sawmill workers
        1848: 100, // Gold discovered January 24
        1849: 4000, // Peak population
        1850: 3000, // Beginning decline
      },
    },
    {
      name: "Nevada City",
      coords: [39.2616, -121.0161],
      type: "mining",
      founded: 1849,
      populationByYear: {
        1850: 2500,
      },
    },
    {
      name: "Placerville",
      coords: [38.7296, -120.7985],
      type: "mining",
      founded: 1848,
      populationByYear: {
        1848: 50, // "Dry Diggins"
        1849: 1500, // "Hangtown"
        1850: 2000, // Major supply center
      },
    },
    // Russian settlements
    {
      name: "Fort Ross",
      coords: [38.5141, -123.2453],
      type: "russian",
      nationality: "russian",
      founded: 1812,
      abandoned: 1841,
      populationByYear: {
        1812: 25,
        1815: 95,
        1820: 260, // Peak with Aleut hunters
        1825: 200,
        1830: 150,
        1835: 100,
        1840: 50,
        1841: 0, // Sold to John Sutter
      },
    },
    {
      name: "Bodega Bay (Russian)",
      coords: [38.3325, -123.0478],
      type: "russian",
      nationality: "russian",
      founded: 1809,
      abandoned: 1841,
      populationByYear: {
        1809: 20,
        1812: 40,
        1820: 50,
        1825: 45,
        1830: 35,
        1835: 25,
        1840: 15,
        1841: 0,
      },
    },
  ],
  populationCenters: [
    // Native population centers - more organic distribution
    // Central Valley Yokuts - multiple centers for more natural look
    {
      name: "Northern Valley Yokuts",
      coords: [37.8, -120.5],
      radius: 35,
      densityByYear: {
        1769: 12,
        1780: 10,
        1790: 8,
        1800: 6,
        1810: 5,
        1820: 4,
        1830: 3,
        1840: 2,
        1850: 1,
      },
    },
    {
      name: "Central Valley Yokuts",
      coords: [36.7, -119.8],
      radius: 45,
      densityByYear: {
        1769: 15,
        1780: 12,
        1790: 10,
        1800: 8,
        1810: 6,
        1820: 4,
        1830: 3,
        1840: 2,
        1850: 1,
      },
    },
    {
      name: "Southern Valley Yokuts",
      coords: [35.8, -119.2],
      radius: 30,
      densityByYear: {
        1769: 10,
        1780: 8,
        1790: 7,
        1800: 5,
        1810: 4,
        1820: 3,
        1830: 2,
        1840: 1.5,
        1850: 0.8,
      },
    },
    // Bay Area Ohlone - distributed along the bay
    {
      name: "North Bay Ohlone",
      coords: [37.8, -122.3],
      radius: 25,
      densityByYear: {
        1769: 15,
        1780: 12,
        1790: 10,
        1800: 8,
        1810: 6,
        1820: 4,
        1830: 3,
        1840: 2,
        1850: 1.5,
      },
    },
    {
      name: "East Bay Ohlone",
      coords: [37.5, -121.9],
      radius: 28,
      densityByYear: {
        1769: 18,
        1780: 14,
        1790: 11,
        1800: 9,
        1810: 7,
        1820: 5,
        1830: 3.5,
        1840: 2.5,
        1850: 2,
      },
    },
    {
      name: "South Bay Ohlone",
      coords: [37.2, -121.8],
      radius: 22,
      densityByYear: {
        1769: 12,
        1780: 10,
        1790: 8,
        1800: 6,
        1810: 5,
        1820: 4,
        1830: 3,
        1840: 2,
        1850: 1.5,
      },
    },
    // Chumash - coastal distribution
    {
      name: "Northern Chumash",
      coords: [35.0, -120.2],
      radius: 30,
      densityByYear: {
        1769: 14,
        1780: 11,
        1790: 9,
        1800: 7,
        1810: 5,
        1820: 4,
        1830: 3,
        1840: 2.5,
        1850: 2,
      },
    },
    {
      name: "Central Chumash",
      coords: [34.4, -119.7],
      radius: 35,
      densityByYear: {
        1769: 18,
        1780: 14,
        1790: 11,
        1800: 9,
        1810: 7,
        1820: 5,
        1830: 4,
        1840: 3,
        1850: 2,
      },
    },
    {
      name: "Island Chumash",
      coords: [34.0, -119.5],
      radius: 20,
      densityByYear: {
        1769: 8,
        1780: 7,
        1790: 6,
        1800: 5,
        1810: 4,
        1820: 3,
        1830: 2,
        1840: 1.5,
        1850: 1,
      },
    },
    // Miwok - Sierra foothills
    {
      name: "Northern Miwok",
      coords: [38.3, -120.7],
      radius: 28,
      densityByYear: {
        1769: 10,
        1780: 9,
        1790: 8,
        1800: 7,
        1810: 6,
        1820: 5,
        1830: 4,
        1840: 3,
        1850: 2,
      },
    },
    {
      name: "Central Miwok",
      coords: [37.9, -120.4],
      radius: 25,
      densityByYear: {
        1769: 12,
        1780: 10,
        1790: 9,
        1800: 7,
        1810: 6,
        1820: 4,
        1830: 3,
        1840: 2.5,
        1850: 2,
      },
    },
    // Gold Rush population concentration
    {
      name: "Sierra Nevada Mining",
      coords: [39.2, -120.9],
      radius: 20,
      densityByYear: {
        1848: 0.1,
        1849: 3,
        1850: 10,
      },
    },
    {
      name: "Central Sierra Mining",
      coords: [38.8, -120.5],
      radius: 25,
      densityByYear: {
        1848: 0.1,
        1849: 2,
        1850: 8,
      },
    },
    {
      name: "Southern Sierra Mining",
      coords: [37.9, -120.3],
      radius: 18,
      densityByYear: {
        1848: 0.05,
        1849: 1.5,
        1850: 6,
      },
    },
  ],
  nativePopulation: {
    regions: [
      {
        name: "Chumash",
        coords: [34.4, -119.7],
        area: [
          [34.0, -119.0],
          [35.0, -119.0],
          [35.0, -120.5],
          [34.0, -120.5],
        ],
        populationByYear: {
          1769: 22000,
          1780: 18000,
          1790: 15000,
          1800: 12000,
          1810: 9000,
          1820: 7000,
          1830: 5000,
          1840: 3500,
          1850: 2500,
        },
      },
      {
        name: "Yokuts",
        coords: [36.7, -119.8],
        area: [
          [35.5, -118.5],
          [38.0, -118.5],
          [38.0, -121.0],
          [35.5, -121.0],
        ],
        populationByYear: {
          1769: 70000,
          1780: 60000,
          1790: 50000,
          1800: 40000,
          1810: 30000,
          1820: 22000,
          1830: 16000,
          1840: 12000,
          1850: 8000,
        },
      },
      {
        name: "Miwok",
        coords: [38.0, -120.5],
        area: [
          [37.5, -119.5],
          [38.5, -119.5],
          [38.5, -121.5],
          [37.5, -121.5],
        ],
        populationByYear: {
          1769: 25000,
          1780: 22000,
          1790: 19000,
          1800: 16000,
          1810: 13000,
          1820: 10000,
          1830: 7000,
          1840: 5000,
          1850: 3500,
        },
      },
      {
        name: "Ohlone",
        coords: [37.3, -122.0],
        area: [
          [36.5, -121.5],
          [37.8, -121.5],
          [37.8, -122.5],
          [36.5, -122.5],
        ],
        populationByYear: {
          1769: 12000,
          1780: 10000,
          1790: 8000,
          1800: 6500,
          1810: 5000,
          1820: 3500,
          1830: 2500,
          1840: 1800,
          1850: 1200,
        },
      },
    ],
  },
};

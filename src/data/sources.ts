export interface DataSource {
  title: string;
  author?: string;
  year?: number;
  url?: string;
  notes?: string;
}

export const dataSources = {
  missions: {
    primary: {
      title: "The California Missions: History, Art, and Preservation",
      author: "Edna E. Kimbro et al.",
      year: 2009,
      url: "https://www.getty.edu/conservation/publications_resources/books/california_missions.html",
    },
    secondary: [
      {
        title: "California Mission Foundation - Historical Statistics",
        url: "https://californiamissionsfoundation.org/mission-statistics/",
      },
      {
        title: "Early California Population Project Database",
        author: "Huntington Library",
        url: "https://www.huntington.org/ecpp",
        notes: "Mission baptism, marriage, and burial records",
      },
    ],
  },
  nativePopulation: {
    primary: {
      title: "The Population of the California Indians, 1769-1970",
      author: "Sherburne F. Cook",
      year: 1976,
      notes: "UC Berkeley demographic studies",
    },
    secondary: [
      {
        title: "Handbook of North American Indians, Vol. 8: California",
        author: "Robert F. Heizer (ed.)",
        year: 1978,
        url: "https://www.smithsonianmag.com/smithsonian-institution/",
      },
      {
        title: "Indians, Franciscans, and Spanish Colonization",
        author: "Robert H. Jackson and Edward Castillo",
        year: 1995,
        notes: "Population decline estimates from mission records",
      },
    ],
  },
  goldRush: {
    primary: {
      title: "California Census of 1850",
      author: "U.S. Census Bureau",
      year: 1850,
      url: "https://www.census.gov/library/publications/1853/dec/1850a.html",
    },
    secondary: [
      {
        title: "Days of Gold: The California Gold Rush and the American Nation",
        author: "Malcolm J. Rohrbough",
        year: 1997,
      },
      {
        title: "Mining Camps: A Study in American Frontier Government",
        author: "Charles Howard Shinn",
        year: 1885,
        url: "https://archive.org/details/miningcampsstudy00shinrich",
      },
    ],
  },
  pueblos: {
    primary: {
      title: "Spanish and Mexican Land Grants in California",
      author: "California State Archives",
      url: "https://www.sos.ca.gov/archives/collections/land-grants",
    },
    secondary: [
      {
        title: "The Spanish Frontier in North America",
        author: "David J. Weber",
        year: 1992,
      },
      {
        title: "Los Angeles Plaza Historic District",
        url: "https://elpueblo.lacity.org/history",
        notes: "Early Los Angeles population records",
      },
    ],
  },
  general: {
    primary: {
      title: "California: A History",
      author: "Kevin Starr",
      year: 2005,
      notes: "Comprehensive California history with population data",
    },
    secondary: [
      {
        title: "Historical Statistics of the United States",
        url: "https://www.census.gov/library/publications/1975/compendia/hist_stats_colonial-1970.html",
      },
      {
        title: "California Historical Society Collections",
        url: "https://californiahistoricalsociety.org/collections/",
      },
    ],
  },
};

export function getSourcesForSettlement(type: string): DataSource[] {
  switch (type) {
    case 'mission':
      return [dataSources.missions.primary, ...dataSources.missions.secondary];
    case 'presidio':
      return [dataSources.pueblos.primary, ...dataSources.pueblos.secondary];
    case 'pueblo':
    case 'city':
      return [dataSources.pueblos.primary, ...dataSources.pueblos.secondary];
    case 'mining':
      return [dataSources.goldRush.primary, ...dataSources.goldRush.secondary];
    default:
      return [dataSources.general.primary, ...dataSources.general.secondary];
  }
}

export function formatSourceCitation(source: DataSource): string {
  let citation = source.title;
  if (source.author) {
    citation = `${source.author}. ${citation}`;
  }
  if (source.year) {
    citation += ` (${source.year})`;
  }
  return citation;
}
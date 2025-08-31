-- California Historical Map Database Schema

-- Expeditions table
CREATE TABLE IF NOT EXISTS expeditions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    leader TEXT NOT NULL,
    start_year INTEGER NOT NULL,
    end_year INTEGER,
    sponsor TEXT,
    purpose TEXT,
    description TEXT,
    color TEXT DEFAULT '#FF6B6B',
    metadata JSON
);

-- Expedition routes (stored as LineString geometries)
CREATE TABLE IF NOT EXISTS expedition_routes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    expedition_id INTEGER NOT NULL,
    segment_index INTEGER NOT NULL,
    coordinates JSON NOT NULL, -- Array of [lng, lat] pairs
    start_date TEXT,
    end_date TEXT,
    description TEXT,
    FOREIGN KEY (expedition_id) REFERENCES expeditions(id) ON DELETE CASCADE
);

-- Settlements table
CREATE TABLE IF NOT EXISTS settlements (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    type TEXT NOT NULL, -- mission, presidio, pueblo, mining_camp, ranch, fort
    founded_year INTEGER,
    abandoned_year INTEGER,
    latitude REAL NOT NULL,
    longitude REAL NOT NULL,
    population INTEGER,
    founder TEXT,
    description TEXT,
    metadata JSON
);

-- Annotations for points, areas, or route segments
CREATE TABLE IF NOT EXISTS annotations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    entity_type TEXT NOT NULL, -- 'expedition', 'settlement', 'area', 'point'
    entity_id INTEGER,
    annotation_type TEXT, -- 'event', 'note', 'discovery', 'interaction', etc.
    title TEXT,
    description TEXT NOT NULL,
    date TEXT,
    coordinates JSON, -- For standalone points or areas
    metadata JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Native territories/regions
CREATE TABLE IF NOT EXISTS native_territories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    tribe_name TEXT NOT NULL,
    region_name TEXT,
    year INTEGER NOT NULL,
    population_estimate INTEGER,
    boundaries JSON NOT NULL, -- GeoJSON Polygon coordinates
    description TEXT,
    metadata JSON
);

-- Population density grid data
CREATE TABLE IF NOT EXISTS population_density (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    year INTEGER NOT NULL,
    latitude REAL NOT NULL,
    longitude REAL NOT NULL,
    grid_size REAL DEFAULT 0.1, -- degrees
    population_density REAL NOT NULL,
    data_source TEXT
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_expeditions_years ON expeditions(start_year, end_year);
CREATE INDEX IF NOT EXISTS idx_settlements_year ON settlements(founded_year, abandoned_year);
CREATE INDEX IF NOT EXISTS idx_settlements_location ON settlements(latitude, longitude);
CREATE INDEX IF NOT EXISTS idx_annotations_entity ON annotations(entity_type, entity_id);
CREATE INDEX IF NOT EXISTS idx_native_territories_year ON native_territories(year);
CREATE INDEX IF NOT EXISTS idx_population_density_year ON population_density(year);
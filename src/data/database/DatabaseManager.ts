import Database from 'better-sqlite3';
import { Feature, FeatureCollection, LineString, Point, Polygon } from 'geojson';
import fs from 'fs';
import path from 'path';

export interface ExpeditionData {
  id?: number;
  name: string;
  leader: string;
  startYear: number;
  endYear?: number;
  sponsor?: string;
  purpose?: string;
  description?: string;
  color?: string;
  metadata?: any;
}

export interface RouteSegment {
  coordinates: [number, number][];
  startDate?: string;
  endDate?: string;
  description?: string;
}

export interface SettlementData {
  id?: number;
  name: string;
  type: 'mission' | 'presidio' | 'pueblo' | 'mining_camp' | 'ranch' | 'fort';
  foundedYear?: number;
  abandonedYear?: number;
  latitude: number;
  longitude: number;
  population?: number;
  founder?: string;
  description?: string;
  metadata?: any;
}

export interface AnnotationData {
  id?: number;
  entityType: 'expedition' | 'settlement' | 'area' | 'point';
  entityId?: number;
  annotationType?: string;
  title?: string;
  description: string;
  date?: string;
  coordinates?: [number, number] | [number, number][];
  metadata?: any;
}

export class DatabaseManager {
  private db: Database.Database;
  private dbPath: string;

  constructor(dbPath?: string) {
    this.dbPath = dbPath || path.join(process.cwd(), 'california-history.db');
    this.db = new Database(this.dbPath);
    this.initializeDatabase();
  }

  private initializeDatabase(): void {
    const schemaPath = path.join(__dirname, 'schema.sql');
    const schema = fs.readFileSync(schemaPath, 'utf-8');
    this.db.exec(schema);
  }

  // Expedition methods
  addExpedition(expedition: ExpeditionData): number {
    const stmt = this.db.prepare(`
      INSERT INTO expeditions (name, leader, start_year, end_year, sponsor, purpose, description, color, metadata)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    
    const result = stmt.run(
      expedition.name,
      expedition.leader,
      expedition.startYear,
      expedition.endYear || null,
      expedition.sponsor || null,
      expedition.purpose || null,
      expedition.description || null,
      expedition.color || '#FF6B6B',
      JSON.stringify(expedition.metadata || {})
    );
    
    return result.lastInsertRowid as number;
  }

  addExpeditionRoute(expeditionId: number, segments: RouteSegment[]): void {
    const stmt = this.db.prepare(`
      INSERT INTO expedition_routes (expedition_id, segment_index, coordinates, start_date, end_date, description)
      VALUES (?, ?, ?, ?, ?, ?)
    `);

    segments.forEach((segment, index) => {
      stmt.run(
        expeditionId,
        index,
        JSON.stringify(segment.coordinates),
        segment.startDate || null,
        segment.endDate || null,
        segment.description || null
      );
    });
  }

  getExpeditionsAsGeoJSON(year?: number): FeatureCollection {
    let query = `
      SELECT e.*, er.coordinates, er.segment_index, er.description as segment_description
      FROM expeditions e
      LEFT JOIN expedition_routes er ON e.id = er.expedition_id
    `;
    
    const params: any[] = [];
    if (year !== undefined) {
      query += ' WHERE e.start_year <= ? AND (e.end_year IS NULL OR e.end_year >= ?)';
      params.push(year, year);
    }
    
    query += ' ORDER BY e.id, er.segment_index';
    
    const rows = this.db.prepare(query).all(...params);
    
    const expeditionsMap = new Map<number, any>();
    
    rows.forEach((row: any) => {
      if (!expeditionsMap.has(row.id)) {
        expeditionsMap.set(row.id, {
          type: 'Feature' as const,
          geometry: {
            type: 'LineString' as const,
            coordinates: []
          },
          properties: {
            id: row.id,
            name: row.name,
            leader: row.leader,
            startYear: row.start_year,
            endYear: row.end_year,
            sponsor: row.sponsor,
            purpose: row.purpose,
            description: row.description,
            color: row.color,
            metadata: JSON.parse(row.metadata || '{}')
          }
        });
      }
      
      if (row.coordinates) {
        const coords = JSON.parse(row.coordinates);
        const expedition = expeditionsMap.get(row.id);
        expedition.geometry.coordinates.push(...coords);
      }
    });
    
    return {
      type: 'FeatureCollection',
      features: Array.from(expeditionsMap.values())
    };
  }

  // Settlement methods
  addSettlement(settlement: SettlementData): number {
    const stmt = this.db.prepare(`
      INSERT INTO settlements (name, type, founded_year, abandoned_year, latitude, longitude, population, founder, description, metadata)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    
    const result = stmt.run(
      settlement.name,
      settlement.type,
      settlement.foundedYear || null,
      settlement.abandonedYear || null,
      settlement.latitude,
      settlement.longitude,
      settlement.population || null,
      settlement.founder || null,
      settlement.description || null,
      JSON.stringify(settlement.metadata || {})
    );
    
    return result.lastInsertRowid as number;
  }

  getSettlementsAsGeoJSON(year?: number, type?: string): FeatureCollection {
    let query = 'SELECT * FROM settlements WHERE 1=1';
    const params: any[] = [];
    
    if (year !== undefined) {
      query += ' AND (founded_year IS NULL OR founded_year <= ?) AND (abandoned_year IS NULL OR abandoned_year >= ?)';
      params.push(year, year);
    }
    
    if (type) {
      query += ' AND type = ?';
      params.push(type);
    }
    
    const rows = this.db.prepare(query).all(...params);
    
    const features = rows.map((row: any) => ({
      type: 'Feature' as const,
      geometry: {
        type: 'Point' as const,
        coordinates: [row.longitude, row.latitude]
      },
      properties: {
        id: row.id,
        name: row.name,
        type: row.type,
        foundedYear: row.founded_year,
        abandonedYear: row.abandoned_year,
        population: row.population,
        founder: row.founder,
        description: row.description,
        metadata: JSON.parse(row.metadata || '{}')
      }
    }));
    
    return {
      type: 'FeatureCollection',
      features
    };
  }

  // Annotation methods
  addAnnotation(annotation: AnnotationData): number {
    const stmt = this.db.prepare(`
      INSERT INTO annotations (entity_type, entity_id, annotation_type, title, description, date, coordinates, metadata)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `);
    
    const result = stmt.run(
      annotation.entityType,
      annotation.entityId || null,
      annotation.annotationType || null,
      annotation.title || null,
      annotation.description,
      annotation.date || null,
      annotation.coordinates ? JSON.stringify(annotation.coordinates) : null,
      JSON.stringify(annotation.metadata || {})
    );
    
    return result.lastInsertRowid as number;
  }

  getAnnotations(entityType?: string, entityId?: number): AnnotationData[] {
    let query = 'SELECT * FROM annotations WHERE 1=1';
    const params: any[] = [];
    
    if (entityType) {
      query += ' AND entity_type = ?';
      params.push(entityType);
    }
    
    if (entityId !== undefined) {
      query += ' AND entity_id = ?';
      params.push(entityId);
    }
    
    const rows = this.db.prepare(query).all(...params);
    
    return rows.map((row: any) => ({
      id: row.id,
      entityType: row.entity_type,
      entityId: row.entity_id,
      annotationType: row.annotation_type,
      title: row.title,
      description: row.description,
      date: row.date,
      coordinates: row.coordinates ? JSON.parse(row.coordinates) : null,
      metadata: JSON.parse(row.metadata || '{}')
    }));
  }

  // Bulk import from GeoJSON
  importGeoJSON(geojson: FeatureCollection, type: 'expedition' | 'settlement'): void {
    const transaction = this.db.transaction(() => {
      geojson.features.forEach(feature => {
        if (type === 'expedition' && feature.geometry.type === 'LineString') {
          const expeditionId = this.addExpedition({
            name: feature.properties?.name,
            leader: feature.properties?.leader,
            startYear: feature.properties?.startYear,
            endYear: feature.properties?.endYear,
            sponsor: feature.properties?.sponsor,
            purpose: feature.properties?.purpose,
            description: feature.properties?.description,
            color: feature.properties?.color,
            metadata: feature.properties?.metadata
          });
          
          this.addExpeditionRoute(expeditionId, [{
            coordinates: feature.geometry.coordinates as [number, number][],
            description: feature.properties?.routeDescription
          }]);
        } else if (type === 'settlement' && feature.geometry.type === 'Point') {
          const [longitude, latitude] = feature.geometry.coordinates;
          this.addSettlement({
            name: feature.properties?.name,
            type: feature.properties?.type,
            foundedYear: feature.properties?.foundedYear,
            abandonedYear: feature.properties?.abandonedYear,
            latitude,
            longitude,
            population: feature.properties?.population,
            founder: feature.properties?.founder,
            description: feature.properties?.description,
            metadata: feature.properties?.metadata
          });
        }
      });
    });
    
    transaction();
  }

  // Export entire database as GeoJSON
  exportAllAsGeoJSON(): { expeditions: FeatureCollection, settlements: FeatureCollection } {
    return {
      expeditions: this.getExpeditionsAsGeoJSON(),
      settlements: this.getSettlementsAsGeoJSON()
    };
  }

  close(): void {
    this.db.close();
  }
}
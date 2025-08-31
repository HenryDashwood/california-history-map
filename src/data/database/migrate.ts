#!/usr/bin/env node
import { DatabaseManager } from './DatabaseManager';
import { earlyExpeditions } from '../earlyExpeditions';
import { timelineData } from '../timelineData';
import fs from 'fs';
import path from 'path';

// Create a migration script to populate the database
async function migrate() {
  console.log('Starting database migration...');
  
  // Initialize database
  const dbPath = path.join(process.cwd(), 'california-history.db');
  
  // Remove existing database if it exists
  if (fs.existsSync(dbPath)) {
    console.log('Removing existing database...');
    fs.unlinkSync(dbPath);
  }
  
  const db = new DatabaseManager(dbPath);
  
  try {
    // Import early expeditions (pre-1769)
    console.log('Importing early expeditions...');
    for (const expData of earlyExpeditions) {
      const expeditionId = db.addExpedition(expData.expedition);
      db.addExpeditionRoute(expeditionId, expData.route);
      
      // Add annotations
      if (expData.annotations) {
        for (const annotation of expData.annotations) {
          db.addAnnotation({
            entityType: 'expedition',
            entityId: expeditionId,
            annotationType: 'event',
            title: annotation.title,
            description: annotation.description,
            date: annotation.date,
            coordinates: annotation.coordinates
          });
        }
      }
    }
    
    // Import settlements from timelineData
    console.log('Importing settlements from timeline data...');
    
    for (const settlement of timelineData.settlements) {
      const settlementId = db.addSettlement({
        name: settlement.name,
        type: settlement.type as any,
        foundedYear: settlement.founded,
        latitude: settlement.coords[0],
        longitude: settlement.coords[1],
        population: settlement.populationByYear[1850] || settlement.populationByYear[1776] || 0,
        description: `${settlement.type} founded in ${settlement.founded}`
      });
      
      // Add founding annotation
      db.addAnnotation({
        entityType: 'settlement',
        entityId: settlementId,
        annotationType: 'founding',
        title: 'Settlement Founding',
        description: `${settlement.name} founded as a ${settlement.type} in ${settlement.founded}`,
        date: `${settlement.founded}`
      });
    }
    
    // Import existing expedition routes from expeditionsGeoJSON.ts
    const expeditionsGeoJSONPath = path.join(__dirname, '..', 'expeditionsGeoJSON.ts');
    if (fs.existsSync(expeditionsGeoJSONPath)) {
      console.log('Importing existing expedition routes...');
      // Note: This would require parsing the TypeScript file or converting it to a data format
      // For now, we'll add them manually
      
      // Portolá Expedition (1769-1770)
      const portolaId = db.addExpedition({
        name: 'Portolá Expedition',
        leader: 'Gaspar de Portolá',
        startYear: 1769,
        endYear: 1770,
        sponsor: 'Spanish Crown',
        purpose: 'Establish missions and presidios',
        description: 'First overland expedition to Alta California, establishing Spanish presence',
        color: '#FF6B6B'
      });
      
      db.addExpeditionRoute(portolaId, [{
        coordinates: [
          [-117.161, 32.685], // San Diego
          [-117.242, 32.753],
          [-117.395, 33.147],
          [-118.243, 34.052], // Los Angeles
          [-119.702, 34.420], // Santa Barbara
          [-121.901, 36.603], // Monterey
          [-122.419, 37.807], // San Francisco Bay (discovered)
        ],
        startDate: '1769-07-14',
        endDate: '1770-01-24',
        description: 'First overland exploration of Alta California'
      }]);
      
      // Anza Expeditions (1774, 1775-1776)
      const anza1Id = db.addExpedition({
        name: 'First Anza Expedition',
        leader: 'Juan Bautista de Anza',
        startYear: 1774,
        endYear: 1774,
        sponsor: 'Spanish Crown',
        purpose: 'Find overland route from Sonora to California',
        description: 'Pioneering expedition establishing the Anza Trail',
        color: '#4169E1'
      });
      
      db.addExpeditionRoute(anza1Id, [{
        coordinates: [
          [-111.544, 31.344], // Tubac, Arizona
          [-114.467, 32.658], // Yuma Crossing
          [-116.963, 32.601], // San Diego
          [-121.901, 36.603], // Monterey
        ],
        startDate: '1774-01-08',
        endDate: '1774-05-26',
        description: 'Establishing the overland route to California'
      }]);
    }
    
    console.log('Migration completed successfully!');
    
    // Export sample data to verify
    const allData = db.exportAllAsGeoJSON();
    console.log(`Imported ${allData.expeditions.features.length} expeditions`);
    console.log(`Imported ${allData.settlements.features.length} settlements`);
    
  } catch (error) {
    console.error('Migration failed:', error);
  } finally {
    db.close();
  }
}

// Run migration if called directly
if (require.main === module) {
  migrate();
}

export default migrate;
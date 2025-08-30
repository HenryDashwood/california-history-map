# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React-based web application displaying an interactive map of California settlements comparing two historical periods: 1776 (Spanish California) and 1850 (Gold Rush/Statehood era). The application shows the dramatic changes in settlement patterns, population, and territorial control over a 74-year period.

## Development Commands

- `bun install` - Install dependencies
- `bun run dev` or `bun run start` - Start development server (runs on http://localhost:3000)
- `bun run build` - Create production build
- `bun run test` - Run tests

## Architecture

- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **Leaflet.js** for interactive mapping (using vanilla Leaflet, not react-leaflet wrapper)
- **Bun** as package manager and build tool
- **Create React App** for build system

## Project Structure

```
src/
├── components/
│   ├── CaliforniaMap.tsx    # Main map component with Leaflet integration
│   ├── ControlPanel.tsx     # Year selector and statistics panel
│   └── Legend.tsx           # Map legend component
├── data/
│   ├── settlements1776.ts  # 1776 historical data and TypeScript interfaces
│   └── settlements1850.ts  # 1850 historical data
├── App.tsx                  # Main app component with year state management
├── index.tsx               # React entry point
└── index.css               # Tailwind imports and custom styles
```

## Key Components

### Data Structure
- Historical data separated into TypeScript files with proper interfaces
- Settlement types: missions, presidios, cities/pueblos, mining camps
- Native American territorial data with population estimates
- Coordinates stored as `[lat, lng]` tuples with TypeScript typing

### CaliforniaMap Component
- Uses vanilla Leaflet with React hooks (useEffect, useRef)
- Manages map instance and layer groups for different settlement types
- Dynamically updates markers based on selected year
- Custom marker styling with population-based sizing

### State Management
- Simple React state using useState hook in App.tsx
- Year selection (1776 | 1850) passed down to child components
- No external state management library needed

## Adding New Data

To add new settlements or modify existing data:
1. Edit the appropriate data file (`src/data/settlements1776.ts` or `src/data/settlements1850.ts`)
2. Follow existing TypeScript interfaces for type safety
3. Ensure coordinates are in decimal degrees format `[latitude, longitude]`
4. Add appropriate population and founding date information
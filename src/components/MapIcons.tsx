import L from 'leaflet';

// Mission icon - bell tower with cross
const missionSvg = `
<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
  <g transform="translate(12, 12)">
    <!-- Bell tower -->
    <rect x="-5" y="-2" width="10" height="12" fill="#8B4513" stroke="#171717" stroke-width="1"/>
    <!-- Roof -->
    <path d="M -7 -2 L 0 -7 L 7 -2 Z" fill="#D2691E" stroke="#171717" stroke-width="1"/>
    <!-- Cross -->
    <rect x="-1" y="-11" width="2" height="5" fill="#faad19"/>
    <rect x="-2" y="-10" width="4" height="1.5" fill="#faad19"/>
    <!-- Bell -->
    <circle cx="0" cy="4" r="2" fill="#171717"/>
    <!-- Door -->
    <rect x="-2" y="6" width="4" height="4" fill="#4A4A4A"/>
  </g>
</svg>
`;

// Presidio icon - fort/star fort shape
const presidioSvg = `
<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
  <g transform="translate(12, 12)">
    <!-- Star fort shape -->
    <path d="M 0,-8 L 2,-2 L 8,-2 L 3,1 L 5,7 L 0,3 L -5,7 L -3,1 L -8,-2 L -2,-2 Z" 
          fill="#4169E1" stroke="#171717" stroke-width="1"/>
    <!-- Spanish flag hint -->
    <rect x="-2" y="-2" width="4" height="3" fill="#FFD700" opacity="0.7"/>
  </g>
</svg>
`;

// Pueblo/City icon - clustered buildings
const puebloSvg = `
<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
  <g transform="translate(12, 12)">
    <!-- Buildings -->
    <rect x="-7" y="2" width="5" height="6" fill="#CD853F" stroke="#171717" stroke-width="1"/>
    <rect x="-1" y="-2" width="4" height="10" fill="#8B7355" stroke="#171717" stroke-width="1"/>
    <rect x="4" y="0" width="4" height="8" fill="#A0826D" stroke="#171717" stroke-width="1"/>
    <!-- Roofs -->
    <path d="M -7 2 L -4.5 -1 L -2 2 Z" fill="#8B4513" stroke="#171717" stroke-width="0.5"/>
    <path d="M -1 -2 L 1 -5 L 3 -2 Z" fill="#8B4513" stroke="#171717" stroke-width="0.5"/>
    <path d="M 4 0 L 6 -3 L 8 0 Z" fill="#8B4513" stroke="#171717" stroke-width="0.5"/>
  </g>
</svg>
`;

// Mining camp icon - pickaxe and tent
const miningSvg = `
<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
  <g transform="translate(12, 12)">
    <!-- Tent -->
    <path d="M -6 8 L 0 -2 L 6 8 Z" fill="#DEB887" stroke="#171717" stroke-width="1"/>
    <path d="M -3 8 L 0 2 L 3 8 Z" fill="#8B7355"/>
    <!-- Pickaxe -->
    <rect x="2" y="-8" width="2" height="10" fill="#4A4A4A" transform="rotate(45 3 -3)"/>
    <path d="M 4 -8 L 7 -8 L 7 -6 L 5 -5 L 4 -6 Z" fill="#696969" stroke="#171717" stroke-width="0.5"/>
    <!-- Gold nuggets -->
    <circle cx="-4" cy="6" r="1.5" fill="#FFD700"/>
    <circle cx="4" cy="5" r="1.5" fill="#FFD700"/>
  </g>
</svg>
`;

// Ranch icon - barn with fence
const ranchSvg = `
<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
  <g transform="translate(12, 12)">
    <!-- Barn -->
    <rect x="-5" y="0" width="10" height="8" fill="#8B0000" stroke="#171717" stroke-width="1"/>
    <path d="M -6 0 L 0 -5 L 6 0 Z" fill="#A52A2A" stroke="#171717" stroke-width="1"/>
    <!-- Barn door -->
    <rect x="-2" y="3" width="4" height="5" fill="#4A4A4A"/>
    <!-- Fence posts -->
    <rect x="-8" y="5" width="1" height="3" fill="#654321"/>
    <rect x="-6" y="5" width="1" height="3" fill="#654321"/>
    <rect x="5" y="5" width="1" height="3" fill="#654321"/>
    <rect x="7" y="5" width="1" height="3" fill="#654321"/>
    <!-- Fence rails -->
    <rect x="-8" y="5.5" width="16" height="0.5" fill="#654321"/>
    <rect x="-8" y="7" width="16" height="0.5" fill="#654321"/>
  </g>
</svg>
`;

// Russian fort icon - onion dome with double-headed eagle hint
const russianSvg = `
<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
  <g transform="translate(12, 12)">
    <!-- Fort walls -->
    <rect x="-6" y="2" width="12" height="6" fill="#8B4513" stroke="#171717" stroke-width="1"/>
    <!-- Onion dome -->
    <path d="M -3 2 Q -3 -2, 0 -4 Q 3 -2, 3 2 Z" fill="#DC143C" stroke="#171717" stroke-width="1"/>
    <!-- Orthodox cross -->
    <rect x="-0.5" y="-7" width="1" height="4" fill="#FFD700"/>
    <rect x="-1.5" y="-6.5" width="3" height="0.7" fill="#FFD700"/>
    <rect x="-1" y="-5.5" width="2" height="0.5" fill="#FFD700" transform="rotate(20 0 -5.5)"/>
    <!-- Windows -->
    <rect x="-4" y="3" width="1.5" height="2" fill="#171717"/>
    <rect x="2.5" y="3" width="1.5" height="2" fill="#171717"/>
    <!-- Gate -->
    <rect x="-1.5" y="4" width="3" height="4" fill="#4A4A4A"/>
  </g>
</svg>
`;

export function createCustomIcon(type: string): L.DivIcon {
  const svgMap: { [key: string]: string } = {
    mission: missionSvg,
    presidio: presidioSvg,
    pueblo: puebloSvg,
    city: puebloSvg,
    mining: miningSvg,
    ranch: ranchSvg,
    russian: russianSvg,
  };

  const svg = svgMap[type] || puebloSvg;
  
  return L.divIcon({
    html: svg,
    className: 'custom-map-icon',
    iconSize: [24, 24],
    iconAnchor: [12, 12],
    popupAnchor: [0, -12],
  });
}
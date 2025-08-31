import React from 'react';

interface YearDisplayProps {
  currentYear: number;
  isMobile?: boolean;
}

const YearDisplay: React.FC<YearDisplayProps> = ({ currentYear, isMobile = false }) => {
  const getPeriodName = (year: number) => {
    if (year < 1542) return "Early Exploration";
    if (year < 1769) return "Age of Discovery";
    if (year < 1821) return "Spanish Colonial Period";
    if (year < 1846) return "Mexican Period";
    if (year < 1849) return "American Conquest";
    return "Gold Rush & Statehood";
  };

  if (isMobile) {
    return (
      <div 
        className="flex items-center justify-between p-3 rounded-lg shadow-lg border-2 w-full"
        style={{ backgroundColor: '#f9e9cb', borderColor: '#faad19' }}
      >
        <div className="text-2xl font-bold" style={{ color: '#171717', fontFamily: 'Georgia, serif' }}>
          {currentYear}
        </div>
        <div className="text-sm" style={{ color: '#171717' }}>
          {getPeriodName(currentYear)}
        </div>
      </div>
    );
  }

  return (
    <div 
      className="p-4 rounded-lg shadow-lg border-2"
      style={{ backgroundColor: '#f9e9cb', borderColor: '#faad19' }}
    >
      <div className="text-3xl font-bold mb-1" style={{ color: '#171717', fontFamily: 'Georgia, serif' }}>
        {currentYear}
      </div>
      <div className="text-sm" style={{ color: '#171717' }}>
        {getPeriodName(currentYear)}
      </div>
    </div>
  );
};

export default YearDisplay;
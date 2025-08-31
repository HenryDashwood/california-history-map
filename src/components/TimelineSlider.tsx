import React, { useState, useRef, useEffect } from 'react';

interface TimelineSliderProps {
  minYear: number;
  maxYear: number;
  currentYear: number;
  onYearChange: (year: number) => void;
  isPlaying?: boolean;
  onPlayToggle?: (playing: boolean) => void;
}

const TimelineSlider: React.FC<TimelineSliderProps> = ({
  minYear,
  maxYear,
  currentYear,
  onYearChange,
  isPlaying = false,
  onPlayToggle,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-play functionality
  useEffect(() => {
    if (isPlaying && !isDragging) {
      intervalRef.current = setInterval(() => {
        onYearChange((currentYear + 1 > maxYear) ? minYear : currentYear + 1);
        if (currentYear + 1 > maxYear) {
          onPlayToggle?.(false);
        }
      }, 150); // 150ms per year for smooth animation
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying, isDragging, minYear, maxYear, currentYear, onYearChange, onPlayToggle]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    updateYear(e.clientX);
    
    const handleMouseMove = (e: MouseEvent) => {
      updateYear(e.clientX);
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const updateYear = (clientX: number) => {
    if (!sliderRef.current) return;

    const rect = sliderRef.current.getBoundingClientRect();
    const percentage = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    const year = Math.round(minYear + percentage * (maxYear - minYear));
    onYearChange(year);
  };

  const percentage = ((currentYear - minYear) / (maxYear - minYear)) * 100;

  // Generate tick marks every 10 years
  const majorTicks = [];
  for (let year = 1540; year <= maxYear; year += 10) {
    majorTicks.push(year);
  }

  return (
    <div className="p-3 md:p-4 rounded-lg shadow-lg border-2" 
         style={{ backgroundColor: '#f9e9cb', borderColor: '#faad19' }}>
      <div className="flex items-center gap-2 md:gap-4 mb-3 md:mb-4">
        <h3 className="text-base md:text-lg font-bold" style={{ color: '#171717', fontFamily: 'Georgia, serif' }}>Timeline</h3>
        <div className="text-xl md:text-2xl font-bold min-w-[50px] md:min-w-[60px]" style={{ color: '#171717', fontFamily: 'Georgia, serif' }}>
          {currentYear}
        </div>
        {onPlayToggle && (
          <button
            onClick={() => onPlayToggle(!isPlaying)}
            className="flex items-center justify-center w-10 h-10 text-white rounded-full transition-all hover:scale-110"
            style={{ backgroundColor: '#faad19' }}
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? (
              <div className="flex gap-1">
                <div className="w-1 h-4 bg-white rounded-sm"></div>
                <div className="w-1 h-4 bg-white rounded-sm"></div>
              </div>
            ) : (
              <div className="w-0 h-0 border-l-[6px] border-l-white border-t-[4px] border-t-transparent border-b-[4px] border-b-transparent ml-1"></div>
            )}
          </button>
        )}
      </div>

      <div className="relative">
        {/* Timeline track */}
        <div
          ref={sliderRef}
          className="relative h-6 bg-gray-200 rounded-full cursor-pointer"
          onMouseDown={handleMouseDown}
        >
          {/* Progress bar */}
          <div
            className="absolute top-0 left-0 h-full rounded-full transition-all duration-100"
            style={{ 
              width: `${percentage}%`,
              background: 'linear-gradient(to right, #d4af37, #faad19)'
            }}
          />

          {/* Slider thumb */}
          <div
            className="absolute top-1/2 w-6 h-6 bg-white border-2 rounded-full shadow-lg transform -translate-y-1/2 cursor-grab active:cursor-grabbing transition-all duration-100"
            style={{ 
              left: `calc(${percentage}% - 12px)`,
              borderColor: '#faad19'
            }}
          />

        </div>
        
        {/* Tick marks below the timeline */}
        <div className="relative mt-2 pb-4">
          {majorTicks.map(year => {
            const tickPercentage = ((year - minYear) / (maxYear - minYear)) * 100;
            return (
              <div
                key={year}
                className="absolute transform -translate-x-1/2"
                style={{ left: `${tickPercentage}%` }}
              >
                <div className="w-px h-2 bg-gray-400 mx-auto" />
                <div className="text-[10px] text-gray-600 font-medium mt-1">
                  {year}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TimelineSlider;
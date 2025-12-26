import React, { useState } from 'react';
import { DaySchedule } from '../types';
import { EventCard } from './EventCard';
import { CloudSun, ChevronDown, ChevronUp } from 'lucide-react';

interface ItineraryViewProps {
  days: DaySchedule[];
}

export const ItineraryView: React.FC<ItineraryViewProps> = ({ days }) => {
  const [expandedDay, setExpandedDay] = useState<string | null>(days.length > 0 ? days[0].date : null);

  const toggleDay = (date: string) => {
    if (expandedDay === date) {
      setExpandedDay(null);
    } else {
      setExpandedDay(date);
    }
  };

  return (
    <div className="pb-24 px-4 pt-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold text-stone-800 mb-6 px-1">富國島之旅</h1>
      
      <div className="space-y-4">
        {days.map((day) => {
          const isExpanded = expandedDay === day.date;
          return (
            <div key={day.date} className="flex flex-col">
              {/* Day Header */}
              <button 
                onClick={() => toggleDay(day.date)}
                className={`flex items-center justify-between p-4 rounded-2xl transition-all duration-300 ${isExpanded ? 'bg-stone-800 text-white shadow-lg mb-4' : 'bg-white text-stone-800 shadow-sm'}`}
              >
                <div className="flex flex-col items-start">
                  <span className={`text-xl font-bold ${isExpanded ? 'text-white' : 'text-stone-800'}`}>{day.date}</span>
                  <div className={`flex items-center gap-1 text-xs mt-1 ${isExpanded ? 'text-stone-300' : 'text-stone-500'}`}>
                    <CloudSun className="w-3 h-3" />
                    {day.weatherInfo}
                  </div>
                </div>
                {isExpanded ? <ChevronUp /> : <ChevronDown />}
              </button>

              {/* Day Content */}
              {isExpanded && (
                <div className="animate-in slide-in-from-top-4 fade-in duration-300 pl-2 border-l-2 border-stone-200 ml-4">
                  {day.events.map((event) => (
                    <EventCard key={event.id} event={event} />
                  ))}
                  {day.events.length === 0 && (
                    <div className="text-stone-400 text-sm p-4 text-center">無行程</div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

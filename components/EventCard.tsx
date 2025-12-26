import React from 'react';
import { TripEvent, EventType } from '../types';
import { MapPin, Bus, Utensils, Bed, Ticket, Star, Tag } from 'lucide-react';

interface EventCardProps {
  event: TripEvent;
}

export const EventCard: React.FC<EventCardProps> = ({ event }) => {
  const getIcon = () => {
    switch (event.type) {
      case EventType.TRANSPORT: return <Bus className="w-5 h-5 text-stone-400" />;
      case EventType.FOOD: return <Utensils className="w-5 h-5 text-orange-400" />;
      case EventType.ACCOMMODATION: return <Bed className="w-5 h-5 text-indigo-400" />;
      case EventType.ATTRACTION: return <Ticket className="w-5 h-5 text-teal-500" />;
      default: return <Star className="w-5 h-5 text-yellow-500" />;
    }
  };

  const getBorderColor = () => {
    switch (event.type) {
      case EventType.TRANSPORT: return 'border-l-4 border-stone-300';
      case EventType.FOOD: return 'border-l-4 border-orange-300';
      case EventType.ACCOMMODATION: return 'border-l-4 border-indigo-300';
      case EventType.ATTRACTION: return 'border-l-4 border-teal-300';
      default: return 'border-l-4 border-stone-200';
    }
  };

  const handleNavClick = () => {
    const query = encodeURIComponent(event.location);
    window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, '_blank');
  };

  return (
    <div className={`bg-white rounded-xl p-4 mb-4 shadow-sm relative overflow-hidden ${getBorderColor()}`}>
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-stone-50 rounded-full">
            {getIcon()}
          </div>
          <span className="text-sm font-medium text-stone-500 font-mono">{event.time}</span>
        </div>
        
        <button 
          onClick={handleNavClick}
          className="flex items-center gap-1 px-3 py-1.5 bg-stone-800 text-stone-50 rounded-full text-xs font-medium active:scale-95 transition-transform"
        >
          <MapPin className="w-3 h-3" />
          導航
        </button>
      </div>

      <h3 className="text-lg font-bold text-stone-800 mb-1 leading-snug">{event.title}</h3>
      
      {event.cost && (
        <div className="text-xs text-stone-400 mb-2">{event.cost}</div>
      )}

      {/* Guide Tips / AI Content */}
      {event.guideTips && (
        <div className="mt-3 p-3 bg-stone-50 rounded-lg">
          <div className="flex items-start gap-2">
            <Star className="w-3 h-3 text-yellow-600 mt-1 flex-shrink-0" />
            <p className="text-sm text-stone-600 leading-relaxed italic">
              {event.guideTips}
            </p>
          </div>
        </div>
      )}

      {/* Tags */}
      {event.highlightTags && event.highlightTags.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {event.highlightTags.map((tag, idx) => (
            <span key={idx} className="inline-flex items-center gap-1 px-2 py-1 bg-yellow-50 text-yellow-800 text-xs rounded-md border border-yellow-100">
              <Tag className="w-3 h-3" />
              {tag}
            </span>
          ))}
        </div>
      )}
      
      {event.description && (
        <p className="mt-2 text-xs text-stone-400 line-clamp-2">
          {event.description}
        </p>
      )}
    </div>
  );
};

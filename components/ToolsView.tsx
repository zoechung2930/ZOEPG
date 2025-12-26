import React from 'react';
import { TripData } from '../types';
import { Plane, Building, Phone, ArrowRight } from 'lucide-react';

interface ToolsViewProps {
  data: TripData;
}

export const ToolsView: React.FC<ToolsViewProps> = ({ data }) => {
  return (
    <div className="pb-24 px-4 pt-4 max-w-md mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-stone-800 px-1">旅行工具箱</h1>

      {/* Flights */}
      <section>
        <h2 className="text-sm font-bold text-stone-400 uppercase tracking-wider mb-3 flex items-center gap-2">
          <Plane className="w-4 h-4" /> 航班資訊
        </h2>
        <div className="space-y-3">
          {data.flights.map((flight, i) => (
            <div key={i} className="bg-white p-4 rounded-xl shadow-sm border border-stone-100">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-mono bg-stone-100 px-2 py-1 rounded text-stone-600">{flight.number || 'Flight'}</span>
                <span className="text-sm font-bold text-stone-800">{flight.time}</span>
              </div>
              <div className="flex items-center gap-2 text-stone-700">
                 {/* Simple split for route if it contains ~ or - */}
                 {flight.route.includes('~') ? (
                    <>
                        <span className="font-medium">{flight.route.split('~')[0]}</span>
                        <ArrowRight className="w-4 h-4 text-stone-400" />
                        <span className="font-medium">{flight.route.split('~')[1]}</span>
                    </>
                 ) : (
                    <span>{flight.route}</span>
                 )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Hotels */}
      <section>
        <h2 className="text-sm font-bold text-stone-400 uppercase tracking-wider mb-3 flex items-center gap-2">
          <Building className="w-4 h-4" /> 住宿資訊
        </h2>
        <div className="space-y-3">
          {data.hotels.map((hotel, i) => (
            <div key={i} className="bg-white p-4 rounded-xl shadow-sm border border-stone-100">
              <h3 className="font-bold text-stone-800 mb-1">{hotel.name}</h3>
              <p className="text-xs text-stone-500 mb-2">{hotel.dates}</p>
              {hotel.address && (
                  <button 
                    onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(hotel.name + ' ' + (hotel.address || ''))}`, '_blank')}
                    className="text-xs text-indigo-500 flex items-center gap-1 hover:underline"
                  >
                    <MapPinIcon className="w-3 h-3" />
                    查看地圖
                  </button>
              )}
              {hotel.note && <p className="text-xs text-stone-400 mt-2 italic">{hotel.note}</p>}
            </div>
          ))}
        </div>
      </section>

      {/* Emergency */}
      <section>
        <h2 className="text-sm font-bold text-stone-400 uppercase tracking-wider mb-3 flex items-center gap-2">
          <Phone className="w-4 h-4" /> 緊急聯絡
        </h2>
        <div className="grid grid-cols-2 gap-3">
          {data.emergencyContacts.map((contact, i) => (
            <div key={i} className="bg-red-50 p-4 rounded-xl border border-red-100 flex flex-col items-center justify-center text-center">
              <span className="text-xs text-red-400 mb-1">{contact.name}</span>
              <a href={`tel:${contact.number}`} className="text-lg font-bold text-red-600 font-mono">{contact.number}</a>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

// Helper component
const MapPinIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
)

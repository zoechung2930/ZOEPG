import React, { useState, useEffect } from 'react';
import { TripData } from './types';
import { parseItineraryWithGemini } from './services/geminiService';
import { ItineraryView } from './components/ItineraryView';
import { ToolsView } from './components/ToolsView';
import { BudgetView } from './components/BudgetView';
import { Map, Briefcase, CreditCard, Sparkles } from 'lucide-react';

enum Tab {
  ITINERARY = 'itinerary',
  TOOLS = 'tools',
  BUDGET = 'budget',
}

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>(Tab.ITINERARY);
  const [data, setData] = useState<TripData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      // In a real scenario with API limits, we might want to cache this in localStorage
      const cached = localStorage.getItem('phu_quoc_data_v1');
      if (cached) {
         setData(JSON.parse(cached));
         setLoading(false);
         return;
      }

      const result = await parseItineraryWithGemini();
      if (result) {
        setData(result);
        localStorage.setItem('phu_quoc_data_v1', JSON.stringify(result));
      } else {
        setError("無法分析行程資料，請檢查 API Key 設定。");
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-stone-50 p-6 text-center">
        <div className="w-16 h-16 border-4 border-stone-200 border-t-stone-800 rounded-full animate-spin mb-6"></div>
        <h2 className="text-xl font-bold text-stone-800 mb-2">正在為您規劃行程...</h2>
        <div className="flex items-center justify-center gap-2 text-stone-500 text-sm">
           <Sparkles className="w-4 h-4 text-indigo-400" />
           <span>AI 正在分析景點與美食攻略</span>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-stone-50 p-6 text-center">
        <h2 className="text-xl font-bold text-stone-800 mb-2">發生錯誤</h2>
        <p className="text-stone-500">{error || "資料載入失敗"}</p>
        <button 
            onClick={() => window.location.reload()}
            className="mt-6 px-6 py-2 bg-stone-800 text-white rounded-full text-sm font-medium active:scale-95 transition-transform"
        >
            重試
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50 font-sans text-stone-900 selection:bg-indigo-100">
      
      {/* Main Content Area */}
      <main className="min-h-screen">
        {activeTab === Tab.ITINERARY && <ItineraryView days={data.itinerary} />}
        {activeTab === Tab.TOOLS && <ToolsView data={data} />}
        {activeTab === Tab.BUDGET && <BudgetView data={data} />}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md border-t border-stone-200 pb-safe pt-2 z-50">
        <div className="flex justify-around items-center max-w-md mx-auto h-16">
          <button 
            onClick={() => setActiveTab(Tab.ITINERARY)}
            className={`flex flex-col items-center gap-1 w-1/3 transition-colors ${activeTab === Tab.ITINERARY ? 'text-stone-900' : 'text-stone-400'}`}
          >
            <Map className={`w-6 h-6 ${activeTab === Tab.ITINERARY ? 'fill-stone-100' : ''}`} />
            <span className="text-[10px] font-medium tracking-wide">行程</span>
          </button>
          
          <button 
            onClick={() => setActiveTab(Tab.TOOLS)}
            className={`flex flex-col items-center gap-1 w-1/3 transition-colors ${activeTab === Tab.TOOLS ? 'text-stone-900' : 'text-stone-400'}`}
          >
            <Briefcase className={`w-6 h-6 ${activeTab === Tab.TOOLS ? 'fill-stone-100' : ''}`} />
            <span className="text-[10px] font-medium tracking-wide">工具</span>
          </button>

          <button 
            onClick={() => setActiveTab(Tab.BUDGET)}
            className={`flex flex-col items-center gap-1 w-1/3 transition-colors ${activeTab === Tab.BUDGET ? 'text-stone-900' : 'text-stone-400'}`}
          >
            <CreditCard className={`w-6 h-6 ${activeTab === Tab.BUDGET ? 'fill-stone-100' : ''}`} />
            <span className="text-[10px] font-medium tracking-wide">錢包</span>
          </button>
        </div>
      </nav>

      {/* Safe Area Padding for mobile bottom nav */}
      <div className="h-safe-bottom"></div>
    </div>
  );
};

export default App;

import React, { useState, useEffect } from 'react';
import { DollarSign, RefreshCw, Delete } from 'lucide-react';

export const ExchangeView: React.FC = () => {
  const [vnd, setVnd] = useState<string>('');
  const [twd, setTwd] = useState<string>('0');
  const [usd, setUsd] = useState<string>('0');

  // Rates (Estimated for late March 2025 context)
  // 1 TWD approx 780 VND
  // 1 USD approx 25,400 VND
  const RATE_VND_TO_TWD = 1 / 780; 
  const RATE_VND_TO_USD = 1 / 25400;

  useEffect(() => {
    const value = parseFloat(vnd);
    if (!isNaN(value)) {
      // Round TWD to whole number, USD to 2 decimals
      setTwd((value * RATE_VND_TO_TWD).toFixed(0));
      setUsd((value * RATE_VND_TO_USD).toFixed(2));
    } else {
      setTwd('0');
      setUsd('0');
    }
  }, [vnd]);

  const handleInput = (val: string) => {
    // Allow numbers only
    const clean = val.replace(/[^0-9]/g, '');
    setVnd(clean);
  };

  const formatNumber = (val: string) => {
    if (!val) return '';
    return parseInt(val).toLocaleString();
  };

  const addAmount = (amount: number) => {
      const current = parseInt(vnd || '0');
      setVnd((current + amount).toString());
  };

  const appendZeros = () => {
      setVnd(prev => prev + '000');
  };

  return (
    <div className="pb-24 px-4 pt-4 max-w-md mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-stone-800 px-1">匯率計算機</h1>
      
      {/* Input Section */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-200">
        <label className="block text-xs font-bold text-stone-400 uppercase tracking-wider mb-2">
          輸入越南盾 (VND)
        </label>
        <div className="relative mb-6">
            <input 
              type="text" 
              inputMode="numeric"
              value={formatNumber(vnd)}
              onChange={(e) => handleInput(e.target.value)}
              placeholder="0"
              className="w-full text-4xl font-mono font-bold text-stone-800 bg-transparent border-b-2 border-stone-100 focus:border-indigo-500 outline-none py-2 placeholder-stone-200 pr-8"
            />
            <span className="absolute right-0 top-1/2 -translate-y-1/2 text-sm font-bold text-stone-400 bg-stone-100 px-2 py-1 rounded">₫</span>
            {vnd && (
                <button 
                    onClick={() => setVnd('')}
                    className="absolute right-10 top-1/2 -translate-y-1/2 text-stone-300 hover:text-stone-500 p-1"
                >
                    <Delete className="w-5 h-5" />
                </button>
            )}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-4 gap-2">
            <button onClick={() => setVnd('10000')} className="btn-quick">10k</button>
            <button onClick={() => setVnd('20000')} className="btn-quick">20k</button>
            <button onClick={() => setVnd('50000')} className="btn-quick">50k</button>
            <button onClick={() => setVnd('100000')} className="btn-quick">100k</button>
            <button onClick={() => setVnd('200000')} className="btn-quick">200k</button>
            <button onClick={() => setVnd('500000')} className="btn-quick">500k</button>
            <button onClick={appendZeros} className="col-span-2 btn-quick bg-indigo-50 text-indigo-600 border-indigo-100 font-bold">+000</button>
        </div>
      </div>

      {/* Results Section */}
      <div className="grid grid-cols-1 gap-4">
        {/* TWD */}
        <div className="bg-stone-800 text-white p-6 rounded-2xl shadow-lg relative overflow-hidden transition-all duration-300">
            <div className="absolute top-0 right-0 p-4 opacity-10">
                <DollarSign className="w-24 h-24" />
            </div>
            <label className="block text-xs font-bold text-stone-400 uppercase tracking-wider mb-1">
              新台幣 (TWD)
            </label>
            <div className="text-5xl font-mono font-bold tracking-tight">
                ${parseFloat(twd).toLocaleString()}
            </div>
            <div className="mt-3 text-xs text-stone-400 flex items-center gap-1">
               <RefreshCw className="w-3 h-3" /> 匯率估算: 1 TWD ≈ 780 VND
            </div>
        </div>

        {/* USD */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-200 relative overflow-hidden">
             <div className="absolute top-0 right-0 p-4 opacity-5">
                <DollarSign className="w-24 h-24" />
            </div>
            <label className="block text-xs font-bold text-stone-400 uppercase tracking-wider mb-1">
              美元 (USD)
            </label>
            <div className="text-3xl font-mono font-bold text-stone-700 tracking-tight">
                $ {usd}
            </div>
            <div className="mt-2 text-xs text-stone-400">
               匯率估算: 1 USD ≈ 25,400 VND
            </div>
        </div>
      </div>
      
      <div className="text-center text-xs text-stone-300 mt-8 px-8">
        * 匯率僅供參考，實際請依當地換匯店或刷卡匯率為準。
        <br/>富國島機場或導遊換匯通常較差，建議到陽東市區金飾店。
      </div>

      <style>{`
        .btn-quick {
            padding: 0.5rem;
            background-color: #f5f5f4;
            color: #57534e;
            font-size: 0.875rem; /* text-sm */
            font-weight: 500;
            border-radius: 0.5rem;
            border: 1px solid #e7e5e4;
            transition: transform 0.1s;
        }
        .btn-quick:active {
            transform: scale(0.95);
        }
      `}</style>
    </div>
  );
};
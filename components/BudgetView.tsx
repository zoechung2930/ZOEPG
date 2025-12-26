import React, { useState } from 'react';
import { TripData, ShoppingItem } from '../types';
import { Wallet, CheckSquare, Square, DollarSign, ShoppingBag } from 'lucide-react';

interface BudgetViewProps {
  data: TripData;
}

export const BudgetView: React.FC<BudgetViewProps> = ({ data }) => {
  const [items, setItems] = useState<ShoppingItem[]>(data.shoppingList);

  const toggleItem = (id: string) => {
    setItems(prev => prev.map(item => 
      item.id === id ? { ...item, checked: !item.checked } : item
    ));
  };

  const totalBudget = data.budget.reduce((acc, curr) => acc + curr.amount, 0);

  return (
    <div className="pb-24 px-4 pt-4 max-w-md mx-auto space-y-8">
      <h1 className="text-2xl font-bold text-stone-800 px-1">錢包與清單</h1>

      {/* Budget */}
      <section>
        <div className="bg-stone-800 text-white p-6 rounded-2xl shadow-lg mb-6">
            <div className="flex items-center gap-2 text-stone-300 text-sm mb-1">
                <Wallet className="w-4 h-4" /> 預估總花費 (TWD)
            </div>
            <div className="text-4xl font-bold font-mono tracking-tight">
                ${totalBudget.toLocaleString()}
            </div>
        </div>

        <h2 className="text-sm font-bold text-stone-400 uppercase tracking-wider mb-3">支出明細</h2>
        <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-stone-100">
            <table className="w-full text-sm text-left">
                <thead className="bg-stone-50 text-stone-500 font-medium">
                    <tr>
                        <th className="px-4 py-3">項目</th>
                        <th className="px-4 py-3 text-right">金額</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                    {data.budget.map((item, i) => (
                        <tr key={i}>
                            <td className="px-4 py-3">
                                <div className="text-stone-800 font-medium">{item.category}</div>
                                <div className="text-xs text-stone-400">{item.description}</div>
                            </td>
                            <td className="px-4 py-3 text-right font-mono text-stone-600">
                                {item.amount.toLocaleString()}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
      </section>

      {/* Shopping List */}
      <section>
        <h2 className="text-sm font-bold text-stone-400 uppercase tracking-wider mb-3 flex items-center gap-2">
           <ShoppingBag className="w-4 h-4" /> 待買清單
        </h2>
        <div className="space-y-2">
            {items.map((item) => (
                <button 
                    key={item.id}
                    onClick={() => toggleItem(item.id)}
                    className={`w-full flex items-center p-4 rounded-xl border transition-all duration-200 ${
                        item.checked 
                        ? 'bg-stone-50 border-stone-100 opacity-60' 
                        : 'bg-white border-stone-200 shadow-sm'
                    }`}
                >
                    <div className={`mr-4 ${item.checked ? 'text-teal-500' : 'text-stone-300'}`}>
                        {item.checked ? <CheckSquare className="w-6 h-6" /> : <Square className="w-6 h-6" />}
                    </div>
                    <div className="text-left">
                        <span className={`block font-medium ${item.checked ? 'text-stone-400 line-through' : 'text-stone-800'}`}>
                            {item.name}
                        </span>
                        {item.note && <span className="text-xs text-stone-400">{item.note}</span>}
                    </div>
                </button>
            ))}
            {items.length === 0 && (
                <div className="text-center p-6 text-stone-400 text-sm bg-stone-50 rounded-xl border border-dashed border-stone-200">
                    目前沒有待買項目
                </div>
            )}
        </div>
      </section>
    </div>
  );
};

import React from 'react';
import { useToyStore } from '../context/ToyStoreContext';
import { AgeGroup } from '../types';
import { Baby, Sparkles, Smile, Rocket, Gamepad2, Award } from 'lucide-react';

interface AgeOption {
  id: AgeGroup;
  label: string;
  sublabel: string;
  icon: React.FC<{ className?: string }>;
}

export const AgeFilterBar: React.FC = () => {
  const { selectedAgeGroup, setSelectedAgeGroup, toys } = useToyStore();

  const ageOptions: AgeOption[] = [
    { id: 'all', label: 'All Ages', sublabel: 'Complete Catalog', icon: Sparkles },
    { id: '0-2', label: '0-2 Yrs', sublabel: 'Infant & Toddler', icon: Baby },
    { id: '3-5', label: '3-5 Yrs', sublabel: 'Preschool & Early', icon: Smile },
    { id: '6-8', label: '6-8 Yrs', sublabel: 'STEM & Robotics', icon: Rocket },
    { id: '9-12', label: '9-12 Yrs', sublabel: 'Tweens & Creators', icon: Gamepad2 },
    { id: '13+', label: '13+ Yrs', sublabel: 'Teens & Hobbyists', icon: Award }
  ];

  const getCountForAge = (age: AgeGroup) => {
    if (age === 'all') return toys.length;
    return toys.filter(t => t.ageGroup === age).length;
  };

  return (
    <div className="bg-white border-b border-slate-200 py-3.5 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-2.5">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-800">
              Source By Age Stage
            </span>
            <span className="text-[10px] bg-orange-100 text-[#FF6A00] font-extrabold px-2 py-0.5 rounded-md">
              Verified Specs
            </span>
          </div>
          {selectedAgeGroup !== 'all' && (
            <button
              onClick={() => setSelectedAgeGroup('all')}
              className="text-xs font-bold text-[#FF6A00] hover:underline"
              id="reset-age-filter-btn"
            >
              Reset Age Filter
            </button>
          )}
        </div>

        {/* Scrollable Age Bento Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2.5">
          {ageOptions.map(option => {
            const Icon = option.icon;
            const isSelected = selectedAgeGroup === option.id;
            const count = getCountForAge(option.id);

            return (
              <button
                key={option.id}
                onClick={() => setSelectedAgeGroup(option.id)}
                className={`h-12 rounded-lg p-2 flex items-center gap-2 transition-all cursor-pointer border ${
                  isSelected
                    ? 'bg-[#FF6A00] text-white border-[#FF6A00] shadow-xs font-bold'
                    : 'bg-slate-50 hover:bg-orange-50 text-slate-700 border-slate-200 hover:border-orange-200'
                }`}
                id={`age-filter-${option.id}`}
              >
                <div className={`w-7 h-7 rounded-md flex items-center justify-center shrink-0 ${
                  isSelected ? 'bg-white/20 text-white' : 'bg-white text-[#FF6A00] shadow-2xs'
                }`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="text-left overflow-hidden">
                  <div className="text-xs font-bold tracking-tight truncate leading-none">
                    {option.label}
                  </div>
                  <div className={`text-[10px] truncate leading-tight mt-0.5 ${
                    isSelected ? 'text-orange-100' : 'text-slate-500'
                  }`}>
                    {count} items
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};


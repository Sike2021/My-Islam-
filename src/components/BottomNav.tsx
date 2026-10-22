import React from 'react';
import { Clock, Award, BookOpen, HardDrive, Users, GraduationCap } from 'lucide-react';

export type ActiveNavTab = 'timer' | 'khatam' | 'israr' | 'reader' | 'offline' | 'qaris';

interface BottomNavProps {
  activeTab: ActiveNavTab;
  onTabChange: (tab: ActiveNavTab) => void;
  isTimerRunning: boolean;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  onTabChange,
  isTimerRunning,
}) => {
  const tabs = [
    {
      id: 'timer' as ActiveNavTab,
      label: 'Auto Timer',
      icon: Clock,
      badge: isTimerRunning,
    },
    {
      id: 'khatam' as ActiveNavTab,
      label: 'Khatam',
      icon: Award,
    },
    {
      id: 'israr' as ActiveNavTab,
      label: 'Dr. Israr',
      icon: GraduationCap,
    },
    {
      id: 'reader' as ActiveNavTab,
      label: 'Read Quran',
      icon: BookOpen,
    },
    {
      id: 'offline' as ActiveNavTab,
      label: 'Offline',
      icon: HardDrive,
    },
    {
      id: 'qaris' as ActiveNavTab,
      label: 'Qaris',
      icon: Users,
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-emerald-950/95 backdrop-blur-lg border-t border-emerald-900/80 px-1 py-1.5 safe-area-pb">
      <div className="max-w-md mx-auto flex items-center justify-between">
        {tabs.map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`relative flex-1 flex flex-col items-center justify-center py-1 px-1 rounded-2xl transition active:scale-95 ${
                isActive
                  ? 'text-amber-400 font-bold'
                  : 'text-emerald-400/80 hover:text-emerald-200'
              }`}
            >
              <div className="relative">
                <Icon
                  size={19}
                  className={`transition-transform duration-200 ${
                    isActive ? 'scale-110 stroke-[2.5]' : 'stroke-[1.8]'
                  }`}
                />
                {tab.badge && (
                  <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-amber-400 rounded-full animate-ping" />
                )}
              </div>
              <span className="text-[9.5px] mt-0.5 tracking-tight font-sans truncate max-w-full">
                {tab.label}
              </span>
              {isActive && (
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-0.5" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};

import React from 'react';
import { ShieldCheck } from 'lucide-react';

interface ToolWrapperProps {
  title: string;
  description: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
}

export const ToolWrapper: React.FC<ToolWrapperProps> = ({ title, description, children, actions }) => {
  return (
    <div className="flex flex-col h-full animate-in fade-in duration-300">
      <header className="mb-6 pb-4 border-b border-zinc-200 dark:border-zinc-800 flex justify-between items-start gap-4">
        <div>
          <div className="flex items-center gap-3 mb-1">
             <h1 className="text-2xl font-bold text-zinc-900 dark:text-white tracking-tight">{title}</h1>
             <div className="hidden sm:flex items-center gap-1 text-[10px] uppercase font-bold tracking-wider text-emerald-600 dark:text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 select-none">
               <ShieldCheck className="w-3 h-3" />
               <span>Local</span>
             </div>
          </div>
          <p className="text-zinc-500 dark:text-zinc-400 text-sm">{description}</p>
        </div>
        {actions && <div className="flex gap-2 shrink-0">{actions}</div>}
      </header>
      <div className="flex-1 min-h-0 overflow-auto">
        {children}
      </div>
    </div>
  );
};
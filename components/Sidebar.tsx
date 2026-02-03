import React from 'react';
import { ToolDef, ToolId } from '../types';
import { Terminal, Github, Star, Sun, Moon } from 'lucide-react';

interface SidebarProps {
  tools: ToolDef[];
  activeTool: ToolId;
  onSelectTool: (id: ToolId) => void;
  isOpen: boolean;
  onClose: () => void;
  favorites: string[];
  theme: 'dark' | 'light';
  toggleTheme: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ 
  tools, 
  activeTool, 
  onSelectTool, 
  isOpen, 
  onClose,
  favorites,
  theme,
  toggleTheme
}) => {
  
  const favoriteTools = tools.filter(t => favorites.includes(t.id));

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar Container */}
      <aside 
        className={`
          fixed lg:static inset-y-0 left-0 z-50
          w-64 bg-surface border-r border-zinc-200 dark:border-zinc-800 
          transform transition-transform duration-200 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          flex flex-col shadow-xl lg:shadow-none
        `}
      >
        <div 
          className="p-6 border-b border-zinc-200 dark:border-zinc-800 flex items-center gap-3 cursor-pointer group hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors"
          onClick={() => { onSelectTool(ToolId.HOME); onClose(); }}
          title="Go to Dashboard"
        >
          <div className="w-8 h-8 rounded bg-primary/10 flex items-center justify-center text-primary group-hover:scale-105 transition-transform">
            <Terminal className="w-5 h-5" />
          </div>
          <span className="font-bold text-lg tracking-tight text-zinc-900 dark:text-white">DevTools<span className="text-primary">Hub</span></span>
        </div>

        <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          {/* Home Link */}
          <button
            onClick={() => { onSelectTool(ToolId.HOME); onClose(); }}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-md transition-all text-sm font-medium ${
              activeTool === ToolId.HOME 
                ? 'bg-primary/10 text-primary shadow-[0_0_10px_rgba(6,182,212,0.1)]' 
                : 'text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 dark:hover:text-zinc-100'
            }`}
          >
            <Terminal className="w-4 h-4" />
            Dashboard
          </button>

          {/* Favorites Section */}
          {favoriteTools.length > 0 && (
            <>
              <div className="pt-4 pb-2 px-3 text-xs font-semibold text-zinc-400 dark:text-zinc-600 uppercase tracking-wider flex items-center gap-2">
                <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" /> Favorites
              </div>
              {favoriteTools.map((tool) => (
                <button
                  key={`fav-${tool.id}`}
                  onClick={() => { onSelectTool(tool.id); onClose(); }}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-md transition-all text-sm font-medium ${
                     activeTool === tool.id 
                    ? 'bg-primary/10 text-primary shadow-[0_0_10px_rgba(6,182,212,0.1)]' 
                    : 'text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 dark:hover:text-zinc-100'
                  }`}
                >
                  <tool.icon className="w-4 h-4" />
                  {tool.name}
                </button>
              ))}
            </>
          )}

          <div className="pt-4 pb-2 px-3 text-xs font-semibold text-zinc-400 dark:text-zinc-600 uppercase tracking-wider">
            All Utilities
          </div>

          {tools.map((tool) => (
            <button
              key={tool.id}
              onClick={() => { onSelectTool(tool.id); onClose(); }}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-md transition-all text-sm font-medium group ${
                activeTool === tool.id 
                  ? 'bg-primary/10 text-primary shadow-[0_0_10px_rgba(6,182,212,0.1)]' 
                  : 'text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 dark:hover:text-zinc-100'
              }`}
            >
              <tool.icon className={`w-4 h-4 ${activeTool === tool.id ? 'text-primary' : 'text-zinc-400 group-hover:text-zinc-600 dark:group-hover:text-zinc-300'}`} />
              {tool.name}
              {favorites.includes(tool.id) && <Star className="w-3 h-3 text-yellow-500 fill-yellow-500 ml-auto" />}
            </button>
          ))}
        </div>

        <div className="p-4 border-t border-zinc-200 dark:border-zinc-800 space-y-2">
           <button 
             onClick={toggleTheme}
             className="w-full flex items-center justify-between px-3 py-2 rounded-md bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:border-primary transition-colors"
           >
             <span className="flex items-center gap-2">
               {theme === 'dark' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
               {theme === 'dark' ? 'Dark Mode' : 'Light Mode'}
             </span>
           </button>

           <a 
             href="https://github.com/Pheem49/Developer-Utilities" 
             target="_blank"
             rel="noopener noreferrer"
             className="flex items-center justify-center gap-2 text-xs text-zinc-500 hover:text-primary transition-colors py-2"
           >
             <Github className="w-3 h-3" />
             Open Source
           </a>
        </div>
      </aside>
    </>
  );
};
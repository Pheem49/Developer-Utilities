import React, { useState, useEffect } from 'react';
import { Menu, Search, Zap, ShieldCheck, Star } from 'lucide-react';
import { TOOLS } from './constants';
import { ToolId } from './types';
import { Sidebar } from './components/Sidebar';

function App() {
  const [activeToolId, setActiveToolId] = useState<ToolId>(ToolId.HOME);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Theme State
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    if (typeof window !== 'undefined') {
      try {
        return (localStorage.getItem('theme') as 'dark'|'light') || 'dark';
      } catch (e) {
        return 'dark';
      }
    }
    return 'dark';
  });

  // Favorites State
  const [favorites, setFavorites] = useState<string[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('favorites');
        return saved ? JSON.parse(saved) : [];
      } catch (e) {
        return [];
      }
    }
    return [];
  });

  // Routing Logic
  useEffect(() => {
    const handleHashChange = () => {
      try {
        // In some sandboxed environments, accessing location properties might fail
        const hash = window.location.hash ? window.location.hash.slice(1) : ''; 
        const tool = TOOLS.find(t => t.id === hash);
        if (tool) {
          setActiveToolId(tool.id);
        } else if (!hash || hash === 'home') {
          setActiveToolId(ToolId.HOME);
        }
      } catch (e) {
        // Silently ignore in restricted environments
      }
    };

    handleHashChange(); // Init
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleSelectTool = (id: ToolId) => {
    setActiveToolId(id);
    try {
      const newHash = id === ToolId.HOME ? '' : id;
      // This may throw in sandboxed environments (like blob URLs)
      window.location.hash = newHash;
    } catch (e) {
      // Silently ignore hash update errors
    }
  };

  // Theme Logic
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
    try {
      localStorage.setItem('theme', theme);
    } catch (e) {
      // Silently ignore localstorage errors
    }
  }, [theme]);

  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');

  // Favorites Logic
  const toggleFavorite = (toolId: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setFavorites(prev => {
      const newFavs = prev.includes(toolId) 
        ? prev.filter(id => id !== toolId)
        : [...prev, toolId];
      try {
        localStorage.setItem('favorites', JSON.stringify(newFavs));
      } catch (err) {
        // Silently ignore localstorage errors
      }
      return newFavs;
    });
  };

  const activeTool = TOOLS.find(t => t.id === activeToolId);

  const filteredTools = TOOLS.filter(t => 
    t.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    t.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex h-screen w-full bg-background text-zinc-900 dark:text-zinc-100 overflow-hidden font-sans transition-colors duration-300">
      
      <Sidebar 
        tools={TOOLS} 
        activeTool={activeToolId} 
        onSelectTool={handleSelectTool} 
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        favorites={favorites}
        theme={theme}
        toggleTheme={toggleTheme}
      />

      <main className="flex-1 flex flex-col min-w-0 relative">
        {/* Mobile Header */}
        <div className="lg:hidden h-14 border-b border-zinc-200 dark:border-zinc-800 flex items-center px-4 justify-between bg-surface/50 backdrop-blur">
          <button 
            onClick={() => setSidebarOpen(true)}
            className="p-2 -ml-2 text-zinc-500 dark:text-zinc-400 hover:text-primary"
          >
            <Menu className="w-6 h-6" />
          </button>
          <button 
             onClick={() => handleSelectTool(ToolId.HOME)}
             className="font-bold text-zinc-900 dark:text-white hover:text-primary transition-colors"
          >
             DevToolsHub
          </button>
          <div className="w-6" /> {/* Spacer */}
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-auto p-4 lg:p-8">
          
          {activeToolId === ToolId.HOME ? (
            <div className="max-w-6xl mx-auto animate-in fade-in duration-500">
              <header className="mb-12 text-center space-y-4 pt-8">
                <div className="inline-flex items-center justify-center p-3 rounded-full bg-primary/10 mb-4 ring-1 ring-primary/30 shadow-[0_0_20px_rgba(6,182,212,0.2)]">
                  <Zap className="w-8 h-8 text-primary" />
                </div>
                <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
                  Developer <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Utilities</span>
                </h1>
                <p className="text-zinc-500 dark:text-zinc-400 text-lg max-w-2xl mx-auto">
                  A collection of free, client-side tools for developers. Fast, secure, and always ready.
                </p>
                
                <div className="flex items-center justify-center gap-2 mt-4 text-xs font-medium text-emerald-600 dark:text-emerald-500 bg-emerald-500/10 py-1 px-3 rounded-full border border-emerald-500/20 inline-flex mx-auto">
                   <ShieldCheck className="w-3 h-3" />
                   All tools run locally in your browser. No data leaves your device.
                </div>

                <div className="max-w-md mx-auto relative mt-8">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-zinc-400 dark:text-zinc-500" />
                  </div>
                  <input
                    type="text"
                    className="block w-full pl-10 pr-3 py-3 border border-zinc-300 dark:border-zinc-700 rounded-lg leading-5 bg-white dark:bg-surfaceHighlight text-zinc-900 dark:text-zinc-300 placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all sm:text-sm shadow-xl"
                    placeholder="Search tools..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </header>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTools.map((tool) => (
                  <button
                    key={tool.id}
                    onClick={() => handleSelectTool(tool.id)}
                    className="group relative flex flex-col items-start p-6 bg-surface border border-zinc-200 dark:border-zinc-800 rounded-xl hover:border-primary/50 hover:bg-surfaceHighlight transition-all duration-200 text-left hover:shadow-lg hover:shadow-primary/5"
                  >
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity z-10"
                         onClick={(e) => toggleFavorite(tool.id, e)}
                    >
                        <Star className={`w-5 h-5 ${favorites.includes(tool.id) ? 'text-yellow-500 fill-yellow-500' : 'text-zinc-400 hover:text-yellow-500'}`} />
                    </div>

                    <div className="p-3 rounded-lg bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 group-hover:border-primary/30 group-hover:text-primary text-zinc-500 dark:text-zinc-400 transition-colors mb-4">
                      <tool.icon className="w-6 h-6" />
                    </div>
                    <div className="flex items-center w-full justify-between">
                       <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-primary transition-colors">
                        {tool.name}
                      </h3>
                      {favorites.includes(tool.id) && <Star className="w-4 h-4 text-yellow-500 fill-yellow-500 group-hover:opacity-0" />}
                    </div>
                    
                    <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                      {tool.description}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          ) : (
             <div className="h-full max-w-7xl mx-auto">
               {activeTool?.component}
             </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
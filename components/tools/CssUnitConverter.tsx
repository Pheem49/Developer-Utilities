import React, { useState } from 'react';
import { ToolWrapper } from '../ToolWrapper';
import { Button } from '../ui/Button';
import { ArrowLeftRight, Trash2, Settings2 } from 'lucide-react';

export const CssUnitConverter: React.FC = () => {
  const [baseSize, setBaseSize] = useState(16);
  const [px, setPx] = useState<string>('16');
  const [rem, setRem] = useState<string>('1');

  const handlePxChange = (val: string) => {
    setPx(val);
    const num = parseFloat(val);
    if (!isNaN(num)) {
      setRem((num / baseSize).toFixed(4).replace(/\.?0+$/, ''));
    } else {
      setRem('');
    }
  };

  const handleRemChange = (val: string) => {
    setRem(val);
    const num = parseFloat(val);
    if (!isNaN(num)) {
      setPx((num * baseSize).toFixed(4).replace(/\.?0+$/, ''));
    } else {
      setPx('');
    }
  };

  const clear = () => {
    setPx('');
    setRem('');
  };

  return (
    <ToolWrapper 
      title="CSS Unit Converter" 
      description="Convert pixels to rems and vice versa based on root font size."
      actions={
        <Button variant="ghost" size="sm" onClick={clear} title="Clear">
           <Trash2 className="w-4 h-4" />
        </Button>
      }
    >
      <div className="max-w-xl mx-auto h-full flex flex-col justify-center">
        
        {/* Base Size Config */}
        <div className="mb-8 flex justify-center">
           <div className="bg-surfaceHighlight border border-zinc-700 rounded-full px-6 py-2 flex items-center gap-4">
              <Settings2 className="w-4 h-4 text-zinc-400" />
              <span className="text-sm text-zinc-400 font-medium">Root Font Size:</span>
              <div className="relative w-16">
                <input 
                  type="number"
                  value={baseSize}
                  onChange={(e) => setBaseSize(parseFloat(e.target.value) || 16)}
                  className="w-full bg-zinc-800 border-none rounded text-center text-zinc-200 text-sm font-bold focus:ring-1 focus:ring-primary py-1"
                />
                <span className="absolute right-1 top-1.5 text-[10px] text-zinc-500 pointer-events-none">px</span>
              </div>
           </div>
        </div>

        {/* Converter Cards */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr,auto,1fr] gap-4 items-center">
          
          {/* PX Input */}
          <div className="bg-surfaceHighlight border border-zinc-700 p-6 rounded-xl flex flex-col gap-2 relative group focus-within:border-primary focus-within:ring-1 focus-within:ring-primary/20 transition-all">
             <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Pixels</label>
             <input 
               type="text" 
               value={px}
               onChange={(e) => handlePxChange(e.target.value)}
               placeholder="16"
               className="bg-transparent text-3xl font-mono text-zinc-100 focus:outline-none placeholder-zinc-700 w-full"
             />
             <span className="absolute top-6 right-6 text-xl font-bold text-zinc-700 select-none">px</span>
          </div>

          {/* Icon */}
          <div className="flex justify-center text-zinc-500">
            <ArrowLeftRight className="w-6 h-6 rotate-90 md:rotate-0" />
          </div>

          {/* REM Input */}
          <div className="bg-surfaceHighlight border border-zinc-700 p-6 rounded-xl flex flex-col gap-2 relative group focus-within:border-primary focus-within:ring-1 focus-within:ring-primary/20 transition-all">
             <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider">REM</label>
             <input 
               type="text" 
               value={rem}
               onChange={(e) => handleRemChange(e.target.value)}
               placeholder="1"
               className="bg-transparent text-3xl font-mono text-zinc-100 focus:outline-none placeholder-zinc-700 w-full"
             />
             <span className="absolute top-6 right-6 text-xl font-bold text-zinc-700 select-none">rem</span>
          </div>

        </div>

        {/* Quick Reference */}
        <div className="mt-12">
          <h4 className="text-center text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-4">Common Breakpoints (Tailwind)</h4>
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 text-center">
             {[
               { px: 640, label: 'sm' },
               { px: 768, label: 'md' },
               { px: 1024, label: 'lg' },
               { px: 1280, label: 'xl' },
               { px: 1536, label: '2xl' },
             ].map((bp) => (
               <button 
                 key={bp.label} 
                 onClick={() => handlePxChange(bp.px.toString())}
                 className="p-2 bg-zinc-900/50 hover:bg-zinc-800 border border-zinc-800 rounded text-xs transition-colors"
               >
                 <div className="font-bold text-zinc-300">{bp.label}</div>
                 <div className="text-zinc-500">{bp.px}px</div>
               </button>
             ))}
          </div>
        </div>

      </div>
    </ToolWrapper>
  );
};
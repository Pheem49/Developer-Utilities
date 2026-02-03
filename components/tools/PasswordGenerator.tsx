import React, { useState, useEffect } from 'react';
import { ToolWrapper } from '../ToolWrapper';
import { Button } from '../ui/Button';
import { CopyButton } from '../ui/CopyButton';
import { RefreshCw, CheckSquare, Square, ShieldCheck, Keyboard } from 'lucide-react';

export const PasswordGenerator: React.FC = () => {
  const [length, setLength] = useState(16);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [password, setPassword] = useState('');
  const [strength, setStrength] = useState(0);

  const generatePassword = () => {
    let charset = '';
    if (includeLowercase) charset += 'abcdefghijklmnopqrstuvwxyz';
    if (includeUppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (includeNumbers) charset += '0123456789';
    if (includeSymbols) charset += '!@#$%^&*()_+~`|}{[]:;?><,./-=';

    // Fallback if nothing selected
    if (charset === '') charset = 'abcdefghijklmnopqrstuvwxyz';

    let retVal = '';
    // Ensure at least one of each selected type
    const mustInclude = [];
    if (includeLowercase) mustInclude.push('abcdefghijklmnopqrstuvwxyz');
    if (includeUppercase) mustInclude.push('ABCDEFGHIJKLMNOPQRSTUVWXYZ');
    if (includeNumbers) mustInclude.push('0123456789');
    if (includeSymbols) mustInclude.push('!@#$%^&*()_+~`|}{[]:;?><,./-=');

    if (mustInclude.length > 0) {
        for(let i=0; i<mustInclude.length; i++) {
             const set = mustInclude[i];
             retVal += set.charAt(Math.floor(Math.random() * set.length));
        }
    }

    // Fill the rest
    for (let i = 0, n = charset.length; i < length - mustInclude.length; ++i) {
      retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    
    // Shuffle
    retVal = retVal.split('').sort(() => 0.5 - Math.random()).join('');
    
    setPassword(retVal);
  };

  const calculateStrength = (pass: string) => {
    if (!pass) {
      setStrength(0);
      return;
    }
    let score = 0;
    if (pass.length > 8) score++;
    if (pass.length > 12) score++;
    if (/[A-Z]/.test(pass)) score++;
    if (/[0-9]/.test(pass)) score++;
    if (/[^A-Za-z0-9]/.test(pass)) score++;
    setStrength(score); // Max 5
  };

  // Recalculate strength whenever password changes (generated or typed)
  useEffect(() => {
    calculateStrength(password);
  }, [password]);

  // Initial generation on settings change
  useEffect(() => {
    generatePassword();
  }, [length, includeUppercase, includeLowercase, includeNumbers, includeSymbols]);

  const Checkbox = ({ label, checked, onChange }: { label: string, checked: boolean, onChange: (v: boolean) => void }) => (
    <div 
      onClick={() => onChange(!checked)}
      className="flex items-center gap-3 p-3 rounded-lg border border-zinc-700 bg-zinc-800/30 cursor-pointer hover:bg-zinc-800/80 transition-colors select-none"
    >
      {checked ? <CheckSquare className="w-5 h-5 text-primary" /> : <Square className="w-5 h-5 text-zinc-500" />}
      <span className="text-sm font-medium text-zinc-300">{label}</span>
    </div>
  );

  return (
    <ToolWrapper 
      title="Password Generator" 
      description="Generate strong, random passwords or test your own strength."
      actions={
        <Button variant="ghost" size="sm" onClick={generatePassword} title="Regenerate">
           <RefreshCw className="w-4 h-4" />
        </Button>
      }
    >
      <div className="max-w-2xl mx-auto space-y-8 mt-4">
        
        {/* Output/Input Display */}
        <div className="relative group">
          <div className="bg-surfaceHighlight border border-zinc-700 rounded-xl p-6 text-center shadow-inner focus-within:border-primary focus-within:ring-1 focus-within:ring-primary/30 transition-all">
             <div className="min-h-[3rem] flex items-center justify-center">
               <input 
                  type="text" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Type or generate..."
                  className="w-full bg-transparent text-center text-2xl md:text-3xl font-mono text-zinc-900 dark:text-white tracking-wide focus:outline-none placeholder-zinc-400 dark:placeholder-zinc-600"
                  spellCheck={false}
               />
             </div>
          </div>
          <div className="absolute top-1/2 -translate-y-1/2 right-4 hidden sm:block">
            <CopyButton text={password} />
          </div>
          
          {/* Strength Meter */}
          <div className="flex gap-1 mt-2 px-1">
             {[1,2,3,4,5].map(s => (
               <div key={s} className={`h-1.5 flex-1 rounded-full transition-colors duration-500 ${strength >= s ? (strength < 3 ? 'bg-red-500' : strength < 5 ? 'bg-yellow-500' : 'bg-emerald-500') : 'bg-zinc-300 dark:bg-zinc-800'}`} />
             ))}
          </div>
          <div className="flex justify-between items-center mt-1 px-1">
             <div className="text-xs text-zinc-500 flex items-center gap-1">
                <Keyboard className="w-3 h-3" />
                <span>Editable</span>
             </div>
             <div className="text-xs text-zinc-500 uppercase font-bold tracking-wider">
               {strength === 0 ? 'Enter Password' : strength < 3 ? 'Weak' : strength < 5 ? 'Good' : 'Strong'}
             </div>
          </div>
        </div>

        {/* Controls */}
        <div className="space-y-6 bg-surfaceHighlight/50 border border-zinc-700/50 p-6 rounded-xl relative">
           {/* Visual cue that controls affect generation */}
           <div className="absolute -top-3 left-4 bg-surfaceHighlight px-2 text-xs font-semibold text-primary">Generator Settings</div>
           
           <div className="space-y-3">
              <div className="flex justify-between items-center text-sm font-medium text-zinc-400">
                <span>Password Length</span>
                <span className="text-primary">{length}</span>
              </div>
              <input 
                type="range" 
                min="6" 
                max="64" 
                value={length} 
                onChange={(e) => setLength(parseInt(e.target.value))}
                className="w-full accent-primary h-2 bg-zinc-700 rounded-lg appearance-none cursor-pointer"
              />
           </div>

           <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Checkbox label="Uppercase (A-Z)" checked={includeUppercase} onChange={setIncludeUppercase} />
              <Checkbox label="Lowercase (a-z)" checked={includeLowercase} onChange={setIncludeLowercase} />
              <Checkbox label="Numbers (0-9)" checked={includeNumbers} onChange={setIncludeNumbers} />
              <Checkbox label="Symbols (!@#$)" checked={includeSymbols} onChange={setIncludeSymbols} />
           </div>
        </div>

        <div className="flex items-center justify-center gap-2 text-xs text-zinc-500">
          <ShieldCheck className="w-4 h-4 text-emerald-500" />
          Check runs locally. This password never leaves your browser.
        </div>
      </div>
    </ToolWrapper>
  );
};
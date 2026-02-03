import React, { useState } from 'react';
import { ToolWrapper } from '../ToolWrapper';
import { Button } from '../ui/Button';
import { CopyButton } from '../ui/CopyButton';
import { ArrowLeftRight, Trash2 } from 'lucide-react';

export const Base64Converter: React.FC = () => {
  const [utf8, setUtf8] = useState('');
  const [base64, setBase64] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleUtf8Change = (val: string) => {
    setUtf8(val);
    setError(null);
    try {
      setBase64(btoa(val));
    } catch (e) {
      // Handle characters outside Latin1 range if needed, for simplicity using basic btoa
      try {
        setBase64(btoa(unescape(encodeURIComponent(val))));
      } catch (err) {
        setError("Unable to encode text.");
      }
    }
  };

  const handleBase64Change = (val: string) => {
    setBase64(val);
    setError(null);
    try {
      setUtf8(decodeURIComponent(escape(atob(val))));
    } catch (e) {
      setError("Invalid Base64 string.");
    }
  };

  const clearAll = () => {
    setUtf8('');
    setBase64('');
    setError(null);
  };

  return (
    <ToolWrapper 
      title="Base64 Converter" 
      description="Encode and decode text to and from Base64 format."
      actions={
         <Button variant="ghost" size="sm" onClick={clearAll} title="Clear">
          <Trash2 className="w-4 h-4" />
        </Button>
      }
    >
      <div className="flex flex-col gap-6 h-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 flex-1">
          <div className="flex flex-col h-full">
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Text (UTF-8)</label>
              <CopyButton text={utf8} />
            </div>
            <textarea
              value={utf8}
              onChange={(e) => handleUtf8Change(e.target.value)}
              placeholder="Type plain text here..."
              className="flex-1 w-full bg-surfaceHighlight border border-zinc-700 rounded-md p-4 font-mono text-sm text-zinc-300 focus:outline-none focus:border-primary resize-none placeholder:text-zinc-600"
              spellCheck={false}
            />
          </div>

          <div className="flex flex-col h-full">
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Base64</label>
              <CopyButton text={base64} />
            </div>
            <textarea
              value={base64}
              onChange={(e) => handleBase64Change(e.target.value)}
              placeholder="Type Base64 here..."
              className={`flex-1 w-full bg-surfaceHighlight border rounded-md p-4 font-mono text-sm text-zinc-300 focus:outline-none focus:border-primary resize-none placeholder:text-zinc-600 ${
                error ? 'border-red-900/50' : 'border-zinc-700'
              }`}
              spellCheck={false}
            />
            {error && <p className="text-red-400 text-xs mt-2">{error}</p>}
          </div>
        </div>
      </div>
    </ToolWrapper>
  );
};
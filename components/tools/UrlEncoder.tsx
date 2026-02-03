import React, { useState } from 'react';
import { ToolWrapper } from '../ToolWrapper';
import { Button } from '../ui/Button';
import { CopyButton } from '../ui/CopyButton';
import { Trash2 } from 'lucide-react';

export const UrlEncoder: React.FC = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const handleEncode = () => setOutput(encodeURIComponent(input));
  const handleDecode = () => {
    try {
      setOutput(decodeURIComponent(input));
    } catch (e) {
      setOutput('Error: Malformed URI');
    }
  };

  return (
    <ToolWrapper 
      title="URL Encode/Decode" 
      description="Encode or decode URL components."
      actions={
        <Button variant="ghost" size="sm" onClick={() => { setInput(''); setOutput(''); }} title="Clear">
           <Trash2 className="w-4 h-4" />
        </Button>
      }
    >
      <div className="flex flex-col gap-6 h-full max-w-4xl mx-auto">
        <div className="space-y-2">
          <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Input</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full h-32 bg-surfaceHighlight border border-zinc-700 rounded-md p-4 font-mono text-sm text-zinc-300 focus:outline-none focus:border-primary resize-none"
            placeholder="Enter URL text here..."
          />
        </div>

        <div className="flex gap-4 justify-center">
          <Button onClick={handleEncode} className="w-32">Encode</Button>
          <Button variant="secondary" onClick={handleDecode} className="w-32">Decode</Button>
        </div>

        <div className="space-y-2 flex-1">
          <div className="flex justify-between items-center">
            <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Result</label>
            <CopyButton text={output} />
          </div>
          <textarea
            readOnly
            value={output}
            className="w-full h-32 bg-surfaceHighlight/50 border border-zinc-700 rounded-md p-4 font-mono text-sm text-primary focus:outline-none resize-none"
            placeholder="Result will appear here..."
          />
        </div>
      </div>
    </ToolWrapper>
  );
};
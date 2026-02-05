import React, { useState, useEffect } from 'react';
import { ToolWrapper } from '../ToolWrapper';
import { Button } from '../ui/Button';
import { CopyButton } from '../ui/CopyButton';
import { Trash2, AlertCircle, FileJson } from 'lucide-react';

const SAMPLE_JSON = `{
  "projectName": "DevToolsHub",
  "version": 1.0,
  "features": [
    "JSON Formatter",
    "Base64 Converter",
    "UUID Generator"
  ],
  "isPublic": true,
  "config": {
    "theme": "dark",
    "retries": 3
  },
  "maintainer": null
}`;

const MAX_INPUT_SIZE = 1000000; // 1MB for client performance safety

export const JsonFormatter: React.FC = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [space, setSpace] = useState(2);
  const [isTyping, setIsTyping] = useState(false);

  // Debounce logic for parsing
  useEffect(() => {
    setIsTyping(true);
    const timer = setTimeout(() => {
      setIsTyping(false);

      if (!input.trim()) {
        setOutput('');
        setError(null);
        return;
      }

      if (input.length > MAX_INPUT_SIZE) {
        setError(`Input exceeds maximum size of 1MB (${(input.length / 1000000).toFixed(2)}MB).`);
        return;
      }

      try {
        const parsed = JSON.parse(input);
        setOutput(JSON.stringify(parsed, null, space));
        setError(null);
      } catch (e) {
        // Only set error if we are done typing to avoid flashing red while typing
        setError((e as Error).message);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [input, space]);

  const handleMinify = () => setSpace(0);
  const handlePrettify = () => setSpace(2);
  const loadSample = () => setInput(SAMPLE_JSON);

  return (
    <ToolWrapper
      title="JSON Formatter"
      description="Format, validate, minify, and explore JSON data with error highlighting."
      actions={
        <>
          <Button variant="ghost" size="sm" onClick={loadSample} title="Load Sample">
            <FileJson className="w-4 h-4 mr-2" />
            Sample
          </Button>
          <Button variant="ghost" size="sm" onClick={() => setInput('')} title="Clear">
            <Trash2 className="w-4 h-4" />
          </Button>
        </>
      }
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-full">
        <div className="flex flex-col h-full">
          <label className="text-xs font-semibold text-zinc-400 mb-2 uppercase tracking-wider flex justify-between">
            <span>Input</span>
            <span className={`text-[10px] ${input.length > MAX_INPUT_SIZE ? 'text-red-400' : 'text-zinc-600'}`}>
              {input.length} / {MAX_INPUT_SIZE} chars
            </span>
          </label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste your JSON here..."
            className="flex-1 w-full bg-surfaceHighlight border border-zinc-700 rounded-md p-4 font-mono text-sm text-zinc-300 focus:outline-none focus:border-primary resize-none placeholder:text-zinc-600"
            spellCheck={false}
          />
        </div>

        <div className="flex flex-col h-full">
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center gap-2">
              <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Output</label>
              {isTyping && <span className="text-[10px] text-primary animate-pulse">Processing...</span>}
            </div>
            <div className="flex gap-2">
              <Button variant="secondary" size="sm" onClick={handleMinify} className={`text-xs h-7 ${space === 0 ? 'border-primary text-primary' : ''}`}>Minify</Button>
              <Button variant="secondary" size="sm" onClick={handlePrettify} className={`text-xs h-7 ${space === 2 ? 'border-primary text-primary' : ''}`}>Prettify</Button>
              <CopyButton text={output} />
            </div>
          </div>

          <div className={`flex-1 w-full rounded-md border p-4 overflow-auto font-mono text-sm relative transition-colors duration-200 ${error
              ? 'bg-red-950/10 border-red-900/50'
              : 'bg-surfaceHighlight border-zinc-700'
            }`}>
            {error ? (
              <div className="flex items-start gap-3 text-red-400">
                <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                <div className="flex-1">
                  <div className="font-bold mb-1">Invalid JSON</div>
                  <div className="whitespace-pre-wrap opacity-90">{error}</div>
                </div>
              </div>
            ) : (
              <pre className="text-primary">{output}</pre>
            )}
          </div>
        </div>
      </div>
    </ToolWrapper>
  );
};
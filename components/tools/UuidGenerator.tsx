import React, { useState } from 'react';
import { ToolWrapper } from '../ToolWrapper';
import { Button } from '../ui/Button';
import { CopyButton } from '../ui/CopyButton';
import { RefreshCw, Trash2 } from 'lucide-react';

export const UuidGenerator: React.FC = () => {
  const [uuids, setUuids] = useState<string[]>([]);
  const [count, setCount] = useState(5);
  const [version, setVersion] = useState(4); // Only mocking UI for V4 mostly

  const generateUuid = () => {
    // Native randomUUID is widely supported in modern browsers
    try {
      return crypto.randomUUID();
    } catch (e) {
      // Fallback for older envs
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
      });
    }
  };

  const generateBatch = () => {
    const newUuids = Array.from({ length: count }, () => generateUuid());
    setUuids(newUuids);
  };

  const clear = () => setUuids([]);

  // Generate on mount (optional, or just wait for user)
  // useEffect(() => { generateBatch() }, []);

  return (
    <ToolWrapper
      title="UUID Generator"
      description="Generate cryptographically secure Version 4 Universally Unique Identifiers (UUIDs)."
      actions={
        <Button variant="ghost" size="sm" onClick={clear} title="Clear">
          <Trash2 className="w-4 h-4" />
        </Button>
      }
    >
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="bg-surfaceHighlight border border-zinc-700 p-4 rounded-lg flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <label className="text-sm text-zinc-400">Count:</label>
            <input
              type="number"
              min="1"
              max="50"
              value={count}
              onChange={(e) => setCount(Math.min(50, Math.max(1, parseInt(e.target.value) || 1)))}
              className="bg-background border border-zinc-700 rounded px-2 py-1 text-sm w-20 text-center focus:border-primary focus:outline-none"
            />
          </div>

          <Button onClick={generateBatch} className="gap-2">
            <RefreshCw className="w-4 h-4" />
            Generate
          </Button>
        </div>

        {uuids.length > 0 && (
          <div className="bg-surfaceHighlight border border-zinc-700 rounded-lg overflow-hidden">
            <div className="flex justify-between items-center p-3 border-b border-zinc-700 bg-zinc-900/50">
              <span className="text-xs font-mono text-zinc-500">{uuids.length} UUIDS GENERATED</span>
              <Button variant="ghost" size="sm" onClick={() => navigator.clipboard.writeText(uuids.join('\n'))}>
                Copy All
              </Button>
            </div>
            <div className="divide-y divide-zinc-800">
              {uuids.map((uuid, idx) => (
                <div key={`${uuid}-${idx}`} className="flex items-center justify-between p-3 hover:bg-zinc-800/50 transition-colors group">
                  <span className="font-mono text-primary text-base sm:text-lg">{uuid}</span>
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                    <CopyButton text={uuid} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </ToolWrapper>
  );
};
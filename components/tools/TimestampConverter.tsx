import React, { useState, useEffect } from 'react';
import { ToolWrapper } from '../ToolWrapper';
import { Button } from '../ui/Button';
import { CopyButton } from '../ui/CopyButton';
import { Clock, RefreshCw } from 'lucide-react';

export const TimestampConverter: React.FC = () => {
  const [now, setNow] = useState(Math.floor(Date.now() / 1000));
  const [input, setInput] = useState<string>('');
  const [result, setResult] = useState<Date | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(Math.floor(Date.now() / 1000));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleConvert = (val: string) => {
    setInput(val);
    if (!val) {
      setResult(null);
      return;
    }

    // Try parsing as timestamp (seconds or ms)
    if (/^\d+$/.test(val)) {
      const num = parseInt(val);
      // Guess if seconds or milliseconds based on reasonable year range
      // If num is small (e.g. year 2000 in sec is ~946684800, 10 digits)
      // If num is ms, it's 13 digits.
      if (val.length <= 10) {
        setResult(new Date(num * 1000));
      } else {
        setResult(new Date(num));
      }
    } else {
      // Try parsing as ISO string
      const date = new Date(val);
      if (!isNaN(date.getTime())) {
        setResult(date);
      } else {
        setResult(null);
      }
    }
  };

  const handleReset = () => {
    setInput('');
    setResult(null);
  };

  const formats = result ? [
    { label: 'Unix Timestamp (Seconds)', value: Math.floor(result.getTime() / 1000).toString() },
    { label: 'Unix Timestamp (Milliseconds)', value: result.getTime().toString() },
    { label: 'ISO 8601', value: result.toISOString() },
    { label: 'UTC String', value: result.toUTCString() },
    { label: 'Local String', value: result.toString() },
    { label: 'Locale Date', value: result.toLocaleDateString() },
    { label: 'Locale Time', value: result.toLocaleTimeString() },
  ] : [];

  return (
    <ToolWrapper
      title="Timestamp Converter"
      description="Convert between Unix timestamps (seconds/millis) and human-readable dates."
      actions={
        <Button variant="ghost" size="sm" onClick={handleReset} title="Reset">
          <RefreshCw className="w-4 h-4" />
        </Button>
      }
    >
      <div className="max-w-3xl mx-auto space-y-8">

        {/* Current Time Hero */}
        <div className="bg-gradient-to-r from-zinc-100 to-zinc-200 dark:from-zinc-900 dark:to-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl p-6 text-center relative overflow-hidden group">
          <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
          <h3 className="text-zinc-500 dark:text-zinc-400 text-sm font-medium uppercase tracking-widest mb-2">Current Unix Timestamp</h3>
          <div className="text-5xl md:text-6xl font-mono text-primary font-bold tracking-tighter tabular-nums flex justify-center items-center gap-4">
            {now}
            <CopyButton text={now.toString()} />
          </div>
        </div>

        {/* Converter Input */}
        <div className="space-y-4">
          <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">Convert Date or Timestamp</label>
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => handleConvert(e.target.value)}
              placeholder="e.g. 1678900000 or 2023-01-01"
              className="flex-1 bg-surfaceHighlight border border-zinc-300 dark:border-zinc-700 rounded-md px-4 py-3 font-mono text-zinc-900 dark:text-zinc-200 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all placeholder:text-zinc-500"
            />
          </div>
          <div className="flex gap-2 text-xs text-zinc-500">
            <button onClick={() => handleConvert(now.toString())} className="hover:text-primary underline">Use Current</button>
            <span>|</span>
            <button onClick={() => handleConvert("1970-01-01")} className="hover:text-primary underline">Epoch</button>
          </div>
        </div>

        {/* Results */}
        {result && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-in slide-in-from-bottom-2">
            {formats.map((fmt) => (
              <div key={fmt.label} className="bg-surfaceHighlight border border-zinc-200 dark:border-zinc-800 rounded-lg p-3 hover:border-zinc-400 dark:hover:border-zinc-600 transition-colors">
                <div className="text-xs text-zinc-500 uppercase tracking-wider mb-1">{fmt.label}</div>
                <div className="flex justify-between items-center gap-2">
                  <span className="font-mono text-zinc-900 dark:text-zinc-200 text-sm truncate">{fmt.value}</span>
                  <CopyButton text={fmt.value} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </ToolWrapper>
  );
};
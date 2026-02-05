import React, { useState, useMemo } from 'react';
import { ToolWrapper } from '../ToolWrapper';
import { AlertCircle, Trash2 } from 'lucide-react';
import { Button } from '../ui/Button';

export const RegexTester: React.FC = () => {
  const [regexStr, setRegexStr] = useState('');
  const [flags, setFlags] = useState('gm');
  const [testString, setTestString] = useState('');

  const result = useMemo(() => {
    if (!regexStr) return null;
    try {
      const regex = new RegExp(regexStr, flags);
      const matches = [];
      let match;

      // Prevent infinite loops with global flag if regex matches empty string
      if (regex.global) {
        // Limit iterations to prevent browser crash on bad regex
        let i = 0;
        while ((match = regex.exec(testString)) !== null && i < 1000) {
          matches.push({
            index: match.index,
            text: match[0],
            groups: match.slice(1)
          });
          if (match.index === regex.lastIndex) regex.lastIndex++;
          i++;
        }
      } else {
        match = regex.exec(testString);
        if (match) {
          matches.push({
            index: match.index,
            text: match[0],
            groups: match.slice(1)
          });
        }
      }

      return { valid: true, matches };
    } catch (e) {
      return { valid: false, error: (e as Error).message };
    }
  }, [regexStr, flags, testString]);

  // Highlighting logic (simple implementation)
  const renderHighlightedText = () => {
    if (!result?.valid || !result.matches || result.matches.length === 0) {
      return <span className="text-zinc-400 dark:text-zinc-500">{testString}</span>;
    }

    const elements = [];
    let lastIndex = 0;

    result.matches.forEach((match, i) => {
      // Text before match
      if (match.index > lastIndex) {
        elements.push(
          <span key={`pre-${i}`}>{testString.substring(lastIndex, match.index)}</span>
        );
      }
      // Match text
      elements.push(
        <span key={`match-${i}`} className="bg-primary/30 text-zinc-900 dark:text-primary-200 border-b-2 border-primary rounded-sm relative group cursor-help">
          {match.text}
          <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 px-2 py-1 bg-black border border-zinc-700 text-xs text-white rounded opacity-0 group-hover:opacity-100 whitespace-nowrap z-10 pointer-events-none">
            Match {i + 1}
          </span>
        </span>
      );
      lastIndex = match.index + match.text.length;
    });

    // Remaining text
    if (lastIndex < testString.length) {
      elements.push(
        <span key="post">{testString.substring(lastIndex)}</span>
      );
    }

    return elements;
  };

  const clearAll = () => {
    setRegexStr('');
    setTestString('');
  };

  return (
    <ToolWrapper
      title="Regex Tester"
      description="Test and validate regular expressions against text strings in real-time."
      actions={
        <Button variant="ghost" size="sm" onClick={clearAll} title="Clear">
          <Trash2 className="w-4 h-4" />
        </Button>
      }
    >
      <div className="flex flex-col gap-6 h-full">
        {/* Regex Input */}
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 font-mono text-lg">/</div>
            <input
              type="text"
              value={regexStr}
              onChange={e => setRegexStr(e.target.value)}
              placeholder="Expression (e.g. [a-z0-9]+)"
              className={`w-full bg-surfaceHighlight border rounded-md py-2 pl-6 pr-4 font-mono text-zinc-900 dark:text-zinc-200 focus:outline-none focus:ring-1 ${result && !result.valid ? 'border-red-500 focus:border-red-500' : 'border-zinc-300 dark:border-zinc-700 focus:border-primary'
                }`}
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 font-mono text-lg">/</div>
          </div>
          <input
            type="text"
            value={flags}
            onChange={e => setFlags(e.target.value)}
            placeholder="flags"
            className="w-20 bg-surfaceHighlight border border-zinc-300 dark:border-zinc-700 rounded-md px-3 py-2 font-mono text-zinc-500 dark:text-zinc-400 focus:outline-none focus:border-primary text-center"
          />
        </div>

        {result && !result.valid && (
          <div className="flex items-center gap-2 text-red-500 dark:text-red-400 text-sm bg-red-100 dark:bg-red-950/20 p-2 rounded border border-red-200 dark:border-red-900/50">
            <AlertCircle className="w-4 h-4" />
            {result.error}
          </div>
        )}

        {/* Test String and Highlights */}
        <div className="flex-1 flex flex-col min-h-0 border border-zinc-300 dark:border-zinc-700 rounded-md bg-surfaceHighlight relative">
          <div className="p-2 border-b border-zinc-300 dark:border-zinc-700 text-xs font-semibold text-zinc-500 uppercase tracking-wider flex justify-between">
            <span>Test String</span>
            {result?.valid && <span>{result.matches.length} Matches</span>}
          </div>
          <div className="relative flex-1 min-h-[300px] overflow-auto">
            {/* Backdrop for highlights */}
            <div className="absolute inset-0 p-4 font-mono text-sm whitespace-pre-wrap break-all pointer-events-none text-transparent z-0">
              {renderHighlightedText()}
            </div>
            {/* Transparent Textarea for input */}
            <textarea
              value={testString}
              onChange={e => setTestString(e.target.value)}
              placeholder="Paste test text here..."
              className="absolute inset-0 w-full h-full p-4 font-mono text-sm bg-transparent text-zinc-900 dark:text-zinc-300 focus:outline-none resize-none z-10 placeholder:text-zinc-400 dark:placeholder-text-zinc-600"
              spellCheck={false}
            />
          </div>
        </div>
      </div>
    </ToolWrapper>
  );
};
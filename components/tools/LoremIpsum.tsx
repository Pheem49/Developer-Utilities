import React, { useState, useEffect } from 'react';
import { ToolWrapper } from '../ToolWrapper';
import { Button } from '../ui/Button';
import { CopyButton } from '../ui/CopyButton';
import { RefreshCw, Type } from 'lucide-react';

const WORDS = [
  "lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "adipiscing", "elit", 
  "sed", "do", "eiusmod", "tempor", "incididunt", "ut", "labore", "et", "dolore", 
  "magna", "aliqua", "ut", "enim", "ad", "minim", "veniam", "quis", "nostrud", 
  "exercitation", "ullamco", "laboris", "nisi", "ut", "aliquip", "ex", "ea", 
  "commodo", "consequat", "duis", "aute", "irure", "dolor", "in", "reprehenderit", 
  "in", "voluptate", "velit", "esse", "cillum", "dolore", "eu", "fugiat", "nulla", 
  "pariatur", "excepteur", "sint", "occaecat", "cupidatat", "non", "proident", 
  "sunt", "in", "culpa", "qui", "officia", "deserunt", "mollit", "anim", "id", 
  "est", "laborum"
];

export const LoremIpsum: React.FC = () => {
  const [paragraphs, setParagraphs] = useState(3);
  const [length, setLength] = useState<'short' | 'medium' | 'long'>('medium');
  const [text, setText] = useState('');

  const generate = () => {
    const result = [];
    const minWords = length === 'short' ? 20 : length === 'medium' ? 50 : 100;
    const maxWords = length === 'short' ? 40 : length === 'medium' ? 80 : 150;

    for (let i = 0; i < paragraphs; i++) {
      // First paragraph usually starts with standard text
      let paragraphWords = [];
      if (i === 0) {
        paragraphWords = ["Lorem", "ipsum", "dolor", "sit", "amet,", "consectetur", "adipiscing", "elit."];
      }

      const count = Math.floor(Math.random() * (maxWords - minWords + 1)) + minWords;
      
      while (paragraphWords.length < count) {
        const word = WORDS[Math.floor(Math.random() * WORDS.length)];
        // Randomly capitalize or add punctuation
        if (Math.random() > 0.9) paragraphWords.push(word + ",");
        else if (Math.random() > 0.95) paragraphWords.push(word + ".");
        else paragraphWords.push(word);
      }
      
      // Ensure paragraph ends with a dot
      let pStr = paragraphWords.join(' ');
      if (pStr.endsWith(',')) pStr = pStr.slice(0, -1);
      if (!pStr.endsWith('.')) pStr += '.';
      
      // Capitalize sentences
      pStr = pStr.replace(/(^\w|\.\s+\w)/g, letter => letter.toUpperCase());

      result.push(pStr);
    }
    setText(result.join('\n\n'));
  };

  useEffect(() => {
    generate();
  }, [paragraphs, length]);

  return (
    <ToolWrapper 
      title="Lorem Ipsum Generator" 
      description="Generate placeholder text for layouts and mockups."
      actions={
        <Button variant="ghost" size="sm" onClick={generate} title="Regenerate">
           <RefreshCw className="w-4 h-4" />
        </Button>
      }
    >
      <div className="flex flex-col gap-6 h-full max-w-4xl mx-auto">
        {/* Controls */}
        <div className="bg-surfaceHighlight border border-zinc-700 p-4 rounded-lg flex flex-wrap items-center gap-6">
          <div className="flex items-center gap-3">
             <label className="text-sm font-medium text-zinc-400">Paragraphs:</label>
             <div className="flex items-center gap-2">
                <input 
                  type="range" 
                  min="1" 
                  max="20" 
                  value={paragraphs} 
                  onChange={(e) => setParagraphs(parseInt(e.target.value))}
                  className="w-32 accent-primary"
                />
                <span className="w-8 text-center font-mono text-zinc-200">{paragraphs}</span>
             </div>
          </div>

          <div className="flex items-center gap-3">
             <label className="text-sm font-medium text-zinc-400">Length:</label>
             <div className="flex bg-zinc-800 rounded-md p-1">
               {(['short', 'medium', 'long'] as const).map((l) => (
                 <button
                   key={l}
                   onClick={() => setLength(l)}
                   className={`px-3 py-1 text-xs rounded transition-colors uppercase font-bold tracking-wider ${
                     length === l 
                       ? 'bg-primary text-white shadow-sm' 
                       : 'text-zinc-500 hover:text-zinc-300'
                   }`}
                 >
                   {l}
                 </button>
               ))}
             </div>
          </div>
        </div>

        {/* Output */}
        <div className="flex-1 flex flex-col min-h-0 relative group">
           <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
              <CopyButton text={text} />
           </div>
           <textarea
             readOnly
             value={text}
             className="w-full h-full bg-surfaceHighlight border border-zinc-700 rounded-md p-6 font-serif text-lg leading-relaxed text-zinc-300 focus:outline-none focus:border-primary resize-none"
           />
        </div>
      </div>
    </ToolWrapper>
  );
};
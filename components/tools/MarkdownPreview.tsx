import React, { useState, useEffect } from 'react';
import { marked } from 'marked';
import { ToolWrapper } from '../ToolWrapper';
import { Button } from '../ui/Button';
import { Trash2 } from 'lucide-react';

export const MarkdownPreview: React.FC = () => {
  const [markdown, setMarkdown] = useState(`# Hello Dev Tools Hub

This is a **markdown preview** tool.

- Write valid markdown
- See changes instantly
- Fast and secure

\`\`\`javascript
console.log('Code blocks supported');
\`\`\`

> "Simplicity is the soul of efficiency."
  `);

  const [html, setHtml] = useState('');

  useEffect(() => {
    try {
      const parsed = marked.parse(markdown) as string;
      setHtml(parsed);
    } catch (e) {
      console.error('Markdown parse error', e);
    }
  }, [markdown]);

  return (
    <ToolWrapper 
      title="Markdown Preview" 
      description="Real-time Markdown editor and previewer."
      actions={
        <Button variant="ghost" size="sm" onClick={() => setMarkdown('')} title="Clear">
           <Trash2 className="w-4 h-4" />
        </Button>
      }
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-full">
        <div className="flex flex-col h-full">
           <div className="bg-zinc-100 dark:bg-zinc-800/50 px-3 py-2 border-t border-x border-zinc-300 dark:border-zinc-700 rounded-t-md text-xs text-zinc-500 dark:text-zinc-400 font-semibold uppercase">Editor</div>
           <textarea 
             value={markdown}
             onChange={e => setMarkdown(e.target.value)}
             className="flex-1 w-full bg-surfaceHighlight border-b border-x border-zinc-300 dark:border-zinc-700 rounded-b-md p-4 font-mono text-sm text-zinc-900 dark:text-zinc-300 focus:outline-none focus:border-primary resize-none placeholder:text-zinc-400"
             placeholder="# Type markdown here..."
           />
        </div>
        
        <div className="flex flex-col h-full min-h-[300px]">
           <div className="bg-zinc-100 dark:bg-zinc-800/50 px-3 py-2 border-t border-x border-zinc-300 dark:border-zinc-700 rounded-t-md text-xs text-zinc-500 dark:text-zinc-400 font-semibold uppercase">Preview</div>
           <div 
             className="flex-1 w-full bg-white dark:bg-black/20 border-b border-x border-zinc-300 dark:border-zinc-700 rounded-b-md p-6 overflow-auto prose dark:prose-invert prose-sm max-w-none text-zinc-900 dark:text-zinc-100"
             dangerouslySetInnerHTML={{ __html: html }}
           />
        </div>
      </div>
    </ToolWrapper>
  );
};
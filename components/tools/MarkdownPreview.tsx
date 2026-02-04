import React, { useState, useEffect, useRef } from 'react';
import { marked } from 'marked';
import { ToolWrapper } from '../ToolWrapper';
import { Button } from '../ui/Button';
import {
  Trash2, Bold, Italic, Strikethrough, Heading1, Heading2, Heading3,
  List, ListOrdered, CheckSquare, Link, Image, Quote, Code, Table,
  Split, Eye, Edit3
} from 'lucide-react';

export const MarkdownPreview: React.FC = () => {
  const [markdown, setMarkdown] = useState(`# Hello Dev Tools Hub

This is a **markdown preview** tool.

## Features
- Full toolbar support
- Real-time preview
- GitHub flavored styling

### Code Example
\`\`\`javascript
const greeting = "Hello World";
console.log(greeting);
\`\`\`

> "Simplicity is the soul of efficiency."

| Feature | Status |
| :--- | :--- |
| Toolbar | ✅ Ready |
| Preview | ✅ Ready |
`);

  const [html, setHtml] = useState('');
  const [viewMode, setViewMode] = useState<'split' | 'edit' | 'preview'>('split');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    try {
      const parsed = marked.parse(markdown) as string;
      setHtml(parsed);
    } catch (e) {
      console.error('Markdown parse error', e);
    }
  }, [markdown]);

  const insertAtCursor = (before: string, after: string = '') => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;
    const selectedText = text.substring(start, end);
    const replacement = before + selectedText + after;

    const newText = text.substring(0, start) + replacement + text.substring(end);
    setMarkdown(newText);

    // Restore cursor position and selection
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + before.length, end + before.length);
    }, 0);
  };

  const toolbarItems = [
    { icon: Bold, label: 'Bold', action: () => insertAtCursor('**', '**') },
    { icon: Italic, label: 'Italic', action: () => insertAtCursor('_', '_') },
    { icon: Strikethrough, label: 'Strikethrough', action: () => insertAtCursor('~~', '~~') },
    { type: 'separator' },
    { icon: Heading1, label: 'H1', action: () => insertAtCursor('# ') },
    { icon: Heading2, label: 'H2', action: () => insertAtCursor('## ') },
    { icon: Heading3, label: 'H3', action: () => insertAtCursor('### ') },
    { type: 'separator' },
    { icon: List, label: 'Bullet List', action: () => insertAtCursor('- ') },
    { icon: ListOrdered, label: 'Ordered List', action: () => insertAtCursor('1. ') },
    { icon: CheckSquare, label: 'Task List', action: () => insertAtCursor('- [ ] ') },
    { type: 'separator' },
    { icon: Link, label: 'Link', action: () => insertAtCursor('[', '](url)') },
    { icon: Image, label: 'Image', action: () => insertAtCursor('![alt text](', ')') },
    { icon: Quote, label: 'Blockquote', action: () => insertAtCursor('> ') },
    { icon: Code, label: 'Code Block', action: () => insertAtCursor('```\n', '\n```') },
    { icon: Table, label: 'Table', action: () => insertAtCursor('| Header 1 | Header 2 |\n| :--- | :--- |\n| Row 1 | Row 1 |\n| Row 2 | Row 2 |') },
  ];

  return (
    <ToolWrapper
      title="Markdown Preview"
      description="Real-time Markdown editor with formatting toolbar."
      actions={
        <div className="flex gap-2">
          <div className="hidden md:flex bg-zinc-100 dark:bg-zinc-800 rounded-lg p-1 mr-2">
            <button
              onClick={() => setViewMode('edit')}
              className={`p-1.5 rounded-md transition-all ${viewMode === 'edit' ? 'bg-white dark:bg-zinc-600 shadow-sm text-primary' : 'text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300'}`}
              title="Editor Only"
            >
              <Edit3 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('split')}
              className={`p-1.5 rounded-md transition-all ${viewMode === 'split' ? 'bg-white dark:bg-zinc-600 shadow-sm text-primary' : 'text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300'}`}
              title="Split View"
            >
              <Split className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('preview')}
              className={`p-1.5 rounded-md transition-all ${viewMode === 'preview' ? 'bg-white dark:bg-zinc-600 shadow-sm text-primary' : 'text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300'}`}
              title="Preview Only"
            >
              <Eye className="w-4 h-4" />
            </button>
          </div>
          <Button variant="ghost" size="sm" onClick={() => setMarkdown('')} title="Clear All">
            <Trash2 className="w-4 h-4 text-red-500" />
          </Button>
        </div>
      }
    >
      <div className="flex flex-col h-[calc(100vh-250px)] min-h-[500px] border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden shadow-sm bg-white dark:bg-zinc-900">

        {/* Toolbar */}
        {(viewMode === 'split' || viewMode === 'edit') && (
          <div className="flex flex-wrap items-center gap-1 p-2 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 overflow-x-auto">
            {toolbarItems.map((item, index) => (
              item.type === 'separator' ? (
                <div key={index} className="w-px h-6 bg-zinc-300 dark:bg-zinc-700 mx-1" />
              ) : (
                <button
                  key={index}
                  onClick={item.action}
                  className="p-1.5 rounded hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-600 dark:text-zinc-400 hover:text-primary transition-colors"
                  title={item.label}
                >
                  <item.icon className="w-4 h-4" />
                </button>
              )
            ))}
          </div>
        )}

        <div className="flex-1 flex overflow-hidden">
          {/* Editor */}
          {(viewMode === 'split' || viewMode === 'edit') && (
            <div className={`h-full flex flex-col ${viewMode === 'split' ? 'w-1/2 border-r border-zinc-200 dark:border-zinc-800' : 'w-full'}`}>
              <textarea
                ref={textareaRef}
                value={markdown}
                onChange={e => setMarkdown(e.target.value)}
                className="flex-1 w-full p-4 font-mono text-sm bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-300 focus:outline-none resize-none"
                placeholder="Start typing markdown..."
              />
              <div className="px-4 py-1 text-xs text-zinc-400 bg-zinc-50 dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-800 text-right">
                {markdown.length} chars
              </div>
            </div>
          )}

          {/* Preview */}
          {(viewMode === 'split' || viewMode === 'preview') && (
            <div className={`h-full overflow-auto bg-white dark:bg-zinc-900 prose dark:prose-invert prose-sm max-w-none p-6 ${viewMode === 'split' ? 'w-1/2' : 'w-full'}`}>
              <div dangerouslySetInnerHTML={{ __html: html }} />
            </div>
          )}
        </div>
      </div>
    </ToolWrapper>
  );
};
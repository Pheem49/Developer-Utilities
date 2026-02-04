import React, { useState } from 'react';
import { format } from 'sql-formatter';
import { Copy, FileCode, Check } from 'lucide-react';

export const SqlFormatter = () => {
    const [input, setInput] = useState('SELECT * FROM users WHERE id = 1');
    const [dialect, setDialect] = useState('sql');
    const [formatted, setFormatted] = useState('');
    const [error, setError] = useState('');

    const handleFormat = () => {
        try {
            const res = format(input, { language: dialect as any, tabWidth: 2, keywordCase: 'upper' });
            setFormatted(res);
            setError('');
        } catch (e: any) {
            setError(e.message);
            setFormatted('');
        }
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(formatted);
    };

    React.useEffect(() => {
        handleFormat();
    }, [input, dialect]);

    const dialects = [
        { value: 'sql', label: 'Standard SQL' },
        { value: 'postgresql', label: 'PostgreSQL' },
        { value: 'mysql', label: 'MySQL' },
        { value: 'sqlite', label: 'SQLite' },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-[calc(100vh-200px)] min-h-[600px]">
            <div className="flex flex-col h-full space-y-2">
                <div className="flex justify-between items-center">
                    <label className="text-sm font-medium text-zinc-500">Input Query</label>
                    <select
                        value={dialect}
                        onChange={(e) => setDialect(e.target.value)}
                        className="text-xs bg-zinc-100 dark:bg-zinc-800 border-none rounded px-2 py-1"
                    >
                        {dialects.map(d => <option key={d.value} value={d.value}>{d.label}</option>)}
                    </select>
                </div>
                <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="flex-1 w-full p-4 font-mono text-sm bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl resize-none focus:ring-2 focus:ring-primary/50 focus:border-primary focus:outline-none"
                    placeholder="SELECT * FROM table..."
                />
            </div>

            <div className="flex flex-col h-full space-y-2">
                <div className="flex justify-between items-center">
                    <label className="text-sm font-medium text-zinc-500">Formatted Output</label>
                    {error && <span className="text-xs text-red-500">{error}</span>}
                </div>
                <div className="relative flex-1">
                    <textarea
                        value={formatted}
                        readOnly
                        className="w-full h-full p-4 font-mono text-sm bg-zinc-900 border border-zinc-800 rounded-xl resize-none focus:outline-none text-zinc-300"
                        placeholder="Formatted query will appear here..."
                    />
                    {formatted && (
                        <button
                            onClick={copyToClipboard}
                            className="absolute top-4 right-4 p-2 bg-zinc-800 rounded-lg shadow-sm border border-zinc-700 text-zinc-400 hover:text-white transition-colors"
                            title="Copy Code"
                        >
                            <Copy className="w-4 h-4" />
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

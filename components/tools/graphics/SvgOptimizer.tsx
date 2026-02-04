import React, { useState } from 'react';
import { Download, FileCode, Check, Copy } from 'lucide-react';

export const SvgOptimizer = () => {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [stats, setStats] = useState({ original: 0, optimized: 0, saved: 0 });

    const optimize = (svg: string) => {
        if (!svg) {
            setOutput('');
            return;
        }

        // Basic regex-based optimization (simulated for client-side)
        let optimized = svg
            .replace(/<!--[\s\S]*?-->/g, '') // Remove comments
            .replace(/\s+/g, ' ') // Collapse whitespace
            .replace(/>\s+</g, '><') // Remove space between tags
            .replace(/([\d\.]+)px/g, '$1') // Remove px units
            .trim();

        setOutput(optimized);

        const originalSize = new Blob([svg]).size;
        const optimizedSize = new Blob([optimized]).size;
        const saved = ((originalSize - optimizedSize) / originalSize) * 100;

        setStats({
            original: originalSize,
            optimized: optimizedSize,
            saved: isNaN(saved) ? 0 : Math.max(0, saved)
        });
    };

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const val = e.target.value;
        setInput(val);
        optimize(val);
    };

    const formatSize = (bytes: number) => {
        if (bytes === 0) return '0 B';
        const k = 1024;
        const sizes = ['B', 'KB', 'MB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    const copyOutput = () => {
        navigator.clipboard.writeText(output);
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-[calc(100vh-200px)] min-h-[600px]">
            <div className="flex flex-col h-full space-y-2">
                <label className="text-sm font-medium text-zinc-500 flex justify-between">
                    <span>Input SVG</span>
                    <span className="text-zinc-400">{formatSize(stats.original)}</span>
                </label>
                <textarea
                    className="flex-1 w-full p-4 font-mono text-sm bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl resize-none focus:ring-2 focus:ring-primary/50 focus:border-primary focus:outline-none"
                    placeholder="Paste your SVG code here..."
                    value={input}
                    onChange={handleChange}
                />
            </div>

            <div className="flex flex-col h-full space-y-2">
                <label className="text-sm font-medium text-zinc-500 flex justify-between items-center">
                    <span>Optimized Output</span>
                    {stats.saved > 0 && (
                        <span className="text-emerald-500 font-bold bg-emerald-500/10 px-2 py-0.5 rounded text-xs">
                            -{stats.saved.toFixed(1)}% Saved
                        </span>
                    )}
                    <span className="text-zinc-400">{formatSize(stats.optimized)}</span>
                </label>
                <div className="relative flex-1">
                    <textarea
                        className="w-full h-full p-4 font-mono text-sm bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl resize-none focus:ring-2 focus:ring-primary/50 focus:border-primary focus:outline-none text-zinc-600 dark:text-zinc-400"
                        readOnly
                        value={output}
                        placeholder="Optimized SVG will appear here..."
                    />
                    {output && (
                        <button
                            onClick={copyOutput}
                            className="absolute top-4 right-4 p-2 bg-white dark:bg-zinc-800 rounded-lg shadow-sm border border-zinc-200 dark:border-zinc-700 text-zinc-500 hover:text-primary transition-colors"
                            title="Copy Optimized Code"
                        >
                            <Copy className="w-4 h-4" />
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

import React, { useState, useEffect } from 'react';
import cronstrue from 'cronstrue';
import { Clock, RotateCw, Copy } from 'lucide-react';

export const CronGenerator = () => {
    const [expression, setExpression] = useState('*/15 * * * *');
    const [readable, setReadable] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        try {
            const desc = cronstrue.toString(expression);
            setReadable(desc);
            setError('');
        } catch (e) {
            setError('Invalid cron expression');
            setReadable('');
        }
    }, [expression]);

    const presets = [
        { label: 'Every Minute', value: '* * * * *' },
        { label: 'Every 5 Minutes', value: '*/5 * * * *' },
        { label: 'Every Hour', value: '0 * * * *' },
        { label: 'Every Day at Midnight', value: '0 0 * * *' },
        { label: 'Every Week (Sun)', value: '0 0 * * 0' },
        { label: 'Every Month (1st)', value: '0 0 1 * *' },
    ];

    return (
        <div className="max-w-3xl mx-auto space-y-8">
            <div className="bg-white dark:bg-zinc-900 p-8 rounded-2xl shadow-sm border border-zinc-200 dark:border-zinc-800 text-center">
                <div className="mb-6 inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-6">
                    <Clock className="w-8 h-8" />
                </div>

                <div className="relative max-w-lg mx-auto mb-4">
                    <input
                        type="text"
                        value={expression}
                        onChange={(e) => setExpression(e.target.value)}
                        className="w-full text-center text-3xl font-mono font-bold bg-transparent border-b-2 border-zinc-200 dark:border-zinc-700 py-4 focus:border-primary focus:outline-none transition-colors"
                        placeholder="* * * * *"
                    />
                </div>

                {error ? (
                    <p className="text-red-500 font-medium animate-pulse">{error}</p>
                ) : (
                    <p className="text-lg font-medium text-emerald-600 dark:text-emerald-400">
                        "{readable}"
                    </p>
                )}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {presets.map((preset) => (
                    <button
                        key={preset.label}
                        onClick={() => setExpression(preset.value)}
                        className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 hover:border-primary hover:text-primary transition-all text-left group"
                    >
                        <span className="block text-xs font-semibold text-zinc-500 uppercase mb-1">{preset.label}</span>
                        <code className="text-sm font-mono text-zinc-700 dark:text-zinc-300 group-hover:text-primary transition-colors">
                            {preset.value}
                        </code>
                    </button>
                ))}
            </div>

            <div className="bg-zinc-900 text-zinc-400 p-6 rounded-xl text-sm font-mono leading-relaxed">
                <div className="grid grid-cols-5 gap-4 text-center mb-2 text-xs uppercase tracking-wider text-zinc-500">
                    <div>Minute</div>
                    <div>Hour</div>
                    <div>Day (Month)</div>
                    <div>Month</div>
                    <div>Day (Week)</div>
                </div>
                <div className="grid grid-cols-5 gap-4 text-center text-white text-lg font-bold">
                    {expression.split(' ').map((part, i) => (
                        <div key={i} className="bg-zinc-800 py-2 rounded">{part || '?'}</div>
                    ))}
                </div>
            </div>
        </div>
    );
};

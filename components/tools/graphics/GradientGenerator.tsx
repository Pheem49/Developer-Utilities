import React, { useState } from 'react';
import { Copy, RefreshCw, ArrowRight, Monitor, Move } from 'lucide-react';

interface ColorStop {
    id: string;
    color: string;
    position: number;
}

export const GradientGenerator = () => {
    const [type, setType] = useState<'linear' | 'radial'>('linear');
    const [direction, setDirection] = useState('to right');
    const [stops, setStops] = useState<ColorStop[]>([
        { id: '1', color: '#6366f1', position: 0 },
        { id: '2', color: '#a855f7', position: 100 }
    ]);

    const directions = [
        { label: 'Right', value: 'to right' },
        { label: 'Left', value: 'to left' },
        { label: 'Down', value: 'to bottom' },
        { label: 'Up', value: 'to top' },
        { label: 'Top Right', value: 'to top right' },
        { label: 'Bottom Right', value: 'to bottom right' },
        { label: 'Top Left', value: 'to top left' },
        { label: 'Bottom Left', value: 'to bottom left' }
    ];

    const gradientString = type === 'linear'
        ? `linear-gradient(${direction}, ${stops.map(s => `${s.color} ${s.position}%`).join(', ')})`
        : `radial-gradient(circle, ${stops.map(s => `${s.color} ${s.position}%`).join(', ')})`;

    const addStop = () => {
        if (stops.length >= 5) return;
        const newStop = {
            id: Math.random().toString(36).substr(2, 9),
            color: '#ffffff',
            position: 50
        };
        setStops([...stops, newStop].sort((a, b) => a.position - b.position));
    };

    const updateStop = (id: string, updates: Partial<ColorStop>) => {
        setStops(stops.map(s => s.id === id ? { ...s, ...updates } : s));
    };

    const removeStop = (id: string) => {
        if (stops.length <= 2) return;
        setStops(stops.filter(s => s.id !== id));
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(`background: ${gradientString};`);
    };

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Controls */}
                <div className="space-y-6 bg-white dark:bg-zinc-900 p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
                    <div>
                        <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Type</label>
                        <div className="flex bg-zinc-100 dark:bg-zinc-800 p-1 rounded-lg">
                            <button
                                onClick={() => setType('linear')}
                                className={`flex-1 py-1.5 px-3 rounded-md text-sm font-medium transition-all ${type === 'linear'
                                        ? 'bg-white dark:bg-zinc-700 shadow text-zinc-900 dark:text-white'
                                        : 'text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300'
                                    }`}
                            >
                                Linear
                            </button>
                            <button
                                onClick={() => setType('radial')}
                                className={`flex-1 py-1.5 px-3 rounded-md text-sm font-medium transition-all ${type === 'radial'
                                        ? 'bg-white dark:bg-zinc-700 shadow text-zinc-900 dark:text-white'
                                        : 'text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300'
                                    }`}
                            >
                                Radial
                            </button>
                        </div>
                    </div>

                    {type === 'linear' && (
                        <div>
                            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Direction</label>
                            <select
                                value={direction}
                                onChange={(e) => setDirection(e.target.value)}
                                className="w-full px-3 py-2 bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-lg text-sm text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-primary/50 focus:border-primary"
                            >
                                {directions.map(d => (
                                    <option key={d.value} value={d.value}>{d.label}</option>
                                ))}
                            </select>
                        </div>
                    )}

                    <div>
                        <div className="flex items-center justify-between mb-2">
                            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">Colors</label>
                            <button
                                onClick={addStop}
                                disabled={stops.length >= 5}
                                className="text-xs font-medium text-primary hover:text-primaryHover disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                + Add Color
                            </button>
                        </div>
                        <div className="space-y-3">
                            {stops.map((stop, index) => (
                                <div key={stop.id} className="flex items-center gap-3 p-2 bg-zinc-50 dark:bg-zinc-800/50 rounded-lg border border-zinc-100 dark:border-zinc-800">
                                    <input
                                        type="color"
                                        value={stop.color}
                                        onChange={(e) => updateStop(stop.id, { color: e.target.value })}
                                        className="w-8 h-8 rounded cursor-pointer border-0 p-0 bg-transparent"
                                    />
                                    <input
                                        type="range"
                                        min="0"
                                        max="100"
                                        value={stop.position}
                                        onChange={(e) => updateStop(stop.id, { position: parseInt(e.target.value) })}
                                        className="flex-1 accent-primary h-2 bg-zinc-200 dark:bg-zinc-700 rounded-lg appearance-none cursor-pointer"
                                    />
                                    <span className="text-xs w-8 text-right font-mono text-zinc-500">{stop.position}%</span>
                                    {stops.length > 2 && (
                                        <button
                                            onClick={() => removeStop(stop.id)}
                                            className="text-zinc-400 hover:text-red-500"
                                        >
                                            ×
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Preview */}
                <div className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-zinc-500">Preview</label>
                        <div
                            className="h-64 w-full rounded-2xl shadow-lg ring-1 ring-zinc-900/5 dark:ring-white/10"
                            style={{ background: gradientString }}
                        />
                    </div>

                    <div className="bg-zinc-900 rounded-xl p-4 relative group">
                        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                                onClick={copyToClipboard}
                                className="p-1.5 text-zinc-400 hover:text-white bg-zinc-800 rounded-md hover:bg-zinc-700 transition"
                                title="Copy CSS"
                            >
                                <Copy className="w-4 h-4" />
                            </button>
                        </div>
                        <code className="text-sm font-mono text-zinc-300 break-all block pr-8">
                            background: {gradientString};
                        </code>
                    </div>
                </div>
            </div>
        </div>
    );
};

import React, { useState, useEffect } from 'react';
import { Copy } from 'lucide-react';
import { colord, extend } from 'colord';
import namesPlugin from 'colord/plugins/names';
import cmykPlugin from 'colord/plugins/cmyk';
import hwbPlugin from 'colord/plugins/hwb';
import labPlugin from 'colord/plugins/lab';

extend([namesPlugin, cmykPlugin, hwbPlugin, labPlugin]);

export const ColorConverter = () => {
    const [input, setInput] = useState('#8b5cf6');
    const [selectedFormat, setSelectedFormat] = useState('HEX');

    const color = colord(input);
    const isValid = color.isValid();

    const presets = [
        '#8b5cf6', // Purple
        '#14b8a6', // Teal
        '#ef4444', // Red
        '#f97316', // Orange
        '#ec4899'  // Pink
    ];

    const formats = ['HEX', 'RGB', 'RGBA', 'DSL', 'HSLA']; // Note: Typo fixed from screenshot DSL -> HSL usually, but assuming 'HSL' intended


    // Adjust RGBA/HSLA logic correctly
    const rgba = color.toRgb();
    const hsl = color.toHsl();

    const rgbaValue = isValid ? `rgba(${rgba.r}, ${rgba.g}, ${rgba.b}, ${rgba.a})` : '';
    const hslaValue = isValid ? `hsla(${hsl.h}, ${hsl.s}%, ${hsl.l}%, ${hsl.a})` : '';

    const outputs = [
        { label: 'HEX', value: color.toHex() },
        { label: 'RGB', value: color.toRgbString() },
        { label: 'RGBA', value: rgbaValue },
        { label: 'HSL', value: color.toHslString() },
        { label: 'HSLA', value: hslaValue }
    ];

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
    };

    return (
        <div className="space-y-8">
            <div className="bg-white dark:bg-zinc-900 p-8 rounded-2xl shadow-sm border border-zinc-200 dark:border-zinc-800">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

                    {/* Left Column: Input */}
                    <div className="space-y-8">
                        <div>
                            <label className="block text-sm font-medium text-zinc-500 mb-4">Input Color Format</label>
                            <div className="flex flex-wrap gap-2">
                                {['HEX', 'RGB', 'RGBA', 'HSL', 'HSLA'].map(fmt => (
                                    <button
                                        key={fmt}
                                        onClick={() => setSelectedFormat(fmt)}
                                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${selectedFormat === fmt
                                            ? 'bg-zinc-800 text-white dark:bg-zinc-700'
                                            : 'bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700'
                                            }`}
                                    >
                                        {fmt}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-zinc-500 mb-2">Enter {selectedFormat} Color</label>
                            <div className="flex gap-4">
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    className="flex-1 bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg px-4 py-3 text-zinc-900 dark:text-zinc-100 font-mono focus:ring-2 focus:ring-primary/50 focus:border-primary focus:outline-none"
                                />
                                <div className="relative w-12 h-12 rounded-lg border border-zinc-200 dark:border-zinc-700 shadow-sm overflow-hidden group">
                                    <input
                                        type="color"
                                        value={isValid ? color.toHex() : '#000000'}
                                        onChange={(e) => setInput(e.target.value)}
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                    />
                                    <div
                                        className="w-full h-full"
                                        style={{ backgroundColor: isValid ? color.toHex() : 'transparent' }}
                                    />
                                </div>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-zinc-500 mb-3">Color Presets</label>
                            <div className="flex gap-3">
                                {presets.map(c => (
                                    <button
                                        key={c}
                                        onClick={() => setInput(c)}
                                        className="w-8 h-8 rounded-full cursor-pointer hover:scale-110 transition-transform ring-2 ring-transparent hover:ring-offset-2 hover:ring-zinc-400 dark:hover:ring-zinc-500"
                                        style={{ backgroundColor: c }}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Preview */}
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-zinc-500">Color Preview</label>
                        <div
                            className="w-full h-48 rounded-xl shadow-lg transition-colors duration-300"
                            style={{ backgroundColor: isValid ? color.toHex() : '#000000' }}
                        />
                    </div>
                </div>

                {/* Bottom Section: Formats */}
                <div className="mt-12 space-y-4">
                    <label className="block text-sm font-medium text-zinc-500 mb-4">Color Formats</label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {outputs.map((fmt) => (
                            <div key={fmt.label} className="bg-zinc-50 dark:bg-zinc-800/30 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800/50 flex flex-col relative group">
                                <div className="flex justify-between items-start mb-2">
                                    <span className="text-xs font-semibold text-zinc-500 uppercase">{fmt.label}</span>
                                    <button
                                        onClick={() => copyToClipboard(fmt.value)}
                                        className="text-zinc-400 hover:text-primary transition-colors"
                                    >
                                        <Copy className="w-4 h-4" />
                                    </button>
                                </div>
                                <code className="text-sm font-mono text-zinc-300">
                                    {isValid ? fmt.value : 'Invalid Color'}
                                </code>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
};

import React, { useState } from 'react';
import { Copy, Layers } from 'lucide-react';

export const BoxShadowGenerator = () => {
    const [hOffset, setHOffset] = useState(0);
    const [vOffset, setVOffset] = useState(4);
    const [blur, setBlur] = useState(10);
    const [spread, setSpread] = useState(0);
    const [color, setColor] = useState('#000000');
    const [opacity, setOpacity] = useState(25);
    const [inset, setInset] = useState(false);
    const [bgColor, setBgColor] = useState('#ffffff');
    const [boxColor, setBoxColor] = useState('#3b82f6');

    const hexToRgba = (hex: string, alpha: number) => {
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        return `rgba(${r}, ${g}, ${b}, ${alpha / 100})`;
    };

    const shadowString = `${inset ? 'inset ' : ''}${hOffset}px ${vOffset}px ${blur}px ${spread}px ${hexToRgba(color, opacity)}`;

    const copyToClipboard = () => {
        navigator.clipboard.writeText(`box-shadow: ${shadowString};`);
    };

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Controls */}
                <div className="space-y-6 bg-white dark:bg-zinc-900 p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
                    <div className="space-y-4">
                        {[
                            { label: 'Horizontal Offset', value: hOffset, set: setHOffset, min: -100, max: 100 },
                            { label: 'Vertical Offset', value: vOffset, set: setVOffset, min: -100, max: 100 },
                            { label: 'Blur Radius', value: blur, set: setBlur, min: 0, max: 100 },
                            { label: 'Spread Radius', value: spread, set: setSpread, min: -100, max: 100 },
                            { label: 'Shadow Opacity', value: opacity, set: setOpacity, min: 0, max: 100 },
                        ].map((control) => (
                            <div key={control.label}>
                                <div className="flex justify-between mb-2">
                                    <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">{control.label}</label>
                                    <span className="text-xs font-mono text-zinc-500">{control.value}px</span>
                                </div>
                                <input
                                    type="range"
                                    min={control.min}
                                    max={control.max}
                                    value={control.value}
                                    onChange={(e) => control.set(parseInt(e.target.value))}
                                    className="w-full accent-primary h-2 bg-zinc-200 dark:bg-zinc-700 rounded-lg appearance-none cursor-pointer"
                                />
                            </div>
                        ))}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Shadow Color</label>
                            <div className="flex items-center gap-2">
                                <input
                                    type="color"
                                    value={color}
                                    onChange={(e) => setColor(e.target.value)}
                                    className="w-8 h-8 rounded cursor-pointer border-0 p-0"
                                />
                                <input
                                    type="text"
                                    value={color}
                                    onChange={(e) => setColor(e.target.value)}
                                    className="flex-1 text-sm bg-zinc-50 dark:bg-zinc-800 border-none rounded px-2 py-1"
                                />
                            </div>
                        </div>
                        <div className="flex items-center pt-6">
                            <label className="flex items-center space-x-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={inset}
                                    onChange={(e) => setInset(e.target.checked)}
                                    className="w-4 h-4 text-primary rounded border-zinc-300 focus:ring-primary"
                                />
                                <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Inset Shadow</span>
                            </label>
                        </div>
                    </div>
                </div>

                {/* Preview */}
                <div className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-zinc-500">Preview</label>
                        <div
                            className="h-80 w-full rounded-2xl shadow-inner border border-zinc-200 dark:border-zinc-800 flex items-center justify-center transition-colors"
                            style={{ backgroundColor: bgColor }}
                        >
                            <div
                                className="w-40 h-40 rounded-xl flex items-center justify-center transition-all duration-300"
                                style={{
                                    backgroundColor: boxColor,
                                    boxShadow: shadowString
                                }}
                            >
                                <Layers className="text-white opacity-50 w-12 h-12" />
                            </div>
                        </div>
                        <div className="flex gap-4 p-4 bg-zinc-50 dark:bg-zinc-900 rounded-lg">
                            <div className="flex-1">
                                <label className="text-xs font-medium text-zinc-500 mb-1 block">Box Color</label>
                                <input
                                    type="color"
                                    value={boxColor}
                                    onChange={(e) => setBoxColor(e.target.value)}
                                    className="w-full h-8 cursor-pointer rounded"
                                />
                            </div>
                            <div className="flex-1">
                                <label className="text-xs font-medium text-zinc-500 mb-1 block">Bg Color</label>
                                <input
                                    type="color"
                                    value={bgColor}
                                    onChange={(e) => setBgColor(e.target.value)}
                                    className="w-full h-8 cursor-pointer rounded"
                                />
                            </div>
                        </div>
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
                            box-shadow: {shadowString};
                        </code>
                    </div>
                </div>
            </div>
        </div>
    );
};

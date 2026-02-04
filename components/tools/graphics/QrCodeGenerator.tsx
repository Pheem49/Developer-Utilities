import React, { useState, useRef } from 'react';
import QRCode from 'react-qr-code';
import { Download, QrCode } from 'lucide-react';

export const QrCodeGenerator = () => {
    const [value, setValue] = useState('');
    const [size, setSize] = useState(256);
    const [fgColor, setFgColor] = useState('#000000');
    const [bgColor, setBgColor] = useState('#ffffff');
    const svgRef = useRef<any>(null);

    const downloadQr = () => {
        const svg = document.getElementById('qr-code-svg');
        if (!svg) return;

        const svgData = new XMLSerializer().serializeToString(svg);
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const img = new Image();

        img.onload = () => {
            canvas.width = size;
            canvas.height = size;
            ctx?.drawImage(img, 0, 0);
            const pngFile = canvas.toDataURL('image/png');

            const downloadLink = document.createElement('a');
            downloadLink.download = `qrcode-${Date.now()}.png`;
            downloadLink.href = `${pngFile}`;
            downloadLink.click();
        };

        img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
                <div className="space-y-2">
                    <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Content</label>
                    <textarea
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        placeholder="Enter text or URL..."
                        className="w-full h-32 p-3 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 focus:ring-2 focus:ring-primary/50 focus:border-primary resize-none"
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2 block">Foreground</label>
                        <div className="flex items-center gap-2">
                            <input type="color" value={fgColor} onChange={(e) => setFgColor(e.target.value)} className="w-8 h-8 rounded cursor-pointer border-0 p-0" />
                            <span className="text-xs font-mono text-zinc-500">{fgColor}</span>
                        </div>
                    </div>
                    <div>
                        <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2 block">Background</label>
                        <div className="flex items-center gap-2">
                            <input type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)} className="w-8 h-8 rounded cursor-pointer border-0 p-0" />
                            <span className="text-xs font-mono text-zinc-500">{bgColor}</span>
                        </div>
                    </div>
                </div>

                <div>
                    <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2 block">Size: {size}px</label>
                    <input
                        type="range"
                        min="128"
                        max="512"
                        step="8"
                        value={size}
                        onChange={(e) => setSize(parseInt(e.target.value))}
                        className="w-full accent-primary h-2 bg-zinc-200 dark:bg-zinc-700 rounded-lg appearance-none cursor-pointer"
                    />
                </div>

                <button
                    onClick={downloadQr}
                    disabled={!value}
                    className="w-full py-3 bg-primary hover:bg-primaryHover text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <Download className="w-4 h-4" />
                    Download PNG
                </button>
            </div>

            <div className="flex items-center justify-center bg-zinc-100 dark:bg-zinc-900 rounded-2xl p-8 border border-zinc-200 dark:border-zinc-800 min-h-[400px]">
                {value ? (
                    <div className="bg-white p-4 rounded-xl shadow-lg">
                        <QRCode
                            id="qr-code-svg"
                            value={value}
                            size={size}
                            fgColor={fgColor}
                            bgColor={bgColor}
                            level="H"
                        />
                    </div>
                ) : (
                    <div className="text-center text-zinc-400">
                        <QrCode className="w-16 h-16 mx-auto mb-4 opacity-50" />
                        <p>Enter content to generate a QR Code</p>
                    </div>
                )}
            </div>
        </div>
    );
};

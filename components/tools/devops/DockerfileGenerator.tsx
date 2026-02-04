import React, { useState } from 'react';
import { Copy, Terminal, Server } from 'lucide-react';

export const DockerfileGenerator = () => {
    const [config, setConfig] = useState({
        image: 'node',
        version: '18-alpine',
        workdir: '/app',
        port: '3000',
        cmd: '["npm", "start"]',
        packageManager: 'npm',
        copyFiles: true,
    });

    const languagePresets: Record<string, any> = {
        node: { image: 'node', version: '18-alpine', workdir: '/app', port: '3000', cmd: '["npm", "start"]', packageManager: 'npm' },
        python: { image: 'python', version: '3.9-slim', workdir: '/app', port: '8000', cmd: '["python", "app.py"]', packageManager: 'pip' },
        go: { image: 'golang', version: '1.21-alpine', workdir: '/app', port: '8080', cmd: '["./main"]', packageManager: 'go' },
    };

    const loadPreset = (lang: string) => {
        setConfig({ ...config, ...languagePresets[lang] });
    };

    const generateDockerfile = () => {
        let dockerfile = `FROM ${config.image}:${config.version}\n\n`;
        dockerfile += `WORKDIR ${config.workdir}\n\n`;

        if (config.image === 'node') {
            dockerfile += `COPY package*.json ./\n`;
            dockerfile += `RUN npm install\n`;
        } else if (config.image === 'python') {
            dockerfile += `COPY requirements.txt ./\n`;
            dockerfile += `RUN pip install -r requirements.txt\n`;
        } else if (config.image === 'golang') {
            dockerfile += `COPY go.mod go.sum ./\n`;
            dockerfile += `RUN go mod download\n`;
        }

        if (config.copyFiles) {
            dockerfile += `\nCOPY . .\n`;
        }

        if (config.image === 'golang') {
            dockerfile += `RUN go build -o main .\n`;
        }

        if (config.port) {
            dockerfile += `\nEXPOSE ${config.port}\n`;
        }

        dockerfile += `\nCMD ${config.cmd}`;
        return dockerfile;
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(generateDockerfile());
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
                <div className="bg-white dark:bg-zinc-900 p-6 rounded-xl border border-zinc-200 dark:border-zinc-800">
                    <label className="block text-sm font-medium text-zinc-500 mb-4">Quick Presets</label>
                    <div className="flex gap-2 mb-6">
                        {Object.keys(languagePresets).map(lang => (
                            <button
                                key={lang}
                                onClick={() => loadPreset(lang)}
                                className="px-4 py-2 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-lg text-sm font-medium capitalize transition-colors"
                            >
                                {lang}
                            </button>
                        ))}
                    </div>

                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-semibold text-zinc-500 uppercase mb-1">Base Image</label>
                                <input
                                    type="text"
                                    value={config.image}
                                    onChange={(e) => setConfig({ ...config, image: e.target.value })}
                                    className="w-full p-2 bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 rounded-lg text-sm"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-zinc-500 uppercase mb-1">Tag / Version</label>
                                <input
                                    type="text"
                                    value={config.version}
                                    onChange={(e) => setConfig({ ...config, version: e.target.value })}
                                    className="w-full p-2 bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 rounded-lg text-sm"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-zinc-500 uppercase mb-1">Work Directory</label>
                            <input
                                type="text"
                                value={config.workdir}
                                onChange={(e) => setConfig({ ...config, workdir: e.target.value })}
                                className="w-full p-2 bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 rounded-lg text-sm"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-zinc-500 uppercase mb-1">Expose Port</label>
                            <input
                                type="text"
                                value={config.port}
                                onChange={(e) => setConfig({ ...config, port: e.target.value })}
                                className="w-full p-2 bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 rounded-lg text-sm"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-zinc-500 uppercase mb-1">Command (CMD)</label>
                            <input
                                type="text"
                                value={config.cmd}
                                onChange={(e) => setConfig({ ...config, cmd: e.target.value })}
                                className="w-full p-2 bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 rounded-lg text-sm font-mono"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="h-full">
                <div className="relative h-full bg-zinc-900 rounded-xl overflow-hidden shadow-2xl border border-zinc-800">
                    <div className="absolute top-0 inset-x-0 h-10 bg-zinc-800/50 flex items-center px-4 border-b border-white/5 justify-between">
                        <span className="text-xs font-mono text-zinc-400">Dockerfile</span>
                        <button
                            onClick={copyToClipboard}
                            className="text-zinc-500 hover:text-white transition-colors"
                        >
                            <Copy className="w-4 h-4" />
                        </button>
                    </div>
                    <textarea
                        value={generateDockerfile()}
                        readOnly
                        className="w-full h-full pt-14 p-4 bg-transparent border-none resize-none focus:outline-none text-zinc-300 font-mono text-sm leading-relaxed"
                    />
                </div>
            </div>
        </div>
    );
};

import React, { useState, useEffect } from 'react';
import { Shield, Lock, Users, User, Copy } from 'lucide-react';

export const ChmodCalculator = () => {
    const [permissions, setPermissions] = useState({
        owner: { read: true, write: true, execute: true },
        group: { read: true, write: false, execute: true },
        public: { read: true, write: false, execute: true }
    });

    const [chmodNumber, setChmodNumber] = useState('755');
    const [chmodSymbol, setChmodSymbol] = useState('-rwxr-xr-x');

    useEffect(() => {
        calculateValues();
    }, [permissions]);

    const calculateValues = () => {
        const calculatePart = (p: any) => {
            let n = 0;
            if (p.read) n += 4;
            if (p.write) n += 2;
            if (p.execute) n += 1;
            return n;
        };

        const o = calculatePart(permissions.owner);
        const g = calculatePart(permissions.group);
        const p = calculatePart(permissions.public);

        const num = `${o}${g}${p}`;
        setChmodNumber(num);

        const getSymbol = (p: any) => {
            return (p.read ? 'r' : '-') + (p.write ? 'w' : '-') + (p.execute ? 'x' : '-');
        };

        setChmodSymbol(`-${getSymbol(permissions.owner)}${getSymbol(permissions.group)}${getSymbol(permissions.public)}`);
    };

    const togglePermission = (role: 'owner' | 'group' | 'public', type: 'read' | 'write' | 'execute') => {
        setPermissions(prev => ({
            ...prev,
            [role]: { ...prev[role], [type]: !prev[role][type] }
        }));
    };

    const updateFromNumber = (input: string) => {
        const num = input.replace(/[^0-7]/g, '').slice(0, 3);
        setChmodNumber(num);

        if (num.length === 3) {
            const parseDigit = (d: string) => {
                const n = parseInt(d);
                return {
                    read: (n & 4) !== 0,
                    write: (n & 2) !== 0,
                    execute: (n & 1) !== 0
                };
            };

            setPermissions({
                owner: parseDigit(num[0]),
                group: parseDigit(num[1]),
                public: parseDigit(num[2])
            });
        }
    };

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
                <div className="bg-white dark:bg-zinc-900 rounded-xl p-6 border border-zinc-200 dark:border-zinc-800 shadow-sm">
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        <User className="w-5 h-5 text-primary" /> Owner
                    </h3>
                    <div className="space-y-3">
                        {['Read', 'Write', 'Execute'].map((type) => (
                            <label key={type} className="flex items-center space-x-3 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={(permissions.owner as any)[type.toLowerCase()]}
                                    onChange={() => togglePermission('owner', type.toLowerCase() as any)}
                                    className="w-5 h-5 text-primary rounded border-zinc-300 focus:ring-primary"
                                />
                                <span className="text-zinc-700 dark:text-zinc-300">{type} ({(type === 'Read' ? 4 : type === 'Write' ? 2 : 1)})</span>
                            </label>
                        ))}
                    </div>
                </div>

                <div className="bg-white dark:bg-zinc-900 rounded-xl p-6 border border-zinc-200 dark:border-zinc-800 shadow-sm">
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        <Users className="w-5 h-5 text-purple-500" /> Group
                    </h3>
                    <div className="space-y-3">
                        {['Read', 'Write', 'Execute'].map((type) => (
                            <label key={type} className="flex items-center space-x-3 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={(permissions.group as any)[type.toLowerCase()]}
                                    onChange={() => togglePermission('group', type.toLowerCase() as any)}
                                    className="w-5 h-5 text-purple-500 rounded border-zinc-300 focus:ring-purple-500"
                                />
                                <span className="text-zinc-700 dark:text-zinc-300">{type} ({(type === 'Read' ? 4 : type === 'Write' ? 2 : 1)})</span>
                            </label>
                        ))}
                    </div>
                </div>

                <div className="bg-white dark:bg-zinc-900 rounded-xl p-6 border border-zinc-200 dark:border-zinc-800 shadow-sm">
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        <Shield className="w-5 h-5 text-green-500" /> Public
                    </h3>
                    <div className="space-y-3">
                        {['Read', 'Write', 'Execute'].map((type) => (
                            <label key={type} className="flex items-center space-x-3 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={(permissions.public as any)[type.toLowerCase()]}
                                    onChange={() => togglePermission('public', type.toLowerCase() as any)}
                                    className="w-5 h-5 text-green-500 rounded border-zinc-300 focus:ring-green-500"
                                />
                                <span className="text-zinc-700 dark:text-zinc-300">{type} ({(type === 'Read' ? 4 : type === 'Write' ? 2 : 1)})</span>
                            </label>
                        ))}
                    </div>
                </div>
            </div>

            <div className="space-y-6">
                <div className="bg-zinc-50 dark:bg-zinc-900/50 rounded-xl p-6 border border-zinc-200 dark:border-zinc-800">
                    <label className="block text-sm font-medium text-zinc-500 mb-2">Chmod Number</label>
                    <div className="relative group">
                        <input
                            type="text"
                            value={chmodNumber}
                            onChange={(e) => updateFromNumber(e.target.value)}
                            maxLength={3}
                            className="w-full text-4xl font-mono font-bold bg-transparent border-b-2 border-zinc-300 dark:border-zinc-700 py-2 focus:outline-none focus:border-primary tracking-widest text-center"
                        />
                        <button
                            onClick={() => copyToClipboard(chmodNumber)}
                            className="absolute right-0 top-1/2 -translate-y-1/2 p-2 text-zinc-400 hover:text-primary opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                            <Copy className="w-5 h-5" />
                        </button>
                    </div>

                    <div className="mt-8">
                        <label className="block text-sm font-medium text-zinc-500 mb-2">Symbolic Notation</label>
                        <div className="relative group p-4 bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800">
                            <code className="text-xl font-mono text-zinc-800 dark:text-zinc-200">{chmodSymbol}</code>
                            <button
                                onClick={() => copyToClipboard(chmodSymbol)}
                                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-zinc-400 hover:text-primary opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                                <Copy className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    <div className="mt-8">
                        <label className="block text-sm font-medium text-zinc-500 mb-2">Command</label>
                        <div className="relative group p-4 bg-zinc-900 rounded-lg">
                            <code className="text-sm font-mono text-green-400">chmod {chmodNumber} filename</code>
                            <button
                                onClick={() => copyToClipboard(`chmod ${chmodNumber} filename`)}
                                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-zinc-500 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                                <Copy className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

import React, { useState, useEffect } from 'react';
import { ToolWrapper } from '../ToolWrapper';
import { CopyButton } from '../ui/CopyButton';
import { Button } from '../ui/Button';
import { Trash2 } from 'lucide-react';
import md5 from 'blueimp-md5';

export const HashGenerator: React.FC = () => {
  const [input, setInput] = useState('');
  const [hashes, setHashes] = useState({
    md5: '',
    sha1: '',
    sha256: '',
    sha512: ''
  });

  useEffect(() => {
    if (!input) {
      setHashes({ md5: '', sha1: '', sha256: '', sha512: '' });
      return;
    }

    const generateHashes = async () => {
      // MD5
      let md5Hash = '';
      try {
        md5Hash = md5(input);
      } catch (e) {
        console.warn('MD5 generation failed', e);
        md5Hash = 'Error';
      }

      if (typeof window === 'undefined' || !window.crypto || !window.crypto.subtle) {
        setHashes({
          md5: md5Hash,
          sha1: 'Secure context required (HTTPS)',
          sha256: 'Secure context required (HTTPS)',
          sha512: 'Secure context required (HTTPS)'
        });
        return;
      }

      // SHA helpers
      const encode = new TextEncoder().encode(input);

      const bufferToHex = (buffer: ArrayBuffer) => {
        return [...new Uint8Array(buffer)]
          .map(b => b.toString(16).padStart(2, '0'))
          .join('');
      };

      try {
        const [b1, b256, b512] = await Promise.all([
          window.crypto.subtle.digest('SHA-1', encode),
          window.crypto.subtle.digest('SHA-256', encode),
          window.crypto.subtle.digest('SHA-512', encode)
        ]);

        setHashes({
          md5: md5Hash,
          sha1: bufferToHex(b1),
          sha256: bufferToHex(b256),
          sha512: bufferToHex(b512)
        });
      } catch (e) {
        console.error('Hashing failed', e);
      }
    };

    generateHashes();
  }, [input]);

  return (
    <ToolWrapper
      title="Hash Generator"
      description="Calculate cryptographic, one-way hashes (MD5, SHA-1, SHA-256) for text input."
      actions={
        <Button variant="ghost" size="sm" onClick={() => setInput('')} title="Clear">
          <Trash2 className="w-4 h-4" />
        </Button>
      }
    >
      <div className="max-w-4xl mx-auto flex flex-col gap-6">
        <div className="space-y-2">
          <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Input Text</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type text to hash..."
            className="w-full bg-surfaceHighlight border border-zinc-700 rounded-md p-4 font-mono text-sm text-zinc-300 focus:outline-none focus:border-primary resize-none h-32"
          />
        </div>

        <div className="grid grid-cols-1 gap-4">
          {[
            { label: 'MD5', val: hashes.md5, color: 'text-blue-400' },
            { label: 'SHA-1', val: hashes.sha1, color: 'text-emerald-400' },
            { label: 'SHA-256', val: hashes.sha256, color: 'text-purple-400' },
            { label: 'SHA-512', val: hashes.sha512, color: 'text-orange-400' },
          ].map((algo) => (
            <div key={algo.label} className="bg-surfaceHighlight border border-zinc-700 rounded-lg p-3 space-y-2">
              <div className="flex justify-between items-center">
                <span className={`text-xs font-bold uppercase tracking-wider ${algo.color}`}>{algo.label}</span>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-zinc-500">{algo.val.length} chars</span>
                  <CopyButton text={algo.val} />
                </div>
              </div>
              <div className="font-mono text-sm text-zinc-300 break-all bg-black/20 p-2 rounded border border-white/5">
                {algo.val || <span className="text-zinc-600 italic">Waiting for input...</span>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </ToolWrapper>
  );
};
import React, { useState, useEffect } from 'react';
import { ToolWrapper } from '../ToolWrapper';
import { Button } from '../ui/Button';
import { Trash2, AlertTriangle, Shield, User, Clock } from 'lucide-react';

interface JwtHeader {
  alg?: string;
  typ?: string;
}

interface JwtPayload {
  sub?: string;
  name?: string;
  iat?: number;
  exp?: number;
  [key: string]: any;
}

export const JwtDecoder: React.FC = () => {
  const [token, setToken] = useState('');
  const [header, setHeader] = useState<JwtHeader | null>(null);
  const [payload, setPayload] = useState<JwtPayload | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!token.trim()) {
      setHeader(null);
      setPayload(null);
      setError(null);
      return;
    }

    try {
      const parts = token.split('.');
      if (parts.length !== 3) {
        throw new Error('Invalid JWT format. Expected 3 parts separated by dots.');
      }

      const decodePart = (part: string) => {
        try {
          return JSON.parse(decodeURIComponent(escape(atob(part.replace(/-/g, '+').replace(/_/g, '/')))));
        } catch (e) {
          throw new Error('Failed to decode Base64 URL.');
        }
      };

      setHeader(decodePart(parts[0]));
      setPayload(decodePart(parts[1]));
      setError(null);
    } catch (e) {
      setError((e as Error).message);
      setHeader(null);
      setPayload(null);
    }
  }, [token]);

  const formatDate = (timestamp?: number) => {
    if (!timestamp) return 'N/A';
    return new Date(timestamp * 1000).toLocaleString();
  };

  const isExpired = payload?.exp ? (Date.now() / 1000) > payload.exp : false;

  return (
    <ToolWrapper
      title="JWT Decoder"
      description="Decode JSON Web Tokens (JWT) to view header and payload claims."
      actions={
        <Button variant="ghost" size="sm" onClick={() => setToken('')} title="Clear">
          <Trash2 className="w-4 h-4" />
        </Button>
      }
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">
        {/* Input Section */}
        <div className="flex flex-col gap-2 h-full">
          <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Encoded Token</label>
          <textarea
            value={token}
            onChange={(e) => setToken(e.target.value)}
            placeholder="Paste JWT here (ey...)"
            className={`flex-1 w-full bg-surfaceHighlight border rounded-md p-4 font-mono text-sm break-all focus:outline-none focus:ring-1 resize-none placeholder:text-zinc-600 ${error ? 'border-red-500 focus:border-red-500' : 'border-zinc-700 focus:border-primary'
              }`}
            spellCheck={false}
          />
          {error && (
            <div className="text-red-400 text-xs flex items-center gap-1.5 mt-1 bg-red-950/20 p-2 rounded border border-red-900/30">
              <AlertTriangle className="w-3 h-3" /> {error}
            </div>
          )}
        </div>

        {/* Output Section */}
        <div className="flex flex-col gap-4 h-full overflow-auto">
          {header || payload ? (
            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2">

              {/* Status Card */}
              <div className={`p-4 rounded-lg border flex items-center gap-3 ${isExpired
                  ? 'bg-red-500/10 border-red-500/30 text-red-200'
                  : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-200'
                }`}>
                {isExpired ? <Clock className="w-5 h-5 text-red-500" /> : <Shield className="w-5 h-5 text-emerald-500" />}
                <div>
                  <div className="font-bold text-sm">{isExpired ? 'Token Expired' : 'Valid Signature Format'}</div>
                  <div className="text-xs opacity-70">
                    {isExpired
                      ? `Expired at ${formatDate(payload?.exp)}`
                      : payload?.exp ? `Expires at ${formatDate(payload?.exp)}` : 'No expiration set'}
                  </div>
                </div>
              </div>

              {/* Header */}
              <div className="space-y-1">
                <div className="text-xs font-semibold text-red-400 uppercase tracking-wider">Header</div>
                <pre className="bg-surfaceHighlight border border-zinc-700 rounded-md p-3 text-xs font-mono text-zinc-300 overflow-auto">
                  {JSON.stringify(header, null, 2)}
                </pre>
              </div>

              {/* Payload */}
              <div className="space-y-1">
                <div className="text-xs font-semibold text-purple-400 uppercase tracking-wider">Payload</div>
                <pre className="bg-surfaceHighlight border border-zinc-700 rounded-md p-3 text-xs font-mono text-zinc-300 overflow-auto">
                  {JSON.stringify(payload, null, 2)}
                </pre>
              </div>

              {/* Quick Info */}
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="bg-surfaceHighlight p-2 rounded border border-zinc-700">
                  <span className="text-zinc-500 block mb-1">Algorithm</span>
                  <span className="font-mono text-zinc-200">{header?.alg || 'N/A'}</span>
                </div>
                <div className="bg-surfaceHighlight p-2 rounded border border-zinc-700">
                  <span className="text-zinc-500 block mb-1">Subject (sub)</span>
                  <span className="font-mono text-zinc-200 flex items-center gap-1">
                    <User className="w-3 h-3" /> {payload?.sub || 'N/A'}
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-zinc-500 border border-dashed border-zinc-700 rounded-lg p-8 text-center opacity-50">
              <Shield className="w-12 h-12 mb-3" />
              <p className="text-sm">Enter a token to decode its contents.</p>
            </div>
          )}
        </div>
      </div>
    </ToolWrapper>
  );
};
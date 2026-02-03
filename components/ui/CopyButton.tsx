import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { Button } from './Button';

interface CopyButtonProps {
  text: string;
}

export const CopyButton: React.FC<CopyButtonProps> = ({ text }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <Button variant="ghost" size="sm" onClick={handleCopy} title="Copy to clipboard">
      {copied ? <Check className="w-4 h-4 text-accent" /> : <Copy className="w-4 h-4" />}
      <span className="sr-only">Copy</span>
    </Button>
  );
};
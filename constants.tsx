import React from 'react';
import { 
  FileJson, 
  Binary, 
  Fingerprint, 
  Clock, 
  Regex, 
  FileText, 
  Link
} from 'lucide-react';
import { ToolDef, ToolId } from './types';
import { JsonFormatter } from './components/tools/JsonFormatter';
import { Base64Converter } from './components/tools/Base64Converter';
import { UuidGenerator } from './components/tools/UuidGenerator';
import { TimestampConverter } from './components/tools/TimestampConverter';
import { RegexTester } from './components/tools/RegexTester';
import { MarkdownPreview } from './components/tools/MarkdownPreview';
import { UrlEncoder } from './components/tools/UrlEncoder';

export const TOOLS: ToolDef[] = [
  {
    id: ToolId.JSON,
    name: 'JSON Formatter',
    description: 'Prettify or minify JSON with error validation.',
    icon: FileJson,
    component: <JsonFormatter />
  },
  {
    id: ToolId.BASE64,
    name: 'Base64 Converter',
    description: 'Encode and decode Base64 strings.',
    icon: Binary,
    component: <Base64Converter />
  },
  {
    id: ToolId.UUID,
    name: 'UUID Generator',
    description: 'Generate standard UUID v4 identifiers.',
    icon: Fingerprint,
    component: <UuidGenerator />
  },
  {
    id: ToolId.TIMESTAMP,
    name: 'Timestamp Converter',
    description: 'Convert between Unix timestamps and Dates.',
    icon: Clock,
    component: <TimestampConverter />
  },
  {
    id: ToolId.REGEX,
    name: 'Regex Tester',
    description: 'Test regular expressions in real-time.',
    icon: Regex,
    component: <RegexTester />
  },
  {
    id: ToolId.MARKDOWN,
    name: 'Markdown Preview',
    description: 'Live preview editor for Markdown syntax.',
    icon: FileText,
    component: <MarkdownPreview />
  },
  {
    id: ToolId.URL_ENCODE,
    name: 'URL Encoder',
    description: 'Encode or decode URL parameters.',
    icon: Link,
    component: <UrlEncoder />
  }
];
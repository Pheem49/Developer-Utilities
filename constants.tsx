import React from 'react';
import { 
  FileJson, 
  Binary, 
  Fingerprint, 
  Clock, 
  Regex, 
  FileText, 
  Link,
  Shield,
  Hash,
  Type,
  KeyRound,
  Scaling
} from 'lucide-react';
import { ToolDef, ToolId } from './types';
import { JsonFormatter } from './components/tools/JsonFormatter';
import { Base64Converter } from './components/tools/Base64Converter';
import { UuidGenerator } from './components/tools/UuidGenerator';
import { TimestampConverter } from './components/tools/TimestampConverter';
import { RegexTester } from './components/tools/RegexTester';
import { MarkdownPreview } from './components/tools/MarkdownPreview';
import { UrlEncoder } from './components/tools/UrlEncoder';
import { JwtDecoder } from './components/tools/JwtDecoder';
import { HashGenerator } from './components/tools/HashGenerator';
import { LoremIpsum } from './components/tools/LoremIpsum';
import { PasswordGenerator } from './components/tools/PasswordGenerator';
import { CssUnitConverter } from './components/tools/CssUnitConverter';

export const TOOLS: ToolDef[] = [
  {
    id: ToolId.JSON,
    name: 'JSON Formatter',
    description: 'Prettify or minify JSON with error validation.',
    icon: FileJson,
    component: <JsonFormatter />
  },
  {
    id: ToolId.JWT,
    name: 'JWT Decoder',
    description: 'Decode JSON Web Tokens and view claims.',
    icon: Shield,
    component: <JwtDecoder />
  },
  {
    id: ToolId.BASE64,
    name: 'Base64 Converter',
    description: 'Encode and decode Base64 strings.',
    icon: Binary,
    component: <Base64Converter />
  },
  {
    id: ToolId.HASH,
    name: 'Hash Generator',
    description: 'Calculate MD5, SHA-1, SHA-256 checksums.',
    icon: Hash,
    component: <HashGenerator />
  },
  {
    id: ToolId.PASSWORD,
    name: 'Password Generator',
    description: 'Create secure, random passwords locally.',
    icon: KeyRound,
    component: <PasswordGenerator />
  },
  {
    id: ToolId.UUID,
    name: 'UUID Generator',
    description: 'Generate standard UUID v4 identifiers.',
    icon: Fingerprint,
    component: <UuidGenerator />
  },
  {
    id: ToolId.CSS_UNIT,
    name: 'CSS Unit Converter',
    description: 'Convert between Pixels and REM units.',
    icon: Scaling,
    component: <CssUnitConverter />
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
  },
  {
    id: ToolId.LOREM,
    name: 'Lorem Ipsum',
    description: 'Generate placeholder text for UI/UX design.',
    icon: Type,
    component: <LoremIpsum />
  }
];
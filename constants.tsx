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
  Scaling,
  Layers,
  Palette,
  FileCode,
  QrCode,
  Lock,
  Database,
  Server
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
import { GradientGenerator } from './components/tools/graphics/GradientGenerator';
import { BoxShadowGenerator } from './components/tools/graphics/BoxShadowGenerator';
import { ColorConverter } from './components/tools/graphics/ColorConverter';
import { SvgOptimizer } from './components/tools/graphics/SvgOptimizer';
import { QrCodeGenerator } from './components/tools/graphics/QrCodeGenerator';

import { ChmodCalculator } from './components/tools/devops/ChmodCalculator';
import { CronGenerator } from './components/tools/devops/CronGenerator';
import { SqlFormatter } from './components/tools/devops/SqlFormatter';
import { DockerfileGenerator } from './components/tools/devops/DockerfileGenerator';

export const TOOLS: ToolDef[] = [
  {
    id: ToolId.CHMOD,
    name: 'Chmod Calculator',
    description: 'Calculate numeric (octal) and symbolic (rwx) file permissions for Linux/Unix systems.',
    icon: Lock,
    component: <ChmodCalculator />,
    category: 'API & DevOps'
  },
  {
    id: ToolId.CRON,
    name: 'Cron Generator',
    description: 'Parse, validate, and convert cron schedule expressions into human-readable descriptions.',
    icon: Clock,
    component: <CronGenerator />,
    category: 'API & DevOps'
  },
  {
    id: ToolId.SQL,
    name: 'SQL Formatter',
    description: 'Format, beautify, and minify SQL queries with support for various dialects.',
    icon: Database,
    component: <SqlFormatter />,
    category: 'API & DevOps'
  },
  {
    id: ToolId.DOCKER,
    name: 'Dockerfile Generator',
    description: 'Generate optimized Dockerfiles for Node.js, Python, Go, and other common languages.',
    icon: Server,
    component: <DockerfileGenerator />,
    category: 'API & DevOps'
  },
  {
    id: ToolId.GRADIENT,
    name: 'Gradient Generator',
    description: 'Create and customize beautiful linear and radial CSS gradients visually.',
    icon: Palette,
    component: <GradientGenerator />,
    category: 'UI & Graphics'
  },
  {
    id: ToolId.BOX_SHADOW,
    name: 'Box Shadow Generator',
    description: 'Design complex, layered CSS box shadows with a real-time visual preview.',
    icon: Layers,
    component: <BoxShadowGenerator />,
    category: 'UI & Graphics'
  },
  {
    id: ToolId.COLOR_CONVERTER,
    name: 'Color Converter',
    description: 'Convert colors between HEX, RGB, HSL, and CMYK formats with live preview.',
    icon: Palette,
    component: <ColorConverter />,
    category: 'UI & Graphics'
  },
  {
    id: ToolId.SVG_OPTIMIZER,
    name: 'SVG Optimizer',
    description: 'Minify and clean up SVG code to reduce file size for web usage.',
    icon: FileCode,
    component: <SvgOptimizer />,
    category: 'UI & Graphics'
  },
  {
    id: ToolId.QR_CODE,
    name: 'QR Code Generator',
    description: 'Generate customizable QR codes for URLs, text, Wi-Fi, and more.',
    icon: QrCode,
    component: <QrCodeGenerator />,
    category: 'UI & Graphics'
  },
  {
    id: ToolId.JSON,
    name: 'JSON Formatter',
    description: 'Format, validate, minify, and explore JSON data with error highlighting.',
    icon: FileJson,
    component: <JsonFormatter />,
    category: 'Data & Code Formatting'
  },
  {
    id: ToolId.JWT,
    name: 'JWT Decoder',
    description: 'Decode JSON Web Tokens (JWT) to view header and payload claims.',
    icon: Shield,
    component: <JwtDecoder />,
    category: 'Security & Encoding'
  },
  {
    id: ToolId.BASE64,
    name: 'Base64 Converter',
    description: 'Encode text to Base64 and decode Base64 strings back to UTF-8 text.',
    icon: Binary,
    component: <Base64Converter />,
    category: 'Data & Code Formatting'
  },
  {
    id: ToolId.HASH,
    name: 'Hash Generator',
    description: 'Calculate cryptographic, one-way hashes (MD5, SHA-1, SHA-256) for text input.',
    icon: Hash,
    component: <HashGenerator />,
    category: 'Security & Encoding'
  },
  {
    id: ToolId.PASSWORD,
    name: 'Password Generator',
    description: 'Generate strong, secure, and random passwords with custom parameters.',
    icon: KeyRound,
    component: <PasswordGenerator />,
    category: 'Security & Encoding'
  },
  {
    id: ToolId.UUID,
    name: 'UUID Generator',
    description: 'Generate cryptographically secure Version 4 Universally Unique Identifiers (UUIDs).',
    icon: Fingerprint,
    component: <UuidGenerator />,
    category: 'Data & Code Formatting'
  },
  {
    id: ToolId.CSS_UNIT,
    name: 'CSS Unit Converter',
    description: 'Convert CSS units between Pixels (px) and REM/EM based on base font size.',
    icon: Scaling,
    component: <CssUnitConverter />,
    category: 'Frontend Development'
  },
  {
    id: ToolId.TIMESTAMP,
    name: 'Timestamp Converter',
    description: 'Convert between Unix timestamps (seconds/millis) and human-readable dates.',
    icon: Clock,
    component: <TimestampConverter />,
    category: 'Data & Code Formatting'
  },
  {
    id: ToolId.REGEX,
    name: 'Regex Tester',
    description: 'Test and validate regular expressions against text strings in real-time.',
    icon: Regex,
    component: <RegexTester />,
    category: 'Data & Code Formatting'
  },
  {
    id: ToolId.MARKDOWN,
    name: 'Markdown Preview',
    description: 'Write and preview Markdown content with split-pane editing and export options.',
    icon: FileText,
    component: <MarkdownPreview />,
    category: 'Frontend Development'
  },
  {
    id: ToolId.URL_ENCODE,
    name: 'URL Encoder',
    description: 'Encode text to URL-safe format and decode URL-encoded strings.',
    icon: Link,
    component: <UrlEncoder />,
    category: 'Data & Code Formatting'
  },
  {
    id: ToolId.LOREM,
    name: 'Lorem Ipsum',
    description: 'Generate placeholder text (Lorem Ipsum) for prototyping and layout design.',
    icon: Type,
    component: <LoremIpsum />,
    category: 'UI & Graphics'
  }
];
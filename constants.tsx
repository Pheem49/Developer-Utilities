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
    description: 'Calculate numeric and symbolic linux file permissions.',
    icon: Lock,
    component: <ChmodCalculator />,
    category: 'API & DevOps'
  },
  {
    id: ToolId.CRON,
    name: 'Cron Generator',
    description: 'Parse and validate cron schedule expressions.',
    icon: Clock,
    component: <CronGenerator />,
    category: 'API & DevOps'
  },
  {
    id: ToolId.SQL,
    name: 'SQL Formatter',
    description: 'Format and prettify SQL queries for various dialects.',
    icon: Database,
    component: <SqlFormatter />,
    category: 'API & DevOps'
  },
  {
    id: ToolId.DOCKER,
    name: 'Dockerfile Generator',
    description: 'Generate basic Dockerfiles for common languages.',
    icon: Server,
    component: <DockerfileGenerator />,
    category: 'API & DevOps'
  },
  {
    id: ToolId.GRADIENT,
    name: 'Gradient Generator',
    description: 'Create linear and radial gradients with a visual editor.',
    icon: Palette,
    component: <GradientGenerator />,
    category: 'UI & Graphics'
  },
  {
    id: ToolId.BOX_SHADOW,
    name: 'Box Shadow Generator',
    description: 'Design complex CSS box shadows visually.',
    icon: Layers,
    component: <BoxShadowGenerator />,
    category: 'UI & Graphics'
  },
  {
    id: ToolId.COLOR_CONVERTER,
    name: 'Color Converter',
    description: 'Convert between HEX, RGB, HSL, and CMYK formats.',
    icon: Palette,
    component: <ColorConverter />,
    category: 'UI & Graphics'
  },
  {
    id: ToolId.SVG_OPTIMIZER,
    name: 'SVG Optimizer',
    description: 'Minify and clean up SVG code for the web.',
    icon: FileCode,
    component: <SvgOptimizer />,
    category: 'UI & Graphics'
  },
  {
    id: ToolId.QR_CODE,
    name: 'QR Code Generator',
    description: 'Generate customizable QR codes for URLs and text.',
    icon: QrCode,
    component: <QrCodeGenerator />,
    category: 'UI & Graphics'
  },
  {
    id: ToolId.JSON,
    name: 'JSON Formatter',
    description: 'Prettify or minify JSON with error validation.',
    icon: FileJson,
    component: <JsonFormatter />,
    category: 'Data & Code Formatting'
  },
  {
    id: ToolId.JWT,
    name: 'JWT Decoder',
    description: 'Decode JSON Web Tokens and view claims.',
    icon: Shield,
    component: <JwtDecoder />,
    category: 'Security & Encoding'
  },
  {
    id: ToolId.BASE64,
    name: 'Base64 Converter',
    description: 'Encode and decode Base64 strings.',
    icon: Binary,
    component: <Base64Converter />,
    category: 'Data & Code Formatting'
  },
  {
    id: ToolId.HASH,
    name: 'Hash Generator',
    description: 'Calculate MD5, SHA-1, SHA-256 checksums.',
    icon: Hash,
    component: <HashGenerator />,
    category: 'Security & Encoding'
  },
  {
    id: ToolId.PASSWORD,
    name: 'Password Generator',
    description: 'Create secure, random passwords locally.',
    icon: KeyRound,
    component: <PasswordGenerator />,
    category: 'Security & Encoding'
  },
  {
    id: ToolId.UUID,
    name: 'UUID Generator',
    description: 'Generate standard UUID v4 identifiers.',
    icon: Fingerprint,
    component: <UuidGenerator />,
    category: 'Data & Code Formatting'
  },
  {
    id: ToolId.CSS_UNIT,
    name: 'CSS Unit Converter',
    description: 'Convert between Pixels and REM units.',
    icon: Scaling,
    component: <CssUnitConverter />,
    category: 'Frontend Development'
  },
  {
    id: ToolId.TIMESTAMP,
    name: 'Timestamp Converter',
    description: 'Convert between Unix timestamps and Dates.',
    icon: Clock,
    component: <TimestampConverter />,
    category: 'Data & Code Formatting'
  },
  {
    id: ToolId.REGEX,
    name: 'Regex Tester',
    description: 'Test regular expressions in real-time.',
    icon: Regex,
    component: <RegexTester />,
    category: 'Data & Code Formatting'
  },
  {
    id: ToolId.MARKDOWN,
    name: 'Markdown Preview',
    description: 'Live preview editor for Markdown syntax.',
    icon: FileText,
    component: <MarkdownPreview />,
    category: 'Frontend Development'
  },
  {
    id: ToolId.URL_ENCODE,
    name: 'URL Encoder',
    description: 'Encode or decode URL parameters.',
    icon: Link,
    component: <UrlEncoder />,
    category: 'Data & Code Formatting'
  },
  {
    id: ToolId.LOREM,
    name: 'Lorem Ipsum',
    description: 'Generate placeholder text for UI/UX design.',
    icon: Type,
    component: <LoremIpsum />,
    category: 'UI & Graphics'
  }
];
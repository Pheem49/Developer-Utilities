import React from 'react';
import { LucideIcon } from 'lucide-react';

export enum ToolId {
  HOME = 'home',
  JSON = 'json',
  BASE64 = 'base64',
  UUID = 'uuid',
  TIMESTAMP = 'timestamp',
  REGEX = 'regex',
  MARKDOWN = 'markdown',
  URL_ENCODE = 'url-encode',
  JWT = 'jwt',
  HASH = 'hash',
  LOREM = 'lorem',
  PASSWORD = 'password',
  CSS_UNIT = 'css-unit',
  GRADIENT = 'gradient',
  BOX_SHADOW = 'box-shadow',
  COLOR_CONVERTER = 'color-converter',
  SVG_OPTIMIZER = 'svg-optimizer',
  QR_CODE = 'qr-code',
  CHMOD = 'chmod',
  CRON = 'cron',
  SQL = 'sql',
  DOCKER = 'docker',
}

export type ToolCategory = 'All' | 'Frontend Development' | 'UI & Graphics' | 'Data & Code Formatting' | 'Security & Encoding' | 'API & DevOps';

export interface ToolDef {
  id: ToolId;
  name: string;
  description: string;
  icon: LucideIcon;
  component: React.ReactNode;
  category: ToolCategory;
}
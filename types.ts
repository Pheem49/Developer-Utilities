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
}

export interface ToolDef {
  id: ToolId;
  name: string;
  description: string;
  icon: LucideIcon;
  component: React.ReactNode;
}
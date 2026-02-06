/**
 * CLI 配置管理
 */
import dotenv from 'dotenv';
import path from 'path';
import type { CliConfig } from '../types';

dotenv.config();

/**
 * 加载配置
 */
export const loadConfig = (configPath?: string): Partial<CliConfig> => {
  const env = dotenv.config({
    path: configPath || process.cwd() + '/.env.cli',
  });

  return {
    name: env.parsed?.CLI_NAME || 'demo-cli',
    description: env.parsed?.CLI_DESCRIPTION,
    author: env.parsed?.CLI_AUTHOR,
    outputFormat: (env.parsed?.CLI_OUTPUT || 'json') as 'json' | 'text' | 'markdown',
    debug: env.parsed?.CLI_DEBUG === 'true',
  };
};

/**
 * 保存配置
 */
export const saveConfig = (config: Partial<CliConfig>, configPath?: string): void => {
  const configLines: string[] = [];

  if (config.name) configLines.push(`CLI_NAME=${config.name}`);
  if (config.description) configLines.push(`CLI_DESCRIPTION=${config.description}`);
  if (config.author) configLines.push(`CLI_AUTHOR=${config.author}`);
  if (config.outputFormat) configLines.push(`CLI_OUTPUT=${config.outputFormat}`);
  if (config.debug !== undefined) configLines.push(`CLI_DEBUG=${config.debug}`);

  const fs = require('fs');
  const outputPath = configPath || path.join(process.cwd(), '.env.cli');

  fs.writeFileSync(outputPath, configLines.join('\n'));
};

/**
 * 获取配置文件路径
 */
export const getConfigPath = (): string => {
  return path.join(process.cwd(), '.env.cli');
};

import chalk from 'chalk';
import ora from 'ora';
import type { CommandOptions, ProgressInfo } from '../types';

/**
 * 日志工具
 */
export const logger = {
  info: (message: string) => {
    console.log(chalk.blue('ℹ'), message);
  },

  success: (message: string) => {
    console.log(chalk.green('✓'), message);
  },

  error: (message: string) => {
    console.error(chalk.red('✗'), message);
  },

  warn: (message: string) => {
    console.warn(chalk.yellow('⚠'), message);
  },

  debug: (message: string, options?: CommandOptions) => {
    if (options?.verbose) {
      console.log(chalk.gray('[DEBUG]'), message);
    }
  },
};

/**
 * 创建加载动画
 */
export const createSpinner = (text: string) => {
  return ora({
    text,
    color: 'cyan',
    spinner: 'dots',
  });
};

/**
 * 显示进度条
 */
export const showProgress = (info: ProgressInfo) => {
  const percentage = Math.floor((info.current / info.total) * 100);

  const progressBar = '█'.repeat(Math.floor(percentage / 5)) +
    '░'.repeat(20 - Math.floor(percentage / 5));

  console.log(
    chalk.cyan(`[${percentage}%]`),
    progressBar,
    chalk.gray(`(${info.current}/${info.total})`),
    info.message,
  );
};

/**
 * 格式化输出
 */
export const formatOutput = <T>(
  data: T,
  format?: string,
): void => {
  if (!format || format === 'json') {
    console.log(JSON.stringify(data, null, 2));
  } else if (format === 'markdown') {
    console.log(formatAsMarkdown(data));
  } else {
    console.log(formatAsText(data));
  }
};

/**
 * 格式化为 Markdown
 */
const formatAsMarkdown = <T>(data: T): string => {
  return `\`\`\`\`\n${JSON.stringify(data, null, 2)}\n\`\`\``;
};

/**
 * 格式化为文本
 */
const formatAsText = <T>(data: T): string => {
  return JSON.stringify(data, null, 2);
};

/**
 * 确认提示
 */
export const confirm = async (message: string): Promise<boolean> => {
  const inquirer = await import('inquirer');
  const { confirm } = await inquirer.default;

  const { confirmed } = await confirm({
    message,
    type: 'confirm',
    name: 'confirmed',
    default: false,
  });

  return confirmed;
};

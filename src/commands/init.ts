import { Command } from 'commander';
import chalk from 'chalk';
import ora from 'ora';
import type { CommandOptions } from '../types';
import { logger, createSpinner } from '../lib/logger';

export const initCommand = new Command('init')
  .description('Initialize a new project')
  .option('-n, --name <name>', 'Project name')
  .option('-d, --description <desc>', 'Project description')
  .option('--template <template>', 'Template to use', 'default')
  .option('-f, --force', 'Force initialization')
  .option('-v, --verbose', 'Verbose output')
  .action(async (options: CommandOptions) => {
    logger.info('Initializing new project...');

    const spinner = createSpinner('Creating project structure');
    spinner.start();

    try {
      // 模拟项目初始化
      await simulateInit(options);

      spinner.succeed('Project initialized successfully!');

      logger.success(`Project: ${chalk.bold(options.name || 'demo-project')}`);
      if (options.description) {
        logger.success(`Description: ${options.description}`);
      }
      logger.success(`Template: ${options.template || 'default'}`);

      logger.info('\nNext steps:');
      logger.info('  1. cd ' + (options.name || 'demo-project'));
      logger.info('  2. npm install');
      logger.info('  3. npm run dev');

    } catch (error) {
      spinner.fail('Initialization failed');
      logger.error(error instanceof Error ? error.message : 'Unknown error');

      if (!options.force) {
        logger.warn('Use --force to override existing files');
      }
    }
  });

/**
 * 模拟初始化过程
 */
async function simulateInit(options: CommandOptions): Promise<void> {
  logger.debug('Starting initialization...', options);

  // 模拟创建目录结构
  await new Promise(resolve => setTimeout(resolve, 1000));

  // 模拟创建文件
  await new Promise(resolve => setTimeout(resolve, 500));

  // 模拟配置生成
  await new Promise(resolve => setTimeout(resolve, 500));

  logger.debug('Initialization complete', options);
}

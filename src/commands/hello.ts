import { Command, Option } from 'commander';
import chalk from 'chalk';
import type { CommandOptions } from '../types';
import { logger, formatOutput } from '../lib/logger';

export const helloCommand = new Command('hello')
  .description('Say hello to someone')
  .addOption(
    new Option('-n, --name <name>', 'Name to greet')
      .env('DEMO_NAME')
      .default('World')
  )
  .addOption(
    new Option('-g, --greeting <msg>', 'Custom greeting message')
      .default('Hello')
  )
  .addOption(
    new Option('-o, --output <format>', 'Output format')
      .choices(['json', 'text', 'markdown'])
      .default('text')
  )
  .option('-v, --verbose', 'Verbose output')
  .action((options: CommandOptions & { name?: string; greeting?: string }) => {
    const message = `${options.greeting}, ${options.name || 'World'}!`;
    const timestamp = new Date().toISOString();

    logger.debug('Executing hello command', { verbose: options.verbose });

    const result = {
      message,
      timestamp,
      greeting: options.greeting,
      name: options.name,
    };

    logger.success(chalk.bold(message));

    if (options.verbose) {
      logger.info(`Greeting: ${options.greeting}`);
      logger.info(`Name: ${options.name}`);
      logger.info(`Timestamp: ${timestamp}`);
    }

    // 格式化输出
    formatOutput(result, options.output);
  });

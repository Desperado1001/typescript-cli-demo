import { Command } from 'commander';
import chalk from 'chalk';
import ora from 'ora';
import axios from 'axios';
import type { CommandOptions, ApiResponse } from '../types';
import { logger, createSpinner, showProgress } from '../lib/logger';

export const fetchCommand = new Command('fetch')
  .description('Fetch data from an API')
  .argument('<url>', 'URL to fetch')
  .option('-o, --output <file>', 'Output file path')
  .option('-f, --format <format>', 'Output format')
    .choices(['json', 'text'])
    .default('json')
  .option('-t, --timeout <seconds>', 'Request timeout', '30')
  .option('-v, --verbose', 'Verbose output')
  .action(async (url: string, options: CommandOptions) => {
    logger.info(`Fetching from: ${chalk.cyan(url)}`);

    const spinner = createSpinner('Downloading data');
    spinner.start();

    try {
      // 模拟进度
      let progress = { current: 0, total: 100, message: 'Connecting...' };
      showProgress(progress);

      // 发起 HTTP 请求
      const response = await axios.get(url, {
        timeout: parseInt(options.timeout || '30') * 1000,
        onDownloadProgress: (progressEvent) => {
          if (progressEvent.total) {
            progress = {
              current: progressEvent.loaded,
              total: progressEvent.total,
              message: 'Downloading...',
            };
            showProgress(progress);
          }
        },
      });

      spinner.succeed('Data fetched successfully!');

      // 显示结果
      const data: ApiResponse = {
        data: response.data,
        status: response.status,
        timestamp: new Date().toISOString(),
      };

      logger.success(`Status: ${response.status}`);
      logger.success(`Size: ${response.headers['content-length'] || 'Unknown'} bytes`);

      if (options.verbose) {
        logger.info('Response headers:');
        logger.info(JSON.stringify(response.headers, null, 2));
      }

      // 输出到文件或控制台
      if (options.output) {
        const fs = await import('fs/promises');
        const content = options.format === 'json'
          ? JSON.stringify(data, null, 2)
          : JSON.stringify(data, null, 2);
        await fs.writeFile(options.output, content);
        logger.success(`Saved to: ${chalk.bold(options.output)}`);
      } else {
        console.log(JSON.stringify(data, null, 2));
      }

    } catch (error) {
      spinner.fail('Fetch failed');
      if (axios.isAxiosError(error)) {
        const axiosError = error;
        logger.error(`Request failed: ${axiosError.message}`);
        if (axiosError.response) {
          logger.error(`Status: ${axiosError.response.status}`);
        }
      } else {
        logger.error(`Network error: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    }
  });

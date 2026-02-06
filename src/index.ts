import { Command } from 'commander';
import chalk from 'chalk';
import ora from 'ora';

import { version } from '../package.json';
import { initCommand } from './commands/init';
import { helloCommand } from './commands/hello';
import { fetchCommand } from './commands/fetch';

// CLI 程序入口
const program = new Command();

program
  .name('demo-cli')
  .description('A comprehensive TypeScript CLI learning demo')
  .version(version, '-v, --version')
  .addCommand(initCommand)
  .addCommand(helloCommand)
  .addCommand(fetchCommand);

// 解析命令行参数
program.parse(process.argv);

// 未提供命令时显示帮助
if (!process.argv.slice(2).length) {
  program.outputHelp();
}

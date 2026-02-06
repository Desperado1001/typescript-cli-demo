/**
 * CLI 配置类型定义
 */
export interface CliConfig {
  name: string;
  description?: string;
  author?: string;
  outputFormat: 'json' | 'text' | 'markdown';
  debug: boolean;
}

/**
 * 命令选项类型
 */
export interface CommandOptions {
  verbose?: boolean;
  force?: boolean;
  output?: string;
  outputDir?: string;
}

/**
 * API 响应类型
 */
export interface ApiResponse<T = unknown> {
  data: T;
  status: number;
  message?: string;
  timestamp: string;
}

/**
 * 任务进度信息
 */
export interface ProgressInfo {
  current: number;
  total: number;
  message: string;
  percentage: number;
}

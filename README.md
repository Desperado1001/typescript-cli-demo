# Demo CLI - TypeScript CLI 学习示例

<div align="center">

[![TypeScript](https://img.shields.io/badge/TypeScript-5.3+-blue.svg)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-20+-green.svg)](https://nodejs.org/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Commander.js](https://img.shields.io/badge/Commander.js-12.1+-ff69b4.svg)](https://github.com/tj/commander.js)

**一个综合性的 TypeScript CLI 工具学习项目，融合 Commander.js、Chalk、Ora、Inquirer 等最佳实践**

</div>

## 📖 项目简介

这是一个用于学习 TypeScript CLI 开发的完整示例项目，包含以下核心功能：

- ✅ **参数解析** - Commander.js 12.x
- ✅ **输出样式** - Chalk 彩色输出
- ✅ **加载动画** - Ora 进度提示
- ✅ **交互式输入** - Inquirer 选项确认
- ✅ **配置管理** - .env 文件支持
- ✅ **HTTP 请求** - Axios 集成
- ✅ **完整类型** - TypeScript 严格模式

## 🚀 快速开始

### 安装依赖

```bash
cd demo-cli
npm install
```

### 运行开发模式

```bash
npm run dev
```

### 构建生产版本

```bash
npm run build
npm start
```

## 📋 可用命令

### 1. `init` - 初始化项目

```bash
demo-cli init --name my-project --description "My awesome project"
```

**选项**：
- `-n, --name <name>` - 项目名称
- `-d, --description <desc>` - 项目描述
- `--template <template>` - 模板（默认：default）
- `-f, --force` - 强制覆盖
- `-v, --verbose` - 详细输出

**示例**：
```bash
# 默认初始化
demo-cli init

# 指定名称和描述
demo-cli init --name my-app --description "A demo application"

# 使用特定模板
demo-cli init --name my-app --template react
```

---

### 2. `hello` - 问候命令

```bash
demo-cli hello --name "Paolo" --greeting "你好"
```

**选项**：
- `-n, --name <name>` - 问候对象（环境变量：DEMO_NAME）
- `-g, --greeting <msg>` - 自定义问候语
- `-o, --output <format>` - 输出格式（json/text/markdown）
- `-v, --verbose` - 详细输出

**示例**：
```bash
# 默认问候
demo-cli hello

# 自定义名称
demo-cli hello --name "Alice"

# JSON 输出
demo-cli hello --name "Alice" --output json

# 使用环境变量
export DEMO_NAME="Bob"
demo-cli hello
```

---

### 3. `fetch` - 获取数据

```bash
demo-cli fetch https://api.example.com/data --output result.json
```

**选项**：
- `-o, --output <file>` - 输出文件路径
- `-f, --format <format>` - 输出格式（json/text）
- `-t, --timeout <seconds>` - 请求超时（默认：30秒）
- `-v, --verbose` - 详细输出

**示例**：
```bash
# 基础获取
demo-cli fetch https://api.github.com/users/github

# 保存到文件
demo-cli fetch https://api.github.com/users/github -o user.json

# 自定义超时
demo-cli fetch https://api.example.com/slow --timeout 60

# 详细模式
demo-cli fetch https://api.example.com/data --verbose
```

## 🏗 项目结构

```
demo-cli/
├── src/
│   ├── index.ts          # 程序入口
│   ├── commands/         # 命令实现
│   │   ├── init.ts
│   │   ├── hello.ts
│   │   └── fetch.ts
│   ├── lib/             # 工具函数
│   │   ├── logger.ts    # 日志和格式化
│   │   └── config.ts    # 配置管理
│   └── types/           # 类型定义
│       └── index.ts
├── package.json
├── tsconfig.json
├── README.md             # 本文件
└── .env.cli.example      # 配置示例
```

## 🔧 技术栈

- **框架**：Commander.js 12.1
- **类型**：TypeScript 5.3
- **样式**：Chalk 5.3
- **动画**：Ora 8.0
- **交互**：Inquirer 9.2
- **HTTP**：Axios 1.6
- **环境**：dotenv 16.4

## 📚 学习重点

### 1. Commander.js 参数解析

- ✅ 主命令和子命令架构
- ✅ 选项定义（短选项、长选项、环境变量）
- ✅ 参数类型验证
- ✅ 帮助文本自动生成

### 2. TypeScript 类型系统

- ✅ 接口定义（Config、Options、ApiResponse）
- ✅ 严格模式编译检查
- ✅ 泛型使用
- ✅ 类型导出

### 3. 异步处理

- ✅ Promise/async-await
- ✅ 错误处理（try-catch）
- ✅ 进度模拟（setTimeout + 状态更新）

### 4. 输出优化

- ✅ 彩色输出（Chalk）
- ✅ 加载动画（Ora）
- ✅ 多格式支持（JSON/Text/Markdown）
- ✅ 进度条显示

## 🎯 开发任务

- [x] 项目结构搭建
- [x] 三个核心命令（init、hello、fetch）
- [ ] 添加单元测试（Jest）
- [ ] 添加 ESLint + Prettier
- [ ] 添加 GitHub Actions CI
- [ ] 添加更多命令示例

## 📝 代码规范

- 使用 2 空格缩进
- 单引号优先
- 函数名用驼峰命名
- 类型定义单独文件
- 错误处理优先

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📄 License

MIT

---

<div align="center">

Made with ❤️ for TypeScript CLI learners

</div>

# DSH Chat Jump

`dsh-chat-jump` 是为 DeepSeek Harness 提供的**悬浮式「历史提问」快速跳转侧栏**插件（对话目录 / 进度指示器）。

```bash
dsh plugin --profile web add dsh-chat-jump
```

## 功能特性

- **对话目录**：汇总当前会话中的所有用户提问与时间戳；默认呈迷你指示条，悬停展开完整列表。
- **精准跳转**：点击提问项平滑滚动至对应消息并高亮反馈；若目标消息在更早的历史分页中，支持自动触发「加载更早」并完成定位。
- **滚动侦测（Scroll-spy）**：根据当前视图可视区域动态同步高亮当前对应的提问项。
- **快捷导航**：支持一键直达会话顶部与底部。
- **轻量挂载**：通过 `createPortal` 贴合在会话滚动区域右侧，视图离开时自动隐藏。

## 数据模式

组件支持两种数据接入方式：

```tsx
<ChatHistoryQuickJump
  messages={editableBlocks}      // 可选：消息数据列表
  retryableTurns={turns}         // 可选：轮次数据列表
/>
```

- **DOM 模式（默认）**：无需额外传参，组件自动从会话 DOM 解析提问列表与锚点，零配置开箱即用。
- **数据模式**：由控制器显式传入 `messages`（`EditableMessageBlock[]`）或 `retryableTurns`（`RetryableTurn[]`），基于结构化事件呈现更精确的时间与轮次信息。

## DOM 契约

在 DOM 模式下，组件通过以下标准属性识别会话结构：
- 会话流容器：`[data-chat-flow]`
- 用户消息项：`[data-chat-flow-kind="user"]` 或 `.userRow`
- 滚动容器：`[data-conversation-scroll]`

## 构建与开发

```bash
pnpm install
pnpm build         # 构建产物：index.mjs + client.js + client.js.map
```

- **Client Bundle**：符合 DSH 客户端规范，通过 `__ModuleLoader__` 加载，CSS Modules 经 lightningcss 编译并在运行时自动注入独立样式标签。
- **Host Bundle**：遵循 Cordis 插件规范注册。

## 目录结构

```
src/
  index.ts                      # 宿主插件入口
  shared.ts                     # 数据契约类型定义
  client/
    index.ts                    # 客户端入口（注册 Header 槽位）
    ChatJumpSlot.tsx            # 槽位挂载组件
    ChatHistoryQuickJump.tsx    # 快速跳转核心组件
    ChatHistoryQuickJump.module.css
```

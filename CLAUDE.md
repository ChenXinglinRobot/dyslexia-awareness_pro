# 字向每人 · 阅读障碍科普站

技术栈：Vite + React + TypeScript（`client/`）+ Express server；包管理器 pnpm；Tailwind v4 + shadcn/ui；framer-motion / GSAP / matter-js。

## 检查 / 验证（改完代码必看，**细节见 [Check.md](Check.md)**）

- `git diff --check` —— 空白 / 行尾低级问题
- `.\node_modules\.bin\pnpm.CMD run build`（或 `npm run build` / `npx vite build`）—— 主检查：构建是否通过
- 类型检查被 `tsconfig.json` 的 `ignoreDeprecations:"6.0"`（应为 5.0）+ 既有类型错误挡住；临时用 `npx tsc --noEmit --ignoreDeprecations 5.0` 并过滤到自己改的文件
- `pnpm` 非全局；沙箱里可能 EPERM，可用 `npm run` / `npx` 代替

> 常见可忽略构建噪音：`VITE_ANALYTICS` 未定义、`Some chunks are larger than 500 kB`。

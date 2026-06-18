# 检查 / 验证流程 (Check)

> 改完代码后的验证流程。`CLAUDE.md` 里有简短指针指向这里。
> 目的：避免每个会话 / 每个 agent 都重新踩坑。

## 已知会挡住检查的三个问题

1. **`pnpm` 不是全局命令**
   直接 `pnpm run …` 找不到命令。本地有 pnpm：
   - Windows: `.\node_modules\.bin\pnpm.CMD`
   - 也可用 `npx pnpm` / `npm run …` / `npx <工具>`（npm/npx 通常在 PATH 上；本仓库用 pnpm 管理但 npm 也能跑 scripts）。

2. **`pnpm` 在沙箱里写 AppData 缓存会 EPERM**
   报 `EPERM: … mkdir … AppData\Local\pnpm\.tools`。
   - 解法：提升权限跑本地 pnpm，或干脆用 `npm run` / `npx`（不走 pnpm 缓存）。

3. **`pnpm run check`（= `tsc --noEmit`）被配置 / 旧问题挡住**
   - `tsconfig.json` 第 16 行 `"ignoreDeprecations": "6.0"` 对当前 TypeScript **5.6.3** 无效（只认 `"5.0"`），直接报 `TS5103` 退出。
   - 即便临时覆盖 `npx tsc --noEmit --ignoreDeprecations 5.0`，仍有 **8 个既有类型错误**（与本次改动无关）：
     - `three` 缺类型 → `Antigravity.tsx` / `ASCIIText.tsx` / `ShapeBlur.tsx`
     - `matter-js` 缺类型 → `FallingText.tsx`
     - `Shuffle.tsx` 的 JSX namespace / 重载
     - `GameFilterBar.tsx` 的 Set 迭代
     - `ASCIIText.tsx` 隐式 any

## 日常推荐组合

```powershell
git diff --check                        # 空白 / 行尾 / 合并标记等低级问题
.\node_modules\.bin\pnpm.CMD run build  # 主检查：Vite + esbuild 构建是否通过
```

- `build` 脚本 = `vite build && esbuild server/index.ts …`，验证 Vite/React/JSX/CSS 构建是否成功。
- `vite build` 用 esbuild，**不做类型检查**，只转换/打包——「构建通过」≠「类型正确」。
- 等价非 pnpm 写法：`npm run build`，或只构建前端 `npx vite build`。

### 可忽略的构建噪音

```text
%VITE_ANALYTICS_ENDPOINT% is not defined
%VITE_ANALYTICS_WEBSITE_ID% is not defined
Some chunks are larger than 500 kB
```

过滤（PowerShell）：

```powershell
.\node_modules\.bin\pnpm.CMD run build 2>&1 |
  Select-String -NotMatch 'VITE_ANALYTICS|Some chunks are larger|chunkSizeWarningLimit|manualChunks'
```

## 可选：类型检查（带既有噪音）

只验证本次改动是否引入类型错误，过滤到自己改的文件（空输出 = 干净）：

```powershell
npx tsc --noEmit --ignoreDeprecations 5.0 2>&1 | Select-String -Pattern "TextPressure|UnderstandSection"
```

（把 `TextPressure|UnderstandSection` 换成你本次改的文件名。）

## 以后修复清单（修完即可把 `pnpm run check` 加回主流程）

- [ ] `tsconfig.json`: `"ignoreDeprecations": "6.0"` → `"5.0"`
- [ ] `pnpm add -D @types/three @types/matter-js`
- [ ] 修 `Shuffle.tsx`（JSX namespace）、`GameFilterBar.tsx`（Set 迭代 target）、`ASCIIText.tsx`（隐式 any）

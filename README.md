# Tide Biotech Showcase

本仓库包含 Tide Biotech Showcase 的可直接预览静态构建版本。

- `index.html`：已将生产构建的 CSS 与 JavaScript 内嵌，可直接通过 GitHub Pages 预览。
- `tide-biotech-source.zip`：完整源码归档（已排除依赖、构建产物与内部项目配置）。

本地源码构建要求 Node.js 与 pnpm；构建命令为 `pnpm install --frozen-lockfile && pnpm build`。

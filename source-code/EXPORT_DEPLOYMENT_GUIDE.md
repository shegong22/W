# Tide / Biotech Showcase 源码部署说明

## 项目概览

这是 Tide（肽德）英文优先的肽类制造商展示网站，技术栈包括 React 19、Vite、Tailwind CSS 4、Wouter、Express、tRPC、Drizzle ORM、MySQL/TiDB 和 Manus OAuth。项目包含公开展示页面、管理员询盘后台以及管理员图片资产管理后台。

## 环境要求

建议使用 Node.js 20 或更高版本、pnpm 10、MySQL/TiDB 数据库以及可用的 Manus WebDev 环境变量。项目不会把数据库密码或 OAuth 密钥写入源码；部署时请在平台的 Secrets / Environment Variables 中配置。

## 本地安装与运行

```bash
pnpm install
pnpm check
pnpm test
pnpm build
pnpm dev
```

开发服务器启动后，访问 `http://localhost:3000`。不要在源码中硬编码生产端口，部署平台会注入运行端口。

## 必需环境变量

请配置模板提供的 `DATABASE_URL`、`JWT_SECRET`、`VITE_APP_ID`、`OAUTH_SERVER_URL`、`VITE_OAUTH_PORTAL_URL`、`OWNER_OPEN_ID`、`OWNER_NAME`、`BUILT_IN_FORGE_API_URL` 和 `BUILT_IN_FORGE_API_KEY`。图片上传依赖平台内置 S3 存储辅助函数，不需要单独填写 S3 密钥。

## 数据库

项目已包含 `drizzle/schema.ts` 和迁移文件。首次部署时先确认 `DATABASE_URL`，然后执行：

```bash
pnpm drizzle-kit generate
```

生成或确认迁移后，再通过目标平台的数据库迁移流程应用 SQL。核心表包括 `users`、`inquiries` 和 `media_assets`。不要在生产环境执行破坏性删除操作。

## 管理员入口

登录 Manus OAuth 后，管理员可访问：

- `/admin/inquiries`：查看 Contact 页面提交的客户询盘。
- `/admin/media`：管理 Home、Products、About 和工厂证据图片。

图片后台支持按分类筛选、预览、上传、同 slot 替换和删除。删除管理记录后，前台会回退到代码中的默认图片；上传和替换时请使用已有 slot 名称以覆盖对应位置。

## 图片资源说明

前台默认图片使用平台 `/manus-storage/` URL，动态管理图片保存在 `media_assets` 表中。项目源码不依赖本地大文件，因此部署包不会包含 `node_modules`、`dist` 或视频原文件。若要新增图片，请通过 `/admin/media` 上传，而不是把大图片放入 `client/public`。

## 生产构建与启动

```bash
pnpm build
pnpm start
```

部署前请确认 `pnpm check`、`pnpm test` 和 `pnpm build` 均通过，并在生产环境登录管理员账号验证 `/admin/media` 与 `/admin/inquiries`。

## 当前稳定版本

本源码导出对应 Tide 项目最新稳定检查点 `97ad2fb7`。该版本包含图片资产管理后台、客户询盘数据库与管理员查看页面，以及首页、Products 和 About 的动态图片读取与默认回退逻辑。

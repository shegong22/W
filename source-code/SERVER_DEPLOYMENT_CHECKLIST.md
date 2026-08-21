# Tide 网站服务器搭建清单

## 交付内容

本包是完整项目源码，不包含 `node_modules` 和 `dist` 构建产物，因为这些内容应在目标服务器按当前 `package.json` 和 `pnpm-lock.yaml` 重新安装、构建。源码包含 React 前端、Express/tRPC 后端、Drizzle 数据库 schema 与迁移、Manus OAuth 认证、询盘后台 `/admin/inquiries`、图片管理后台 `/admin/media` 以及现有配置文件。

## 推荐部署顺序

在服务器安装 Node.js 20+、pnpm 10 和 MySQL/TiDB。解压后执行：

```bash
pnpm install --frozen-lockfile
pnpm check
pnpm test
pnpm build
```

配置环境变量后执行数据库迁移，再使用：

```bash
pnpm start
```

反向代理应把外部域名转发到 Node 进程，并启用 HTTPS。生产端口由平台或环境变量控制，不要在源码中固定端口。

## 必须配置的环境变量

至少需要 `DATABASE_URL`、`JWT_SECRET`、`VITE_APP_ID`、`OAUTH_SERVER_URL`、`VITE_OAUTH_PORTAL_URL`、`OWNER_OPEN_ID`、`OWNER_NAME`、`BUILT_IN_FORGE_API_URL`、`BUILT_IN_FORGE_API_KEY`、`VITE_FRONTEND_FORGE_API_URL` 和 `VITE_FRONTEND_FORGE_API_KEY`。访问统计如需启用，还应配置 `VITE_ANALYTICS_ENDPOINT` 与 `VITE_ANALYTICS_WEBSITE_ID`。

## 数据库迁移

请先确认 `DATABASE_URL` 指向目标数据库，然后运行：

```bash
pnpm drizzle-kit generate
```

审阅生成的 SQL 后，通过目标平台的迁移流程执行。核心业务表为 `users`、`inquiries` 和 `media_assets`。管理员权限依赖 `users.role = 'admin'`，首次部署后需要把你的 Manus OAuth 用户提升为管理员。

## 图片资源与独立服务器限制

当前图片文件通过 Manus 内置 S3 兼容存储和 `/manus-storage/` 路径提供。若部署到 Manus WebDev，可直接使用现有配置。若部署到普通独立服务器，必须继续提供兼容的 Forge storage API，或将 `server/storage.ts` 改为你自己的 S3/R2/OSS 实现，并把现有图片资产迁移到新的存储后更新 `media_assets.url`。仅复制源码不会自动复制云端图片对象。

## 后台地址

管理员登录后访问 `/admin/inquiries` 查看客户询盘，访问 `/admin/media` 管理首页、Products、About 和工厂证据图片。图片替换使用相同 slot 名称；删除管理记录后，前台会回退到源码中的默认图片。

## 上线前检查

请确认 OAuth 回调域名已经加入 OAuth 应用配置，HTTPS、数据库连接、图片存储、管理员角色和 WhatsApp 链接均已验证。上线前建议依次提交一次 Contact 询盘、上传一张测试图片、替换一个已有 slot，再删除该测试资产并确认前台回退。

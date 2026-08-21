# Tide 自包含外部部署包

本版本针对 GitHub + 外部 Node.js/MySQL 服务器部署整理。网站当前新版实际使用的 70 个 Manus 存储图片/PDF/客户参观素材已下载到 `client/public/assets/`，前端引用已改为 `/assets/<filename>`，因此不再依赖原项目账号的 `/manus-storage/` 地址。

## 重要目录

`client/public/assets/` 包含当前新版页面实际引用的全部本地素材，包括 Hero、About、Laboratory、Services、COA、Feedback、Contact、客户参观、交付流程和 COA/PDF 文件。

## 部署步骤

在 `biotech-showcase/` 目录运行 `pnpm install`，然后按 `.env` 或服务器环境变量配置数据库、OAuth、JWT 和其他运行参数。执行数据库迁移后运行 `pnpm build`，再按服务器平台的 Node.js 启动方式启动服务。

## 媒体后台说明

`useManagedMedia` 会优先读取数据库中管理员上传的媒体。如果数据库记录仍指向旧的 `/manus-storage/` 地址，外部部署版会自动将其转换为本地 `/assets/` 路径；新的外部图片可继续使用有效的 HTTPS URL。

## 安全说明

不要把 `.env`、数据库密码、OAuth 密钥或 JWT 密钥提交到 GitHub。GitHub 用于保存源码，完整 CMS 和管理员后台需要支持 Node.js 与 MySQL 的运行环境。

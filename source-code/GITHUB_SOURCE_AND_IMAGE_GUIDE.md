# Tide 当前开发预览版：GitHub 源码与图片指南

本归档以当前开发预览版为准，网站源码和当前新版实际使用的图片一起提供，适合导入 GitHub 后再连接支持 Node.js 与 MySQL 的服务器部署。

## 源码位置

`biotech-showcase/` 是完整项目目录。前端页面在 `client/src/pages/`，共享导航与页脚在 `client/src/components/SiteLayout.tsx`，后端路由在 `server/routers.ts`，数据库结构在 `drizzle/schema.ts`，全站文案后台在 `client/src/pages/CopyAdmin.tsx`。

## 图片位置

`biotech-showcase/client/public/assets/` 是 GitHub/外部服务器使用的本地静态图片目录。网页代码使用 `/assets/文件名` 读取图片。当前新版实际使用的 70 个图片、客户参观素材、COA/PDF 文件和 Logo 已放入这里。

`project-assets/` 是全部素材备份目录，包含从当前项目资源目录整理出的完整本地素材。它用于后续重新选择图片或迁移，不是网页运行时必须读取的目录。

## 后续替换图片

如果要替换某个模块的图片，先把新文件放入 `biotech-showcase/client/public/assets/`，使用唯一、清晰的英文文件名，例如 `services-new-coa-review.jpg`。然后在对应页面的图片数组或 `fallback` 配置中，把旧文件名替换成新文件名；页面仍使用 `/assets/新文件名` 路径。页面和用途对应关系见 `IMAGE_RESOURCE_MAP.md`。

不要把图片放在 `client/src/`，也不要只修改 `project-assets/` 后期待网页自动变化。新图片必须进入 `client/public/assets/`，并在对应页面源码中更新引用。

## GitHub 与全功能部署

将 `biotech-showcase/` 上传到 GitHub 后，GitHub 负责保存源码。全功能网站仍需要 Node.js 后端、MySQL 数据库、环境变量和安全的文件/资源配置；不能只使用 GitHub Pages 运行 CMS 和管理员后台。

请勿提交 `.env`、数据库密码、OAuth 密钥或 JWT 密钥。部署前运行 `pnpm install`、数据库迁移、`pnpm check` 和 `pnpm build`。

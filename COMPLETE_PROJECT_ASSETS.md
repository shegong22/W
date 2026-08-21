# Tide 完整项目与素材归档

本归档包含当前 Tide 项目的完整可编辑源码，以及项目使用过的本地图片、视频帧、COA/PDF 文档和其他 WebDev 资源素材。

## 目录说明

`biotech-showcase/` 是网站项目源码，包含前端、后端、Drizzle 数据库结构、CMS 管理后台、测试文件、配置文件和部署文档。

`project-assets/` 是从 `/home/ubuntu/webdev-static-assets/` 复制的完整素材备份，包含实验室/工厂图片、客户参观素材、客户反馈与交付文件、COA 文件、产品相关素材和原始候选素材。网站当前使用项目资源存储 URL，素材备份用于迁移、重新上传或本地归档。

## 未包含内容

为了避免重复和不必要的体积，归档不包含 `node_modules`、生产构建目录 `dist`、Git 历史、开发日志以及系统密钥。依赖可以在项目目录中使用 `pnpm install` 重新安装；数据库连接、OAuth、JWT 和资源存储配置必须在部署平台的环境变量中重新设置。

## 版本

该归档对应项目检查点 `b73973a2`，导出时的项目代码已通过 TypeScript 检查、11 项 Vitest 测试和生产构建。

## 部署提示

请优先阅读 `EXPORT_DEPLOYMENT_GUIDE.md` 与 `SERVER_DEPLOYMENT_CHECKLIST.md`。GitHub 可以保存完整源码，但当前项目需要支持 Node.js 后端和 MySQL 的运行环境，不能只通过 GitHub Pages 运行 CMS 和管理员后台。

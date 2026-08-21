# Tide deployable source export

已完成：导出包包含当前英文版网站源码、配置和依赖锁定文件，所有引用的图片、Logo、COA 文件、产品资料和客户反馈/收货记录已下载到本地 assets；Manus storage 路径已改写为 `/assets/`，并已通过独立副本的生产构建。

- [x] Inventory project files and all image URLs used by the site.
- [x] Copy deployable source files and available image assets into an export directory.
- [x] Rewrite asset references where needed so the exported site can use local bundled images.
- [x] Add deployment instructions for Vite and static hosting.
- [x] Run the production build and inspect the packaged output.
- [x] Deliver the source-and-assets ZIP archive.

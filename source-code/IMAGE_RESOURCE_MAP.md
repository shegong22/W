# Tide 图片资源用途映射

以下映射以当前开发预览版实际使用的新版图片为准。所有运行时图片位于 `client/public/assets/`，网页路径统一为 `/assets/文件名`。

| 页面/模块 | 资源文件名或前缀 | 用途 | 后续替换位置 |
|---|---|---|---|
| 全站 Logo | `tide-logo_e4a10c2a.png` | 顶部导航、页脚、品牌动画 | `SiteLayout.tsx` 与 `BrandReveal` |
| 首页 Hero | `tide-lab-hero-cleanroom_ffb4f311.jpg`、`tide-lab-hero-synthesis_18f9f3f8.jpg`、`tide-lab-hero-batch_0a8104c6.jpg`、`tide-lab-hero-analytical_1e7ff08d.jpg` | 首页四组轮播 | `About.tsx` 的 `homeSlides` |
| 首页工厂/设施 | `asian-peptide-lab_cc4c7c7d.jpg`、`tide-about-rd-coordination_0c7c2f18.jpg`、`tide-about-controlled-cleanroom_30949468.jpg`、`tide-about-lyophilization-process_903a0427.jpg` | 工厂简介、设施概览和能力区 | `About.tsx` 的设施图片配置 |
| 首页订单流程 | `tide-order-quality-control_16f20e7b.jpg`、`tide-order-packaging_c385cde9.jpg`、`tide-order-factory-tour_a86d4ecd.jpg` | 订单、包装、工厂参观证据 | `About.tsx` 的订单/保障区 |
| Laboratory | `tide-laboratory-analytical-review_aacb7dfc.jpg`、`asian-cleanroom_8ac53ec9.jpg`、`freeze-drying_c92fc93a.jpg` | 实验室主图、洁净区、冻干流程 | `Laboratory.tsx` |
| Services | `peptide-molecule_8e60bd00.jpg`、`tide-service-coa-review_435fe835.jpg`、`tide-service-oem-coordination_a8ffb6ac.jpg`、`tide-service-packaging-dispatch_6563eebc.jpg`、`peptide-customization_f4e7c9b8.png`、`global-lab-logistics_8af05bdb.jpg` | 服务网格、COA、OEM/ODM、全球交付 | `Services.tsx` |
| COA Reports | `IMG_0528_1649ec7f.PNG` 至 `IMG_0547_528135c6.PNG` | Freedom 和 Janoshik 两类实验室报告 | `COA.tsx` 的报告数组 |
| COA 辅助文件 | `peptide-price_28c35eda.pdf` | 产品列表下载文件 | `COA.tsx` |
| Feedback | `feedback-1_0538cdc0.jpg` 至 `feedback-9_a8b89655.jpg` | 客户反馈文件 | `Feedback.tsx` 的 feedback 数组 |
| Delivery Records | `delivery-1_b2a1580f.jpg` 至 `delivery-9_a2a9308a.jpg` | 交付记录文件 | `Feedback.tsx` 的 delivery 数组 |
| Contact | 主要使用共享 Logo 和页面图形背景 | 联系表单、WhatsApp 和直接联系区 | `Contact.tsx` 与 `SiteLayout.tsx` |

## 替换规则

新图片放入 `client/public/assets/` 后，在对应页面源码中将旧文件名替换为新文件名。文件名应保持唯一并使用英文、数字、连字符或下划线。不要把新图片只放入 `project-assets/`，因为该目录是备份目录，不是运行时静态目录。

如果图片由后台媒体管理覆盖，优先检查数据库中的媒体槽位；外部部署版会把旧的 `/manus-storage/` 地址转换为本地 `/assets/` 路径。更换后台图片后，应同时确认文件已存在于 `client/public/assets/`，否则部署到另一台电脑后仍可能出现图片错误。

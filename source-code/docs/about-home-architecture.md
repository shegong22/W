# About 新首页信息架构

## 根入口定位

`/` 现在直接渲染 `client/src/pages/About.tsx`。About 不再是独立的辅助页面，而是 Tide 的主品牌入口；`/about` 保留为兼容地址并渲染同一组件。全局导航不再显示 Home，品牌 Logo 与 About 菜单均回到 `/`。

## 页面顺序

| 顺序 | 首页区块 | 内容来源 | 主要代码模块 | 目的 |
|---|---|---|---|---|
| 01 | About Tide 首屏 | 工厂定位与用户需求 | `PageHero` / `About.tsx` | 第一屏直接说明“peptide factory, not an intermediary”，明确 Guangzhou, China 与 72,000 m² |
| 02 | Factory Profile | 原有工厂介绍与 Word 文档规模信息 | `factory-intro-section` | 解释 Tide 如何连接产品、生产协调、批次文件和全球交付 |
| 03 | Facility Overview | Word 文档关于研发、生产、自动化和分析仪器的内容 | `facility-profile-section` | 以 72,000 m²、R&D、Manufacturing、Automation、Analytical Instrumentation 建立可信度 |
| 04 | Peptide Facility Field View | 现有实验室与生产环境模块 | `about-peptide-visuals` | 使用四张不同图片展示研发、洁净室、冻干和生产设备 |
| 05 | Factory Evidence | 真实广州工厂参观素材 | `client-visit-section` | 只展示亚洲工厂人员、设备讨论、过程观察与批次托盘，删除欧美访客画面 |
| 06 | Production Flow | 生产流程模块 | `production-flow-section` | 从合成、洁净生产、纯化/冻干到批次文件建立制造链路 |
| 07 | What We Do | 产品、生产协调、COA 和全球沟通 | `capability-section` | 把工厂服务能力拆成可快速理解的四类 |
| 08 | Quality Control | 可信度与文档核验原则 | `quality-section` | 强调产品信息匹配、COA、交付协调和售后跟进，而不是未经验证的认证口号 |
| 09 | OEM / ODM | 原有 OEM/ODM 流程 | `oem-section` | 通过需求提交、方案确认、文件复核和交付协调连接 WhatsApp/Contact |
| 10 | Secure Ordering & Shipping | `AboutOurPeptideLaboratory.docx` 全部订购步骤 | `about-order-section` | 纳入 Invoice Issuance、Payment Confirmation、Processing & Dispatch、Shipment Tracking、Final Delivery |
| 11 | Partnership Guarantees | Word 文档三项保障 | `about-guarantee-grid` | 纳入 Delivery Responsibility、Win-Win Partnership 和 On-Site Factory Tour，并以更审慎的订单安排措辞呈现 |
| 12 | Partnership Archive | 反馈与交付档案 | `about-feedback-bridge` | 以一张反馈图和一张交付图连接完整 Feedback 档案，避免首页重复堆叠 |

## 文档内容整合原则

Word 文档中的广州工厂、72,000 平方米、PhD-level scientists、experienced chemists、quality assurance professionals、简单二肽到 40+ 氨基酸复杂序列能力，已经进入首屏、Facility Overview 和 Laboratory 页。Word 文档中的五步订购与发货流程现在也正式进入根首页，三项合作保障位于该流程下方。涉及付款、清关和交付的文案使用“subject to the confirmed arrangement”与“according to the confirmed order arrangement”等审慎表述，避免把业务承诺写成无条件保证。

## 转化路径

首页的主要转化动作有三条：用户可进入 COA Reports 查看真实档案，可进入 Products 选择型号并通过 WhatsApp 询价，也可在 OEM/ODM 与 Secure Ordering 区直接进入 Contact 或 WhatsApp。所有公开页面继续保留 `https://wa.me/85253929189` 作为直接沟通入口。

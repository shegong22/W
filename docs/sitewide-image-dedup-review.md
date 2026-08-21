# Sitewide Image Deduplication Review

本轮重点检查公开页面中以源码回退路径出现的重复图片。用户截图暴露的主要问题是 Services 的 COA 与 OEM/ODM 两张卡片重复使用同一张 `asian-peptide-lab` 图片。该问题已修复：COA 改用 `tide-service-coa-review`，OEM/ODM 改用 `tide-service-oem-coordination`，Delivery 改用 `tide-service-packaging-dispatch`。Laboratory 主视觉也改用独立的 `tide-laboratory-analytical-review`，不再与 About 的洁净室主视觉共用同一回退图。

| 页面 / 模块 | 槽位 | 新资源 | 用途 | 去重结论 |
|---|---|---|---|---|
| Services / Service in Focus | COA | `tide-service-coa-review_435fe835.jpg` | 中国质量人员核对 COA 与批次文件 | 不与同模块其他图片重复 |
| Services / Service in Focus | OEM / ODM | `tide-service-oem-coordination_a8ffb6ac.jpg` | 中国科学人员协调 OEM/ODM 生产 | 不与同模块其他图片重复 |
| Services / Service in Focus | Delivery | `tide-service-packaging-dispatch_6563eebc.jpg` | 中国洁净包装人员准备发货 | 不与同模块其他图片重复 |
| Laboratory / Intro | Hero | `tide-laboratory-analytical-review_aacb7dfc.jpg` | 中国分析实验室人员操作仪器 | 不再复用 About 洁净室主视觉 |

现有 COA 原始报告、Feedback 原始反馈与 delivery 记录保留其一图一档的真实性，不用生成图片覆盖用户上传的证据文件。下一步需在正式图片生成完成后逐张确认资源状态，并完成 Services、Laboratory、About 三页的桌面与手机端验收。

## 新素材逐张审查（Services）

| 素材 | 尺寸 | 审查结论 |
|---|---:|---|
| `tide-service-coa-review_435fe835.jpg` | 1920×1440 | 正式生成；中国/亚洲女性质量人员在分析实验室核对文件与西林瓶；无可见水印；与 OEM/ODM、Delivery 图场景不同。 |
| `tide-service-oem-coordination_a8ffb6ac.jpg` | 1920×1440 | 正式生成；两名中国/亚洲科学人员在不锈钢生产设备旁协调 OEM/ODM；无可见水印；与 COA 图场景不同。 |

两张图片均适合 Services 4:3 卡片，已确认不是失败占位图。

| 素材 | 尺寸 | 审查结论 |
|---|---:|---|
| `tide-service-packaging-dispatch_6563eebc.jpg` | 1920×1440 | 正式生成；三名中国/亚洲洁净包装人员处理西林瓶与发货盒；无可见水印；与 COA 和 OEM/ODM 图场景不同。 |
| `tide-laboratory-analytical-review_aacb7dfc.jpg` | 1920×1440 | 正式生成；中国/亚洲女性分析人员操作实验室仪器；无可见水印；作为 Laboratory 主视觉，与 Services 三张服务图用途不同。 |

四张本轮新增素材均已逐张确认，不是生成失败占位图；同一 Services 视觉模块现在使用四张不同场景图片。

## Final slot-level audit

自动脚本已扫描 11 个公开页面文件，共 26 个图片槽位；当前源码回退路径中发现 **0 个重复资源**。完整逐槽位表保存在 `docs/public-image-slot-audit.md`。本轮重点修复了 Services 的 COA/OEM/ODM/Delivery 三张重复或高频图片，并将 About 的研发、洁净室、冻干三个设施槽位切换为新的独立素材；Laboratory 主视觉使用独立分析仪器素材。

已对 `/`、`/laboratory`、`/products`、`/services`、`/coa`、`/feedback`、`/contact`、`/order` 完成 1280 桌面端和 390 移动端完整页面截图检查，确认新增图片加载、卡片堆叠、裁切和页面宽度无明显溢出。

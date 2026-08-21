# Tide 全站图片审计

## 审计规则

本次审计覆盖根首页 `/`（About）、`/laboratory`、`/products`、`/services`、`/coa`、`/feedback` 与 `/contact`。同一页面的同一视觉板块内不重复使用同一资源；不同页面之间允许复用基础实验室素材，但不在同一画廊中重复。根首页人物素材只保留中国/亚洲工厂人员，或使用设备、洁净区、托盘等无人物画面。

## 根首页 `/`（About）

| 板块 | 槽位 | 最终默认资源 | 人物/场景复核 | 同板块重复 | 结论 |
|---|---|---|---|---|---|
| Factory profile | `about_intro` | `/manus-storage/asian-cleanroom_8ac53ec9.jpg` | 亚洲/中国洁净工厂语境 | 单图 | 通过 |
| Facility field view | `about_facility_rd` | `/manus-storage/asian-peptide-lab_cc4c7c7d.jpg` | 亚洲实验室研发场景 | 不重复 | 通过 |
| Facility field view | `about_facility_cleanroom` | `/manus-storage/asian-cleanroom_8ac53ec9.jpg` | 亚洲/中国洁净生产场景 | 不重复 | 通过 |
| Facility field view | `about_facility_lyophilization` | `/manus-storage/freeze-drying_c92fc93a.jpg` | 冻干与产品形态，无欧美人物 | 不重复 | 通过 |
| Facility field view | `about_facility_production` | `/manus-storage/lyophilization_e21206db.png` | 生产设备场景 | 不重复 | 通过 |
| Factory evidence | `about_visit_equipment` | `/manus-storage/3303-client-equipment_c591859a.png` | 真实广州工厂；亚洲工作人员 | 不重复 | 通过 |
| Factory evidence | `about_visit_observation` | `/manus-storage/3303-client-observation_cebbe2d7.png` | 真实广州工厂；亚洲工作人员；已登记后台 | 不重复 | 通过 |
| Factory evidence | `about_visit_vials` | `/manus-storage/3303-vial-trays_f1f35250.png` | 真实托盘/批次画面；无欧美人物 | 不重复 | 通过 |
| Production flow | `about_flow_synthesis` | `/manus-storage/synthesis-reactor_38f3e94c.jpg` | 合成反应设备 | 不重复 | 通过 |
| Production flow | `about_flow_cleanroom` | `/manus-storage/cleanroom-line_117b6598.webp` | 洁净生产线 | 不重复 | 通过 |
| Production flow | `about_flow_lyophilization` | `/manus-storage/lyophilization-process_d7898fd2.jpg` | 冻干工艺设备 | 不重复 | 通过 |
| Production flow | `about_flow_batch` | `/manus-storage/peptide-batch-vials_dfbcb2c5.jpg` | 批次西林瓶与记录 | 不重复 | 通过 |
| Partnership archive | `about_feedback_1` | `/manus-storage/feedback-1_0538cdc0.jpg` | 客户档案截图 | 与 delivery 图不同 | 通过 |
| Partnership archive | `about_delivery_3` | `/manus-storage/delivery-3_b513e47e.jpg` | 交付档案截图 | 与 feedback 图不同 | 通过 |

根首页不再使用 `about_visit_group`（3305-client-group）、`about_visit_inspection`（3304-production-inspection）与 `about_visit_clean_production`（3309-01）作为首页卡片，因为其中包含明显欧美访客或不符合“中国工厂人员优先”的画面。它们不再出现在根首页视觉区域。

## Laboratory `/laboratory`

| 板块 | 槽位 | 最终默认资源 | 同板块重复 | 结论 |
|---|---|---|---|---|
| Laboratory profile | `laboratory_hero` | `/manus-storage/asian-cleanroom_8ac53ec9.jpg` | 单图 | 通过 |
| Facility evidence | `laboratory_analysis` | `/manus-storage/asian-peptide-lab_cc4c7c7d.jpg` | 与下方两图不同 | 通过 |
| Facility evidence | `laboratory_cleanroom` | `/manus-storage/asian-cleanroom_8ac53ec9.jpg` | 与上下两图不同 | 通过 |
| Facility evidence | `laboratory_process` | `/manus-storage/freeze-drying_c92fc93a.jpg` | 与上下两图不同 | 通过 |

订购流程和合作保障区为文字与图标，不使用重复图片。

## Products `/products`

| 板块 | 槽位/型号 | 最终默认资源 | 同板块重复 | 结论 |
|---|---|---|---|---|
| Batch presentation | RT60 / 3311 | `/manus-storage/3311_ebb8c534.png` | 独立文件 | 通过 |
| Batch presentation | CU100 / 3312 | `/manus-storage/3312_2ee315a2.png` | 独立文件 | 通过 |
| Batch presentation | NAD500 / 3313 | `/manus-storage/3313_4e3cc005.png` | 独立文件 | 通过 |
| Batch presentation | RT10 / 3314 | `/manus-storage/3314_5d4ff359.png` | 独立文件 | 通过 |
| Batch presentation | TA10 / 3315 | `/manus-storage/3315_96069d8b.png` | 独立文件 | 通过 |
| Batch presentation | NAD1000 / 3316 | `/manus-storage/3316_4a56c7de.png` | 独立文件 | 通过 |

产品型号索引本身不重复使用图片。

## COA `/coa`

| 板块 | 槽位范围 | 最终默认资源 | 重复检查 | 结论 |
|---|---|---|---|---|
| Freedom COA | COA 01–12 | `IMG_0528`, `IMG_0529`, `IMG_0530`, `IMG_0533`, `IMG_0534`, `IMG_0535`, `IMG_0537`, `IMG_0538`, `IMG_0542`, `IMG_0543`, `IMG_0544`, `IMG_0545` | 每份原始报告只出现一次 | 通过 |
| Janoshik Tests | Test 01–06 | `IMG_0531`, `IMG_0536`, `IMG_0539`, `IMG_0540`, `IMG_0541`, `IMG_0547` | 每份原始报告只出现一次 | 通过 |

COA 页面不使用人物图片，两个实验室画廊之间没有交叉重复报告。

## Feedback `/feedback`

| 板块 | 槽位范围 | 最终默认资源 | 重复检查 | 结论 |
|---|---|---|---|---|
| Customer feedback | Feedback 01–09 | `/manus-storage/feedback-1_0538cdc0.jpg` 至 `/manus-storage/feedback-9_a8b89655.jpg` | 序列内无重复 | 通过 |
| Delivery archive | Delivery 01–09 | `/manus-storage/delivery-1_b2a1580f.jpg` 至 `/manus-storage/delivery-9_a2a9308a.jpg` | 序列内无重复 | 通过 |

## Services `/services` 与 Contact `/contact`

Services 使用文字、图标和 WhatsApp 转化，不包含图片画廊；Contact 使用询盘表单、联系方式和 WhatsApp 入口，不包含人物图片或重复图片，因此图片重复检查为“不适用”。

## 总结

根首页现在由 About 统一承担品牌介绍入口；Home 路由组件和导航项已删除。首页的工厂现场区只保留亚洲工作人员、洁净区和批次托盘素材。所有存在多图的同页板块都使用不同资源。后续管理员替换图片时，应继续保持上述槽位的一对一分配。

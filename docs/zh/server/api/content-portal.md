# 内容与门户接口

## 内容管理

文章与分类提供完整 REST CRUD：

- `/api/v1/content/articles`
- `/api/v1/content/articles/{id}`
- `/api/v1/content/categories`
- `/api/v1/content/categories/{id}`

文章列表支持 `page`、`pageSize`、`keyword`、`categoryId` 和 `status`。内容字段为字符串数组，便于不同 UI 编辑器以段落形式呈现。

## 门户公开数据

`/api/v1/public/**` 无需登录：

| 路径 | 用途 |
| --- | --- |
| `/blog`、`/blog/{id}` | 博客分页与详情 |
| `/home` | 首页统计、高亮与评价 |
| `/features`、`/product` | 产品能力 |
| `/pricing` | 套餐方案 |
| `/faq`、`/docs` | 帮助内容 |
| `/about` | 团队与里程碑 |
| `/contact` | 联系表单提交（POST） |

博客评论读取 `GET /api/v1/public/blog/{id}/comments` 也允许匿名访问。

## 需要登录的站点交互

| 方法与路径 | 用途 |
| --- | --- |
| POST `/api/v1/blog/{id}/comments` | 以当前登录用户身份发表评论 |
| POST `/api/v1/payments/checkout` | 为付费套餐创建待支付订单 |

匿名写入返回 HTTP 401。支付接口接收 `planId` 与 `channel`（`alipay`、`wechat` 或 `card`），返回订单号、金额、过期时间与演示支付地址。评论和订单由 `V7__site_interactions.sql` 创建的数据表持久化。

公开只代表无需身份，不代表允许任意写入。价格页和博客页本身保持公开，只有点击购买或提交评论时才跳转登录，登录后按 `redirect` 参数返回原页面。

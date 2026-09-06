# Content, portal, comments, and payments

## Content management

Authenticated admin applications use REST CRUD at `/api/v1/content/articles` and `/api/v1/content/categories`. Article listing accepts `page`, `pageSize`, `keyword`, `categoryId`, and `status`.

## Public site reads

No login or Bearer token is required for:

| Method and path | Purpose |
| --- | --- |
| GET `/api/v1/public/home` | Homepage content |
| GET `/api/v1/public/features`, `/product` | Product content |
| GET `/api/v1/public/pricing` | Pricing plans |
| GET `/api/v1/public/blog`, `/blog/{id}` | Blog list and article |
| GET `/api/v1/public/blog/{id}/comments` | Published comments |
| GET `/api/v1/public/faq`, `/docs`, `/about` | Help and company content |
| POST `/api/v1/public/contact` | Contact form |

## Authenticated interactions

| Method and path | Purpose |
| --- | --- |
| POST `/api/v1/blog/{id}/comments` | Create a comment as the signed-in user |
| POST `/api/v1/payments/checkout` | Create a pending pricing order |

Anonymous writes return HTTP 401. Checkout accepts `planId` and `channel` (`alipay`, `wechat`, or `card`) and returns an order number, amount, expiry, and demo checkout URL. Migration `V7__site_interactions.sql` persists both comments and payment orders.

The frontend keeps pricing and blog routes public. It redirects to `/login?redirect=...` only when a visitor submits a comment or starts checkout, then returns to the original page after login.

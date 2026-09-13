# @fast-vue3/api

這是 web 及 site 唯一的業務 API 入口。公開方法使用 `/public/**`；`createBlogComment` 及 `checkout` 使用受保護路徑，由 Request interceptor 加入 Access Token。

新增 API 時同步型別、模組、Nitro、Spring 及測試。

`createApi(http)` 亦從 `src/modules/enterprise.ts` 匯出 `tenant`、`organization`、`department`、`project`、`task`、`approval`、`notification`、`audit`、`file`。建立項目及提交審批需要 `Idempotency-Key`，更新項目或任務需要 `version`；`file.download()` 回傳 `Blob`。詳見[企業業務領域](/zh-HK/server/api/enterprise)。

# @fast-vue3/api

這是 web 及 site 唯一的業務 API 入口。公開方法使用 `/public/**`；`createBlogComment` 及 `checkout` 使用受保護路徑，由 Request interceptor 加入 Access Token。

新增 API 時同步型別、模組、Nitro、Spring 及測試。


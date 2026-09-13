# 统一接口契约

所有业务端点使用 `/api/v1` 前缀，并返回统一信封：

```json
{
  "code": 0,
  "message": "success",
  "data": {}
}
```

`code === 0` 表示业务成功。HTTP 错误和业务错误都必须包含可读的 `message`，前端请求层会把它转换为异常。

分页载荷固定为：

```json
{
  "items": [],
  "page": 1,
  "pageSize": 20,
  "total": 0
}
```

日期字段通常使用 `yyyy-MM-dd`，时间戳使用 ISO-8601 或端点注明的格式。状态值按资源区分大小写：租户、组织、部门使用 `active / disabled`，项目、任务、审批使用大写枚举，如 `ACTIVE`、`IN_PROGRESS`、`PENDING`。项目、审批等列表直接返回数组，不套分页结构。

前端的唯一契约源位于 `packages/effects/api/src/types.ts`。修改 Java VO 时，应同步修改该类型、Nitro Mock 响应以及两端测试。

## 鉴权

除登录、注册、刷新令牌、健康检查、OpenAPI 与 `/api/v1/public/**` 外，接口默认要求 Bearer Token。资源写操作再通过 `@PreAuthorize` 校验细粒度权限。

Java 服务的错误会返回相应 HTTP 状态码及非零 `code`（例如 401、403、404、409）。`@fast-vue3/request` 解包成功的 `data`，把 HTTP 或业务错误转为 Promise 异常。文件下载返回二进制内容，不使用 JSON 信封。新增路径与状态规则见[企业业务域](/zh/server/api/enterprise)。

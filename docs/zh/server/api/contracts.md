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

时间字段使用 ISO-8601 或 `yyyy-MM-dd HH:mm:ss`。状态值使用稳定的小写枚举，例如用户状态为 `active / disabled`、文章状态为 `draft / published`。

前端的唯一契约源位于 `packages/effects/api/src/types.ts`。修改 Java VO 时，应同步修改该类型、Nitro Mock 响应以及两端测试。

## 鉴权

除登录、注册、刷新令牌、健康检查、OpenAPI 与 `/api/v1/public/**` 外，接口默认要求 Bearer Token。资源写操作再通过 `@PreAuthorize` 校验细粒度权限。

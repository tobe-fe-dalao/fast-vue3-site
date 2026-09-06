# 架构对比

`main` 和 `polyrepo` 是并行分支。旧文档中的“已归档”“没有锁文件”“没有 lint”不代表当前 polyrepo。

[阅读当前架构说明](/zh/guide/getting-started)。

选择单应用与构建期 UI 切换时使用 polyrepo；多后台/门户并行开发与共享包协作时使用 main。两者的请求封装、启动命令、Mock 账号和目录结构都应分别核对。

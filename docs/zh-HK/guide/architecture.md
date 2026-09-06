# 架構

Main 將可執行應用放在 `apps/`、共用執行期能力放在 `packages/`、工程工具放在 `internal/` 及 `scripts/`。Polyrepo 則以建置別名切換 UI 適配器。

兩條路徑都遵循「畫面 → Store → API → HTTP」依賴方向，並以語意化設計 Token 隔離 UI 函式庫差異。


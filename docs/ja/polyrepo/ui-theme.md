# UI mode と Theme 互換性

各 mode は Component export、Provider、Login 表示、Theme mapping の四つの Adapter を持ちます。Business view は UI package を直接 import せず安定 Alias を使います。

Surface、Text、Border、Primary、Success、Warning、Danger の意味的 Token を使います。新 UI 追加時は四 Adapter と dev/build script を実装し、Light/Dark、Mobile、Form、Overlay、Authentication を検証します。


async function loadSharedTabs() {
  // タブバーを挿入する場所を探す
  const container = document.querySelector("#shared-tab");

  // 挿入場所がないページでは何もしない
  if (!container) return;

  try {
    // 共通のHTMLファイルを取得する
    const response = await fetch("tab.html");

    if (!response.ok) {
      throw new Error("タブバーを読み込めませんでした");
    }

    // HTMLを文字列として読み込む
    const html = await response.text();

    // ページ内にタブバーを挿入する
    container.innerHTML = html;

    // 現在のページを判定する
    const currentFile =
      window.location.pathname.split("/").pop() || "index.html";

    // 現在のページに対応するタブを選択状態にする
    container.querySelectorAll(".tab").forEach((tab) => {
      if (tab.dataset.page === currentFile) {
        tab.classList.add("active");
        tab.setAttribute("aria-current", "page");
      }
    });
  } catch (error) {
    console.error("共通タブバーの読み込みに失敗:", error);
  }
}

// ページが読み込まれたら実行
loadSharedTabs();

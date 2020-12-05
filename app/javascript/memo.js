function memo() {
  const submit = document.getElementById("submit");
  submit.addEventListener("click", (e) => {
    // new FormData(フォームの要素);。そのフォームに入力された値を取得する
    const formData = new FormData(document.getElementById("form"));
    const XHR = new XMLHttpRequest();
    // openメソッドを使用してリクエストの詳細を指定。
    // XHR.open("HTTPメソッドの指定", `パスの指定`, 非同期通信のON/OFF);
    XHR.open("POST", "/posts", true);
    XHR.responseType = "json";
    // formData(フォームに入力された値)をリクエスト送信。
    XHR.send(formData);
    XHR.onload = () => {
      if (XHR.status != 200) {
        alert(`Error ${XHR.status}: ${XHR.statusText}`);
        // 処理を終了している
        return null;
      }
      // XHR.responseでレスポンスされてきたJSONにアクセスできる。レスポンスされたデータを変数itemに代入
      const item = XHR.response.post;
      // 「描画する親要素」のlistの要素を取得
      const list = document.getElementById("list");
      // この処理が終了した時に、入力フォームの文字は入力されたままになってしまうため、リセットする必要がある。
      // ここではリセット対象の要素であるcontentという要素を取得
      const formText = document.getElementById("content");
      // 「メモとして描画する部分のHTML」を定義
      const HTML = `
        <div class="post" data-id=${item.id}>
          <div class="post-date">
            投稿日時： ${item.created_at}
          </div>
          <div class="post-content">
          ${item.content}
          </div>
        </div>`;
        // insertAdjacentHTMLは、指定したHTMLなどを、特定の要素に描画できるメソッド
        // 第一引数にafterendを指定することで、要素listの直後に挿入できます。
      list.insertAdjacentHTML("afterend", HTML);
      // このコードにより、「メモの入力フォームに入力されたままの文字」はリセットされます。
      // 正確には、空の文字列に上書きされるような仕組み
      formText.value = "";
    }
    // preventDefault()とは、標準設定されている（Default）イベントを阻止する（prevent）メソッド
    e.preventDefault();
  });
}
window.addEventListener("load", memo);
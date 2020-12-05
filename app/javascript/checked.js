// check関数を定義
function check() {
  // documentとはブラウザ上で表示された情報(HTML)を操作する事ができる
  // postをクラス名にもつ要素を取得(表示されているすべてのメモを取得している)
  const posts = document.querySelectorAll(".post");
  // 要素１つずつに対して、クリックした際に処理を記述する場所を用意
  posts.forEach(function (post){
    // data-loadが空じゃなかったら処理は止まる
    // 下記３行の記述は、イベント発火が起きている要素にdata-load = "true"はまだ追加されていないため、if文の処理は読み込まれずに、14行目に処理が移る。
    if (post.getAttribute("data-load") != null) {
      return null;
    }
    // post.setAttribute("data-load", "true");と記述することで、要素にdata-load = "true"と属性を追加しています。
    post.setAttribute("data-load", "true");
    // メモをクリックした場合に実行する処理を定義している
    post.addEventListener("click", () => {
      // getAttribute 属性値を取得する。メモのidを取得する。(どのメモをクリックしたのか、カスタムデータを利用して取得している)
      const postId = post.getAttribute("data-id");
      // XMLHttpRequestを使用できるようにして、HTTPリクエスト非同期でを行う。Ajaxに必要なオブジェクトを生成している
      // XMLHttpRequestを使用するとJavaScriptからAjaxによるリクエストが送れるようになる。
      const XHR = new XMLHttpRequest();
      // openメソッドを使用してリクエストの詳細を指定。
      // XHR.open("HTTPメソッドの指定", `パスの指定`, 非同期通信のON/OFF);
      XHR.open("GET", `/posts/${postId}`, true);
      // レスポンスの形式を指定するメソッド。リクエストを送る際、レスポンスとして欲しい情報の形式を
      // 指定する必要がある。今回のレスポンスはJSON形式のデータ
      XHR.responseType = "json";
      // send。XMLHttpRequestで定義されているメソッドで、リクエストを送信できる。
      XHR.send();
      // onloadは、レスポンスなどの受信が成功した場合に呼び出されるイベントハンドラー
      // レスポンスを受け取った時の処理を記述する
      XHR.onload = () => {
        // レスポンスがエラーだった場合の記述 ↓
        // HTTPステータスコードが200以外の場合。statusでステータスコードを確認できる。
        if (XHR.status != 200) {
          // レスポンスのHTTPステータスを解析し、該当するエラーメッセージをアラートで表示するようにしている
          alert(`Error ${XHR.status}: ${XHR.statusText}`);
          // return nullを定義。javascriptの処理から抜け出すことができる。処理を終了している
          return null;
        }
        // 想定通りのレスポンスを受け取った場合の記述 ↓
        // XHR.responseでレスポンスされてきたJSONにアクセスできる。レスポンスされたデータを変数itemに代入
        const item = XHR.response.post;
        // 既読であるならば
        if (item.checked === true) {
          // 既読であればHTMLに定義した属性であるdata-checkの属性値にtrueをセット
          post.setAttribute("data-check", "true");
        // 未読なら
        } else if (item.checked === false) {
          // 未読であればdata-checkは属性ごと削除。カスタムデータを削除している
          post.removeAttribute("data-check");
        }
      };
    });
  });
}
// 一定間隔ごとに指定。１秒に１度checkメソッドが実行。setInterval(実行する関数, ミリ秒を指定)
setInterval(check, 1000);
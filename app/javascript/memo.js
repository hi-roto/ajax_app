// メモ投稿の非同期通信
// 関数memoを定義
function memo() {
  // 「投稿」ボタンで発火するようにidを取得する
  const submit = document.getElementById("submit");
  // ボタンをクリックした際に実行される関数を定義する
  submit.addEventListener("click", (e) => {
  // FormDataオブジェクトでフォームに入力された値を取得する
  const formData = new FormData(document.getElementById("form")); 
  // ボタンをクリックして、送信するリクエストを定義する(XMLHttpRequestを生成する)
  const XHR = new XMLHttpRequest();
  // openメソッドで送信内容をリセットして、指定する
  XHR.open("POST", "/posts", true);
  // リスポンスのデータ形式を指定するjsonデータを指定
  XHR.responseType = "json";
  // フォームに入力された情報を送信
  XHR.send(formData);

  // レスポンス後の処理を記載する
  XHR.onload = () => {
    // 200以外のエラー文の場合はエラー数字とエラー文を表示して、処理を止める
    if (XHR.status != 200) {
      alert(`Error ${XHR.status}: ${XHR.statusText}`);
      return null;
    }
    // リスポンスが200（正常）なら、以下を実行
    // postキーに入ったバリュー（レコードデータ）をレスポンスとして受け取とって、変数itemに代入
    const item = XHR.response.post;
    // id名のlistの要素を変数listに代入
    const list = document.getElementById("list");
    // id名のcontentの要素を変数formTextに代入
    // 処理終了後に入力フォームをリセットするために、要素を取得する
    const formText = document.getElementById("content");
    // 追加するメモの内容をHTML文で変数HTMLに代入する
    const HTML = `
      <div class="post" data-id=${item.id}>
        <div class="post-date">
          投稿日時:${item.created_at}
        </div>
      <div class="post-content">
      ${item.content}
      </div>
      </div>`;
      // 取得したid名listに変数HTMLを挿入する
    list.insertAdjacentHTML("afterend", HTML);
    // 変数formTextを空白にする
    formText.value = "";
  };
  e.preventDefault();
  });
}
window.addEventListener("load", memo);
// ウィンドウ読み込み後に関数memoが実行される

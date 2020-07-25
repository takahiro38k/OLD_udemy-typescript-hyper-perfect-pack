// *====
// .d.ts を型定義ファイルという。
// .d.ts は、.tsconfig.json の "declaration": true を設定すると、
// コンパイル時に出力できる。
// ====*
// ◆.d.ts がないパッケージ
// 型定義fileがないので、エラーが出てsuggestも効かない。
// import _ from 'lodash'; // CDNによる確認のためコメント
// ++++----------------
// 解決策1  ほぼこれで大丈夫のはず。
// ブラウザで「types パッケージ名」を検索し、型定義fileを誰かがupしていないかcheck。
// npm i @types/lodash など、@types が付いたコマンドがあれば
// それで型定義ファイルをinstallできる(yarnに変換して使うもよし)。
// install後、node_modulesの@typesにパッケージが追加される。
// TypeScriptは、パッケージ本体のdirだけでなく、@typesのほうもcheckしてくれる。
// --------++++--------
// 解決策2
// Webにも型定義fileがない場合。
// 自分で作るしかない。
//   1. 任意の名前で型定義fileを作る(xxxx.d.ts)。任意のdirに置く。
//   2. 使用する関数やクラスに関する型を書く。今回は lodash.d.ts を作成。
//   3. tsconfig.jsonでコンパイルfileを限定している場合、
//      作成した型定義fileが読み込まれるよう設定する。
//   4. suggestが効くことを確認する。
// ----------------++++
// 設定なしで、自動でsuggestが効く。
// axios.get('https://foo.bar');
console.log(_.shuffle([1, 2, 3, 4, 5]));
// ************************************************************
// ########CDNによるパッケージ利用
// 1. htmlにCDNのURLを記入。今回はlodashを使用。
// 2. tsconfig.jsonの"noEmitOnError"を無効にする。
// 3. 型定義file(xxxx.d.ts)に、型定義を明示する。
// ************************************************************
// ########namespace
// 名前空間
// スコープの外部で変数を使ったり、使わなかったりするための設定。
// ES6以降、出番は減った。
var myApp;
(function (myApp) {
    const hello = 'Hello!'; // スコープ内のみ利用可
    myApp.name = 'Andy'; // 外部もOK
})(myApp || (myApp = {}));
const hello = 'Hello. How are you?'; // 上記のhelloと重複しない。
console.log(hello);
console.log(myApp.name);

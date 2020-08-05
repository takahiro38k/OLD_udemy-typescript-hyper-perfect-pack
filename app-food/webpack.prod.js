// ○○○○○○○○○○○○○
// ○○○○○本番用○○○○○
// ○○○○○○○○○○○○○

// Node.jsのimport文
// 'path'はnode_modulesにあるdefault module。path.resolveでパスを連結できる。
const path = require('path');
// plugin
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

// Node.jsのexport文
module.exports = {
  // bundleファイルを開発用として出力。
  mode: 'production',
  // 読み込みする最初のファイル。起点。
  // entry: './dist/main.js',
  entry: './main.ts',
  // bundleしたfileの設定。
  output: {
    filename: 'bundle.js',
    // 出力先。絶対pathで書く。
    // path.resolve()は、連結記号(/など)は不要。
    // __dirnameは、このfileがあるdir(絶対path)。
    path: path.resolve(__dirname, 'dist'),
  },
  // ブラウザの開発者ツールでソースコードを非表示。
  devtool: 'none',
  module: {
    rules: [{
      // 対象ファイルの拡張子を指定。
      test: /\.ts$/,
      // ツールを指定。
      // ts-loaderはローカルにtypescriptが必要なので、globalにtypescriptがあっても、
      // 下記のとおりinstallすること。
      // yarn add ts-loader typescript -D
      use: 'ts-loader',
      // node_modules内のファイルは対象外とする。
      exclude: /node_modules/
    }]
  },
  resolve: {
    // importするmoduleの拡張子がない場合、配列の左から順に適用して、moduleの有無をcheckする。
    extensions: ['.ts', '.js']
  },
  plugins: [
    // bundleするごとに、出力先のdirをクリーンアップする。
    new CleanWebpackPlugin()
  ]
}

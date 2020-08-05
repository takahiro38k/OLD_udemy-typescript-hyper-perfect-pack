// 外部のパッケージをinstallする場合は、ts用のdefault exportが用意されていない可能性があるので、
// 下記のどちらかを選択する(どちらでも可)。
// import * as practice from './practice-export';
// import practice = require('./practice-export');

// tsconfig.jsonの"esModuleInterop"がtrueであることで、
// 下記の書き方もできるようになる。
import practice from './practice-export'

console.log(practice);

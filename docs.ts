// .jsonをimportするために、tsconfig.jsonで下記を設定。
// "resolveJsonModule": true,
import sampleJson from './sample.json';

// ************************************************************
// ########型注釈(Type Annotation)/型推論

let str: string = 'Hello'; // 型注釈
let str2 = 'Hi'; // 型推論

// 変数は、基本は型推論でOK。宣言のみ先にする場合は型注釈を使う。

let num: number
let toggle: boolean

// ************************************************************
// ########object 型注釈

const person: {
  name: string;
  age: number;
} = {
  name: 'Taro',
  age: 21
}

// objectという文字どおりの型もあるが、どのプロパティもエラーとなるので、ほぼ使わない。
const person2: object = {
  name: 'Ken'
}
// object型を指定したため、nameプロパティがエラーとなる。
console.log(person2.name);

// ************************************************************
// ########配列 型注釈/array

const fruits: string[] = ['Apple', 'Banana', 'Orange'];
const fruits2: any[] = ['Apple', 'Banana', 'Orange', 1]; // anyだとなんでもOKになる。
const fruits3: (string | number)[] = ['Apple', 'Banana', 'Orange', 1]; // 文字列と数

// iiiii CHECK iiiii
// ジェネリクスを使った下記のような方法もある。
// Arrayはジェネリック型なので、下記のように指定する。
const fruits4: Array<string> = ['Apple', 'Banana', 'Orange'];

// ************************************************************
// ########Tuple(タプル)

// 型とindexを指定する配列型。
// 型注釈のみ。型推論はできない。
const book: [string, number, boolean] = ['business', 1500, true];
// pushなどは実行できる。
book.push('good');
// ただし参照しようとするとエラーとなる。
console.log(book[3])

// ************************************************************
// ########Enum(イーナム)

// 列挙型。
// 特定の列挙された値のみを指定する。
// jsファイルでobjectに変換される。
// ++++----------------
// 通常のオブジェクト
const coffeeSize = {
  SHORT: 'SHORT',
  TALL: 'TALL',
  GRANDE: 'GRANDE',
  VENTI: 'VENTI'
}

const coffee = {
  hot: true,
  // (hoverで確認)sizeの型は文字列
  size: coffeeSize.TALL
}

// 型が文字列なので、違う文字列を代入できてしまう。
coffee.size = 'small'

// --------++++--------
// Enum
// 慣習でパスカル(アッパーキャメル)を使う。
enum CoffeeSize2 {
  // 慣習で列挙値(左側)はすべて大文字にする。
  SHORT = 'SHORT',
  TALL = 'TALL',
  GRANDE = 'GRANDE',
  VENTI = 'VENTI'
}

const coffee2 = {
  hot: true,
  // (hoverで確認)sizeの型はcoffeeSize2
  size: CoffeeSize2.TALL
}

// coffeeSize2以外の値は代入できない。
coffee2.size = 'small'
// coffeeSize2のみOK。
coffee2.size = CoffeeSize2.VENTI

// --------++++--------
// Enumの性質

// 慣習でパスカル(アッパーキャメル)を使う。
enum CoffeeSize3 {
  // 慣習で列挙値(左側)はすべて大文字にする。
  // (hoverで確認)代入しなかった場合、indexが自動で代入される。
  SHORT,
  TALL,
  GRANDE,
  VENTI
}

// 慣習でパスカル(アッパーキャメル)を使う。
enum CoffeeSize4 {
  // 慣習で列挙値(左側)はすべて大文字にする。
  SHORT = 'SHORT',
  // (hoverで確認)数字の代入後に省略した場合、代入した数字がindexの基準となる。
  TALL = 25,
  GRANDE,
  VENTI
}
// ----------------++++

// ************************************************************
// ########any型

// 何でも入る。
// jsからの移行時は「とりあえず」で設定するのもひとつだが、tsの恩恵を受けるためには極力使用しないこと。
let anything: any = true;
anything = 'abc';
anything = 123;
anything = [];
anything = {};
// any型だと型が決まった変数にも代入できてしまう。カオス。
let banana = 'banana';
banana = anything;

// ************************************************************
// ########Union型

// 複数の型を指定する。
let unionType: number | string = 123;
let unionTypes: (number | string)[] = [123, 'abc'];

// tsconfig.jsonのstrictNullChecksがtrueの場合、
// stringやnumberにnullやundefinedを代入できなくなる。
// 代入を許可したい場合は、union型を使う。
let nullableMsg: string | null = null;
let nullableNumber: number | undefined = undefined;

// 上記パターンでsuggestを有効にしたい場合はif文を使う。
// ++++----------------
function echo(msg: string): string | null {
  return msg;
}

let nullableMsg2: string | null = echo('Hi!');

if (nullableMsg2) {
  nullableMsg2.toUpperCase();
}
// ----------------++++


// ************************************************************
// ########Literal型/リテラル型

// 指定した値だけ代入できる。
let apple: 'apple' = 'apple';
// 指定外の値は代入不可。
apple = 'banana';

// constにすれば自動的にLiteral型になる。なので通常はこちらを使用。
const kiwi = 'kiwi';

// string以外でも型を指定できる。
const zero: 0 = 0;
const boolTrue: true = true;

// Union型と合わせるとEnumと似た使い方ができる。
let clothSize: 'small' | 'medium' | 'large' = 'small';
const cloth: {
  color: string;
  // 下記の型指定がないと、cloth.sizeはLiteral型になってしまい変更できなくなる。
  size: 'small' | 'medium' | 'large';
} = {
  color: 'white',
  size: clothSize
}
// clothSizeと同じ型を指定したので、変更できる。
cloth.size = 'medium';

// ************************************************************
// ########typeエイリアス

// エイリアスは別名の意。
// type(型)を変数のようにあつかえる機能。jsにコンパイルすると消去される。
// 慣習でパスカル(アッパーキャメル)を使う。
type ClothSize = 'small' | 'medium' | 'large';
let clothSize2: ClothSize = 'medium';

// ************************************************************
// ########関数の型

// 関数宣言
// ++++----------------
// 型注釈
// 引数と戻り値に型をつける。
// !!!!! WARNING !!!!!
// 引数の型を省略するとanyになるで必ず書く。
// 戻り値は省略しても型推論してくれるが、書いたほうが無難。
function add(a: number, b: number): number {
  return a + b;
}

// void型
// 戻り値がない関数の型はvoidを使う。anyも使えるがvoidの方が適切。
// iiiii CHECK iiiii
// 厳密にいうと、戻り値がundefinedの場合にvoidを使うのが適切で、
// 何も返さない(エラーのthrowなど)の場合は、neverを使うのが適切。
function sayHello(): void {
  console.log('Hello');
}

// returnがあればundefinedも使える。voidも可。
// !!!!! WARNING !!!!!
// 基本的にundefinedは使わず、voidを使うのが良い。
function sayHello2(): undefined {
  console.log('Hello');
  return;
}
// ----------------++++

// 関数式
// ++++----------------
// 変数名で型注釈することもできるし、関数側で型注釈することもできる。
// 変数側の戻り値は => を使うことに注意。
const add2: (n1: number, n2: number) => number = function (a: number, b: number): number {
  return a + b;
}
// ただし上記のように両方での型付けは冗長なので、どちらか片方にするのが無難。
const add3: (n1: number, n2: number) => number = function (a, b) {
  return a + b;
}

// アロー関数(arrow function)の場合は下記のとおり
// 変数側
const doubleNum: (num: number) => number = a => a * 2;
// 関数側
const doubleNum2 = (a: number): number => a * 2;
// ----------------++++

// callback
function doubleAndHandle(num: number, callback: (num: number) => number): void {
  const doubleNum = callback(num * 2);
  console.log(doubleNum);
}
doubleAndHandle(21, x => x + 1); // 43

// ************************************************************
// ########undefined型/null型

// undefined型
// undefinedとnullを取ることができる。
let tmp: undefined = undefined;
tmp = null;

// null型
// undefinedとnullを取ることができる。
let tmp2: null = null;
tmp2 = undefined;

// !!!!! WARNING !!!!!
// 2つは似ているが異なる意味を持っていることに注意。
//   初期化されていない ： undefined。
//   現在利用できない   ： null

// ************************************************************
// ########unknown型

// anyに似ているが、anyよりも少し厳しくチェックできる。
let unknownInput: unknown;
let anyInput: any;
unknownInput = 'Hi!'
anyInput = 'Hi!'
unknownInput = 21
anyInput = 21
let text: string;
text = unknownInput; // エラー。
text = anyInput; // 代入できてしまう。
// unknownはifなどでチェックして使うのがセオリー
if (typeof unknownInput === 'string') {
  text = unknownInput;
}

// ************************************************************
// ########never型(version3以降)

// 決して戻り値を返さない(エラーのthrowなど)時に使える。
function err(msg: string): never {
  throw new Error(msg);
}
console.log(err('This is an error'));

// iiiii CHECK iiiii
// voidと似ているが、voidは戻り値が定義されていない(undefined)のに対し、
// neverは何も返さない特定の状態に使う。

// ************************************************************
// ########this

// ####thisとは?
// あるオブジェクトの参照。
// 宣言した場所ではなく、❗️呼び出される場所❗️によって参照するオブジェクトが異なる。
/*
++++----------------
1️⃣ In a method: this = owner object

2️⃣ Alone(単独使用): this = global object // webブラウザの場合: window
                                      // Node.jsの場合: global

3️⃣ In a function: this = global object // In strict mode: = undefined

4️⃣ In a constructor: this = newで生成されたインスタンス自身 // newを使わないとfunctionと同じ。

5️⃣ In a event: this = element that received this event(イベントを受け取った要素)

6️⃣ call() and apply(): this = any object // 自分でセット可能。
--------++++--------
よくある例

1️⃣event
クラス内で addEventListener を定義したと想定する。
addEventListener の 2nd para に callback を設定するが、
下記のようにそのままだと this は event の対象である element になってしまう。
element.addEventListener('click', this.<callback>);

インスタンス自身を正常に参照するためには、下記のように bind() を使用する。
bind() は、連結するメソッドの this を 1st para に固定する。
つまり .bind(this) とすることで、インスタンス自身を指し示すようになる。
element.addEventListener('click', this.<callback>.bind(this));
----------------++++
*/

// ==============================
// ####アロー関数とthis

// アロー関数内の this 値は通常の変数検索ルールに従います（スコープに this 値がない場合、
// その一つ外側のスコープで this 値を探します）。
// !!!!! WARNING !!!!!
// 【 宣言した時点 】で this を確定し、以降、どこで使われても this は変わらない(一途)。

// ************************************************************
// ########Class

// ####Classとは?
// *オブジェクトの設計図。
// *Classから作られたオブジェクトはインスタンスと呼ぶ。
// *似たオブジェクトを複製する時に便利。

// ==============================
// ####Classの基本的な書き方

class Person {
  /**
   * この先頭の項目を「フィールド」と呼ぶ。
   * iiiii CHECK iiiii
   * publicもprivateも書かない場合は、publicになる。
   */

  // ◆public修飾子(default)
  // privateの反対。内外どちらでも利用可能。
  public name: string; //nameフィールド
  // iiiii CHECK iiiii
  // ここではconstructorを使って初期化しているが、
  // constructorを使わずに下記のように直接初期値を代入することもできる
  // 💡 name: string = 'Tanaka';

  // ◆private修飾子
  // 指定したフィールドやメソッドは、classの内部でのみ利用可能。外部ではアクセスできない。
  // 今回は、ageの変更はincrementAge()のみで行うために指定。
  private age: number; //ageフィールド

  // classの初期化。省略した書き方は自項目を参照。
  constructor(initName: string, initAge: number) {
    this.name = initName;
    this.age = initAge;
  }

  incrementAge() {
    this.age++;
  }
  // ◆thisの型注釈/classを型として指定する方法  ※通常のparaは2つ目以降に指定する。
  // iiiii CHECK iiiii
  // classは作成した時点で型にすることができる。
  // classを型にした場合、そのclassと同様のプロパティとメソッドを持つ必要がある。
  greeting(this: Person) {
    console.log(`Hello! MY name is ${this.name}. ${this.age} years old.`);
  }
}

const tanaka = new Person('Tanaka', 25);
console.log(tanaka) // Person { name: 'Tanaka' }
tanaka.greeting();
tanaka.incrementAge();
tanaka.greeting();

const anotherTanaka = {
  // tanaka.greetingでthisの型をclassで指定したので、
  // 同様のプロパティとメソッドを指定する必要がある。
  name: 'Another Tanaka',
  age: 42,
  incrementAge: tanaka.incrementAge,
  greeting: tanaka.greeting
}
// Personクラスのgreeting()でthisにPerson型を指定している。
// そのため、Personクラスと同じプロパティとメソッドの構成にしなければいけないが、
// Personクラスはageフィールドがprivate。anotherTanakaはageをprivateにできないため、
// 下記のとおりエラーとなる(ageのprivateを外すとエラーは消える)。
anotherTanaka.greeting();
anotherTanaka.incrementAge();
anotherTanaka.greeting();

// ==============================
// ####constructorの省略記法

// 前項目のPersonクラスのフィールドおよびconstructorは、
// 下記のように省略できる。
// !!!!! WARNING !!!!!
// public, private, readonly(次項)のいずれかを明記する必要がある(readonlyは他と併用可)。

class Person2 {
  constructor(public name: string, private age: number) {
  }
}

// ==============================
// ####readonly修飾子/protected修飾子

// ◆readonly修飾子
// classの内外問わず、読み取り専用にする。
// privateやpublicと併用する場合は、privateとpublicより後に書かなければいけない。

// ◆protected修飾子
// 継承先のクラスでも操作できる。
// ただし、クラス外では操作できない。

class Person3 {
  readonly id: number = 10;
  constructor(public readonly name: string, protected age: number) {
    // constructor内であればreadonlyでも書き込み可。
    this.id = 11;
  }

  greeting() {
    console.log(`Hello! MY name is ${this.name}. ${this.age} years old.`);
    console.log(`My id is ${this.id}`);
  }
}

// ==============================
// ####extends/継承

class Teacher extends Person3 {
  // subjectはTeacherクラス独自のpara。
  constructor(name: string, age: number, public subject: string) {
    // 親クラスからparaを引き継ぐ場合、super()を使う。
    super(name, age);
  }

  // 関数を変更する場合は、同名で作成して上書きする。
  greeting() {
    console.log(`Hello! MY name is ${this.name}. ${this.age} years old. I teach ${this.subject}.`);
    console.log(`My id is ${this.id}`);
  }
}

const teacher = new Teacher('Bob', 32, 'Math');
teacher.greeting();

// ==============================
// ####getter/setter/ゲッター/セッター

// getterやsetterのことをaccessor(アクセサー)と呼ぶ。
// TypeScript独自の機能ではなく、jsにも存在する。

// iiiii CHECK iiiii
// getterの戻り値とsetterの引数(getterの戻り値に代入する値)の型は一致しないといけない。

class Teacher2 {
  // ◆getter
  // 値を取得した時(値にアクセスした時)に関数を実行する。必ずアクセスしたい値を返す必要がある。
  get subject(): string {
    if (!this._subject) {
      throw new Error("[getter]There is no subject.");
    }
    return this._subject;
  }
  // ◆setter
  // 値を代入した時に関数を実行する。
  // iiiii CHECK iiiii
  // getterと同じ関数名を設定できる(共存することはないため)。
  // 引数valueの型は、getterの戻り値の方と一致する。
  set subject(value) {
    if (!value) {
      throw new Error("[setter]There is no subject.");
    }
    this._subject = value;
  }
  constructor(private _subject: string) {
  }
}

const teacher2 = new Teacher2('');
// setter発動。
// 空文字の場合はif文によってエラーが返る。
teacher2.subject = 'Music';
// getter発動。
// getterによってprivateな値にもアクセスできる。　※subject()と書かないことに注意。
console.log(teacher2.subject);

// ==============================
// ####static

// static(静的)を使うと、インスタンスを使わずにクラスを使うことができる。
// TypeScript独自の機能ではなく、jsにも存在する。

class Person4 {
  static species = 'Homo sapiens';
  static isAdult(age: number) {
    if (age > 17) return true;
    return false;
  }
  constructor(private name: string) {
  }
  greeting(this: Person4) {
    console.log(`Hi! I'm ${this.name}.`);
    // thisはインスタンスを表すので、staticでは使えない。
    // よって、クラス内でもthisではなくクラス名をつける。
    console.log(`I'm ${Person4.species}.`);
  }
}

console.log(Person4.species);
console.log(Person4.isAdult(18));
const ken = new Person4('Ken');
ken.greeting();

// ==============================
// ####Abstract

// Abstract(抽象)を使うと、継承のみに使うクラスを作成できる。

// iiiii CHECK iiiii
// abstract classはTypeScriptの機能。jsにはない。
// ただし、ES2015(ES6)以降だと、abstractを除外した形で同じように書ける(規約がゆるい)。

// iiiii CHECK iiiii
// abstract classはインスタンスを作成することができない。継承専用。
abstract class Person5 {
  constructor(readonly name: string) {
  }
  greeting(this: Person5) {
    console.log(`Hi! I'm ${this.name}.`);
    this.explainJob();
  }
  // abstractをつけたプロパティは、子classで明記しないとエラーとなる。
  abstract explainJob(): void; // voidは戻り値のない型。
}

class Police extends Person5 {
  // explainJob()は親クラスでabstractをつけたので、必ず記載する。
  explainJob() {
    console.log(`I'm a ${this._job} police.`);
  }
  constructor(readonly name: string, private _job: string) {
    super(name);
  }
}

const policeA = new Police('John', 'traffic');
policeA.greeting();

// ==============================
// ####シングルトンパターン/private constructor

// シングルトンパターン
// デザインパターンの一種。
// クラスからインスタンスを1つしか作れないようにする。
// staticと組み合わせて使うことが多い。

class Teacher3 {
  // staticメソッドgetInstance()からアクセスするために、staticなプロパティとする。
  // getInstance()はインスタンスから実行されないので、staticがないとinstanceプロパティにアクセスできない。
  // privateをつけることで、インスタンスが複数作られるのを防ぐ。
  private static instance: Teacher3;
  private constructor(readonly name: string, readonly subject: string) {
  }
  greeting() {
    console.log(`I'm ${this.name}. I teach ${this.subject}.`)
  }
  // シングルトンパターンで実行するため、クラスの外ではなく中でインスタンスを作成する。
  static getInstance() {
    // インスタンスを一度だけ作成するため、2度目以降は既存のインスタンスを返すようにする。
    if (Teacher3.instance) return Teacher3.instance;
    Teacher3.instance = new Teacher3('Ben', 'Math');
    return Teacher3.instance;
  }
}

const teacher3 = Teacher3.getInstance();
const teacher3Second = Teacher3.getInstance();
teacher3.greeting();
teacher3Second.greeting(); // 上記と同じ。

// ************************************************************
// ########interface

// オブジェクトの型のこと。
// オブジェクトのみのtypeエイリアス(型を変数のようにあつかえる機能)のようなもの。

// typeエイリアスによるオブジェクトの型指定も、interfaceも、
// 正直なところ機能的にほとんど違いはない。
// interfaceは他の型とのUnion型を使うことはできず、融通が利かない。

// ただ、interfaceはオブジェクトに特化した型指定なので、
// わかりやすい(すぐにオブジェクトの型だと判断できる)のが強み。

// ◆typeエイリアス
type Human = {
  name: string;
  age: number;
}
const human: Human = {
  name: 'Alan',
  age: 34
}
let developer: Human;

// ◆interface
interface HumanIF {
  name: string;
  age: number;
}
const humanIF: HumanIF = {
  name: 'Alan',
  age: 34
}
let developerIF: HumanIF;

// ==============================
// ####interfaceのメソッド指定

interface Human2 {
  name: string;
  age: number;
  greetingES5: (msg: string) => void; // 書き方1
  greeting(msg: string): void; // 書き方2 ※メソッド限定の書き方。通常の関数は不可。
  greetingArrow: (msg: string) => void; // 書き方1
}

// 補足
// interfaceなど、型注釈を使わなかった場合、
// メソッドの型推論は下記のとおりとなる。
// ◆メソッド with ES5 => 書き方1
// ◆メソッド with ES6 => 書き方2
// ◆メソッド with Arrow func => 書き方1

const human2: Human2 = {
  name: 'Alan',
  age: 34,
  // ◆メソッド with ES5
  greetingES5: function (msg: string) {
    console.log(msg);
  },
  // ◆メソッド with ES6
  greeting(msg: string) {
    console.log(msg);
  },
  // ◆メソッド with Arrow func
  greetingArrow: (msg: string) => {
    console.log(msg)
  }
}

// ==============================
// ####implements

// クラスに対してinterfaceを適用することができる。

interface Human3 {
  name: string;
  greeting(msg: string): void;
}

interface experience {
  exp: number;
}

// extends(継承)と違い、interfaceは複数指定することができる。
// iiiii CHECK iiiii
// implementsには、interfaceだけでなくオブジェクト型のtypeエイリアスも適用できる。
// しかし、typeエイリアスは様々な型に使えてしまうので、interfaceを使うほうがわかりやすくて無難。
class Developer implements Human3, experience {
  // !!!!! WARNING !!!!!
  // interfaceで指定したparaはpublicかreadonlyでないといけない。
  // クラス独自に追加したpara(例: 下記foo)はその限りでない。
  constructor(public name: string, readonly exp: number, private foo: 'foo') {
  }
  greeting(msg: string) {
    console.log(msg);
  }
}

// implementsは、そのクラスから生成されるインスタンスが持つオブジェクトの型を指定する。
// なので、インスタンスの範囲外であるstaticをinterfaceに含むことはできない
// (このstaticをクラスに持たせる、とうことをinterfaceで指定することはできない)。

// ==============================
// ####構造的部分型

// 指定した型(下記の場合Human3)ではparaはnameの1つのみだが、それ以上のparaを持つ
// Developerインスタンスを代入してもエラーにならない。
// このように、指定した型より多くのparaを許容することを、構造的部分型と呼ぶ。
const userDev: Human3 = new Developer('Cody', 1, 'foo')
// !!!!! WARNING !!!!!
// あくまで許容するだけなので、型(Human3)に含まれないプロパティを取得しようとすると
// 下記のとおりエラーとなる。
console.log(userDev.exp)

// ==============================
// ####interfaceに適用するreadonly

// interfaceにもreadonlyを使える(publicやprivateは使えない)。
interface Human4 {
  readonly name: string;
  age: number;
}

let harry: Human4 = {
  name: 'Harry',
  age: 34
}
// readonlyのため変更不可。
harry.name = 'Harrrrry'

// !!!!! WARNING !!!!!
// implementsによってクラスにinterfaceを適用し、
// そのクラスからインスタンスを生成した場合、
// interfaceにreadonlyがあってもインスタンスには適用されない。
// インスタンスは、あくまでクラス自身の設定によって生成される。

// ==============================
// ####interfaceの継承(extends)/typeエイリアスの継承も含む

interface Nameable {
  name: string;
}

type SetHight = {
  hight: number;
}

// interfaceのextendsは、クラスと違い複数指定可能。
// interfaceだけでなくtypeエイリアス(下記の場合SetHight)も指定できる。
interface Human5 extends Nameable, SetHight {
  // 親に含まれるプロパティ(下記ではname)は、型が一致していれば指定できる(型が異なるとエラー)。
  name: string,
  age: number;
}

class Developer2 implements Human5 {
  constructor(public name: string, public age: number, public hight: number) {
  }
}

// ++++----------------
// typeエイリアスの継承

// typeエイリアスの場合、インターセクション型(&)を使って継承と同じように設定できる。
// iiiii CHECK iiiii
// インターセクション型(&)はAかつBの意。
type Human6 = {
  // interfaceの継承と異なり、重複するプロパティ(下記name)の型が異なってもエラーにならない。
  // ただし、下記のnumberかつstringのように、
  // 存在しない型だと戻り値がnever型になる(以降のオブジェクトリテラルを参照)。
  name: number;
  age: number;
} & Nameable

let hector: Human6 = {
  name: 'Hector',
  age: 13
}
// ----------------++++

// ==============================
// ####interfaceによる関数の型

// iiiii CHECK iiiii
// 基本的にtypeエイリアスの方が関数の型としてはわかりやすいが、
// こういう書き方もあるよ、と覚えておく。

// ◆typeエイリアスの場合
// type AddFunc = (num1: number, num2: number) => number;
// ◆interfaceの場合
interface AddFunc {
  (num1: number, num2: number): number;
}
let addFunc: AddFunc;
addFunc = (num1, num2) => num1 * num2;

// ************************************************************
// ########?/optional/あってもなくてもいい項目(プロパティやパラメータなど)の指定

interface Nameable2 {
  name?: string; // このプロパティはあってもなくてもいい。
  greeting?(msg: string): void; // ?はメソッドにも使える。
}
// iiiii CHECK iiiii
// 上記はinterfaceだが、typeエイリアスでも同じように使える。

class Developer3 implements Nameable2 {
  // ?はフィールドにも使える。
  name?: string;
  // ?はconstructorでも使える。
  constructor(initName?: string) {
    // 下記のように、初期値が与えられたら?を指定したフィールドに代入する、といった使い方ができる。
    if (initName) {
      this.name = initName;
    }
  }
  // ?はparaにも使える。メソッドでも通常の関数でもOK。
  greeting(msg?: string) {
    if (msg) {
      console.log(msg);
    }
  }
  // =でpara未定義時の初期値を指定できる(ES2015の機能)。 ※?と同時には使えないので注意。
  greeting2(msg: string = 'Hello!') {
    console.log(msg);
  }
}

// iiiii CHECK iiiii
// 上記Developer3クラスの初期化部分(フィールドとconstructor)は、
// 下記のように短く書くこともできる。
class Developer4 implements Nameable2 {
  constructor(readonly name?: string) {
  }
}

// ************************************************************
// ########インターセクション型(&)

// AかつB。

// 下記のEngineerとBloggerはtypeエイリアスを使っているが、interfaceであっても問題ない。
type Engineer = {
  name: string;
  role: string;
}
type Blogger = {
  name: string;
  follower: number;
}

type EngineerBlogger = Engineer & Blogger;
// iiiii CHECK iiiii
// interfaceの場合はextendsを使う。
interface EngineerBlogger2 extends EngineerBlogger, Blogger { }

const abigail: EngineerBlogger = {
  name: 'Abigail',
  role: 'front-end',
  follower: 1000
}

// iiiii CHECK iiiii
// 存在し得ない型を指定するとnever型になる(tmpをホバーで確認)。
type tmp = string & number;
// 重なる型があれば、その型になる(数学の集合と同じ)。下記Mixの場合、number。
type NumberBoolean = number | boolean;
type StringNumber = string | number;
type Mix = NumberBoolean & StringNumber;

// ************************************************************
// ########Type guards/タイプガード/型の絞り込み

// Type guardは型の絞り込み。
// 下記3つの方法がある。 ※すべてjsに存在する演算子。
// 1. typeof演算子
// 2. in演算子
// 3. instanceof演算子

// typeof演算子
function toUpperCase(x: string | number) {
  // typeof x === '' と入力するとsuggestが表示される。
  if (typeof x === 'string') {
    // typeofで絞り込むことで、文字列のsuggestが表示されるようになる。
    return x.toUpperCase();
  }
  return '';
}

// in演算子
type NomadWorker = Engineer | Blogger;
function describeProfile(nomadWorker: NomadWorker) {
  // そのままだと、EngineerとBlogger両方に存在するプロパティしか指定できない。
  console.log(nomadWorker.name);
  // in演算子でプロパティ名を指定することで、片方にしか存在しないプロパティにもアクセスできる(補完も効く)。
  if ('role' in nomadWorker) {
    console.log(nomadWorker.role);
  }
}

// instanceof演算子
class Dog {
  speak() {
    console.log('bow-wow');
  }
}
class Bird {
  speak() {
    console.log('tweet-tweet');
  }
  fly() {
    console.log('flutter');
  }
}
type Pet = Dog | Bird;
// paraにクラス(Dog or Bird)を指定。
function havePet(pet: Pet) {
  pet.speak();
  // pet引数がBirdクラスのinstanceだった場合true。
  if (pet instanceof Bird) {
    // 上記の条件によってBirdクラス独自のfly()を使用できる(suggestも表示)。
    pet.fly();
  }
}
// instanceofは、下記のように指定したクラスのinstanceでないとtrueとならない。
// 同じプロパティを持つオブジェクトを引数に指定しても、instanceではないのでfalseとなる。
havePet(new Bird());

// ==============================
// ####typeofによる型の指定  ⭐便利!

// ++++----------------
// typeof 値 の形で、値の型をAnnotationすることができる。
let msg = 'Hi!';
let msg2: typeof msg;

// --------++++--------
// よって、型の代入にも使える。
const adela = {
  name: 'Adela',
  age: 28
} as const;

type TypeAdele = typeof adela;

// ----------------++++

// ==============================
// ####keyof/keyof + typeof

// objectのkeyをunion型で取得する。
type KEYS = {
  primary: string;
  secondary: string;
}
let key: keyof KEYS; // hover check
key = "primary";

// typeofと組み合わせて、objectのkeyをunion型として型注釈できる。
const SPORTS = {
  soccer: "Soccer",
  baseball: "Baseball"
}
let keySports: keyof typeof SPORTS;
keySports = "baseball"; // hover check

// ************************************************************
// ########タグ付きunion/tagged unions/discriminated unions,

// union型のそれぞれの項目に、共通のプロパティ(今回はkind)を作り、条件分岐を行う方法。
// iiiii CHECK iiiii
// 下記ではクラスを使っているが、interfaceでリテラル型を作って同じようにswitch文を作ることもできる。

class Dog2 {
  // constructor() {
  //   this.kind = 'dog';
  // }
  // 上記と同じ意(kindプロパティに'dog'というリテラル型を指定。そして初期値'dog'を代入)。
  kind: 'dog' = 'dog';
  speak() {
    console.log('bow-wow');
  }
}
class Bird2 {
  // constructor() {
  //   this.kind = 'bird';
  // }
  // 上記と同じ意(kindプロパティに'bird'というリテラル型を指定。そして初期値'bird'を代入)。
  kind: 'bird' = 'bird';
  speak() {
    console.log('tweet-tweet');
  }
  fly() {
    console.log('flutter');
  }
}
type Pet2 = Dog2 | Bird2;
// paraにクラス(Dog or Bird)を指定。
function havePet2(pet: Pet2) {
  pet.speak();
  switch (pet.kind) {
    case 'bird':
      pet.fly();
      break;
    default:
      break;
  }
}
havePet2(new Bird2());

// ************************************************************
// ########型アサーション

// 手動で型を上書きする方法。

// 下記は、htmlのinputエレメントを操作したい、という状況。

// inputの型は、HTMLElement | null(inputをマウスで確認)。getElementById()の規定の型。
const input = document.getElementById('input');
// iiiii CHECK iiiii
// HTMLElementはTypeScriptによってinterfaceとして登録されている(getElementByIdで
// F12、跳んだ先の設定ファイルでHTMLElementを選択してF12。そうするとinterfaceの設定を見られる)。

// !!!!! WARNING !!!!!
// HTMLElement型は、とても抽象的なもの。
// inputやbuttonゃpや...、それぞれプロパティは異なるが、HTMLElementはそこまで判別できない。
// なので、下記のように指定してもinputエレメントのプロパティが補完されない。
if (input) {
  input.value; // エラーになってしまう。
}

// 上記のようなエラーを解消するため、input独自のHTMLInputElement型を指定する。
// ただし、getElementById()の型はHTMLElement | nullなので、下記の書き方はエラーとなる。
const input2: HTMLInputElement = document.getElementById('input');

// 上記のエラーを解消するのが型アサーション。
// 2つの書き方がある。

// 型アサーション1
const input3 = <HTMLInputElement>document.getElementById('input');
input3.value = 'initial input value.';
// 1行version
(<HTMLInputElement>document.getElementById('input')).value = 'initial input value.';

// 型アサーション2  ⭐️JSXを使う場合は、タグと見分けがつきやすいようにこちらがおすすめ。
const input4 = document.getElementById('input') as HTMLInputElement;
input4.value = 'initial input value.';
// 1行version
(document.getElementById('input') as HTMLInputElement).value = 'initial input value.';

// ==============================
// ####constアサーション/as const

// 通常のconstと似ているが、代入先の型もリテラル型にすることができる。

const milk = 'milk' as const;
let drink = milk; // 'milk'型(リテラル型)

const milk2 = 'milk';
let drink2 = milk; // string型

// 配列につけるとreadonlyのタプル型にすることができる(hover check)。
const arr = [10, 20] as const;

// objectにつけてもreadonlyかつリテラル型にすることができる(hover check)。
const peter = {
  name: 'Peter',
  age: 28
} as const;

// ************************************************************
// ########!/Non-null assertion operator

// nullじゃないと宣言する。型からnullを除外する。

// 末尾に ! を付与することで、nullを除外する。
const input5 = document.getElementById('input')!;

// ************************************************************
// ########インデックスシグネチャ

// オブジェクトにプロパティを追加する。
// ❗️規約がゆるいので、本当に必要な時以外は使わないほうがいい。

interface Designer {
  name: string;
  // インデックスシグネチャ
  // 左のstringはプロパティ名の型。
  // !!!!! WARNING !!!!!
  // インデックスシグネチャの型は、他のプロパティにも影響する。
  // 今回の場合、stringとnumber以外の型は指定できない。
  [index: string]: string | number;
}

const designer: Designer = {
  name: 'Ada',
  // インデックスシグネチャによって、roleとageを追記できる。
  role: 'web',
  age: 23
}

// インデックスシグネチャによって追加したプロパティは、補完されないので手入力が必要。
// !!!!! WARNING !!!!!
// ❗️どんなプロパティ名でもエラーにならないので、注意が必要。
console.log(designer.role);

// ************************************************************
// ########関数のオーバーロード

// 戻り値の型を正しくTypeScriptに伝える方法。

// オーバーロードはparaの型それぞれに指定する。不足があるとエラーになるので注意。
// オーバーロードは上から順番に適用される。よって、一番上にanyを置くと全部any型になるので注意。
function toUpperCase2(x: string): string; // オーバーロード
function toUpperCase2(x: number): number; // オーバーロード
function toUpperCase2(x: string | number) {
  // typeof x === '' と入力するとsuggestが表示される。
  if (typeof x === 'string') {
    // typeofで絞り込むことで、文字列のsuggestが表示されるようになる。
    return x.toUpperCase();
  }
  return x;
}

const upperHello = toUpperCase2('hello!'); // string型
const upperNum = toUpperCase2(22); // number型

// !!!!! WARNING !!!!!
// 関数のオーバーロードは、いまのところ関数宣言でしか使えない模様。
// 関数式(constなどで定義する関数。allow関数もこれ。)は非対応。

// ************************************************************
// ########オーバーロードの型

// オーバーロードした関数をinterfaceのような型として適用することもできる。
const upperHello2 = toUpperCase2;
upperHello2('hello.');
upperHello2(43);

// 明示的にオーバーロードの型を指定する場合は、interfaceを使う。
interface TmpFunc {
  (x: string): number;
  (x: number): number;
}
// オーバーロードの型を適用したら、下記のようにオーバーロードのすべての条件を満たす関数を代入する必要がある。
const tmpFunc: TmpFunc = function (x: string | number) {
  return 0;
}

// ==============================
// ####関数同士のインターセクション型(&)/intersection type

// 関数同士を合わせたオーバーロード型となる。

interface FuncA {
  (a: number, b: string): number;
  (a: string, b: number): number;
}
interface FuncB {
  (a: string): number;
}
// オーバーロードの順番は、下記の場合FuncAが先となる。
let intersectionFunc: FuncA & FuncB;
// hoverでオーバーロードであることを確認。
intersectionFunc();
// オーバーロードの型を適用したら、下記のようにオーバーロードのすべての条件を満たす関数を代入する必要がある。
intersectionFunc = function (a: number | string, b?: number | string) {
  return 0;
}

// ==============================
// ####関数同士のunion型(|)

// paraはインターセクション型(&)になり、
// reValはunion型(|)になる。
// ややこしい。

interface FuncC {
  (a: number): number;
}
interface FuncD {
  (a: string): string;
}
// オーバーロードの順番は、下記の場合FuncAが先となる。
let unionFunc: FuncC | FuncD;
// hoverでオーバーロード❗️ではない❗️ことを確認できる。
// paraはインターセクション型(&) => number & stringで存在し得ない型なのでnever型
// reValはunion型(|) => number | string
unionFunc();
// ただし、下記のとおりparaがnumberやstringである関数を代入できる。
// 型としてはnever型だが、実際には FuncC | FuncD の型として機能する。
unionFunc = function (a: number) { return 0 };
unionFunc = function (a: string) { return 'Hi' };

// ************************************************************
// ########Optional Chaining  ⭐️ts 3.7.0以降

interface DownloadedData {
  id: number;
  user?: { // ?つきなので、このプロパティはあってもなくてもいい。
    name?: { // ?つきなので、このプロパティはあってもなくてもいい。
      first: string;
      last: string;
    }
  }
}

const downloadData: DownloadedData = {
  id: 3
}
// Optional Chaining
// ?をつけることで、undefinedの可能性があるプロパティもエラーを出さずに実行できる。
// 下記の場合、エラーとならずにundefinedが表示される。
// iiiii CHECK iiiii
// 通常、javascriptではundefinedやnullに対してプロパティをつなげるとエラーとなるが、
// Optional Chainingはそれを回避できる(undefined or nullが確定した時点で、
// undefined or nullを返す)。
console.log(downloadData.user?.name?.first);

// ************************************************************
// ########Nullish Coalescing  ⭐️ts 3.7.0以降

// undefined or nullだった場合、??の右側の値を返す。
const userData = downloadData.user ?? 'no-user';

// iiiii CHECK iiiii
// OR演算子(||)や三項演算子でも似たことができるが、
// Nullish Coalescing(??)はundefined or nullの時だけ、という違いがある。
// true or falseによる分岐ではないことに注意。

// ************************************************************
// ########LookUp型

// オブジェクトのメンバーの型を取得する。

// []で指定。
type id = DownloadedData['id'];
// union型も可能。
type idUser = DownloadedData['id' | 'user'];

// ************************************************************
// ########型の互換性/Type Compatibility/Assignment Compatibility

// 例
// リテラル型からstring型への代入は可能。
const MSG = 'Hi!';
let tmpMsg: string = MSG;
// (たとえ値は同じでも)string型からリテラル型へは代入できない。
let tmpMsg2: 'Hi!' = tmpMsg;

// ほかにもたくさんの型の互換性が存在する。
// 全部覚えるのは難しいので、必要な時に下記ページを参照。

// 💡Type Compatibility
// https://www.typescriptlang.org/docs/handbook/type-compatibility.html

// 💡Assignment Compatibility
// https://github.com/microsoft/TypeScript/blob/master/doc/spec.md#3.11.4

// 💡Type Assertions
// https://github.com/microsoft/TypeScript/blob/master/doc/spec.md#4.16

// ************************************************************
// ########The + operator

// なんでもエラーを出すわけではなく、tsもそれなりに柔軟。

//
// https://github.com/microsoft/TypeScript/blob/master/doc/spec.md#4.19.2


// ************************************************************
// ########残余引数/レストパラメーター/rest parameter

// 残余引数の型注釈
function advanceFunc(...args: number[]) {
}
advanceFunc(1, 234, 42, 32, 3);

// タプル型を指定して、引数の数を決めることもできる。
function advanceFunc2(...args: [number, string, boolean]) {
}
advanceFunc2(1, 'Hi', true);

// タプルは?もつけられる(あってもなくてもいいpara)。
// !!!!! WARNING !!!!!
// ?は複数のparaにつけられるが、末尾からつけていくこと。途中に?なしparaがあるとエラーとなる。
// ※下記のadvanceFunc4のように、残余引数を末尾に置く場合のみ例外。
function advanceFunc3(...args: [number, string, boolean?]) {
}
advanceFunc3(1, 'Hi');

// 下記のようにタプルに残余引数を入れることもできる。
function advanceFunc4(...args: [number, string, boolean?, ...number[]]) {
}
advanceFunc4(1, 'Hi', false, 211, 4, 4, 8, 1000);
// ?つきparaがある場合、そのargが存在しない場合は残余引数も入れられないので注意(エラーになる)。
advanceFunc4(1, 'Hi', 211, 4, 4, 8, 1000);

// ************************************************************
// ########配列やタプルのreadonly修飾子

// 配列のreadonly
function advanceFunc5(...args: readonly number[]) {
  // reaconlyなので要素の追加もできなくなる。
  args.push(100)
}

// タプルのreadonly
function advanceFunc6(...args: readonly [number, string, boolean?, ...number[]]) {
}

// ************************************************************
// ########ジェネリクス/ジェネリックス

// 型を引数として受け取る仕組み。
// ジェネリスクによって作られる型を、ジェネリック型という模様。

// 関数名とparaの間に<>を入れることでジェネリクスを設定できる。
// <>に入れる文字はなんでもいいが、T(Typeの意)を使うことが多い。
// <>を書いたら、以降、型注釈としてどこでも使える。
function copy<T>(value: T): T {
  return value;
}
// アロー関数の場合も、引数の前につければ良い。
const copyArrow = <T>(value: T): T => {
  return value;
}

// 💡💡ジェネリクスはparaと同じように複数指定できる。
// <T, T2, T3>や<T, U, V>を使うことが多い。

// 💡💡<T = string> のように、defaultの型を指定できる。
// 型の代入がなかった場合、defaultの型になる。

// ジェネリクスにstring型を指定するには、下記のとおりに書く。
// string型を設定したことで、suggestも効くようになる。
console.log(copy<string>('hello').toUpperCase());

// ❗️❗️重要❗️❗️
// オブジェクトの場合、型推論でそのオブジェクトの型が認識される。
// 詳細
// 関数宣言は function copy<T>(value: T): T (以降略)である。
// 下記ようにcopy({ name: 'Alana' })とすると、
// 引数valueが({ name: 'Alana' })なので、
// 型推論によって、ジェネリック型(T)は{ name: string }型だと認識される。
console.log(copy({ name: 'Alana' }).name);

// ==============================
// ####ジェネリクス with extends

// ジェネリクスでもextendsを使うことができる。
// クラスだと拡張のイメージがあるが、ジェネリクスでは型に制約をかけるイメージ。
function copy2<T extends { name: string }>(value: T): T {
  return value;
}
// extendsによって、<T>は{ name: string }であると制約されている。
// よって、nameプロパティがないとエラーとなる。
console.log(copy2({ nameee: 'Alberta' }));

// ==============================
// ####ジェネリクス with keyof演算子

// keyof演算子は、オブジェクトの名前(key)をunion型で取得する(hover Key)。
type Key = keyof { name: string; age: number; }

// keyofをextendsでジェネリクスに適用できる。
function copy3<T extends { name: string }, U extends keyof T>(value: T, key: U): T {
  // 💡ブラケット (角括弧) 記述法でオブジェクトにアクセスできる。
  console.log(value[key]);
  return value;
}
// copy3()の2paraは<T>のkeyofなので、name or ageのみ可能。
console.log(copy3({ name: 'Alberta', age: 38 }, 'age'));

// ==============================
// ####ジェネリクス with クラス

class LightDatabase<T extends string | number | boolean> {
  private data: T[] = [];
  add(item: T) {
    this.data.push(item);
  }
  remove(item: T) {
    // Array.prototype.splice()
    // 1st para  取り除く要素の開始index
    // 2nd para  取り除く要素の数
    this.data.splice(this.data.indexOf(item), 1);
  }
  get() {
    return this.data;
  }
}

// ジェネリクスにstring型を指定。
const stringLightDatabase = new LightDatabase<string>();
stringLightDatabase.add('Apple');
stringLightDatabase.add('Banana');
stringLightDatabase.add('Grape');
stringLightDatabase.remove('Banana');
console.log(stringLightDatabase.get()); // [ 'Apple', 'Grape' ]

// ==============================
// ####ジェネリクス with interface, typeエイリアス

// ◆interface
interface TmpDatabase<T> {
  id: number;
  data: T[];
}
// ジェネリクスにnumber型を指定。
const tmpDatabase: TmpDatabase<number> = {
  id: 3,
  data: [436]
}

// ◆typeエイリアス
type TmpDatabase2<T> = {
  id: number;
  data: T[];
}
// ジェネリクスにnumber型を指定。
const tmpDatabase2: TmpDatabase2<number> = {
  id: 3,
  data: [436]
}

// ==============================
// ####ジェネリクス with Utility

// Utility
// 型のライブラリのこと。
// TypeScriptがあらかじめ用意してくれているので、importしなくても使える便利な型。

interface Todo {
  title: string;
  text: string;
}
// Utilityはいくつもあるが、代表的なものをいくつか。
type Todoable = Partial<Todo> // すべてオプショナル(?付き)にする。
type ReadTodo = Readonly<Todo> // すべてreadonlyにする。

// ==============================
// ####ジェネリクス with Promise

// defaultだとPromiseConstructorの型は、
// ジェネリクスによって<unknown>になっている(hover Promise)。
const tmpFetchData = new Promise();

// Promise<string>のように、ジェネリクスで型を明記できる。
const fetchData: Promise<string> = new Promise(resolve => {
  setTimeout(() => {
    resolve('Hello!') // resolve()は、argをthenの1st paraに渡す関数。
  }, 3000);
})
// 型の指定によりdataはstring型になる。suggestも効く。
fetchData.then(data => {
  console.log(data.toUpperCase());
})

// ==============================
// ####ジェネリクスによるデフォルトの型

// <T = 型>とすることでデフォルトの型を指定できる。
interface ResponseData<T = any> {
  data: T;
  status: number;
}
// デフォルトの型を指定したので、<T>を明示しなくてもエラーにならない。
let tmpResponseData: ResponseData;

// ************************************************************
// ########型のfor文/Mapped Types

// 構文
// [P in union型]: 指定したい型

// Pは慣習なので、PでなくてもOK。
// union型の部分がiteration(反復)される。

// ◆すべてリテラル型
type MappedTypes = {
  [P in 'tomato' | 'pumpkin']: P;
}

// ◆すべてstring型
// 💡readonlyやoptional(?)を付けることもできる。
type MappedTypes2 = {
  readonly [P in 'tomato' | 'pumpkin']?: string;
}

// ◆すべてstring型 with keyof
interface Vegetables {
  readonly tomato: string;
  pumpkin?: string;
}
// 参照元(Vegetables)の readonly や ? は維持される。
type MappedTypes3 = {
  // keyof演算子は、オブジェクトやinterfaceの名前(key)をunion型で取得する。
  [P in keyof Vegetables]: string;
}
//  readonly や ? に - を付けると、参照元(Vegetables)の readonly や ? を取り除ける。
type MappedTypes4 = {
  -readonly [P in keyof Vegetables]-?: string;
}

// ◆汎用
// 下記のようにジェネリクスを使って汎用的に使用する場合もある。
type MappedTypes5<T> = {
  [P in keyof T]: string;
}

// ************************************************************
// ########型のif文(三項演算子)/Conditional Types

// Conditional Typesでのextendsは、
// A extends B(型) の場合、
// A は B(型) に代入できるか? という意味。
// iiiii CHECK iiiii
// Aには値だけでなく、型を入れることもできる。

// 三項演算子と同じで、? の次がtrue、: の次がfalse。

// true(hover ConditionalTypes)
type ConditionalTypes = 'tomato' extends string ? number : boolean;
// false(hover ConditionalTypes2)
type ConditionalTypes2 = string extends 'tomato' ? number : boolean;

// ◆infer
// anyのような意味合いで値を取得できる。R (Rは慣習。他の文字でも可)に当てはまる部分を推論し、
// true条件を R とすることで、R型を返すことができる。
// iiiii CHECK iiiii
// false条件に R を指定することはできない。
type ConditionalTypesInfer = { tomato: 'tomato' } extends { tomato: infer R } ? R : boolean;

// ◆DistributiveConditionalTypes
// extendsの左側がジェネリック型で、型注釈時にunion型を指定すると、
// union型の各要素に応じた結果がunion型で返される。
// !!!!! WARNING !!!!!
// ジェネリクスの使用は必須。extendsの左側に直接union型を指定してもダメ。
type DistributiveConditionalTypes<T> = T extends 'tomato' ? number : boolean;
// number | boolean 型となる(hover tmpDCT)。
let tmpDCT: DistributiveConditionalTypes<'tomato' | 'pumpkin'>;

// ************************************************************
// ########デコレータ/decorator

// クラスを受け取って、デコレーション(装飾)するための関数。

// ❗️❗️重要❗️❗️
// 1️⃣tsconfig.json の下記項目を true にする必要がある。
//   "experimentalDecorators"
// 2️⃣デコレータは、インスタンス生成時ではなく、クラスの宣言時に実行される。

// デコレータ
// クラス全体をdecorateする場合、paraは1つ。
// paraはクラス全体を表すので、型はFunctionとする。constructorにはUserクラスが代入される。
// (クラスはconstructor。constructorは関数。なのでFunction型を使う)。
function Logging(constructor: Function) {
  console.log('Logging...');
  console.log(constructor);
}

// @を頭につけることでdecorateできる。
// クラス全体をdecorateする場合、クラスの先頭に置く。
@Logging
class User {
  name = 'Quill';
  constructor() {
    console.log('User was created!');
  }
}

// ==============================
// ####デコレータファクトリ/decorator factory

// デコレータを返す関数のこと。
// デコレータのparaの数は、適用するクラスによって決まってしまう(例: クラス全体なら1個)。
// 任意のparaを設定したい時、デコレータファクトリを使う。

// デコレータファクトリ
function Logging2(msg: string) {
  // constructorにはUser2クラスが代入される。
  return function (constructor: Function) {
    console.log(msg);
    console.log(constructor);
  }
}

@Logging2('Logging User...')
class User2 {
  name = 'Quill';
  constructor() {
    console.log('User was created!');
  }
}

// ==============================
// ####デコレータによる簡易版のフレームワーク

function Logging3(msg: string) {
  return function (constructor: Function) {
    console.log(msg);
    console.log(constructor);
  }
}
// 簡易版のフレームワークを実装するデコレータ
function Component(template: string, selector: string) {
  // インスタンスを生成するためには、{ new(): 型 } という型を指定する。
  // new() の型には、取得したいプロパティをオブジェクト型で指定する。
  // --------------------
  // 💡User3クラスはインスタンス生成時に引数が不要だが、
  //   引数が必要なケースではnew()の中にparaを指定する。
  //     例: new(age: number)
  // 💡さらに補足。デコレータを複数のクラスに使うために、不特定の引数を取りたい場合は、
  //   下記のとおり書くことで何個でも引数を受け取ることができる。
  //     new(...args: any[])
  return function (constructor: { new(...args: any[]): { name: string } }) {
    // document.querySelector()
    // 指定したセレクターに一致する最初のエレメントを返す。1つもなければnullを返す。
    const mountedElement = document.querySelector(selector);
    // User3クラスのnameプロパティは、staticではないので、アクセスするためにインスタンスを生成する。
    const instance = new constructor();
    if (mountedElement) {
      mountedElement.innerHTML = template;
      // !/Non-null assertion operator
      // nullではないことを宣言する。
      // --------------------
      // instance.nameによって、User3クラスのnameプロパティを取得する。
      mountedElement.querySelector('h1')!.textContent = instance.name;
    }
  }
}

// html内の{{}}内部ではjavascript式を実行できる。
@Component('<h1>{{ name }}</h1>', '#app')
@Logging3('Logging User...')
class User3 {
  name = 'Quill';
  constructor() {
    console.log('User was created!');
  }
}

// ==============================
// ####クラスデコレータとデコレータフィクトリの実行順序

// まずデコレータフィクトリが上から下に読み込まれ、
// 続いてクラスデコレータがクラスの下から上に向けて読み込まれる。

// !!!!! WARNING !!!!!
// プロパティデコレータとメソッドデコレータは、動きがまた異なる。
// 別項目に記載。

// 下記の実行結果
// DecoFac1
// DecoFac2
// Deco2
// Deco1

function Decorator1(msg: string) {
  console.log('DecoFac1')
  return function (constructor: Function) {
    console.log(msg);
  }
}
function Decorator2(msg: string) {
  console.log('DecoFac2')
  return function (constructor: Function) {
    console.log(msg);
  }
}

@Decorator1('Deco1')
@Decorator2('Deco2')
class Tmp {
  constructor() {
  }
}

// ==============================
// ####デコレータによる新しいクラスの生成

// デコレータの戻り値にクラスを指定すると、新しいクラスを作ることができる。

function Logging4(msg: string) {
  return function (constructor: Function) {
    console.log(msg);
    console.log(constructor);
  }
}
// 簡易版のフレームワークを実装するデコレータ
function Component4(template: string, selector: string) {
  // インスタンスを生成するためには、{ new(): 型 } という型を指定する。
  // 不特定の引数を取りたい場合、new(...args: any[])と書くのが常套。
  // new() の型には、取得したいプロパティをオブジェクト型で指定する。
  // --------------------
  // 下記は、不特定のクラスに対応できるようextends付きのジェネリック型を使用。
  // インスタンス生成時には、クラスがそのインスタンスの型になるので、Tは自動的に対象のクラス型となる。
  return function <T extends { new(...args: any[]): { name: string } }>(constructor: T) {
    console.log('Get decorator.')
    // 無名クラスを返すようにする。
    return class extends constructor {
      // 上記のnew(para)と同じparaを指定。
      // 補足
      // paraがない場合は、...args を ..._ と書く方法がある模様。
      constructor(...args: any[]) {
        super(...args);
        console.log('Decorated class created!')
        // returnするクラスのconstructor
        const mountedElement = document.querySelector(selector);
        const instance = new constructor();
        if (mountedElement) {
          mountedElement.innerHTML = template;
          mountedElement.querySelector('h1')!.textContent = instance.name;
        }
      }
    }
  }
}

// html内の{{}}内部ではjavascript式を実行できる。
@Component4('<h1>{{ name }}</h1>', '#app')
@Logging4('Logging User...')
class User4 {
  name = 'Quill';
  constructor(readonly age: number) {
    console.log('User was created!');
  }
}

const user1 = new User4(32);
const user2 = new User4(42);

// ==============================
// ####プロパティデコレータ

// クラス全体ではなく、クラスのプロパティにデコレータを適用する。

// プロパティにデコレータはparaが2つ。
// 1st para  staticの場合、クラス。ノーマルの場合、prototype。
// 2nd para  対象のプロパティ名。
// ❗️クラスデコレータと異なり、何かをreturnすることはできない。
function PropertyLogging(target: any, propertyKey: string) {
  console.log('propertyLogging');
  console.log(target);
  console.log(propertyKey);
}

class User5 {
  // staticプロパティをdecorateすると、target(デコレータの1st para)はクラス全体になる。
  @PropertyLogging
  static staticName = 'static Alexandra';

  // ノーマルプロパティをdecorateすると、target(デコレータの1st para)は
  // オブジェクト(クラスのprototype)になる。
  @PropertyLogging
  name = 'Alexandra';
}

// ◆prototype
// ++++----------------
// 関数が持っているプロパティ。
// クラスはconstructor。constructorは関数。関数はobject。
// 関数がobjectであることは、下記コマンドで確認可能。
console.dir(PropertyLogging);
// 上記コマンドで、プロパティの1つにprototypeがあることを確認できる。

// ❗️❗️prototypeは、
// 関数がconstructorとして使用され、constructorからインスタンスが生成された時、
// そのインスタンスに引き継がれる。
// 引き継がれるといっても、複製ではなく、参照できるようになる、ということ。
// これを、prototype chain(プロトタイプチェーン)という。
//
// 💡💡プロパティはインスタンス個別のものなので各々で保持するが、
// メソッドはconstructorからインスタンスにコピーされない。
// メソッドはprototypeの中にあり、プロトタイプチェーンを利用して参照することで、メソッドを実行できる。
// メソッドをコピーしないことで、メモリの消費を抑えている。
// ----------------++++

// ==============================
// ####メソッドデコレータ

// クラス全体ではなく、クラスのメソッドにデコレータを適用する。

// メソッドデコレータはparaが3つ。
// 1st para  staticの場合、クラス。ノーマルの場合、prototype。
// 2nd para  対象のメソッド名。
// 3rd para  オブジェクト(PropertyDecorator)。
// 💡return  property descriptor

// returnなしのメソッドデコレータ
function MethodLogging(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  console.log('methodLogging');
  console.log(target);
  console.log(propertyKey);
  console.log(descriptor);
}

// returnありのメソッドデコレータをreturnするデコレータファクトリ
function enumerable(isEnumerable: boolean) {
  // tsconfig の noUnusedParameters が true だと、未使用のparaがあるとエラーが出る。
  // 未使用だが規定により必要なparaがある場合、noUnusedParameters の有無に関わらず、
  // 下記のように _ を先頭に付けると良い。
  return function (_target: any, _propertyKey: string, _descriptor: PropertyDescriptor) {
    return {
      enumerable: isEnumerable
    }
  }
}

class User6 {
  static staticName = 'static Alexandra';
  name = 'Alexandra';

  @MethodLogging
  // defaultはtrueなので、falseに変えてみる。
  @enumerable(false)
  greeting() {
    console.log('Hello!');
  }
}

// greeting()のenumerableがfalseになっていることの確認コマンド(Consoleで直打ちして確認)。
// ❗️メソッドなので、クラス自身ではなくprototypeを見ること。
Object.getOwnPropertyDescriptor(User6.prototype, 'greeting')

// ++++----------------
// ◆PropertyDecorator

// 各プロパティに対して、ブラウザが裏側で持っている情報(object)。

// 項目
// configurable: true, // falseにすると、各項目の変更を禁止。
// enumerable: true // falseにすると、for文などの処理で対象プロパティを除外する。
// value: "Peter" // プロパティの値。
// writable: true // falseにすると、値の変更を禁止。

// 下記のコマンドで操作できる。
// 対象オブジェクト: sampleObj, 対象プロパティ: name
let sampleObj = { name: 'Alexia', age: 23 }
// 確認
Object.getOwnPropertyDescriptor(sampleObj, 'name');
// 変更
// valueを'Peter'に変える。既存の'name'が存在しなければ新規追加。
Object.defineProperty(sampleObj, 'name', { value: 'Peter' });
// ----------------++++

// ==============================
// ####プロパティデコレータとメソッドデコレータの実行順序

// プロパティデコレータ、メソッドデコレータ、問わず、下記の順序で実行される。
// 1️⃣ノーマルなプロパティやメソッドをdecorateするdecoratorが、上から順に実行される。
// 2️⃣staticななプロパティやメソッドをdecorateするdecoratorが、上から順に実行される。

// ==============================
// ####アクセサーデコレータ

// アクセサー
// getterやsetterのこと。

// paraはメソッドデコレータと同じ。
function AccessorLogging(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  console.log('accessorLogging');
  console.log(target);
  console.log(propertyKey);
  console.log(descriptor);
}

class User7 {
  static staticName = 'static Alexandra';
  name = 'Alexandra';
  constructor(private _age: number) {
    console.log('User was created!')
  }

  // getterとsetter両方ある場合は、上の方に1つだけ付ける。
  @AccessorLogging
  get age() {
    return this._age;
  }
  set age(value) {
    this._age = value;
  }

  greeting() {
    console.log('Hello!');
  }
}

// ==============================
// ####パラメータデコレータ

// paraは3つ。
// 1st para  staticの場合、クラス。ノーマルの場合、prototype。
// 2nd para  対象para名。
// 3rd para  対象paraのインデックス。
function ParameterLogging(target: any, propertyKey: string, parameterIndex: number) {
  console.log('paraLogging');
  console.log(target);
  console.log(propertyKey);
  console.log(parameterIndex));
}

class User8 {
  static staticName = 'static Alexandra';
  name = 'Alexandra';
  constructor() {
    console.log('User was created!')
  }
  greeting(msg1: string, @ParameterLogging msg2: string) {
    console.log(msg1 + ' ' + msg2);
  }
}

// ************************************************************
// ########import/export

// ◆import 4種
import { Foods } from './app-food/foods.js' // ノーマル
import { Foods as FoodsList } from './app-food/foods.js' // 名前指定
import * as All from './app-food/foods.js' // All　※使う側: All.Foods のように書く。
import DefItem from './app-food/foods.js' // from export default　※名前自由

// ◆export 2種
export interface Scoreable { } // ノーマル
export default interface DefScoreable { } // default設定

// ************************************************************
// ########namespace

// 名前空間
// スコープの外部で変数を使ったり、使わなかったりするための設定。
// ES6以降、出番は減った。
namespace myApp {
  const hello = 'Hello!'; // スコープ内のみ利用可
  export const name = 'Andy'; // 外部もOK
  // 型定義も可能
  export interface Nameable {
    name: string;
  }
}

const hello = 'Hello. How are you?' // 上記のhelloと重複しない。
console.log(hello); // Hello. How are you?
console.log(myApp.name); // Andy

let nameable: myApp.Nameable;

// ************************************************************
// ########同一名の定義

// 下記はすべて別物として判断される。
// つまり、値と型と名前空間は別。

let name: string;
// function name { }
// enum name { }
// class name { }
interface name { } // 通常はアッパーキャメルで書くけどね。
// type name = { }
namespace name { }

// ただし、値を持ったnamespaceは変数と共存できない。
let name2: string;
namespace name2 {
  const first: string = 'Peter';
}

// ==============================
// ####interfaceのmerge

// interfaceは、何度も同名で定義でき、マージされる。
interface Name3 {
  first: string;
}
interface Name3 {
  last: string;
}
let nameSet: Name3;
nameSet.first // suggest OK
nameSet.last // suggest OK

// 同じ値で違う型はエラー
interface Name4 {
  first: string;
}
interface Name4 {
  first: number;
}

// methodは、同じ値で違う型もOK。
interface Name5 {
  first(): string;
}
interface Name5 {
  first(): number;
}
let tmpMethod: Name5;
// methodの定義はoverloadされる(hover first)。
// ❗️後に定義したinterfaceが、overloadの上になり、優先順位が高くなる。
tmpMethod.first();

// ==============================
// ####classとinterface

// 重複OK。
// classは、class自体と型と両方として判断されるが、
// classの型はinterfaceと同じものとしてtypescriptに判断されるので、
// 上記のinterface同士のmergeと同じあつかいになる。
class Name6 { }
interface Name6 {
  first(): string;
}

// ==============================
// ####namespaceのmerge

// export するとエラーになるが、しなければ問題なし。
// interfaceと同じようにmergeされる。
namespace name7 {
  export const first: string = 'Peter';
  const last: string;
}
namespace name7 {
  export const first: string = 'Andy';
  const last: number;
}

// ************************************************************
// ########JSONの型推論

// JSONファイルからも型を取得できる。

// 行頭の
// import sampleJson from './sample.json';
// で取得したdataから、typeofで型を取得。
type Users = typeof sampleJson; // hover Users

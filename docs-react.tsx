import React, { useState } from "react";

interface Props {
  msg: string;
}

interface User {
  id: number;
  name: string;
}

// functionコンポーネントの型はReact.FCとする決まり。
// ほかにも書き方はあるが、この書き方を主流と考えて良い模様。
const App: React.FC = () => {
  return (
    <div className="App">
      <Hello msg='Hello!' />
    </div>
  );
}

// propsの型を、React.FCにジェネリクスとして付与する。
const Hello: React.FC<Props> = (props) => {
  // 初期値(1)を設定することで、countもsetCountも、自動的に型推論でnumber型となる。
  const [count, setCount] = useState(1);
  // nullも含みたい場合はgenericsを使う。
  const [count2, setCount2] = useState<number | null>(10);
  // objectの型を指定する場合も、genericsで指定する。
  const [user, setUser] = useState<User>({ id: 5, name: 'Peter' });
  const [inputData, setInputData] = useState('');

  // paraのtypeはonChangeをhoverして確認。
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputData(e.target.value);
  }

  return (
    <div>
      <h1>{props.msg}</h1>
      <h2>{count}</h2>
      <h2>{count2}</h2>
      <h3>{user.name}</h3>
      <input type="text" value={inputData} onChange={handleInputChange} />
      <p>{inputData}</p>
    </div>
  )
}

export default App;

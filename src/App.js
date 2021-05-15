import React, { useState,useEffect } from "react";
import "./styles.css";
// import { InputTodo } from "./components/InputTodo";
// import { IncompleteTodo } from "./components/IncompleteTodo";
// import { CompleteTodo } from "./components/CompleteTodo";
import {db} from './firebase';
import TaskItem from "./components/TaskItem";


function App(){

  // firebaseのデータを保持するためにuseStateを使う
  const [data, setData] = useState([
    {
      id:"",
      name:"",
      relationship:"",
    },
  ]);

  // 登録する処理（inputタグに入力された情報を保持する）
  const [inputValueName, setInputValueName] = useState("");
  const [inputValueBirthday, setInputValueBirthday] = useState("");
  const [inputValueRelationship, setInputValueRelationship] = useState("");


  // inputタグのイベント処理
  // onchangeで「handleInputChange」という関数を使う
  const handleInputChange = (e) => {  //「e」はイベントっていう意味
    setInputValueName(e.target.value);
  }

  const handleInputChangeBd = (e) => {  //「e」はイベントっていう意味
    setInputValueBirthday(e.target.value);
  }

  const handleInputChangeRs = (e) => {  //「e」はイベントっていう意味
    setInputValueRelationship(e.target.value);
  }

  // 登録ボタンのイベント処理
  const addInputData = (e) => {
    // インプットのvalueをdbに送って
    db.collection("group").add({
      name:inputValueName,
      birthday:inputValueBirthday,
      relationship:inputValueRelationship
      // todo:inputValue
    });

    // インプットの中身を空にする
    setInputValueName("");
    setInputValueBirthday(""); 
    setInputValueRelationship("");
  }


  // ページが表示されるときにuseEffectを使ってfirebaseのデータにアクセスする
  useEffect(() => {
    const firebaseData = db.collection("group").onSnapshot((snapshot) => {
      // useStateのsetDataを更新する
      setData(
        snapshot.docs.map((dbData) => ({
          id: dbData.id,
          name: dbData.data().name,
          birthday: dbData.data().birthday,
          relationship: dbData.data().relationship,
        }))
      );
    });

    return () => firebaseData();
  },[]);


  return (
    <div className="App">
      {/* ここから */}
      <div className="input-area">
        {/* データを入力するところ */}
        <input type="text" value={inputValueName} onChange={handleInputChange} placeholder="なまえ"></input>
        <input type="text" value={inputValueRelationship} onChange={handleInputChangeRs} placeholder="かんけい"></input>
        <input type="date" value={inputValueBirthday} onChange={handleInputChangeBd} placeholder="生年月日"></input>

        {/* 登録ボタン */}
        <button disabled={!inputValueName}
          onClick={addInputData}
        >登録する</button>
      </div>


      <div className="conplete-area">
        {/* ｄｂのデータを表示させているところ */}
        <p className="title">★Familyリスト★</p>
        <ul>
          <div className="list-row">
            <li className="li-title">
              <span className="span-head01" style={{ color: '#808080' }}>なまえ</span>
              <span className="span-head01" style={{ color: '#808080' }}>かんけい</span>
              <span className="span-head02" style={{ color: '#808080' }}>誕生日</span>
            </li>
          </div>
        </ul>
        {data.map((data) => (
          <TaskItem id={data.id} name={data.name} birthday={data.birthday} relationship={data.relationship} />
        ))}
      </div>

    </div>
  );
}

export default App;


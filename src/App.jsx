import { useState, useCallback, useEffect, useRef } from "react";
import "./App.css";

function App() {
  const [length, setLength] = useState(8);
  const [number, setNumber] = useState(false);
  const [character, setCharcter] = useState(true);
  const [password, setPasswords] = useState("");
  const passRef = useRef(null)
  const passwordGen = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmno";
    if (number) str += "0123456789";
    if (character) str += "@#$%^^&*!";
    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPasswords(pass);
  }, [length, character, number, setPasswords]);
       const copyPassword = useCallback(()=>{
        window.navigator.clipboard.writeText(password)
        passRef.current?.select();
        passRef.current?.setSelectionRange(0,30);
       },[password])
     useEffect(()=>{
      passwordGen()
     },[length,number,character,passwordGen])

  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 bg-gray-700">
        <h1 className="text-center my-3">PasswordGenerator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-1 px-3"
            placeholder="Password"
            readOnly
            ref={passRef}
          />
          <button className="outline-none bg-blue-700 px-3 py-0.5 shrink-0" onClick={copyPassword}>
            Copy
          </button>
        </div>
        <div className="flex-text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              min={8}
              max={20}
              value={length}
              onChange={(e) => {
                setLength(e.target.value);
              }}
              className="cursor-pointer"
            />
            <label>Lenght:{length}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={number}
              id="numberInput"
              onChange={() => {
                setNumber((prev) => !prev);
              }}
            />
            <label htmlFor="numberInput">Numbers</label>
            <div>
              <input
                type="checkbox"
                defaultChecked={character}
                id="characterInput"
                onChange={() => {
                  setCharcter((prev) => !prev);
                }}
              />
              <label htmlFor="characterInput">Character</label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;

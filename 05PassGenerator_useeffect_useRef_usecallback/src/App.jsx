import { useCallback, useEffect, useState, useRef } from "react";

function App() {
  
  const [length, setlength] = useState(8); /
  const [numberAllowed, setnumberAllowed] = useState(false);
  const [charAllowed, setcharAllowed] = useState(false); 
  const [password, setpassword] = useState(" "); 


 
  const passwordRef = useRef(null);


  const PasswordGen = useCallback(() => {
    let pass = ""; 
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"; 
    if (numberAllowed) {
     
      str = str + "0123456789";
    }
    if (charAllowed) {
      str = str + "!@#$%^&*()_+-={}[]|:;"; 
    }
    for (let i = 1; i <= length; i++) {
      
      let char = Math.floor(Math.random() * str.length + 1); i
      pass = pass + str.charAt(char);
      console.log(pass);
    }
    setpassword(pass); 
  }, [length, numberAllowed, charAllowed, setpassword]); 
 

  //---------------Function for copying the text--------------------
  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    // passwordRef.current?.setSelectionRange(0,3);
    window.navigator.clipboard.writeText(password);
  }, [password]);
//-------------------------- UseEffect() hook for running our callback function-----------
  useEffect(() => {
    PasswordGen();
  }, [length, charAllowed, numberAllowed, PasswordGen]); //these 4 are dependencies

  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-10 text-orange-500 bg-slate-800">
        <h1 className="text-white text-center my-3 font-bold">
          Password Generator
        </h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4 ">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-1 px-3"
            placeholder="Password"
            readOnly
            ref={passwordRef}
          />
          <button
            onClick={copyPasswordToClipboard}
            className="outline-none bg-blue-500 text-white px-3 py-0.5 shrink-0 font-bold"
          >
            Copy
          </button>
        </div>

        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              min={6}
              max={100}
              value={length}
              className="cursor-pointer"
              onChange={(e) => {
                setlength(e.target.value);
              }}
            ></input>
            <label>Length : {length}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={numberAllowed}
              id="numberInput"
              onChange={() => {
                setnumberAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="numberInput">Numbers</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={charAllowed}
              id="characterInput"
              onChange={() => {
                setcharAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="characterInput">Characters</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;

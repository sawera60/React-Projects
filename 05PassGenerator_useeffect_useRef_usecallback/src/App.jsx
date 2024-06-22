import { useCallback, useEffect, useState, useRef } from "react";

function App() {
  
  const [length, setlength] = useState(8); /
  const [numberAllowed, setnumberAllowed] = useState(false);
  const [charAllowed, setcharAllowed] = useState(false); 
  const [password, setpassword] = useState(" "); 


 
  const passwordRef = useRef(null);


  const PasswordGen = useCallback(() => {
    let pass = ""; //pass isliye bnaya hai k isky andr mn password generate krungi or phr setpassword k zriye isko set krdungi
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"; //yh string humny is liye define ki hai k password generate krny k liye hmen kuch to chahye na yani kuch characters to kisi string k andr sy hi to random password generatr hoga to hum is string k andr sy random characters ko pick krengy through loop

    if (numberAllowed) {
      //yani k agr user numberallowed krta hai uski value true hoti ha to existing string k andr hi number add kr do in mn sy or in mn sy random number ese to ni pick hoga usky liye hmen loop lgana pryga
      str = str + "0123456789"; //ispy hum loop lga k random number pick kr lengy or usko string mn add kr dengy
    }
    if (charAllowed) {
      str = str + "!@#$%^&*()_+-={}[]|:;"; //ispy hum loop lga k random character pick kr lengy or usko string mn add kr lengy
    }
    for (let i = 1; i <= length; i++) {
      //ab hum yahn neechy wo character bna rhy hain wo password generate kr rhy hain jo hmen display krna ha
      let char = Math.floor(Math.random() * str.length + 1); //str.length means string length ko access kryga or us mn sy random koi number generate kr dy ga abi srf  aik number aya hai puri string ni ai hmen puri string lani ha
      pass = pass + str.charAt(char);
      console.log(pass);
    }
    setpassword(pass); //phr hum final pass ko setpassword mn set kr dengy
  }, [length, numberAllowed, charAllowed, setpassword]); //these 4 are dependencies for optimizaton yani k function ko memoize kr lo yh optimization k liye kaam ati hian
  // why we passed setpassword as a dependency because yh bhi aik dependency hai or yhi main function hai jo hum kai br run krengy yani iski basis py bhi hum cheezon ko change krengy isliye yh bhi dependency hai iski basis py hum br br setpassword kr rhy hain

  //---------------Function for copying the text--------------------
  const copyPasswordToClipboard = useCallback(() => {
    // passwrodref ka kaam yh hai 
    passwordRef.current?.select();
    // passwordRef.current?.setSelectionRange(0,3);
   // clipboard k andr write kr do
    window.navigator.clipboard.writeText(password);
  }, [password]);
//-------------------------- UseEffect() hook for running our callback function-----------
  useEffect(() => {
    PasswordGen();
  }, [length, charAllowed, numberAllowed, PasswordGen]); //these 4 are dependencies yani k in 4 cheezon mn sy apny kisi ko b chera to useEffect run hoga  yh function chla do kyn k yh sb is py depend kr rae hain inky liye alag alag function bnany ki zrurt nai h bs yh function memory m store ha jb bhi ap is m sy kisi ko cherogy to react isko render kr dyga
  // function ko run krny ka goal mera UseEffect() sy achive ho rha ha naa k useCallback() sy kunk useCallback k andr humny wese b srf function definition di hui ha

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

import { useCallback, useEffect, useState, useRef } from "react";

function App() {
  //UseState Hook hum tb use krty hain jb humny aik cheez ka data variable mn hold krna hota ha or br br usko change krwana hota ha in future to yahn py mn UseState isliye use kr rhi hun k har aik cheez ki state baad m change hogi yani k default length 8 honi hi chahye password ki jese hum normally dkehty hain lekin wo baad mn change bhi ho skti hai or lenght bar bar track bhi ho rae ha change ho rae ha to jb esa case hota hai k hmen pta hai aik cheez bad m change hogi to hum us case mn usestate hook use krty hain
  const [length, setlength] = useState(8); //means k default 8 length lazmi hai hi hai
  const [numberAllowed, setnumberAllowed] = useState(false); //ab number ka bhi yahi scene hai mtlb k number bhi checkbox click krny py track ho rhy hain or br br change ho rhy hain to uska mtlb hai br br change ho rae iski value or br br store ho rhi hai to usky liye hmen phr sy usestate use krna pryga ab yahn py means start mn false apki mrzi ha ap number pasword m rkhna chahty ho ya nai mn start mn usko false hi rkh rae hun taky user agar chahta hai k wo password mn number add kry tb hi kry wrna default value false rhy kun k checkbox click krny py hi number generate ho bs
  const [charAllowed, setcharAllowed] = useState(false); // ab character ka bhi yhi scene ha means character ki value bhi br br change ho rae ha or change ho k br br track ho rae ha or br br change ho k store ho rae ha iska mtlb yahn bhi hmen usestate ki zrurt hogi store krny k liye or br br track krny k liyeab yahn bhi start mn false apki mrzi ha ap character pasword m rkhna chahty ho ya nai mn start mn usko false hi rkh rae hun
  const [password, setpassword] = useState(" "); //setpassword ka bhi yahi scene hai means k dekho at the end hmary pass aik pasword bhi to generate ho rha hai na wo bhi to br br change ho rha hai or br br store ho rha to usko br br change krny k liye bhi hmen usestate chahye ab dekho yahn bhi apki marzi hai k ap default koi password dikhana chhaty ho page looad py ya usko khali rkhna chhaty ho to hum baad mn password generate krayengy abi khaali chor rhy

  // Now are making a password generator
  // ----------- UseCallback ----------//
  //-------- working of usecallback is below
  //yani usecallback aik function ko jitna hosky memory m rkh leta hai or phr jb dubara use kro to jitna part krlo jo ni hua wo apki mrzi
  // ab dekho ap password to generate kr lo gy lekin apko pta hai k apko usko number py click krty hue bhi call krna pryga character py click krty hue bhi call krna pryga length py click krty hue b call krna pryga yani k apko usko br br  call krna pr rha hai to wo br br calculation ho rae ha br br re-rendering ho rae ha jiski wja sy app ki performance slow ho rae ha to usky liye hmen usecallback use krna pryga
  // useCallback mn apki pass 2 parameters hoti hain 1st function 2nd dependencies jo array form mn hoti hain
  // now what is depenedencies :
  //  means jese k hmara pass pasword generate ho rha ha lekin hmen usky liye br br length,number aur characters b require hain to length numbers or characters teeno is function ki dependencies hain yani k in mn sy kisi p b click hoga tb hi yh  function trigger kryga yani k in teeno k change hoty hi yh function dubara run hota hai to zahir hai yh iski depenedencies hain isky ilawa bilawaja br br re-render na kro

                         //----------useREF-------------------//
                         // jb bhi hmen kisi cheez ka refernce lena hota ha tb useRef use hota ha ismn apko aik variavle bnana prta ha
                         // •	Useref ki help sy hum DOM ko directly manipulate kr skty hain 
  const passwordRef = useRef(null);

  // UseCallback () lets you memoize a callback function by preventing it from being recreated on every render means br br function re-created ni hoga br br re-render ni hoga
  // is case mn humny useCallback isliye use kia hai k dekho hum password generator bnaa rhy hain hamry pass number length character hai or sb k liye hmary pass br br aik hi method run horha ha to us method/function hum memoize kra lengy or usky zriye optimize krwa dengy or srf tb hi run krna jb mn yh sb dependencies dun
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

import React, { useCallback, useEffect ,useRef} from "react";
import { useState } from "react"


function App() {
  const inputRef = useRef(null);
  const [range,setRange]=useState(8);
  const [password,setPassword]=useState('');
  const[number,setNumber]=useState(false);
  const[character,setCharacter]=useState(false);

//password generator:
const passwordGenerator=useCallback(()=>{
  let str='abcdefghijklmnopqrstuvwxyz';
  if(number)
  {
    str+='1234567890';
  }
  if(character)
  {
    str+='!@#$%^&*()_+';
  }
  let pwd='';
  for(let i=0;i<=range;i++)
  {
    let char=str.charAt(Math.floor(Math.random() * str.length))
;
    pwd+=char
  }
  setPassword(pwd)
},[range,number,character])

useEffect(
()=>{
  passwordGenerator();
},
[range,number,character]
)

const handleCopy=useCallback(()=>{
  inputRef.current?.select();
  window.navigator.clipboard.writeText(password)
},[password])


  return (
    <>
      <div className="flex justify-center items-start min-h-screen bg-gray-100 p-4">
        <div className="bg-white text-black p-6 rounded-lg w-[600px] border border-amber-300 shadow-md">
          <div className="space-y-6">
            {/* Input and Submit */}
            <div className="flex gap-4">
              <input
                type="text"
                className="flex-1 border border-black text-xl p-2 rounded"
                ref={inputRef}
                value={password}
                
              />
              <button className="text-xl bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              onClick={handleCopy}>
                Copy
              </button>
            </div>

            {/* Range Slider */}
            <input type="range" className="w-full" 
            value={range}
            onChange={(e)=>setRange(Number(e.target.value))}
            />
                  
           
            <div className="flex gap-6 text-lg">
              <label className="flex items-center gap-2">
                <input type="checkbox" name="number" 
                onChange={(e)=>setNumber(e.target.checked)}
                />
                Number 
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" name="character"
                onChange={(e)=>setCharacter(e.target.checked)} />
                Character
              </label>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App

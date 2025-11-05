import React, { useState, useCallback, useEffect, useRef } from 'react';

function App() {
  const [length, setLength] = useState(10);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [characterAllowed, setCharacterAllowed] = useState(false);
  const [password, setPassword] = useState('');

  const passwordRef = useRef(null);

  
  const generatePassword = useCallback(() => {
    let pass = '';
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    if (numberAllowed) str += '0123456789';
    if (characterAllowed) str += '!@#$%^&*()_+{}[]|;:,.<>?';

    for (let i = 0; i < length; i++) {
      const char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numberAllowed, characterAllowed]);

  useEffect(() => {
    generatePassword();
  }, [length, numberAllowed, characterAllowed, generatePassword]);

  
  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
  }, [password]);

  return (
    <div className="flex justify-center items-center text-white bg-img h-screen font-bold text-center">
      
      <div className="bg-[rgba(255,255,255,0.1)] backdrop-blur-md p-10 rounded-lg border-2 border-amber-700 shadow-lg w-11/12 md:w-1/2 lg:w-1/3">
        <h1 className="uppercase bg-[rgba(255,255,255,0.15)] backdrop-blur-md rounded-lg border border-amber-100 text-2xl py-3 mb-6">
          Password Generator
        </h1>

        <div className="flex mb-6">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-2 px-3 text-black rounded-l-lg"
            placeholder="Generated password"
            readOnly
            ref={passwordRef}
          />
          <button
            onClick={copyPasswordToClipboard}
            className="bg-amber-700 hover:bg-amber-800 px-4 py-2 rounded-r-lg"
          >
            Copy
          </button>
        </div>

     
        <div className="flex flex-col items-start gap-4 text-lg">
         
          <div className="flex w-full justify-between items-center">
            <label htmlFor="length" className="mr-4">
              Length: <span className="text-amber-400">{length}</span>
            </label>
            <input
              type="range"
              min={6}
              max={40}
              value={length}
              onChange={(e) => setLength(e.target.value)}
              className="cursor-pointer w-2/3 accent-amber-700"
            />
          </div>

          
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={numberAllowed}
              onChange={() => setNumberAllowed((prev) => !prev)}
              className="accent-amber-700"
            />
            Include Numbers
          </label>

         
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={characterAllowed}
              onChange={() => setCharacterAllowed((prev) => !prev)}
              className="accent-amber-700"
            />
            Include Special Characters
          </label>
        </div>

        <button
          onClick={generatePassword}
          className="mt-6 bg-amber-700 hover:bg-amber-800 text-white px-6 py-2 rounded-lg shadow-md transition-all"
        >
          Generate Password
        </button>
      </div>
    </div>
  );
}

export default App;

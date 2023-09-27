import { useCallback, useEffect, useRef, useState } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [numberallowed, setNumberallowed] = useState(false);
  const [charsallowed, setCharsallowed] = useState(false);
  const [password, setPassword] = useState("");
  let passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    let nums = "0123456789";
    let chars = ",./<>?;':|{}[]!@#$%^&*()_+";

    if (numberallowed === true) {
      str += nums;
    }
    if (charsallowed === true) {
      str += chars;
    }

    for (let index = 1; index <= length; index++) {
      // pick up a random character from the str string and add it to password
      // do this equal to length times to generate a password whose length is equal to length

      let selind = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(selind);
    }

    // set the password state equal to the newly created password
    setPassword(pass);
  }, [length, numberallowed, charsallowed, setPassword]);

  const copyPasswordToClipboard = useCallback(() => {
    // select all the characters of the current passwordRef,  (which contains the reference of the password input field) so all the characters in the password field will get selected, indicating to the user that the password has been copied successfully
    passwordRef.current?.select();

    // whenever this function is triggered, write the value of the password state into the clipboard
    window.navigator.clipboard.writeText(password);
  }, [password])

  useEffect(() => {
    // everything below this will run when any thing in the dependency list changes, for ex if length changes, or if numberallowed is switched from true to false or vice verse or if charsallowed is changed or if passwordGenerator is called itself
    passwordGenerator()
  }, [length, numberallowed, charsallowed, passwordGenerator])

  return (
    <>
      <div className="text-center  w-full py-8 px-8 max-w-xl mx-auto my-8 rounded-lg shadow-md text-white bg-gray-700">
        Password Generator
        <div className="flex shadow text-black text-bold rounded-lg overflow-hidden mb-4 mt-4">
          <input
            type="text"
            value={password}
            className="w-full py-1 px-2"
            placeholder="Password"
            readOnly
            // give the reference of this input field to the passwordRef variable
            ref={passwordRef}
            
          />
          <button
            className="bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded
        "
            onClick={copyPasswordToClipboard}
          >
            Copy
          </button>
        </div>
        <div className="flex items-center gap-x-1">
          <input
            type="range"
            min={6}
            max={100}
            value={length}
            className="cursor-pointer accent-red-500"
            // if this slider is changed then set the value of the length state equal to the event that triggered that change i.e. set the length state equal to the value of the slider
            onChange={(e) => setLength(e.target.value)}
          />
          <label>Length: {length}</label>
          <div className="ml-auto flex gap-x-1 items-center">
            <input
              className="accent-red-500"
              type="checkbox"
              defaultChecked={numberallowed}
              id="numberInput"
              onChange={() => {
                setNumberallowed((prev) => !prev);
              }}
            />
            <label>Numbers</label>
            <input
              className="accent-red-500 ml-2"
              type="checkbox"
              defaultChecked={numberallowed}
              id="numberInput"
              onChange={() => {
                setCharsallowed((prev) => !prev);
              }}
            />
            <label>Special Characters</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;

import { useState } from "react";
const Content = () => {
  const [name, setName] = useState("Manish");
  const [count, setCount] = useState(0);
  const handleNameChange = () => {
    const names = ["Manish", "Arpit", "Sid"];
    const randomIdx = Math.floor(Math.random() * 3);
    setName(names[randomIdx]);
  };
  const increaseCount = () => {
    setCount(count + 1);
    console.log(count);
  };
  return (
    <main>
      <p>HELLO {name}!</p>
      <button onClick={handleNameChange}>CHANGE NAME</button>
      <br></br>
      <br></br>
      <button onClick={increaseCount}>{count}</button>
    </main>
  );
};

export default Content;

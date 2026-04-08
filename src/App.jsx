import React, { useState } from "react";

export default function App() {
  const [items, setItems] = useState([]);
  const [input, setInput] = useState("");

  return (
    <div style={{ padding: 20, fontFamily: "Arial" }}>
      <h1>Alaska Reis App</h1>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Voeg iets toe (ticket, notitie, etc)"
      />
      <button onClick={() => {
        if(input) {
          setItems([...items, input]);
          setInput("");
        }
      }}>Toevoegen</button>

      <ul>
        {items.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

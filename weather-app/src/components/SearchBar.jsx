import { useState } from "react";

export default function SearchBar({ onSearch }) {
  const [input, setInput] = useState("");

  const handleSearch = () => {
    if (!input.trim()) return;
    onSearch(input);
    setInput("");
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter city name"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <button onClick={handleSearch}>
        Search
      </button>
    </div>
  );
}

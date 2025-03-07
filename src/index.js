import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import CardDetail from "./components/CardDetail";
import Cards from "./components/Cards.js";
import "./App.js";

function App() {
  const [characters, setCharacters] = useState([]); // Stores list of characters
  const [page, setPage] = useState(1); // Keeps track of the current page
  const [selectedCharacter, setSelectedCharacter] = useState(null); // Keeps track of the selected character

  useEffect(() => {
    fetchCharacters(page);
  }, [page]);

  const fetchCharacters = async (page) => {
    let res = await fetch(`http://swapi.dev/api/people/?page=${page}`);
    let data = await res.json();
    setCharacters(data.results);
  };

  const fetchCharacterDetails = async (url) => {
    const res = await fetch(url);
    const data = await res.json();
    setSelectedCharacter(data); // Set the details of the selected character
  };

  const handleNext = () => {
    setPage((prevPage) => prevPage + 1);
    setSelectedCharacter(null); // Reset selected character when changing page
  };

  const handleBack = () => {
    if (page > 1) {
      setPage((prevPage) => prevPage - 1);
      setSelectedCharacter(null); // Reset selected character when changing page
    }
  };

  return (
    <div className="App">
      <h1>Star Wars Characters</h1>
      <div className="main-container">
        <div>
          <Cards
            characters={characters}
            onCharacterClick={fetchCharacterDetails} // Passing function to handle character click
          />
        </div>
      </div>

      {selectedCharacter && <CardDetail character={selectedCharacter} />} {/* Render CardDetail if character is selected */}

      {/* Pagination buttons */}
      <div className="pagination">
        <button onClick={handleBack} disabled={page === 1}>Back</button>
        <button onClick={handleNext}>Next</button>
      </div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

export default App;

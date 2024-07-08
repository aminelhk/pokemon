import React, { useState } from "react";
import "./App.css";

function App() {
  const [pokemon, setPokemon] = useState(null);
  const [name, setName] = useState(""); // Ajouter un état pour stocker le nom

  // Fonction pour convertir le prénom en un nombre pseudo-aléatoire basé sur les caractères
  const getPokemonIndex = (name) => {
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = (hash << 5) - hash + name.charCodeAt(i);
      hash = hash & hash;
    }
    return Math.abs(hash % 151) + 1; // Assurer un nombre positif et dans la plage 1-151
  };

  const fetchPokemon = async () => {
    if (!name) return;
    const index = getPokemonIndex(name);
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${index}`);
    const data = await response.json();
    setPokemon(data);
  };

  return (
    <div className="App">
      <header className="App-header">
        <p>Quel Pokémon es-tu ?</p>
        {pokemon && (
          <div>
            <h2>{pokemon.name}</h2>
            <img
              className="imgSize"
              src={pokemon.sprites.front_default}
              alt={pokemon.name}
            />
          </div>
        )}
        <label className="labelSize" htmlFor="name">
          Votre prénom :
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <br />
        <button className="buttonValid" type="button" onClick={fetchPokemon}>
          Découvrez votre Pokémon!
        </button>
      </header>
    </div>
  );
}

export default App;

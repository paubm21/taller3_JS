// Importamos las funciones necesarias
import { fetchPokemon } from "./services/api.js";
import { showPokemon } from "./ui/ui.js";

// Iniciamos en Pikachu (#25)
let current = 25;

// Carga y muestra un Pokémon por su ID
async function loadPokemon(id) {
  const pokemon = await fetchPokemon(id);
  showPokemon(pokemon);
}

// Carga inicial
loadPokemon(current);

// Botón siguiente: avanza al siguiente Pokémon
document.querySelector(".next").addEventListener("click", () => {
  current++;
  loadPokemon(current);
});

// Botón anterior: retrocede (mínimo ID 1)
document.querySelector(".prev").addEventListener("click", () => {
  if (current > 1) current--;
  loadPokemon(current);
});

// Cerrar el modal al hacer clic en la X
document.getElementById("close-modal").addEventListener("click", () => {
  document.getElementById("pokemon-modal").classList.add("hidden");
});

// Cerrar el modal al hacer clic fuera del contenido
document.getElementById("pokemon-modal").addEventListener("click", (e) => {
  if (e.target === document.getElementById("pokemon-modal")) {
    document.getElementById("pokemon-modal").classList.add("hidden");
  }
});
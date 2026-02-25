// funciones necesarias
import { fetchPokemon } from "./services/api.js";
import { showPokemon } from "./ui/ui.js";

// Iniciamos en Pikachu (#25)
let current = 25;

let filteredIds = null; // null = sin filtro activo
let filterIndex = 0;

// Carga y muestra un Pokémon por su ID
async function loadPokemon(id) {
  const pokemon = await fetchPokemon(id);
  showPokemon(pokemon);
  return pokemon;
}
// Carga inicial
loadPokemon(current);
//filtros
const checkboxes = document.querySelectorAll(".filter-types input");
const clearBtn = document.getElementById("clear-filters");
checkboxes.forEach(cb => {
  cb.addEventListener("change", applyFilters);
});
clearBtn.addEventListener("click", () => {
  checkboxes.forEach(cb => cb.checked = false);
  filteredIds = null;
  loadPokemon(current);
});
async function applyFilters() {
  const selectedTypes = Array.from(checkboxes)
    .filter(cb => cb.checked)
    .map(cb => cb.value);
  // Si no hay filtros activos
  if (selectedTypes.length === 0) {
    filteredIds = null;
    loadPokemon(current);
    return;
  }
  filteredIds = [];
  // Revisar primeros 151 Pokémon
  for (let i = 1; i <= 151; i++) {
    const pokemon = await fetchPokemon(i);

    const matches = pokemon.types.some(type =>
      selectedTypes.includes(type)
    );

    if (matches) {
      filteredIds.push(i);
    }
  }

  if (filteredIds.length === 0) {
    alert("No hay Pokémon con esos tipos");
    return;
  }

  filterIndex = 0;
  loadPokemon(filteredIds[filterIndex]);
}

const toggleBtn = document.getElementById("toggle-filters");
const filtersContainer = document.querySelector(".filters");

toggleBtn.addEventListener("click", () => {
  filtersContainer.classList.toggle("hidden-filters");
});
// Botón siguiente: avanza al siguiente Pokémon
document.querySelector(".next").addEventListener("click", () => {
  if (filteredIds) {
    filterIndex++;
    if (filterIndex >= filteredIds.length) {
      filterIndex = 0;
    }
    loadPokemon(filteredIds[filterIndex]);
  } else {
    current++;
    loadPokemon(current);
  }

});

// Botón anterior
document.querySelector(".prev").addEventListener("click", () => {
  if (filteredIds) {
    filterIndex--;
    if (filterIndex < 0) {
      filterIndex = filteredIds.length - 1;
    }
    loadPokemon(filteredIds[filterIndex]);
  } else {
    if (current > 1) current--;
    loadPokemon(current);
  }
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
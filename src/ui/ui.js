// Función para capitalizar la primera letra de una palabra
function capitalize(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

// Muestra los datos básicos del Pokémon en la card principal
export function showPokemon(pokemon) {
  if (!pokemon) return;

  const img = document.getElementById("pokemon-img");
  img.src = pokemon.sprite;
  img.alt = pokemon.name;
  img.onerror = () => {
    img.onerror = null; // evita loop infinito
    img.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${pokemon.id}.png`;
  };

  document.getElementById("pokemon-name").textContent = capitalize(pokemon.name);
  document.getElementById("pokemon-id").textContent = "#" + pokemon.id.toString().padStart(3, "0");

  // Tipos
  const typesDiv = document.querySelector(".types");
  typesDiv.innerHTML = "";
  pokemon.types.forEach(t => {
    const span = document.createElement("span");
    span.classList.add("type", t);
    span.textContent = capitalize(t);
    typesDiv.appendChild(span);
  });

  // Al hacer clic en la imagen, abrir el modal
  img.onclick = () => showModal(pokemon);
}

// Muestra el modal con información detallada del Pokémon
export function showModal(pokemon) {
  document.getElementById("modal-name").textContent = capitalize(pokemon.name);

  const modalImg = document.getElementById("modal-img");
  modalImg.src = pokemon.sprite;
  modalImg.alt = pokemon.name;
  modalImg.onerror = () => {
    modalImg.onerror = null; // evita loop infinito
    modalImg.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${pokemon.id}.png`;
  };

  document.getElementById("modal-id").textContent = "#" + pokemon.id.toString().padStart(3, "0");
  document.getElementById("modal-height").textContent = pokemon.height;
  document.getElementById("modal-weight").textContent = pokemon.weight;
  document.getElementById("modal-abilities").textContent = pokemon.abilities.map(capitalize).join(", ");

  const statsDiv = document.getElementById("modal-stats");
  statsDiv.innerHTML = "<h3>Estadísticas</h3>";

  pokemon.stats.forEach(s => {
    const pct = Math.min((s.base / 255) * 100, 100);

    const row = document.createElement("div");
    row.classList.add("stat-row");
    row.innerHTML = `
      <span>${capitalize(s.stat)}</span>
      <div class="stat-bar">
        <div class="stat-fill" style="width: ${pct}%"></div>
      </div>
      <span>${s.base}</span>
    `;
    statsDiv.appendChild(row);
  });

  document.getElementById("pokemon-modal").classList.remove("hidden");
}
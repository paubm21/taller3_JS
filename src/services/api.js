// Importamos la clase Pokemon para crear instancias con los datos de la API
import Pokemon from "../models/Pokemon.js";

const API_URL = "https://pokeapi.co/api/v2/pokemon/";

export async function fetchPokemon(id) {
  try {
    const res = await fetch(API_URL + id);
    if (!res.ok) throw new Error("No se encontró el Pokémon");

    const data = await res.json();

    const types = data.types.map(t => t.type.name);
    const abilities = data.abilities.map(a => a.ability.name);
    const stats = data.stats.map(s => ({
      stat: s.stat.name,
      base: s.base_stat
    }));

    // PNG sin fondo oficial
    const sprite = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data.id}.png`;

    return new Pokemon(
      data.id,
      data.name,
      types,
      sprite,
      data.height / 10,
      data.weight / 10,
      abilities,
      stats
    );

  } catch (error) {
    console.error("Error al cargar Pokémon:", error);
    return null;
  }
}
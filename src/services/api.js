// Importamos la clase Pokemon para crear instancias con los datos de la API
import Pokemon from "../models/Pokemon.js";

// URL base de la PokéAPI
const API_URL = "https://pokeapi.co/api/v2/pokemon/";

// Función asíncrona para obtener un Pokémon por su ID
export async function fetchPokemon(id) {
  try {
    const res = await fetch(API_URL + id);

    // Si la respuesta no es ok, lanzamos un error
    if (!res.ok) throw new Error("No se encontró el Pokémon");

    const data = await res.json();

    // Extraer los tipos
    const types = data.types.map(t => t.type.name);

    // Extraer las habilidades
    const abilities = data.abilities.map(a => a.ability.name);

    // Extraer las estadísticas
    const stats = data.stats.map(s => ({
      stat: s.stat.name,
      base: s.base_stat
    }));

    // Crear y retornar una instancia de Pokemon con todos sus datos
    return new Pokemon(
      data.id,
      data.name,
      types,
      data.sprites.other["official-artwork"].front_default,
      data.height / 10,  // convertir a metros
      data.weight / 10,  // convertir a kg
      abilities,
      stats
    );

  } catch (error) {
    console.error(error);
    return null;
  }
}
/*
 * Tutorial Exercise 07
 *
 * Objective:
 * The goal of this exercise is to enhance our understanding of working with APIs and handling asynchronous data in JavaScript.
 * Specifically, we're learning to use the `fetch()` function to request information from an external API (PokeAPI) and display 
 * relevant details (like the Pokémon's `base_experience`) on the web page. This approach helps us dynamically interact with 
 * data that’s not hardcoded in our code, making our application more flexible and capable of updating in real-time based on 
 * external information.
 *
 * Steps to enable fetch() and display the Pokémon's base_experience:
 *
 * 1. Create a function called `getBaseExperience` that:
 *    - Accepts a Pokémon name as a parameter.
 *    - Uses fetch() to request data from `https://pokeapi.co/api/v2/pokemon/{pokemonName}`.
 *    - Extracts and returns the `base_experience` value from the API response.
 * 
 * 2. Update the `listClickHandler` function to:
 *    - Call `getBaseExperience` with the Pokémon name retrieved from the clicked button's sibling.
 *    - Display both the Pokémon name and the retrieved `base_experience` in the `pokeMessage` element.
 *
 * 3. Test by clicking each Pokémon button to ensure the correct base_experience value is displayed.
 *
 * 4. Commit and push your changes. Show a TA when you've completed this step.
 *
 * 5. Add error handling for:
 *    - When the pokeAPI server does not respond
 *    - When you request a Pokemon that doesn't exist (e.g. https://pokeapi.co/api/v2/pokemon/james)
 *
 * 6. Commit and push your changes again. You're done!
 */

//
// APP VARIABLES AND DOM ELEMENTS
//

// 1. The ul for the list of pokemon
const pokeList = document.querySelector(".poke-items");
// 2. The span message to display the index
const pokeMessage = document.querySelector(".message");

//
// FUNCTIONS
//


async function getBaseExperience(pokemonName) {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
    if (!response.ok) {
      throw new Error(`Pokémon "${pokemonName}" not found (status: ${response.status})`)
    }
    const data = await response.json();
    return data.base_experience;
  } catch (error) {
    pokeMessage.textContent = `Error: ${error.message}`
    console.error(error);
    return null;
  }
}
// 3. Handle the event when a user clicks on the list
async function listClickHandler(event) {
  // Check if the click event is from a button or something else
  if (event.target.nodeName !== "BUTTON") {
    return;
  }

  // Get the Pokémon name from the previous sibling element of the button
  const pokemonName = event.target.previousElementSibling.textContent.trim();

  const baseExperience = await getBaseExperience(pokemonName);

  // Display the Pokémon name
  if (baseExperience !== null) {
  pokeMessage.textContent = `${pokemonName}: Base Experience = ${baseExperience}`;
  }
}

//
// EVENT LISTENERS AND INITIALISATION
//

// 4. Add the click event handler to the list
pokeList.addEventListener("click", listClickHandler);

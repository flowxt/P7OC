// Import des recettes
import { recipes } from "../../data/recipes.js";
console.log(recipes);

// Fonction pour afficher les recettes
function displayRecipes(recipes) {
  const container = document.getElementById("recipes-container");
  container.innerHTML = ""; // Vider le conteneur pour le rafraîchir

  recipes.forEach((recipe) => {
    const recipeCard = document.createElement("div");
    recipeCard.classList.add("recipe-card");

    recipeCard.innerHTML = `
      <img src="media/${recipe.image}" alt="${recipe.name}" />
      <div class="recipe-time">${recipe.time} min</div>
      <div class="recipe-content">
        <h2>${recipe.name}</h2>
        <h3>Recette</h3>
        <p class="description">${recipe.description}</p>  
        <h3>Ingrédients</h3>
        <ul>
          ${recipe.ingredients
            .map(
              (ingredient) =>
                `<li>${ingredient.ingredient}<br><span class="unit">${
                  ingredient.quantity || "-"
                } ${ingredient.unit || ""}</span></li>`
            )
            .join("")}
        </ul>
      </div>
    `;
    container.appendChild(recipeCard);
  });
}

// Fonction de filtrage par mot-clé dans la barre de recherche principale
function filterRecipesBySearch(term) {
  return recipes.filter((recipe) => {
    return (
      recipe.name.toLowerCase().includes(term) ||
      recipe.description.toLowerCase().includes(term) ||
      recipe.ingredients.some((ingredient) =>
        ingredient.ingredient.toLowerCase().includes(term)
      )
    );
  });
}

// Fonction de mise à jour des filtres avancés (ingrédients, appareils, ustensiles)
function updateAdvancedFilters(recipes) {
  const ingredientFilter = document.getElementById("ingredients");
  const applianceFilter = document.getElementById("appliances");
  const utensilFilter = document.getElementById("ustensils");

  // Recueillir les ingrédients, appareils, ustensiles uniques dans les recettes filtrées
  const ingredients = new Set();
  const appliances = new Set();
  const utensils = new Set();

  recipes.forEach((recipe) => {
    recipe.ingredients.forEach((ingredient) =>
      ingredients.add(ingredient.ingredient)
    );
    appliances.add(recipe.appliance);
    recipe.ustensils.forEach((utensil) => utensils.add(utensil));
  });

  // Mettre à jour chaque filtre avancé
  updateFilterOptions(ingredientFilter, ingredients);
  updateFilterOptions(applianceFilter, appliances);
  updateFilterOptions(utensilFilter, utensils);
}

// Fonction d'actualisation des options de filtre
function updateFilterOptions(filterElement, optionsSet) {
  filterElement.innerHTML = `<option value="" disabled selected>${filterElement.id}</option>`;
  optionsSet.forEach((option) => {
    const optionElement = document.createElement("option");
    optionElement.value = option;
    optionElement.textContent = option;
    filterElement.appendChild(optionElement);
  });
}

// Gestionnaire d'événement pour la barre de recherche principale
document.getElementById("search").addEventListener("input", (e) => {
  const searchTerm = e.target.value.trim().toLowerCase();

  if (searchTerm.length >= 3) {
    const filteredRecipes = filterRecipesBySearch(searchTerm);
    displayRecipes(filteredRecipes);
    updateAdvancedFilters(filteredRecipes);
  } else {
    // Si moins de 3 caractères, afficher toutes les recettes
    displayRecipes(recipes);
    updateAdvancedFilters(recipes);
  }
});

// Gestionnaire d'événement pour les filtres avancés
["ingredients", "appliances", "ustensils"].forEach((filterId) => {
  document.getElementById(filterId).addEventListener("change", (e) => {
    const selectedOption = e.target.value.toLowerCase();

    const filteredRecipes = recipes.filter((recipe) => {
      switch (filterId) {
        case "ingredients":
          return recipe.ingredients.some(
            (ingredient) =>
              ingredient.ingredient.toLowerCase() === selectedOption
          );
        case "appliances":
          return recipe.appliance.toLowerCase() === selectedOption;
        case "ustensils":
          return recipe.ustensils.some(
            (utensil) => utensil.toLowerCase() === selectedOption
          );
      }
    });

    displayRecipes(filteredRecipes);
    updateAdvancedFilters(filteredRecipes);
  });
});

// Appel initial pour afficher toutes les recettes
displayRecipes(recipes);
updateAdvancedFilters(recipes);

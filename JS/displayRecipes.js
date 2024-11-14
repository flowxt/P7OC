// displayRecipes.js

// Affiche les recettes dans le conteneur spécifié
export function displayRecipes(
  recipesToDisplay,
  recipesContainer,
  updateRecipeCount
) {
  recipesContainer.innerHTML = "";
  for (let recipe of recipesToDisplay) {
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
                        (ingredient) => `
                            <li>${ingredient.ingredient}<br>
                                <span class="unit">${
                                  ingredient.quantity || "-"
                                } ${ingredient.unit || ""}</span>
                            </li>`
                      )
                      .join("")}
                </ul>
            </div>
        `;
    recipesContainer.appendChild(recipeCard);
  }
  updateRecipeCount(recipesToDisplay.length);
}

// Met à jour le nombre de recettes affichées
export function updateRecipeCount(count, nbRecipeSpan) {
  nbRecipeSpan.textContent = `${count} recette${count > 1 ? "s" : ""}`;
}

// Fonction principale pour afficher les recettes dans le conteneur spécifié
// Paramètres :
// - recipesToDisplay : un tableau d'objets recettes à afficher
// - recipesContainer : l'élément DOM où les recettes seront injectées
// - updateRecipeCount : fonction de mise à jour du compteur de recettes
export function displayRecipes(
  recipesToDisplay,
  recipesContainer,
  updateRecipeCount
) {
  // Vide le conteneur des recettes pour éviter la duplication
  recipesContainer.innerHTML = "";

  // Si aucune recette n'est trouvée, afficher un message
  if (recipesToDisplay.length === 0) {
    const noRecipesMessage = document.createElement("p");
    noRecipesMessage.classList.add("no-recipes-message");
    noRecipesMessage.textContent = "Aucune recette n'a été trouvée.";
    recipesContainer.appendChild(noRecipesMessage);
    updateRecipeCount(0); // Met à jour le compteur à 0
    return;
  }

  // Parcourir chaque recette du tableau de recettes à afficher
  for (let recipe of recipesToDisplay) {
    const recipeCard = document.createElement("div");
    recipeCard.classList.add("recipe-card");

    // Ajouter le contenu HTML de la carte de recette
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
    // Ajoute la carte de recette dans le conteneur des recettes
    recipesContainer.appendChild(recipeCard);
  }
  // Met à jour le compteur de recettes en affichant le nombre total
  updateRecipeCount(recipesToDisplay.length);
}

// Fonction pour mettre à jour le nombre de recettes affichées
// Paramètres :
// - count : nombre de recettes affichées
// - nbRecipeSpan : élément DOM où le nombre de recettes sera affiché
export function updateRecipeCount(count, nbRecipeSpan) {
  nbRecipeSpan.textContent = `${count} recette${count > 1 ? "s" : ""}`;
}

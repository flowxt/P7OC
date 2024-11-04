import { recipes } from "../../data/recipes.js";
console.log(recipes);
function displayRecipes(recipes) {
  const container = document.getElementById("recipes-container");
  container.innerHTML = ""; // Vider le conteneur pour le rafraîchir

  recipes.forEach((recipe) => {
    // Crée un élément pour chaque recette
    const recipeCard = document.createElement("div");
    recipeCard.classList.add("recipe-card");

    // Ajoute le contenu de la recette
    recipeCard.innerHTML = `

        <img src="media/${recipe.image}" alt="${recipe.name}" />
        <div class="recipe-time">${recipe.time} min</div>
        <div class="recipe-content">
        <h2>${recipe.name}</h2>
        <h3>Recette</h3>
        
        <p class=description>${recipe.description}</p>  
        <h3>Ingrédients</h3>
        <ul>
          ${recipe.ingredients
            .map(
              (ingredient) =>
                `<li>${ingredient.ingredient}<br><span class=unit>${
                  ingredient.quantity || "-"
                } ${ingredient.unit || ""}</span></li>`
            )
            .join("")}
        </ul>
        </div>
      `;

    // Ajoute chaque recette dans le conteneur
    container.appendChild(recipeCard);
  });
}

// Appelle la fonction pour afficher les recettes
displayRecipes(recipes);

// Filtre les recettes en fonction du texte de recherche
// Paramètres :
// - searchText : le texte de recherche saisi par l'utilisateur
// - recipes : le tableau d'objets recettes à filtrer
// Retourne : un tableau des recettes qui correspondent au texte de recherche

export function filterRecipesByText(searchText, recipes) {
  // Convertit le texte de recherche en minuscules pour une comparaison non sensible à la casse
  const lowerSearchText = searchText.toLowerCase();
  // Filtrer les recettes en vérifiant si le nom, la description, ou un ingrédient correspond au texte de recherche
  return recipes.filter(
    (recipe) =>
      // Vérifie si le nom de la recette contient le texte de recherche
      recipe.name.toLowerCase().includes(lowerSearchText) ||
      // Vérifie si la description de la recette contient le texte de recherche
      recipe.description.toLowerCase().includes(lowerSearchText) ||
      // Vérifie si l'un des ingrédients de la recette contient le texte de recherche
      recipe.ingredients.some((ing) =>
        ing.ingredient.toLowerCase().includes(lowerSearchText)
      )
  );
}

// Filtre les recettes en fonction de plusieurs tags (ingrédients, appareils, ustensiles)
// Paramètres :
// - recipesToFilter : tableau des recettes à filtrer
// - selectedIngredients : tableau des ingrédients sélectionnés comme tags
// - selectedAppliances : tableau des appareils sélectionnés comme tags
// - selectedUtensils : tableau des ustensiles sélectionnés comme tags
// Retourne : un tableau des recettes qui correspondent aux tags sélectionnés

export function filterRecipesByMultipleTags(
  recipesToFilter,
  selectedIngredients,
  selectedAppliances,
  selectedUtensils
) {
  // Filtre les recettes en vérifiant chaque catégorie de tags (ingrédients, appareils, ustensiles)
  return recipesToFilter.filter((recipe) => {
    // Vérifie si tous les ingrédients sélectionnés sont présents dans la recette
    const ingredientMatch =
      selectedIngredients.length === 0 ||
      selectedIngredients.every((ing) =>
        recipe.ingredients.some(
          (r) => r.ingredient.toLowerCase() === ing.toLowerCase()
        )
      );
    // Vérifie si l'appareil sélectionné est présent dans la recette
    const applianceMatch =
      selectedAppliances.length === 0 ||
      selectedAppliances.some(
        (app) => recipe.appliance.toLowerCase() === app.toLowerCase()
      );

    // Vérifie si tous les ustensiles sélectionnés sont présents dans la recette
    const utensilMatch =
      selectedUtensils.length === 0 ||
      selectedUtensils.every((ut) =>
        recipe.ustensils.some((u) => u.toLowerCase() === ut.toLowerCase())
      );

    // La recette est incluse seulement si elle correspond à tous les critères de sélection
    return ingredientMatch && applianceMatch && utensilMatch;
  });
}

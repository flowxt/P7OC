// Fonction générique pour vérifier les correspondances
function matchItems(recipeItems, selectedItems, comparisonType = "some") {
  // Si aucun élément sélectionné, correspond automatiquement
  if (selectedItems.length === 0) return true;

  const normalizedRecipeItems = recipeItems.map((item) => item.toLowerCase());
  const normalizedSelectedItems = selectedItems.map((item) =>
    item.toLowerCase()
  );

  // Choix entre "some" (au moins un), "every" (tous) ou autre logique
  switch (comparisonType) {
    case "some":
      return normalizedSelectedItems.some((item) =>
        normalizedRecipeItems.includes(item)
      );
    case "every":
      return normalizedSelectedItems.every((item) =>
        normalizedRecipeItems.includes(item)
      );
    default:
      throw new Error("Invalid comparison type");
  }
}

// Fonction pour filtrer les recettes par texte (name et description uniquement)
// Fonction pour échapper les caractères spéciaux dans le texte de recherche
function sanitizeInput(input) {
  const div = document.createElement("div");
  div.textContent = input;
  return div.innerHTML;
}

// Fonction pour filtrer les recettes par texte (name et description uniquement)
export function filterRecipesByText(searchText, recipes) {
  // Assainir le texte de recherche pour éviter les balises malveillantes
  const sanitizedSearchText = sanitizeInput(searchText).toLowerCase();

  return recipes.filter(
    (recipe) =>
      recipe.name.toLowerCase().includes(sanitizedSearchText) ||
      recipe.description.toLowerCase().includes(sanitizedSearchText)
  );
}

// Fonction pour filtrer les recettes par plusieurs tags
export function filterRecipesByMultipleTags(
  recipesToFilter,
  selectedIngredients,
  selectedAppliances,
  selectedUtensils
) {
  return recipesToFilter.filter((recipe) => {
    const ingredientMatch = matchItems(
      recipe.ingredients.map((ing) => ing.ingredient),
      selectedIngredients,
      "every"
    );
    const applianceMatch = matchItems(
      [recipe.appliance], // Normalisation des appareils en tableau
      selectedAppliances,
      "some"
    );
    const utensilMatch = matchItems(
      recipe.ustensils,
      selectedUtensils,
      "every"
    );

    return ingredientMatch && applianceMatch && utensilMatch;
  });
}

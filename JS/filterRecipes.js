// filterRecipes.js

export function filterRecipesByText(searchText, recipes) {
  const lowerSearchText = searchText.toLowerCase();
  return recipes.filter(
    (recipe) =>
      recipe.name.toLowerCase().includes(lowerSearchText) ||
      recipe.description.toLowerCase().includes(lowerSearchText) ||
      recipe.ingredients.some((ing) =>
        ing.ingredient.toLowerCase().includes(lowerSearchText)
      )
  );
}

export function filterRecipesByMultipleTags(
  recipesToFilter,
  selectedIngredients,
  selectedAppliances,
  selectedUtensils
) {
  return recipesToFilter.filter((recipe) => {
    const ingredientMatch =
      selectedIngredients.length === 0 ||
      selectedIngredients.every((ing) =>
        recipe.ingredients.some(
          (r) => r.ingredient.toLowerCase() === ing.toLowerCase()
        )
      );

    const applianceMatch =
      selectedAppliances.length === 0 ||
      selectedAppliances.some(
        (app) => recipe.appliance.toLowerCase() === app.toLowerCase()
      );

    const utensilMatch =
      selectedUtensils.length === 0 ||
      selectedUtensils.every((ut) =>
        recipe.ustensils.some((u) => u.toLowerCase() === ut.toLowerCase())
      );

    return ingredientMatch && applianceMatch && utensilMatch;
  });
}

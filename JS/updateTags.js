// updateTags.js

export function updateAvailableTags(filteredRecipes, updateSelect) {
  const ingredientsSet = new Set();
  const appliancesSet = new Set();
  const utensilsSet = new Set();

  filteredRecipes.forEach((recipe) => {
    recipe.ingredients.forEach((ing) => ingredientsSet.add(ing.ingredient));
    appliancesSet.add(recipe.appliance);
    recipe.ustensils.forEach((utensil) => utensilsSet.add(utensil));
  });

  updateSelect("ingredients", Array.from(ingredientsSet));
  updateSelect("appliances", Array.from(appliancesSet));
  updateSelect("ustensils", Array.from(utensilsSet));
}

export function updateSelect(selectId, options) {
  const select = document.getElementById(selectId);
  const currentValue = select.value;
  const label =
    selectId === "ingredients"
      ? "Ingrédients"
      : selectId === "appliances"
      ? "Appareils"
      : "Ustensiles";

  select.innerHTML = `<option value="">${label}</option>`;
  options.forEach((option) => {
    const optionElement = document.createElement("option");
    optionElement.value = option;
    optionElement.textContent = option;
    select.appendChild(optionElement);
  });
  select.value = currentValue;
}

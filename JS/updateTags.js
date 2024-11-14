// Fonction pour mettre à jour les tags disponibles pour chaque catégorie (ingrédients, appareils, ustensiles)

export function updateAvailableTags(filteredRecipes, updateSelect) {
  const ingredientsSet = new Set();
  const appliancesSet = new Set();
  const utensilsSet = new Set();

  // Parcourt chaque recette filtrée pour extraire les ingrédients, appareils et ustensiles
  filteredRecipes.forEach((recipe) => {
    recipe.ingredients.forEach((ing) => ingredientsSet.add(ing.ingredient));
    appliancesSet.add(recipe.appliance);
    recipe.ustensils.forEach((utensil) => utensilsSet.add(utensil));
  });

  // Met à jour les options du <select> pour chaque catégorie en utilisant la fonction updateSelect
  updateSelect("ingredients", Array.from(ingredientsSet));
  updateSelect("appliances", Array.from(appliancesSet));
  updateSelect("ustensils", Array.from(utensilsSet));
}

// Fonction pour mettre à jour les options d'un menu déroulant <select> en fonction des données
export function updateSelect(selectId, options) {
  const select = document.getElementById(selectId);
  const currentValue = select.value;
  // Détermine l'étiquette du <select> en fonction de son id
  const label =
    selectId === "ingredients"
      ? "Ingrédients"
      : selectId === "appliances"
      ? "Appareils"
      : "Ustensiles";

  // Remplace le contenu HTML du <select> avec une nouvelle option par défaut (vide)
  select.innerHTML = `<option value="">${label}</option>`;
  // Ajoute les nouvelles options au <select> en fonction des données fournies
  options.forEach((option) => {
    const optionElement = document.createElement("option");
    optionElement.value = option; // Définit la valeur de l'option
    optionElement.textContent = option; // Définit le texte de l'option
    select.appendChild(optionElement); // Ajoute l'option au menu déroulant
  });
  // Restaure la valeur initiale sélectionnée dans le <select>
  select.value = currentValue;
}

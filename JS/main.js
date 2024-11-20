// Importation des modules et fonctions nécessaires

import { recipes } from "../../data/recipes.js";
import { displayRecipes, updateRecipeCount } from "./displayRecipes.js";
import {
  filterRecipesByText,
  filterRecipesByMultipleTags,
} from "./filterRecipes.js";
import { updateAvailableTags, updateSelect } from "./updateTags.js";
import { addTag, removeTag } from "./manageTags.js";

// Sélection des éléments DOM
const input = document.getElementById("search");
const form = document.querySelector("form");
const recipesContainer = document.getElementById("recipes-container");
const nbRecipeSpan = document.getElementById("nbrecipe");

// Variable pour stocker les recettes filtrées
let filteredRecipes = recipes;

// Fonction de recherche principale
function performSearch() {
  const searchText = input.value.trim();
  let recipesToFilter = recipes;

  // Filtrage des recettes par texte si au moins 3 caractères sont saisis
  if (searchText.length >= 3) {
    recipesToFilter = filterRecipesByText(searchText, recipes);
  }

  // Récupération des tags sélectionnés pour les ingrédients, appareils, et ustensiles
  const selectedIngredients = Array.from(
    document.querySelectorAll("#selected-ingredients .tag")
  ).map((tag) => tag.getAttribute("data-value"));
  const selectedAppliances = Array.from(
    document.querySelectorAll("#selected-appliances .tag")
  ).map((tag) => tag.getAttribute("data-value"));
  const selectedUtensils = Array.from(
    document.querySelectorAll("#selected-ustensils .tag")
  ).map((tag) => tag.getAttribute("data-value"));

  // Filtrage des recettes en fonction des tags sélectionnés
  filteredRecipes = filterRecipesByMultipleTags(
    recipesToFilter,
    selectedIngredients,
    selectedAppliances,
    selectedUtensils
  );

  // Affiche les recettes filtrées et met à jour le nombre de recettes
  displayRecipes(
    filteredRecipes,
    recipesContainer,
    (count) => updateRecipeCount(count, nbRecipeSpan),
    searchText // Passe le texte recherché pour afficher un message personnalisé
  );

  // Met à jour la liste des tags disponibles en fonction des recettes filtrées
  updateAvailableTags(filteredRecipes, updateSelect);
}

// Écoute les entrées dans le champ de recherche et effectue la recherche en temps réel
input.addEventListener("input", performSearch);
// Empêche le rechargement de la page lors de la soumission du formulaire et lance la recherche
form.addEventListener("submit", function (e) {
  e.preventDefault();
  performSearch();
});
// Pour chaque liste de tags (ingrédients, appareils, ustensiles), ajoute un événement pour les sélectionner
["ingredients", "appliances", "ustensils"].forEach(function (selectId) {
  document.getElementById(selectId).addEventListener("change", function (e) {
    addTag(selectId, e.target.value, performSearch);
  });
});
// Gère la suppression des tags en écoutant les clics sur les icônes de fermeture
document.addEventListener("click", function (e) {
  if (e.target.classList.contains("close-tag")) {
    const selectId = e.target.dataset.select;
    const value = e.target.dataset.value;
    removeTag(selectId, value, performSearch);
  }
});
// Affichage initial de toutes les recettes et mise à jour des tags disponibles
displayRecipes(recipes, recipesContainer, (count) =>
  updateRecipeCount(count, nbRecipeSpan)
);
updateAvailableTags(filteredRecipes, updateSelect);

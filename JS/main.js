// main.js

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

let filteredRecipes = recipes;

function performSearch() {
  const searchText = input.value.trim();
  let recipesToFilter = recipes;

  if (searchText.length >= 3) {
    recipesToFilter = filterRecipesByText(searchText, recipes);
  }

  const selectedIngredients = Array.from(
    document.querySelectorAll("#selected-ingredients .tag")
  ).map((tag) => tag.getAttribute("data-value"));
  const selectedAppliances = Array.from(
    document.querySelectorAll("#selected-appliances .tag")
  ).map((tag) => tag.getAttribute("data-value"));
  const selectedUtensils = Array.from(
    document.querySelectorAll("#selected-ustensils .tag")
  ).map((tag) => tag.getAttribute("data-value"));

  filteredRecipes = filterRecipesByMultipleTags(
    recipesToFilter,
    selectedIngredients,
    selectedAppliances,
    selectedUtensils
  );

  displayRecipes(filteredRecipes, recipesContainer, (count) =>
    updateRecipeCount(count, nbRecipeSpan)
  );
  updateAvailableTags(filteredRecipes, updateSelect);
}

// Écouteurs d'événements
input.addEventListener("input", performSearch);
form.addEventListener("submit", function (e) {
  e.preventDefault();
  performSearch();
});
["ingredients", "appliances", "ustensils"].forEach(function (selectId) {
  document.getElementById(selectId).addEventListener("change", function (e) {
    addTag(selectId, e.target.value, performSearch);
  });
});
document.addEventListener("click", function (e) {
  if (e.target.classList.contains("close-tag")) {
    const selectId = e.target.dataset.select;
    const value = e.target.dataset.value;
    removeTag(selectId, value, performSearch);
  }
});

displayRecipes(recipes, recipesContainer, (count) =>
  updateRecipeCount(count, nbRecipeSpan)
);
updateAvailableTags(filteredRecipes, updateSelect);

// Fonction pour ajouter un tag de filtre

export function addTag(selectId, value, performSearch) {
  if (!value) return;

  // Sélection du conteneur correspondant au type de tag (ingrédient, appareil ou ustensile)
  const tagContainer = document.getElementById(`selected-${selectId}`);
  // Vérifie si le tag existe déjà dans le conteneur
  const existingTag = tagContainer.querySelector(`.tag[data-value="${value}"]`);

  if (existingTag) return; // Si le tag existe déjà, on arrête la fonction

  // Création de l'élément de tag avec la classe "tag" et l'attribut data-value
  const tag = document.createElement("span");
  tag.classList.add("tag");
  tag.setAttribute("data-value", value);
  tag.innerHTML = `${value} <i class="fa-solid fa-xmark close-tag" data-select="${selectId}" data-value="${value}"></i>`;

  tagContainer.appendChild(tag);

  // Réinitialise la sélection du champ <select> pour éviter d'afficher la valeur précédemment sélectionnée
  document.getElementById(selectId).value = "";

  // Lance la fonction de recherche mise à jour pour appliquer le filtrage avec le nouveau tag
  performSearch();
}

// Fonction pour supprimer un tag de filtre
export function removeTag(selectId, value, performSearch) {
  const tagContainer = document.getElementById(`selected-${selectId}`);
  const tag = tagContainer.querySelector(`.tag[data-value="${value}"]`);

  // Si le tag existe, on le supprime du conteneur
  if (tag) {
    tag.remove();
  }
  // Relance la fonction de recherche pour mettre à jour les résultats sans le tag supprimé
  performSearch();
}

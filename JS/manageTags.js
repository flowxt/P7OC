// manageTags.js

export function addTag(selectId, value, performSearch) {
  if (!value) return;

  const tagContainer = document.getElementById(`selected-${selectId}`);
  const existingTag = tagContainer.querySelector(`.tag[data-value="${value}"]`);

  if (existingTag) return;

  const tag = document.createElement("span");
  tag.classList.add("tag");
  tag.setAttribute("data-value", value);
  tag.innerHTML = `${value} <i class="fa-solid fa-xmark close-tag" data-select="${selectId}" data-value="${value}"></i>`;

  tagContainer.appendChild(tag);

  document.getElementById(selectId).value = "";

  performSearch();
}

export function removeTag(selectId, value, performSearch) {
  const tagContainer = document.getElementById(`selected-${selectId}`);
  const tag = tagContainer.querySelector(`.tag[data-value="${value}"]`);

  if (tag) {
    tag.remove();
  }

  performSearch();
}

export function addLoader(
  loaderContainer,
  loaderClass,
  clearContainer = false,
) {
  if (clearContainer) loaderContainer.innerHTML = "";
  const loader = document.createElement("div");
  loader.classList.add(loaderClass);
  loaderContainer.appendChild(loader);
}

export function removeLoader(loaderClass) {
  const loader = document.querySelector(`.${loaderClass}`);
  if (loader) loader.remove();
}

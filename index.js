const aside = document.querySelector(".primary-aside");
const asideToggle = document.querySelector(
  ".primary-aside .mobile-aside-toggle"
);

asideToggle.addEventListener("click", () => {
  const isVisible = aside.getAttribute("data-visible") === "true";
  aside.setAttribute("data-visible", !isVisible);
  asideToggle.setAttribute("aria-expanded", !isVisible);
});

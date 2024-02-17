// Select the aside element
const aside = document.querySelector(".chat-sidebar");
const asideToggleMobile = document.querySelector(".mobile-aside-toggle");
const asideToggleDesktop = document.querySelector(".desktop-aside-toggle");

//! Local Storage
const localStorageClosedNav = localStorage.getItem("navClose");

if (localStorageClosedNav === "true") {
  // Toggle visibility for desktop
  toggleVisibility(asideToggleDesktop, "data-visibleD");
  // Toggle desktop icon and style
  toggleDesktopIconAndStyle();
}

//! close/open Nav
//! Mobile toggle
asideToggleMobile.addEventListener("click", toggleMobileVisibility);

//! Desktop toggle
asideToggleDesktop.addEventListener("mouseenter", toggleOpacity);
asideToggleDesktop.addEventListener("mouseleave", toggleOpacity);
asideToggleDesktop.addEventListener("click", toggleDesktopVisibility);

//! Functions
// Function to toggle visibility and ARIA attribute
function toggleVisibility(toggleElement, dataAttribute) {
  const isVisible = aside.getAttribute(dataAttribute) === "true";
  aside.setAttribute(dataAttribute, !isVisible);
  toggleElement.setAttribute("aria-expanded", !isVisible);
  localStorage.setItem("navClose", !isVisible);
}

// Function to toggle opacity based on the provided value
function toggleOpacity() {
  aside.classList.toggle("toggleOpacity");
}

// Function to toggle desktop icon and style
function toggleDesktopIconAndStyle() {
  const isVisible = asideToggleDesktop.getAttribute("aria-expanded") === "true";
  asideToggleDesktop.innerHTML = isVisible ? ">>" : "<<";
  const rightClass = isVisible ? "-right-5" : "-right-3";
  const topClass = isVisible ? "top-[90px]" : "top-[70px]";
  asideToggleDesktop.classList.replace(
    isVisible ? "-right-3" : "-right-5",
    rightClass,
  );
  asideToggleDesktop.classList.replace(
    isVisible ? "top-[70px]" : "top-[90px]",
    topClass,
  );
}

// Function to close aside when clicking outside
function closeAsideOnClickOutside(event) {
  if (
    !aside.contains(event.target) &&
    asideToggleMobile.getAttribute("aria-expanded") === "true"
  ) {
    toggleVisibility(asideToggleMobile, "data-visibleM");
    document.body.removeEventListener("click", closeAsideOnClickOutside);
  }
}

// Function to toggle mobile visibility
function toggleMobileVisibility() {
  // Toggle visibility for mobile
  toggleVisibility(asideToggleMobile, "data-visibleM");

  // Add or remove event listener to close aside on outside click
  if (asideToggleMobile.getAttribute("aria-expanded") === "true") {
    document.body.addEventListener("click", closeAsideOnClickOutside);
  } else {
    document.body.removeEventListener("click", closeAsideOnClickOutside);
  }
}

// Function to toggle desktop visibility
function toggleDesktopVisibility() {
  // Toggle visibility for desktop
  toggleVisibility(asideToggleDesktop, "data-visibleD");
  // Toggle desktop icon and style
  toggleDesktopIconAndStyle();
}

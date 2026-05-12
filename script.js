const burger = document.querySelector(".burger");
const mobileMenu = document.querySelector(".mobile-menu");
const mobileLinks = document.querySelectorAll(
  ".mobile-nav a, .mobile-actions a",
);

function closeMenu() {
  if (!burger || !mobileMenu) return;

  burger.classList.remove("is-active");
  burger.setAttribute("aria-expanded", "false");
  burger.setAttribute("aria-label", "Открыть меню");

  mobileMenu.classList.remove("is-open");
  mobileMenu.setAttribute("aria-hidden", "true");

  document.body.classList.remove("is-menu-open");
}

function openMenu() {
  if (!burger || !mobileMenu) return;

  burger.classList.add("is-active");
  burger.setAttribute("aria-expanded", "true");
  burger.setAttribute("aria-label", "Закрыть меню");

  mobileMenu.classList.add("is-open");
  mobileMenu.setAttribute("aria-hidden", "false");

  document.body.classList.add("is-menu-open");
}

function toggleMenu() {
  if (!burger || !mobileMenu) return;

  const isOpen = burger.classList.contains("is-active");

  if (isOpen) {
    closeMenu();
  } else {
    openMenu();
  }
}

if (burger && mobileMenu) {
  burger.addEventListener("click", toggleMenu);

  mobileLinks.forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMenu();
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 1100) {
      closeMenu();
    }
  });
}

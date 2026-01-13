document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll("#mainNav .nav-link");

  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();

      // Reset active state
      navLinks.forEach((l) => {
        l.classList.remove(
          "active",
          "text-primary",
          "border-bottom",
          "border-2",
          "border-primary"
        );
        l.classList.add("text-secondary");
      });

      // Set active link
      link.classList.add(
        "active",
        "text-primary",
        "border-bottom",
        "border-2",
        "border-primary"
      );
      link.classList.remove("text-secondary");

      // 👉 REDIRECT TO PAGE (FIX)
      const page = link.getAttribute("data-page");
      window.location.href = page;
    });
  });
});

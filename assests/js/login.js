
      const left = document.getElementById("leftCard");
      const right = document.getElementById("rightCard");
      const register = document.getElementById("registerBox");

      // Apply initial enter animation on page load
      window.addEventListener("DOMContentLoaded", () => {
        left.classList.add("enter-left");
        right.classList.add("enter-right");
      });

      // Role selection
      let selectedRole = "Student";
      document.querySelectorAll(".role").forEach((r) => {
        r.onclick = () => {
          document
            .querySelectorAll(".role")
            .forEach((x) => x.classList.remove("active"));
          r.classList.add("active");
          selectedRole = r.dataset.role;
          document.getElementById("loginBtn").innerText =
            "Sign In as " + selectedRole;
        };
      });

      // Show registration form
      function showRegister() {
        left.classList.remove("enter-left");
        right.classList.remove("enter-right");
        left.classList.add("exit-left");
        right.classList.add("exit-right");

        // Wait for left animation end
        left.addEventListener("animationend", onExit);
      }
      function onExit() {
        left.removeEventListener("animationend", onExit);
        left.style.display = "none";
        right.style.display = "none";
        left.classList.remove("exit-left");
        right.classList.remove("exit-right");
        register.classList.add("show");
      }

      // Back to login
      function backToLogin() {
        register.classList.remove("show");
        register.style.display = "none";

        left.style.display = "block";
        right.style.display = "block";

        left.classList.remove("enter-left");
        right.classList.remove("enter-right");
        void left.offsetWidth;
        void right.offsetWidth;

        left.classList.add("enter-left");
        right.classList.add("enter-right");
      }
    
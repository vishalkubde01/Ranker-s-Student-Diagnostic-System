function toggleContent(btn) {
        const extra = btn.previousElementSibling;
        if (extra.classList.contains("d-none")) {
          extra.classList.remove("d-none");
          btn.innerText = "Show Less";
        } else {
          extra.classList.add("d-none");
          btn.innerText = "Show More";
        }
      }
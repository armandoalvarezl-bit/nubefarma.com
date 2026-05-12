const menuButton = document.querySelector(".menu-button");
const siteMenu = document.querySelector(".site-menu");
const year = document.querySelector("#year");
const forms = document.querySelectorAll("form[data-form]");
const whatsappNumber = "573206135719";

if (year) {
  year.textContent = new Date().getFullYear();
}

if (menuButton && siteMenu) {
  menuButton.addEventListener("click", () => {
    const isOpen = siteMenu.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", String(isOpen));
  });
}

const pageName = window.location.pathname.split("/").pop().replace(".html", "") || "index";
document.querySelectorAll("[data-page]").forEach((link) => {
  if (link.dataset.page === pageName) {
    link.classList.add("active");
  }
});

forms.forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const note = form.querySelector(".form-note");
    const formData = new FormData(form);
    const accessType = form.dataset.access;
    const title = accessType
      ? `Solicitud de acceso ${accessType}`
      : "Solicitud de demo NubeFarma";
    const lines = [title, ""];

    formData.forEach((value, key) => {
      const text = String(value).trim();

      if (!text || key.toLowerCase().includes("password")) {
        return;
      }

      lines.push(`${formatLabel(key)}: ${text}`);
    });

    if (accessType) {
      lines.push("", "Nota: por seguridad la contrasena no se envia por WhatsApp.");
    }

    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(lines.join("\n"))}`;

    window.open(whatsappUrl, "_blank", "noopener");

    if (note) {
      note.textContent = "Se abrio WhatsApp con tus datos. Presiona enviar para completar la solicitud.";
    }
    form.reset();
  });
});

function formatLabel(name) {
  return name
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

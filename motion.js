if ("IntersectionObserver" in window && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        entry.target.classList.add("arriving");
        observer.unobserve(entry.target);
      }
    }
  }, { threshold: 0.12 });

  for (const paper of document.querySelectorAll(".paper")) {
    if (paper.getBoundingClientRect().top > window.innerHeight) {
      observer.observe(paper);
    }
  }
}

const teaser = document.querySelector("[data-teaser]");
const dialog = document.querySelector(".teaser-dialog");
const video = dialog.querySelector("video");

if (typeof dialog.showModal === "function") {
  teaser.addEventListener("click", event => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    if (!video.hasAttribute("src")) video.src = teaser.href;
    dialog.showModal();
    video.play().catch(() => {});
  });
  dialog.addEventListener("close", () => video.pause());
}

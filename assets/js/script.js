function toggleMenu() {
  document.querySelector(".sidebar").classList.toggle("active");
}

const links = document.querySelectorAll(".sidebar a");
const current = window.location.pathname.split("/").pop();

links.forEach(link => {
  if (link.getAttribute("href") === current) {
    link.classList.add("active");
  }
});

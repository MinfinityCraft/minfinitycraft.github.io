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

window.addEventListener("load", () => {
  setTimeout(() => {
    const loading = document.getElementById("loading");
    if (loading) loading.remove();
  }, 1800);
});

fetch("assets/data/news.json")
  .then(res => res.json())
  .then(data => {
    const newsBox = document.getElementById("news");

    data.forEach(item => {
      const p = document.createElement("p");
      p.textContent = "・" + item.text;
      newsBox.appendChild(p);
    });
  });

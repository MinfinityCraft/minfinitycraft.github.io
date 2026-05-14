function toggleMenu() {
  document
    .querySelector(".sidebar")
    .classList.toggle("active");
}

/* =========================
   📄 現在ページ
========================= */
const links =
  document.querySelectorAll(".sidebar a");

const current =
  window.location.pathname
  .split("/")
  .pop();

links.forEach(link => {

  if (
    link.getAttribute("href") === current
  ) {
    link.classList.add("active");
  }

});

/* =========================
   🌌 粒子
========================= */
const particles =
  document.getElementById("particles");

if (particles) {

  for (let i = 0; i < 40; i++) {

    const particle =
      document.createElement("div");

    particle.classList.add("particle");

    particle.style.left =
      Math.random() * 100 + "vw";

    const size =
      Math.random() * 4 + 2;

    particle.style.width =
      size + "px";

    particle.style.height =
      size + "px";

    particle.style.animationDuration =
      (Math.random() * 10 + 8) + "s";

    particle.style.animationDelay =
      Math.random() * 5 + "s";

    particle.style.bottom = "-20px";

    particles.appendChild(particle);

  }

}

/* =========================
   ⏳ ローディング
========================= */
window.addEventListener("load", () => {

  const loading =
    document.getElementById("loading");

  /* 粒子表示 */
  if (particles) {
    particles.classList.add("show");
  }

  /* フェード開始 */
  setTimeout(() => {

    if (loading) {

      loading.classList.add("fade-out");

      setTimeout(() => {
        loading.remove();
      }, 1800);

    }

  }, 1200);

});

/* =========================
   📰 NEWS
========================= */
const newsBox =
  document.getElementById("news");

if (newsBox) {

  fetch("assets/data/news.json")
    .then(res => res.json())
    .then(data => {

      data.forEach(item => {

        const p =
          document.createElement("p");

        p.textContent =
          "・" + item.text;

        newsBox.appendChild(p);

      });

    });

}

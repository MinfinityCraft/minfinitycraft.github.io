function toggleMenu() {

  const sidebar =
    document.querySelector(".sidebar");

  const hamburger =
    document.querySelector(".hamburger");

  if (sidebar) {
    sidebar.classList.toggle("active");
  }

  if (hamburger) {
    hamburger.classList.toggle("hide");
  }

}
/* =========================
   📄 現在ページ
========================= */
const links = document.querySelectorAll(".sidebar a");
const current = window.location.pathname.split("/").pop();

links.forEach(link => {
  if (link.getAttribute("href") === current) {
    link.classList.add("active");
  }
});

/* =========================
   🌌 粒子生成
========================= */
const particles = document.getElementById("particles");

if (particles) {
  const body = document.body;

  let particleColor = "rgba(125, 211, 252, 0.8)";

  if (body.classList.contains("rules-page")) {
    particleColor = "rgba(255, 215, 0, 0.7)";
  }

  if (body.classList.contains("staff-page")) {
    particleColor = "rgba(255,255,255,0.7)";
  }

  const isHome = body.classList.contains("home-page");
  const count = isHome ? 40 : 18;

  for (let i = 0; i < count; i++) {
    const p = document.createElement("div");
    p.classList.add("particle");

    p.style.left = Math.random() * 100 + "vw";
    p.style.width = p.style.height = (Math.random() * 4 + 2) + "px";
    p.style.background = particleColor;
    p.style.boxShadow = `0 0 6px ${particleColor}`;
    p.style.animationDuration = (Math.random() * 10 + 8) + "s";
    p.style.animationDelay = Math.random() * 5 + "s";
    p.style.bottom = "-20px";

    particles.appendChild(p);
  }
}

/* =========================
   ⏳ ローディング
========================= */

const loading = document.getElementById("loading");
const particlesEl = document.getElementById("particles");
const home = document.querySelector(".home-inner");

setTimeout(() => {

  if (particlesEl) {
    particlesEl.classList.add("show");
  }

}, 500);

setTimeout(() => {

  if (loading) {

    loading.classList.add("fade-out");

    setTimeout(() => {

      loading.style.display = "none";

      if (home) {
        home.classList.add("show");
      }

    }, 900);

  }

}, 1600);
/* =========================
   📰 NEWS
========================= */
const newsBox = document.getElementById("news");

if (newsBox) {

  fetch("assets/data/news.json")

    .then(res => {

      if (!res.ok) {
        throw new Error("news.json 読み込み失敗");
      }

      return res.json();

    })

    .then(data => {

      data.forEach(item => {

        const p = document.createElement("p");

        p.textContent = item.text;

        newsBox.appendChild(p);

      });

    })

    .catch(err => {

      console.error(err);

      newsBox.innerHTML =
        "<p>NEWSの読み込みに失敗しました</p>";

    });

}
/* =========================
   🌌 ページ遷移フェード
========================= */

const content = document.querySelector(".content");
const fade = document.querySelector(".screen-fade");

document.querySelectorAll("a").forEach(link => {

  link.addEventListener("click", e => {

    const href = link.getAttribute("href");

    // 無効リンク防止
    if (
      href &&
      !href.startsWith("#") &&
      !href.startsWith("http") &&
      !href.startsWith("javascript")
    ) {

      e.preventDefault();

      if (content) {
        content.classList.add("fade-out");
      }

      if (fade) {
        fade.classList.add("active");
      }

      setTimeout(() => {
        window.location.href = href;
      }, 250);

    }

  });

});

});



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

  /* ページ判定 */
  const body =
    document.body;

  let particleColor =
    "rgba(125, 211, 252, 0.8)";

  /* ページ別色 */
  if (
    body.classList.contains("rules-page")
  ) {

    particleColor =
      "rgba(255, 215, 0, 0.7)";

  }

  if (
    body.classList.contains("staff-page")
  ) {

    particleColor =
      "rgba(255,255,255,0.7)";

  }

  /* ホーム判定 */
  const isHome =
    body.classList.contains("home-page");

  /* 数 */
  const particleCount =
    isHome ? 40 : 18;

  for (let i = 0; i < particleCount; i++) {

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

    particle.style.background =
      particleColor;

    particle.style.boxShadow =
      `0 0 6px ${particleColor}`;

    particle.style.animationDuration =
      (Math.random() * 10 + 8) + "s";

    particle.style.animationDelay =
      Math.random() * 5 + "s";

    particle.style.bottom =
      "-20px";

    particles.appendChild(particle);

  }

}
/* =========================
   ⏳ ローディング
========================= */

/* ローディング */
window.addEventListener("load", () => {

  const loading =
    document.getElementById("loading");

  const particles =
    document.getElementById("particles");

  const home =
    document.querySelector(".home-inner");

  /* 粒子開始 */
  setTimeout(() => {

    if (particles) {
      particles.classList.add("show");
    }

  }, 700);

  /* ローディング終了 */
  setTimeout(() => {

    if (loading) {

      loading.classList.add("fade-out");

      /* 少し短め */
      setTimeout(() => {

        loading.remove();

        /* ホーム表示 */
        if (home) {
          home.classList.add("show");
        }

      }, 1000);

    }

  }, 1800);

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

/* =========================
   🌌 ページ遷移
========================= */

document
  .querySelectorAll("a")
  .forEach(link => {

    link.addEventListener(
      "click",
      function(e) {

        const href =
          this.getAttribute("href");

        /* 外部リンク除外 */
        if (
          href &&
          !href.startsWith("#") &&
          !href.startsWith("http")
        ) {

          e.preventDefault();

          document.body
            .classList
            .add("fade-out");

          setTimeout(() => {

            window.location.href = href;

          }, 500);

        }

      }
    );

  });

/* =========================
   🌌 ページ遷移
========================= */

const fade =
  document.querySelector(".screen-fade");

document
  .querySelectorAll("a")
  .forEach(link => {

    link.addEventListener(
      "click",
      function(e) {

        const href =
          this.getAttribute("href");

        if (
          href &&
          !href.startsWith("#") &&
          !href.startsWith("http")
        ) {

          e.preventDefault();

          if (fade) {
            fade.classList.add("active");
          }

          setTimeout(() => {

            window.location.href =
              href;

          }, 800);

        }

      }
    );

  });

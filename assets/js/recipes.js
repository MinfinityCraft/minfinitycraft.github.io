/* =========================
   📦 データ保持
========================= */
let allRecipes = [];

/* =========================
   📥 レシピ読み込み
========================= */
fetch(`assets/data/${recipeCategory}.json`)
  .then(res => {
    if (!res.ok) throw new Error("JSON読み込み失敗");
    return res.json();
  })
  .then(data => {

    allRecipes = data;

    renderRecipes(allRecipes);

  })
  .catch(err => {
    console.error(err);
  });


/* =========================
   🎨 描画関数（唯一）
========================= */
function renderRecipes(data) {

  const container = document.getElementById("recipeContainer");
  if (!container) return;

  container.innerHTML = "";

  const grouped = {};

  data.forEach(recipe => {
    if (!grouped[recipe.mine]) {
      grouped[recipe.mine] = [];
    }
    grouped[recipe.mine].push(recipe);
  });

  for (const mine in grouped) {

    const title = document.createElement("h2");
    title.className = "recipe-area-title";
    title.textContent = mine;
    container.appendChild(title);

    grouped[mine].forEach(recipe => {

      const gridHTML = (recipe.grid || []).map(item => {

        if (!item) {
          return `<div class="craft-slot"></div>`;
        }

        return `
          <div class="craft-slot">
            <img src="assets/images/items/${item}.png" alt="${item}">
          </div>
        `;

      }).join("");

      const materialsHTML = (recipe.materials || [])
        .map(m => `<div>${m}</div>`)
        .join("");

      const card = document.createElement("div");
      card.className = "recipe-card";

      card.innerHTML = `
        <h3 class="recipe-name">${recipe.name || ""}</h3>

        <div class="recipe-spec">
          ${Array.isArray(recipe.spec)
            ? recipe.spec.join("<br>")
            : recipe.spec || ""}
        </div>

        <details class="recipe-detail">
          <summary>レシピを見る</summary>

          <div class="recipe-materials">
            <div class="craft-wrapper">

              <div class="craft-grid">
                ${gridHTML}
              </div>

              <div class="craft-text">
                ${materialsHTML}
              </div>

            </div>
          </div>

        </details>
      `;

      container.appendChild(card);
    });
  }
}


/* =========================
   🔍 検索機能
========================= */
const searchBox = document.getElementById("searchBox");

if (searchBox) {

  searchBox.addEventListener("input", (e) => {

    const keyword = e.target.value.toLowerCase();

    const filtered = allRecipes.filter(r => {

      const name = (r.name || "").toLowerCase();

      const spec = Array.isArray(r.spec)
        ? r.spec.join(" ")
        : (r.spec || "");

      const materials = (r.materials || []).join(" ");

      return (
        name.includes(keyword) ||
        spec.toLowerCase().includes(keyword) ||
        materials.toLowerCase().includes(keyword)
      );
    });

    renderRecipes(filtered);
  });
}

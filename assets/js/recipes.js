/* =========================
   📦 データ保持
========================= */
let allRecipes = [];

const container = document.getElementById("recipeContainer");
const searchBox = document.getElementById("searchBox");

/* =========================
   🔍 レンダリング（完全統一）
========================= */
function renderRecipes(data) {
  if (!container) return;

  container.innerHTML = "";

  // 採掘場ごとにグループ化
  const grouped = {};

  data.forEach(recipe => {
    if (!grouped[recipe.mine]) {
      grouped[recipe.mine] = [];
    }
    grouped[recipe.mine].push(recipe);
  });

  // 描画
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
        .map(mat => `<div>${mat}</div>`)
        .join("");

      const specHTML = Array.isArray(recipe.spec)
        ? recipe.spec.join("<br>")
        : (recipe.spec || "");

      const card = document.createElement("div");
      card.className = "recipe-card";

      card.innerHTML = `
        <h3 class="recipe-name">${recipe.name}</h3>

        <div class="recipe-spec">
          ${specHTML}
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
   📥 JSON読み込み
========================= */
fetch(`assets/data/${recipeCategory}.json`)
  .then(res => res.json())
  .then(data => {

  console.log("JSON読込成功", data);

  allRecipes = data;

  renderRecipes(allRecipes);

})
  .catch(err => {
    console.error("JSON読み込み失敗:", err);
  });

/* =========================
   🔍 検索機能
========================= */
if (searchBox) {

  searchBox.addEventListener("input", (e) => {

    const keyword = e.target.value.toLowerCase();

    const filtered = allRecipes.filter(r => {

      const nameMatch =
        r.name?.toLowerCase().includes(keyword);

      const specText =
        Array.isArray(r.spec)
          ? r.spec.join(" ")
          : (r.spec || "");

      const materialText =
        (r.materials || []).join(" ");

      return (
        nameMatch ||
        specText.toLowerCase().includes(keyword) ||
        materialText.toLowerCase().includes(keyword)
      );
    });

    renderRecipes(filtered);
  });
}

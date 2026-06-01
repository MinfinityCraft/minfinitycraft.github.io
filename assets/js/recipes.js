const searchBox = document.getElementById("searchBox");
const container = document.getElementById("recipeContainer");
const infoBox = document.getElementById("searchResultInfo");

let allRecipes = [];

/* =========================
   📥 データ取得
========================= */
fetch(`assets/data/${recipeCategory}.json`)
  .then(res => res.json())
  .then(data => {
    allRecipes = data;
    renderRecipes(allRecipes);
  })
  .catch(err => {
    console.error("JSON読み込み失敗:", err);
  });

/* =========================
   🎨 ハイライト関数
========================= */
function highlight(text, keyword) {
  if (!keyword) return text;
  const reg = new RegExp(`(${keyword})`, "gi");
  return text.replace(reg, `<span style="color:#ffd700;text-shadow:0 0 8px #ffcc00;">$1</span>`);
}

/* =========================
   🧱 レンダリング
========================= */
function renderRecipes(data, keyword = "") {
  container.innerHTML = "";

  if (data.length === 0) {
    container.innerHTML = `
      <div class="no-result">
        該当するレシピが見つかりませんでした
      </div>
    `;
    infoBox.textContent = "";
    return;
  }

  infoBox.textContent = `${data.length}件見つかりました`;

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

      const gridHTML = recipe.grid.map(item => {
        if (!item) return `<div class="craft-slot"></div>`;

        return `
          <div class="craft-slot">
            <img src="assets/images/items/${item}.png" alt="${item}">
          </div>
        `;
      }).join("");

      const materialsHTML = recipe.materials
        .map(mat => `<div>${mat}</div>`)
        .join("");

      const name = highlight(recipe.name, keyword);

      const card = document.createElement("div");
      card.className = "recipe-card";

      card.innerHTML = `
        <h3 class="recipe-name">${name}</h3>

        <div class="recipe-spec">
          ${Array.isArray(recipe.spec)
            ? recipe.spec.map(s => highlight(s, keyword)).join("<br>")
            : highlight(recipe.spec || "", keyword)}
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
   🔍 検索処理（リアルタイム）
========================= */
if (searchBox) {
  searchBox.addEventListener("input", (e) => {

    const keyword = e.target.value.trim().toLowerCase();

    const filtered = allRecipes.filter(r => {

      const nameMatch = r.name?.toLowerCase().includes(keyword);

      const specText = Array.isArray(r.spec)
        ? r.spec.join(" ")
        : (r.spec || "");

      const materialText = (r.materials || []).join(" ");

      return (
        nameMatch ||
        specText.toLowerCase().includes(keyword) ||
        materialText.toLowerCase().includes(keyword)
      );
    });

    renderRecipes(filtered, keyword);
  });
}

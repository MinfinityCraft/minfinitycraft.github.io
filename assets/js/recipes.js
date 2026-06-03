/* =========================
   📦 データ保持
========================= */
let allRecipes = [];

const container =
  document.getElementById("recipeContainer");

const searchBox =
  document.getElementById("searchBox");

const resultInfo =
  document.getElementById("searchResultInfo");

const mineFilter =
  document.getElementById("mineFilter");


/* =========================
   🔍 レンダリング
========================= */
function renderRecipes(data) {

  if (!container) return;

  container.innerHTML = "";

  // 0件
  if (data.length === 0) {

    container.innerHTML = `
      <div class="recipe-card">
        <h3>該当するレシピが見つかりません</h3>
      </div>
    `;

    return;
  }

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

    const title =
      document.createElement("h2");

    title.className =
      "recipe-area-title";

    title.textContent =
      mine;

    container.appendChild(title);

    grouped[mine].forEach(recipe => {

      const gridHTML =
        (recipe.grid || [])
          .map(item => {

            if (!item) {
              return `
                <div class="craft-slot"></div>
              `;
            }

            return `
              <div class="craft-slot">
                <img
                  src="assets/images/items/${item}.png"
                  alt="${item}"
                >
              </div>
            `;

          })
          .join("");

      const materialsHTML =
        (recipe.materials || [])
          .map(mat =>
            `<div>${mat}</div>`
          )
          .join("");

      const specHTML =
        Array.isArray(recipe.spec)
          ? recipe.spec.join("<br>")
          : (recipe.spec || "");

      const card =
        document.createElement("div");

      card.className =
        "recipe-card";

      card.innerHTML = `
        <h3 class="recipe-name">
          ${recipe.name}
        </h3>

        <div class="recipe-spec">
          ${specHTML}
        </div>

        <details class="recipe-detail">

          <summary>
            レシピを見る
          </summary>

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
   📊 件数表示
========================= */
function updateResultInfo(keyword, count) {

  if (!resultInfo) return;

  if (
    keyword === "" &&
    (!mineFilter || mineFilter.value === "")
  ) {

    resultInfo.textContent =
      `全 ${allRecipes.length} 件`;

  } else {

    resultInfo.textContent =
      `${count} 件ヒット`;

  }

}


/* =========================
   🔍 検索 + フィルター
========================= */
function applyFilters() {

  const keyword =
    searchBox
      ? searchBox.value
          .toLowerCase()
          .trim()
      : "";

  const selectedMine =
    mineFilter
      ? mineFilter.value
      : "";

  const filtered =
    allRecipes.filter(r => {

      const nameText =
        r.name || "";

      const specText =
        Array.isArray(r.spec)
          ? r.spec.join(" ")
          : (r.spec || "");

      const materialText =
        (r.materials || [])
          .join(" ");

      const keywordMatch =

        nameText
          .toLowerCase()
          .includes(keyword)

        ||

        specText
          .toLowerCase()
          .includes(keyword)

        ||

        materialText
          .toLowerCase()
          .includes(keyword);

      const mineMatch =

        selectedMine === ""

        ||

        r.mine === selectedMine;

      return (
        keywordMatch &&
        mineMatch
      );

    });

  renderRecipes(filtered);

  updateResultInfo(
    keyword,
    filtered.length
  );

}


/* =========================
   📥 JSON読み込み
========================= */
fetch(`assets/data/${recipeCategory}.json`)
  .then(res => res.json())

  .then(data => {

    console.log(
      "JSON読込成功",
      data
    );

    allRecipes = data;

    // 採掘場一覧生成
    if (mineFilter) {

      const mines = [
        ...new Set(
          allRecipes.map(
            r => r.mine
          )
        )
      ];

      mines.forEach(mine => {

        const option =
          document.createElement("option");

        option.value =
          mine;

        option.textContent =
          mine;

        mineFilter.appendChild(
          option
        );

      });

    }

    renderRecipes(allRecipes);

    updateResultInfo(
      "",
      allRecipes.length
    );

  })

  .catch(err => {

    console.error(
      "JSON読み込み失敗:",
      err
    );

  });


/* =========================
   🔍 検索イベント
========================= */
if (searchBox) {

  searchBox.addEventListener(
    "input",
    applyFilters
  );

}


/* =========================
   🏷 フィルターイベント
========================= */
if (mineFilter) {

  mineFilter.addEventListener(
    "change",
    applyFilters
  );

}

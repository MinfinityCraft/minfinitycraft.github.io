fetch(`assets/data/${recipeCategory}.json`)
  .then(response => response.json())
  .then(data => {

    const container =
      document.getElementById("recipeContainer");

    // 採掘場ごとにまとめる
    const grouped = {};

    data.forEach(recipe => {

      if (!grouped[recipe.mine]) {
        grouped[recipe.mine] = [];
      }

      grouped[recipe.mine].push(recipe);

    });

    // HTML生成
    for (const mine in grouped) {

      const areaTitle = document.createElement("h2");

      areaTitle.className = "recipe-area-title";

      areaTitle.textContent = mine;

      container.appendChild(areaTitle);

      grouped[mine].forEach(recipe => {

        // グリッド生成
        const gridHTML = recipe.grid.map(item => {

          if (!item) {
            return `<div class="craft-slot"></div>`;
          }

          return `
            <div class="craft-slot">
              <img
                src="assets/images/items/${item}.png"
                alt="${item}"
              >
            </div>
          `;

        }).join("");

        // テキスト版素材
        const materialsHTML = recipe.materials
          .map(mat => `<div>${mat}</div>`)
          .join("");

        container.innerHTML += `

          <div class="recipe-card">

            <h3 class="recipe-name">
              ${recipe.name}
            </h3>

            <div class="recipe-spec">
              ${recipe.spec.join("<br>")}
            </div>

            <details class="recipe-detail">

              <summary>
                レシピを見る
              </summary>

              <div class="recipe-materials">

                <!-- 作業台 -->
                <div class="craft-wrapper">

                  <div class="craft-grid">
                    ${gridHTML}
                  </div>

                  <!-- 文字版 -->
                  <div class="craft-text">
                    ${materialsHTML}
                  </div>

                </div>

              </div>

            </details>

          </div>

        `;

      });

    }

  })

  .catch(error => {
    console.error(
      "JSON読み込み失敗:",
      error
    );
  });

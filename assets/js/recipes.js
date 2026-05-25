const fileMap = {
  pickaxe: "assets/data/pickaxe.json",
  material: "assets/data/material.json"
};

const filePath = fileMap[recipeCategory];

fetch(filePath)
  .then(response => response.json())
  .then(data => {

    const container =
      document.getElementById("recipeContainer");

    data.forEach(area => {

      // 採掘場タイトル
      const areaTitle =
        document.createElement("h2");

      areaTitle.className =
        "recipe-area-title";

      areaTitle.textContent =
        area.area;

      container.appendChild(areaTitle);

      // レシピ一覧
      area.recipes.forEach(recipe => {

        const card =
          document.createElement("div");

        card.className =
          "recipe-card";

        card.innerHTML = `
          <h3 class="recipe-name">
            ${recipe.name}
          </h3>

          <details class="recipe-detail">

            <summary>
              レシピ
            </summary>

            <div class="recipe-materials">

              ${recipe.materials.join("<br>")}

            </div>

          </details>
        `;

        container.appendChild(card);

      });

    });

  })

  .catch(error => {

    console.error(
      "JSON読み込み失敗:",
      error
    );

  });

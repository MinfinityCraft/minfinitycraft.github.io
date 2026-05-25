const container =
  document.getElementById("recipeContainer");

fetch(`assets/data/${recipeCategory}.json`)
  .then(response => response.json())

  .then(data => {

    data.forEach(recipe => {

      const card = document.createElement("div");
      card.className = "recipe-card";

      card.innerHTML = `
        <h3 class="recipe-name">
          ${recipe.name}
        </h3>

        <div class="recipe-spec">
          ${recipe.spec.join("<br>")}
        </div>

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

  })

  .catch(error => {
    console.error(
      "JSON読み込み失敗:",
      error
    );
  });

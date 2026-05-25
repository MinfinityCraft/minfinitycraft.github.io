fetch("data/recipes.json")
  .then(response => response.json())

  .then(recipes => {

    const container =
      document.getElementById("recipeContainer");

    recipes

      .filter(recipe =>
        recipe.category === recipeCategory
      )

      .forEach(recipe => {

        const card =
          document.createElement("div");

        card.className = "recipe-card";

        // 性能
        const specHTML =
          recipe.spec
            .map(spec =>
              `<li>${spec}</li>`
            )
            .join("");

        // 素材
        const materialsHTML =
          recipe.materials
            .map(material =>
              `<li>${material}</li>`
            )
            .join("");

        card.innerHTML = `
          <div class="recipe-name">
            ${recipe.name}
          </div>

          <div class="recipe-spec">

            <p>
              <strong>採掘場:</strong>
              ${recipe.mine}
            </p>

            <h3>性能</h3>

            <ul>
              ${specHTML}
            </ul>

            <h3>必要素材</h3>

            <ul>
              ${materialsHTML}
            </ul>

          </div>
        `;

        container.appendChild(card);

      });

  });

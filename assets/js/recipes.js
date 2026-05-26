const gridHTML = recipe.grid.map(item => {

  if (!item) {

    return `
      <div class="recipe-slot"></div>
    `;
  }

  return `
    <div class="recipe-slot">

      <img
        src="assets/images/items/${item}.png"
        alt="${item}"
      >

    </div>
  `;

}).join("");

const materialHTML = recipe.materials.map(material => {

  return `<div>${material}</div>`;

}).join("");

return `

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

    <div class="recipe-craft-area">

      <div class="recipe-grid">

        ${gridHTML}

      </div>

      <div class="recipe-text">

        ${materialHTML}

      </div>

    </div>

  </details>

</div>
`;

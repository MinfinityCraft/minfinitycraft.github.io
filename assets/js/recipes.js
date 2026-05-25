const recipeMap = {
  pickaxe: "pickaxe.json",
  material: "material.json"
};

const container = document.getElementById("recipeContainer");

fetch(recipeMap[recipeCategory])
  .then(res => res.json())
  .then(data => {
    const list = data[recipeCategory];

    list.forEach(item => {
      const card = document.createElement("div");
      card.className = "recipe-card";

      card.innerHTML = `
        <h3 class="recipe-name">${item.name}</h3>

        <details class="recipe-detail">
          <summary>レシピ</summary>
          <div class="recipe-materials">
            ${item.materials.map(m => `<div>${m}</div>`).join("")}
          </div>
        </details>
      `;

      container.appendChild(card);
    });
  })
  .catch(err => {
    console.error("JSON読み込み失敗:", err);
  });

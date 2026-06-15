async function loadRules() {

try {


const response = await fetch(
  "assets/data/rules.json"
);

if (!response.ok) {
  throw new Error(
    `JSONの読み込みに失敗しました (${response.status})`
  );
}

const data = await response.json();

const container =
  document.getElementById("rulesContainer");

container.innerHTML = "";

for (const [ruleName, ruleData] of Object.entries(data)) {

  const card =
    document.createElement("section");

  card.className = "card";

  const details =
    document.createElement("details");

  let levelsHtml = "";

  ruleData.levels.forEach(level => {

    levelsHtml += `
      <h3>${level.title}</h3>

      <ul>
        ${level.rules
          .map(rule => `<li>${rule}</li>`)
          .join("")}
      </ul>
    `;
  });

  details.innerHTML = `
    <summary>${ruleName}</summary>

    <div class="drop-data">

      ${ruleData.description
        .map(text => `<p>${text}</p>`)
        .join("")}

      ${levelsHtml}

    </div>
  `;

  card.appendChild(details);

  container.appendChild(card);
}


} catch (error) {


console.error(error);

const container =
  document.getElementById("rulesContainer");

container.innerHTML = `
  <section class="card">
    <h2>エラー</h2>
    <p>
      ルールデータの読み込みに失敗しました。
    </p>
  </section>
`;


}
}

loadRules();

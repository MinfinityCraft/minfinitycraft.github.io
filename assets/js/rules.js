async function loadRules() {

  const res = await fetch("assets/data/rules.json");
  const data = await res.json();

  const container = document.getElementById("rulesContainer");
  container.innerHTML = "";

  for (const [title, ruleData] of Object.entries(data)) {

    const details = document.createElement("details");

    let levelsHTML = "";

    ruleData.levels.forEach(level => {

      levelsHTML += `
        <h3>${level.title}</h3>
        <ul>
          ${level.rules.map(r => `<li>${r}</li>`).join("")}
        </ul>
      `;
    });

    details.innerHTML = `
      <summary>${title}</summary>

      <div class="drop-data">

        ${ruleData.description.map(d => `<p>${d}</p>`).join("")}

        ${levelsHTML}

      </div>
    `;

    container.appendChild(details);
  }
}

loadRules();

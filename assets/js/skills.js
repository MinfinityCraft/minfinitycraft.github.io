async function loadSkills() {

  try {

    const response = await fetch(
      "assets/data/skills.json"
    );

    if (!response.ok) {
      throw new Error(
        `JSONの読み込みに失敗しました (${response.status})`
      );
    }

    const skills =
      await response.json();

    const container =
      document.getElementById("skillsContainer");

    container.innerHTML = "";

    skills.forEach(skill => {

      const details =
        document.createElement("details");

      details.className =
        "skill-card";

      details.innerHTML = `
        <summary>${skill.name}</summary>

        <div class="drop-data">

          <strong>効果</strong>

          <ul>
            ${(skill.effects || [])
              .map(effect =>
                `<li>${effect}</li>`
              )
              .join("")}
          </ul>

          <strong>入手方法</strong>

          <ul>
            ${(skill.obtain || [])
              .map(method =>
                `<li>${method}</li>`
              )
              .join("")}
          </ul>

          <strong>説明</strong>

          <ul>
            ${(skill.description || [])
              .map(text =>
                `<li>${text}</li>`
              )
              .join("")}
          </ul>

        </div>
      `;

      container.appendChild(details);

    });

  } catch (error) {

    console.error(error);

    const container =
      document.getElementById("skillsContainer");

    container.innerHTML = `
      <section class="card">
        <h2>エラー</h2>
        <p>
          スキルデータの読み込みに失敗しました。
        </p>
      </section>
    `;
  }
}

loadSkills();

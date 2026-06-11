async function loadStaff() {

try {


const response = await fetch(
  "assets/data/staff.json"
);

if (!response.ok) {
  throw new Error(
    `JSONの読み込みに失敗しました (${response.status})`
  );
}

const data = await response.json();

const container =
  document.getElementById("staffContainer");

container.innerHTML = "";

for (const [groupName, members] of Object.entries(data)) {

  const section =
    document.createElement("section");

  section.className = "card";

  section.innerHTML = `
    <h2>${groupName}</h2>
    <div class="staff-grid"></div>
  `;

  const grid =
    section.querySelector(".staff-grid");

  members.forEach(member => {

    const details =
      document.createElement("details");

    details.innerHTML = `
      <summary>${member.name}</summary>

      <div class="drop-data">

      <div class="profile-row">
  <span class="profile-label">ゲームタグ</span>
  <span class="profile-value">${member.gameTag}</span>
</div>

<div class="profile-row">
  <span class="profile-label">Discord</span>
  <span class="profile-value">${member.discord}</span>
</div>

<div class="profile-row">
  <span class="profile-label">仕事内容</span>
  <span class="profile-value">${member.job}</span>
</div>

<div class="profile-row">
  <span class="profile-label">就任</span>
  <span class="profile-value">${member.joined}</span>
</div>

<br>
        <strong>好きな○○</strong>
        <ul>
          ${(member.favorites || [])
            .map(item => `<li>${item}</li>`)
            .join("")}
        </ul>

        <strong>趣味</strong>
        <ul>
          ${(member.hobbies || [])
            .map(item => `<li>${item}</li>`)
            .join("")}
        </ul>

        <strong>ひとこと</strong>
        <ul>
          <li>${member.message || ""}</li>
        </ul>

      </div>
    `;

    grid.appendChild(details);

  });

  container.appendChild(section);

}


} catch (error) {


console.error(error);

const container =
  document.getElementById("staffContainer");

if (container) {

  container.innerHTML = `
    <section class="card">
      <h2>エラー</h2>
      <p>
        スタッフデータの読み込みに失敗しました。
      </p>
    </section>
  `;

}


}

}

loadStaff();

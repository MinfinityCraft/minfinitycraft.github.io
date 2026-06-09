async function loadStaff() {

  const response = await fetch(
    "assets/data/staff.json"
  );

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
          ${member.description}
        </div>
      `;

      grid.appendChild(details);
    });

    container.appendChild(section);
  }
}

loadStaff();

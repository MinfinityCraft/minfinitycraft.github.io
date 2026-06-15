alert("rules.js あいあいあ");
console.log("START");

async function loadRules() {
  const res = await fetch("assets/data/rules.json");
  const data = await res.json();

  const container = document.getElementById("rulesContainer");

  container.innerHTML = "<pre>" + JSON.stringify(data, null, 2) + "</pre>";

  console.log("END");
}

loadRules();

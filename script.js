// 折りたたみアコーディオン
var acc = document.getElementsByClassName("accordion");
for (var i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var panel = this.nextElementSibling;
    if (panel.style.display === "block") {
      panel.style.display = "none";
    } else {
      panel.style.display = "block";
    }
  });
}

// ハンバーガーメニューの動作（既存コードと同じ）
function toggleMenu() {
  document.querySelector(".side-header").classList.toggle("active");
}

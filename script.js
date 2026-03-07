function toggleMenu(){
document.querySelector(".side-header").classList.toggle("active");
}

fetch("header.html")
.then(response => response.text())
.then(data => {
document.getElementById("header").innerHTML = data;
});

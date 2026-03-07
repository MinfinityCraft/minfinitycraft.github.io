function toggleMenu(){
document.querySelector(".side-header").classList.toggle("active");
}

fetch("header.html")
.then(response => response.text())
.then(data => {
document.getElementById("header").innerHTML = data;
});

function searchRecipe(){

let input = document.getElementById("recipeSearch").value.toLowerCase();

let recipes = document.querySelectorAll(".recipe-item");

recipes.forEach(function(recipe){

let keywords = recipe.dataset.keywords.toLowerCase();

if(keywords.includes(input)){
recipe.style.display="block";
}else{
recipe.style.display="none";
}

});

}

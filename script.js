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



  


function createRecipeHTML(data,className){

let html="";

data.forEach(function(r){

html+=`

<details class="${className}"
data-mine="${r.mine}"
data-keywords="${r.keywords}">

<summary>${r.name}</summary>

<ol>
<li>① ${r.items[0]}</li>
<li>② ${r.items[1]}</li>
<li>③ ${r.items[2]}</li>
</ol>

</details>

`;

});

return html;

}


/* 検索 */

function searchRecipe(inputId,className){

let input=document
.getElementById(inputId)
.value
.toLowerCase();

let recipes=document
.querySelectorAll("."+className);

recipes.forEach(function(recipe){

let keywords=
recipe.dataset.keywords.toLowerCase();

if(keywords.includes(input)){
recipe.style.display="block";
}else{
recipe.style.display="none";
}

});

}


/* 採掘場フィルター */

function filterMine(className,mine){

let recipes=
document.querySelectorAll("."+className);

recipes.forEach(function(recipe){

let recipeMine=recipe.dataset.mine;

if(mine==="all"||recipeMine===mine){
recipe.style.display="block";
}else{
recipe.style.display="none";
}

});

}


/* ハンバーガー */

function toggleMenu(){

let menu=document.querySelector(".side-header");

if(menu){
menu.classList.toggle("active");
}

}

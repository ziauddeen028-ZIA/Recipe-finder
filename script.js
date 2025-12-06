let button = document.getElementById("search-btn");
let searchInput = document.getElementById("search-input");
let resultdiv = document.getElementById("result");


button.addEventListener("click", () => {
    let recipeName = searchInput.value.trim();
    console.log(recipeName);

    if (searchInput.value == "") {
        alert("Please Enter ingredient!");
        return;
    }

    resultdiv.innerHTML = "<p>Searching for recipes....</p>";

    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${recipeName}`)
        .then(response => response.json())
        .then(data => {
            resultdiv.innerHTML = "";
            if (!data.meals) {
                resultdiv.innerHTML = "<p>No recipes found.Try another ingerdient.</p>"
                return;

            }

            data.meals.forEach(meal => {
                let recipeDiv = document.createElement("div");
                recipeDiv.classList.add('recipe');
                recipeDiv.innerHTML = `
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
            <h3>${meal.strMeal}</h3>
           <button> <a href="https://www.themealdb.com/meal/${meal.idMeal}" target="_blank">View recipe</a></button>
            `
                resultdiv.appendChild(recipeDiv);

            })

        })
        .catch(error => {
            console.error("Error fetching recipes", error),
                resultdiv.innerHTML = "<p>Error fetching data. Try Again later</p>"

        })



})
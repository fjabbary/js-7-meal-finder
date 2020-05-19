const form = document.getElementById('form'),
    searchBtn = document.getElementById('search'),
    randomBtn = document.getElementById('random'),
    heading = document.getElementById('results-heading'),
    mealsResult = document.getElementById('meals'),
    singleMeal = document.getElementById('single-meal'),
    searchInput = document.getElementById('searchInp');

function findMeal(e) {
    e.preventDefault();

    const term = searchInput.value;
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
        .then(res => res.json())
        .then(data => {

            if (data.meals === null) {
                heading.innerText = `No result found for '${term}'`
            } else {
                // mealsResult.innerHTML = '';
                console.log(data.meals)
                heading.innerText = `Search results for ${term}`;
                mealsResult.innerHTML = data.meals.map(item => `
                    <div id=${item.idMeal} class="meal">
                        <img src="${item.strMealThumb}">
                        <h3>${item.strMeal}</h3>
                    </div>
                `).join('')
            }

        })
}

form.addEventListener('submit', findMeal)

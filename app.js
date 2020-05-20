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
                mealsResult.innerHTML = '';
                console.log(data.meals)
                heading.innerText = `Search results for ${term}`;
                mealsResult.innerHTML = data.meals.map(item => `
                    <div id=${item.idMeal} class="meal">
                        <img src="${item.strMealThumb}" class="img">
                        <h3>${item.strMeal}</h3>
                    </div>
                `).join('')
            }

        })
}

form.addEventListener('submit', findMeal);

mealsResult.addEventListener('click', (e) => {
    if (e.target.className === 'img') {
        const id = e.target.parentElement.id;

        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
            .then(res => res.json())
            .then(data => {
                const meal = data.meals[0];
                console.log(meal)


                const ingredients = []
                for (let i = 1; i <= 20; i++) {
                    if (meal['strIngredient' + String(i)] !== "" && meal['strIngredient' + String(i)] !== null) {
                        ingredients.push({ ing: meal['strIngredient' + String(i)], measures: meal["strMeasure" + String(i)] })
                    } else {
                        break;
                    }
                }

                console.log(ingredients)

                singleMeal.innerHTML = `
                <div>
                    <h1>${meal.strMeal}</h1>
                    <img src="${meal.strMealThumb}" width="500">
                    <p>${meal.strInstructions}</p>
                    <ol>
                        ${ingredients.map(el => `<div> <li>${el.ing} - ${el.measures}</li></div>`).join('')}
                    </ol>
                </div>
                `
            })



    }
})

let content = document.getElementById("content");
let searchBox = document.getElementById("searchBox");
let submitBtn;
let nameInput = false;
let emailInput = false;
let phoneInput = false;
let ageInput = false;
let passwordInput = false;
let repasswordInput = false;



function toggleSideBar() {
    const sidebar = $(".sidebar");
    const isOpen = sidebar.css("left") === "0px";
    const boxWidth = $(".sidebar .sidebar-inner").outerWidth();
    
    sidebar.animate({
        left: isOpen ? -boxWidth : 0
    }, 500);
    
    $(".open-close-icon").toggleClass("fa-align-justify fa-x");
    
    $(".links li").animate({
        top: isOpen ? 300 : 0
    }, 500);
}

$(".sidebar").css("left", -$(".sidebar .sidebar-inner").outerWidth());
$(".links li").css("top", 300);
$(".sidebar i.open-close-icon").click(toggleSideBar);

$(document).ready(() => {
    searchByName("").then(() => {
    })
})




function displaySearch() {
    toggleSideBar();
    searchBox.innerHTML = `
    <div class=" py-4 ">
        <div class=" py-3 ">
            <input onkeydown="searchByName(this.value)" class="form-control bg-transparent text-white" type="text" placeholder="Search By Name">
        </div>
        <div class=" py-3">
            <input onkeydown="searchByFLetter(this.value)" maxlength="1" class="form-control bg-transparent text-white" type="text" placeholder="Search By First Letter">
        </div>
    </div>`
    content.innerHTML = "";
}

async function searchByName(term) {
    content.innerHTML = ""
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
    response = await response.json()
    response.meals ? displayMeals(response.meals) : displayMeals([])
}

async function searchByFLetter(term) {
    content.innerHTML = ""
    term == "" ? term = "a" : "";
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${term}`)
    response = await response.json()
    response.meals ? displayMeals(response.meals) : displayMeals([])
}



function displayMeals(arr) {
    let MealBox = "";
    for (let i = 0; i < arr.length; i++) {
        MealBox += `
        <div class="col-md-3">
                <div onclick="getMealDetails('${arr[i].idMeal}')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                    <img class="w-100" src="${arr[i].strMealThumb}" alt="">
                    <div class="box-layer position-absolute d-flex align-items-center text-black p-2">
                        <h3>${arr[i].strMeal}</h3>
                    </div>
                </div>
        </div>
        `
    }
    content.innerHTML = MealBox;
}


async function getCategories() {
    toggleSideBar();
    content.innerHTML = ""
    searchBox.innerHTML = "";
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
    response = await response.json()
    displayCategories(response.categories)

}
async function getAreas() {
    toggleSideBar();
    content.innerHTML = ""
    searchBox.innerHTML = "";
    let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
    respone = await respone.json()
    displayArea(respone.meals)
}
async function getIngredients() {
    toggleSideBar();
    content.innerHTML = ""
    searchBox.innerHTML = "";
    let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
    respone = await respone.json()
    displayIngredients(respone.meals.slice(0, 20))
}
async function getCategoryMeals(category) {
    content.innerHTML = ""
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
    response = await response.json()
    displayMeals(response.meals.slice(0, 20))
}
async function getAreaMeals(area) {
    content.innerHTML = ""
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)
    response = await response.json()
    displayMeals(response.meals.slice(0, 20))
}
async function getIngredientsMeals(ingredients) {
    content.innerHTML = ""
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredients}`)
    response = await response.json()
    displayMeals(response.meals.slice(0, 20))
}
async function getMealDetails(mealID) {
    content.innerHTML = ""
    searchBox.innerHTML = "";
    let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`);
    respone = await respone.json();
    displayMealDetails(respone.meals[0])
}



function displayCategories(arr) {
    let MealBox = "";
    for (let i = 0; i < arr.length; i++) {
        MealBox += `
        <div class="col-md-3">
                <div onclick="getCategoryMeals('${arr[i].strCategory}')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                    <img class="w-100" src="${arr[i].strCategoryThumb}" alt="" srcset="">
                    <div class="box-layer position-absolute text-center text-black p-2">
                        <h3>${arr[i].strCategory}</h3>
                        <p>${arr[i].strCategoryDescription.split(" ").slice(0,20).join(" ")}</p>
                    </div>
                </div>
        </div>
        `
    }
    content.innerHTML = MealBox;
}

function displayArea(arr) {
    let MealBox = "";
    for (let i = 0; i < arr.length; i++) {
        MealBox += `
        <div class="col-md-3">
                <div onclick="getAreaMeals('${arr[i].strArea}')" class="rounded-2 text-center cursor-pointer">
                        <i class="fa-solid fa-house-laptop fa-4x"></i>
                        <h3>${arr[i].strArea}</h3>
                </div>
        </div> `
    }
    content.innerHTML = MealBox;
}

function displayIngredients(arr) {
    let MealBox = "";
    for (let i = 0; i < arr.length; i++) {
        MealBox += `
        <div class="col-md-3">
                <div onclick="getIngredientsMeals('${arr[i].strIngredient}')" class="rounded-2 text-center cursor-pointer">
                        <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                        <h3>${arr[i].strIngredient}</h3>
                        <p>${arr[i].strDescription.split(" ").slice(0,20).join(" ")}</p>
                </div>
        </div>    `
    }
    content.innerHTML = MealBox;
}


function displayMealDetails(meal) {
    searchBox.innerHTML = "";
    let ingredients = "";
    for (let i = 1; i <= 20; i++) {
        const ingredient = meal[`strIngredient${i}`];
        const measure = meal[`strMeasure${i}`];
        if (ingredient) {
            ingredients += `<li class="alert alert-info m-2 p-1">${measure} ${ingredient}</li>`;
        }
    }
    const tags = meal.strTags ? meal.strTags.split(",") : [];
    const tagsStr = tags.map(tag => `<li class="alert alert-danger m-2 p-1">${tag}</li>`).join("");

    const MealBox = `
        <div class="col-md-4">
            <img class="w-100 rounded-3" src="${meal.strMealThumb}" alt="">
            <h2>${meal.strMeal}</h2>
        </div>
        <div class="col-md-8 text-white">
            <h2>Instructions</h2>
            <p>${meal.strInstructions}</p>
            <h3><span class="fw-bolder">Area :</span> ${meal.strArea}</h3>
            <h3><span class="fw-bolder">Category :</span> ${meal.strCategory}</h3>
            <h3>Recipes :</h3>
            <ul class="list-unstyled d-flex g-3 flex-wrap">${ingredients}</ul>
            <h3>Tags :</h3>
            <ul class="list-unstyled d-flex g-3 flex-wrap">${tagsStr}</ul>
            <a target="_blank" href="${meal.strSource}" class="btn btn-success">Source</a>
            <a target="_blank" href="${meal.strYoutube}" class="btn btn-danger">Youtube</a>
        </div>`;

    content.innerHTML = MealBox;
}

function displayContacts() {
    toggleSideBar();
    content.innerHTML = `<div class="contact min-vh-100 d-flex justify-content-center align-items-center">
    <div class="container w-75 text-center">
        <div class="">
            <div class="p-2">
                <input id="nameInput" onkeydown="inputsValidation()" type="text" class="form-control" placeholder="Enter Your Name">
                <div id="nameAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Special characters and numbers not allowed
                </div>
            </div>
            <div class="p-2">
                <input id="emailInput" onkeydown="inputsValidation()" type="email" class="form-control " placeholder="Enter Your Email">
                <div id="emailAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Email not valid *example@yyy.com
                </div>
            </div>
            <div class="p-2">
                <input id="phoneInput" onkeydown="inputsValidation()" type="text" class="form-control " placeholder="Enter Your Phone">
                <div id="phoneAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid Phone Number
                </div>
            </div>
            <div class="p-2">
                <input id="ageInput" onkeydown="inputsValidation()" type="number" class="form-control " placeholder="Enter Your Age">
                <div id="ageAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid age
                </div>
            </div>
            <div class="p-2">
                <input  id="passwordInput" onkeydown="inputsValidation()" type="password" class="form-control " placeholder="Enter Your Password">
                <div id="passwordAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid password *Minimum eight characters, at least one letter and one number:*
                </div>
            </div>
            <div class="p-2">
                <input  id="repasswordInput" onkeydown="inputsValidation()" type="password" class="form-control " placeholder="Repassword">
                <div id="repasswordAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid repassword 
                </div>
            </div>
        </div>
        <button id="submitBtn" disabled class="btn btn-outline-danger px-2 mt-3">Submit</button>
    </div>
</div> `
    submitBtn = document.getElementById("submitBtn")
    document.getElementById("nameInput").addEventListener("focus", () => {
        nameInput = true
    })
    document.getElementById("emailInput").addEventListener("focus", () => {
        emailInput = true
    })
    document.getElementById("phoneInput").addEventListener("focus", () => {
        phoneInput = true
    })
    document.getElementById("ageInput").addEventListener("focus", () => {
        ageInput = true
    })
    document.getElementById("passwordInput").addEventListener("focus", () => {
        passwordInput = true
    })
    document.getElementById("repasswordInput").addEventListener("focus", () => {
        repasswordInput = true
    })
}


function inputsValidation() {
    let isValid = true;
    if (nameInput) {
        if (/^[a-zA-Z ]+$/.test(document.getElementById("nameInput").value)) {
            document.getElementById("nameAlert").classList.replace("d-block", "d-none");
        } else {
            document.getElementById("nameAlert").classList.replace("d-none", "d-block");
            isValid = false;
        }
    }
    if (emailInput) {
        if (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(document.getElementById("emailInput").value)) {
            document.getElementById("emailAlert").classList.replace("d-block", "d-none");
        } else {
            document.getElementById("emailAlert").classList.replace("d-none", "d-block");
            isValid = false;
        }
    }
    if (phoneInput) {
        if (/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(document.getElementById("phoneInput").value)) {
            document.getElementById("phoneAlert").classList.replace("d-block", "d-none");
        } else {
            document.getElementById("phoneAlert").classList.replace("d-none", "d-block");
            isValid = false;
        }
    }
    if (ageInput) {
        if (/^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/.test(document.getElementById("ageInput").value)) {
            document.getElementById("ageAlert").classList.replace("d-block", "d-none");
        } else {
            document.getElementById("ageAlert").classList.replace("d-none", "d-block");
            isValid = false;
        }
    }
    if (passwordInput) {
        if (/^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/.test(document.getElementById("passwordInput").value)) {
            document.getElementById("passwordAlert").classList.replace("d-block", "d-none");
        } else {
            document.getElementById("passwordAlert").classList.replace("d-none", "d-block");
            isValid = false;
        }
    }
    if (repasswordInput) {
        if (document.getElementById("repasswordInput").value === document.getElementById("passwordInput").value) {
            document.getElementById("repasswordAlert").classList.replace("d-block", "d-none");
        } else {
            document.getElementById("repasswordAlert").classList.replace("d-none", "d-block");
            isValid = false;
        }
    }
    if (isValid) {
        submitBtn.removeAttribute("disabled");
    } else {
        submitBtn.setAttribute("disabled", true);
    }
}

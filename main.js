const createNewExpense = document.getElementById("create-new-expense");
const formNewExpense = document.getElementById("form-new-expense");

const expensesPage = document.getElementById("expenses-page");
const dashboardPage = document.getElementById("dashboard-page")

const nav = document.getElementById("nav");
const closeNewExpenseForm = document.getElementById("close-new-expense-form");

const showNewExpenseForm = () => {
    formNewExpense.classList.remove("hidden");
    expensesPage.style.opacity = "0.2";
    nav.style.opacity = "0.2";
    // formNewExpense.style.opacity = "1";
}

const hideNewExpenseForm = () => {
    formNewExpense.classList.add("hidden");
    expensesPage.style.opacity = "1";
    nav.style.opacity = "1";
    expenseName.value = "";
    expensePrice.value = "";
    expenseCategory.value = "Category"
}

createNewExpense.addEventListener("click", () => {
    showNewExpenseForm()
})

closeNewExpenseForm.addEventListener("click", () => {
    hideNewExpenseForm()
})

document.addEventListener("click", (event) => {
    if (event.target.closest("#create-new-expense")) {
        showNewExpenseForm()
    }
})

const expenseName = document.getElementById("expense-name");
const expensePrice = document.getElementById("expense-price");
const expenseCategory = document.getElementById("expense-category");
const expenseContainer = document.getElementById("expense-container");

const expense = document.getElementById("expense")

const totalExpenses = document.getElementById("total-expenses");


let newExpenseValues = {

}

let total = 0;


let categories = {
    "Bills": 0,
    "Entertainment": 0,
    "Food": 0,
    "Rent": 0,
    "Debt": 0,
    "Charity": 0,
    "Education": 0,
}

const getNumberOfExpenses = (obj) => {
    return Object.values(obj).reduce((sum, value) => sum + value, 0)
}
const noOfExpenses = document.getElementById("no-of-expenses");

const getHighestCategory = (obj) => {
    return Object.keys(obj).reduce((a, b) => obj[a] > obj[b] ? a : b);
}  
const dashHighCategory = document.getElementById("dash-high-category");


const newExpense = () => {
    if (expenseName.value && expensePrice.value && expenseCategory.value) {
        newExpenseValues.name = expenseName.value;
        newExpenseValues.price = Number(expensePrice.value);
        total += newExpenseValues.price;
        console.log(total)
        newExpenseValues.category = expenseCategory.value;
        // console.log(newExpenseValues)

        let bgColor = ""

        switch (expenseCategory.value) {
            case "Bills":
                bgColor = "bg-red-300";
                categories.Bills += 1;
                break;
            case "Entertainment":
                bgColor = "bg-yellow-300";
                categories.Entertainment += 1;
                break;
            case "Food":
                bgColor = "bg-purple-300";
                categories.Food += 1;
                break;
            case "Rent":
                bgColor = "bg-teal-200";
                categories.Rent += 1;
                break;
            case "Debt":
                bgColor = "bg-orange-300";
                categories.Debt += 1;
                break;
            case "Charity":
                bgColor = "bg-green-300";
                categories.Charity += 1;
                break;
            case "Education":
                bgColor = "bg-pink-300";
                categories.Education += 1;
                break;
        }

        expenseContainer.innerHTML += `<div class="sm:w-60 w-40 bg-white border border-gray-200 rounded-xl p-2 flex flex-col expense">
                <div class="flex justify-between">
                   <div>
                        <h3>${newExpenseValues.name}</h3>
                        <p class="${bgColor} p-0.5 rounded-md text-xs text-center inline min-w-4S category">${newExpenseValues.category}</p>
                    </div>
                    <div>
                        <svg class="w-6 h-6 text-gray-800 dark:text-white hover:cursor-pointer delete-button" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="black" viewBox="0 0 24 24">
  <path fill-rule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm7.707-3.707a1 1 0 0 0-1.414 1.414L10.586 12l-2.293 2.293a1 1 0 1 0 1.414 1.414L12 13.414l2.293 2.293a1 1 0 0 0 1.414-1.414L13.414 12l2.293-2.293a1 1 0 0 0-1.414-1.414L12 10.586 9.707 8.293Z" clip-rule="evenodd"/>
</svg>
</svg>

                    </div> 
                </div>
                <div class="mt-5">
                    <p class="text-gray-700 text-center text-4xl sm:text-6xl price">£${newExpenseValues.price.toFixed(2)}</p>
                </div>   
            </div>`;
        hideNewExpenseForm(),
        saveExpenses();
        console.log(categories)
        totalExpenses.innerText = `£ ${total.toFixed(2)}`;
        console.log("Highest Category: " + getHighestCategory(categories))
        dashHighCategory.innerText = getHighestCategory(categories)
        console.log("Total Number Of Expenses: " + getNumberOfExpenses(categories))
        noOfExpenses.innerText = getNumberOfExpenses(categories)
    }


}

const deleteExpense = document.getElementById("delete-expense")
const deleteButton = document.getElementById("delete-button")
const cancelButton = document.getElementById("cancel-button")

document.addEventListener("click", (e) => {
    if (e.target.classList.contains("delete-button")) {
        deleteExpense.classList.remove("hidden");
        expensesPage.style.opacity = "0.3";
        nav.style.opacity = "0.3";
        

        deleteButton.onclick = () => {
            
            expensesPage.style.opacity = "1";
            nav.style.opacity = "1";

            const expenseElement = e.target.closest(".expense");
            const priceElement = expenseElement.querySelector(".price");
            const price = parseFloat(priceElement.innerText.replace("£", "").trim());
            const categoryElement = expenseElement.querySelector(".category");
            const category = categoryElement.textContent;

            if (categories[category] !== 0) {
                categories[category] -= 1;
                console.log(categories)
            }

            console.log("Highest Category: " + getHighestCategory(categories))
            dashHighCategory.innerText = getHighestCategory(categories)
            console.log("Total Number Of Expenses: " + getNumberOfExpenses(categories))
            noOfExpenses.innerText = getNumberOfExpenses(categories)

        

            total -= price;

            totalExpenses.innerText = `£ ${total.toFixed(2)}`

            expenseElement.remove()
            saveExpenses()

            deleteExpense.classList.add("hidden")

            if (!expenseContainer.querySelector(".expense")) {
                total = 0
                totalExpenses.innerText = `£ ${total.toFixed(2)}`
                saveExpenses()
            }

        
        }

        cancelButton.addEventListener("click", () => {
            expensesPage.style.opacity = "1";
            nav.style.opacity = "1";
            deleteExpense.classList.add("hidden");
            
        })
        

        
    }
})

const saveExpenses = () => {
    localStorage.setItem("expenses", expenseContainer.innerHTML);
    localStorage.setItem("total", total);
    localStorage.setItem("categories", JSON.stringify(categories));
}

const loadExpenses = () => {

    if (localStorage.getItem("expenses")) {
        expenseContainer.innerHTML = localStorage.getItem("expenses")
    } else {
        expenseContainer.innerHTML = `<div class="sm:w-60 w-40 sm:h-40 h-30 bg-white border-2 border-dashed border-gray-200 rounded-xl p-2 flex flex-col justify-center items-center cursor-pointer hover:bg-gray-100" id="create-new-expense">
                <p class="font-bold text-5xl">+</p>
                <p class="text-center">Create New Expense</p>
            </div>`;
    }

    if (localStorage.getItem("total")) {
        total = parseFloat(localStorage.getItem("total"));
        totalExpenses.innerText = `£ ${total.toFixed(2)}`
    } else {
        totalExpenses.innerText = '£00.00'
    }

    if (localStorage.getItem("categories")) {
        categories = JSON.parse(localStorage.getItem("categories"));
    } else {
        categories = {
            "Bills": 0,
            "Entertainment": 0,
            "Food": 0,
            "Rent": 0,
            "Debt": 0,
            "Charity": 0,
            "Education": 0,
        };
    }
}

loadExpenses()

const expBurger = document.getElementById("exp-burger");

const ExpHideNav = () => {
    nav.classList.add("hidden");
    expensesPage.classList.remove("opacity-30");
}
const ExpShowNav = () => {
    nav.classList.remove("hidden");
    expensesPage.classList.add("opacity-30");
}

expensesPage.addEventListener("click", (e) => {
    if (!e.target.closest(".small-nav")) {
      ExpHideNav()  
    }
    
})

expBurger.addEventListener("click", () => {
    ExpShowNav()
})

const dashBurger = document.getElementById("dash-burger");

const DashHideNav = () => {
    nav.classList.add("hidden");
    dashboardPage.classList.remove("opacity-30");
    expensesPage.classList.remove("opacity-30");
}
const DashShowNav = () => {
    nav.classList.remove("hidden");
    dashboardPage.classList.add("opacity-30");
    expensesPage.classList.add("opacity-30");
}

dashboardPage.addEventListener("click", (e) => {
    if (!e.target.closest(".small-nav")) {
      DashHideNav()  
    }
    
})

dashBurger.addEventListener("click", () => {
    DashShowNav()
})

const dashBoardButton = document.getElementById("dashboard-button");
const expensesButton = document.getElementById("expenses-button");

dashBoardButton.addEventListener("click", () => {
    expensesPage.classList.add("hidden");
    dashboardPage.classList.remove("hidden");
})

expensesButton.addEventListener("click", () => {
    expensesPage.classList.remove("hidden");
    dashboardPage.classList.add("hidden");
})


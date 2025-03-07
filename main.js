const createNewExpense = document.getElementById("create-new-expense");
const formNewExpense = document.getElementById("form-new-expense");
const main = document.getElementById("main");
const nav = document.getElementById("nav");
const closeNewExpenseForm = document.getElementById("close-new-expense-form");

const showNewExpenseForm = () => {
    formNewExpense.classList.remove("hidden");
    main.style.opacity = "0.2";
    nav.style.opacity = "0.2";
    // formNewExpense.style.opacity = "1";
}

const hideNewExpenseForm = () => {
    formNewExpense.classList.add("hidden");
    main.style.opacity = "1";
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

const totalExpenses = document.getElementById("total-expenses");


const expense = document.getElementById("expense")

let newExpenseValues = {

}

let total = 0;

const newExpense = () => {
    if (expenseName.value && expensePrice.value && expenseCategory.value) {
        newExpenseValues.name = expenseName.value;
        newExpenseValues.price = Number(expensePrice.value);
        total += newExpenseValues.price;
        console.log(total)
        newExpenseValues.category = expenseCategory.value;
        console.log(newExpenseValues)

        let bgColor = ""

        switch (expenseCategory.value) {
            case "Bills":
                bgColor = "bg-red-300"
                break;
            case "Entertainment":
                bgColor = "bg-yellow-300"
                break;
            case "Food":
                bgColor = "bg-purple-300"
                break;
            case "Rent":
                bgColor = "bg-brown-300"
                break;
            case "Debt":
                bgColor = "bg-orange-300"
                break;
            case "Charity":
                bgColor = "bg-green-300"
                break;
            case "Education":
                bgColor = "bg-pink-300"
                break;
        }

        expenseContainer.innerHTML += `<div class="sm:w-60 w-40 bg-white border border-gray-200 rounded-xl p-2 flex flex-col expense">
                <div class="flex justify-between">
                   <div>
                        <h3>${newExpenseValues.name}</h3>
                        <p class="${bgColor} p-0.5 rounded-md text-xs text-center inline min-w-4S">${newExpenseValues.category}</p>
                    </div>
                    <div>
                        <ion-icon class="justify-end cursor-pointer delete-button" name="close-circle"></ion-icon> 
                    </div> 
                </div>
                <div class="mt-5">
                    <p class="text-gray-700 text-center text-4xl sm:text-6xl price">£${newExpenseValues.price.toFixed(2)}</p>
                </div>   
            </div>`;
        hideNewExpenseForm(),
        saveExpenses();
        totalExpenses.innerText = `£ ${total.toFixed(2)}`;
    }
}

const deleteExpense = document.getElementById("delete-expense")
const deleteButton = document.getElementById("delete-button")
const cancelButton = document.getElementById("cancel-button")

document.addEventListener("click", (e) => {
    if (e.target.classList.contains("delete-button")) {
        deleteExpense.classList.remove("hidden");
        main.style.opacity = "0.3";
        nav.style.opacity = "0.3";
        

        deleteButton.addEventListener("click", () => {
            main.style.opacity = "1";
            nav.style.opacity = "1";

            const expenseElement = e.target.closest(".expense");
            const priceElement = expenseElement.querySelector(".price");
            const price = parseFloat(priceElement.innerText.replace("£", ""));

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
        })

        cancelButton.addEventListener("click", () => {
            main.style.opacity = "1";
            nav.style.opacity = "1";
            deleteExpense.classList.add("hidden");
            
        })
        

        
    }
})

const saveExpenses = () => {
    localStorage.setItem("expenses", expenseContainer.innerHTML);
    localStorage.setItem("total", total);
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
}

loadExpenses()

const burger = document.getElementById("burger");

const hideNav = () => {
    nav.classList.add("hidden");
    main.classList.remove("opacity-30");
}
const showNav = () => {
    nav.classList.remove("hidden");
    main.classList.add("opacity-30");
}

main.addEventListener("click", (e) => {
    if (!e.target.closest(".small-nav")) {
      hideNav()  
    }
    
})

burger.addEventListener("click", () => {
    showNav()
})
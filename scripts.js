const form = document.querySelector("form");
const amount = document.getElementById("amount");
const expense = document.getElementById("expense");
const category = document.getElementById("category");

const expenseList = document.querySelector("ul");
const expensesQuantity = document.querySelector("aside header p span");
const expensesTotal = document.querySelector("aside header h2");


/* amount.addEventListener("input", function (e) {
  let value = e.target.value;

  value = parseFloat(value.replace(/[\D]+/g, ""));
  value = value / 100;

  e.target.value = value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
});*/

amount.oninput = (e) => {
  let value = e.target.value;

  value = parseFloat(value.replace(/[\D]+/g, ""));
  value = value / 100;

  e.target.value = value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
  // console.log(e.target.value);
};

form.onsubmit = (e) => {
  e.preventDefault();

  const newExpense = {
    id: crypto.randomUUID(),
    amount: amount.value,
    expense: expense.value,
    category_id: category.value,
    category_name: category.options[category.selectedIndex].text,
    created_at: new Date(),
  }
  addExpense(newExpense);
  form.reset();
  expense.focus();
}

function addExpense(newExpense) {
  try {
    const expenseItem = document.createElement("li");
    expenseItem.classList.add("expense");

    const expenseIcon = document.createElement("img");
    expenseIcon.src = `./img/${newExpense.category_id}.svg`;
    expenseIcon.alt = newExpense.category_name;

    const expenseInfo = document.createElement("div");
    expenseInfo.classList.add("expense-info");
    const expenseName = document.createElement("strong");
    expenseName.textContent = newExpense.expense;
    const expenseCategory = document.createElement("span");
    expenseCategory.textContent = newExpense.category_name;

    const expenseAmount = document.createElement("span");
    expenseAmount.textContent = (newExpense.amount).toUpperCase().replace("R$", "");
    expenseAmount.classList.add("expense-amount");
    const expenseAmountSymbol = document.createElement("small");
    expenseAmountSymbol.textContent = "R$";
    expenseAmount.prepend(expenseAmountSymbol);

    const deleteIcon = document.createElement("img");
    deleteIcon.src = "./img/remove.svg";
    deleteIcon.alt = "Deletar despesa";
    deleteIcon.classList.add("remove-icon");

    deleteIcon.onclick = () => {
      expenseList.removeChild(expenseItem);
      updateExpensesQuantity();
    }
        
    expenseInfo.append(expenseName, expenseCategory);
    expenseItem.append(expenseIcon, expenseInfo, expenseAmount, deleteIcon);
    expenseList.append(expenseItem);

    updateExpensesQuantity();

  }catch (error) {
    console.error("Erro ao adicionar despesa:", error);
  }
}

function updateExpensesQuantity() {
  try {
    const quantity = expenseList.children.length;
    const quantityText = quantity === 1 ? "despesa" : "despesas";
    expensesQuantity.textContent = `${quantity} ${quantityText}`;

    let total = 0;
    
    for (const expenseItem of expenseList.children) {
      const expenseAmount = expenseItem.querySelector(".expense-amount").textContent;

      const value = parseFloat(expenseAmount.replace(/[\D]+/g, ""));
      
      total += Number(value);
      
      // expensesTotal.textContent = parseFloat((total/100).toFixed(2));

    }
    const expenseAmountSymbol = document.createElement("small");
    expenseAmountSymbol.textContent = "R$";

    // console.log(total);

    const totalFormated = ((total/100).toFixed(2));
    const totalFormatedBRL = totalFormated.replace("R$","").replace(".",",");

    // console.log(totalFormatedBRL);

    expensesTotal.innerHTML = "";
    expensesTotal.append(expenseAmountSymbol, totalFormatedBRL);

    // expensesTotal.textContent = totalFormatedBRL;
    
  }catch (error) {
    console.error("Erro ao atualizar quantidade de despesas:", error);
  }
}



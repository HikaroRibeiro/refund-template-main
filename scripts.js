const form = document.querySelector("form");
const amount = document.getElementById("amount");
const expense = document.getElementById("expense");
const category = document.getElementById("category");

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
  console.log(e.target.value);
};

form.onsubmit = (e) => {
  e.preventDefault();
    console.log({
    amount: amount.value,
    expense: expense.value,
    category: category.value,
  });
}


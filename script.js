const addExpenseButton = document.getElementById("add-expense-button");

const descriptionInput = document.getElementById("description");
const valueInput = document.getElementById("value");
const selectInput = document.getElementById("type");

const budget = document.getElementById("budget");
const incomeList = document.getElementById("income-list");
const expenseList = document.getElementById("expense-list");
const totalIncome = document.getElementById("total-income");
const totalExpense = document.getElementById("total-expense");


function formatMoney(value) {
  return Math.abs(Number(value)).toLocaleString(undefined, {
    minimumFractionDigits: 2,
  });
}

function calculateIncome() {
  let sum = 0;
  for (let item of incomeList.children) {
    const valueString =
      item.children[0].children[1].children[0].innerHTML.replace(/,/g, "");

    // console.log(parseFloat(valueString));
    sum += parseFloat(valueString);
  }
  totalIncome.innerHTML = formatMoney(sum);
}
calculateIncome();

/**
 * Task 1: Calculate total expense
 */
function calculateExpense() {
  let sum = 0;
  for (let item of expenseList.children) {
    const valueString =
      item.children[0].children[1].children[0].innerHTML.replace(/,/g, "");

    // console.log(parseFloat(valueString));
    sum += parseFloat(valueString);
  }
  totalExpense.innerHTML = formatMoney(sum);
}
calculateExpense();

/**
 * Task 2: Calculate the budget
 */

function calculateBudget() {
  const income = totalIncome.innerHTML.replace(/,/g, "");
  const expense = totalExpense.innerHTML.replace(/,/g, "");
  const total = parseFloat(income) - parseFloat(expense); 
  budget.innerHTML = formatMoney(total);
}
calculateBudget();

/**
 * Task 3: Delete Entry
 */
function deleteEntry(param) {
  const [element_id,list_id] = param.split(",");
  const targetElement = document.getElementById(element_id);
  const list = document.getElementById(list_id);
  list.removeChild(targetElement);
  if (list_id === "income-list") {
    calculateIncome();
  } else {
    calculateExpense();
  }
  calculateBudget();
}

function addEntry() {
  const type = selectInput.value;
  const description = descriptionInput.value;
  const value = valueInput.value;

  // data validation
  const errors = [];
  if (description.length === 0) {
    errors.push("Please enter the description");
  }
  if (value.length === 0) {
    errors.push("Please enter the value");
  }
  if (errors.length > 0) {
    alert(errors);
    return;
  }

  // insert entry
  const list = type === "income" ? incomeList : expenseList;
  const sign = type === "income" ? "+" : "-";
  const colorClass = type === "income" ? "text-green-600" : "text-red-600";

  // generating unique id for each element
  const id = Date.now();

  const newEntryHtml = `
    <li id="${id}" class="py-2.5">
      <div class="group flex justify-between gap-2 text-sm">
        <span>${description}</span>
        <div>
          <span class="${colorClass}">${sign}${formatMoney(value)}</span>
          <span
            onclick = "deleteEntry('${id},${list.id}')"
            class="ml-2 hidden cursor-pointer font-medium text-red-500 group-hover:inline-block"
          >
            Delete
          </span>
        </div>
      </div>
    </li>
    `;

  // Approach 1:
  list.innerHTML += newEntryHtml;

  // update the calculation of income or expense according to condition
  if (type === "income") {
    calculateIncome();
  } else {
    calculateExpense();
  }
  calculateBudget();
}

addExpenseButton.addEventListener("click", addEntry);
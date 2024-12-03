const incomeForm = document.getElementById("incomeForm");
const expenseForm = document.getElementById("expenseForm");
const incomeTableBody = document.querySelector("#incomeTable tbody");
const expenseTableBody = document.querySelector("#expenseTable tbody");
const categoriesModal = document.getElementById("categoriesModal");
const incomeCategoriesModal = document.getElementById("incomeCategoriesModal");
const categoriesList = document.getElementById("categoriesList");
const incomeCategoriesList = document.getElementById("incomeCategoriesList");
const closeModalBtn = document.getElementById("closeModalBtn");
const closeIncomeModalBtn = document.getElementById("closeIncomeModalBtn");
const editCategoriesBtn = document.getElementById("editCategoriesBtn");
const editIncomeCategoriesBtn = document.getElementById("editIncomeCategoriesBtn");
const logoutBtn = document.getElementById("logoutBtn");

let incomes = JSON.parse(localStorage.getItem("incomes")) || [];
let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
let expenseCategories = JSON.parse(localStorage.getItem("expenseCategories")) || ["Alimentación", "Transporte", "Ocio", "Otros"];
let incomeCategories = JSON.parse(localStorage.getItem("incomeCategories")) || ["Salario", "Inversiones", "Otros"];

function renderIncomes() {
  incomeTableBody.innerHTML = "";
  incomes.forEach((income, index) => {
    const row = document.createElement("tr");
    const formattedAmount = `$${income.amount.toFixed(2)}`;
    row.innerHTML = `
      <td>${income.date}</td>
      <td>${income.description}</td>
      <td>${formattedAmount}</td>
      <td>${income.category}</td>
      <td><button onclick="deleteIncome(${index})">Eliminar</button></td>
    `;
    incomeTableBody.appendChild(row);
  });
}

function renderExpenses() {
  expenseTableBody.innerHTML = "";
  expenses.forEach((expense, index) => {
    const row = document.createElement("tr");
    const formattedAmount = `$${expense.amount.toFixed(2)}`;
    row.innerHTML = `
      <td>${expense.date}</td>
      <td>${expense.description}</td>
      <td>${formattedAmount}</td>
      <td>${expense.category}</td>
      <td><button onclick="deleteExpense(${index})">Eliminar</button></td>
    `;
    expenseTableBody.appendChild(row);
  });
}

function addIncome(e) {
  e.preventDefault();

  const income = {
    date: document.getElementById("incomeDate").value,
    description: document.getElementById("incomeDescription").value,
    amount: parseFloat(document.getElementById("incomeAmount").value),
    category: document.getElementById("incomeCategory").value
  };

  incomes.push(income);
  localStorage.setItem("incomes", JSON.stringify(incomes));

  renderIncomes();
  incomeForm.reset();
}

function addExpense(e) {
  e.preventDefault();

  const expense = {
    date: document.getElementById("expenseDate").value,
    description: document.getElementById("expenseDescription").value,
    amount: parseFloat(document.getElementById("expenseAmount").value),
    category: document.getElementById("expenseCategory").value
  };

  expenses.push(expense);
  localStorage.setItem("expenses", JSON.stringify(expenses));

  renderExpenses();
  expenseForm.reset();
}

function deleteIncome(index) {
  incomes.splice(index, 1);
  localStorage.setItem("incomes", JSON.stringify(incomes));
  renderIncomes();
}

function deleteExpense(index) {
  expenses.splice(index, 1);
  localStorage.setItem("expenses", JSON.stringify(expenses));
  renderExpenses();
}

function deleteExpenseCategory(index) {
  expenseCategories.splice(index, 1);
  localStorage.setItem("expenseCategories", JSON.stringify(expenseCategories));
  renderCategories();
  updateCategoryDropdowns();
}

function deleteIncomeCategory(index) {
  incomeCategories.splice(index, 1);
  localStorage.setItem("incomeCategories", JSON.stringify(incomeCategories));
  renderCategories();
  updateCategoryDropdowns();
}

function updateCategoryDropdowns() {
  const incomeCategorySelect = document.getElementById("incomeCategory");
  const expenseCategorySelect = document.getElementById("expenseCategory");

  incomeCategorySelect.innerHTML = '';
  incomeCategories.forEach(category => {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category;
    incomeCategorySelect.appendChild(option);
  });

  expenseCategorySelect.innerHTML = '';
  expenseCategories.forEach(category => {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category;
    expenseCategorySelect.appendChild(option);
  });
}

function renderCategories() {
  categoriesList.innerHTML = "";
  expenseCategories.forEach((category, index) => {
    const li = document.createElement("li");
    li.innerHTML = `${category} <button onclick="deleteExpenseCategory(${index})">Eliminar</button>`;
    categoriesList.appendChild(li);
  });

  incomeCategoriesList.innerHTML = "";
  incomeCategories.forEach((category, index) => {
    const li = document.createElement("li");
    li.innerHTML = `${category} <button onclick="deleteIncomeCategory(${index})">Eliminar</button>`;
    incomeCategoriesList.appendChild(li);
  });
}

function addCategory(e) {
  e.preventDefault();
  const newCategory = document.getElementById("newCategoryInput").value.trim();
  
  if (newCategory) {
    expenseCategories.push(newCategory);
    localStorage.setItem("expenseCategories", JSON.stringify(expenseCategories));
    renderCategories();
    updateCategoryDropdowns();
  }

  document.getElementById("newCategoryInput").value = '';
}

function addIncomeCategory(e) {
  e.preventDefault();
  const newCategory = document.getElementById("newIncomeCategoryInput").value.trim();
  
  if (newCategory) {
    incomeCategories.push(newCategory);
    localStorage.setItem("incomeCategories", JSON.stringify(incomeCategories));
    renderCategories();
    updateCategoryDropdowns();
  }

  document.getElementById("newIncomeCategoryInput").value = '';
}

incomeForm.addEventListener("submit", addIncome);
expenseForm.addEventListener("submit", addExpense);
editCategoriesBtn.addEventListener("click", () => categoriesModal.classList.remove("hidden"));
editIncomeCategoriesBtn.addEventListener("click", () => incomeCategoriesModal.classList.remove("hidden"));
closeModalBtn.addEventListener("click", () => categoriesModal.classList.add("hidden"));
closeIncomeModalBtn.addEventListener("click", () => incomeCategoriesModal.classList.add("hidden"));

document.getElementById("addCategoryForm").addEventListener("submit", addCategory);
document.getElementById("addIncomeCategoryForm").addEventListener("submit", addIncomeCategory);

document.addEventListener("DOMContentLoaded", () => {
  renderIncomes();
  renderExpenses();
  renderCategories();
  updateCategoryDropdowns();
});

logoutBtn.addEventListener("click", () => {
  localStorage.clear();
  window.location.href = "/src/pages/home.html";
});

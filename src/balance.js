document.addEventListener("DOMContentLoaded", () => {
  const incomeForm = document.getElementById("incomeForm");
  const expenseForm = document.getElementById("expenseForm");
  const incomeTableBody = document.querySelector("#incomeTable tbody");
  const expenseTableBody = document.querySelector("#expenseTable tbody");

  let incomes = JSON.parse(getCookie("incomes") || "[]");
  let expenses = JSON.parse(getCookie("expenses") || "[]");

  function updateIncomeTable() {
    incomeTableBody.innerHTML = "";
    incomes.forEach((income, index) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${income.date}</td>
        <td>${income.description}</td>
        <td>$${income.amount.toFixed(2)}</td>
        <td>${income.category}</td>
        <td><button class="delete-income" data-index="${index}">Eliminar</button></td>
      `;
      incomeTableBody.appendChild(row);
    });
  }

  function updateExpenseTable() {
    expenseTableBody.innerHTML = "";
    expenses.forEach((expense, index) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${expense.date}</td>
        <td>${expense.description}</td>
        <td>$${expense.amount.toFixed(2)}</td>
        <td>${expense.category}</td>
        <td><button class="delete-expense" data-index="${index}">Eliminar</button></td>
      `;
      expenseTableBody.appendChild(row);
    });
  }

  updateIncomeTable();
  updateExpenseTable();

  incomeForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const date = document.getElementById("incomeDate").value;
    const description = document.getElementById("incomeDescription").value;
    const amount = parseFloat(document.getElementById("incomeAmount").value);
    const category = document.getElementById("incomeCategory").value;

    incomes.push({ date, description, amount, category });
    setCookie("incomes", JSON.stringify(incomes), 7);
    updateIncomeTable();
    incomeForm.reset();
  });

  expenseForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const date = document.getElementById("expenseDate").value;
    const description = document.getElementById("expenseDescription").value;
    const amount = parseFloat(document.getElementById("expenseAmount").value);
    const category = document.getElementById("expenseCategory").value;

    expenses.push({ date, description, amount, category });
    setCookie("expenses", JSON.stringify(expenses), 7);
    updateExpenseTable();
    expenseForm.reset();
  });

  incomeTableBody.addEventListener("click", (e) => {
    if (e.target.classList.contains("delete-income")) {
      const index = e.target.dataset.index;
      deleteIncome(index);
    }
  });

  expenseTableBody.addEventListener("click", (e) => {
    if (e.target.classList.contains("delete-expense")) {
      const index = e.target.dataset.index;
      deleteExpense(index);
    }
  });

  function deleteIncome(index) {
    incomes.splice(index, 1);
    setCookie("incomes", JSON.stringify(incomes), 7);
    updateIncomeTable();
  }

  function deleteExpense(index) {
    expenses.splice(index, 1);
    setCookie("expenses", JSON.stringify(expenses), 7);
    updateExpenseTable();
  }

  function setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${value};expires=${date.toUTCString()};path=/`;
  }

  function getCookie(name) {
    const cookies = document.cookie.split("; ");
    const found = cookies.find((row) => row.startsWith(name + "="));
    return found ? found.split("=")[1] : null;
  }

  const editCategoriesBtn = document.getElementById("editCategoriesBtn");
  const editIncomeCategoriesBtn = document.getElementById("editIncomeCategoriesBtn");
  const categoriesModal = document.getElementById("categoriesModal");
  const incomeCategoriesModal = document.getElementById("incomeCategoriesModal");
  const closeModalBtn = document.getElementById("closeModalBtn");
  const closeIncomeModalBtn = document.getElementById("closeIncomeModalBtn");
  const categoriesList = document.getElementById("categoriesList");
  const incomeCategoriesList = document.getElementById("incomeCategoriesList");
  const addCategoryForm = document.getElementById("addCategoryForm");
  const addIncomeCategoryForm = document.getElementById("addIncomeCategoryForm");
  const newCategoryInput = document.getElementById("newCategoryInput");
  const newIncomeCategoryInput = document.getElementById("newIncomeCategoryInput");

  const expenseCategorySelect = document.getElementById("expenseCategory");
  const incomeCategorySelect = document.getElementById("incomeCategory");

  const defaultExpenseCategories = ["Alimentación", "Transporte", "Salud", "Ocio"];
  const defaultIncomeCategories = ["Salario", "Inversión", "Freelance", "Otros"];
  const EXPENSE_CATEGORIES_COOKIE = "expenseCategories";
  const INCOME_CATEGORIES_COOKIE = "incomeCategories";

  function loadExpenseCategories() {
    const categories = document.cookie
      .split("; ")
      .find((row) => row.startsWith(`${EXPENSE_CATEGORIES_COOKIE}=`))
      ?.split("=")[1];
    return categories ? JSON.parse(decodeURIComponent(categories)) : [...defaultExpenseCategories];
  }

  function loadIncomeCategories() {
    const categories = document.cookie
      .split("; ")
      .find((row) => row.startsWith(`${INCOME_CATEGORIES_COOKIE}=`))
      ?.split("=")[1];
    return categories ? JSON.parse(decodeURIComponent(categories)) : [...defaultIncomeCategories];
  }

  function saveExpenseCategories(categories) {
    document.cookie = `${EXPENSE_CATEGORIES_COOKIE}=${encodeURIComponent(
      JSON.stringify(categories)
    )}; path=/; max-age=31536000`;
  }

  function saveIncomeCategories(categories) {
    document.cookie = `${INCOME_CATEGORIES_COOKIE}=${encodeURIComponent(
      JSON.stringify(categories)
    )}; path=/; max-age=31536000`;
  }

  function updateCategorySelects() {
    const expenseCategories = loadExpenseCategories();
    const incomeCategories = loadIncomeCategories();

    expenseCategorySelect.innerHTML = "";
    expenseCategories.forEach((category) => {
      const option = document.createElement("option");
      option.value = category;
      option.textContent = category;
      expenseCategorySelect.appendChild(option);
    });

    incomeCategorySelect.innerHTML = "";
    incomeCategories.forEach((category) => {
      const option = document.createElement("option");
      option.value = category;
      option.textContent = category;
      incomeCategorySelect.appendChild(option);
    });
  }

  function renderExpenseCategories() {
    const expenseCategories = loadExpenseCategories();
    categoriesList.innerHTML = "";
    expenseCategories.forEach((category, index) => {
      const li = document.createElement("li");
      li.innerHTML = ` 
          <span>${category}</span>
          <button data-index="${index}" class="delete-category-btn">Eliminar</button>
        `;
      categoriesList.appendChild(li);
    });
  }

  function renderIncomeCategories() {
    const incomeCategories = loadIncomeCategories();
    incomeCategoriesList.innerHTML = "";
    incomeCategories.forEach((category, index) => {
      const li = document.createElement("li");
      li.innerHTML = ` 
          <span>${category}</span>
          <button data-index="${index}" class="delete-category-btn">Eliminar</button>
        `;
      incomeCategoriesList.appendChild(li);
    });
  }

  categoriesModal.addEventListener("click", (e) => {
    if (e.target.classList.contains("delete-category-btn")) {
      const index = e.target.dataset.index;
      const expenseCategories = loadExpenseCategories();
      expenseCategories.splice(index, 1);
      saveExpenseCategories(expenseCategories);
      renderExpenseCategories();
      updateCategorySelects();
    }
  });

  incomeCategoriesModal.addEventListener("click", (e) => {
    if (e.target.classList.contains("delete-category-btn")) {
      const index = e.target.dataset.index;
      const incomeCategories = loadIncomeCategories();
      incomeCategories.splice(index, 1);
      saveIncomeCategories(incomeCategories);
      renderIncomeCategories();
      updateCategorySelects();
    }
  });

  editCategoriesBtn.addEventListener("click", () => {
    categoriesModal.classList.remove("hidden");
    renderExpenseCategories();
  });


  editIncomeCategoriesBtn.addEventListener("click", () => {
    incomeCategoriesModal.classList.remove("hidden");
    renderIncomeCategories();
  });

  closeModalBtn.addEventListener("click", () => {
    categoriesModal.classList.add("hidden");
  });

  closeIncomeModalBtn.addEventListener("click", () => {
    incomeCategoriesModal.classList.add("hidden");
  });

  addCategoryForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const newCategory = newCategoryInput.value.trim();
    if (newCategory && !loadExpenseCategories().includes(newCategory)) {
      const expenseCategories = loadExpenseCategories();
      expenseCategories.push(newCategory);
      saveExpenseCategories(expenseCategories);
      renderExpenseCategories();
      updateCategorySelects();
      newCategoryInput.value = "";
    }
  });

  addIncomeCategoryForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const newIncomeCategory = newIncomeCategoryInput.value.trim();
    if (newIncomeCategory && !loadIncomeCategories().includes(newIncomeCategory)) {
      const incomeCategories = loadIncomeCategories();
      incomeCategories.push(newIncomeCategory);
      saveIncomeCategories(incomeCategories);
      renderIncomeCategories();
      updateCategorySelects();
      newIncomeCategoryInput.value = "";
    }
  });

  updateCategorySelects();

  const logoutBtn = document.getElementById('logoutBtn');
  
  logoutBtn.addEventListener('click', function() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('isFirstVisit');
    window.location.href = '/index.html';
  });
});

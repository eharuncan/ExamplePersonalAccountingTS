// import decrement from "./helpers/decrement";
// import increment from "./helpers/increment";

// const incrementButton = <HTMLButtonElement>document.querySelector("#increment");
// const decrementButton = <HTMLButtonElement>document.querySelector("#decrement");
// const countValue = <HTMLSpanElement>document.querySelector("#count-value");

// const handleIncrementClick = () => {
//   const currentValue = parseFloat(countValue.innerText);
//   const incrementedValue = increment(currentValue);
//   countValue.innerText = incrementedValue.toString();
// };

// const handleDecrementClick = () => {
//   const currentValue = parseFloat(countValue.innerText);
//   const decrementedValue = decrement(currentValue);
//   countValue.innerText = decrementedValue.toString();
// };

// incrementButton.addEventListener("click", handleIncrementClick);
// decrementButton.addEventListener("click", handleDecrementClick);

import { Database } from "./db/database";

import { ExpenseCategoryService } from "./services/expenseCategoryService";
import { UserService } from "./services/userService";
import { ExpenseService } from "./services/expenseService";
import { JsxAttribute } from "typescript";

export let expenseCategoryService: ExpenseCategoryService;
export let userService: UserService;
export let expenseService: ExpenseService;

function connectDatabase(): Database {
  let username = "admin";
  let password = "admin";
  if (Database.connect(username, password)) {
    return new Database();
  } else {
    return null as any;
  }
}

function startServices(database: Database) {
  expenseCategoryService = new ExpenseCategoryService(database.expenseCategoryList);
  userService = new UserService(database.userList);
  expenseService = new ExpenseService(database.expenseList);
}

let database = connectDatabase();
if (database == null) {
  console.log("Hata: Database'e bağlanma işlemi başarısız.");
}
else {
  console.log("Database'e bağlanma işlemi başarılı.");
}
startServices(database);

const registerButton = <HTMLButtonElement>document.querySelector("#register-button");
const loginButton = <HTMLButtonElement>document.querySelector("#login-button");
const showExpensesButton = <HTMLButtonElement>document.querySelector("#show-expenses-button");
const addExpenseButton = <HTMLButtonElement>document.querySelector("#add-expense-button");
const addExpenseButton2 = <HTMLButtonElement>document.querySelector("#add-expense-button2");
const addExpenseSaveButton = <HTMLButtonElement>document.querySelector("#add-expense-save-button");
const showCategoriesButton = <HTMLButtonElement>document.querySelector("#show-categories-button");
const addCategorySaveButton = <HTMLButtonElement>document.querySelector("#add-category-save-button");
const editCategorySaveButton = <HTMLButtonElement>document.querySelector("#edit-category-save-button");
const editCategoryButton = <HTMLButtonElement>document.querySelector("#edit-category-button");
const editCategoryButton2 = <HTMLButtonElement>document.querySelector("#edit-category-button2");
const deleteCategoryButton = <HTMLButtonElement>document.querySelector("#delete-category-button");
const deleteCategoryButton2 = <HTMLButtonElement>document.querySelector("#delete-category-button2");
const deleteCategorySaveButton = <HTMLButtonElement>document.querySelector("#delete-category-save-button");
const showProfileButton = <HTMLButtonElement>document.querySelector("#show-profile-button");
const editProfileButton = <HTMLButtonElement>document.querySelector("#edit-profile-button");
const editProfileButton2 = <HTMLButtonElement>document.querySelector("#edit-profile-button2");
const editProfileSaveButton = <HTMLButtonElement>document.querySelector("#edit-profile-save-button");
const logoutButton = <HTMLButtonElement>document.querySelector("#logout-button");

function refreshMenus() {
  const mainMenu = <HTMLDivElement>document.querySelector("#main-menu");
  const addUserMenu = <HTMLDivElement>document.querySelector("#add-user-menu");
  const deleteUserMenu = <HTMLDivElement>document.querySelector("#delete-user-menu");
  const expensesMenu = <HTMLDivElement>document.querySelector("#expenses-menu");
  const categoriesMenu = <HTMLDivElement>document.querySelector("#categories-menu");
  const registerMenu = <HTMLDivElement>document.querySelector("#register-menu");
  const loginMenu = <HTMLDivElement>document.querySelector("#login-menu");
  const profileMenu = <HTMLDivElement>document.querySelector("#profile-menu");
  const logoutMenu = <HTMLDivElement>document.querySelector("#logout-menu");
  if (userService.currentUser == null) {
    mainMenu.setAttribute("style", "display: block;");
    loginMenu.setAttribute("style", "display: block;");
    registerMenu.setAttribute("style", "display: block;");

    addUserMenu.setAttribute("style", "display: none;");
    deleteUserMenu.setAttribute("style", "display: none;");
    expensesMenu.setAttribute("style", "display: none;");
    categoriesMenu.setAttribute("style", "display: none;");
    profileMenu.setAttribute("style", "display: none;");
    logoutMenu.setAttribute("style", "display: none;");
  } else {
    if(userService.currentUser.type == "ADMIN"){
      addUserMenu.setAttribute("style", "display: block;");
      deleteUserMenu.setAttribute("style", "display: block;");
    }else{
      expensesMenu.setAttribute("style", "display: block;");
      categoriesMenu.setAttribute("style", "display: block;");
    }
    mainMenu.setAttribute("style", "display: none;");
    loginMenu.setAttribute("style", "display: none;");
    registerMenu.setAttribute("style", "display: none;");

    logoutMenu.setAttribute("style", "display: block;");
    logoutButton.innerText = "Oturumu Kapat (" + userService.currentUser.name + ")"
    profileMenu.setAttribute("style", "display: block;");
  }
}

refreshMenus();

const handleRegisterClick = () => {
  const registerForm = document.getElementById("register-form");
  if (registerForm != null) {
    registerForm.onsubmit = () => {
      const formData = new FormData(<HTMLFormElement>registerForm);
      const name = formData.get("register-name") as string;
      const surname = formData.get("register-surname") as string;
      const email = formData.get("register-email") as string;
      const password = formData.get("register-password") as string;
      const retypedPassword = formData.get("register-retyped-password") as string;
      if (userService.register(name, surname, email, password, retypedPassword)) {
        console.log("Kayıt işlemi başarılı.");
        refreshMenus();
        window.location.replace("#show-expenses-page");
      } else {
        console.log("Hata: Kayıt işlemi başarısız.");
      }

      return false; // prevent reload
    };
  }
};
registerButton.addEventListener("click", handleRegisterClick);

const handleLoginClick = () => {
  const loginForm = document.getElementById("login-form");
  if (loginForm != null) {
    loginForm.onsubmit = () => {
      const formData = new FormData(<HTMLFormElement>loginForm);
      const email = formData.get("login-email") as string;
      const password = formData.get("login-password") as string;
      if (userService.login(email, password)) {
        console.log("Oturum açma işlemi başarılı.");
        refreshMenus();
        window.location.replace("#show-expenses-page");
      } else {
        console.log("Hata: Oturum açma işlemi başarısız.");
      }

      return false; // prevent reload
    };
  }
}
loginButton.addEventListener("click", handleLoginClick);

function removeAllChildNodes(parent: HTMLDivElement) {
  while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
  }
}

function showUserExpenses(elementId: string){
  const userExpensesList = <HTMLDivElement>document.querySelector(elementId);
  removeAllChildNodes(userExpensesList);
  let userExpenses = expenseService.getExpensesByUserId(userService.currentUser.id);

    let divElementId = document.createElement("div");
    divElementId.innerText = "Harcama ID";
    userExpensesList.appendChild(divElementId);

    let divElementName = document.createElement("div");
    divElementName.innerText = "Adı";
    userExpensesList.appendChild(divElementName);

    let divElementAmount = document.createElement("div");
    divElementAmount.innerText = "Miktarı";
    userExpensesList.appendChild(divElementAmount);

    let divElementDate = document.createElement("div");
    divElementDate.innerText = "Tarihi";
    userExpensesList.appendChild(divElementDate);

    let divElementCategory = document.createElement("div");
    divElementCategory.innerText = "Kategorisi";
    userExpensesList.appendChild(divElementCategory);

  for (let index = 0; index < userExpenses.length; index++) {
    let divElementId = document.createElement("div");
    divElementId.innerText = userExpenses[index].id.toString();
    userExpensesList.appendChild(divElementId);

    let divElementName = document.createElement("div");
    divElementName.innerText = userExpenses[index].name;
    userExpensesList.appendChild(divElementName);

    let divElementAmount = document.createElement("div");
    divElementAmount.innerText = userExpenses[index].amount.toString();
    userExpensesList.appendChild(divElementAmount);

    let divElementDate = document.createElement("div");
    divElementDate.innerText = userExpenses[index].date.toString();
    userExpensesList.appendChild(divElementDate);

    let divElementCategory = document.createElement("div");
    divElementCategory.innerText = expenseCategoryService.getExpenseCategoryByUserIdAndExpenseCategoryId(userService.currentUser.id, userExpenses[index].categoryId).name;
    userExpensesList.appendChild(divElementCategory);
  }
}

function showUserExpenseCategories(elementId: string){
  const userCategoriesList = <HTMLDivElement>document.querySelector(elementId);
  removeAllChildNodes(userCategoriesList);
  let userCategories = expenseCategoryService.getExpenseCategoriesByUserId(userService.currentUser.id);

    let divElementId = document.createElement("div");
    divElementId.innerText = "Kategori ID";
    userCategoriesList.appendChild(divElementId);

    let divElementName = document.createElement("div");
    divElementName.innerText = "Adı";
    userCategoriesList.appendChild(divElementName);

  for (let index = 0; index < userCategories.length; index++) {
    let divElementId = document.createElement("div");
    divElementId.innerText = userCategories[index].id.toString();
    userCategoriesList.appendChild(divElementId);

    let divElementName = document.createElement("div");
    divElementName.innerText = userCategories[index].name;
    userCategoriesList.appendChild(divElementName);
  }
}

const handleShowExpensesClick = () => {
  window.location.replace("#show-expenses-page");
  showUserExpenses("#show-expenses-list");
};
showExpensesButton.addEventListener("click", handleShowExpensesClick);

const handleAddExpenseClick = () => {
  window.location.replace("#add-expense-page");
  const addExpenseDate = <HTMLInputElement>document.querySelector("#add-expense-date");
  addExpenseDate.setAttribute("value", (new Date(Date.now())).toString());

  showUserExpenseCategories("#add-expense-show-categories-list");
  
};
addExpenseButton.addEventListener("click", handleAddExpenseClick);
addExpenseButton2.addEventListener("click", handleAddExpenseClick);

const handleAddExpenseSaveClick = () => {
  const addExpenseForm = document.getElementById("add-expense-form");
  if (addExpenseForm != null) {
    addExpenseForm.onsubmit = () => {
      const formData = new FormData(<HTMLFormElement>addExpenseForm);
      const name = formData.get("add-expense-name") as string;
      const amount = formData.get("add-expense-amount") as string;
      const date = formData.get("add-expense-date") as string;
      const categoryId = formData.get("add-expense-category") as string;
      if (expenseService.addExpense(userService.currentUser.id, name, BigInt(amount), new Date(date), Number(categoryId))) {
        console.log("Harcama ekleme işlemi başarılı.");
        handleShowExpensesClick();
        window.location.replace("#show-expenses-page");
      } else {
        console.log("Hata: Harcama ekleme işlemi başarısız.");
      }

      return false; // prevent reload
    };
  }
};
addExpenseSaveButton.addEventListener("click", handleAddExpenseSaveClick);

const handleShowCategoriesClick = () => {
  window.location.replace("#show-categories-page");
  showUserExpenseCategories("#show-categories-list");
};
showCategoriesButton.addEventListener("click", handleShowCategoriesClick);

const handleAddCategorySaveClick = () => {
  const addCategoryForm = document.getElementById("add-category-form");
  if (addCategoryForm != null) {
    addCategoryForm.onsubmit = () => {
      const formData = new FormData(<HTMLFormElement>addCategoryForm);
      const name = formData.get("show-categories-name") as string;
      if (expenseCategoryService.addExpenseCategory(userService.currentUser.id, name)) {
        console.log("Kategori ekleme işlemi başarılı.");
        handleShowCategoriesClick();
      } else {
        console.log("Hata: Kategori ekleme işlemi başarısız.");
      }

      return false; // prevent reload
    };
  }
};
addCategorySaveButton.addEventListener("click", handleAddCategorySaveClick);

const handleEditCategoryClick = () => {
  showUserExpenseCategories("#edit-category-list")
  window.location.replace("#edit-category-page");
}
editCategoryButton.addEventListener("click", handleEditCategoryClick);
editCategoryButton2.addEventListener("click", handleEditCategoryClick);

const handleEditCategorySaveClick = () => {
  const editCategoryForm = document.getElementById("edit-category-form");
  if (editCategoryForm != null) {
    editCategoryForm.onsubmit = () => {
      const formData = new FormData(<HTMLFormElement>editCategoryForm);
      const id = formData.get("edit-category-id") as string;
      const editedName = formData.get("edit-category-name") as string;
      if (expenseCategoryService.editExpenseCategory(userService.currentUser.id, Number(id), editedName)) {
        console.log("Kategori güncelleme işlemi başarılı.");
        handleShowCategoriesClick();
        window.location.replace("#show-categories-page");
      } else {
        console.log("Hata: Kategori güncelleme işlemi başarısız.");
      }
      return false; // prevent reload
    };
  }
}
editCategorySaveButton.addEventListener("click", handleEditCategorySaveClick);

const handleDeleteCategoryClick = () => {
  showUserExpenseCategories("#delete-category-list")
  window.location.replace("#delete-category-page");
}
deleteCategoryButton.addEventListener("click", handleDeleteCategoryClick);
deleteCategoryButton2.addEventListener("click", handleDeleteCategoryClick);

const handleDeleteCategorySaveClick = () => {
  const deleteCategoryForm = document.getElementById("delete-category-form");
  if (deleteCategoryForm != null) {
    deleteCategoryForm.onsubmit = () => {
      const formData = new FormData(<HTMLFormElement>deleteCategoryForm);
      const id = formData.get("delete-category-id") as string;
      if (expenseCategoryService.deleteExpenseCategory(userService.currentUser.id, Number(id))) {
        console.log("Kategori silme işlemi başarılı.");
        handleShowCategoriesClick();
        window.location.replace("#show-categories-page");
      } else {
        console.log("Hata: Kategori silme işlemi başarısız.");
      }
      return false; // prevent reload
    };
  }
}
deleteCategorySaveButton.addEventListener("click", handleDeleteCategorySaveClick);

const handleShowProfileClick = () => {
  const showProfileName = <HTMLDivElement>document.querySelector("#show-profile-name");
  const showProfileSurname = <HTMLDivElement>document.querySelector("#show-profile-surname");
  const showProfileEmail = <HTMLDivElement>document.querySelector("#show-profile-email");
  showProfileName.innerText = userService.currentUser.name;
  showProfileSurname.innerText = userService.currentUser.surname;
  showProfileEmail.innerText = userService.currentUser.email;
}
showProfileButton.addEventListener("click", handleShowProfileClick);

const handleEditProfileClick = () => {
  window.location.replace("#edit-profile-page");
  const editProfileName = <HTMLInputElement>document.querySelector("#edit-profile-name");
  const editProfileSurname = <HTMLInputElement>document.querySelector("#edit-profile-surname");
  const editProfileEmail = <HTMLInputElement>document.querySelector("#edit-profile-email");
  editProfileName.setAttribute("value", userService.currentUser.name);
  editProfileSurname.setAttribute("value", userService.currentUser.surname);
  editProfileEmail.setAttribute("value", userService.currentUser.email);
}
editProfileButton.addEventListener("click", handleEditProfileClick);
editProfileButton2.addEventListener("click", handleEditProfileClick);

const handleEditProfileSaveClick = () => {
  const editProfileForm = document.getElementById("edit-profile-form");
  if (editProfileForm != null) {
    editProfileForm.onsubmit = () => {
      const formData = new FormData(<HTMLFormElement>editProfileForm);
      const editedName = formData.get("edit-profile-name") as string;
      const editedSurname = formData.get("edit-profile-surname") as string;
      const editedEmail = formData.get("edit-profile-email") as string;
      const editedPassword = formData.get("edit-profile-password") as string;
      const retypedPassword = formData.get("edit-profile-retyped-password") as string;
      if (userService.editUser(userService.currentUser.id, editedName, editedSurname, editedEmail, editedPassword, retypedPassword)) {
        console.log("Kullanıcı güncelleme işlemi başarılı.");
        handleShowProfileClick();
        window.location.replace("#show-profile-page");
      } else {
        console.log("Hata: Kullanıcı güncelleme işlemi başarısız.");
      }
      return false; // prevent reload
    };
  }
}
editProfileSaveButton.addEventListener("click", handleEditProfileSaveClick);

const handleLogoutClick = () => {
  if (userService.logout()) {
    console.log("Oturum kapatma işlemi başarılı.");
    refreshMenus();
    window.location.replace("#");
  } else {
    console.log("Hata: Oturum kapatma işlemi başarısız.");
  }
}
logoutButton.addEventListener("click", handleLogoutClick);

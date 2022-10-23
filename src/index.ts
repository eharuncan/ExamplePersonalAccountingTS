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
const logoutButton = <HTMLButtonElement>document.querySelector("#logout-button");
const showProfileButton = <HTMLButtonElement>document.querySelector("#show-profile-button");
const editProfileButton = <HTMLButtonElement>document.querySelector(".edit-profile-button");
const editProfileSaveButton = <HTMLButtonElement>document.querySelector("#edit-profile-save-button");

function refreshMenus() {
  const mainMenu = <HTMLDivElement>document.querySelector("#main-menu");
  const expensesMenu = <HTMLDivElement>document.querySelector("#expenses-menu");
  const categoriesMenu = <HTMLDivElement>document.querySelector("#categories-menu");
  const registerMenu = <HTMLDivElement>document.querySelector("#register-menu");
  const loginMenu = <HTMLDivElement>document.querySelector("#login-menu");
  const profileMenu = <HTMLDivElement>document.querySelector("#profile-menu");
  const logoutMenu = <HTMLDivElement>document.querySelector("#logout-menu");
  if (userService.currentUser == null) {
    expensesMenu.setAttribute("style", "display: none;");
    categoriesMenu.setAttribute("style", "display: none;");
    logoutMenu.setAttribute("style", "display: none;");
    profileMenu.setAttribute("style", "display: none;");
    mainMenu.setAttribute("style", "display: block;");
    registerMenu.setAttribute("style", "display: block;");
    loginMenu.setAttribute("style", "display: block;");
  } else {
    mainMenu.setAttribute("style", "display: none;");
    registerMenu.setAttribute("style", "display: none;");
    loginMenu.setAttribute("style", "display: none;");
    expensesMenu.setAttribute("style", "display: block;");
    categoriesMenu.setAttribute("style", "display: block;");
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
  const editProfileName = <HTMLInputElement>document.querySelector("#edit-profile-name");
  const editProfileSurname = <HTMLInputElement>document.querySelector("#edit-profile-surname");
  const editProfileEmail = <HTMLInputElement>document.querySelector("#edit-profile-email");
  editProfileName.setAttribute("placeholder", userService.currentUser.name);
  editProfileSurname.setAttribute("placeholder", userService.currentUser.surname);
  editProfileEmail.setAttribute("placeholder", userService.currentUser.email);
}
editProfileButton.addEventListener("click", handleEditProfileClick);

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


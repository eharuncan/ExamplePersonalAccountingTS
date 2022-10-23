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

let database = connectDatabase();
if (database == null) {
  console.log("Hata: Database'e bağlanma işlemi başarısız.");
}
else {
  console.log("Database'e bağlanma işlemi başarılı.");
}
startServices(database);

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

const mainMenu = <HTMLDivElement>document.querySelector("#main-menu");
const expensesMenu = <HTMLDivElement>document.querySelector("#expenses-menu");
const categoriesMenu = <HTMLDivElement>document.querySelector("#categories-menu");
const registerMenu = <HTMLDivElement>document.querySelector("#register-menu");
const loginMenu = <HTMLDivElement>document.querySelector("#login-menu");
const profileMenu = <HTMLDivElement>document.querySelector("#profile-menu");
const logoutMenu = <HTMLDivElement>document.querySelector("#logout-menu");
const showProfileName = <HTMLDivElement>document.querySelector("#show-profile-name");
const showProfileSurname = <HTMLDivElement>document.querySelector("#show-profile-surname");
const showProfileEmail = <HTMLDivElement>document.querySelector("#show-profile-email");

const registerButton = <HTMLButtonElement>document.querySelector("#register-button");
const loginButton = <HTMLButtonElement>document.querySelector("#login-button");
const logoutButton = <HTMLButtonElement>document.querySelector("#logout-button");
const profileButton = <HTMLButtonElement>document.querySelector("#profile-button");

const registerForm = document.getElementById("register-form");
const loginForm = document.getElementById("login-form");

function refreshMenus (){
  if (userService.currentUser == null) {
    expensesMenu.setAttribute("style", "display: none;");
    categoriesMenu.setAttribute("style", "display: none;");
    logoutMenu.setAttribute("style", "display: none;");
    profileMenu.setAttribute("style", "display: none;");
    mainMenu.setAttribute("style", "display: block;");
    registerMenu.setAttribute("style", "display: block;");
    loginMenu.setAttribute("style", "display: block;");
  }else{
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
if (registerForm != null) {
  registerForm.onsubmit = () => {
    const formData = new FormData(<HTMLFormElement>registerForm);

    const name = formData.get("userName") as string;
    const surname = formData.get("userSurname") as string;
    const email = formData.get("userEmail") as string;
    const password = formData.get("userPassword") as string;
    const retypedPassword = formData.get("userRetypedPassword") as string;

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
if (loginForm != null) {
  loginForm.onsubmit = () => {
    const formData = new FormData(<HTMLFormElement>loginForm);

    const email = formData.get("userEmail") as string;
    const password = formData.get("userPassword") as string;

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

const handleProfileClick = () => {
  showProfileName.innerText = userService.currentUser.name;
  showProfileSurname.innerText = userService.currentUser.surname;
  showProfileEmail.innerText = userService.currentUser.email;
}
profileButton.addEventListener("click", handleProfileClick);


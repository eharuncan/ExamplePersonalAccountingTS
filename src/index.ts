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
  console.log("Hata: Database'e bağlanılamadı.");
}
else {
  console.log("Database'e başarıyla bağlandı.");
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

const registerForm = document.getElementById("register-form");
if (registerForm != null) {
  registerForm.onsubmit = () => {
    const formData = new FormData(<HTMLFormElement>registerForm);

    const name = formData.get("userName") as string;
    const surname = formData.get("userSurname") as string;
    const email = formData.get("userEmail") as string;
    const password = formData.get("userPassword") as string;
    const retypedPassword = formData.get("userRetypedPassword") as string;

    if (userService.register(name, surname, email, password, retypedPassword)) {
      console.log("Kayıt İşlemi Başarılı");
      let currentUser = userService.currentUser;
      console.log(currentUser.id);
      console.log(currentUser.type);
      console.log(currentUser.name);
      console.log(currentUser.surname);
      console.log(currentUser.email);
      console.log(currentUser.password);
      console.log(userService.getUsers);
    } else {
      console.log("Hata: Kayıt İşlemi Başarısız");
    }

    return false; // prevent reload
  };
}

const loginForm = document.getElementById("login-form");
if (loginForm != null) {
  loginForm.onsubmit = () => {
    const formData = new FormData(<HTMLFormElement>loginForm);

    const email = formData.get("userEmail") as string;
    const password = formData.get("userPassword") as string;

    if (userService.login(email, password)) {
      console.log("Oturum Açma İşlemi Başarılı");
      let currentUser = userService.currentUser;
      console.log(currentUser.id);
      console.log(currentUser.type);
      console.log(currentUser.name);
      console.log(currentUser.surname);
      console.log(currentUser.email);
      console.log(currentUser.password);
    } else {
      console.log("Hata: Oturum Açma İşlemi Başarısız");
    }

    return false; // prevent reload
  };
}



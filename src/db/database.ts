import { User } from "../domain/user";
import { Expense } from "../domain/expense";
import { ExpenseCategory } from "../domain/expenseCategory";

export class Database {

    private static connectStatus = false;

    private static username = "admin";
    private static password = "admin";

    private static userList: Array<User>;
    private static expenseList: Array<Expense>;
    private static expenseCategoryList: Array<ExpenseCategory>;

    constructor() {
        Database.userList = new Array<User>();
        Database.expenseList = new Array<Expense>();
        Database.expenseCategoryList = new Array<ExpenseCategory>();
    }

    static connect(username: string, password: string) {
        if (Database.username === username && Database.password === password) {
            Database.connectStatus = true;
            return true;
        } else {
            Database.connectStatus = false;
            return false;
        }
    }

    get userList(): Array<User> {
        if (Database.connectStatus){
            return Database.userList;
        }else{
            return null as any;
        }
    }
    set userList(userList: Array<User>) {
        if (Database.connectStatus){
            Database.userList = userList;
        }
    }

    get expenseList(): Array<Expense> {
        if (Database.connectStatus){
            return Database.expenseList;
        }else{
            return null as any;
        }
    }
    set expenseList(expenseList: Array<Expense>) {
        if (Database.connectStatus){
            Database.expenseList = expenseList;
        }
    }

    get expenseCategoryList(): Array<ExpenseCategory> {
        if (Database.connectStatus){
            return Database.expenseCategoryList;
        }else{
            return null as any;
        }
    }
    set expenseCategoryList(expenseCategoryList: Array<ExpenseCategory>) {
        if (Database.connectStatus){
            Database.expenseCategoryList = expenseCategoryList;
        }
    }
}
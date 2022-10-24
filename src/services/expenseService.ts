import { Expense } from "../domain/expense";

import moment from 'moment';

export class ExpenseService {
    private expenseListDB: Array<Expense>;

    constructor(expenseListDB: Array<Expense>) {
        this.expenseListDB = expenseListDB;
    }

    public getExpenses(): Array<Expense> {
        return this.expenseListDB;
    }

    public getExpensesByUserId(userId: number): Array<Expense> {
        let resultList = this.expenseListDB.filter((expense) => expense.userId === userId);
        return resultList;
    }

    public getExpenseByUserIdAndExpenseId(userId: number, expenseId: number): Expense {
        let resultList = this.expenseListDB.filter((expense) => expense.userId === userId && expense.id === expenseId);
        return resultList[0];
    }

    public addExpense(userId: number, name: string, amount: bigint, date: Date, categoryId: number ): boolean {
            let newExpenseId;
            let expenseList = this.expenseListDB;
            if (expenseList.length == 0) {
                newExpenseId = 1;
            } else {
                let lastExpense = expenseList[expenseList.length - 1];
                newExpenseId = lastExpense.id + 1;
            }
            let newExpense = new Expense(userId, newExpenseId, name, amount, date, categoryId);
            console.log("newExpense", newExpense);
            this.expenseListDB.push(newExpense);
            return true;
    }

    public editExpense(userId: number, id: number, editedName: string, editedAmount: bigint, editedDate: Date, editedCategoryId: number): boolean {
        let expense = this.getExpenseByUserIdAndExpenseId(userId, id);
        let index = this.getExpenses().indexOf(expense);
        let editedExpense = new Expense(userId, id, editedName, editedAmount, editedDate, editedCategoryId);
        this.expenseListDB[index] = editedExpense;
        console.log("editedExpense", editedExpense);
        return true;
    }

    public deleteExpense(userId: number, expenseId: number): boolean {
        let foundExpense = this.getExpenseByUserIdAndExpenseId(userId, expenseId);
        let index = this.expenseListDB.indexOf(foundExpense, 0);
        if (index > -1) {
            this.expenseListDB.splice(index, 1);
        }
        return true;
    }

    public getSumOfUserExpensesOfDay(userId: number, date: Date): bigint {
        let today = moment().toDate();
        let year = moment(today).year();
        let month = moment(today).month();
        let day = moment(today).day();

        let currentUsersExpenseList = this.getExpensesByUserId(userId);

        let resultList = currentUsersExpenseList.filter(
                (expense) =>
                    moment(expense.date).year() == year &&
                    moment(expense.date).month() == month &&
                    moment(expense.date).day() == day
            );

        let sum = BigInt(0);
        resultList.forEach((expense) => {
            sum += expense.amount;
        });
        return sum;
    }

    public getSumOfUserExpensesOfMonth(userId: number, date: Date): bigint {
        let today = moment().toDate();
        let year = moment(today).year();
        let month = moment(today).month();

        let currentUsersExpenseList = this.getExpensesByUserId(userId);

        let resultList = currentUsersExpenseList.filter(
                (expense) =>
                moment(expense.date).year() == year &&
                moment(expense.date).month() == month
        );

        let sum = BigInt(0);
        resultList.forEach((expense) => {
            sum += expense.amount;
        });
        return sum;
    }

    public getSumOfUserExpensesOfYear(userId: number, date: Date): bigint {
        let today = moment().toDate();
        let year = moment(today).year();

        let currentUsersExpenseList = this.getExpensesByUserId(userId);

        let resultList = currentUsersExpenseList.filter(
                (expense) =>
                moment(expense.date).year() == year
        );

        let sum = BigInt(0);
        resultList.forEach((expense) => {
            sum += expense.amount;
        });
        return sum;
    }
}


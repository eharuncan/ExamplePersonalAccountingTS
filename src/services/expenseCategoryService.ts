import { ExpenseCategory } from "../domain/expenseCategory";

export class ExpenseCategoryService {
    private expenseCategoryListDB: Array<ExpenseCategory>;
    private defaultExpenseCategories: string[] = ["Çocuk", "Güvenlik", "Kitap", "Sağlık"];

    constructor(expenseCategoryListDB: Array<ExpenseCategory>) {
        this.expenseCategoryListDB = expenseCategoryListDB;
    }

    public getExpenseCategories(): Array<ExpenseCategory> {
        return this.expenseCategoryListDB;
    }

    public getExpenseCategoriesByUserId(userId: number): Array<ExpenseCategory> {
        let resultList;
        resultList = this.expenseCategoryListDB.filter((expenseCategory) => expenseCategory.userId === userId);
        return resultList;
    }

    public getExpenseCategoryByUserIdAndExpenseCategoryId(userId: number, expenseCategoryId: number): ExpenseCategory {
        let resultList;
        resultList = this.expenseCategoryListDB.filter((expenseCategory) => expenseCategory.userId === userId && expenseCategory.id === expenseCategoryId);
        return resultList[0];
    }

    public addExpenseCategory(userId: number, expenseCategoryName: string): boolean {
        let newExpenseCategoryId;
        let expenseCategoryList = this.getExpenseCategoriesByUserId(userId);
        if (expenseCategoryList.length == 0) {
            newExpenseCategoryId = 1;
        } else {
            let lastExpenseCategory = expenseCategoryList[expenseCategoryList.length - 1];
            newExpenseCategoryId = lastExpenseCategory.id + 1;
        }

        let expenseCategory = new ExpenseCategory(userId, newExpenseCategoryId, expenseCategoryName);
        this.expenseCategoryListDB.push(expenseCategory);
        return true;
    }

    public editExpenseCategory(userId: number, id: number, editedName: string): boolean {
        let expenseCategory = this.getExpenseCategoryByUserIdAndExpenseCategoryId(userId, id);
        let index = this.getExpenseCategories().indexOf(expenseCategory);
        let editedExpenseCategory = new ExpenseCategory(userId, id, editedName);
        this.expenseCategoryListDB[index] = editedExpenseCategory;
        console.log("editedExpenseCategory", editedExpenseCategory);
        return true;
    }

    public deleteExpenseCategory(userId: number, expenseCategoryId: number): boolean {
        let foundExpenseCategory = this.getExpenseCategoryByUserIdAndExpenseCategoryId(userId, expenseCategoryId);
        let index = this.expenseCategoryListDB.indexOf(foundExpenseCategory, 0);
        if (index > -1) {
            this.expenseCategoryListDB.splice(index, 1);
        }
        return true;
    }

    public addDefaultExpenseCategories(userId: number) {

        // for (String expenseCategory:defaultExpenseCategories) {
        //     this.addExpenseCategory(userId,expenseCategory );
        // }

        this.defaultExpenseCategories.forEach(expenseCategory => {
            this.addExpenseCategory(userId, expenseCategory);
        });

        return true;
    }
}

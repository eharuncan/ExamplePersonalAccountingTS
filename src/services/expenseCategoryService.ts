import { ExpenseCategory } from "../domain/expenseCategory";

export class ExpenseCategoryService {
    private expenseCategoryListDB: Array<ExpenseCategory>;
    private defaultExpenseCategories:string[] = ["Çocuk","Güvenlik","Kitap","Sağlık"];

    constructor(expenseCategoryListDB: Array<ExpenseCategory>) {
        this.expenseCategoryListDB = expenseCategoryListDB;
    }

    public getExpenseCategories(): Array<ExpenseCategory> {
        return this.expenseCategoryListDB;
    }

    public getExpenseCategoriesByUserId(userId: number): Array<ExpenseCategory> {
        const resultList = this.expenseCategoryListDB
                .filter((expenseCategory) => {expenseCategory.userId === userId});
        return resultList;
    }

    public getExpenseCategoryByUserIdAndExpenseCategoryId(userId: number, expenseCategoryId: number): ExpenseCategory {
        const resultList = this.expenseCategoryListDB
                .filter((expenseCategory) => {expenseCategory.userId === userId && expenseCategory.id === expenseCategoryId});
        return resultList[0];
    }

    public addExpenseCategory(userId: number, expenseCategoryName: string): boolean {
        let newExpenseCategoryId;
        let expenseCategoryList = this.getExpenseCategoriesByUserId(userId);
        if (expenseCategoryList.length == 0){
            newExpenseCategoryId = 1;
        }else {
            let lastExpenseCategory =  expenseCategoryList[expenseCategoryList.length-1];
            newExpenseCategoryId = lastExpenseCategory.id + 1;
        }

        let expenseCategory = new ExpenseCategory(userId, newExpenseCategoryId, expenseCategoryName);
        this.expenseCategoryListDB.push(expenseCategory);
        return true;
    }

    public editExpenseCategory(expenseCategory: ExpenseCategory, editedExpenseCategory: ExpenseCategory): boolean {
        if (this.validateExpenseCategory(editedExpenseCategory)) {
            let index = this.getExpenseCategories().indexOf(expenseCategory);
            this.expenseCategoryListDB[index] = editedExpenseCategory;
            return true;
        } else {
            return false;
        }
    }

    public deleteExpenseCategory(userId: number, expenseCategoryId: number): boolean {
        let foundExpenseCategory = this.getExpenseCategoryByUserIdAndExpenseCategoryId(userId, expenseCategoryId);
        const index = this.expenseCategoryListDB.indexOf(foundExpenseCategory, 0);
        if (index > -1) {
            this.expenseCategoryListDB.splice(index, 1);
        }
        return true;
    }

    public addDefaultExpenseCategories(userId: number){

        // for (String expenseCategory:defaultExpenseCategories) {
        //     this.addExpenseCategory(userId,expenseCategory );
        // }

        this.defaultExpenseCategories.forEach(expenseCategory => {
            this.addExpenseCategory(userId,expenseCategory );
        }); 

        return true;
    }

    public validateExpenseCategory(expenseCategory: ExpenseCategory): boolean {
        //todo: burası yazılacak
        return true;
    }
}

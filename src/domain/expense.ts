export class Expense {

    private _userId: number;
    private _id: number;
    private _name: string;
    private _amount: bigint;
    private _date: Date;
    private _categoryId: number;

    constructor(userId: number, id: number, name: string, amount: bigint, date: Date, categoryId: number) {
        this._userId = userId;
        this._id = id;
        this._name = name;
        this._amount = amount;
        this._date = date;
        this._categoryId = categoryId;
    }

    //Getters, Setters, Attributes

    get userId(): number {
        return this._userId;
    }
    set userId(userId: number) {
        this._userId = userId;
    }

    get id():number {
        return this._id;
    }
    set id(id: number) {
        this._id = id;
    }

    get name():string {
        return this._name;
    }
    set name(name: string) {
        this._name = name;
    }

    get amount():bigint {
        return this._amount;
    }
    set amount(amount: bigint) {
        this._amount = amount;
    }

    get date():Date {
        return this._date;
    }
    set date(date: Date) {
        this._date = date;
    }

    get categoryId():number {
        return this._categoryId;
    }
    set categoryId(categoryId: number) {
        this._categoryId = categoryId;
    }

}
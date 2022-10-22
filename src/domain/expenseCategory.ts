export class ExpenseCategory {

    private _userId: number;
    private _id: number;
    private _name: string;

    constructor(userId: number, id: number, name: string) {
        this._userId = userId;
        this._id = id;
        this._name = name;
    }

    //Getters, Setters, Attributes

    get userId():number {
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

}
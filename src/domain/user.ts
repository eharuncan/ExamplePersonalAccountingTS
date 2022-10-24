import { UserTypes } from "../enums/userTypes";

export class User {

    private _id: number;
    private _type: UserTypes;
    private _name: string;
    private _surname: string;
    private _email: string;
    private _password: string;

    constructor(id: number, type: UserTypes, name: string, surname: string, email: string, password: string) {
        this._id = id;
        this._type = type;
        this._name = name;
        this._surname = surname;
        this._email = email;
        this._password = password;
    }

    //Getters, Setters, Attributes

    get id() {
        return this._id;
    }
    set id(id: number) {
        this._id = id;
    }

    get type() {
        return this._type;
    }
    set type(type: UserTypes) {
        this._type = type;
    }

    get name() {
        return this._name;
    }
    set name(name: string) {
        this._name = name;
    }

    get surname() {
        return this._surname;
    }
    set surname(surname: string) {
        this._surname = surname;
    }

    get email() {
        return this._email;
    }
    set email(email: string) {
        this._email = email;
    }

    get password() {
        return this._password;
    }
    set password(password: string) {
        this._password = password;
    }

}

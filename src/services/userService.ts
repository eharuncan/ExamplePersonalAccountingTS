import { User } from "../domain/user";
import { UserTypes } from "../enums/userTypes";

import { expenseCategoryService } from "../index";

export class UserService {
    private userListDB: Array<User>;
    private _currentUser: User;

    constructor(userListDB: Array<User>) {
        this.userListDB = userListDB;

        this.register("admin", "admin", "admin", "admin", "admin");
        this.register("customer1", "customer1", "1", "1", "1");

        this._currentUser = null as any;;
    }

    public getUsers(): Array<User> {
        return this.userListDB;
    }

    public getUserById(userId: number):User {
        const resultList = this.userListDB
                .filter((user) => {user.id === userId});
        return resultList[0];
    }

    public getUserByEmailAndPassword(email: string, password: string): User {
        const resultList = this.userListDB
                .filter((user) => {user.email === email && user.password === password});
        return resultList[0];
    }

    public register(name: string, surname: string, email: string, password: string, retypedPassword: string): boolean {
            let newUserId;
            let userList = this.userListDB;
            if (userList.length == 0) {
                newUserId = 1;
            } else {
                let lastUser = userList[userList.length - 1];
                newUserId = lastUser.id + 1;
            }

            if (!expenseCategoryService.addDefaultExpenseCategories(newUserId)) {
                return false;
            }

            let selectedUserType;
            if (name =="admin") {
                selectedUserType = UserTypes.ADMIN;
            }else{
                selectedUserType = UserTypes.CUSTOMER;
            }

            let user = new User(newUserId, selectedUserType, name, surname, email, password)

            this.userListDB.push(user);
            this.currentUser = user;
            return true;

    }

    public editUser(user: User, editedUser: User): boolean {
            let index = this.getUsers().indexOf(user);
            this.userListDB[index] = editedUser;
            return true;
    }

    public deleteUser(userId: number): boolean {
        if (userId == 1) {
            return false;
        } else {
            let foundUser = this.getUserById(userId);
            const index = this.userListDB.indexOf(foundUser, 0);
            if (index > -1) {
                this.userListDB.splice(index, 1);
            }
            return true;
        }
    }

    public login(email: string, password: string): boolean {
        if (this.checkUser(email, password)) {
            this.currentUser = this.getUserByEmailAndPassword(email, password);
            return true;
        } else {
            return false;
        }
    }

    public logout(): boolean {
        // Burada user adına tutulan oturum açma bilgileri silinir.
        this.currentUser = null as any;
        return true;
    }

    public checkUser(email: string, password: string): boolean {
        const resultList = this.userListDB
                .filter((user) => {user.email === email && user.password === password});
        if (resultList.length === 0) {
            return false;
        }else{
            return true;
        }
    }

    get currentUser(): User {
        return this._currentUser;
    }
    set currentUser(currentUser: User) {
        this._currentUser = currentUser;
    }
}


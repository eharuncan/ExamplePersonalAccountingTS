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

        this._currentUser = null as any;
    }

    public getUsers(): Array<User> {
        return this.userListDB;
    }

    public getUserById(userId: number): User {
        let resultList = this.userListDB.filter((user) => user.id == userId);
        return resultList[0];
    }

    public getUserByEmailAndPassword(email: string, password: string): User {
        let resultList = this.userListDB.filter((user) => user.email == email && user.password == password );
        return resultList[0];
    }

    public register(name: string, surname: string, email: string, password: string, retypedPassword: string): boolean {

        if(!this.checkPasswords(password, retypedPassword)){
            console.log("Hata: Şifreler uyuşmuyor.");
            return false;
        }
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
        if (name == "admin") {
            selectedUserType = UserTypes.ADMIN;
        } else {
            selectedUserType = UserTypes.CUSTOMER;
        }

        let newUser = new User(newUserId, selectedUserType, name, surname, email, password)
        this.userListDB.push(newUser);
        this.currentUser = newUser;
        console.log(this.currentUser);
        return true;

    }

    public editUser(id: number, editedName: string, editedSurname: string, editedEmail: string, editedPassword: string, retypedPassword: string): boolean {
        if(this.checkPasswords(editedPassword,retypedPassword)){
            console.log("buraya girdi");
            let editedUser = new User(id, UserTypes.CUSTOMER, editedName, editedSurname, editedEmail, editedPassword)
            let index = this.getUsers().indexOf(this.getUserById(id));
            this.userListDB[index] = editedUser;
            this.currentUser = editedUser;
            return true;
        }else{
            return false;
        }
    }

    public deleteUser(userId: number): boolean {
        if (userId == 1) {
            return false;
        } else {
            let foundUser = this.getUserById(userId);
            let index = this.userListDB.indexOf(foundUser, 0);
            if (index > -1) {
                this.userListDB.splice(index, 1);
            }
            return true;
        }
    }

    public login(email: string, password: string): boolean {
        if (this.checkUser(email, password)) {
            this.currentUser = this.getUserByEmailAndPassword(email, password);
            console.log(this.currentUser);
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

    public checkPasswords(password1: string, password2: string): boolean {
        if (password1 == password2) {
            return true;
        } else {
            return false;
        }
    }

    public checkUser(email: string, password: string): boolean {
        let resultList = this.userListDB.filter((user) => user.email == email && user.password == password );
        if (resultList.length == 0) {
            console.log("Hata: Sistemde kayıtlı böyle bir kullanıcı yok.")
            return false;
        } else {
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


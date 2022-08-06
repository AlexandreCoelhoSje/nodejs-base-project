import { User } from "../../entities/User";
import { IUserRepository } from "../../interfaces/repositories/IUserRepository";

export class UserRepository implements IUserRepository {
    
    users: User[];

    constructor() {

        this.users = new Array();

        const user1 = new User();
        user1.userId = 1;
        user1.name = "User Default";
        user1.email = "default@email";
        user1.password = "12345";
        user1.lastLogin = new Date();

        this.users.push(user1);

        const user2 = new User();
        user2.userId = 2;
        user2.name = "User to Update";
        user1.email = "update@email";
        user1.password = "11111";

        this.users.push(user2);

        const user3 = new User();
        user3.userId = 3;
        user3.name = "User to Delete";
        user1.email = "delete@email";
        user1.password = "222222";

        this.users.push(user3);
    }

    async list(name: string = ''): Promise<User[]> {

        return new Promise((resolve, reject) => {

            resolve(this.users.filter((item) => item.name.includes(name)));
        });
    }

    async detail(id: number): Promise<User> {

        return new Promise((resolve, reject) => {

            resolve(this.users.find((item) => item.userId == id));
        });
    }

    async create(user: User): Promise<User> {

        user.userId = this.getID();

        this.users.push(user);

        return new Promise((resolve, reject) => resolve(user));
    }

    async update(user: User): Promise<User> {

        const entityToUpdate = this.users.find((current: User) => user.userId == current.userId);

        entityToUpdate.name = user.name;
        entityToUpdate.email = user.email;
        entityToUpdate.lastLogin = user.lastLogin;

        return new Promise((resolve, rejects) => resolve(entityToUpdate));
    }

    async delete(user: User): Promise<User> {

        const entityFound = this.users.find((current: User) => current.userId == user.userId);

        this.users = this.users.filter((current: User) => current.userId != user.userId);

        return new Promise((resolve, reject) => resolve(entityFound));
    }

    getID(): number {
        
        return this.users.length + 1;
    }
}
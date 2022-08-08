import { User } from "../../entities/User";
import { Role } from "../../entities/Role";
import { UserRole } from "../../entities/UserRole";
import { IUserRepository } from "../../interfaces/repositories/IUserRepository";

export class UserRepository implements IUserRepository {
    
    usersRoles: UserRole[];

    constructor() {

        this.usersRoles = new Array();

        const user1 = new User();
        user1.userId = 1;
        user1.name = "User Default";
        user1.email = "default@email";
        user1.password = "12345";
        user1.lastLogin = new Date();

        const role1 = new Role();
        role1.roleId = 1;
        role1.name = "Admin";

        const role2 = new Role();
        role2.roleId = 2;
        role2.name = "collaborator";

        const userRole1 = new UserRole();
        userRole1.userRoleId = 1;        
        userRole1.roleId = role1.roleId;
        userRole1.role = role1;
        userRole1.userId = user1.userId;
        userRole1.user = user1;

        this.usersRoles.push(userRole1);

        const userRole2 = new UserRole();
        userRole2.userRoleId = 1;        
        userRole2.roleId = role1.roleId;
        userRole2.role = role1;
        userRole2.userId = user1.userId;
        userRole2.user = user1;

        this.usersRoles.push(userRole2);
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
import { User } from "../../entities/User";
import { Role } from "../../entities/Role";
import { UserRole } from "../../entities/UserRole";
import { IUserRoleRepository } from "../../interfaces/repositories/IUserRoleRepository";

export class UserRepository implements IUserRoleRepository {
    
    userRoles: UserRole[];

    constructor() {

        this.userRoles = new Array();

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

        this.userRoles.push(userRole1);

        const userRole2 = new UserRole();
        userRole2.userRoleId = 1;        
        userRole2.roleId = role1.roleId;
        userRole2.role = role1;
        userRole2.userId = user1.userId;
        userRole2.user = user1;

        this.userRoles.push(userRole2);
    }

    async list(userId: number): Promise<UserRole[]> {

        return new Promise((resolve, reject) => {

            resolve(this.userRoles.filter((item) => item.userId == userId));
        });
    }

    async detail(userId: number): Promise<UserRole> {

        return new Promise((resolve, reject) => {

            resolve(this.userRoles.find((item) => item.userId == userId));
        });
    }

    async create(userRole: UserRole): Promise<UserRole> {

        userRole.userId = this.getID();

        this.userRoles.push(userRole);

        return new Promise((resolve, reject) => resolve(userRole));
    }

    async delete(userRole: UserRole): Promise<UserRole> {

        const entityFound = this.userRoles.find((current: UserRole) => current.userRoleId == userRole.userRoleId);

        this.userRoles = this.userRoles.filter((current: UserRole) => current.userRoleId != userRole.userRoleId);

        return new Promise((resolve, reject) => resolve(entityFound));
    }

    getID(): number {
        
        return this.userRoles.length + 1;
    }
}
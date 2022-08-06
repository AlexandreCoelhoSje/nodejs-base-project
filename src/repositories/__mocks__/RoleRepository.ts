import { Role } from "../../entities/Role";
import { IRoleRepository } from "../../interfaces/repositories/IRoleRepository";

export class RoleRepository implements IRoleRepository {
    
    roles: Role[];

    constructor() {

        this.roles = new Array();

        const role1 = new Role();
        role1.roleId = 1;
        role1.name = "Role Default";

        this.roles.push(role1);

        const role2 = new Role();
        role2.roleId = 2;
        role2.name = "Role to Update";

        this.roles.push(role2);

        const role3 = new Role();
        role3.roleId = 3;
        role3.name = "Role to Delete";

        this.roles.push(role3);
    }

    async list(name: string = ''): Promise<Role[]> {

        return new Promise((resolve, reject) => {

            resolve(this.roles.filter((item) => item.name.includes(name)));
        });
    }

    async detail(id: number): Promise<Role> {

        return new Promise((resolve, reject) => {

            resolve(this.roles.find((item) => item.roleId == id));
        });
    }

    async create(role: Role): Promise<Role> {

        role.roleId = this.getID();

        this.roles.push(role);

        return new Promise((resolve, reject) => resolve(role));
    }

    async update(role: Role): Promise<Role> {

        const entityToUpdate = this.roles.find((current: Role) => role.roleId == current.roleId);

        entityToUpdate.name = role.name;

        return new Promise((resolve, rejects) => resolve(entityToUpdate));
    }

    async delete(role: Role): Promise<Role> {

        const entityFound = this.roles.find((current: Role) => current.roleId == role.roleId);

        this.roles = this.roles.filter((current: Role) => current.roleId != role.roleId);

        return new Promise((resolve, reject) => resolve(entityFound));
    }

    getID(): number {
        
        return this.roles.length + 1;
    }
}
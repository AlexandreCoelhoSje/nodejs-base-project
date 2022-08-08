import { Role } from "../entities/Role";
import { RoleRepository } from "../repositories/RoleRepository";

interface IRoleRequest {
    id?: number;
    name?: string;
}
export class RoleService {

    roleRepository: RoleRepository;

    constructor() {

        this.roleRepository = new RoleRepository();
    }

    async list({ name }: IRoleRequest): Promise<Role[]> {

        return await this.roleRepository.list(name);
    }

    async detail(id: number): Promise<Role> {

        const roleFound = await this.roleRepository.detail(id);

        if (!roleFound)
            throw new Error("role not found");

        return roleFound;
    }

    async create({name }: IRoleRequest): Promise<Role> {

        const role = new Role();
        role.name = name;

        return await this.roleRepository.create(role);
    }

    async update({ id, name }: IRoleRequest): Promise<Role> {

        const roleFound = await this.roleRepository.detail(id);

        if (!roleFound)
            throw new Error("role not found");

        return await this.roleRepository.update({...roleFound, name});
    }

    async delete(id: number): Promise<Role> {

        const roleFound = await this.roleRepository.detail(id);

        if (!roleFound)
            throw new Error("role not found");

        return await this.roleRepository.delete(roleFound);
    }
}
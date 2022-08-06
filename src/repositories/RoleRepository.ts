import { Like, Repository } from "typeorm";
import { Role } from "../entities/Role";
import { AppDataSource } from "../database/data-source";
import { IRoleRepository } from "../interfaces/repositories/IRoleRepository";

export class RoleRepository implements IRoleRepository {

    roleRepository: Repository<Role>;

    constructor() {

        this.roleRepository = AppDataSource.getRepository(Role);
    }

    async list(name?: string): Promise<Role[]> {

        return await this.roleRepository.find({
            where: {
                name: name ? Like("%" + name + "%") : undefined
            }
        });
    }

    async detail(id: number): Promise<Role> {

        return await this.roleRepository.findOneBy({ roleId: id });
    }

    async create(role: Role): Promise<Role> {

        return await this.roleRepository.save(role);
    }

    async update(role: Role): Promise<Role> {

        return await this.roleRepository.save(role);
    }

    async delete(role: Role): Promise<Role> {

        return this.roleRepository.remove(role);
    }
}
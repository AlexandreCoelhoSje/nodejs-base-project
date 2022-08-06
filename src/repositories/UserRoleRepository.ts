import { Like, Repository } from "typeorm";
import { UserRole } from "../entities/UserRole";
import { AppDataSource } from "../database/data-source";
import { IUserRoleRepository } from "../interfaces/repositories/IUserRoleRepository";

export class UserRoleRepository implements IUserRoleRepository {

    userRoleRepository: Repository<UserRole>;

    constructor() {

        this.userRoleRepository = AppDataSource.getRepository(UserRole);
    }

    async list(name?: string): Promise<UserRole[]> {

        return await this.userRoleRepository.find({
            where: {
                name: name ? Like("%" + name + "%") : undefined
            }
        });
    }

    async detail(id: number): Promise<UserRole> {

        return await this.userRoleRepository.findOneBy({ userRoleId: id });
    }

    async create(userRole: UserRole): Promise<UserRole> {

        return await this.userRoleRepository.save(userRole);
    }

    async update(userRole: UserRole): Promise<UserRole> {

        return await this.userRoleRepository.save(userRole);
    }

    async delete(userRole: UserRole): Promise<UserRole> {

        return this.userRoleRepository.remove(userRole);
    }
}
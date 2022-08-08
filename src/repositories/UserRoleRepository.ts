import { Like, Repository } from "typeorm";
import { UserRole } from "../entities/UserRole";
import { AppDataSource } from "../database/data-source";
import { IUserRoleRepository } from "../interfaces/repositories/IUserRoleRepository";

export class UserRoleRepository implements IUserRoleRepository {

    userRoleRepository: Repository<UserRole>;

    constructor() {

        this.userRoleRepository = AppDataSource.getRepository(UserRole);
    }

    async list(userId: number): Promise<UserRole[]> {

        return await this.userRoleRepository.find({
            relations: {
                user: true,
                role: true
            },
            where: {
                userRoleId: userId
            }
        });
    }

    async detail(userRoleId: number): Promise<UserRole> {

        return await this.userRoleRepository.findOne({
            relations: {
                user: true,
                role: true
            },
            where: {
                userRoleId
            }
        });
    }

    async create(userRole: UserRole): Promise<UserRole> {

        return await this.userRoleRepository.save(userRole);
    }

    async delete(userRole: UserRole): Promise<UserRole> {

        return this.userRoleRepository.remove(userRole);
    }
}
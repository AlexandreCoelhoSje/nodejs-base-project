import { Like, Repository } from "typeorm";
import { User } from "../entities/User";
import { AppDataSource } from "../database/data-source";
import { IUserRepository } from "../interfaces/repositories/IUserRepository";

export class UserRepository implements IUserRepository {

    userRepository: Repository<User>;

    constructor() {

        this.userRepository = AppDataSource.getRepository(User);
    }

    async list(name?: string): Promise<User[]> {

        return await this.userRepository.find({
            where: {
                name: name ? Like("%" + name + "%") : undefined
            }
        });
    }

    async detail(id: number): Promise<User> {

        return await this.userRepository.findOneBy({ userId: id });
    }

    async create(user: User): Promise<User> {

        return await this.userRepository.save(user);
    }

    async update(user: User): Promise<User> {

        return await this.userRepository.save(user);
    }

    async delete(user: User): Promise<User> {

        return this.userRepository.remove(user);
    }
}
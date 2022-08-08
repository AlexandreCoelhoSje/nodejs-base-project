import { User } from "../entities/User";
import { UserRepository } from "../repositories/UserRepository";

interface IUserRequest {
    id?: number;
    name?: string;
    email?: string;
    password?: string;
}
export class UserService {

    userRepository: UserRepository;

    constructor() {

        this.userRepository = new UserRepository();
    }

    async list({ name }: IUserRequest): Promise<User[]> {

        return await this.userRepository.list(name);
    }

    async detail(id: number): Promise<User> {

        const userFound = await this.userRepository.detail(id);

        if (!userFound)
            throw new Error("user not found");

        return userFound;
    }

    async create({name, email, password }: IUserRequest): Promise<User> {

        const user = new User();
        user.name = name;
        user.email = email;
        user.password = password;

        return await this.userRepository.create(user);
    }

    async update({ id, name }: IUserRequest): Promise<User> {

        const userFound = await this.userRepository.detail(id);

        if (!userFound)
            throw new Error("user not found");

        return await this.userRepository.update({...userFound, name});
    }

    async delete(id: number): Promise<User> {

        const userFound = await this.userRepository.detail(id);

        if (!userFound)
            throw new Error("user not found");

        return await this.userRepository.delete(userFound);
    }
}
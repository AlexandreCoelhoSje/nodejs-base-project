import { User } from "../../entities/User";

export interface IUserRepository {

    list: (name: string) => Promise<User[]>;

    detail: (id: number) => Promise<User>;

    create: (user: User) => Promise<User>;

    update: (user: User) => Promise<User>;

    delete: (user: User) => Promise<User>;
}
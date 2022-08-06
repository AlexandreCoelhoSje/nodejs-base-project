import { Role } from "../../entities/Role";

export interface IRoleRepository {

    list: (name: string) => Promise<Role[]>;

    detail: (id: number) => Promise<Role>;

    create: (role: Role) => Promise<Role>;

    update: (role: Role) => Promise<Role>;

    delete: (role: Role) => Promise<Role>;
}
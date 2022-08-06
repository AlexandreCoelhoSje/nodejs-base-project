import { UserRole } from "../../entities/UserRole";

export interface IUserRoleRepository {

    list: (name: string) => Promise<UserRole[]>;

    detail: (id: number) => Promise<UserRole>;

    create: (userRole: UserRole) => Promise<UserRole>;

    update: (userRole: UserRole) => Promise<UserRole>;

    delete: (userRole: UserRole) => Promise<UserRole>;
}
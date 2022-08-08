import { UserRole } from "../../entities/UserRole";

export interface IUserRoleRepository {

    list: (userId: number) => Promise<UserRole[]>;

    detail: (userRoleId: number) => Promise<UserRole>;

    create: (userRole: UserRole) => Promise<UserRole>;

    delete: (userRole: UserRole) => Promise<UserRole>;
}
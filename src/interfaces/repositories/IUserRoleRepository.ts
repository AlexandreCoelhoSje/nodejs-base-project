import { UserRole } from "../../entities/UserRole";

interface IFilterUserRole {
    userId?: number;
    roleId?: number;
}
interface IUserRoleRepository {

    list: ({ userId, roleId }: IFilterUserRole) => Promise<UserRole[]>;

    detail: (userRoleId: number) => Promise<UserRole>;

    create: (userRole: UserRole) => Promise<UserRole>;

    delete: (userRole: UserRole) => Promise<UserRole>;
}

export { IFilterUserRole, IUserRoleRepository }
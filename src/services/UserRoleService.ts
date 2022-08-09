import { User } from "../entities/User";
import { Role } from "../entities/Role";
import { UserRole } from "../entities/UserRole";

import { UserRoleRepository } from "../repositories/UserRoleRepository";

interface IUserRoleRequest {
    userRoleId?: number;
    userId?: number;
    roleId?: number;
}
export class UserRoleService {

    userRoleRepository: UserRoleRepository;

    constructor() {

        this.userRoleRepository = new UserRoleRepository();
    }

    async list(userId: number): Promise<UserRole[]> {

        const filtro = { userId: "", roleId: "" };

        return await this.userRoleRepository.list(filtro);
    }

    async detail(id: number): Promise<UserRole> {

        const userRoleFound = await this.userRoleRepository.detail(id);

        if (!userRoleFound)
            throw new Error("user role not found");

        return userRoleFound;
    }

    async create({userId, roleId }: IUserRoleRequest): Promise<UserRole> {

        //verificar se o usuario ja tem a funcao
        
        const userRole = new UserRole();
        userRole.userId = userId;
        userRole.roleId = roleId;

        return await this.userRoleRepository.create(userRole);
    }

    async delete(id: number): Promise<UserRole> {

        const userRoleFound = await this.detail(id);

        return await this.userRoleRepository.delete(userRoleFound);
    }
}
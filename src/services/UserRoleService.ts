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

    async list({ userId, roleId }: IUserRoleRequest): Promise<UserRole[]> {
       
        return await this.userRoleRepository.list({ userId, roleId });
    }

    async detail(id: number): Promise<UserRole> {

        const userRoleFound = await this.userRoleRepository.detail(id);

        if (!userRoleFound)
            throw new Error("user role not found");

        return userRoleFound;
    }

    async create({userId, roleId }: IUserRoleRequest): Promise<UserRole> {

        const userRoleAlreadyExists = await this.userRoleRepository.list({userId, roleId});
        
        if (userRoleAlreadyExists.length > 0)
            throw new Error("the user already has the role");
        
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
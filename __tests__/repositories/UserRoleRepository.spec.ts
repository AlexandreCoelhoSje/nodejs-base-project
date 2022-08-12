jest.mock("../../src/database/data-source");
jest.mock("../../src/database/index");

import { AppDataSource } from "../../src/database";

import { User } from "../../src/entities/User";
import { UserRepository } from "../../src/repositories/UserRepository";

import { Role } from "../../src/entities/Role";
import { RoleRepository } from "../../src/repositories/RoleRepository";

import { UserRole } from "../../src/entities/UserRole";
import { UserRoleRepository } from "../../src/repositories/UserRoleRepository";

describe("test UserRoleRepository", () => {

    beforeAll(async () => {

        return await AppDataSource.initialize().then(async () => {

            await AppDataSource.dropDatabase();
            await AppDataSource.runMigrations();

        }).catch(error => console.log(error));
    });

    it('Create user role', async () => {

        let user = new User();
        user.name = "User Default";
        user.email = "default@email";
        user.password = "12345";
        user.lastLogin = new Date();

        const userRepository = new UserRepository();
        user = await userRepository.create(user);

        let roleAdm = new Role();
        roleAdm.name = "Admin";

        let roleCollab = new Role();
        roleCollab.name = "collaborator";

        const roleRepository = new RoleRepository();
        roleAdm = await roleRepository.create(roleAdm);
        roleCollab = await roleRepository.create(roleCollab);
        
        let userRoleAdm = new UserRole();
        userRoleAdm.roleId = roleAdm.roleId;
        userRoleAdm.userId = user.userId;

        let userRoleCollab = new UserRole();
        userRoleCollab.roleId = roleAdm.roleId;
        userRoleCollab.userId = user.userId;

        const userRoleRepository = new UserRoleRepository();
        userRoleAdm = await userRoleRepository.create(userRoleAdm);
        userRoleCollab = await userRoleRepository.create(userRoleCollab);
        
        expect(userRoleAdm).toHaveProperty("userRoleId");
        expect(userRoleCollab).toHaveProperty("userRoleId");

        expect(userRoleAdm.userRoleId).toBeGreaterThan(0);
        expect(userRoleCollab.userRoleId).toBeGreaterThan(0);
    });

    it('List user with return', async () => {

        const userRoleRepository = new UserRoleRepository();

        const userRole = await userRoleRepository.list({userId: 1});

        expect(userRole).not.toBeNull();
        expect(userRole.length).toBeGreaterThanOrEqual(1);
        expect(userRole[0].user.name).toBe('User Default');
    });

    it('List user without return', async () => {

        const userRoleRepository = new UserRoleRepository();

        const users = await userRoleRepository.list({userId: 0});

        expect(users.length).toBe(0);
    });

    it('Detail user role', async () => {
        
        const userRoleRepository = new UserRoleRepository();

        const userRoleFound = await userRoleRepository.detail(1);
        expect(userRoleFound).not.toBeNull();
        expect(userRoleFound).toHaveProperty("userRoleId");
     
        const userNotFound = await userRoleRepository.detail(0);
        expect(userNotFound).toBeNull();
    });

    it('Delete user role', async () => {

        const userRoleRepository = new UserRoleRepository();
        
        let newUserRole = new UserRole();
        newUserRole.roleId = 1;
        newUserRole.userId = 1;

        newUserRole = await userRoleRepository.create(newUserRole);
        
        expect(newUserRole).toHaveProperty("userRoleId");

        const userRoleFound = await userRoleRepository.delete(newUserRole);

        expect(userRoleFound).toBe(newUserRole);
    });
});
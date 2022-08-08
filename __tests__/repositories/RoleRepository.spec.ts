jest.mock("../../src/database/data-source");
jest.mock("../../src/database/index");

import { AppDataSource } from "../../src/database";
import { Role } from "../../src/entities/Role";
import { RoleRepository } from "../../src/repositories/RoleRepository";

describe("test RoleRepository", () => {

    beforeAll(async () => {

        return await AppDataSource.initialize().then(async () => {

            //recreates the database at each test run
            await AppDataSource.dropDatabase();
            await AppDataSource.runMigrations();

        }).catch(error => console.log(error));
    });

    it("Create Role", async () => {

        const roleRepository = new RoleRepository();

        const role = new Role();
        role.name = "Administrator";

        const newRole = await roleRepository.create(role);

        expect(newRole).toHaveProperty("roleId");
    });

    it("List role", async () => {

        const roleRepository = new RoleRepository();

        const roles = await roleRepository.list();

        expect(roles).not.toBeNull();

        expect(roles.length).toBeGreaterThanOrEqual(1);
    });

    it("List role with filter", async () => {

        const roleRepository = new RoleRepository();

        //filter with return
        const rolesFound = await roleRepository.list("Administrator");

        expect(rolesFound.length).toBe(1);
        expect(rolesFound[0].name).toBe("Administrator");

        //no return filter
        const roles = await roleRepository.list("Role Not Exists");

        expect(roles.length).toBe(0);
    });

    it("Detail role", async () => {

        const roleRepository = new RoleRepository();

        //record found
        const roleFound = await roleRepository.detail(1);

        expect(roleFound).not.toBeNull();
        expect(roleFound).toHaveProperty("roleId");

        //register not found
        const roleNotFound = await roleRepository.detail(0);

        expect(roleNotFound).toBeNull();
    });

    it("Update role", async () => {

        const roleRepository = new RoleRepository();

        //create role
        const role = new Role();
        role.name = "Assistant";

        const newRole = await roleRepository.create(role);

        //update role
        const roleUpdated = await roleRepository.update({ ...newRole, name: "Assistant - Edited" });

        expect(roleUpdated.name).toBe("Assistant - Edited");
    });

    it("delete role", async () => {

        const roleRepository = new RoleRepository();

        //create role
        const role = new Role();
        role.name = "Assistant";

        const newRole = await roleRepository.create(role);

        //delete role
        const roleFound = await roleRepository.delete(role);

        expect(roleFound).toBe(newRole);
    });
});
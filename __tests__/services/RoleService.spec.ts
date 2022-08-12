jest.mock("../../src/repositories/RoleRepository");

import { Role } from "../../src/entities/Role";
import { RoleService } from "../../src/services/RoleService";

describe("test RoleService", () => {

    it("list role", async () => {

        const roleService = new RoleService();

        const list = await roleService.list({});

        expect(list.length).toBeGreaterThanOrEqual(1);

        expect(list[0]).toBeInstanceOf(Role);
    });

    it("list role with filter", async () => {

        const roleService = new RoleService();

        const list = await roleService.list({ name: "Role Default"});

        expect(list.length).toBe(1);
    });

    it("list role with filters returning empty list", async () => {

        const roleService = new RoleService();

        const emptyList = await roleService.list({name: "name does not exist"});

        expect(emptyList.length).toBe(0);
    });

    it("detail role", async () => {

        const roleService = new RoleService();
       
        const role = await roleService.detail(1);
        
        expect(role).toHaveProperty("roleId");
        expect(role.roleId).toBe(1);
    });

    it("try to detail role that does not exist", async () => {

        const roleService = new RoleService();
               
        expect(roleService.detail(0)).rejects.toThrow("role not found");
    });

    it("create role", async () => {

        const roleService = new RoleService();

        const role = {
            name: "Vin Diesel",
            email: "vindiesel@email.com",
            password: "12345"
        };

        const newRole = await roleService.create(role);

        expect(newRole).toHaveProperty("roleId");
    });

    it("update role", async () => {

        const roleService = new RoleService();

        const role = {
            id: 2,
            name: "Role to Update - Edited",
        };

        const roleUpdated = await roleService.update(role);

        expect(roleUpdated.name).toBe("Role to Update - Edited");
    });

    it("try to update role that does not exist", async () => {

        const roleService = new RoleService();

        const role = {
            id: 0,
            name: ""
        };

        expect(roleService.update(role)).rejects.toThrow("role not found");
    });

    it("delete role successfully", async () => {

        const roleService = new RoleService();

        const roleDeleted = await roleService.delete(3);

        expect(roleDeleted).not.toBeNull();
    });

    it("try to delete role that does not exist", async () => {
        
        const roleService = new RoleService();

        expect(roleService.delete(0)).rejects.toThrow("role not found");
    });
});
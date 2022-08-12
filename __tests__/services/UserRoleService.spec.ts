jest.mock("../../src/repositories/UserRoleRepository");

import { UserRole } from "../../src/entities/UserRole";
import { UserRoleService } from "../../src/services/UserRoleService";

describe("test UserRoleService", () => {

    it("list userRole", async () => {

        const userRoleService = new UserRoleService();

        const list = await userRoleService.list({});

        expect(list.length).toBeGreaterThanOrEqual(1);

        expect(list[0]).toBeInstanceOf(UserRole);
    });

    it("list userRole with filter", async () => {

        const userRoleService = new UserRoleService();

        const list = await userRoleService.list({ userId: 1, roleId: 1});

        expect(list.length).toBe(1);
        expect(list[0].userId).toBe(1);
    });

    // it("list userRole with filters returning empty list", async () => {

    //     const userRoleService = new UserRoleService();

    //     const emptyList = await userRoleService.list({name: "name does not exist"});

    //     expect(emptyList.length).toBe(0);
    // });

    // it("detail userRole", async () => {

    //     const userRoleService = new UserRoleService();
       
    //     const userRole = await userRoleService.detail(1);
        
    //     expect(userRole).toHaveProperty("userRoleId");
    //     expect(userRole.userRoleId).toBe(1);
    // });

    // it("try to detail userRole that does not exist", async () => {

    //     const userRoleService = new UserRoleService();
               
    //     expect(userRoleService.detail(0)).rejects.toThrow("userRole not found");
    // });

    // it("create userRole", async () => {

    //     const userRoleService = new UserRoleService();

    //     const userRole = {
    //         name: "Vin Diesel",
    //         email: "vindiesel@email.com",
    //         password: "12345"
    //     };

    //     const newUserRole = await userRoleService.create(userRole);

    //     expect(newUserRole).toHaveProperty("userRoleId");
    // });

    // it("update userRole", async () => {

    //     const userRoleService = new UserRoleService();

    //     const userRole = {
    //         id: 2,
    //         name: "UserRole to Update - Edited",
    //     };

    //     const userRoleUpdated = await userRoleService.update(userRole);

    //     expect(userRoleUpdated.name).toBe("UserRole to Update - Edited");
    // });

    // it("try to update userRole that does not exist", async () => {

    //     const userRoleService = new UserRoleService();

    //     const userRole = {
    //         id: 0,
    //         name: ""
    //     };

    //     expect(userRoleService.update(userRole)).rejects.toThrow("userRole not found");
    // });

    // it("delete userRole successfully", async () => {

    //     const userRoleService = new UserRoleService();

    //     const userRoleDeleted = await userRoleService.delete(3);

    //     expect(userRoleDeleted).not.toBeNull();
    // });

    // it("try to delete userRole that does not exist", async () => {
        
    //     const userRoleService = new UserRoleService();

    //     expect(userRoleService.delete(0)).rejects.toThrow("userRole not found");
    // });
});
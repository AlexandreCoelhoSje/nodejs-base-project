jest.mock("../../src/repositories/UserRepository");

import { User } from "../../src/entities/User";
import { UserService } from "../../src/services/UserService";

describe("test UserService", () => {

    it("list user", async () => {

        const userService = new UserService();

        const list = await userService.list({});

        expect(list.length).toBeGreaterThanOrEqual(1);

        expect(list[0]).toBeInstanceOf(User);
    });

    it("list user with filter", async () => {

        const userService = new UserService();

        const list = await userService.list({ name: "User Default"});

        expect(list.length).toBe(1);
        expect(list[0].name).toBe("User Default");
    });

    it("list user with filters returning empty list", async () => {

        const userService = new UserService();

        const emptyList = await userService.list({name: "name does not exist"});

        expect(emptyList.length).toBe(0);
    });

    it("detail user", async () => {

        const userService = new UserService();
       
        const user = await userService.detail(1);
        
        expect(user).toHaveProperty("userId");
        expect(user.userId).toBe(1);
    });

    it("try to detail user that does not exist", async () => {

        const userService = new UserService();
               
        expect(userService.detail(0)).rejects.toThrow("user not found");
    });

    it("create user", async () => {

        const userService = new UserService();

        const user = {
            name: "Vin Diesel",
            email: "vindiesel@email.com",
            password: "12345"
        };

        const newUser = await userService.create(user);

        expect(newUser).toHaveProperty("id");
    });

    it("update user", async () => {

        const userService = new UserService();

        const user = {
            id: 2,
            name: "User to Update - Edited",
        };

        const userUpdated = await userService.update(user);

        expect(userUpdated.name).toBe("User to Update - Edited");
    });

    it("try to update user that does not exist", async () => {

        const userService = new UserService();

        const user = {
            id: 0,
            name: ""
        };

        expect(userService.update(user)).rejects.toThrow("user not found");
    });

    it("delete user successfully", async () => {

        const userService = new UserService();

        const userDeleted = await userService.delete(3);

        expect(userDeleted).not.toBeNull();
    });

    it("try to delete user that does not exist", async () => {
        
        const userService = new UserService();

        expect(userService.delete(0)).rejects.toThrow("user not found");
    });
});
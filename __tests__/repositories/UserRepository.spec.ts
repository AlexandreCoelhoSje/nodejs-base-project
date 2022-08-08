jest.mock("../../src/database/data-source");
jest.mock("../../src/database/index");

import { AppDataSource } from "../../src/database";
import { User } from "../../src/entities/User";
import { UserRepository } from "../../src/repositories/UserRepository";

describe("test UserRepository", () => {

    beforeAll(async () => {

        return await AppDataSource.initialize().then(async () => {

            await AppDataSource.dropDatabase();
            await AppDataSource.runMigrations();

        }).catch(error => console.log(error));
    });

    it("Create User", async () => {

        const userRepository = new UserRepository();

        const user = new User();
        user.name = "Alexandre Coelho";
        user.email = "alexandre@email.com";
        user.password = "12345";
        user.lastLogin = new Date();

        const newUser = await userRepository.create(user);

        expect(newUser).toHaveProperty("userId");
        expect(newUser.userId).toBeGreaterThan(0);
    });

    it("List user", async () => {

        const userRepository = new UserRepository();

        const users = await userRepository.list();

        expect(users).not.toBeNull();

        expect(users.length).toBeGreaterThanOrEqual(1);
    });

    it("List user with filter and at least one return", async () => {

        const userRepository = new UserRepository();

        const usersFound = await userRepository.list("Alexandre");

        expect(usersFound.length).toBe(1);
        expect(usersFound[0].name).toBe("Alexandre Coelho");
    });

    it("List user with filter and empty return", async () => {

        const userRepository = new UserRepository();

        const users = await userRepository.list("User Not Exists");

        expect(users.length).toBe(0);
    });

    it("Detail user", async () => {

        const userRepository = new UserRepository();

        const userFound = await userRepository.detail(1);
        expect(userFound).not.toBeNull();
        expect(userFound).toHaveProperty("userId");
     
        const userNotFound = await userRepository.detail(0);
        expect(userNotFound).toBeNull();
    });

    it("Update user", async () => {

        const userRepository = new UserRepository();

        const user = new User();
        user.name = "João";
        user.email = "joao@email.com";
        user.password = "12345";
        user.lastLogin = new Date();

        const newUser = await userRepository.create(user);

        const userUpdated = await userRepository.update({ ...newUser, name: "João - Edited" });

        expect(userUpdated.name).toBe("João - Edited");
    });

    it("delete user", async () => {

        const userRepository = new UserRepository();

        const user = new User();
        user.name = "Maria";
        user.email = "maria@email.com";
        user.password = "12345";
        user.lastLogin = new Date();

        const newUser = await userRepository.create(user);

        const userFound = await userRepository.delete(user);

        expect(userFound).toBe(newUser);
    });
});
import { Request, Response } from "express";
import { UserService } from "../services/UserService";

export class UserController {

    async list(request: Request, response: Response) {

        const userService = new UserService();

        //checks if the filter parameter has been assigned
        const name = request.query.name ? request.query.name.toString() : undefined;

        const users = await userService.list({ name });

        return response.json(users);
    }

    async detail(request: Request, response: Response) {

        const userService = new UserService();

        const { id } = request.params;

        const user = await userService.detail(parseInt(id));

        if (user)
            return response.json(user);
        else
            return response.status(404).send();
    }

    async create(request: Request, response: Response) {

        const userService = new UserService();

        const { name } = request.body;

        const user = await userService.create({ name });

        return response.status(201).json(user);
    }

    async update(request: Request, response: Response) {

        const userService = new UserService();

        const { id, name } = request.body;

        await userService.update({ id: parseInt(id), name });

        return response.status(204).json();
    }

    async delete(request: Request, response: Response) {

        const userService = new UserService();

        const { id } = request.params;

        await userService.delete(parseInt(id));

        return response.status(204).json();
    }
}
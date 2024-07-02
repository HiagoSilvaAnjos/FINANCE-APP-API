import "dotenv/config.js";
import express from "express";
import {
    CreateUserController,
    GetUserByIdController,
    UpdateUserController,
    DeleteUserController
} from "./src/controllers/index.js";


const app = express();

app.use(express.json());

app.post("/api/users", async (req, res) => {
    const createUserController = new CreateUserController();

    const createUserResponse = await createUserController.execute(req);

    res.status(createUserResponse.statusCode).send(createUserResponse.body);
});

app.patch("/api/users/:userId", async (req, res) => {
    const updateUserController = new UpdateUserController();

    const updateUserResponse = await updateUserController.execute(req);

    res.status(updateUserResponse.statusCode).send(updateUserResponse.body);
});

app.delete("/api/users/:userId", async (req, res) => {
    const deleteUserController = new DeleteUserController();

    const deleteUserResponse = await deleteUserController.execute(req);

    res.status(deleteUserResponse.statusCode).send(deleteUserResponse.body);
});

app.get("/api/users/:userId", async (req, res) => {
    const getUserByIdController = new GetUserByIdController();

    const getUserByIdResponse = await getUserByIdController.execute(req);

    res.status(getUserByIdResponse.statusCode).send(getUserByIdResponse.body);
});

app.listen(5454, () => console.log("listening on port 5454"));
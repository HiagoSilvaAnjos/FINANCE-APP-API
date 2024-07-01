import "dotenv/config.js";
import express from "express";
import { CreateUserController } from "./src/controllers/create-user.js";
import { GetUserByIdController } from "./src/controllers/get-user-by-id.js";

const app = express();

app.use(express.json());

app.post("/api/users", async (req, res) => {
    const createUserController = new CreateUserController();

    const createUserResponse = await createUserController.execute(req);

    res.status(createUserResponse.statusCode).send(createUserResponse.body);
});

app.get("/api/users/:userId", async (req, res) => {
    const getUserByIdController = new GetUserByIdController();

    const getUserByIdResponse = await getUserByIdController.execute(req);

    res.status(getUserByIdResponse.statusCode).send(getUserByIdResponse.body);
});

app.listen(5454, () => console.log("listening on port 5454"));
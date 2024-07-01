import "dotenv/config.js";
import express from "express";
import { CreateUserController } from "./src/controllers/create-user.js";

const app = express();

app.use(express.json());

app.post("/api/users", async (req, res) => {
    const createUserController = new CreateUserController();

    const createUserResponse = await createUserController.execute(req);

    res.status(createUserResponse.statusCode).send(createUserResponse.body);
});

app.listen(5454, () => console.log("listening on port 5454"));
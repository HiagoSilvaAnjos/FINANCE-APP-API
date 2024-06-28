import "dotenv/config.js";
import express from "express";

const app = express();

app.use(express.json());

app.listen(5454, () => console.log("listening on port 5454"));
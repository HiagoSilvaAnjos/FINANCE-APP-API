import validator from "validator";
import { badRequest } from "../helpers/http.js";

export const invalidPasswordResponse = () =>
    badRequest({
        message: "Password must be at least 6 characters"
    });


export const invalidEmailResponse = () =>
    badRequest({
        message: "Invalid email"
    });


export const invalidIdResponse = () =>
    badRequest({
        message: "The provid id is not valid."
    });

export const checkIfPasswordIsValid = (password) => password.length >= 6;

export const checkIfEmailIsValid = (email) => validator.isEmail(email);

export const checkIfIdIsValid = (id) => validator.isUUID(id);
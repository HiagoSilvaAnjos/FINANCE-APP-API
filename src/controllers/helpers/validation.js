import validator from "validator";
import { badRequest } from "./http.js";

export const checkIfIdIsValid = (id) => validator.isUUID(id);


export const invalidIdResponse = () =>
    badRequest({
        message: "The provid id is not valid."
    });

export const requiredFieldsIsMissingResponse = (missingField) => {
    return badRequest({
        message: `The field ${missingField} is required`,
    });
};

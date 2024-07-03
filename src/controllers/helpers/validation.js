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

export const checkIfIsString = value => typeof value === "string";

export const validateRequiredFields = (params, requiredFields) => {
    for (const field of requiredFields) {
        const fieldIsMissing = !params[field];
        const fiedIsEmpty = checkIfIsString(params[field]) && validator.isEmpty(params[field], {
            ignore_whitespace: true,
        });

        if (fieldIsMissing || fiedIsEmpty) {
            return {
                missingField: field,
                ok: false,
            };
        }
    }

    return {
        ok: true,
        missingField: undefined,
    };
};
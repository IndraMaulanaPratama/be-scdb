import {ErrorResponse} from "../utils/error-response/error-response-util.js";
// import { addNewValidation } from "./role-validation.js";

export const validate = (schema, request) => {
    const result = schema.validate(request, { allowUnknown: false, abortEarly: false })

    if (result.error) {
        throw new ErrorResponse(400, result.error.message)
    } else {
        return result.value
    }
}
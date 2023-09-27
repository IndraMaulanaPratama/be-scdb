import joi from "joi";

export const addNewBiroValidation = joi.object({
    nama: joi.string().max(200).required()
})
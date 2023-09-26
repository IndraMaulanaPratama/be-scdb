import joi from "joi";

export const addNewLembagaValidation = joi.object({
    nama: joi.string().max(200).required()
})
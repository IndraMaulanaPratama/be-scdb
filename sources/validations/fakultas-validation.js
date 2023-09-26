import joi from "joi";

export const addNewFakultasValidation = joi.object({
    nama: joi.string().max(200).required()
})
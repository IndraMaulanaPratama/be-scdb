import joi from "joi";

export const addNewSatuanValidation = joi.object({
    nama: joi.string().max(200).required()
})
import joi from "joi";

export const addNewValidation = joi.object(
    {
        nama: joi.string().max(150).required(),
    }
)

export const updateValidation = joi.object(
    {
        id: joi.string().max(255).required(),
        nama: joi.string().max(150).required(),
    }
)
import joi from "joi";

export const validateAddAppLocation = joi.object(
    {
        aplikasi: joi.string().max(255).required(),
        satuan_kerja: joi.string().max(200).required()
    }
)

export const validateUpdateAppLocation = joi.object(
    {
        aplikasi: joi.string().max(255).required(),
        satuan_kerja: joi.string().max(200).required(),
        status: joi.string().max(10).required(),
    }
)
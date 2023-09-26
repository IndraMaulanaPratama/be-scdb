import joi from "joi";

export const addNewSatkerValidation = joi.object({
    lembaga: joi.string().max(36),
    fakultas: joi.string().max(36),
    biro: joi.string().max(36),
    satuan: joi.string().max(36),
    nama: joi.string().max(200).required(),
})
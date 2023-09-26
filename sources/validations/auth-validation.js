import joi from "joi";

export const addNewValidation = joi.object({
    // User
    email: joi.string().email().max(150).required(),
    username: joi.string().max(150).required(),
    password: joi.string().max(255).required(),
    peran: joi.string().max(255).required(),

    // Profile
    nama: joi.string().max(100).required(),
    alamat: joi.string().required(),
    jenis_kelamin: joi.bool().required(),
    nomor_telepon: joi.string().max(15).required(),
})

export const updateValidation = joi.object({
    // User
    username: joi.string().max(150).required(),
    password: joi.string().max(255).required(),
    peran: joi.string().max(255).required(),

    // Profile
    nama: joi.string().max(100).required(),
    alamat: joi.string().required(),
    jenis_kelamin: joi.bool().required(),
    nomor_telepon: joi.string().max(15).required(),
})

export const loginValidation = joi.object({
    email: joi.string().email().max(150).required(),
    password: joi.string().max(255).required(),
})
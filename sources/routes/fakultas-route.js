import { Router } from "express";
import { authMiddleware } from "../middlewares/auth-middleware.js";
import {
    addNew,
    deleteData,
    getAll, getById, restoreData, updateData
} from "../controllers/fakultas-controller.js";

// nangtoskeun istilah
export const fakultasRoute = Router()

fakultasRoute.get(`/:status`, authMiddleware, getAll)
fakultasRoute.get(`/:status/:id`, getById)
fakultasRoute.post(`/`, addNew)
fakultasRoute.patch(`/:id`, updateData)
fakultasRoute.delete(`/:id`, deleteData)
fakultasRoute.patch(`/restore/:id`, restoreData)
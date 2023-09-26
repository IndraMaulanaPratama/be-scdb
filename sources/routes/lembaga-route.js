import { Router } from "express";
import { authMiddleware } from "../middlewares/auth-middleware.js";
import {
    addNew,
    deleteData,
    getAll, getById, restoreData, updateData
} from "../controllers/lembaga-controller.js";

// nangtoskeun istilah
export const lembagaRoute = Router()

lembagaRoute.get(`/:status`, authMiddleware, getAll)
lembagaRoute.get(`/:status/:id`, authMiddleware, getById)
lembagaRoute.post(`/`, authMiddleware, addNew)
lembagaRoute.patch(`/:id`, authMiddleware, updateData)
lembagaRoute.delete(`/:id`, authMiddleware, deleteData)
lembagaRoute.patch(`/restore/:id`, authMiddleware, restoreData)
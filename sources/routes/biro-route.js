import { Router } from "express";
import { authMiddleware } from "../middlewares/auth-middleware.js";
import {
    addNew,
    deleteData,
    getAll, 
    getById, 
    restoreData, 
    updateData
} from "../controllers/biro-controller.js";

// nangtoskeun istilah
export const biroRoute = Router()

biroRoute.get(`/:status`, authMiddleware, getAll)
biroRoute.get(`/:status/:id`, authMiddleware, getById)
biroRoute.post(`/`, authMiddleware, addNew)
biroRoute.patch(`/:id`, authMiddleware, updateData)
biroRoute.delete(`/:id`, authMiddleware, deleteData)
biroRoute.patch(`/restore/:id`, authMiddleware, restoreData)
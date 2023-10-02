import { Router } from "express";
import { authMiddleware } from "../middlewares/auth-middleware.js";
import {
    addNew,
    deleteData,
    getAll,
    getById,
    restoreData,
    updateData
} from "../controllers/satuan-controller.js";

// nangtoskeun istilah
export const satuanRoute = Router()

satuanRoute.get(`/:status`, authMiddleware, getAll)
satuanRoute.get(`/:status/:id`, authMiddleware, getById)
satuanRoute.post(`/`, authMiddleware, addNew)
satuanRoute.patch(`/:id`, authMiddleware, updateData)
satuanRoute.delete(`/:id`, authMiddleware, deleteData)
satuanRoute.patch(`/restore/:id`, authMiddleware, restoreData)
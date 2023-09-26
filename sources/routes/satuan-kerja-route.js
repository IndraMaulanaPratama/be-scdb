import { Router } from "express";
import { authMiddleware } from "../middlewares/auth-middleware.js";
import { createData, deleteData, getAll, getDataById, updateData } from "../controllers/satuan-kerja-controller.js"

// nangtoskeun istilah
export const satkerRoute = Router()

satkerRoute.get(`/:status`, authMiddleware, getAll)
satkerRoute.get(`/data/:id`, authMiddleware, getDataById)
satkerRoute.post(`/`, createData)
satkerRoute.put(`/:id`, updateData)
satkerRoute.delete(`/:id`, authMiddleware, deleteData)
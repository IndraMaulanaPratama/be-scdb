import { Router } from "express";
import { authMiddleware } from "../middlewares/auth-middleware.js";
import { createData, deleteData, getAll, getDataById, updateData } from "../controllers/satuan-kerja-controller.js"

// nangtoskeun istilah
export const satkerRoute = Router()

satkerRoute.get(`/:status`, authMiddleware, getAll)
satkerRoute.get(`/data/:id`, authMiddleware, getDataById)
satkerRoute.post(`/`, authMiddleware, createData)
satkerRoute.put(`/:id`, authMiddleware, updateData)
satkerRoute.delete(`/:id`, authMiddleware, deleteData)
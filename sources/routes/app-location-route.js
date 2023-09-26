import { Router } from "express";
import { authMiddleware } from "../middlewares/auth-middleware.js";
import {
    createData,
    deleteData,
    getAll,
    getDataById,
    getDataByIdApp,
    updateData
} from "../controllers/app-location-controller.js";

// Inisialisasi variable
export const appLocation = Router()

appLocation.get("/:status", authMiddleware, getAll)
appLocation.post("/", authMiddleware, createData)
appLocation.get("/:status/:id", authMiddleware, getDataById)
appLocation.get("/app/:status/:id", authMiddleware, getDataByIdApp)
appLocation.patch("/:id", authMiddleware, updateData)
appLocation.delete("/:status/:id", authMiddleware, deleteData)
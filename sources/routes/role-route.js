import { Router } from "express";
import { addNew, deleteRole, getAll, getRole, updateRole } from "../controllers/role-controller.js";
import { authMiddleware } from "../middlewares/auth-middleware.js";

export const roleRoute = Router()

roleRoute.get('/', authMiddleware, getAll)
roleRoute.post('/', authMiddleware, addNew)
roleRoute.get('/:id', authMiddleware, getRole)
roleRoute.put('/', authMiddleware, updateRole)
roleRoute.delete('/:id', authMiddleware, deleteRole)
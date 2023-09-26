import { Router } from "express";
import { addUser, deleteUser, getAll, getAllTrash, login, logout, refreshToken, updateUser } from "../controllers/auth-controller.js";
import { authMiddleware } from "../middlewares/auth-middleware.js";

export const authRoute = Router()

// Menampilkan semua data user yang aktif
authRoute.get('/', authMiddleware, getAll)

// Menampilkan semua data user yang non-aktif
authRoute.get('/trash', authMiddleware, getAllTrash)

// Menambahkan user baru
authRoute.post('/', addUser)

// Merubah data user
authRoute.put('/:id', authMiddleware, updateUser)

// Menghapus data user
authRoute.delete('/', authMiddleware, deleteUser)

// Login user
authRoute.post('/login', login)

// Logout
authRoute.delete('/logout/', logout)

// Refresh token
authRoute.get('/refresh-token/', refreshToken)
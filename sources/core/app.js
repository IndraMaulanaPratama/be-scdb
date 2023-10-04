import dotenv from "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "../middlewares/error-middleware.js";
import {
    roleRoute,
    authRoute,
    appLocation,
    satkerRoute,
    lembagaRoute,
    fakultasRoute,
    biroRoute,
    satuanRoute
} from "../routes/index.js"

// Inisialisasi Variable
const app = express()
const domainFrontend = process.env.HOST_FRONTEND
const client = [domainFrontend]
let data = []

app.use(express.json()) // Module untuk memperbolehkan request masuk berupa json
app.use(cookieParser()) // Module untuk dapat membaca data cookie
app.use(cors({ credentials: true, origin: client })) // Module untuk dapat diakses oleh system lain


// Route
app.use("/satuan", satuanRoute)
app.use("/biro", biroRoute)
app.use("/fakultas", fakultasRoute)
app.use("/lembaga", lembagaRoute)
app.use("/satuan-kerja/", satkerRoute)
app.use("/app-location", appLocation)
app.use("/role", roleRoute)
app.use("/auth", authRoute)

// Middleware
app.use(errorMiddleware)

export { app }
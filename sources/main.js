import dotenv from "dotenv/config";
import express from "express";
import { app } from "./core/app.js";
import { logger } from "./core/logger.js";
import { consoleInfo } from "./utils/custom-logger/logger-util.js";

// Inisialisasi Variable
const host = process.env.APP_HOST
const port = process.env.APP_PORT
const appName = process.env.APP_NAME
const dateString = new Date().toString()

app.listen(port, () => {
    consoleInfo(`Server ${appName} running at ${host}:${port}`, dateString)
})
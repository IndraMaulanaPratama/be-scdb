import dotenv from "dotenv/config";
import jwt from "jsonwebtoken";
import { consoleError, consoleInfo, consoleWarn } from "../utils/custom-logger/logger-util.js";

export const authMiddleware = (req, res, next) => {
    // Inisialisasi variable
    const keyToken = process.env.KEY_REFRESH_TOKEN
    const authHeader = req.headers['authorization'] // Mengambil data header auth
    const token = authHeader && authHeader.split(' ')[1] // Mengambil token

    // Mengembalikan pesan error ketika token tidak terbaca
    if (null == token) {
        consoleWarn(`Token client tidak terbaca`)
        return res.sendStatus(401) // Mengembalikan unauthorize
    }

    // Melakukan verifikasi token yang dikirimkan
    jwt.verify(token, keyToken, (err, decode) => {

        // Mengembalikan pesan error ketika token tidak valid
        if (err) {
            consoleError(`Token client tidak valid`, { token })
            return res.sendStatus(403) // status code forbiden
        }

        // Menyimpan data email untuk kebutuhan proses selanjutnya
        req.email = decode.email

        // Memperbolehkan client mengakses route yang dituju
        next()
    })
}
import { ErrorResponse } from "../utils/error-response/error-response-util.js";

const errorMiddleware = async (err, req, res, next) => {
    if (!err) {
        next();
        return;
    }

    if (err instanceof ErrorResponse) {
        res.status(err.status).json({
            errors: err.message
        }).end();
    } else {
        res.status(500).json({
            errors: err.message
        }).end();
    }
}

export { errorMiddleware }
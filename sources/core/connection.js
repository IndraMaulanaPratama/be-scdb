import { PrismaClient } from "@prisma/client";
import { logger } from "./logger.js";

export const connection = new PrismaClient({
    log: [
        { level: `info`, emit: `event` },
        { level: `query`, emit: `event` },
        { level: `warn`, emit: `event` },
        { level: `error`, emit: `event` },
    ],

    errorFormat: `minimal`
})

connection.$on(`info`, (e) => {
    logger.info(e)
})

connection.$on(`query`, (e) => {
    logger.info(e)
})

connection.$on(`warn`, (e) => {
    logger.warn(e)
})

connection.$on(`error`, (e) => {
    logger.error(e)
})
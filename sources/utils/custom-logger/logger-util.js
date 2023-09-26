export const consoleInfo = (message, data) => {
    console.info({ level: `info`, message, data })
}

export const consoleWarn = (message) => {
    console.warn({ level:`warning`, message })
}

export const consoleError = (message, err) => {
    console.error({ level: `error`, message, errors: err })
}
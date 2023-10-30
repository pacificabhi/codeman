import winston, { createLogger, format, transports } from "winston"
const { combine, timestamp, printf, colorize, align } = format

const prodFormat = printf(({ level, message, timestamp }) => {
    let log = `[prod] [${level}] ${timestamp} ${message}`
    return log
})

const prodLogger: winston.Logger = createLogger({
    level: 'info',
    format: combine(
        colorize(),
        timestamp({format: "YYYY-MM-DD hh:mm:ss"}),
        prodFormat,
        align(),
    ),
    transports: [
        new transports.Console()
    ]
})

export default prodLogger
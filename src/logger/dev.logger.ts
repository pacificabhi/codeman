import winston, { createLogger, format, transports } from "winston"
const { combine, timestamp, printf, colorize, align } = format

const devFormat = printf(({ level, message, timestamp }) => {
    let log = `[dev] [${level}] ${timestamp} ${message}`
    return log
})

const devLogger: winston.Logger = createLogger({
    level: 'debug',
    format: combine(
        colorize(),
        timestamp({format: "YYYY-MM-DD hh:mm:ss"}),
        devFormat,
        align(),
    ),
    transports: [
        new transports.Console()
    ]
})

export default devLogger
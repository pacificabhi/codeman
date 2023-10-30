import devLogger from "./dev.logger"
import prodLogger from "./prod.logger";

const getLogger = () => {
    if(process.env.NODE_ENV == 'development') {
        return devLogger
    }

    return prodLogger
}
export default getLogger()
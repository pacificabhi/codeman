import authConfig from "./src/config/apps/auth/config"

const checkAuthConfig = () => {
    
}

const startupFunctions = [
    checkAuthConfig
]

const startupValidations = () => {
    startupFunctions.forEach((value, index, array) => {
        value();
    })
}

export default startupValidations
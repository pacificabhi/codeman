import authConfig from './config/apps/auth/config';

const checkAuthConfig = () => {
    let k: keyof typeof authConfig;
    for (k in authConfig) {
        if (!authConfig[k]) {
            throw new Error(`${k} is not defined in authConfig`);
        }
    }
};

const startupFunctions = [checkAuthConfig];

const startupValidations = () => {
    startupFunctions.forEach((value, index, array) => {
        value();
    });
};

export default startupValidations;

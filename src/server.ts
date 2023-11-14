require('dotenv').config();
import app from './app';
import startupValidations from './startupValidations';

startupValidations();

app();

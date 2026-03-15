import { appEvents } from './index.mjs';
import  './logger.mjs';

export const login = (userName) => {
    appEvents.emit('user:login', userName);
};

export const logout = (userName) => {
    appEvents.emit('user:logout', userName);
};


import { appEvents } from './index.mjs';

appEvents.on('user:login', (userName) => {
    console.log(`User ${userName} logged in`);
});

appEvents.on('user:logout', (userName) => {
    console.log(`User ${userName} logged out`);
});

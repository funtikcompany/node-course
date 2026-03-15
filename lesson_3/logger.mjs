import { appEvents } from './events.mjs';
appEvents.on('login', (user) => {
  console.log(`User ${user.name} logged in`);
});
appEvents.on('logout', (user) => {
  console.log(`User ${user.name} logged out`);
});

import { appEvents } from './events.mjs';

export function login(user) {
  appEvents.emit('login', user);
}

export function logout(user) {
  appEvents.emit('logout', user);
}

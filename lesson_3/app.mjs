import { login, logout } from './auth.mjs';
import './logger.mjs'
login({ name: 'John Doe' });
logout({ name: 'John Doe' });
import session from "express-session";
import config from './default.js'

const sessionConfig = session({
  name: 'sessionId',
  secret: config.secretSessionKey,
  resave: false,
  cookie: {
    maxAge: 120000,
    httpOnly: true,
    secure: false,
    sameSite: 'lax',
  },
  saveUninitialized: false,
})

export default sessionConfig 
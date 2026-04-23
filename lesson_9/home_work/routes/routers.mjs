import indexRouter from './index.mjs'
import userRouter from './users.mjs'
import productRouter from './products.mjs'
const routerConfigs = [
    {
        path: '/',
        router: indexRouter
    },
    {
        path: '/',
        router: userRouter
    },
    {
        path: '/products',
        router: productRouter
    }
]

function initRouters(app) {
    for (const config of routerConfigs) {
        app.use(config.path, config.router)
    }
}

export default initRouters
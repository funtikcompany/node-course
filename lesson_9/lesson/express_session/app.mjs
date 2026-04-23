import express from 'express'
import cookieParser from 'cookie-parser'
import path from 'path'
import { fileURLToPath } from 'url'
import session from 'express-session'

const app = express()
app.use(cookieParser())

app.use(express.urlencoded({ extended: false }))
app.use(cookieParser('My Top Secret String'))

const __filename = fileURLToPath(import.meta.url) // get the resolved path to the file
const __dirname = path.dirname(__filename) // get the name of the directory
// Додаємо статичну папку
app.use(express.static(path.join(__dirname, 'public')))

// Middleware для обробки кукі та сесій
app.use(cookieParser())
app.use(
  session({
    secret: 'its a secret',
    cookie: { maxAge: 60000 },
    resave: false,
    saveUninitialized: false,
  })
)

// Налаштування шаблонів та статичних файлів
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
  if (req.session.isNew || !req.session.products) {
    req.session.products = []
    res.render('products', { title: 'Корзина пуста', products: [] })
  } else {
    res.render('products', { title: 'Корзина', products: req.session.products })
  }
})

// Middleware для обробки даних форми
app.post('/addAuto', (req, res) => {
  req.session.products.push({ pr_type: 'Auto', title: req.body.auto })
  res.redirect('/')
})

app.post('/addPhone', (req, res) => {
  req.session.products.push({ pr_type: 'Phone', title: req.body.phone })
  res.redirect('/')
})

// Запуск сервера
const port = 3000
app.listen(port, () => {
  console.log(`Сервер запущено на http://localhost:${port}`)
})

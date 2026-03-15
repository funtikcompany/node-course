import { Router } from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import fs from 'fs/promises'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const router = Router()

// Шлях до файлу з продуктами
const productsFilePath = path.join(__dirname, '../data/products.json')

// Функція для читання продуктів
async function readProducts() {
  try {
    const data = await fs.readFile(productsFilePath, 'utf-8')
    return JSON.parse(data)
  } catch (error) {
    // Якщо файл не існує, повертаємо порожній масив
    return []
  }
}


router.get('/', (req, res) => {
    res.render('index', { title: 'Express', activePage: '/' })
})

// Маршрут для пори року
router.get('/season', (req, res) => {
  const now = new Date()
  const month = now.getMonth() + 1 // 1-12
  
  let season
  if (month >= 3 && month <= 5) {
    season = 'Весна'
  } else if (month >= 6 && month <= 8) {
    season = 'Літо'
  } else if (month >= 9 && month <= 11) {
    season = 'Осінь'
  } else {
    season = 'Зима'
  }
  
  res.render('season', { season, title: 'Пора року', activePage: '/season' })
})

// Маршрут для поточного дня
router.get('/day', (req, res) => {
  const now = new Date()
  const days = ['Неділя', 'Понеділок', 'Вівторок', 'Середа', 'Четвер', 'П\'ятниця', 'Субота']
  const day = days[now.getDay()]
  
  res.render('day', { day, title: 'Поточний день', activePage: '/day' })
})

// Маршрут для часу дня
router.get('/time', (req, res) => {
  const now = new Date()
  const hour = now.getHours()
  
  let timeOfDay
  if (hour >= 5 && hour < 12) {
    timeOfDay = 'Ранок'
  } else if (hour >= 12 && hour < 17) {
    timeOfDay = 'Обід'
  } else {
    timeOfDay = 'Вечеря'
  }
  
  res.render('time', { timeOfDay, title: 'Час дня', activePage: '/time' })
})

// Маршрут для статичної сторінки музики
router.get('/music', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/pages/music.html'))
})

// Маршрут для статичної сторінки про каву
router.get('/coffee', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/pages/coffee.html'))
})

// Маршрут для статичної сторінки цілей
router.get('/goals', (req, res) => {
  res.render('task3/goals', { goals: ['Вчитися', 'Працювати', 'Заробляти'], title: 'Цілі', activePage: '/goals' })
})

// Маршрут для статичної сторінки новин
router.get('/news', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/pages/news.html'))
})

// Маршрут для статичної сторінки про нас
router.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/pages/about.html'))
})

router.get('/info', (req, res) => {
  res.render('task3/info', { title: 'Щоб краще дізнатись про мене в пошуковому рядку введіть /info/sites, /info/films, /info/me', activePage: '/info' })
})

// Маршрут для інформації залежно від параметра
router.get('/info/:myLinks', (req, res) => {
  const { myLinks } = req.params
  
  let data = {}
  let title = ''
  
  if (myLinks === 'sites') {
    title = 'Улюблені сайти'
    data = {
      title,
      activePage: '/info/' + myLinks,
      links: [
        { name: 'GitHub', url: 'https://github.com' },
        { name: 'Stack Overflow', url: 'https://stackoverflow.com' },
        { name: 'MDN Web Docs', url: 'https://developer.mozilla.org' },
        { name: 'YouTube', url: 'https://youtube.com' }
      ]
    }
  } else if (myLinks === 'films') {
    title = 'Улюблені онлайн кінотеатри'
    data = {
      title,
      activePage: '/info/' + myLinks,
      links: [
        { name: 'Netflix', url: 'https://www.netflix.com' },
        { name: 'Disney+', url: 'https://www.disneyplus.com' },
        { name: 'Amazon Prime Video', url: 'https://www.primevideo.com' },
        { name: 'HBO Max', url: 'https://www.hbomax.com' }
      ]
    }
  } else if (myLinks === 'me') {
    title = 'Про мене'
    data = {
      title,
      activePage: '/info/' + myLinks,
      info: {
        name: 'Едуард',
        age: '26',
        profession: 'frontend developer',
        interests: ['Програмування', 'Веб-розробка', 'Node.js', 'React', 'Vue.js'],
        email: 'edua20021@gmail.com'
      }
    }
  } else {
    return res.status(404).render('error', { 
      message: 'Сторінку не знайдено', 
      title: 'Помилка 404',
      activePage: ''
    })
  }
  
  res.render('task3/info', data)
})

router.get('/store', (req, res) => {
  res.render('store/store', { title: 'Магазин', activePage: '/store' })
})

// Маршрут для відображення форми додавання продукту
router.get('/addProduct', (req, res) => {
  res.render('store/addProduct', { title: 'Додати продукт', activePage: '/addProduct' })
})


// Маршрут для відображення продуктів
router.get('/viewProduct', async (req, res) => {
  try {
    const products = await readProducts()
    res.render('store/viewProduct', {
      title: 'Перегляд продуктів',
      products: products,
      activePage: '/viewProduct'
    })
  } catch (error) {
    console.error('Помилка при читанні продуктів:', error)
    res.status(500).render('error', {
      message: 'Помилка при завантаженні продуктів',
      title: 'Помилка',
      activePage: ''
    })
  }
})

export default router
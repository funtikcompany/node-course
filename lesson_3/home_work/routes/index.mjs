import { Router } from 'express'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const router = Router()

router.get('/', (req, res) => {
res.render('index', { title: 'Express', currentPage: 'home' })
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
  
  res.render('season', { season, title: 'Пора року', currentPage: 'season' })
})

// Маршрут для поточного дня
router.get('/day', (req, res) => {
  const now = new Date()
  const days = ['Неділя', 'Понеділок', 'Вівторок', 'Середа', 'Четвер', 'П\'ятниця', 'Субота']
  const day = days[now.getDay()]
  
  res.render('day', { day, title: 'Поточний день', currentPage: 'day' })
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
  
  res.render('time', { timeOfDay, title: 'Час дня', currentPage: 'time' })
})

// Маршрут для статичної сторінки музики
router.get('/music', (req, res) => {
  res.render('for_statick_page/music', { music: 'Паліндром', title: 'Музика', currentPage: 'music' })
})

// Маршрут для статичної сторінки кави
router.get('/coffee', (req, res) => {
  res.render('for_statick_page/coffee', { coffee: `Лате`, title: 'Кава', currentPage: 'coffee' })
})

// Маршрут для статичної сторінки цілей
router.get('/goals', (req, res) => {
  res.render('task3/goals', { goals: ['Вчитися', 'Працювати', 'Заробляти'], title: 'Цілі', currentPage: 'goals' })
})

// Маршрут для статичної сторінки новин
router.get('/news', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/pages/news.html'))
})

// Маршрут для статичної сторінки про нас
router.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/pages/about.html'))
})

// Маршрут для інформації залежно від параметра
router.get('/info/:myLinks', (req, res) => {
  const { myLinks } = req.params
  
  let data = {}
  let title = 'Інформація'
  
  if (myLinks === 'sites') {
    title = 'Улюблені сайти'
    data = {
      type: 'sites',
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
      type: 'films',
      links: [
        { name: 'Netflix', url: 'https://www.netflix.com' },
        { name: 'Disney+', url: 'https://www.disneyplus.com' },
        { name: 'HBO Max', url: 'https://www.hbomax.com' },
        { name: 'Amazon Prime Video', url: 'https://www.primevideo.com' }
      ]
    }
  } else if (myLinks === 'me') {
    title = 'Про мене'
    data = {
      type: 'me',
      info: {
        name: 'Ваше ім\'я',
        age: 'Ваш вік',
        profession: 'Ваша професія',
        interests: ['Програмування', 'Веб-розробка', 'Node.js'],
        description: 'Тут може бути ваша особиста інформація'
      }
    }
  } else {
    data = {
      type: 'unknown',
      message: 'Невідомий параметр'
    }
  }
  
  res.render('task3/info', { 
    ...data, 
    title, 
    currentPage: 'info',
    myLinks 
  })
})

export default router
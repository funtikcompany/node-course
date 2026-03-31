import { Router } from 'express'
const router = Router()

router.get('/', (req, res) => {
  res.send('respond with a resource')
})

router.get('/form', (req, res) => {
  res.render('user_Forms', { title: 'Створення користувача' })
})

router.post('/data', (req, res) => {
  const userData = req.body
  res.send(`${userData.userName} - ${userData.userAge}`)
})

export default router

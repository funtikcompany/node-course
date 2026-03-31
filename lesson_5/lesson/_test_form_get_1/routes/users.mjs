import { Router } from 'express'
import multer from 'multer'
const router = Router()
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, uniqueSuffix + file.originalname)
  }
})

const upload = multer({ storage: storage })

router.get('/', (req, res) => {
  res.send('respond with a resource')
})

router.get('/form', (req, res) => {
  res.render('user_Forms', { title: 'Створення користувача' })
})

router.post('/data',
  upload.single('userImage'),
  (req, res) => {
  const userData = req.body
  res.send(`${userData.userName} - ${userData.userAge}`)
})

export default router

import express from 'express'

const app = express()

app.get('/', (req, res) => {
  res.send('time manager')
})

app.get('/hours', (req, res) => {
    const hours = new Date().getHours()
  res.send(`${hours} hours`)
})



app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000')
})
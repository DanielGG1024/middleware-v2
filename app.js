
const express = require('express')
const exphbs = require('express-handlebars')
const app = express()
const port = 3000

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(function (req, res, next) {

    const startTime = req.requestTime = new Date()
    const method = req.method
    const url = req.url
    const year = startTime.getFullYear()
    const month = startTime.getMonth() + 1
    const date = startTime.getDate()
    const hour = startTime.getHours()
    const minutes = startTime.getMinutes()
    const seconds = startTime.getSeconds()
    
    const calResponseTime = function () {
        const endTime = res.responseTime = new Date()
        const delateTime = endTime - startTime
        if (req.url !== '/favicon.ico') {
            console.log(`${year}-${month}-${date} ${hour}:${minutes}:${seconds} | ${method} form ${url} | total time: ${delateTime}ms`);
        }
    }
    res.once('finish', calResponseTime)
    next()
})


app.get('/', (req, res,) => {
    const print = '列出全部 Todo'
    res.render('index', ({ print }))
})

app.get('/new', (req, res) => {
    const print = '新增 Todo 頁面'
    res.render('index', ({ print }))
})

app.get('/:id', (req, res) => {
    const print = '顯示一筆 Todo'
    res.render('index', ({ print }))
})

app.post('/', (req, res) => {
    const print = '新增一筆  Todo'
    res.render('index', ({ print }))
})

app.listen(port, () => {
    console.log(`App running on port ${port}`)
})
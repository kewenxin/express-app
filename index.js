const express = require('express')
const router = require('./router')
const qs = require('querystring')
const mysql = require('mysql')
const session = require('express-session')

const db = mysql.createPool({
  // host: '192.168.3.10',
  host: '127.0.0.1',
  user: 'root',
  password: 'admin',
  database: 'my_db_01'
})

db.query('select * from users', (err, result) => {
  if(err) return console.log(err.message, 'message')
  console.log(result) 
})

// 用？作为占位符
// let insertSql = `insert into users (username, password) values(?, ?)`
let insertSql2 = `insert into users set ?`
let user = { 
  username: 'hua',
  password: '123456'
}
db.query(insertSql2, user, (err, result) => {
  if(err) return console.log(err.message, 'message')
  if(result.affectedRows === 1) console.log('数据插入成功')
  console.log(result) 
})

const app = express()
const errMv = (err, req, res, next) => {
  console.log('处理错误中间件')
  // res.send('通过一个中间件')
  // req.method = 'POST'
  res.send('处理错误')
}


const mv = (req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  // res.setHeader('Access-Control-Allow-Headers', '')
  // res.setHeader('Access-Control-Allow-Methods', '*')
  next()
}

app.use(mv).use(express.json()).use(express.urlencoded())
app.use(session({
  secret: 'kevin',
  resave: false,
  saveUninitialized: true
}))
app.use(router)
// 处理错误的中间件 要放在路由后面
app.use(errMv)
// 托管静态资源
app.use(express.static('public'))


app.listen(80, () => {
  console.log('app is running at http://127.0.0.1')
})
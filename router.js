const express = require('express')

const router = express.Router()

router.get('/', (req, res, next) => {
  console.log(req.body, 'body', req.session)
  let message = `当前访问路径${req.url},访问方式${req.method}`
  // throw new Error('错误')
  // console.log(message, 'next', next)
  res.send(message)
})

router.post('/', (req, res, next) => {
  console.log(req.body, 'body', res.query)
  let message = `当前访问路径${req.url},访问方式${req.method}`
  res.send(message)
})

router.get('/get', (req, res, next) => {
  let message = `当前访问路径${req.url},访问方式${req.method}`
  console.log(message)
  res.send({
    state: 0,
    msg: 'get请求成功',
    data: req.query
  })
})
router.post('/post', (req, res, next) => {
  let message = `当前访问路径${req.url},访问方式${req.method}`
  console.log(message)
  res.send({
    state: 0,
    msg: 'post请求成功',
    data: req.body
  })
})
router.put('/put', (req, res, next) => {
  let message = `当前访问路径${req.url},访问方式${req.method}`
  console.log(message)
  res.send({
    state: 0,
    msg: 'post请求成功',
    data: req.body
  })
})

router.get('/jsonp', (req, res, next) => {
  let message = `当前访问路径${req.url},访问方式${req.method}`
  console.log(message)
  let fn = `
    () => {
      console.log({name: "kevin"})
    }
  `
  let data = `${req.query.callback}(${fn})`
  res.send(data)
})

module.exports = router
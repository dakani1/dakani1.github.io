const Koa = require('koa')
const Router = require('koa-router')
const cors = require('koa-cors')
const axios = require('axios')
const app = new Koa()
const router = new Router()
app.use(cors())

router.get('/api/getDataList', async (ctx, next) => {
  console.log('ddddddddddddafsafafafsafafdafafa')
  await axios.get('https://cnodejs.org/api/v1/topics', {
    params: {
      page: 1,
      tab: 'ask',
      limit: 10,
      mdrender: true
    }
  }).then((res) => {
    // console.log(JSON.stringify(res.data))
    ctx.body = JSON.stringify(res.data)  // 切记结果要在接口执行完成之后再返回ctx.body
  }).catch((err) => {
    console.log(222)
    ctx.body = err
  })
})
app
  .use(router.routes())
  .use(router.allowedMethods())
const port = 2032
app.listen(port, () => {
  console.log(`Server started at localhost:${port}`)
})

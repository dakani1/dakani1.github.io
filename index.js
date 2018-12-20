const path = require('path')
const Koa = require('koa')

const bodyParser = require('koa-bodyparser')
const koaStatic = require('koa-static')
const render = require('koa-art-template');

const app = new Koa()
app.use(bodyParser())
app.use(koaStatic(path.join(__dirname, './public'), {
  maxage: 200000,
  gzip: true,
  index: 'go.html',
  extensions: 'html'
}))
render(app, {
  root: path.join(__dirname, 'views'),
  extname: '.art',
  debug: process.env.NODE_ENV !== 'production'
});

const router = require('./router/index.js')
app.use(router.routes())
const port = 3000
app.listen(port, () =>{
  console.log(`server started at localhost:${port}`)
})
const path = require('path')
const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const koaStatic = require('koa-static')
const render = require('koa-art-template');
var mysql = require('mysql');

const router = require('./router/index.js')
const middle = require('./middle/index.js')
const data = require('./fs/file.js')
const app = new Koa()

middle(app)
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
app.use(async(ctx, next) => {
  ctx.set('Content-Type', 'application/json; charset=utf-8;')
  ctx.set('ETag', '123456');
  ctx.set('Cache-Control', 'no-cache');
  next()
})

const pool = mysql.createPool({
  connectionLimit : 10,
  host     : '47.98.147.252',
  user     : 'root',
  password : 'root',
  database : 'zhaoerhu'
})
let sqlStr = 'INSERT INTO dbData (dbId, title, img, score) values '
data.forEach((item, key) => {
  key = key === (data.length - 1) ? ';' : ',';
  sqlStr += `(${item.dbId}, '${item.title}', '${item.img}', ${item.score})${key}`;
})

// pool.query(sqlStr, function (error, results, fields) {
//   if (error) throw error;
//   console.log('The solution is: ', results);
// });

app.use(router.routes())
const port = 3000
app.listen(port, () =>{
  console.log(`server started at localhost:${port}`)
})

const Router = require('koa-router')
const router = new Router()

router.get('/', async(ctx, next) => {
  await ctx.render('index', {
    title: 'This is title'
  });
})

router.get('/article/:id', (ctx, next) => {
  if (ctx.params && ctx.params.id) {
    ctx.body = ctx.params.id
  } else {
    ctx.redirect('/')
  }
})

// router.get('*', (ctx, next) => {
//   ctx.body = '<h1>404 Not Found</h1>'
// })

module.exports = router
module.exports = () => {
  return async(ctx, next) => {
    let fileName = 'other'
    try {
      await next()
      if (ctx.status === 404 && !ctx.response.body) {
        console.log(2222222)
        ctx.render('')
      }
    } catch(e) {
      const status = e.status
      const message = e.message
      // 对 status 进行处理，指定错误页面文件名 
      if(status >= 400){
        switch(status){
          case 400:
          case 404:
          case 500:
            fileName = status;
            break;
          // 其它错误 指定渲染 other 文件
          default:
            fileName = 'other'
        }
      }
    }
    return fileName;
  }
}
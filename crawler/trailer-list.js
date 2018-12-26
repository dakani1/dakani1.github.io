const puppeteer = require('puppeteer');
const fs = require('fs');
(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 500,
    defaultViewport: {
      width: 1366,
      height: 768
    }
  });
  const page = await browser.newPage();
  const url = 'https://movie.douban.com/explore#!type=movie&tag=%E7%83%AD%E9%97%A8&sort=recommend&page_limit=20&page_start=0';
  await page.goto(url, {
    waitUntil: 'domcontentloaded'
  });

  const moreClk = async(page) => {
    try {
      await page.waitFor('.more');
      await page.click('.more');
      await page.waitFor(5000);
      await moreClk(page);
    } catch (e) {
      console.log(8888888)
      const data = await page.evaluate(() => {
        const $ = window.$;
        const items = $('.list .item')
        const arr = []
        if (items && items.length > 0) {
          $.each(items, (key, item) => {
            const json = {
              dbId:  $(item). find(".cover-wp").data('id'),
              title: $(item).find('p').html().split('<strong>')[0].trim() || '',
              img: $(item).find('img').attr('src').replace('/s_ratio_poster', '/l_ratio_poster') || '',
              score: $(item).find('p strong').text()
            };
            arr.push(json);
          })
        }
        return arr
      })
      fs.writeFile('../fs/file.js', JSON.stringify(data),'utf-8',function(error){
        if(error){
            console.log(error);
            return false;
        }
        console.log('写入成功');
    })
    }
  }
  await moreClk(page); 
})()
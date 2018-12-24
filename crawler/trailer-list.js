const puppeteer = require('puppeteer');
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
    console.log(1111111111111)
    try {
      const arriveBottom = false;
      await page.waitFor('.more');
      await page.click('.more');
      await page.waitFor(5000);
      if (!arriveBottom) {
        // page.evaluate(() => {
        //   const 
        // });
        await moreClk(page);
      } else {

      }
    } catch (e) {
      console.log(33333333333)
    }
  }
  await moreClk(page); 
})()
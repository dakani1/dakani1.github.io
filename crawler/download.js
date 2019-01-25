const puppeteer = require('puppeteer');
const fs = require('fs');
(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 500,
    defaultViewport: {
      width: 1920,
      height: 900
    }
  });
  const page = await browser.newPage();
  const url = 'https://www.taotronics.com/support/download';
  await page.goto(url, {
    waitUntil: 'domcontentloaded'
  });
  await page.waitFor('.download-nav-list');
  const navListLength = await page.evaluate(() => {
    const downloadNavList = document.getElementsByClassName('download-nav-list');
    listItem = downloadNavList[0].children;
    return listItem.length;
  })
  currentIdx = 0;
  const finalData = [];
  await getData(page);

  async function getData(page) {
    console.log(currentIdx)
    if (currentIdx < navListLength) {
      const data = await page.evaluate(() => {
        const arr = [];
        const productItem = document.getElementsByClassName('product-item');
        for (let i = 0; i < productItem.length; i++) {
          arr.push(productItem[i].href);
        }
        return arr;
      })
      data.forEach((item, key) => {
        finalData.push(item);
      })
      currentIdx += 1;
      if (currentIdx < navListLength) {
        await page.click(`.download-nav-list li:nth-child(${currentIdx+1})`);
        await page.waitFor(10000);
        await getData(page);
      } else {

        fs.writeFile('../fs/download-tt.js', JSON.stringify(finalData),'utf-8',function(error){
          if(error){
            console.log(error);
            return false;
          }
          console.log('写入成功');
        })
      }
    }
  }
})()
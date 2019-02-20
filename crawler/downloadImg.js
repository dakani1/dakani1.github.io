const fs = require('fs');
var http = require('http');

// fs.stat('./text1.txt', function (err, data) {
//   console.log(data.dev)
// })
// http://es6.ruanyifeng.com/#docs/reflect

function downloadImg(url) {

  let re = /\w+\.\w+$/g;
  let name = url.match(re)
  http.get(url, function (res) {
    res.setEncoding('binary');
    let data = '';
    res.on('data', function (chunk) {
      data += chunk;
    })

    res.on('end', function () {
      fs.writeFile(`../downloadImg/${name}`, data, 'binary', function (err, data) {
        if (err) {
          console.log(err)
        } else {
          console.log('success')
        }
      })
    })
  });
}

downloadImg('http://www.ravpower.com/src/assets/img/home/img5.png')
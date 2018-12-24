const fs = require('fs');
var request=require("request");
const json = {
    a: 'dasfafaf'
}
fs.writeFile('./file.js', JSON.stringify(json),'utf8',function(error){
    if(error){
        console.log(error);
        return false;
    }
    console.log('写入成功');
})
const url = 'https://img3.doubanio.com/view/photo/l_ratio_poster/public/p2522880251.jpg'
const writeStream = fs.createWriteStream('./nnn.png')
request(url).pipe(writeStream)
const express = require("express")

const app = express()

app.set('secret','i2u34y12oi3u4y8')

// 跨域模块
app.use(require('cors')())
app.use(express.json())
// 静态托管文件
app.use('/uploads',express.static(__dirname + '/uploads'))

require('./plugins/db')(app)
require('./routes/admin')(app)
require('./routes/web')(app)

app.listen(3000, () => {
  console.log('http://localhost:3000');
});
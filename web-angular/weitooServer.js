var express = require("express")
var app = express()
//app.use(require('cors')())
app.use('api',require('cors')())
app.set('port',process.env.PORT||3000)

app.listen(app.get('port'),function(){
  console.log('Express started on http://localhost:'+app.get('port'))
})
//weitoo页面路由
app.get('/', function(req, res) {
                res.type('text/plain')
                res.send('hello')
        })

app.get('/about', function(req, res) {
                res.type('text/plain')
                res.send('Regarding weitoo,what do you want to say...')
})
app.get('/infor', function(req, res) {
                res.type('text/plain')
                res.send('Regarding to weitoo,what kind of information do you want to get...')
})
app.get('/details', function(req, res) {
                res.type('text/plain')
                res.send('Regarding weitoo,what kind of detail do you want to know...')
})
app.use(function(req,res){
  res.type('text/plain')
  res.status(404)
  res.send('404- Page Not Found')
})  
app.use(function(err,req,res,next){
  console.error(err.stack)
  res.type('text/plain')
  res.status(500)
  res.send('500-Sever Error')
})
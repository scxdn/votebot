var express = require('express')
var app = express()
var fs = require('fs')
var fetch = require('node-fetch')
var data = require('./data.json')
var path = require('path');
app.get('/data', function (req,res) {
res.send(data)
})
app.get('/vote/:cid', function (req,res) {
for (var q = 0; q < data.length; q++) {
  if (req.params.cid.toUpperCase() == data[q].name.toUpperCase()) {
    data[q].count++
  }
}
  res.send("Voted For "+req.params.cid+".")
})
setInterval(function () {
fs.writeFileSync('data.json', JSON.stringify(data, null, "\t"));
}, 500);

app.get('/change/:user1/:user2', function (req,res) {
data = []
data.push({
  "name": req.params.user1,
  "count":0
})
data.push({
  "name": req.params.user2,
  "count":0
})
res.send("Updated Poll.")
})
app.listen(80)

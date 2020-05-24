const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server)
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const bodyParser = require('body-parser')

const adapter = new FileSync('db.json')
const db = low(adapter)
server.listen(3000);
app.use(express.static('public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))


app.set("view engine", "ejs");
app.set("views", "./views");


// db.defaults({ nguoiDung: [], donHang: [] })
//   .write()

// app.use(function (req, res, next) {
//   req.io = io;
//   next();
// });

app.get('/', (req, res) => {
  res.render('chat.ejs')
  //res.render('order_add')
})

// app.get('/report', (req, res) => {
//   // var list = db.get('donHang').value()
//   // res.render('report', { list: list })
// })

// app.post('/donhang', (req, res) => {

//   db.get('donHang')
//     .push(req.body)
//     .write()

//   var list = db.get('donHang').value()
//   var io = req.io;
//   io.emit('list', list);

//   res.render('order_add')

// })



io.on("connection", (socket) => {
  console.log(`${socket.id} is connecting ...`);
  socket.on('chatMessage', (msg) => {
    io.sockets.emit('list', msg)
  });

  socket.on('disconnect', () => {
    console.log(`${socket.id} disconnected...`);
  })
})

// nkoDyyecOsLGph7.1~j3Dczw2vy.IY4lWctxRn.K
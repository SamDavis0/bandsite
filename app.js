const express = require('express');
const app = express();
const socket = require('socket.io')
const port = process.env.PORT || 3000

//static assets
app.use(express.static('public'))
//templates
app.set('view engine', 'ejs')
//routes
app.use(require('./routes/index'))
app.use(require('./routes/albums'))
app.use(require('./routes/feedback'))
app.use(require('./routes/chat'))

const server = app.listen(port,() => {
    console.log(`running on port ${port}`);
})

let io = socket(server)

io.on('connection', (socket) => {
    
    socket.on('postMessage', (msgClient) => {
        io.emit('updateMessage', msgClient)
    })
})
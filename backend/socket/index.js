const express = require("express");
const {Kafka} = require("kafkajs")
const router = express.Router();
const app = express();
const server = require("http").createServer(app);
const io = require('socket.io')(server,{
    cors: {
    origin: "http://localhost:3001",
    methods: ["GET", "POST"]
  }
  })
  const kafka = new Kafka({
    "clientId": "test",
    "brokers" :["localhost:9092"]
})

  io.on("connection",async (socket) => {
    console.log("User Connected",socket.id);

    const consumer = kafka.consumer({"groupId": "test"})
    console.log("Connecting.....")
    await consumer.connect()
    console.log("Connected!")

    await consumer.subscribe({
        "topic": "test",
        "fromBeginning": true
    })

    await consumer.run({
        "eachMessage": async (result) => {
               await io.sockets.emit('new_post',JSON.parse(result.message.value.toString()))
        }
    })

    socket.on("disconnect",() => {
            console.log("Client disconnected");
        })
  })

  app.use((req,res,next) => {
    req.io = io
    next()
  })

server.listen(4000, function (req, res) {
    console.log("Socket You are listening to port 4000");
  });

  module.exports = router
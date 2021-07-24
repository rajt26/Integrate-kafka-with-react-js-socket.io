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

  // connect with kafka broker
  const kafka = new Kafka({
    "clientId": "test",
    "brokers" :["localhost:9092"]
})

//socket connection for backend
io.on("connection",async (socket) => {
    console.log("User Connected",socket.id);


   // connect kafka
    const consumer = kafka.consumer({"groupId": "test"})
    await consumer.connect()
    console.log("Connected!")

    await consumer.subscribe({
        "topic": "test",
    })
    await consumer.subscribe({
      "topic": "wa",
  })
    await consumer.subscribe({
    "topic": "webashlar",
})

//  recieve message from topic
    await consumer.run({
        "eachMessage": async (result) => {
          if(result.topic == 'wa'){
            //emit socket event
            await io.sockets.emit('delete_post',JSON.parse(result.message.value.toString()))
          }
          else if(result.topic == 'webashlar'){
            await io.sockets.emit('update_post',JSON.parse(result.message.value.toString()))
          }
          else{
            await io.sockets.emit('new_post',JSON.parse(result.message.value.toString()))
          }
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
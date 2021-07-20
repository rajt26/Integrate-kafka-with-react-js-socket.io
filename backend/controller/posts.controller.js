const Posts = require('../model/posts')
const {Kafka} = require("kafkajs")
const kafka = new Kafka({
    "clientId": "test",
    "brokers" :["localhost:9092"]
})

module.exports = {

    async create(req,res) {
        try {
            const producer = kafka.producer();
            console.log("Connecting.....")
            await producer.connect()
            console.log("Connected!")
            let params = req.body
            let posts = await Posts.create(params)
                 producer.send({
                    "topic": "test",
                    "messages": [
                        {
                            "value": JSON.stringify(posts),
                        }
                    ]
                })
            return res.send(posts)
        } catch (error) {
            console.log('====================================');
            console.log(error);
            console.log('====================================');
            return res.status(400).json({ error: "error while to add post." });
        }
    },
    async getPosts(req,res) {
        try {
            let posts = await Posts.find()
            return res.send(posts)
        } catch (error) {
            return res.status(400).json({ error: "error while to get post." });
        }
    }
}
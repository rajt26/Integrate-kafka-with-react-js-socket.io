const Posts = require('../model/posts')
const {Kafka} = require("kafkajs")

// connect with kafka broker
const kafka = new Kafka({
    "clientId": "test",
    "brokers" :["localhost:9092"]
})


const producer = kafka.producer();
module.exports = {

    async create(req,res) {
        try {
            await producer.connect()
            console.log("Connected!")
            let params = req.body
            let posts = await Posts.create(params)

            // send created post in kafka topic test
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
    },
    async deletePosts(req,res) {
        try {
            await producer.connect()
            let params = req.body
            let posts = await Posts.findOneAndDelete({_id:params.id})

             // send deleted post in kafka topic test
            await producer.send({
                "topic": "wa",
                "messages": [
                    {
                        "value": JSON.stringify(posts),
                    }
                ]
            })
            return res.send(posts)
        } catch (error) {
            return res.status(400).json({ error: `error while to delete post----${error}` });
        }
    },
    async updatePosts(req,res) {
        try {
            await producer.connect()
            let params = req.body
            let posts = await Posts.findOneAndUpdate({_id:params.id},params,{new:true})

            // send updated post in kafka topic test
            await producer.send({
                "topic": "webashlar",
                "messages": [
                    {
                        "value": JSON.stringify(posts),
                    }
                ]
            })
            return res.send(posts)
        } catch (error) {
            return res.status(400).json({ error: "error while to update post." });
        }
    },
}
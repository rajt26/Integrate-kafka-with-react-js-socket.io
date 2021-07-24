const mongoose = require('mongoose')


//db connection

mongoose.connect('mongodb://localhost:27017/feed_app',{ useNewUrlParser: true,useUnifiedTopology:true },(err)=>{
    if(!err){
        console.log('Successfully connected');
    }
    else{
        console.log('error in connection!!!');
    }
})
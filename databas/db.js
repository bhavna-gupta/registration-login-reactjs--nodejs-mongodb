const mongoose=require('mongoose');
require('dotenv').config();
const Connection=()=>{
    mongoose.connect(process.env.MONGO_DB)
    .then(()=>{
        console.log("Connected to Database😎");
    })
    .catch(()=>{
        console.log("Disconnected from Database😢");
    })
}    

module.exports=Connection;
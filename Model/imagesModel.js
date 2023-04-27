const mongoose=require('mongoose');
const imagesSchema=new mongoose.Schema({
    filename:{
        type:String
    },
    image:{
        data:Buffer,
        contentType:String
    }
})
const imageModel=mongoose.model('multiple',imagesSchema);
module.exports=imageModel;
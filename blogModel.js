const mongoose = require('mongoose')
const blogSchema = new mongoose.Schema(
    {
    title:{
        type:String,
        require:[true,'title is required']
    },
    description:{
        type:String,
        required:[true,'description is require']
    },
    image:{
        type:String,
        required:[true,'image is require']
    },
    user:{
        type:mongoose.Types.ObjectId,
        ref:'User',
        require:[true,'User id is required']
    },
    },
)

const blogModel = mongoose.model('blog', blogSchema)
module.exports - blogModel;
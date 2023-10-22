

const mongoose = require('mongoose')
const userSchema = new mongoose.Schema(
    {
    username:{
        type:String,
        require:[true,'username is required']
    },
    email:{
        type:String,
        require:[true,'email is required']
    },
    password:{
        type:String,
        require:[true,'password is required']
    },
    blogs:{
        type:mongoose.Types.ArraySubdocument,
        ref:'Blogs',
        required:[true,'User id is require']
    },
    },
)

const userModel = mongoose.model('user', userSchema)
module.exports - userModel;
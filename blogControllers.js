const mongooose = require('mongoose') 
const blogModel = require('../models/blogModel')
const userModel = require('../models/userModel')

//buh model

exports.getAllBlogsController = async (req,res) =>{
    try{
        const blogs = await blogModel.find({}).populate("user")
        if(!blogs){
            return res.status(200).send({
                success:false,
                message:"blog oldsngv"
            })
            return res.status(200).send({
                success:true,
                BlogCount:blogs.length,
                message:"buh blogs irlee",
                blogs
            })
        }
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success: false,
            message: 'get blogs irsengvi',
            error,
        })
    }
}


//blog vvsgeh

exports.createBlogController = async (req,res) =>{
    try{
        const {title, description, image,user} = req.body;
        if(!title || !description || !image || !user){
            return res.status(400).send({
                success:false,
                message:"ali neg utgan ajlhgvi bn"
            });
        }
        const exisitingUser = await userModel.findById(user)
        if(!exisitingUser){
            return res.status(400).send({
            success:false,
            message:"user oldsngv"
            });
        }
        const newBLog = new blogModel({title, description, image, user});
        const session = await mongoose.startSession()
        await newBLog.save({session})
        exisitingUser.blogs.push(newBLog)
        await exisitingUser.save({session})
        await session.commitTransaction();
        await newBLog.save()
        return res.status(201).send({
            success:true,
            message:"blog vvsle",
            newBLog,
        })
    } catch (error){
        console.log(error)
        return res.status(400).send({
            success:false,
            message:"blog vvssengv",
            error,
        })
    }   
}

//update blog
exports.updateBlogController = async (req,res) =>{
    try{
        const{ id } = req.params;
        const { title,description,image } =req.body;
        const blog = await blogModel.findByIdAndUpdate(
            id,
            {...req.body},
            {new:true}
        );
        return res.status(200).send({
            success:true,
            message:"blog update hile",
            blog,
        })
    }catch (error){
        return res.status(400).send({
            success:false,
            message:"update hiihed alda grla",
            error,
        })
    }
}

//single blog

exports.getBlogByIdController = async (req,res) =>{
    try{
        const{ id } = req.params;
        const blog = await blogModel.findById(id)
        if(!blog){
            return res.status(404).send({
                success:false,
                message:"blog oldsngv c"
            })
        }
        return res.status(200).send({
            success:true,
            message:"single blog ajilsn",
            blog,
        })
    }catch (error){
        return res.status(400).send({
            success:false,
            message:"single blog der alda grla",
            error,
        })
    }
}

//delete blog

exports.deleteBlogController = async (req,res) =>{
    try{
        const blog = await blogModel.findByIdAndDelete(req.params.id).populate("user")
        await blog.user.blogs.pull(blog)
        await blog.user.save();
        return res.status(200).send({
            success:true,
            message:"blog ustlaa"
        })
    }catch(error){
        return res.status(400).send({
            success:false,
            message:"blog delete hiihed alda grla",
            error,
        })
    }
}

//user blog
ports.userBlogController = async (req,res) =>{
    try{
        const userBlog = await userModel.findById(req.params.id).populate("blogs")
        if(!userBlog){
            return res.status(404).send({
                success:false,
                message:"user oldsngv bas id oldsngv"
            })
        }
        return res.status(200).send({
            success:true,
            message:"user orlo",
            userBlog,
        });
    }catch(error){
        return res.status(400).send({
            success:false,
            message:"blogin user orsngv",
            error,
        });
    }
}
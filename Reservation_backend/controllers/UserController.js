const  User = require('../models/User');
const mongoose=require('mongoose')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

//Register
const createUser=async (req,res)=>{
    try {

        const {name,password,email}=req.body;

        const user =new User({
            name,
            password,
            email
        });
        const savedUser=await user.save();
}
catch(err){
    res.status(402).json({ message:err.message})
}
}

// login
const loginUser=async (req,res)=>{
    try {
        const {name,password}=req.body;
        const user = await User.findOne({name: name});
        if(!user){
            return res.status(404).send('user not found')
        }
        const isPasswordMatch =await bcrypt.compare(password,user.password);
        if(!isPasswordMatch){
            return res.status(401).send('invalid password')
        }
        const token = jwt.sign({_id:user._id},process.env.JWT_SECRET);
        res.send({token:token})
    } catch (error) {
        res.status(400).send(error.message)
    };


}


module.exports={createUser,loginUser}
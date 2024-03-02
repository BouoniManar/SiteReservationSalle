const  User = require('../models/User');
const mongoose=require('mongoose')

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


module.exports={createUser}
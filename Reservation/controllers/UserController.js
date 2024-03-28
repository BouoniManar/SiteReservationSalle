const  User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')



const loginForm = async (req, res) => {
    try {
      res.render('sign-in',{loggedIn:false});
    } catch (err) {
      next(err)
    }
  }
const signupForm = async (req, res) => {
    try {
      res.render('sign-up',{loggedIn:false});
    } catch (err) {
      next(err)
    }
  }
const logout = (req, res, next) => {
    try {
      res.clearCookie('token');
      res.render('sign-in',{loggedIn:false})
      } catch (err) {
      next(err)
    }
  }

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
        res.status(201).send('User registered successfully');

}
catch(err){
    res.status(402).json({ message:err.message})
}
}

// login
const loginUser=async (req,res)=>{
    try {
        const {email,password}=req.body;
        const user = await User.findOne({email: email});
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


module.exports={createUser,loginUser,loginForm,signupForm,logout }
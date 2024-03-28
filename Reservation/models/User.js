const mongoose=require('mongoose')
const bcrypt = require('bcryptjs')
const UserSchema= new mongoose.Schema({
    name: {
        required: true,
        type: String
    },
    email: {
        required:true,
        type: String
    },
    password: {
          required: true,
          type: String
    }

})

UserSchema.pre('save', async function(next){
    const User =this;
    if(User.isModified('password')){
        User.password= await bcrypt.hash(User.password,15)
    }
    next();
})


module.exports=mongoose.model('User', UserSchema);
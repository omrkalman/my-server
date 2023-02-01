const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name:       {type:String, required:true},
    email:      {type:String, required:true, unique:true},
    password:   {type:String, required:true},
    avatar:     {type:String},
    isSuperUser:{type:Boolean, default:false}
});

const User = mongoose.model("user", userSchema);

const addNewUser = (userData) => {
    const newUser = new User(userData);
    return newUser.save();
}

const findUserByEmail = (email) => {
    return User.findOne({ email });
}

module.exports = {
    addNewUser,
    findUserByEmail
};
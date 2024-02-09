const mongoose = require("mongoose");


const userSchema = mongoose.Schema({
    username:{
        type:String,
        required:[true, "Please enter User name"],
    },
    email:{
        type: String,  
        unique : [true,"please enter valid email Id"],
        match: [/.+@.+\..+/, 'Please provide a valid e-mail address'],  
      } , 
    password: {
        type: String,
        required: [true, "Please enter your password"],
    },
    
}, 
{timestamps: true
});

module.exports = mongoose.model("user", userSchema);
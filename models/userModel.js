const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
    username :{
        type : String,
        required : [true,"Please Enter User Name"],
    },

    email :{
        type : String,
        required : [true, "Please Enter User Email"],
        unique : [true, "Email is Already Taken"]
    },

    password :{
        type : String,
        required : [true, "Please Enter Password"],
        
    },
},
    {
        timestamps : true,
    }
);

module.exports = mongoose.model("User", userSchema);
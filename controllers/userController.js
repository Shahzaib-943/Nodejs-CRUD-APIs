const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const token = process.env.JWT_SECRET;

const registerUser = async(req,res)=>{
    
    try {
        const {username, email, password
        } = req.body;
        const user = new User({
            username,email,password
        })
        const validationError = user.validateSync();
        if(validationError){
            const errors = Object.values(validationError.errors).map(err => err.message);
            return res.status(500).json({"message": errors});
        }
        const availableUser = await User.findOne({email
        });
        if(availableUser)
        {
            return res.status(400).json({
                "message": "User Already Exists"
            })
        }
        const hashedPassword = await bcrypt.hash(password,
        10);
        user.password = hashedPassword;
        const userSaved = await user.save();
        if(userSaved)
        {
            res.status(200).json({
                "message": "User Created",
                "user": user
            })
        };
    } catch (error) {
        
        return res.status(500).json(error.message);
    }
}

const loginUser = async(req,res)=>{
    try {
        const {email, password
        } = req.body;
        if(!email || !password)
        {
            return res.status(400).json({
                "message": "Please Enter Both Fields Values"
            })
        }
        const user = await User.findOne({email
        });
        if(!user)
        {
            return res.status(400).json({
                "message": "Please Enter Correct Email"
            })
        }
        const matchedPassword = await bcrypt.compare(password, user.password);
        if(!matchedPassword)
        {
            return res.status(400).json({
                "message": "Please Enter Correct Password"
            })
        }
        if(user && matchedPassword)
        {
            const accessToken = jwt.sign({
                User : {
                    username : user.username,
                    email : user.email,
                    id : user.id
                },
            },
             token,
             {"expiresIn" : "1h"}
            );

            return res.status(200).json({
                "message" : "User LogedIn",
                "accessToken" : accessToken
            })
        }
        else{
            return res.status(400).json({
                "message": "User Not Found"
            })
        }
    } catch (error) {
        return res.status(500).json(error.message);
    }
}
const currentUser = async(req,res)=>{
    return res.status(200).json({
        "message" : "User Data",
        "user" : req.user
    });
}

module.exports = {registerUser,loginUser,currentUser};
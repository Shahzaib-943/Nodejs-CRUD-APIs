const jwt = require("jsonwebtoken");
const validateToken = async(req,res,next)=>{
    let authToken = req.headers.Authorization || req.headers.authorization;
    if(!authToken)
            {
                res.status(401).json({
                    "message" : "Token is Missing"
                })
            }
    if(authToken && authToken.startsWith("Bearer"))
    {
        token = authToken.split(" ")[1];
        jwt.verify(token, process.env.JWT_SECRET,(err,decoded)=>{
            if(err)
            {
                return res.status(401).json({
                    "message" : "User Not Authorized"
                })
            };
            // console.log(decoded);
            req.user = decoded.User;
            next();
            
        })
    }
}

module.exports = validateToken;
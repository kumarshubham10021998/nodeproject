const asyncHandler =  require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const  jwt = require("jsonwebtoken");

// get all Get register api
//route GET /api/user/register
//access public
const registerUser = asyncHandler(async(req, res)=>{
    const {username, email, password} =req.body;
    if(!username ||  !email || !password){
     res.status(400);
    throw new Error("All fields are mandatory");
    }
    const userAvailable= await User.findOne({email});
    if(userAvailable){
        res.status(400)
       throw new Error('Email is already in register');
    }
    const hashedPassword=await bcrypt.hash(password, 10);
    console.log("Hashed password", hashedPassword);
    const user = await User.create({
        username,
        email,
        password:hashedPassword,
    });
    console.log(`User is create ${user}`);
    if(user){
        res.status(201).json({_id: user.id, email: user.email});
    
    } else{
        res.status(400);
        throw new Error("User can not be valid!");
    }
     res.json({message: "Register the user"});   
    });

    // get all Get login api
//route GET /api/user/login
//access public
const loginUser = asyncHandler(async(req, res)=>{
   const {email, password} = req.body;
   if(!email || !password){
    res.status(400);
    throw new Error("All field are mandatary")
   }
   const user = await User.findOne({email});
   // cpmpare password hashedpassword
   if(user && (await bcrypt.compare(password, user.password))){
    const accessToken = jwt.sign(
        {
        user: {
            username:user.username,
            email:user.email,
            id: user.id,
        },
    }, 
    process.env.ACCESS_TOKEN_SECERT,
   { expiresIn: "15m"}

    
    );
    res.status(200).json({accessToken});

   }else{
    res.status(401);
    throw new Error("password not valid ")
   }
  
    });
 // get all Get register api
//route GET /api/user/currentuser
//access privite
const currentUser = asyncHandler(async(req, res)=>{
    res.json(req.user);
    });

    module.exports = {registerUser, loginUser, currentUser };
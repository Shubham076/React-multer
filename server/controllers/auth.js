const User = require("../models/user");
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt");
const user = require("../models/user");


exports.signUp = async(req,res,next)=>{

    let email = req.body.email
    let password  = req.body.password
    let username = req.body.username

    try{
        let user =  await User.findOne({email:email})

        if(user){
            let err  = new Error("Email already exist")
            err.status = 400
            throw(err)
        }
        
        let hashPass = await bcrypt.hash(password,12)

        let newUser = new User({
                email:email,
                username:username,
                password:hashPass
        })

        let newuser = await newUser.save()
    

        let token = jwt.sign({
            email:newuser.email,
            userId:newuser._id.toString()

            }, process.env.jwtSecret,{
                expiresIn:"1h"
        })

        res.status(201).json({
            message:'new user created',
            token:token,
            username:username
        })
    }
    
    catch(err){
        next(err)
    }

}


exports.login = async(req,res,next)=>{

    let email = req.body.email
    let password  = req.body.password

    try{

        let foundUser = await User.findOne({email:email})

        if(!foundUser){
            let err  = new Error("No user found with this email")
            err.status = 404
            throw(err)
        }
        let username = foundUser.username;


        let isEqual = await bcrypt.compare(password , foundUser.password)

        if(!isEqual){
            let err = new Error("Invalid email or password")
            err.status = 401
            throw(err)
        }

        const token = jwt.sign({
            email:foundUser.email,
            userId:foundUser._id.toString()
        }, process.env.jwtSecret, {expiresIn:'1h'})

        res.status(200).json({
            token:token,
            message:"Successfully logged in",
            username:username
        })
    }
    catch(err){
        next(err)
    }
}
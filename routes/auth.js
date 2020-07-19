const express = require('express')
const bycrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const router = express.Router()
const User  = require('../models/User')

router.post('/register' , async (req , res)=>{
    //check if email already exists
    const emailExist  = await User.findOne({email  :req.body.email})
    // if emailExist is true then
    if(emailExist){
        return res.status(400).send('Email already Exists.')
    }

    //hashing password
    const salt =  await bycrypt.genSalt(10)
    const hashedPassword = await bycrypt.hash(req.body.password , salt)

    const user = new User({
        email : req.body.email,
        password : hashedPassword
    })
    try {
        await user.save()
        res.status(200).send({ user : user._id})
    }catch(error){
        res.status(400).send(error)
    }
})

router.post('/login' , async (req , res)=>{
     //check if email exists
     const user  = await User.findOne({email  :req.body.email})
     if(!user){
        return res.status(400).send('Invalid email or password.')
     }

     const validPass = await bycrypt.compare(req.body.password , user.password)
     if(validPass){
         const token = jwt.sign({ _id : user._id} , process.env.TOKEN_SECRET)
         res.status(200).header('auth-token' , token).send(token)
     } else {
         res.status(400).send('Invalid email or password.')
     }


})

module.exports = router
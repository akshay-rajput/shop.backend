let express = require('express');
const { User } = require('../models/user.model');
const {extend} = require('lodash')
let router = express.Router();

// middleware for products
// router.use(function(req, res, next){
//     console.log('Users router: '+ req.method + ' -- '+ Date())
//     next()
// })

// users route
router.route('/')
.get(async function(req, res){
    try{
        const userList = await User.find({})

        res.status(200).json({
            success: true,
            users: userList
        })
        
    }catch(error){
        res.status(500).json({
            success: false,
            error,
            message: 'Cannot get users'
        })
    }

}).post(async function(req, res){
    try{
        const user = req.body
        const newUser = new User(user);
        const savedUser = await newUser.save()

        res.status(200).json({
            success: true,
            message: 'User created successfully',
            user: savedUser
        })
    }catch(error){
        res.status(500).json({
            success: false,
            error,
            message: 'Cannot add user'
        })
    }
})

// middleware for RUD ops for single user
router.param("userId", async (req, res, next, userId) => {
    try{
        const user = await Product.findById(userId)

        if(!user){
            return res.status(404).json({
                success: false,
                message: "User not found"
            })
        }

        // set user inside req object to use below 
        req.user = user;
        next();
    }
    catch(error){
        res.status(400).json({
            success: false,
            error,
            message: "Error getting user, please check your request"
        })
    }
})


// single user
router.route('/:userId')
.get((req, res) => {
    // take user out of req object
    let {user} = req

    res.json({
        success: true,
        user: user
    })
    
})
.post(async (req, res) => {
    // the user date passed by client
    const userUpdate = req.body

    // the user which was found by id
    let {user} = req

    user = extend(user, userUpdate)

    user = await user.save()

    res.json({
        success: true,
        message: "User updated successfully",
        user
    })
})
.delete(async (req, res) => {
    let {user} = req
    await user.remove()
    res.json({
        success: true,
        deleted: true,
        user
    })
})

module.exports = router;
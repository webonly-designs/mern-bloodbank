const userModel = require("../models/userModel");
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const registerController = async(req,res) => {
    try {
        const existingUser = await userModel.findOne({email: req.body.email});
        if(existingUser) {
            return res.status(200).send({
                success:false,
                message: 'User already exists',
            })
        }
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(req.body.password, salt)
        req.body.password = hashedPassword
        const user = new userModel(req.body)
        await user.save()
        return res.status(201).send({
            success: true,
            message: 'User saved successfully',
            user,
        })
    } catch(err){
        console.log(err);
        res.status(500).send({
            success: false,
            message: 'Error in Register API',
        })
    }
}

const loginController = async(req, res) => {
    try {
        const existingUser = await userModel.findOne({email: req.body.email});
        if(!existingUser){
            return res.status(404).send({
                success: false,
                message: 'User not found',
            })
        }
        if(existingUser.role != req.body.role){
            return res.status(500).send({
                success: false,
                message: 'Role dosent match',
            })
        }
        const comparePassword = await bcrypt.compare(req.body.password, existingUser.password)
        if(!comparePassword){
            return res.status(500).send({
                success: false,
                message: 'Password mismatch',
            })
        }
        const token = jwt.sign({userId: existingUser._id}, process.env.JWT_SECRET, {expiresIn: '1d'})
        return res.status(200).send({
            success: true,
            message: 'Login successful',
            token,
            existingUser
        })
    } catch(err) {
        console.log(err)
        res.status(500).send({
            success: false,
            message: 'Error in Login API',
        })
    }
}

const currentUserController = async (req, res) => {
    try {
      const user = await userModel.findOne({ _id: req.body.userId });
      return res.status(200).send({
        success: true,
        message: "User Fetched Successfully",
        user,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        success: false,
        message: "unable to get current user",
        error,
      });
    }
  };

module.exports = {registerController, loginController, currentUserController}
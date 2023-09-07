const userModel = require("../models/userModel");

const registerController = async(req,res) => {
    try {
        const existingUser = await userModel.findOne({email: req.body.email});
        if(existingUser) {
            return res.status(200).send({
                success:false,
                message: 'User already exists',
            })
        }
        
    } catch(err){
        console.log(err);
        res.status(500).send({
            success: false,
            message: 'Error in Register API',
        })
    }
}

module.exports = {registerController}
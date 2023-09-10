const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require('bcrypt');


const register = async (req, res) => {
    try {
        console.log(req.body)
        const { username, email, password } = req.body;
        if (!username) {
            res.status(400).json("Username is required.");
            return;
        }

        if (!email) {
            res.status(400).json("Email is required.");
            return;
        }

        if (!password) {
            res.status(400).json("Password is required.");
            return;
        }

        const salt=await bcrypt.genSalt(10);
        const hashedPass= await bcrypt.hash(req.body.password,salt);
        const existingUsername=await User.findOne({username:req.body.username});
        if(existingUsername){
            res.status(400).json("Username already exist ! Try login or use another username");
            return
        }
        const existingEmail=await User.findOne({email:req.body.email});
        if(existingEmail){
            res.status(400).json("Email is already in use ! Try login or use another Account");
            return
        }
        const newUser=new User({
            username:req.body.username,
            email:req.body.email,
            password:hashedPass,
        });
        const user= await newUser.save();
        console.log(user);
        const response = { ...user._doc, password: null}
        res.status(200).json(response);

    } catch (err) {
        res.status(500).json(err.message);

    }
}
router.post("/register", register);
//login
const login = async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        if (!user) {
            res.status(400).json("User not found");
            return
        }
        const validated = await bcrypt.compare(req.body.password, user.password);
        if (!validated) {
            res.status(400).json("wrong credentials");
            return
        }

        const { password, ...others } = user._doc;
        res.status(200).json(others);

    } catch (err) {
        res.status(500).json(err);
    }


}
router.post("/login", login);

module.exports = router;
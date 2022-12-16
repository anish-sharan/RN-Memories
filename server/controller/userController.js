const User = require('../models/user');
const jwt = require('jsonwebtoken');

JWTKEY = process.env.JWTKEY

exports.registerUser = async (req, res) => {
    console.log('register route',req,res);
    try {
        const user = new User(req.body);
        await user.save();
        const token = jwt.sign({ userId: user._id }, JWTKEY);
        res.status(200).json({ success: true, token });
    } catch (error) {
        return res.status(400).json({ success: false, err: error });
    }

};

exports.signInUser = async (req, res) => {
    User.findOne({ email: req.body.email }, (err, user) => {
        if (!user)
            return res.json({
                loginSuccess: false,
                message: "Auth failed, email not found"
            });

        user.comparePassword(req.body.password, (err, isMatch) => {
            if (!isMatch)
                return res.json({ loginSuccess: false, message: "Wrong password" });
            const token = jwt.sign({ userId: user._id }, JWTKEY);
            res.send({ token });
        });
    });
}
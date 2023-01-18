const router = require('express').Router();
const User = require('../models/user_model');
const bcrypt = require('bcrypt');

router.post('/register', async (req, res) => {





    try {

        // Encrypt The PAssword
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(404).json({ message: "Field Must Be Required" })
        }

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(req.body.password, salt);

        // New User Entry
        const newUser = await new User({

            username: req.body.username,
            email: req.body.email,
            password: hashPassword

        });

        // const { email } = req.body;
        // const usercheck = User.findOne({ email: email })

        // // Save User And Return Response
        // if (!usercheck) {
        const user = await newUser.save()
        res.status(200).json(user)
        // }

    }
    catch (err) {
        console.log(err);
    }

    // else{
    //     res.send(404).json({error: err});
    // }
});


//  For Logins 
router.post('/login', async (req, res) => {

    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: "Field Must Be Required" });
        }
        const userlogin = await User.findOne({ email: email });
        if (userlogin) {

            const isMatch = await bcrypt.compare(password, userlogin.password);
         
            if (!isMatch) {
                res.status(402).json({ error: "Invalid Details" });
            }
            else {
                res.status(404).json({ message: "Login : Success" });
            }
        }
        else {
            res.status(404).json({ error: "Registration Successful" });
        }
    }
    catch (err) {
        console.log(err);
    }


})




module.exports = router;
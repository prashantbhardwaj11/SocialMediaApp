const router = require('express').Router();
const User = require('../models/user_model');
const bcrypt = require('bcrypt');
// update user
console.log("Yes Sir Users Working ");
router.put("/:id", async (req, res) => {

    if (req.body.userId == req.params.id) {
        console.log("I Am from in if block ");
        try {
            const user = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body,
            });
            res.status(200).json("Updated Succesfully");
        }
        catch (err) {
            return res.status(500).json("Not Updated");
        }
    }
    else {
        return res.status(403).json("you can update only your account");
    }
})


// delete user 

router.delete("/:id", async (req, res) => {

    if (req.body.userId == req.params.id) {
        console.log("I Am from in if block ");
        try {
            const user = await User.findByIdAndDelete(req.params.id);
            res.status(200).json("Deleted Succesfully");
        }
        catch (err) {
            return res.status(500).json("Not Deleted");
        }
    }
    else {
        return res.status(403).json("you can Delete only your account");
    }

});

// get a user

router.get("/:id", async (req, res) => {

    try {
        const user = await User.findById(req.params.id);
        const { password, updateAt, ...other } = user._doc
        res.status(200).json(other);

    } catch (error) {
        res.status(500).json("Data You Want to see either deleted or not exixt");

    }

})

// follow a user

router.put("/:id/follow", async (req, res) => {
    if (req.body.userId !== req.params.id) {
        try {
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.userId);
            if (!user.followers.includes(req.body.userId))
            {
                await user.updateOne({$push:{followers: req.body.userId}})
                await currentUser.updateOne({$push:{followings : req.body.userId}})

                res.status(200).json("User has been followed");
            }
            else{
                res.status(403).json("You already follow this user")
            }
        }
         catch (error) {
            res.status(500).json(error);
        }

    }
    else{
res.status(403).json("You Can't follow yourself");
    }
})
// unfollow a user

router.put("/:id/unfollow", async (req, res) => {
    if (req.body.userId !== req.params.id) {
        try {
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.userId);
            if (user.followers.includes(req.body.userId))
            {
                await user.updateOne({$pull:{followers: req.body.userId}})
                await currentUser.updateOne({$pull:{followings : req.body.userId}})

                res.status(200).json("User has been Unfollowed");
            }
            else{
                res.status(403).json("Already Unfollowed");
            }
        }
         catch (error) {
            res.status(500).json(error);
        }

    }
    else{
res.status(403).json("You Can't unfollow yourself");
    }
})

module.exports = router;
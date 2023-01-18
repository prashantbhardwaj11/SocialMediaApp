const router = require('express').Router();

const PostSchema = require("../models/post_model");



// create a post

router.post("/", async (req, res) => {
    const newPost = new PostSchema(req.body)
    try {

        const savedPost = await newPost.save();
        res.status(200).json(savedPost);
    } catch (error) {
        res.status(500).json(error);
    }
})

// update  a post 

router.put("/:id", async (req, res) => {

    try {
        const post_id = await PostSchema.findById(req.params.id)
        if (post_id.userId === req.body.userId) {
            await PostSchema.updateOne({ $set: req.body });
            res.status(200).json("Post Has Been Updated");
        }
        else {
            res.status(403).json("You can update only oyur post");
        }
    } catch (error) {
        res.status(500).json(error)
    }

})


// delete a post 

router.delete("/:id", async (req, res) => {

    try {
        const post_id = await PostSchema.findById(req.params.id)
        if (post_id.userId === req.body.userId) {
            await PostSchema.deleteOne();
            res.status(200).json("Post Has Been Deleted");
        }
        else {
            res.status(403).json("You can Delete only oyur post");
        }
    } catch (error) {
        res.status(500).json(error)
    }

})

// like and dislike a post 
router.put("/:id/like", async (req, res) => {
    try {
        const post = await PostSchema.findById(req.params.id);
        if (!post.likes.includes(req.body.userId)) {
            await post.updateOne({ $push: { likes: req.body.userId } });
            res.status(200).json("Post has been liked")
        }
        else {
            await post.updateOne({ $pull: { likes: req.body.userId } });
            res.status(200).json("Post has been disliked")

        }

    } catch (error) {
        res.status(500).json(error)

    }
})

// get a post
router.get("/:id", async (req, res) => {
    try {
        const post = await PostSchema.findById(req.params.id);
        return res.status(200).json(post);
    } catch (error) {
        return res.status(404).json(error);
    }
})
// get timeline posts 

// router.get("/:id",async (req, res) => {

//     let postarray=[];
//     try {
//         const currentUser = await User.findById(req.params.id);
//         const userPost = await PostSchema.find({userId:currentUser._id})
//         const friendsPost = await Promise.all(
//             currentUser.followings.map((friendId) =>{
//              return   PostSchema.find({userId:friendId})
//             })
//         );
//         res.json(userPost.concat(...friendsPost))
//     } catch (error) {
//         res.status(500).json(error);
//     }
// });











// router.get("/postdalo",async (req,res) => {
//     console.log("Post Page");
//     res.send("Ok");
// })

module.exports = router;

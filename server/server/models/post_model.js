const mongoose = require('mongoose');



const PostSchema = new mongoose.Schema(
    {
        userId:{
            type: String,
            required: true,
        },

        img: {
            type: String
        },
        likes: {
            type: Array,
            default: []
        },

        desc: {
            type: String,
            max: 50
        },


        time:
        {
            type: Date,
            default: Date.now
        }


    },

);

module.exports = mongoose.model('post_model', PostSchema);
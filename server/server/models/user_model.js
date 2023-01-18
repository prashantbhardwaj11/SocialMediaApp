const mongoose = require('mongoose');



const UserSchema = new mongoose.Schema(
    {

        username:
        {
            type: String,
            min: 3,
            unique: true,
            required: true,
            max: 30,
        },
        email:
        {
            required: true,
            unique: true,
            type: String
        },
        password:
        {
            type: String,
            required: true,
            min: 6
        },
        profilePicture:
        {
            type: String,
            default: ""
        },
        coverpicture:
        {
            type: String,
            default: ""
        },
        followers:
        {
            type: Array,
            default: []
        },
        following:
        {
            type: Array,
            default: []
        },
        isAdmin:
        {
            type: Boolean,
            default: false
        },
        desc: {
            type: String,
            max: 50
        },
        city: {
            type: String,
            max: 50
        },

        from:
        {
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

module.exports = mongoose.model('user_model', UserSchema);
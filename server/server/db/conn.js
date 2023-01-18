const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/social',{useNewUrlParser: true, useUnifiedTopology: true })
try {
    console.log('Connection : Success');
} catch (error) {
    console.log(error);
}
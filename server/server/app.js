const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const app = express();
const port = 3000;
require('./db/conn');
const userRoutes = require('./routes/users');
const userAuth = require('./routes/auth');
const PostAuth = require('./routes/Posts');


// middlware

app.use(express.json())

app.use(helmet());
app.use(morgan("common"))

// Api Call Here
app.use("/api/users", userRoutes);
app.use("/api/auth", userAuth);
app.use("/api/posts", PostAuth)







app.listen(port);
// imports
const express = require('express');
const createErrors = require('http-errors');
const cors = require('cors');

const userRouter = require('./routes/user.route');
const bookRouter = require('./routes/book.route');

//specially for FB user login starts

const FB_LoginRouter = require('./routes/FB.user.login')

//specially for FB user login ends


require('dotenv').config();
require('./helpers/init_mongoDB.helper');

// constants
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// routes
app.get('/', (req, res) => {
    res.send('hello internet...');
});

app.use('/user', userRouter);
app.use('/book', bookRouter);

//specially for FB user login starts

app.use('/fbLogin', FB_LoginRouter);

//specially for FB user login ends


// handle wildcard route
app.use(async(req, res, next) => {
    next(createErrors.NotFound('This route does not exists!'));
});

// handle errors
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.send({
        error: {
            status: err.status || 500,
            message: err.message || 'Internal server error'
        }
    });
});

// start the server
app.listen(PORT, () => {
    console.log(`server running at port ${PORT}...`);
});


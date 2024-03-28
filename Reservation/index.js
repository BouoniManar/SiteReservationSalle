const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser')
const app = express();
dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(express.static('public'));
app.set('view engine', 'ejs');



const MONGODB_URI = process.env.MONGODB_URI;
const PORT = process.env.PORT || 6001;

app.get("*", (req, res) => {
    res.render("login",{loggedIn:req.cookies.token});
});


mongoose.connect(MONGODB_URI).then(() => {
    console.log('Connected to the database');
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
}).catch(err => {
    console.error('Error connecting to database:', err.message);
});

// User routes
const Userroutes = require('./routes/UserRoutes');
app.use('/user', Userroutes);


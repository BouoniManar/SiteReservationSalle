const express=require('express');
app = express();
const PORT=6000;
app.use(express.json())
const mongoose = require('mongoose');

const mongo='mongodb+srv://manarbouoni:Mongodb@cluster0.spd71gk.mongodb.net/Reservation?retryWrites=true&w=majority&appName=Cluster0'


mongoose.connect(mongo);

const database = mongoose.connection;

database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
});

//user routes
const Userroutes= require('./routes/UserRoutes')
app.use('/user',Userroutes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
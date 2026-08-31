const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');
const morgan = require('morgan');
const app = express();
const port = process.env.PORT;
const connectDB = require('./DB_CONNECTION/DBconnection');
connectDB();
const Router = require('./VIEW/auth');
const EventRouter = require('./VIEW/event');
const RegistrationRouter = require("./VIEW/registration");


app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(Router);
app.use(EventRouter);
app.use(RegistrationRouter);

app.get('/',(req,res)=>{
    res.send('App is running. No worries');
})

app.all('/*path', (req,res)=>{
    res.send('Sorry! This path does not exist.');
})

app.listen(port, ()=>{
    console.log(`App is running on ${port}`);
});
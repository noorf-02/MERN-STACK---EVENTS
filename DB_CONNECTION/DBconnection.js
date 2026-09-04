const mongoose = require('mongoose');

const connectDB = async (req,res)=>{
    await mongoose.connect(process.env.URI).then(()=>{
        console.log('DB is connected. Keep working')
    }).catch(err=>{
        console.log('Error in DB connection', err);
    })
};

module.exports = connectDB;
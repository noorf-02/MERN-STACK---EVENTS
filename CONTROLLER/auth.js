const Auth = require('../MODEL/auth');

const signUp = async (req,res)=>{
    res.send('Signup');
};

const logIn = async (req,res)=>{
    res.send('LogIn');
};

module.exports = { signUp, logIn }
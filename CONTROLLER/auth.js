const Auth = require("../MODEL/auth");
const bcrypt = require("bcryptjs");

const signUp = async (req, res) => {

    const {firstName,lastName,username,email,password} = req.body;

  const exists = await Auth.findOne({
    $or: [{ username }, { email }],
  });

  if (exists) {
    return res.status(409).json({
      message: "User already exists",
    });
  }

  const hashedPassword = await bcrypt.hash(password,10);

  const user = await Auth.create({
    firstName:firstName,
    lastName:lastName,
    username:username,
    email:email,
    password:hashedPassword
  });

  res.status(200).json({
    message:"User has been registered successfully",
    user
  })

};

const logIn = async (req, res) => {
  res.send("LogIn");
};

module.exports = { signUp, logIn };

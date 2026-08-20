const express = require("express");
const Auth = require("../MODEL/auth");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const JWT_CONFIG = process.env.JWT_CONFIG;

const signUp = async (req, res) => {
  const { firstName, lastName, username, email, password, role } = req.body;

  const exists = await Auth.findOne({
    $or: [{ username }, { email }],
  });

  if (exists) {
    return res.status(409).json({
      message: "User already exists",
    });
  }

  if (!firstName || !lastName || !email || !username || !password) {
    return res.status(401).json({
      message: "Please fill all fields",
    });
  }

  if (password.length < 8) {
    return res.status(401).json({
      message: "Password must be at least 8 characters long",
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await Auth.create({
    firstName: firstName,
    lastName: lastName,
    username: username,
    email: email,
    password: hashedPassword,
    role: role,
  });

  res.status(200).json({
    message: "User has been registered successfully",
    user,
  });
};

const logIn = async (req, res) => {
  const { username, password } = req.body;
  const exists = await Auth.findOne({ username });
  if (!exists) {
    return res.status(400).json({
      message: "User does not exist. Please Register",
    });
  }

  const comparePass = await bcrypt.compare(password, exists.password);
  if (!comparePass) {
    return res.status(400).json({
      message: "Username or password invalid",
    });
  }

  const token = jwt.sign(
    {
      id: exists._id,
      role: exists.role,
    },
    JWT_CONFIG,
    {
      expiresIn: "1d",
    },
  );

  res.status(200).json({
    message: "User logged in successfully",
    token,
    role: exists.role,
  });
};

module.exports = { signUp, logIn };

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const Auth = require("./MODEL/auth");

async function createAdmin() {
  try {
    await mongoose.connect(process.env.URI);

    const hashedPassword = await bcrypt.hash("admin12345", 10);

    const admin = await Auth.create({
      firstName: "Admin",
      lastName: "User",
      username: "admin",
      email: "admin@example.com",
      password: hashedPassword,
      role: "admin",
    });

    console.log("Admin created:", admin);
    process.exit();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

createAdmin();
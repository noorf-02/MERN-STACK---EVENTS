const mongoose = require("mongoose");
const { Schema } = mongoose;

const authSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    maxlenght: [20, "Name shouldn't exceed 20 characters"],
  },
  lastName: {
    type: String,
    required: true,
    maxlength: [15, "Name shouldn't exceed 20 characters"],
  },
  username:{
    type: String,
    required: true,
  },
  email:{
    type: String,
    required: true,
    unique:true,
  },
  password:{
    type: String,
    required: true,
    minlength:[8, 'Password should be at least 8 characters']
  },
});

const Auth = mongoose.model('Auth', authSchema);
module.exports = Auth;

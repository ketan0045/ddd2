const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const keysecret = "qwertyuioplkjhgfdsazxcvbnmmnbvcxbbb";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
  },
  useremail: {
    type: String,
    required: true,
    unique: true,
  },
  userpassword: {
    type: String,
    required: true,
    minlength: 6,
  },
  usercpassword: {
    type: String,
    required: true,
    minlength: 6,
  },
});

// hash password

userSchema.pre("save", async function (next) {
  if (this.isModified("userpassword")) {
    this.userpassword = await bcrypt.hash(this.userpassword, 12);
    this.usercpassword = await bcrypt.hash(this.usercpassword, 12);
    // this.cpassword = undefined;
  }
  next();
});

// token generate

userSchema.methods.generateAuthtoken = async function () {
  try {
    let token23 = jwt.sign({ _id: this._id }, keysecret, {
      expiresIn: "15d",
    });
    return token23;
  } catch (error) {
    res.status(422).json(error);
  }
};

const userdb = mongoose.model("userddharmik", userSchema);

module.exports = userdb;

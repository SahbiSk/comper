const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const { isEmail } = require("validator");

const product = require("./product");
const config = require("../config");
var bcrypt = require("bcrypt");

const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: [true, "please enter an email"],
    validate: [isEmail, "please enter a valid email"],
  },
  username: {
    type: String,
    required: [true, "enter a username"],
  },
  password: {
    type: String,
    required: [true, "please enter a password"],
    minlength: [6, "password should be at least 6 characters"],
  },
  avatar: {
    type: String,
    default: "",
  },

  wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],

  totalPnts: {
    type: Number,
    default: 0,
  },
  badge: {
    type: Boolean,
    default: false,
  },
});

userSchema.pre("save", async function (next) {
  let user = this;
  if (!user.isModified("password")) return next();
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const Users = mongoose.model("User", userSchema);

module.exports = Users;

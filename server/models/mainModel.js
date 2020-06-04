const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MONGO_URI =
  "mongodb+srv://saejin:codesmithsolo@cluster0-9unqt.mongodb.net/test?retryWrites=true&w=majority";

// creating connection to MongoDB collection
mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to Mongo DB"))
  .catch((err) => console.log(err));

const SALT_WORK_FACTOR = 10;
const bcrypt = require("bcrypt");

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.pre("save", function (next) {
  let user = this;

  bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
    if (err) return next(err);
    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) return next(err);
      user.password = hash;
      console.log("password hashed", user.password);
      return next();
    });
  });
});

const itemSchema = new Schema({
  item: String,
  amount: Number,
  income: Number,
});

const budgetSchema = new Schema({
  budget: Number,
  date: Date,
});

// bcrypting passwords
// userSchema.pre('save', function (next) {
//     let user = this;
//     if (!user.isModified('password')) return next();

//     bcrypt.genSalt
// })

const Budget = mongoose.model("budget", budgetSchema);
const User = mongoose.model("user", userSchema);
const Item = mongoose.model("item", itemSchema);

module.exports = {
  User,
  Item,
  Budget,
};

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

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
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

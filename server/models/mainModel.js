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
});

const Item = mongoose.model("item", itemSchema);

// bcrypting passwords
// userSchema.pre('save', function (next) {
//     let user = this;
//     if (!user.isModified('password')) return next();

//     bcrypt.genSalt
// })

const User = mongoose.model("user", userSchema);

module.exports = {
  User,
  Item,
};

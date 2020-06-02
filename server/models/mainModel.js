const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MONGO_URI = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PW}@cluster0-9unqt.mongodb.net/test?retryWrites=true&w=majority`;

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

// bcrypting passwords
// userSchema.pre('save', function (next) {
//     let user = this;
//     if (!user.isModified('password')) return next();

//     bcrypt.genSalt
// })

const User = mongoose.model("user", userSchema);

module.exports = {
  User,
};

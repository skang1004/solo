const models = require("../models/mainModel.js");

const userController = {};

userController.createUser = (req, res, next) => {
  const { username, password } = req.body;
  models.User.create({ username, password }, (err, newUser) => {
    if (err) {
      return next({
        log: `Error in createUser middleware ${err}`,
        status: 418,
        message: {
          err: "Check userController.createUser",
        },
      });
    }
    res.locals.newUser = newUser;
    return next();
  });
};

module.exports = userController;

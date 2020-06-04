const models = require("../models/mainModel.js");

const userController = {};

userController.createUser = (req, res, next) => {
  const { username, password } = req.body;
  models.User.create({ username, password }, (err, newUser) => {
    if (err) {
      res.locals.verified = false;
      return next({
        log: `Error in createUser middleware ${err}`,
        status: 418,
        message: {
          err: "Check userController.createUser",
        },
      });
    }
    res.locals.newUser = newUser;
    res.locals.verified = true;
    return next();
  });
};

userController.verifyUser = (req, res, next) => {
  models.User.find(req.body, (err, verified) => {
    if (err) {
      res.locals.verified = false;
      return next();
    }
    res.locals.verified = true;
    res.locals.user = verified;
    return next();
  });
};

module.exports = userController;

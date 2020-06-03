const models = require("../models/mainModel.js");

const budgetController = {};

budgetController.getHistory = (req, res, next) => {
  models.Budget.find({}, (err, budgetHistory) => {
    if (err) {
      return next({
        log: `Error in budgetController.getHistory Error: ${err}`,
        status: 418,
        message: {
          err: "Check budgetController",
        },
      });
    }
    res.locals.history = budgetHistory;
    console.log("res.locals.history", res.locals.history);
    return next();
  });
};

budgetController.saveBudget = (req, res, next) => {
  console.log("req.body inside saveBudget", req.body);
  models.Budget.create(req.body, (err, newBudget) => {
    if (err) {
      return next({
        log: `Error in budgetController.saveBudget, Error: ${err}`,
        status: 400,
        message: {
          err: "Check budgetController.saveBudget",
        },
      });
    }
    return next();
  });
};

module.exports = budgetController;
